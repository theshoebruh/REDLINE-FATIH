import React, { useState } from 'react';
import Plate from '../components/Plate.jsx';
import Accordion from '../components/Accordion.jsx';
import Rail from '../components/Rail.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SizeGuideModal from '../components/SizeGuideModal.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCTS, findProduct, FABRIC_AND_CARE, SHIPPING_AND_RETURNS } from '../data/products.js';
import { COLLECTION_IDEAS } from '../data/collections.js';
import { SIZES } from '../data/shirts.js';
import { REVIEWS } from '../data/reviews.js';
import { money, stars } from '../utils/format.js';

const GALLERY_FALLBACK = ['Front flat', 'Back flat', 'Model 01', 'Detail / print'];

export default function Product() {
  const { route, navigate, addToCart, notify } = useStore();
  const product = findProduct(route.slug);
  const [shot, setShot] = useState(0);
  const [colour, setColour] = useState('Black');
  const [size, setSize] = useState('M');
  const [guideOpen, setGuideOpen] = useState(false);

  const images = product.images || null;
  const labels = images ? images.map((i) => i.label) : GALLERY_FALLBACK;
  const index = Math.min(shot, labels.length - 1);
  // XL and up follow overall stock in the prototype; real stock is per-variant.
  const sizeInStock = (s) => (s === 'XL' || s === '2XL' ? product.inStock : true);

  const add = () => {
    if (!product.inStock) return;
    addToCart({
      title: product.name,
      price: product.price,
      qty: 1,
      image: images?.[0]?.src,
      meta: `${product.sku}\n${colour.toUpperCase()} · SIZE ${size}`
    });
  };

  return (
    <main className="rf-shell" style={{ padding: '26px var(--rf-gutter) 90px' }}>
      <div className="rf-meta" style={{ marginBottom: 22 }}>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>SHOP</a> / {product.collection} / {product.sku}
      </div>

      <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))' }}>
        <div>
          <Plate
            label={`[ ${product.sku} — ${labels[index].toUpperCase()} / ${colour.toUpperCase()} ]`}
            image={images?.[index]?.src}
            fit="contain"
            style={{ aspectRatio: '4 / 5', border: '1px solid var(--rf-line)', backgroundColor: '#0E0E11' }}
          >
            <span style={{ position: 'absolute', top: 14, left: 14, fontFamily: 'var(--rf-mono)', fontSize: 9, letterSpacing: '.2em', color: '#fff', background: 'rgba(0,0,0,.5)', padding: '5px 9px' }}>{product.sku}</span>
          </Plate>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(72px,1fr))', gap: 8, marginTop: 8 }}>
            {labels.map((label, i) => (
              <button key={label} onClick={() => setShot(i)} aria-label={label}
                style={{ aspectRatio: '1 / 1', backgroundColor: '#121215', backgroundImage: images ? `url("${images[i].src}")` : undefined, backgroundSize: 'cover', backgroundPosition: 'center', border: `1px solid ${index === i ? 'var(--rf-red)' : 'var(--rf-line)'}`, cursor: 'pointer', color: '#5C5C66', fontFamily: 'var(--rf-mono)', fontSize: 8, letterSpacing: '.14em', padding: 6 }}>
                {images ? '' : label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="rf-display" style={{ fontSize: 'clamp(40px,6vw,76px)' }}>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12, flexWrap: 'wrap' }}>
            <span className="rf-meta">{product.sku} · {product.collection} COLLECTION</span>
            <span style={{ color: 'var(--rf-red)', letterSpacing: '.1em', fontSize: 14 }}>{stars(product.rating)}</span>
            <span className="rf-meta">{product.rating.toFixed(1)} / 5 · {product.reviewCount} REVIEWS</span>
          </div>
          <div style={{ fontFamily: 'var(--rf-display)', fontWeight: 900, fontSize: 44, color: 'var(--rf-red)', marginTop: 18 }}>{money(product.price)}</div>

          <div style={{ marginTop: 26 }}>
            <div className="rf-meta" style={{ marginBottom: 10 }}>COLOUR — {colour.toUpperCase()}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Black', 'White', 'Charcoal'].map((c) => (
                <button key={c} onClick={() => setColour(c)} style={{ padding: '10px 16px', background: 'transparent', border: `1px solid ${colour === c ? 'var(--rf-red)' : 'var(--rf-line)'}`, color: colour === c ? '#fff' : 'var(--rf-mute)', fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.14em', cursor: 'pointer' }}>{c.toUpperCase()}</button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
              <span className="rf-meta">SIZE — {size}</span>
              <button onClick={() => setGuideOpen(true)} style={{ background: 'transparent', border: '1px solid var(--rf-line)', color: 'var(--rf-ink)', padding: '8px 14px', fontFamily: 'var(--rf-mono)', fontSize: 10, letterSpacing: '.16em', cursor: 'pointer' }}>SIZE GUIDE</button>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SIZES.map((s) => {
                const ok = sizeInStock(s);
                return (
                  <button key={s} onClick={() => (ok ? setSize(s) : notify(s + ' is sold out'))}
                    style={{ minWidth: 56, padding: '12px 10px', background: size === s ? 'var(--rf-red)' : 'transparent', border: `1px solid ${size === s ? 'var(--rf-red)' : 'var(--rf-line)'}`, color: ok ? (size === s ? '#fff' : 'var(--rf-ink)') : '#55555E', fontFamily: 'var(--rf-display)', fontWeight: 800, fontSize: 15, letterSpacing: '.1em', cursor: ok ? 'pointer' : 'not-allowed', textDecoration: ok ? 'none' : 'line-through' }}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rf-row" style={{ marginTop: 26 }}>
            <button className="rf-btn" disabled={!product.inStock} onClick={add} style={{ flex: '1 1 220px' }}>
              {product.inStock ? `ADD TO CART — ${money(product.price)}` : 'SOLD OUT'}
            </button>
            <button className="rf-btn rf-btn--ghost" onClick={() => navigate('custom')}>CUSTOMISE INSTEAD</button>
          </div>

          <div style={{ marginTop: 34, borderTop: '1px solid var(--rf-line)', paddingTop: 22 }}>
            <div className="rf-kicker">THE IDEA</div>
            <p style={{ margin: '10px 0 0', fontSize: 16, lineHeight: 1.6, color: '#C2C2C8', textWrap: 'pretty' }}>{product.idea || COLLECTION_IDEAS[product.collection]}</p>
            <div className="rf-kicker" style={{ marginTop: 22 }}>THE SCRIPTURE</div>
            <p style={{ margin: '10px 0 0', fontSize: 16, lineHeight: 1.6, color: '#C2C2C8', textWrap: 'pretty' }}>
              {product.scripture || `Placeholder reference — ${product.collection} drop. Final verse and translation to be confirmed with the finished artwork.`}
            </p>
            <div className="rf-meta" style={{ fontSize: 9, color: '#5C5C66', marginTop: 10 }}>[ PLACEHOLDER SCRIPTURE COPY ]</div>
          </div>

          <Accordion title="Fabric &amp; care">{FABRIC_AND_CARE}</Accordion>
          <Accordion title="Shipping &amp; returns">{SHIPPING_AND_RETURNS}</Accordion>
        </div>
      </div>

      <Rail title="Reviews" meta={`${product.rating.toFixed(1)} / 5 · ${product.reviewCount} REVIEWS · MOCK REVIEW DATA`}>
        {REVIEWS.map((r) => (
          <div key={r.who} className="rf-card" style={{ flex: '0 0 320px', maxWidth: '86vw', padding: 20 }}>
            <div style={{ color: 'var(--rf-red)', letterSpacing: '.1em' }}>{stars(r.stars)}</div>
            <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.6, color: '#C2C2C8' }}>{r.body}</p>
            <div className="rf-meta" style={{ fontSize: 9, marginTop: 16 }}>{r.who.toUpperCase()} · {r.car.toUpperCase()}</div>
          </div>
        ))}
      </Rail>

      <Rail title="More from the collection" step={280}>
        {PRODUCTS.filter((p) => p.sku !== product.sku).slice(0, 6).map((p) => <ProductCard key={p.sku} product={p} compact />)}
      </Rail>

      {guideOpen && <SizeGuideModal onClose={() => setGuideOpen(false)} />}
    </main>
  );
}
