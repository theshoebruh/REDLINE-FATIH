import React, { useMemo, useState } from 'react';
import SheetVisualiser from '../components/SheetVisualiser.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { SHIRTS, SHIRT_COLOURS, SIZES, PRINT_AREA } from '../data/shirts.js';
import { PRINT_TIERS, SHEET, PRODUCTION_DAYS } from '../data/pricing.js';
import { analyseArtwork, printMetrics, qualityFor } from '../utils/artwork.js';
import { placePrint } from '../utils/packing.js';
import { money, cm, cm2 } from '../utils/format.js';

const SHIRT_BG = {
  Black: 'repeating-linear-gradient(135deg,#0E0E11 0 12px,#141418 12px 24px)',
  White: 'repeating-linear-gradient(135deg,#EFEFEB 0 12px,#E5E5E0 12px 24px)',
  Charcoal: 'repeating-linear-gradient(135deg,#33333A 0 12px,#3A3A42 12px 24px)',
  Bone: 'repeating-linear-gradient(135deg,#DBD5C9 0 12px,#D2CCBF 12px 24px)'
};

/**
 * Custom design flow: shirt → print location → rotation → artwork → live price → sheet.
 * The customer sees a simple sequence; the packing and area maths stay out of sight.
 */
export default function Custom() {
  const { addToCart, setModal, notify, sheets } = useStore();

  const [shirtId, setShirtId] = useState('HEAVY');
  const [colour, setColour] = useState('Black');
  const [size, setSize] = useState('XL');
  const [location, setLocation] = useState('FRONT');
  const [rotation, setRotation] = useState(0);
  const [art, setArt] = useState(null);
  const [widthCm, setWidthCm] = useState(18.4);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [pricingOpen, setPricingOpen] = useState(false);

  const shirt = SHIRTS.find((s) => s.id === shirtId);
  const light = SHIRT_COLOURS.find((c) => c.label === colour)?.light;
  const metrics = useMemo(() => printMetrics(art, widthCm), [art, widthCm]);
  const quality = metrics ? qualityFor(metrics.dpi) : null;

  /* Preview placement only — nothing is reserved until checkout. */
  const preview = useMemo(() => {
    if (!metrics) return null;
    return placePrint(sheets, Math.ceil(metrics.w) + 1, Math.ceil(metrics.h) + 1);
  }, [metrics, sheets]);
  const previewSheet = preview ? preview.sheets[preview.sheetIndex] : sheets[0];

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setError(null);
    try {
      const next = await analyseArtwork(file);
      setArt(next);
      setWidthCm(Math.round(Math.min(next.aspect >= 1 ? 24 : 18, 29.7) * 10) / 10);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const add = () => {
    if (!metrics) return;
    addToCart({
      title: 'Custom tee',
      price: shirt.price + metrics.tier.price,
      qty: 1,
      custom: true,
      image: art.url,
      print: { w: metrics.w, h: metrics.h, tier: metrics.tier.id, location },
      meta: `${shirt.name.toUpperCase()} · ${colour.toUpperCase()} · ${size}\n${location} PRINT · ${metrics.tier.id} · ${metrics.w.toFixed(1)} × ${metrics.h.toFixed(1)} CM`
    });
  };

  const quality_colour = quality?.level === 'LOW' ? 'var(--rf-red)' : quality?.level === 'GOOD' ? 'var(--rf-warn)' : 'var(--rf-ok)';

  return (
    <main className="rf-shell" style={{ padding: '36px var(--rf-gutter) 90px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <span className="rf-kicker">CUSTOM DESIGNS</span>
          <h1 className="rf-display" style={{ marginTop: 12, fontSize: 'clamp(40px,6.5vw,84px)' }}>YOUR DESIGN.<br />YOUR SHIRT.</h1>
        </div>
        <div className="rf-card" style={{ padding: '16px 18px' }}>
          <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 20, letterSpacing: '.08em' }}>ORDERING 10+ SHIRTS?</div>
          <div style={{ fontSize: 14, color: '#9A9AA2', marginTop: 4 }}>Talk to us about a bulk order.</div>
          <button onClick={() => setModal('bulk')} style={{ marginTop: 12, background: 'transparent', border: '1px solid var(--rf-red)', color: 'var(--rf-red)', padding: '10px 16px', fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.16em', cursor: 'pointer' }}>CONTACT US</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20, alignItems: 'start', marginTop: 32 }}>
        {/* LIVE PREVIEW */}
        <div className="rf-card" style={{ padding: 20, position: 'sticky', top: 'calc(var(--rf-header-h) + 14px)' }}>
          <div className="rf-meta" style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span>LIVE PREVIEW — {colour.toUpperCase()} / {location}</span>
            <span>{shirt.name}</span>
          </div>
          <div style={{ position: 'relative', marginTop: 14, aspectRatio: '3 / 3.6', background: SHIRT_BG[colour], border: '1px solid var(--rf-line)', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: 14, left: 14, fontFamily: 'var(--rf-mono)', fontSize: 9, letterSpacing: '.18em', color: light ? 'rgba(0,0,0,.45)' : '#55555E' }}>
              [ SHIRT MOCKUP PLATE — {location} ]
            </span>
            <div style={{ position: 'relative', width: '62%', height: '70%', border: `1px dashed ${light ? 'rgba(0,0,0,.35)' : 'rgba(255,255,255,.22)'}`, display: 'grid', placeItems: 'center' }}>
              <span style={{ position: 'absolute', top: 6, left: 8, fontFamily: 'var(--rf-mono)', fontSize: 9, letterSpacing: '.18em', color: light ? 'rgba(0,0,0,.35)' : 'rgba(255,255,255,.3)' }}>
                PRINT AREA {PRINT_AREA.w} × {PRINT_AREA.h} CM
              </span>
              {metrics ? (
                <div style={{ width: `${(metrics.w / PRINT_AREA.w) * 100}%`, height: `${(metrics.h / PRINT_AREA.h) * 100}%`, transform: `rotate(${rotation}deg)`, transition: 'transform .12s linear' }}>
                  <img src={art.url} alt="Your artwork" style={{ width: '100%', height: '100%', objectFit: 'fill', display: 'block', outline: '1px solid rgba(225,6,0,.55)' }} />
                </div>
              ) : (
                <span className="rf-meta" style={{ fontSize: 10, textAlign: 'center', padding: '0 16px' }}>YOUR ARTWORK APPEARS HERE</span>
              )}
            </div>
          </div>

          {metrics && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--rf-line)', marginTop: 14, border: '1px solid var(--rf-line)' }}>
              {[['WIDTH', cm(metrics.w)], ['HEIGHT', cm(metrics.h)], ['AREA', cm2(metrics.area)]].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--rf-bg)', padding: 12 }}>
                  <div className="rf-meta" style={{ fontSize: 9 }}>{k}</div>
                  <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 24 }}>{v.toUpperCase()}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CONTROLS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* STEP 1 */}
          <section className="rf-card" style={{ padding: 20 }}>
            <div className="rf-kicker">STEP 01 — CHOOSE YOUR SHIRT</div>
            <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
              {SHIRTS.map((s) => (
                <button key={s.id} onClick={() => setShirtId(s.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, background: shirtId === s.id ? 'var(--rf-surface-2)' : 'transparent', border: `1px solid ${shirtId === s.id ? 'var(--rf-red)' : 'var(--rf-line)'}`, color: 'var(--rf-ink)', padding: '14px 16px', cursor: 'pointer', textAlign: 'left' }}>
                  <span>
                    <span style={{ display: 'block', fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 19, letterSpacing: '.06em', textTransform: 'uppercase' }}>{s.name}</span>
                    <span className="rf-meta" style={{ fontSize: 9 }}>{s.gsm} · PLACEHOLDER SUPPLIER</span>
                  </span>
                  <span style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 19, color: 'var(--rf-red)' }}>{money(s.price)}</span>
                </button>
              ))}
            </div>

            <div className="rf-meta" style={{ margin: '18px 0 8px' }}>COLOUR</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SHIRT_COLOURS.map((c) => (
                <button key={c.label} onClick={() => setColour(c.label)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: `1px solid ${colour === c.label ? 'var(--rf-red)' : 'var(--rf-line)'}`, color: colour === c.label ? '#fff' : 'var(--rf-mute)', padding: '10px 14px', fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.14em', cursor: 'pointer' }}>
                  <span style={{ width: 12, height: 12, background: c.swatch, border: '1px solid #3A3A40' }} />{c.label.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="rf-meta" style={{ margin: '18px 0 8px' }}>SIZE</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SIZES.map((s) => (
                <button key={s} onClick={() => setSize(s)} style={{ minWidth: 56, padding: '12px 10px', background: size === s ? 'var(--rf-red)' : 'transparent', border: `1px solid ${size === s ? 'var(--rf-red)' : 'var(--rf-line)'}`, color: size === s ? '#fff' : 'var(--rf-ink)', fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 15, letterSpacing: '.1em', cursor: 'pointer' }}>{s}</button>
              ))}
            </div>
          </section>

          {/* STEPS 2 + 3 */}
          <section className="rf-card" style={{ padding: 20 }}>
            <div className="rf-kicker">STEP 02 — PRINT LOCATION</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
              {['FRONT', 'BACK'].map((l) => (
                <button key={l} onClick={() => setLocation(l)} style={{ background: location === l ? 'var(--rf-red)' : 'transparent', border: `1px solid ${location === l ? 'var(--rf-red)' : 'var(--rf-line)'}`, color: location === l ? '#fff' : 'var(--rf-ink)', padding: 16, fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 19, letterSpacing: '.14em', cursor: 'pointer' }}>{l}</button>
              ))}
            </div>
            <div className="rf-meta" style={{ fontSize: 9, marginTop: 10, color: '#6E6E78' }}>ONE PRINT LOCATION PER CUSTOM SHIRT · MULTI-LOCATION COMING LATER</div>

            <div className="rf-kicker" style={{ marginTop: 24 }}>STEP 03 — ROTATION</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}>
              <input type="range" min={0} max={359} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} style={{ flex: 1, accentColor: 'var(--rf-red)' }} />
              <span style={{ fontFamily: 'var(--rf-mono)', fontSize: 12, minWidth: 52, textAlign: 'right' }}>{rotation}°</span>
              <button onClick={() => setRotation(0)} style={{ background: 'transparent', border: '1px solid var(--rf-line)', color: 'var(--rf-mute)', padding: '9px 12px', fontFamily: 'var(--rf-mono)', fontSize: 9, letterSpacing: '.14em', cursor: 'pointer' }}>RESET</button>
            </div>
          </section>

          {/* STEP 4 */}
          <section className="rf-card" style={{ padding: 20 }}>
            <div className="rf-kicker">STEP 04 — UPLOAD ARTWORK</div>
            <label style={{ display: 'block', marginTop: 14, border: '1px dashed #3E3E45', padding: '26px 20px', textAlign: 'center', cursor: 'pointer', background: 'var(--rf-surface-2)' }}>
              <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 22, letterSpacing: '.08em', textTransform: 'uppercase' }}>
                {busy ? 'ANALYSING ARTWORK…' : art ? 'REPLACE ARTWORK' : 'DROP OR CHOOSE YOUR FILE'}
              </div>
              <div className="rf-meta" style={{ fontSize: 10, marginTop: 8 }}>PNG · JPG · SVG — BEST RESULTS REQUIRE HIGH-RESOLUTION ARTWORK</div>
              <input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={onFile} style={{ display: 'none' }} />
            </label>

            {error && <div style={{ marginTop: 12, padding: 12, borderLeft: '2px solid var(--rf-red)', background: 'rgba(225,6,0,.08)', fontSize: 14, color: '#FFB8B5' }}>{error}</div>}

            {metrics && (
              <>
                <div style={{ marginTop: 16, padding: 14, border: `1px solid ${quality.level === 'LOW' ? 'var(--rf-red)' : 'var(--rf-line)'}`, background: 'var(--rf-surface-2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 19, letterSpacing: '.1em', textTransform: 'uppercase', color: quality_colour }}>{quality.title}</span>
                    <span className="rf-meta" style={{ fontSize: 9 }}>{metrics.dpi} DPI AT THIS SIZE</span>
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.55, color: '#A8A8B0', marginTop: 8 }}>{quality.body}</div>
                  <div className="rf-meta" style={{ fontSize: 9, color: '#6E6E78', marginTop: 10 }}>
                    {art.name.toUpperCase()} · {art.pxW} × {art.pxH} PX VISIBLE · {art.inkCoverage}% OF FILE IS INK
                  </div>
                </div>

                <div style={{ marginTop: 18 }}>
                  <div className="rf-meta" style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <span>ARTWORK SIZE</span><span>MAX {cm(metrics.maxW).toUpperCase()} · A3 LIMIT</span>
                  </div>
                  <input type="range" min={4} max={Math.round(metrics.maxW * 10) / 10} step={0.1} value={Math.min(widthCm, metrics.maxW)} onChange={(e) => setWidthCm(Number(e.target.value))} style={{ width: '100%', marginTop: 10, accentColor: 'var(--rf-red)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--rf-mono)', fontSize: 9, color: '#6E6E78', marginTop: 4 }}>
                    <span>SMALL</span><span>{metrics.atLimit ? 'A3 MAXIMUM REACHED' : 'LARGER'}</span>
                  </div>
                </div>
              </>
            )}
          </section>

          {/* LIVE PRICE */}
          {metrics && (
            <section style={{ border: '1px solid var(--rf-red)', background: 'linear-gradient(180deg,#140A0A,#111113)', padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <div className="rf-meta">PRINT COST</div>
                  <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 900, fontSize: 56, lineHeight: 1, color: 'var(--rf-red)' }}>{money(metrics.tier.price)}</div>
                  <div style={{ fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.16em', color: '#fff', marginTop: 6 }}>
                    {metrics.tier.id} PRINT · {metrics.w.toFixed(1)} × {metrics.h.toFixed(1)} CM
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="rf-meta">VISIBLE ARTWORK</div>
                  <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 22 }}>{cm2(metrics.area).toUpperCase()}</div>
                  <div className="rf-meta" style={{ fontSize: 9, color: '#6E6E78', marginTop: 4 }}>TRANSPARENT SPACE EXCLUDED</div>
                </div>
              </div>

              <button onClick={() => setPricingOpen((v) => !v)} aria-expanded={pricingOpen} style={{ width: '100%', marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: '1px solid var(--rf-line)', color: 'var(--rf-ink)', padding: 14, fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.18em', cursor: 'pointer' }}>
                HOW DOES PRICING WORK?<span style={{ color: 'var(--rf-red)' }}>{pricingOpen ? '−' : '+'}</span>
              </button>
              <div style={{ overflow: 'hidden', maxHeight: pricingOpen ? 620 : 0, transition: 'max-height .3s ease' }}>
                <p style={{ padding: '16px 2px 0', margin: 0, fontSize: 14, lineHeight: 1.6, color: '#A8A8B0' }}>
                  Custom print pricing is based on the visible area of your artwork — the actual printed ink, not the file size or the empty space around it. We measure the artwork's bounding box, work out the area in cm², and match it to the closest print tier. Bigger artwork means more printed area, which means a higher tier.
                </p>
                <div style={{ display: 'grid', gap: 1, background: 'var(--rf-line)', marginTop: 14, border: '1px solid var(--rf-line)' }}>
                  {PRINT_TIERS.map((t) => {
                    const active = metrics.tier.id === t.id;
                    return (
                      <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, background: active ? '#1B1215' : 'var(--rf-bg)', padding: '12px 14px' }}>
                        <span style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 18, letterSpacing: '.1em', color: active ? 'var(--rf-red)' : 'var(--rf-ink)' }}>{t.id}</span>
                        <span className="rf-meta" style={{ fontSize: 9 }}>{t.w} × {t.h} CM</span>
                        <span style={{ fontFamily: 'var(--rf-mono)', fontSize: 11, color: active ? 'var(--rf-red)' : 'var(--rf-ink)' }}>{money(t.price)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* SHEET */}
          {metrics && (
            <SheetVisualiser
              sheet={previewSheet}
              note={`Preview only — your space is reserved on sheet #${previewSheet.id} the moment your order is placed. We pack sheets automatically so nothing overlaps and no space is wasted.`}
            />
          )}

          {/* SUMMARY */}
          {metrics && (
            <section className="rf-card" style={{ padding: 20 }}>
              <div className="rf-display" style={{ fontSize: 28, letterSpacing: '.06em' }}>CUSTOM T-SHIRT</div>
              <div style={{ display: 'grid', gap: 1, background: 'var(--rf-line)', marginTop: 14, border: '1px solid var(--rf-line)' }}>
                {[
                  ['SHIRT', shirt.name.toUpperCase()],
                  ['COLOUR', colour.toUpperCase()],
                  ['SIZE', size],
                  ['PRINT LOCATION', location],
                  ['PRINT SIZE', metrics.tier.id],
                  ['ARTWORK', `${metrics.w.toFixed(1)} × ${metrics.h.toFixed(1)} CM`],
                  ['PRINT AREA', cm2(metrics.area).toUpperCase()],
                  ['SHIRT COST', money(shirt.price)],
                  ['PRINT COST', money(metrics.tier.price)],
                  ['SHEET', '#' + previewSheet.id],
                  ['EST. SHIPPING', `${PRODUCTION_DAYS} BUSINESS DAYS AFTER PRODUCTION`]
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, background: 'var(--rf-bg)', padding: '11px 14px' }}>
                    <span className="rf-meta" style={{ fontSize: 10 }}>{k}</span>
                    <span style={{ fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.12em', textAlign: 'right' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 16 }}>
                <span className="rf-meta">TOTAL</span>
                <span style={{ fontFamily: 'var(--rf-display)', fontWeight: 900, fontSize: 36, color: 'var(--rf-red)' }}>{money(shirt.price + metrics.tier.price)}</span>
              </div>
              <button className="rf-btn" style={{ width: '100%', marginTop: 16, fontSize: 18 }} onClick={add}>ADD TO CART</button>
              <div className="rf-meta" style={{ fontSize: 9, color: '#6E6E78', marginTop: 10, textAlign: 'center' }}>
                SHEET SPACE IS ALLOCATED ONLY ONCE YOUR ORDER IS PLACED
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
