import React, { useState, useEffect } from 'react';
import { ShoppingCart, Briefcase, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = ({ onSearchClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { totalQuantity, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="navbar-brand">
        <img
          src="img/imgcvputra/logoatas.webp"
          alt="CV. Putra AR Logo"
          className="brand-logo"
        />
        <span className="brand-name">
          CV. PUTRA <em>AR</em>
        </span>
      </a>

      <div className={`navbar-nav ${isMobileOpen ? 'open' : ''}`}>
        <a href="#home" onClick={closeMobile}>Beranda</a>
        <a href="#profile" onClick={closeMobile}>Profil</a>
        <a href="#gallery" onClick={closeMobile}>Galeri</a>
        <a href="#standards" onClick={closeMobile}>Standar</a>
        <a href="#products" onClick={closeMobile}>Menu</a>
        <a href="#partnership" onClick={closeMobile}>Mitra</a>
        <a href="#contact" onClick={closeMobile}>Kontak</a>
      </div>

      <div className="navbar-actions">
        <button
          type="button"
          className="action-btn"
          title="Cari Produk"
          aria-label="Cari Produk"
          onClick={onSearchClick}
        >
          <Search />
        </button>

        <button
          type="button"
          className="action-btn"
          title="Keranjang Pesanan"
          aria-label="Keranjang Pesanan"
          onClick={toggleCart}
        >
          <ShoppingCart />
          {totalQuantity > 0 && (
            <span className="quantity-badge">{totalQuantity}</span>
          )}
        </button>

        <a href="#partnership" className="btn-nav-cta">
          <Briefcase /> Grosir
        </a>

        <button
          type="button"
          className="action-btn hamburger-btn"
          title="Menu"
          aria-label="Menu"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};
