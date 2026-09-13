/* PROTOTYPE PRICING — all values ZAR, all provisional.
   Tiers are matched by the *visible* artwork area (cm2), largest supported size is A3. */

export const PRINT_TIERS = [
  { id: 'A7', w: 7.4,  h: 10.5, price: 250 },
  { id: 'A6', w: 10.5, h: 14.8, price: 275 },
  { id: 'A5', w: 14.8, h: 21.0, price: 300 },
  { id: 'A4', w: 21.0, h: 29.7, price: 330 },
  { id: 'A3', w: 29.7, h: 42.0, price: 420 }
];

/** Largest tier we will print. */
export const MAX_TIER = PRINT_TIERS[PRINT_TIERS.length - 1];

/** Supplier print sheet, centimetres. */
export const SHEET = { w: 100, h: 60 };

/** Flat placeholder shipping. Replace with a real courier rate card. */
export const SHIPPING_FLAT = 95;

/** Days after a sheet enters production. */
export const PRODUCTION_DAYS = 5;
