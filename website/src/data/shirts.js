/* Blank garments available for custom prints. Supplier is a placeholder. */

export const SHIRTS = [
  { id: 'HEAVY',   name: 'Heavyweight Tee',    gsm: '240 GSM', price: 320 },
  { id: 'CLASSIC', name: 'Classic Tee',        gsm: '180 GSM', price: 260 },
  { id: 'BOXY',    name: 'Oversized Boxy Tee', gsm: '220 GSM', price: 350 }
];

export const SHIRT_COLOURS = [
  { label: 'Black',    swatch: '#0D0D0F', light: false },
  { label: 'White',    swatch: '#F2F2EE', light: true  },
  { label: 'Charcoal', swatch: '#3A3A3E', light: false },
  { label: 'Bone',     swatch: '#D9D3C7', light: true  }
];

export const SIZES = ['S', 'M', 'L', 'XL', '2XL'];

export const SIZE_TABLE = [
  { size: 'S',   chest: 50, length: 69, sleeve: 20 },
  { size: 'M',   chest: 53, length: 71, sleeve: 21 },
  { size: 'L',   chest: 56, length: 74, sleeve: 22 },
  { size: 'XL',  chest: 59, length: 76, sleeve: 23 },
  { size: '2XL', chest: 62, length: 79, sleeve: 24 }
];

/** Printable area on the garment, centimetres. */
export const PRINT_AREA = { w: 30, h: 42 };
