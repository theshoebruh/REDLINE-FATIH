import React from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div style={{ position: 'fixed', left: '50%', bottom: 26, transform: 'translateX(-50%)', zIndex: 95, background: '#fff', color: '#0A0A0B', padding: '14px 22px', fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 16, letterSpacing: '.12em', textTransform: 'uppercase', animation: 'rf-up .2s ease', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ width: 9, height: 9, background: 'var(--rf-red)' }} />{toast}
    </div>
  );
}
