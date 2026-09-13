import React from 'react';

/**
 * Photography placeholder. Every plate says what shot belongs there so real
 * images can be dropped in without guesswork.
 */
export default function Plate({ label, image, fit = 'cover', style, children }) {
  return (
    <div
      className={image ? undefined : 'rf-plate'}
      style={{
        position: 'relative',
        backgroundColor: '#131316',
        backgroundImage: image ? `url("${image}")` : undefined,
        backgroundSize: fit,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'grid',
        placeItems: 'center',
        ...style
      }}
    >
      {!image && <span style={{ padding: 18, fontFamily: 'var(--rf-mono)', fontSize: 9, letterSpacing: '.2em', color: '#55555E', textAlign: 'center' }}>{label}</span>}
      {children}
    </div>
  );
}
