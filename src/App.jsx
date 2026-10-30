import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { HeroFilm } from './components/HeroFilm';
import { CompanyProfile } from './components/CompanyProfile';
import { CuisineGallery } from './components/CuisineGallery';
import { StandardsLab } from './components/StandardsLab';
import { ProductCatalog } from './components/ProductCatalog';
import { Partnership } from './components/Partnership';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { Footer } from './components/Footer';

const AppContent = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { toastVisible, toastMessage } = useCart();

  const handleSearchFocus = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = el.querySelector('input');
        if (input) input.focus();
      }, 500);
    }
  };

  return (
    <div className="app-root">
      <TopBar />
      <Navbar onSearchClick={handleSearchFocus} />
      <main>
        <HeroFilm />
        <CompanyProfile />
        <CuisineGallery />
        <StandardsLab />
        <ProductCatalog onSelectProduct={(prod) => setSelectedProduct(prod)} />
        <Partnership />
        <ContactSection />
      </main>
      <Footer />

      <CartDrawer />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {toastVisible && (
        <div className="site-toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
