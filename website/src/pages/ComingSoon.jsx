import React from 'react';
import { BRAND } from '../data/site.js';
import { COMING_SOON_COPY as COPY } from '../data/launch.js';

/**
 * Pre-launch holding screen. Shown instead of the shop while
 * COMING_SOON is on in data/launch.js. Deliberately static: no countdown,
 * no signup, no contact line.
 */
export default function ComingSoon() {
  return (
    <div className="rf-soon" style={{ backgroundImage: `url("${BRAND.heroImage}")` }}>
      <div className="rf-soon__shade" aria-hidden="true" />
      <div className="rf-soon__glow" aria-hidden="true" />

      <header className="rf-soon__bar">
        <div className="rf-soon__inner rf-soon__bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <img src="images/brand/RF-logo-red.svg" alt="" width="34" height="34" />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, minWidth: 0 }}>
              <span style={{ fontFamily: 'var(--rf-display)', fontWeight: 900, fontSize: 19, letterSpacing: '.06em', textTransform: 'uppercase' }}>{BRAND.name}</span>
              <span className="rf-meta" style={{ fontSize: 8, letterSpacing: '.22em', marginTop: 3, whiteSpace: 'nowrap' }}>CHRIST × CARS × STREETWEAR</span>
            </span>
          </div>
          <div className="rf-soon__status">
            <span className="rf-soon__dot" />
            <span>{COPY.status.toUpperCase()}</span>
          </div>
        </div>
      </header>

      <main className="rf-soon__main">
        <div className="rf-soon__inner" style={{ animation: 'rf-up .5s ease both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ width: 26, height: 2, background: 'var(--rf-red)', flex: 'none' }} />
            <span className="rf-meta" style={{ letterSpacing: '.26em', color: '#C6C6CC' }}>{COPY.kicker.toUpperCase()}</span>
          </div>

          <h1 className="rf-display rf-soon__title">
            Almost<br /><span style={{ color: 'var(--rf-red)' }}>ready.</span>
          </h1>

          <p className="rf-soon__tagline">{BRAND.tagline}</p>
          <div className="rf-soon__note">
            {COPY.note.map((para) => (
              <p key={para} className="rf-soon__blurb">{para}</p>
            ))}
            <div className="rf-soon__signoff">{COPY.signoff}</div>
            <div className="rf-kicker" style={{ letterSpacing: '.2em', marginTop: 6 }}>{COPY.signature.toUpperCase()}</div>
          </div>

          <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', marginTop: 34 }}>
            {COPY.pillars.map((label, i) => (
              <div key={label}>
                <div className="rf-kicker" style={{ fontSize: 9, letterSpacing: '.2em' }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 900, fontSize: 26, letterSpacing: '.04em', textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <section className="rf-soon__strip">
        <div className="rf-soon__inner rf-soon__strip-inner">
          <span className="rf-meta" style={{ letterSpacing: '.22em', whiteSpace: 'nowrap' }}>LAUNCHING WITH</span>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flex: 1 }}>
            {COPY.collections.map((c) => (
              <span key={c} className="rf-soon__chip">{c}</span>
            ))}
          </div>
          <span className="rf-kicker" style={{ letterSpacing: '.16em', whiteSpace: 'nowrap' }}>+ CUSTOM PRINTS</span>
        </div>
      </section>

      <footer className="rf-soon__foot">
        © 2026 {BRAND.name.toUpperCase()} · SOUTH AFRICA
      </footer>
    </div>
  );
}
