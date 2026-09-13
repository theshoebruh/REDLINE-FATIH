/* PROTOTYPE CATALOGUE.
   sku doubles as the product's design number — the numbering is the design system, not a warehouse code.
   images: files under public/images/products/<slug>/ (keep paths relative: images/...). Omit to render a labelled placeholder plate.
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
      { src: 'images/products/jdm-01/front-flat.webp',  label: 'Front flat' },
      { src: 'images/products/jdm-01/back-flat.webp',   label: 'Back flat' },
      { src: 'images/products/jdm-01/model-back.webp',  label: 'Model back' },
      { src: 'images/products/jdm-01/model-front.webp', label: 'Model front' }
    ]
  },
  {
    sku: 'JDM 02',
    slug: 'jdm-02',
    name: 'Redline Psalm',
    collection: 'JDM',
    price: 690,
    inStock: true,
    popularity: 91,
    rating: 4.7,
    reviewCount: 31,
    idea: 'A Supra sitting wet under Fuji and a blood-red sun, tail lights bleeding into the tarmac. The valley you drive through at 2am and the valley the psalm talks about are the same road — you are just not on it alone.',
    scripture: 'Psalm 23:4 — "Even though I walk through the valley..." set beside the kanji for Psalm 23 down the right-hand side, with FAITH / CARS / COMMUNITY / ETERNAL stamped at the hem.',
    images: [
      { src: 'images/products/jdm-02/back-flat.webp',    label: 'Back flat' },
      { src: 'images/products/jdm-02/front-flat.webp',   label: 'Front flat' },
      { src: 'images/products/jdm-02/detail-type.webp',  label: 'Type detail' },
      { src: 'images/products/jdm-02/detail-car.webp',   label: 'Car detail' },
      { src: 'images/products/jdm-02/detail-fuji.webp',  label: 'Fuji detail' },
      { src: 'images/products/jdm-02/detail-psalm.webp', label: 'Psalm 23' },
      { src: 'images/products/jdm-02/detail-label.webp', label: 'Neck label' }
    ]
  },
  {
    sku: 'GDM 01',
    slug: 'gdm-01',
    name: 'Autobahn Grace',
    collection: 'GDM',
    price: 720,
    inStock: true,
    popularity: 87,
    rating: 4.9,
    reviewCount: 26,
    idea: 'An M3 under wet motorway lights, plate reading M-FAITH, with German signage overhead — GOTT / RICHTUNG ZWECK / KEINE UMWEGE. God, direction and purpose, no detours. The autobahn has no speed limit and no shortcuts either.',
    scripture: 'Placeholder — "Faster routes to a higher calling." Final verse to sit under the sign gantry, with CHRIST / CARS / COMMUNITY / ETERNAL at the hem.',
    images: [
      { src: 'images/products/gdm-01/back-flat.webp',    label: 'Back flat' },
      { src: 'images/products/gdm-01/front-flat.webp',   label: 'Front flat' },
      { src: 'images/products/gdm-01/detail-type.webp',  label: 'Type detail' },
      { src: 'images/products/gdm-01/detail-car.webp',   label: 'Car detail' },
      { src: 'images/products/gdm-01/detail-cross.webp', label: 'Calling' },
      { src: 'images/products/gdm-01/detail-road.webp',  label: 'Road detail' },
      { src: 'images/products/gdm-01/detail-label.webp', label: 'Neck label' }
    ]
  },
  {
    sku: 'GDM 02',
    slug: 'gdm-02',
    name: 'Narrow Road',
    collection: 'GDM',
    price: 690,
    inStock: false,
    popularity: 76,
    rating: 4.6,
    reviewCount: 18,
    idea: 'An RS3 climbing the Stelvio in the wet, hairpins stacked into cloud, plate reading NARROW. The road nobody takes by accident — fewer lanes, more commitment, better view at the top.',
    scripture: 'Matthew 7:14 — the narrow road that leads to life. Set beside the kanji for "narrow road" down the right, with DISCIPLINE LEADS FURTHER at the hem. Final translation TBC.',
    images: [
      { src: 'images/products/gdm-02/back-flat.webp',    label: 'Back flat' },
      { src: 'images/products/gdm-02/front-flat.webp',   label: 'Front flat' },
      { src: 'images/products/gdm-02/detail-pass.webp',  label: 'The pass' },
      { src: 'images/products/gdm-02/detail-car.webp',   label: 'Car detail' },
      { src: 'images/products/gdm-02/detail-peaks.webp', label: 'Peaks' },
      { src: 'images/products/gdm-02/detail-kanji.webp', label: 'Narrow road' },
      { src: 'images/products/gdm-02/detail-label.webp', label: 'Neck label' }
    ]
  },
  {
    sku: 'STREET 01',
    slug: 'street-01',
    name: 'Midnight Mercy',
    collection: 'STREET',
    price: 640,
    inStock: true,
    popularity: 94,
    rating: 4.8,
    reviewCount: 37,
    idea: 'An E46 sitting wet under an overpass at 2am, angel eyes lit, city behind it. Street culture without the ego — built for more than horsepower. The kanji reads "mercy in the dead of night".',
    scripture: 'Lamentations 3:22-23 — mercies new every morning, printed for the people still out when the morning arrives. Final verse TBC.',
    images: [
      { src: 'images/products/street-01/back-flat.webp',     label: 'Back flat' },
      { src: 'images/products/street-01/front-flat.webp',    label: 'Front flat' },
      { src: 'images/products/street-01/detail-chest.webp',  label: 'Chest print' },
      { src: 'images/products/street-01/detail-back.webp',   label: 'Back print' },
      { src: 'images/products/street-01/detail-neck.webp',   label: 'Neck label' },
      { src: 'images/products/street-01/detail-sleeve.webp', label: 'Sleeve' },
      { src: 'images/products/street-01/detail-hem.webp',    label: 'Hem label' }
    ]
  },
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
