import { SHEET } from '../data/pricing.js';

/**
 * Print-sheet packing.
 *
 * The supplier ships 100 x 60 cm sheets and we fill them with many customers'
 * prints. Customers never drag anything around: placement is automatic, prints
 * may be rotated 90 degrees, and nothing may overlap. When a sheet cannot take
 * an order we open the next sheet.
 *
 * Space is only ever committed once an order is actually placed — browsing the
 * editor reserves nothing.
 */

const GRID = 1; // cm scan step — coarse on purpose, this is a shop not a nesting CAD

/** First-fit (top-left biased) placement, trying both orientations. */
export function findSlot(rects, w, h) {
  let best = null;
  [[w, h], [h, w]].forEach(([cw, ch], i) => {
    if (cw > SHEET.w || ch > SHEET.h) return;
    for (let y = 0; y <= SHEET.h - ch; y += GRID) {
      for (let x = 0; x <= SHEET.w - cw; x += GRID) {
        const clash = rects.some(
          (r) => x < r.x + r.w && x + cw > r.x && y < r.y + r.h && y + ch > r.y
        );
        if (!clash) {
          const slot = { x, y, w: cw, h: ch, rotated: i === 1 };
          if (!best || slot.y < best.y || (slot.y === best.y && slot.x < best.x)) best = slot;
          return;
        }
      }
    }
  });
  return best;
}

export const sheetFill = (sheet) =>
  Math.min(100, Math.round(
    (sheet.rects.reduce((a, r) => a + r.w * r.h, 0) / (SHEET.w * SHEET.h)) * 100
  ));

export const cloneSheets = (sheets) =>
  sheets.map((s) => ({ id: s.id, rects: s.rects.map((r) => ({ ...r })) }));

/**
 * Place a print, opening a new sheet if required.
 * @returns {{sheets:Array, sheetIndex:number, rect:Object}}
 */
export function placePrint(sheets, w, h) {
  const next = cloneSheets(sheets);
  for (let i = 0; i < next.length; i++) {
    const slot = findSlot(next[i].rects, w, h);
    if (slot) {
      const rect = { ...slot, mine: true };
      next[i].rects.push(rect);
      return { sheets: next, sheetIndex: i, rect };
    }
  }
  const fresh = { id: next[next.length - 1].id + 1, rects: [] };
  const rect = { ...(findSlot([], w, h) || { x: 0, y: 0, w, h, rotated: false }), mine: true };
  fresh.rects.push(rect);
  next.push(fresh);
  return { sheets: next, sheetIndex: next.length - 1, rect };
}

/** Mock a partly-filled active sheet so the visualiser has believable neighbours. */
export function seedSheets(startId = 7, targetFill = 73) {
  let seed = 1337;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const sheet = { id: startId, rects: [] };
  let guard = 0;
  while (sheetFill(sheet) < targetFill && guard++ < 300) {
    const slot = findSlot(sheet.rects, 8 + Math.round(rnd() * 22), 8 + Math.round(rnd() * 26));
    if (!slot) break;
    sheet.rects.push(slot);
  }
  return [sheet];
}

/** Percent-based rectangles for rendering a sheet. Other orders stay anonymous. */
export const sheetBlocks = (sheet) =>
  !sheet ? [] : sheet.rects.map((r, i) => ({
    key: i,
    left: ((r.x / SHEET.w) * 100).toFixed(2) + '%',
    top: ((r.y / SHEET.h) * 100).toFixed(2) + '%',
    width: ((r.w / SHEET.w) * 100).toFixed(2) + '%',
    height: ((r.h / SHEET.h) * 100).toFixed(2) + '%',
    mine: !!r.mine
  }));
