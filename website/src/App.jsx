import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext.jsx';
import SiteLayout from './layouts/SiteLayout.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Product from './pages/Product.jsx';
import Custom from './pages/Custom.jsx';
import Community from './pages/Community.jsx';
import About from './pages/About.jsx';
import Checkout from './pages/Checkout.jsx';
import Confirmation from './pages/Confirmation.jsx';
import ComingSoon from './pages/ComingSoon.jsx';
import { COMING_SOON } from './data/launch.js';

const PAGES = { home: Home, shop: Shop, product: Product, custom: Custom, community: Community, about: About, checkout: Checkout, confirmation: Confirmation };

function Router() {
  const { route } = useStore();
  const Page = PAGES[route.name] || Home;
  return <SiteLayout><Page /></SiteLayout>;
}

export default function App() {
  const preview = new URLSearchParams(window.location.search).has('preview');
  if (COMING_SOON && !preview) return <ComingSoon />;

  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
}
