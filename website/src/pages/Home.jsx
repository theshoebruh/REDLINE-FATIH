import React from 'react';
import Plate from '../components/Plate.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { BRAND, CUSTOM_STEPS, COMMUNITY_TILES } from '../data/site.js';
import { COLLECTIONS } from '../data/collections.js';
import { PRODUCTS } from '../data/products.js';
import { PRINT_TIERS } from '../data/pricing.js';
import { money } from '../utils/format.js';

/** Homepage story: 01 brand → 02 culture → 03 collections → 04 clothing → 05 custom → 06 community → 07 message → 08 shop. */
export default function Home() {
  const { navigate, setModal } = useStore();
  const stats = [
    { v: COLLECTIONS.length.toString().padStart(2, '0'), k: 'COLLECTIONS' },
    { v: '01', k: 'PRODUCT TYPE — TEES' },
    { v: '∞', k: 'CUSTOM PRINTS' }
  ];

  return (
    <main>
      {/* 01 — THE BRAND */}
      <section style={{ position: 'relative', minHeight: 'min(88vh,780px)', display: 'flex', alignItems: 'flex-end', borderBottom: '1px solid var(--rf-line)', backgroundColor: '#08080A', backgroundImage: `url("${BRAND.heroImage}")`, backgroundSize: 'cover', backgroundPosition: '52% 40%' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(8,8,10,.4) 0%,rgba(8,8,10,0) 26%,rgba(8,8,10,.74) 66%,rgba(8,8,10,.97) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(75% 60% at 10% 90%,rgba(225,6,0,.2),transparent 62%)' }} />
        <div className="rf-shell" style={{ position: 'relative', padding: '140px var(--rf-gutter) 52px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <span style={{ width: 26, height: 2, background: 'var(--rf-red)' }} />
            <span style={{ fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.26em', color: '#C6C6CC' }}>01 — THE BRAND · {BRAND.est.toUpperCase()}</span>
          </div>
          <h1 className="rf-display" style={{ maxWidth: 900, fontSize: 'clamp(40px,6.6vw,88px)', textShadow: '0 2px 26px rgba(0,0,0,.85)' }}>
            SHOUTING PRAISE<br />AT THE <span style={{ color: 'var(--rf-red)' }}>REDLINE.</span>
          </h1>
          <p style={{ margin: '18px 0 0', maxWidth: 520, fontSize: 17, lineHeight: 1.55, color: '#DEDEE3', textWrap: 'pretty', textShadow: '0 1px 14px rgba(0,0,0,.9)' }}>{BRAND.heroBlurb}</p>
          <div className="rf-row" style={{ marginTop: 30 }}>
            <button className="rf-btn" onClick={() => navigate('shop')}>SHOP THE COLLECTION</button>
            <button className="rf-btn rf-btn--ghost" onClick={() => navigate('custom')} style={{ background: 'rgba(9,9,10,.55)', borderColor: '#6A6A72' }}>CUSTOM DESIGNS</button>
          </div>
        </div>
      </section>

      {/* 02 — THE CULTURE */}
      <section style={{ borderBottom: '1px solid var(--rf-line)', padding: '88px 0' }}>
        <div className="rf-shell" style={{ display: 'grid', gap: 56, gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
          <div>
            <span className="rf-kicker">02 — THE CULTURE</span>
            <h2 className="rf-display" style={{ marginTop: 18, fontSize: 'clamp(44px,6.5vw,92px)' }}>FAITH.<br />CARS.<br />COMMUNITY.</h2>
            <p style={{ margin: '24px 0 0', maxWidth: 460, fontSize: 17, lineHeight: 1.6, color: '#B9B9C0', textWrap: 'pretty' }}>
              This isn't merch. It's a flag. Every drop starts with a verse and ends in a parking garage at 11pm — engines warm, boot lids up, people who actually know each other.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--rf-line)', marginTop: 34, maxWidth: 460 }}>
              {stats.map((s) => (
                <div key={s.k} style={{ background: 'var(--rf-bg)', padding: '18px 14px' }}>
                  <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 900, fontSize: 34, lineHeight: 1 }}>{s.v}</div>
                  <div className="rf-meta" style={{ fontSize: 9, marginTop: 6 }}>{s.k}</div>
                </div>
              ))}
            </div>
          </div>
          <Plate label="[ EDITORIAL PLATE — CREW + CAR, GARAGE, 35MM ]" style={{ minHeight: 380, border: '1px solid var(--rf-line)' }}>
            <span style={{ position: 'absolute', left: 0, bottom: 0, background: 'var(--rf-red)', color: '#fff', fontFamily: 'var(--rf-mono)', fontSize: 9, letterSpacing: '.2em', padding: '7px 12px' }}>ROM 12:2</span>
          </Plate>
        </div>
      </section>

      {/* 03 — THE COLLECTIONS */}
      <section style={{ borderBottom: '1px solid var(--rf-line)', padding: '80px 0' }}>
        <div className="rf-shell">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 34 }}>
            <div>
              <span className="rf-kicker">03 — THE COLLECTIONS</span>
              <h2 className="rf-display" style={{ marginTop: 14, fontSize: 'clamp(38px,5vw,64px)' }}>FIVE SCENES. ONE FAITH.</h2>
            </div>
            <button onClick={() => navigate('shop')} style={{ background: 'transparent', border: '1px solid var(--rf-line)', color: 'var(--rf-ink)', padding: '13px 20px', fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.18em', cursor: 'pointer' }}>VIEW ALL →</button>
          </div>
          <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))' }}>
            {COLLECTIONS.map((c, i) => (
              <a key={c.id} href="#" onClick={(e) => { e.preventDefault(); navigate('shop', { filter: c.id }); }} style={{ color: 'var(--rf-ink)' }}>
                <Plate label={c.plate} style={{ minHeight: 360, border: '1px solid var(--rf-line)', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: c.wash }} />
                  <span style={{ position: 'absolute', top: 14, left: 14, fontFamily: 'var(--rf-mono)', fontSize: 9, letterSpacing: '.2em', color: '#6E6E78' }}>
                    0{i + 1} / 0{COLLECTIONS.length}
                  </span>
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '18px 16px', background: 'linear-gradient(180deg,transparent,rgba(9,9,10,.9) 60%)' }}>
                    <div className="rf-display" style={{ fontSize: 34 }}>{c.name}</div>
                    <div className="rf-meta" style={{ fontSize: 9, marginTop: 8 }}>{c.tagline.toUpperCase()}</div>
                  </div>
                </Plate>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — THE CLOTHING */}
      <section style={{ borderBottom: '1px solid var(--rf-line)', padding: '80px 0' }}>
        <div className="rf-shell">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 30 }}>
            <div>
              <span className="rf-kicker">04 — THE CLOTHING</span>
              <h2 className="rf-display" style={{ marginTop: 14, fontSize: 'clamp(38px,5vw,64px)' }}>FEATURED TEES</h2>
            </div>
            <span className="rf-meta">ALL PRICES ZAR · PROTOTYPE PRICING</span>
          </div>
          <div className="rf-grid-products">
            {PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.sku} product={p} />)}
          </div>
        </div>
      </section>

      {/* 05 — YOUR DESIGN */}
      <section style={{ borderBottom: '1px solid var(--rf-line)', background: 'linear-gradient(180deg,#0B0B0D,#100B0C)' }}>
        <div className="rf-shell" style={{ padding: '90px var(--rf-gutter)', display: 'grid', gap: 48, gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', alignItems: 'center' }}>
          <div>
            <span className="rf-kicker">05 — YOUR DESIGN</span>
            <h2 className="rf-display" style={{ marginTop: 16, fontSize: 'clamp(44px,7vw,104px)', lineHeight: .86 }}>CUSTOM<br />DESIGNS</h2>
            <p style={{ margin: '22px 0 0', fontFamily: 'var(--rf-display)', fontWeight: 700, fontSize: 26, letterSpacing: '.02em', textTransform: 'uppercase' }}>Your design. Your shirt. Your faith.</p>
            <p style={{ margin: '14px 0 0', maxWidth: 480, fontSize: 17, lineHeight: 1.6, color: '#B9B9C0', textWrap: 'pretty' }}>
              Upload your artwork, size it on the shirt, watch the price move in real time. We pack it onto the next production sheet and print it.
            </p>
            <div className="rf-row" style={{ marginTop: 30 }}>
              <button className="rf-btn" onClick={() => navigate('custom')}>CREATE YOUR OWN</button>
              <button className="rf-btn rf-btn--ghost" onClick={() => setModal('bulk')}>BULK ORDERS</button>
            </div>
          </div>
          <div className="rf-card" style={{ padding: 22 }}>
            <div className="rf-meta" style={{ marginBottom: 16 }}>HOW IT WORKS</div>
            {CUSTOM_STEPS.map((s) => (
              <div key={s.no} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '14px 0', borderTop: '1px solid var(--rf-line)' }}>
                <span style={{ fontFamily: 'var(--rf-mono)', fontSize: 11, color: 'var(--rf-red)', paddingTop: 3 }}>{s.no}</span>
                <div>
                  <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 21, letterSpacing: '.06em', textTransform: 'uppercase' }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: '#9A9AA2', marginTop: 3 }}>{s.detail}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 18, padding: 16, background: 'var(--rf-surface-2)', borderLeft: '2px solid var(--rf-red)' }}>
              <div style={{ fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.18em', color: '#fff' }}>PRINT PRICING FROM {money(PRINT_TIERS[0].price)}</div>
              <div className="rf-meta" style={{ fontSize: 10, marginTop: 6 }}>{PRINT_TIERS.map((t) => `${t.id} ${money(t.price)}`).join(' · ')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — THE COMMUNITY */}
      <section style={{ borderBottom: '1px solid var(--rf-line)', padding: '80px 0' }}>
        <div className="rf-shell">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 28 }}>
            <div>
              <span className="rf-kicker">06 — THE COMMUNITY</span>
              <h2 className="rf-display" style={{ marginTop: 14, fontSize: 'clamp(38px,5vw,64px)' }}>THE REDLINE FAITH CREW</h2>
            </div>
            <button onClick={() => navigate('community')} style={{ background: 'transparent', border: '1px solid var(--rf-line)', color: 'var(--rf-ink)', padding: '13px 20px', fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.18em', cursor: 'pointer' }}>MEETS &amp; BUILDS →</button>
          </div>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))' }}>
            {COMMUNITY_TILES.slice(0, 4).map((t) => (
              <Plate key={t.no} label={t.plate} style={{ minHeight: 250, border: '1px solid var(--rf-line)' }}>
                <span className="rf-meta" style={{ position: 'absolute', left: 12, bottom: 12, fontSize: 9, color: '#B9B9C0' }}>{t.caption.toUpperCase()}</span>
              </Plate>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — THE MESSAGE */}
      <section style={{ borderBottom: '1px solid var(--rf-line)', padding: '110px 20px', textAlign: 'center', background: 'radial-gradient(70% 120% at 50% 0%,rgba(225,6,0,.14),transparent 60%)' }}>
        <span className="rf-kicker">07 — THE MESSAGE</span>
        <h2 className="rf-display" style={{ margin: '20px auto 0', maxWidth: 900, fontSize: 'clamp(40px,7vw,96px)' }}>CHRIST AT THE CENTRE.<br />ALWAYS.</h2>
        <p style={{ margin: '22px auto 0', maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: '#B9B9C0' }}>
          Fast cars, loud exhausts, late nights — none of it is the point. He is. Everything else is just how we say it.
        </p>
        <div className="rf-meta" style={{ marginTop: 24 }}>[ PLACEHOLDER SCRIPTURE — FINAL REFERENCES TBC ]</div>
      </section>

      {/* 08 — SHOP */}
      <section style={{ padding: '0 var(--rf-gutter)' }}>
        <div className="rf-shell" style={{ border: '1px solid var(--rf-line)', borderTop: 'none', background: 'var(--rf-red)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '52px 36px' }}>
          <div>
            <div style={{ fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.24em', color: 'rgba(255,255,255,.75)' }}>08 — SHOP</div>
            <div className="rf-display" style={{ fontSize: 'clamp(34px,5.5vw,68px)', color: '#fff', marginTop: 8 }}>WEAR IT LOUD.</div>
          </div>
          <button onClick={() => navigate('shop')} className="rf-btn" style={{ background: '#0A0A0B', fontSize: 18, padding: '20px 34px' }}>SHOP THE COLLECTION</button>
        </div>
      </section>
    </main>
  );
}
