import React from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { BRAND, FOOTER_COLUMNS } from '../data/site.js';

export default function Footer() {
  const { navigate, setModal } = useStore();
  const click = (link) => (e) => {
    e.preventDefault();
    if (link.action === 'bulk') return setModal('bulk');
    navigate(link.route, link.filter ? { filter: link.filter } : {});
  };

  return (
    <footer style={{ borderTop: '1px solid var(--rf-line)', background: 'var(--rf-surface)' }}>
      <div className="rf-shell" style={{ padding: '52px var(--rf-gutter) 30px', display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))' }}>
        <div>
          <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 900, fontSize: 30, letterSpacing: '.04em' }}>{BRAND.name.toUpperCase()}</div>
          <div style={{ fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.16em', color: 'var(--rf-red)', marginTop: 8 }}>{BRAND.tagline.toUpperCase()}</div>
          <div style={{ fontFamily: 'var(--rf-mono)', fontSize: 9, letterSpacing: '.14em', color: '#6E6E78', marginTop: 18, lineHeight: 1.7 }}>
            PROTOTYPE · PLACEHOLDER CONTENT<br />CONTACT + LEGAL DETAILS TBC
          </div>
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="rf-meta">{col.title.toUpperCase()}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
              {col.links.map((l) => (
                <a key={l.label} href="#" onClick={click(l)} style={{ fontFamily: 'var(--rf-display)', fontWeight: 700, fontSize: 16, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--rf-ink)' }}>{l.label}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid var(--rf-line)', padding: '16px 20px', textAlign: 'center', fontFamily: 'var(--rf-mono)', fontSize: 9, letterSpacing: '.16em', color: '#5C5C66' }}>
        © 2026 REDLINE FAITH — PROTOTYPE BUILD · ALL PRICES ZAR
      </div>
    </footer>
  );
}
