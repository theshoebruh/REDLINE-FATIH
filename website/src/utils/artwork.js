import { PRINT_TIERS, MAX_TIER } from '../data/pricing.js';

/**
 * Analyse an uploaded artwork file.
 *
 * Pricing is based on the artwork the customer can actually see, so we find the
 * bounding box of non-transparent pixels, crop to it, and report that box. Fully
 * transparent padding around a PNG must never be charged for.
 *
 * @returns {Promise<{url:string,name:string,aspect:number,pxW:number,pxH:number,inkCoverage:number}>}
 */
export function analyseArtwork(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Upload failed. Please try again.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not read that file. Try a PNG or JPG export.'));
      img.onload = () => {
        // Scan at a capped size — full-resolution alpha scans are far too slow on mobile.
        const CAP = 800;
        const scale = Math.min(1, CAP / Math.max(img.width || CAP, img.height || CAP));
        const sw = Math.max(1, Math.round((img.width || 600) * scale));
        const sh = Math.max(1, Math.round((img.height || 600) * scale));

        const scan = document.createElement('canvas');
        scan.width = sw;
        scan.height = sh;
        const ctx = scan.getContext('2d');
        ctx.drawImage(img, 0, 0, sw, sh);

        let x0 = sw, y0 = sh, x1 = -1, y1 = -1;
        try {
          const data = ctx.getImageData(0, 0, sw, sh).data;
          for (let y = 0; y < sh; y++) {
            for (let x = 0; x < sw; x++) {
              if (data[(y * sw + x) * 4 + 3] > 12) {
                if (x < x0) x0 = x;
                if (x > x1) x1 = x;
                if (y < y0) y0 = y;
                if (y > y1) y1 = y;
              }
            }
          }
        } catch (err) {
          x1 = -1; // tainted canvas (e.g. some SVGs) — fall back to the full frame
        }
        if (x1 < 0) { x0 = 0; y0 = 0; x1 = sw - 1; y1 = sh - 1; }

        const boxW = x1 - x0 + 1;
        const boxH = y1 - y0 + 1;

        // Map the box back to source pixels and crop at print-useful resolution.
        const nx = x0 / scale, ny = y0 / scale;
        const nw = boxW / scale, nh = boxH / scale;
        const out = document.createElement('canvas');
        const os = Math.min(1, 1200 / Math.max(nw, nh));
        out.width = Math.max(1, Math.round(nw * os));
        out.height = Math.max(1, Math.round(nh * os));
        try {
          out.getContext('2d').drawImage(img, nx, ny, nw, nh, 0, 0, out.width, out.height);
        } catch (err) { /* keep the original data URL below */ }

        let url;
        try { url = out.toDataURL('image/png'); } catch (err) { url = reader.result; }

        resolve({
          url,
          name: file.name,
          aspect: boxW / boxH,
          pxW: Math.round(nw),
          pxH: Math.round(nh),
          inkCoverage: Math.round(((boxW * boxH) / (sw * sh)) * 100)
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/** Widest print we allow for a given aspect ratio, respecting the A3 area cap. */
export function maxPrintWidth(aspect) {
  const long = MAX_TIER.h;   // 42 cm
  const short = MAX_TIER.w;  // 29.7 cm
  const maxArea = long * short;
  const byBox = aspect >= 1 ? Math.min(long, short * aspect) : Math.min(short, long * aspect);
  return Math.max(4, Math.min(byBox, Math.sqrt(maxArea * aspect)));
}

/** Cheapest tier whose area covers the requested print. */
export function tierForArea(area) {
  return PRINT_TIERS.find((t) => area <= t.w * t.h) || MAX_TIER;
}

/**
 * Live measurements for the editor: size in cm, area, tier/price, and effective DPI.
 */
export function printMetrics(art, requestedWidthCm) {
  if (!art) return null;
  const maxW = maxPrintWidth(art.aspect);
  const w = Math.min(requestedWidthCm, maxW);
  const h = w / art.aspect;
  const area = w * h;
  return {
    w, h, area, maxW,
    tier: tierForArea(area),
    dpi: Math.round(art.pxW / (w / 2.54)),
    atLimit: w >= maxW - 0.15
  };
}

/** Resolution verdict shown to the customer. */
export function qualityFor(dpi) {
  if (dpi >= 240) {
    return { level: 'EXCELLENT', title: 'Print quality: excellent', body: 'Sharp at this print size. Nothing to fix.' };
  }
  if (dpi >= 140) {
    return { level: 'GOOD', title: 'Print quality: good', body: 'Good enough to print at this size. A higher-resolution file would sharpen fine detail and small text.' };
  }
  return {
    level: 'LOW',
    title: 'Low resolution',
    body: 'Your artwork may appear pixelated when printed at this size. For the best result, upload the highest-resolution version available — or reduce the print size.'
  };
}
