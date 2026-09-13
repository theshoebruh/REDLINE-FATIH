import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { seedSheets, placePrint, sheetFill } from '../utils/packing.js';
import { PRODUCTION_DAYS } from '../data/pricing.js';

/**
 * Single source of truth for the prototype: route, cart, print sheets, toast.
 * Swap this for a real router + server cart when the backend exists.
 */
const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [route, setRoute] = useState({ name: 'home' });
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [sheets, setSheets] = useState(() => seedSheets());
  const [order, setOrder] = useState(null);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null); // 'bulk' | 'sizeGuide' | null
  const [query, setQuery] = useState('');
  const toastTimer = useRef(null);

  const navigate = useCallback((name, params = {}) => {
    setRoute({ name, ...params });
    setCartOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const notify = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const addToCart = useCallback((line) => {
    setCart((c) => [...c, line]);
    notify(line.title + ' added to cart');
  }, [notify]);

  const removeLine = useCallback((i) => setCart((c) => c.filter((_, k) => k !== i)), []);
  const setQty = useCallback((i, delta) => setCart((c) =>
    c.map((l, k) => (k === i ? { ...l, qty: Math.max(1, l.qty + delta) } : l))
  ), []);

  const subtotal = useMemo(() => cart.reduce((t, l) => t + l.price * l.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);

  /**
   * Commit the order. This is the only moment sheet space is allocated —
   * see utils/packing.js.
   */
  const placeOrder = useCallback(() => {
    let next = sheets;
    let assigned = null;
    cart.filter((l) => l.custom).forEach((line) => {
      for (let q = 0; q < line.qty; q++) {
        const res = placePrint(next, Math.ceil(line.print.w) + 1, Math.ceil(line.print.h) + 1);
        next = res.sheets;
        if (assigned === null) assigned = res.sheetIndex;
      }
    });
    const placedSheet = assigned === null ? null : next[assigned];
    setSheets(next);
    setOrder({
      reference: 'RF-' + (2600 + Math.floor(Math.random() * 400)),
      sheet: placedSheet,
      fill: placedSheet ? sheetFill(placedSheet) : 0,
      etaDays: PRODUCTION_DAYS
    });
    setCart([]);
    navigate('confirmation');
  }, [cart, sheets, navigate]);

  const value = {
    route, navigate,
    cart, cartOpen, setCartOpen, addToCart, removeLine, setQty, subtotal, count,
    sheets, order, placeOrder,
    toast, notify, modal, setModal, query, setQuery
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
