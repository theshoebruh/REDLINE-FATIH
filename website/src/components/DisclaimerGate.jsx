import React, { useEffect, useState } from 'react';

/**
 * Work-in-progress disclaimer shown on arrival.
 *
 * Acknowledged state is kept in sessionStorage, so it appears once per visit
 * rather than on every route change. Remove this component (and its mount in
 * SiteLayout) once real artwork lands and the store goes live.
 */
const KEY = 'rf-disclaimer-ack';

export const DISCLAIMER_LINES = [
  'What you’re about to see is a work in progress.',
  'The designs shown are AI-generated and serve as placeholders only. Real artists will be hired to create the final, unique designs — no AI will be used in the artwork of the real product.',
  'There are no shirts available yet and the store is not live. Nothing here can be bought.'
];

const BADGES = [
  { label: 'DESIGNS', value: 'PLACEHOLDER', accent: true },
  { label: 'STORE', value: 'NOT LIVE', accent: true },
  { label: 'FINAL ARTWORK', value: 'HUMAN MADE', accent: false }
];

export default function DisclaimerGate() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === '1') setOpen(false);
    } catch (err) { /* private mode — just show it */ }
  }, []);

  if (!open) return null;

  const accept = () => {
    try { sessionStorage.setItem(KEY, '1'); } catch (err) { /* ignore */ }
    setOpen(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(6,6,7,.92)', backdropFilter: 'blur(10px)', display: 'grid', placeItems: 'center', padding: 20, overflowY: 'auto', animation: 'rf-in .22s ease' }}>
      <div style={{ width: 'min(640px,100%)', background: 'var(--rf-bg)', border: '1px solid var(--rf-line)', borderTop: '3px solid var(--rf-red)', padding: 'clamp(24px,4vw,38px)', animation: 'rf-up .3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 26, height: 2, background: 'var(--rf-red)' }} />
          <span className="rf-kicker" style={{ whiteSpace: 'nowrap' }}>BEFORE YOU GO IN</span>
        </div>

        <h2 className="rf-display" style={{ marginTop: 18, fontSize: 'clamp(34px,5.5vw,54px)', lineHeight: .92 }}>WORK IN<br />PROGRESS.</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 22, borderLeft: '2px solid var(--rf-line)', paddingLeft: 18 }}>
          {DISCLAIMER_LINES.map((line, i) => (
            <p key={i} style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: '#C2C2C8', textWrap: 'pretty' }}>{line}</p>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 1, background: 'var(--rf-line)', border: '1px solid var(--rf-line)', marginTop: 24 }}>
          {BADGES.map((b) => (
            <div key={b.label} style={{ background: 'var(--rf-surface)', padding: '13px 15px' }}>
              <div className="rf-meta" style={{ fontSize: 9 }}>{b.label}</div>
              <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 17, letterSpacing: '.06em', color: b.accent ? 'var(--rf-red)' : 'var(--rf-ink)', marginTop: 4 }}>{b.value}</div>
            </div>
          ))}
        </div>

        <button className="rf-btn" onClick={accept} style={{ width: '100%', marginTop: 24, fontSize: 18, padding: 19, whiteSpace: 'nowrap' }}>
          GOT IT — LET ME LOOK AROUND
        </button>
      </div>
    </div>
  );
}
