import React from 'react';
import Plate from './Plate.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { money } from '../utils/format.js';

export default function ProductCard({ product, compact = false }) {
  const { navigate } = useStore();
  const stockColour = product.inStock ? 'var(--rf-ok)' : 'var(--rf-red)';
  const open = (e) => { e.preventDefault(); navigate('product', { slug: product.slug }); };

  return (
    <div className="rf-card" style={compact ? { flex: '0 0 260px', maxWidth: '80vw' } : undefined}>
      <a href="#" onClick={open} style={{ display: 'block', color: 'var(--rf-ink)' }}>
        <Plate
          label={`[ ${product.sku} — PRODUCT PLATE / MODEL SHOT ]`}
          image={product.images?.[0]?.src}
          style={{ aspectRatio: '4 / 5' }}
        >
          <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--rf-mono)', fontSize: 9, letterSpacing: '.2em', color: '#fff', background: 'rgba(0,0,0,.5)', padding: '4px 8px' }}>{product.sku}</span>
          <span style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'var(--rf-mono)', fontSize: 9, letterSpacing: '.16em', padding: '4px 8px', color: stockColour, border: `1px solid ${stockColour}` }}>
            {product.inStock ? 'IN STOCK' : 'SOLD OUT'}
          </span>
        </Plate>
      </a>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 22, letterSpacing: '.04em', textTransform: 'uppercase' }}>{product.name}</span>
          <span style={{ fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 20, color: 'var(--rf-red)' }}>{money(product.price)}</span>
        </div>
        <div className="rf-meta" style={{ fontSize: 9 }}>{product.sku} · {product.collection}</div>
      </div>
    </div>
  );
}
