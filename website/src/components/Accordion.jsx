import React, { useState } from 'react';

/** Expand/collapse block — keeps the product page clean by default. */
export default function Accordion({ title, children, maxHeight = 340 }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid var(--rf-line)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', color: 'var(--rf-ink)', padding: '20px 0', fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 19, letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer', textAlign: 'left' }}
      >
        {title}<span style={{ fontFamily: 'var(--rf-mono)', fontSize: 14, color: 'var(--rf-red)' }}>{open ? '−' : '+'}</span>
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? maxHeight : 0, transition: 'max-height .28s ease' }}>
        <div style={{ paddingBottom: 20, fontSize: 15, lineHeight: 1.65, color: '#A8A8B0', whiteSpace: 'pre-line' }}>{children}</div>
      </div>
    </div>
  );
}
