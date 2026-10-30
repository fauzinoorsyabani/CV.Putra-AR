import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../data/products';

export const CuisineGallery = () => {
  const { addItem } = useCart();

  const galleryItems = [
    {
      id: 1,
      name: 'Otak-Otak Ikan Raja Raoz',
      tag: 'Otak-Otak',
      price: 20000,
      img: 'img/gallery/otak_otak_real.webp',
      desc: 'Dibuat dari ikan tenggiri segar dengan racikan rempah pilihan khas Jawa Barat. Kenyal lembut dan gurih alami.',
    },
    {
      id: 3,
      name: 'Basreng Pedas Daun Jeruk',
      tag: 'Snack Gurih',
      price: 30000,
      img: 'img/menu/basreng.webp',
      desc: 'Baso goreng potongan stik renyah berpadu cabai rawit pedas asli dan aroma rempah daun jeruk purut.',
    },
    {
      id: 2,
      name: 'Bakso Sapi Raja Raoz',
      tag: 'Bakso Sapi',
      price: 25000,
      img: 'img/gallery/mie_bakso_real.webp',
      desc: 'Bakso daging sapi asli berkualitas prima, kenyal padat tanpa bahan pengawet kimia berbahaya.',
    },
    {
      id: 7,
      name: 'Kwetiau Segar Raja Raoz',
      tag: 'Kwetiau',
      price: 15000,
      img: 'img/gallery/kwetiau_real.webp',
      desc: 'Kwetiau kenyal higienis siap olah untuk kebutuhan restoran, warung makan, dan kuliner keluarga.',
    },
  ];

  return (
    <section className="section-cuisine-gallery" id="gallery">
      <div className="gallery-header-row">
        <div className="gallery-header-left">
          <span>Koleksi Produk Olahan Pilihan</span>
          <h2>
            Galeri Cita Rasa <em>CV. Putra AR</em>
          </h2>
        </div>
        <div className="gallery-header-right">
          <p>
            Komposisi bahan baku daging sapi dan ikan segar berkualitas dengan formulasi bumbu rempah otentik khas Indonesia yang higienis.
          </p>
        </div>
      </div>

      <div className="cuisine-mosaic-grid">
        {galleryItems.map((item, idx) => (
          <motion.div
            key={item.id}
            className="cuisine-item-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            <div className="cuisine-img-container">
              <span className="cuisine-tag">{item.tag}</span>
              <img src={item.img} alt={item.name} loading="lazy" />
            </div>
            <div className="cuisine-body">
              <h3 className="cuisine-title">{item.name}</h3>
              <p className="cuisine-desc">{item.desc}</p>
              <div className="cuisine-footer">
                <span className="cuisine-price">{formatRupiah(item.price)}</span>
                <button
                  type="button"
                  className="btn-cuisine-add"
                  onClick={() => addItem(item)}
                >
                  <Plus size={15} /> Beli
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
