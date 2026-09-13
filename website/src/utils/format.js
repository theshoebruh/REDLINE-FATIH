/** ZAR money, no decimals in the prototype. */
export const money = (n) => 'R' + Math.round(n);

/** Five-glyph star row from a 0-5 rating. */
export const stars = (rating) => {
  const full = Math.round(rating);
  return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full);
};

export const cm = (n) => n.toFixed(1) + ' cm';
export const cm2 = (n) => n.toFixed(1) + ' cm²';

/** Terminal-style fill bar, e.g. ██████████████░░░░░░ */
export const fillBar = (pct, width = 20) => {
  const n = Math.max(0, Math.min(width, Math.round((pct / 100) * width)));
  return '█'.repeat(n) + '░'.repeat(width - n);
};

export const upper = (s) => String(s || '').toUpperCase();
