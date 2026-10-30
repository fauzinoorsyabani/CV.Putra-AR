import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../data/products';

export const ProductModal = ({ product, onClose }) => {
  const { addItem } = useCart();

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="product-modal-card"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            title="Tutup Modal"
          >
            <X size={18} />
          </button>

          <div className="modal-img-box">
            <img src={product.img} alt={product.name} />
          </div>

          <div className="modal-content-box">
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 6,
              }}
            >
              {product.categoryLabel}
            </span>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 8 }}>
              {product.name}
            </h3>

            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-light)',
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              {product.unit}
            </span>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: 24,
                flexGrow: 1,
              }}
            >
              {product.desc}
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 16,
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <span
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                }}
              >
                {formatRupiah(product.price)}
              </span>

              <button
                type="button"
                className="btn-solid-primary"
                onClick={() => {
                  addItem(product);
                  onClose();
                }}
              >
                <Plus size={16} /> Pesan Sekarang
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
