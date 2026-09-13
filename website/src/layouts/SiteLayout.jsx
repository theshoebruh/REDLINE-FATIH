import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import CartDrawer from '../components/CartDrawer.jsx';
import BulkModal from '../components/BulkModal.jsx';
import Toast from '../components/Toast.jsx';

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <CartDrawer />
      <BulkModal />
      <Toast />
    </>
  );
}
