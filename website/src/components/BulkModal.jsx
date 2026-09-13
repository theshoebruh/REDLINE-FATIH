import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Bulk enquiry (10+ shirts). Placeholder — wire to a real inbox or CRM. */
export default function BulkModal() {
  const { modal, setModal, notify } = useStore();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  if (modal !== 'bulk') return null;

  const send = () => {
    if (!EMAIL.test(email)) return notify('Add a valid email');
    setEmail(''); setMessage(''); setModal(null);
    notify('Enquiry sent — we will be in touch');
  };

  return (
    <div onClick={() => setModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 90, display: 'grid', placeItems: 'center', padding: 20, animation: 'rf-in .16s ease' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(520px,100%)', background: 'var(--rf-bg)', border: '1px solid var(--rf-line)', padding: 26 }}>
        <div className="rf-kicker">BULK ORDERS — 10+ SHIRTS</div>
        <div className="rf-display" style={{ fontSize: 34, letterSpacing: '.04em', marginTop: 10 }}>TALK TO US</div>
        <p style={{ fontSize: 15, color: '#A8A8B0', marginTop: 8 }}>Team shirts, club runs, church groups, car meets. Tell us what you need and we will quote you directly.</p>
        <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
          <input className="rf-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="YOUR EMAIL" style={{ background: 'var(--rf-surface)' }} />
          <textarea className="rf-input" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="QUANTITY, SIZES, DEADLINE" style={{ background: 'var(--rf-surface)', resize: 'vertical' }} />
          <button className="rf-btn" onClick={send}>SEND ENQUIRY</button>
          <button onClick={() => setModal(null)} style={{ background: 'transparent', border: '1px solid var(--rf-line)', color: 'var(--rf-mute)', padding: 13, fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.16em', cursor: 'pointer' }}>CLOSE</button>
        </div>
      </div>
    </div>
  );
}
