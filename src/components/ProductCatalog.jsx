import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { productsData, formatRupiah } from '../data/products';
import { useCart } from '../context/CartContext';

export const ProductCatalog = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCart();

  const categories = [
    { key: 'all', label: 'Semua Produk' },
    { key: 'bakso', label: 'Bakso Sapi' },
    { key: 'otakotak', label: 'Otak-Otak' },
    { key: 'snack', label: 'Snack & Camilan' },
    { key: 'kwetiau', label: 'Kwetiau' },
  ];

  const filteredProducts = productsData.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="section-products" id="products">
      <div className="standards-header">
        <span className="standards-eyebrow">Katalog Penjualan Resmi</span>
        <h2>
          Produk Unggulan <em>CV. Putra AR</em>
        </h2>
        <p>
          Pilihan aneka olahan bakso, otak-otak, dan camilan berkualitas tinggi yang siap dipesan untuk kebutuhan rumah tangga maupun pasokan bisnis.
        </p>
      </div>

      <div className="products-toolbar">
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={`category-tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="search-input-wrapper">
          <Search />
          <input
            type="text"
            placeholder="Cari bakso, otak-otak..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="catalog-grid">
        {filteredProducts.map((prod, idx) => (
          <motion.div
            key={prod.id}
            className="catalog-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <div
              className="catalog-img-box"
              onClick={() => onSelectProduct && onSelectProduct(prod)}
            >
              <img src={prod.img} alt={prod.name} loading="lazy" />
              {prod.isBestSeller && (
                <span className="catalog-badge">Favorit</span>
              )}
            </div>

            <div className="catalog-content">
              <h3
                className="catalog-title"
                onClick={() => onSelectProduct && onSelectProduct(prod)}
              >
                {prod.name}
              </h3>
              <span className="catalog-unit">{prod.unit}</span>

              <div className="catalog-price-row">
                <span className="catalog-price">{formatRupiah(prod.price)}</span>
                <button
                  type="button"
                  className="btn-add-cart"
                  onClick={() => addItem(prod)}
                >
                  <Plus size={15} /> Tambah
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
