import React, { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCTS } from '../data/products.js';
import { COLLECTIONS } from '../data/collections.js';

const SORTS = [
  { id: 'NEWEST', label: 'NEWEST' },
  { id: 'POPULAR', label: 'POPULAR' },
  { id: 'PRICE_ASC', label: 'PRICE — LOW TO HIGH' },
  { id: 'PRICE_DESC', label: 'PRICE — HIGH TO LOW' }
];

export default function Shop() {
  const { route, navigate, query } = useStore();
  const [sort, setSort] = useState('NEWEST');
  const filter = route.filter || 'ALL';

  const list = useMemo(() => {
    let out = PRODUCTS.filter((p) => filter === 'ALL' || p.collection === filter);
    const q = query.trim().toLowerCase();
    if (q) out = out.filter((p) => `${p.name} ${p.sku} ${p.collection}`.toLowerCase().includes(q));
    if (sort === 'PRICE_ASC') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'PRICE_DESC') out = [...out].sort((a, b) => b.price - a.price);
    if (sort === 'POPULAR') out = [...out].sort((a, b) => b.popularity - a.popularity);
    return out;
  }, [filter, query, sort]);

  const chips = [{ id: 'ALL', name: 'All products' }, ...COLLECTIONS];

  return (
    <main className="rf-shell" style={{ padding: '44px var(--rf-gutter) 90px' }}>
      <span className="rf-kicker">SHOP — ALL TEES</span>
      <h1 className="rf-display" style={{ marginTop: 14, fontSize: 'clamp(44px,7vw,88px)' }}>THE RANGE</h1>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', margin: '30px 0 22px', padding: '16px 0', borderTop: '1px solid var(--rf-line)', borderBottom: '1px solid var(--rf-line)' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {chips.map((c) => {
            const active = filter === c.id;
            return (
              <button key={c.id} onClick={() => navigate('shop', { filter: c.id })} style={{ background: active ? 'var(--rf-red)' : 'transparent', border: `1px solid ${active ? 'var(--rf-red)' : 'var(--rf-line)'}`, color: active ? '#fff' : 'var(--rf-mute)', padding: '10px 16px', fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.16em', cursor: 'pointer' }}>
                {c.name.toUpperCase()}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="rf-meta">{list.length} PRODUCTS · SORT</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ background: 'var(--rf-surface)', border: '1px solid var(--rf-line)', color: 'var(--rf-ink)', padding: '10px 12px', fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.14em' }}>
            {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <div className="rf-grid-products">
        {list.map((p) => <ProductCard key={p.sku} product={p} />)}
      </div>
      {!list.length && <div className="rf-meta" style={{ padding: '60px 0', textAlign: 'center', fontSize: 11 }}>NO PRODUCTS MATCH THAT FILTER.</div>}
    </main>
  );
}
