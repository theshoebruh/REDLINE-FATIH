import React from 'react';
import Plate from '../components/Plate.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { ABOUT_BLOCKS } from '../data/site.js';

export default function About() {
  const { navigate } = useStore();
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '36px var(--rf-gutter) 90px' }}>
      <span className="rf-kicker">ABOUT</span>
      <h1 className="rf-display" style={{ marginTop: 12, fontSize: 'clamp(44px,8vw,110px)', lineHeight: .86 }}>CHRIST.<br />CARS.<br />COMMUNITY.</h1>
      <p style={{ margin: '26px 0 0', fontSize: 20, lineHeight: 1.55, color: '#D2D2D6', maxWidth: 680, textWrap: 'pretty' }}>
        It started in a garage with a cold engine, a Bible on the workbench and a stupid idea: what if the thing we wear said both? Not a church shirt. Not another car brand. Both, honestly.
      </p>

      <div style={{ display: 'grid', gap: 1, background: 'var(--rf-line)', marginTop: 44, border: '1px solid var(--rf-line)' }}>
        {ABOUT_BLOCKS.map((b) => (
          <div key={b.no} style={{ background: 'var(--rf-bg)', padding: 28, display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
            <div>
              <div className="rf-kicker">{b.no.toUpperCase()}</div>
              <div className="rf-display" style={{ fontSize: 40, marginTop: 10 }}>{b.title}</div>
            </div>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: '#A8A8B0', textWrap: 'pretty' }}>{b.body}</p>
          </div>
        ))}
      </div>

      <Plate label="[ FOUNDER / GARAGE PLATE — REAL PHOTOGRAPHY TBC ]" style={{ marginTop: 40, minHeight: 300, border: '1px solid var(--rf-line)' }} />

      <div className="rf-row" style={{ marginTop: 32 }}>
        <button className="rf-btn" onClick={() => navigate('shop')}>SHOP THE COLLECTION</button>
        <button className="rf-btn rf-btn--ghost" onClick={() => navigate('community')}>MEET THE CREW</button>
      </div>
    </main>
  );
}
