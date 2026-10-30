import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../data/products';

export const CartDrawer = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    totalQuantity,
    totalPrice,
    addItem,
    removeItem,
    sendWhatsAppOrder,
  } = useCart();

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const isFormValid =
    customer.name.trim().length >= 2 &&
    customer.phone.trim().length >= 8 &&
    customer.address.trim().length >= 5;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (isFormValid) {
      sendWhatsAppOrder(customer);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          <motion.aside
            className="shopping-cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cart-header">
              <h3>
                <ShoppingBag />
                Daftar Pesanan ({totalQuantity})
              </h3>
              <button
                type="button"
                className="cart-close-btn"
                onClick={() => setIsOpen(false)}
                title="Tutup Keranjang"
              >
                <X size={18} />
              </button>
            </div>

            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <div className="cart-item-price">{formatRupiah(item.price)}</div>
                    <div className="cart-item-controls">
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() => addItem(item)}
                      >
                        +
                      </button>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--color-text-muted)',
                          marginLeft: 6,
                        }}
                      >
                        = {formatRupiah(item.total)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {!items.length && (
                <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--color-text-muted)' }}>
                  <ShoppingBag size={48} style={{ margin: '0 auto 14px', color: 'var(--color-text-light)' }} />
                  <h4 style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>
                    Keranjang Pesanan Masih Kosong
                  </h4>
                  <p style={{ fontSize: '0.85rem', marginTop: 6 }}>
                    Pilih varian produk dari katalog untuk memulai pemesanan.
                  </p>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span>Total Pembayaran:</span>
                  <span className="cart-total-val">{formatRupiah(totalPrice)}</span>
                </div>

                <form onSubmit={handleCheckout}>
                  <div className="checkout-input-group">
                    <label htmlFor="chk-name">Nama Pemesan / Badan Usaha</label>
                    <input
                      type="text"
                      id="chk-name"
                      required
                      placeholder="Nama Anda atau Usaha"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    />
                  </div>

                  <div className="checkout-input-group">
                    <label htmlFor="chk-phone">Nomor Telepon / WhatsApp</label>
                    <input
                      type="tel"
                      id="chk-phone"
                      required
                      placeholder="Contoh: 08123456789"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    />
                  </div>

                  <div className="checkout-input-group">
                    <label htmlFor="chk-address">Alamat Pengiriman &amp; Kota Tujuan</label>
                    <textarea
                      id="chk-address"
                      rows="2"
                      required
                      placeholder="Alamat lengkap tujuan pengiriman"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="checkout-input-group">
                    <label htmlFor="chk-notes">Catatan Khusus (Opsional)</label>
                    <input
                      type="text"
                      id="chk-notes"
                      placeholder="Catatan jadwal atau instruksi kirim"
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-checkout"
                    disabled={!isFormValid}
                  >
                    <Send size={16} /> Kirim Pesanan Resmi via WhatsApp
                  </button>
                </form>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
