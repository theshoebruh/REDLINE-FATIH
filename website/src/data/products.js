/* PROTOTYPE CATALOGUE.
   sku doubles as the product's design number — the numbering is the design system, not a warehouse code.
   images: files under /public/images/products/<slug>/. Omit to render a labelled placeholder plate.
   Scripture copy is placeholder until the artwork is final. */

export const PRODUCTS = [
  {
    sku: 'JDM 01',
    slug: 'jdm-01',
    name: 'Risen Rotary',
    collection: 'JDM',
    price: 650,
    inStock: true,
    popularity: 98,
    rating: 4.8,
    reviewCount: 42,
    idea: 'A rotary housing half-buried at the mouth of an empty tomb. The engine that never dies, next to the grave that could not hold Him — sector markers, kanji and a cross on the horizon.',
    scripture: 'Matthew 28:6 — "He is not here; He has risen, just as He said." Printed across the back under the tomb, with the chest hit reading the power of resurrection.',
    images: [
      { src: 'images/products/jdm-01/front-flat.png',  label: 'Front flat' },
      { src: 'images/products/jdm-01/back-flat.png',   label: 'Back flat' },
      { src: 'images/products/jdm-01/model-back.png',  label: 'Model back' },
      { src: 'images/products/jdm-01/model-front.png', label: 'Model front' }
    ]
  },
  { sku: 'JDM 02', slug: 'jdm-02', name: 'Redline Psalm', collection: 'JDM', price: 690, inStock: true, popularity: 91, rating: 4.7, reviewCount: 31 },
  { sku: 'GDM 01', slug: 'gdm-01', name: 'Autobahn Grace', collection: 'GDM', price: 720, inStock: true, popularity: 87, rating: 4.9, reviewCount: 26 },
  { sku: 'GDM 02', slug: 'gdm-02', name: 'Narrow Road', collection: 'GDM', price: 690, inStock: false, popularity: 76, rating: 4.6, reviewCount: 18 },
  { sku: 'STREET 01', slug: 'street-01', name: 'Midnight Mercy', collection: 'STREET', price: 640, inStock: true, popularity: 94, rating: 4.8, reviewCount: 37 },
  { sku: 'STREET 02', slug: 'street-02', name: 'No Replica', collection: 'STREET', price: 660, inStock: true, popularity: 72, rating: 4.5, reviewCount: 14 },
  { sku: 'MOTORSPORT 01', slug: 'motorsport-01', name: 'Pit Lane Prayer', collection: 'MOTORSPORT', price: 750, inStock: true, popularity: 89, rating: 4.9, reviewCount: 29 },
  { sku: 'MOTORSPORT 02', slug: 'motorsport-02', name: 'Chequered Hope', collection: 'MOTORSPORT', price: 730, inStock: true, popularity: 68, rating: 4.6, reviewCount: 11 },
  { sku: 'YOUTH 01', slug: 'youth-01', name: 'First Gear', collection: 'YOUTH', price: 560, inStock: true, popularity: 81, rating: 4.7, reviewCount: 22 },
  { sku: 'YOUTH 02', slug: 'youth-02', name: 'Learner Faith', collection: 'YOUTH', price: 540, inStock: true, popularity: 64, rating: 4.4, reviewCount: 9 }
];

export const findProduct = (slug) => PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

export const FABRIC_AND_CARE = `240 GSM combed cotton, pre-shrunk, side-seamed.
Wash cold inside out. Do not tumble dry. Iron in reverse, never directly on the print.
Placeholder supplier spec — final fabric to be confirmed.`;

export const SHIPPING_AND_RETURNS = `Placeholder: 2-4 business days nationwide. Custom prints ship 5 business days after their sheet enters production.
Unworn items can be exchanged within 14 days. Custom prints are made to order.`;
