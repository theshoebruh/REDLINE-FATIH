import React from 'react';
import SheetVisualiser from '../components/SheetVisualiser.jsx';
import { useStore } from '../context/StoreContext.jsx';

/** Post-order: the customer sees which production sheet they landed on. */
export default function Confirmation() {
  const { order, navigate } = useStore();
  const complete = order && order.fill >= 97;

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '60px var(--rf-gutter) 100px' }}>
      <span className="rf-kicker">ORDER {order?.reference || 'RF-0000'}</span>
      <h1 className="rf-display" style={{ marginTop: 14, fontSize: 'clamp(42px,7vw,88px)' }}>YOU'RE ON<br />THE SHEET.</h1>
      <p style={{ margin: '18px 0 0', fontSize: 17, lineHeight: 1.6, color: '#B9B9C0', maxWidth: 540 }}>
        Your order has entered production. Estimated shipping is {order?.etaDays || 5} business days after production begins.
      </p>

      {order?.sheet && (
        <div style={{ marginTop: 34 }}>
          <SheetVisualiser
            sheet={order.sheet}
            status={complete ? 'SHEET COMPLETE · PRODUCTION READY' : 'FILLING · PRINTS WHEN FULL'}
          />
        </div>
      )}

      <div className="rf-row" style={{ marginTop: 30 }}>
        <button className="rf-btn" onClick={() => navigate('shop')}>KEEP SHOPPING</button>
        <button className="rf-btn rf-btn--ghost" onClick={() => navigate('home')}>BACK HOME</button>
      </div>
    </main>
  );
}
