import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { SHIPPING_FLAT } from '../data/pricing.js';
import { money } from '../utils/format.js';

const FIELDS = [
  { key: 'name', placeholder: 'FULL NAME', validate: (v) => (v.trim() ? null : 'REQUIRED') },
  { key: 'email', placeholder: 'EMAIL', validate: (v) => (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? null : 'VALID EMAIL REQUIRED') },
  { key: 'phone', placeholder: 'PHONE', validate: (v) => (v.replace(/\D/g, '').length >= 9 ? null : 'VALID PHONE REQUIRED') },
  { key: 'address', placeholder: 'STREET ADDRESS', validate: (v) => (v.trim() ? null : 'REQUIRED') },
  { key: 'city', placeholder: 'CITY', validate: (v) => (v.trim() ? null : 'REQUIRED') },
  { key: 'postal', placeholder: 'POSTAL CODE', validate: (v) => (/^\d{4}$/.test(v) ? null : '4-DIGIT CODE') }
];

/** Guest checkout. No accounts. Payment is a placeholder — wire a SA provider here. */
export default function Checkout() {
  const { cart, subtotal, placeOrder, notify } = useStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', postal: '' });
  const [errors, setErrors] = useState({});

  const submit = () => {
    const next = {};
    FIELDS.forEach((f) => {
      const err = f.validate(form[f.key]);
      if (err) next[f.key] = err;
    });
    setErrors(next);
    if (Object.keys(next).length) return notify('Check your details');
    placeOrder();
  };

  return (
    <main style={{ maxWidth: 1240, margin: '0 auto', padding: '36px var(--rf-gutter) 90px' }}>
      <span className="rf-kicker">CHECKOUT — GUEST</span>
      <h1 className="rf-display" style={{ marginTop: 12, fontSize: 'clamp(38px,6vw,72px)' }}>ALMOST YOURS</h1>

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', marginTop: 30, alignItems: 'start' }}>
        <section className="rf-card" style={{ padding: 22 }}>
          <div className="rf-meta">01 — YOUR DETAILS</div>
          <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
            {FIELDS.map((f) => (
              <div key={f.key}>
                <input
                  className="rf-input"
                  value={form[f.key]}
                  placeholder={f.placeholder}
                  onChange={(e) => { setForm({ ...form, [f.key]: e.target.value }); setErrors({ ...errors, [f.key]: null }); }}
                  style={errors[f.key] ? { borderColor: 'var(--rf-red)' } : undefined}
                />
                {errors[f.key] && <div style={{ fontFamily: 'var(--rf-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--rf-red)', marginTop: 5 }}>{errors[f.key]}</div>}
              </div>
            ))}
          </div>

          <div className="rf-meta" style={{ marginTop: 26 }}>02 — PAYMENT</div>
          <div style={{ marginTop: 12, border: '1px dashed #3E3E45', padding: 20, background: 'var(--rf-surface-2)' }}>
            <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 21, letterSpacing: '.08em', textTransform: 'uppercase' }}>PAYMENT PLACEHOLDER</div>
            <div style={{ fontSize: 14, color: '#9A9AA2', marginTop: 6 }}>
              A South African payment provider gets wired in here (card, EFT, instant EFT). Nothing is charged in this prototype.
            </div>
          </div>

          <button className="rf-btn" style={{ width: '100%', marginTop: 20, fontSize: 18, padding: 20 }} onClick={submit}>
            PLACE ORDER — {money(subtotal + SHIPPING_FLAT)}
          </button>
          <div className="rf-meta" style={{ fontSize: 9, color: '#6E6E78', marginTop: 10, textAlign: 'center' }}>NO ACCOUNT NEEDED · GUEST CHECKOUT</div>
        </section>

        <section className="rf-card" style={{ padding: 22 }}>
          <div className="rf-meta">ORDER SUMMARY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            {cart.map((l, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, borderBottom: '1px solid var(--rf-line)', paddingBottom: 12 }}>
                <div style={{ flex: 'none', width: 56, height: 70, border: '1px solid var(--rf-line)', backgroundColor: '#141418', backgroundImage: l.image ? `url("${l.image}")` : 'repeating-linear-gradient(135deg,#141418 0 7px,#1B1B22 7px 14px)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 18, letterSpacing: '.06em', textTransform: 'uppercase' }}>{l.title}</div>
                  <div className="rf-meta" style={{ fontSize: 9, marginTop: 4, whiteSpace: 'pre-line' }}>{l.meta}</div>
                </div>
                <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 17 }}>{money(l.price * l.qty)}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
            <div className="rf-meta" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}><span>SUBTOTAL</span><span>{money(subtotal)}</span></div>
            <div className="rf-meta" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}><span>SHIPPING — PLACEHOLDER</span><span>{money(SHIPPING_FLAT)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--rf-line)', paddingTop: 12 }}>
              <span className="rf-meta" style={{ fontSize: 11 }}>TOTAL</span>
              <span style={{ fontFamily: 'var(--rf-display)', fontWeight: 900, fontSize: 34, color: 'var(--rf-red)' }}>{money(subtotal + SHIPPING_FLAT)}</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
