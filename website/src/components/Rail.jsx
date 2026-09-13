import React, { useRef } from 'react';

/** Horizontal carousel with arrow controls (reviews, related products). */
export default function Rail({ title, meta, children, step = 320 }) {
  const ref = useRef(null);
  const nudge = (dir) => () => ref.current?.scrollBy({ left: dir * step, behavior: 'smooth' });

  return (
    <section style={{ marginTop: 60, borderTop: '1px solid var(--rf-line)', paddingTop: 36 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h2 className="rf-display" style={{ fontSize: 'clamp(30px,4vw,52px)' }}>{title}</h2>
          {meta && <div className="rf-meta" style={{ marginTop: 8 }}>{meta}</div>}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={nudge(-1)} aria-label="Previous" style={{ width: 44, height: 44, background: 'transparent', border: '1px solid var(--rf-line)', color: 'var(--rf-ink)', cursor: 'pointer', fontSize: 16 }}>←</button>
          <button onClick={nudge(1)} aria-label="Next" style={{ width: 44, height: 44, background: 'transparent', border: '1px solid var(--rf-line)', color: 'var(--rf-ink)', cursor: 'pointer', fontSize: 16 }}>→</button>
        </div>
      </div>
      <div className="rf-rail" ref={ref}>{children}</div>
    </section>
  );
}
