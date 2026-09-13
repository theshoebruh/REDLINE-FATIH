import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { NAV, BRAND } from '../data/site.js';

/** Sticky nav. Collapses to a burger sheet under 1100px. */
export default function Header() {
  const { route, navigate, count, setCartOpen, query, setQuery, notify } = useStore();
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setCompact(window.innerWidth < 1100);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const goto = (r) => (e) => { e.preventDefault(); setMenuOpen(false); navigate(r); };
  const search = (e) => { setQuery(e.target.value); if (route.name !== 'shop') navigate('shop'); };

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 60, background: 'rgba(9,9,10,.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--rf-line)' }}>
        <div className="rf-shell" style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px var(--rf-gutter)' }}>
          <a href="#" onClick={goto('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--rf-ink)', flex: 'none' }}>
            <img src="images/brand/RF-logo-red.svg" alt="" width="34" height="34" />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: 'var(--rf-display)', fontWeight: 900, fontSize: 19, letterSpacing: '.06em' }}>{BRAND.name.toUpperCase()}</span>
              <span style={{ fontFamily: 'var(--rf-mono)', fontSize: 8, letterSpacing: '.22em', color: 'var(--rf-mute)', marginTop: 3 }}>{BRAND.triad.toUpperCase()}</span>
            </span>
          </a>

          {!compact && (
            <nav style={{ display: 'flex', gap: 24, marginLeft: 10 }}>
              {NAV.map((n) => (
                <a key={n.label} href="#" onClick={goto(n.route)} style={{ position: 'relative', whiteSpace: 'nowrap', fontFamily: 'var(--rf-display)', fontWeight: 700, fontSize: 15, letterSpacing: '.12em', textTransform: 'uppercase', padding: '8px 0', color: route.name === n.route ? '#fff' : 'var(--rf-mute)' }}>
                  {n.label}
                  {route.name === n.route && <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: 'var(--rf-red)' }} />}
                </a>
              ))}
            </nav>
          )}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}>
            {!compact && (
              <>
                <input value={query} onChange={search} placeholder="SEARCH" className="rf-input" style={{ width: 126, padding: '9px 11px', fontSize: 10, letterSpacing: '.14em', background: 'var(--rf-surface)' }} />
                <button onClick={() => notify('Accounts come later — guest checkout for now')} style={{ background: 'transparent', border: '1px solid var(--rf-line)', color: 'var(--rf-mute)', padding: '9px 12px', fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.14em', cursor: 'pointer' }}>ACCOUNT</button>
              </>
            )}
            <button onClick={() => setCartOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--rf-red)', border: 'none', color: '#fff', padding: '10px 14px', fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 14, letterSpacing: '.14em', cursor: 'pointer' }}>
              CART<span style={{ fontFamily: 'var(--rf-mono)', fontSize: 10, background: 'rgba(0,0,0,.35)', padding: '2px 6px' }}>{count}</span>
            </button>
            {compact && (
              <button onClick={() => setMenuOpen((v) => !v)} aria-label="Menu" style={{ width: 42, height: 42, background: 'transparent', border: '1px solid var(--rf-line)', color: 'var(--rf-ink)', fontSize: 20, cursor: 'pointer' }}>{menuOpen ? '✕' : '≡'}</button>
            )}
          </div>
        </div>
        <div style={{ height: 2, background: 'linear-gradient(90deg,var(--rf-red) 0 18%,transparent 18%)' }} />
      </header>

      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 55 }} />
          <nav style={{ position: 'fixed', left: 0, right: 0, top: 'var(--rf-header-h)', zIndex: 58, background: 'var(--rf-bg)', borderBottom: '1px solid var(--rf-line)', padding: '18px 20px 24px', display: 'flex', flexDirection: 'column', animation: 'rf-in .16s ease' }}>
            {NAV.map((n) => (
              <a key={n.label} href="#" onClick={goto(n.route)} style={{ borderBottom: '1px solid var(--rf-line)', padding: '16px 0', fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 24, letterSpacing: '.1em', textTransform: 'uppercase', color: route.name === n.route ? '#fff' : 'var(--rf-mute)' }}>{n.label}</a>
            ))}
            <input value={query} onChange={search} placeholder="SEARCH PRODUCTS" className="rf-input" style={{ marginTop: 16, background: 'var(--rf-surface)' }} />
          </nav>
        </>
      )}
    </>
  );
}
