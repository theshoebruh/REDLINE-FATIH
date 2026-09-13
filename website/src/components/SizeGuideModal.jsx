import React from 'react';
import { SIZE_TABLE } from '../data/shirts.js';

/** Deliberately NOT inside the image gallery — opened from its own button. */
export default function SizeGuideModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 90, display: 'grid', placeItems: 'center', padding: 20, animation: 'rf-in .16s ease' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(560px,100%)', background: 'var(--rf-bg)', border: '1px solid var(--rf-line)', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="rf-display" style={{ fontSize: 28, letterSpacing: '.06em' }}>SIZE GUIDE</span>
          <button onClick={onClose} style={{ background: 'transparent', border: '1px solid var(--rf-line)', color: 'var(--rf-ink)', width: 34, height: 34, cursor: 'pointer' }}>✕</button>
        </div>
        <div className="rf-meta" style={{ fontSize: 9, marginTop: 8 }}>MEASUREMENTS IN CM · PLACEHOLDER SUPPLIER SPEC</div>
        <div style={{ display: 'grid', gap: 1, background: 'var(--rf-line)', marginTop: 18, border: '1px solid var(--rf-line)' }}>
          <div className="rf-meta" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: 'var(--rf-surface-2)', padding: '11px 14px', fontSize: 9 }}>
            <span>SIZE</span><span>CHEST</span><span>LENGTH</span><span>SLEEVE</span>
          </div>
          {SIZE_TABLE.map((r) => (
            <div key={r.size} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: 'var(--rf-bg)', padding: '12px 14px', fontFamily: 'var(--rf-mono)', fontSize: 11 }}>
              <span style={{ color: 'var(--rf-red)' }}>{r.size}</span><span>{r.chest}</span><span>{r.length}</span><span>{r.sleeve}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
