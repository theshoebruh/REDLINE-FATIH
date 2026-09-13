import React from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { money } from '../utils/format.js';

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, removeLine, setQty, subtotal, count, navigate } = useStore();
  if (!cartOpen) return null;

  return (
    <>
      <div onClick={() => setCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.65)', zIndex: 80, animation: 'rf-in .18s ease' }} />
      <aside style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(430px,100%)', background: 'var(--rf-bg)', borderLeft: '1px solid var(--rf-line)', zIndex: 81, display: 'flex', flexDirection: 'column', animation: 'rf-in .2s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottom: '1px solid var(--rf-line)' }}>
          <span style={{ fontFamily: 'var(--rf-display)', fontWeight: 900, fontSize: 26, letterSpacing: '.08em' }}>CART ({count})</span>
          <button onClick={() => setCartOpen(false)} style={{ background: 'transparent', border: '1px solid var(--rf-line)', color: 'var(--rf-ink)', width: 36, height: 36, cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {!cart.length && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div className="rf-meta" style={{ fontSize: 11 }}>YOUR CART IS EMPTY</div>
              <button className="rf-btn" style={{ marginTop: 18, fontSize: 16, padding: '15px 22px' }} onClick={() => navigate('shop')}>SHOP NOW</button>
            </div>
          )}
          {cart.map((line, i) => (
            <div key={i} className="rf-card" style={{ display: 'flex', gap: 14, padding: 14 }}>
              <div style={{ flex: 'none', width: 62, height: 78, border: '1px solid var(--rf-line)', backgroundColor: '#141418', backgroundImage: line.image ? `url("${line.image}")` : 'repeating-linear-gradient(135deg,#141418 0 7px,#1B1B22 7px 14px)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 19, letterSpacing: '.06em', textTransform: 'uppercase' }}>{line.title}</span>
                  <button onClick={() => removeLine(i)} style={{ background: 'transparent', border: 'none', color: 'var(--rf-mute)', cursor: 'pointer', fontFamily: 'var(--rf-mono)', fontSize: 10 }}>REMOVE</button>
                </div>
                <div className="rf-meta" style={{ fontSize: 9, marginTop: 6, whiteSpace: 'pre-line' }}>{line.meta}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--rf-line)' }}>
                    <button onClick={() => setQty(i, -1)} style={{ width: 32, height: 32, background: 'transparent', border: 'none', color: 'var(--rf-ink)', cursor: 'pointer', fontSize: 15 }}>−</button>
                    <span style={{ width: 34, textAlign: 'center', fontFamily: 'var(--rf-mono)', fontSize: 12 }}>{line.qty}</span>
                    <button onClick={() => setQty(i, 1)} style={{ width: 32, height: 32, background: 'transparent', border: 'none', color: 'var(--rf-ink)', cursor: 'pointer', fontSize: 15 }}>+</button>
                  </div>
                  <span style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 19, color: 'var(--rf-red)' }}>{money(line.price * line.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--rf-line)', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="rf-meta" style={{ fontSize: 11 }}>SUBTOTAL</span>
            <span style={{ fontFamily: 'var(--rf-display)', fontWeight: 900, fontSize: 32 }}>{money(subtotal)}</span>
          </div>
          <button className="rf-btn" disabled={!cart.length} style={{ width: '100%', marginTop: 14, fontSize: 18 }} onClick={() => navigate('checkout')}>GUEST CHECKOUT</button>
        </div>
      </aside>
    </>
  );
}
