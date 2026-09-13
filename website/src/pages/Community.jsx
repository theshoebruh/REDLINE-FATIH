import React, { useState } from 'react';
import Plate from '../components/Plate.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { COMMUNITY_TILES } from '../data/site.js';

/** Community page + a placeholder submission flow (nothing is stored yet). */
export default function Community() {
  const { notify } = useStore();
  const [name, setName] = useState('');
  const [car, setCar] = useState('');
  const [photo, setPhoto] = useState('');

  const submit = () => {
    if (!name.trim() || !photo) return notify('Add your name and a photo');
    setName(''); setCar(''); setPhoto('');
    notify('Thanks — submission received');
  };

  return (
    <main className="rf-shell" style={{ padding: '36px var(--rf-gutter) 90px' }}>
      <span className="rf-kicker">COMMUNITY</span>
      <h1 className="rf-display" style={{ marginTop: 12, fontSize: 'clamp(42px,7vw,92px)', lineHeight: .88 }}>MEETS. BUILDS.<br />BROTHERS.</h1>
      <p style={{ margin: '18px 0 0', maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: '#B9B9C0', textWrap: 'pretty' }}>
        Redline Faith isn't a shop with a logo. It's a crew — parking garages, mountain passes, track days and Sunday mornings.
      </p>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', marginTop: 36 }}>
        {COMMUNITY_TILES.map((t) => (
          <Plate key={t.no} label={t.plate} style={{ minHeight: t.tall ? 320 : 260, border: '1px solid var(--rf-line)' }}>
            <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--rf-mono)', fontSize: 9, letterSpacing: '.16em', color: 'var(--rf-red)' }}>{t.no}</span>
            <span style={{ position: 'absolute', left: 12, right: 12, bottom: 12, fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 20, letterSpacing: '.06em', textTransform: 'uppercase' }}>{t.caption}</span>
          </Plate>
        ))}
      </div>

      <section className="rf-card" style={{ marginTop: 44, padding: 28 }}>
        <div style={{ display: 'grid', gap: 28, gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', alignItems: 'start' }}>
          <div>
            <h2 className="rf-display" style={{ fontSize: 'clamp(32px,4.5vw,58px)', lineHeight: .95 }}>
              WEAR REDLINE FAITH?<br /><span style={{ color: 'var(--rf-red)' }}>SHOW US.</span>
            </h2>
            <p style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.6, color: '#A8A8B0' }}>
              Send us your shot — you, your car, your crew. Featured submissions go on this page and our socials.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input className="rf-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="YOUR NAME" />
            <input className="rf-input" value={car} onChange={(e) => setCar(e.target.value)} placeholder="YOUR CAR" />
            <label style={{ border: '1px dashed #3E3E45', padding: 18, textAlign: 'center', cursor: 'pointer', fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.14em', color: 'var(--rf-mute)' }}>
              {photo ? photo.toUpperCase() : 'ATTACH A PHOTO'}
              <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0]?.name || '')} style={{ display: 'none' }} />
            </label>
            <button className="rf-btn" onClick={submit}>SUBMIT</button>
            <div className="rf-meta" style={{ fontSize: 9, color: '#6E6E78', textAlign: 'center' }}>PLACEHOLDER FLOW — SUBMISSIONS NOT STORED IN PROTOTYPE</div>
          </div>
        </div>
      </section>
    </main>
  );
}
