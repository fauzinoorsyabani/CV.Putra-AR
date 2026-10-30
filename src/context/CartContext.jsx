import React, { createContext, useContext, useState, useEffect } from 'react';
import { formatRupiah } from '../data/products';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  };

  const addItem = (product) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === product.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1, total: (i.quantity + 1) * i.price }
            : i
        );
      }
      return [...prevItems, { ...product, quantity: 1, total: product.price }];
    });
    showToast(`${product.name} telah ditambahkan ke keranjang.`);
  };

  const removeItem = (id) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === id);
      if (!existing) return prevItems;
      if (existing.quantity > 1) {
        return prevItems.map((i) =>
          i.id === id
            ? { ...i, quantity: i.quantity - 1, total: (i.quantity - 1) * i.price }
            : i
        );
      }
      return prevItems.filter((i) => i.id !== id);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalQuantity = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = items.reduce((acc, curr) => acc + curr.total, 0);

  const sendWhatsAppOrder = (customerData) => {
    if (!items.length) {
      showToast('Keranjang pesanan masih kosong.');
      return;
    }

    const dateStr = new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const itemsList = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (${item.quantity}x) = ${formatRupiah(item.total)}`
      )
      .join('\n');

    const messageLines = [
      'FORMULIR PEMESANAN RESMI - CV. PUTRA AR',
      '-------------------------------------------',
      `Tanggal: ${dateStr}`,
      '',
      'DATA PEMESAN / MITRA:',
      `Nama: ${customerData.name || '-'}`,
      `Nomor Telepon/WA: ${customerData.phone || '-'}`,
      `Alamat Pengiriman: ${customerData.address || '-'}`,
      `Catatan Khusus: ${customerData.notes || '-'}`,
      '',
      'RINCIAN PRODUK DIPESAN:',
      itemsList,
      '-------------------------------------------',
      `TOTAL PEMBAYARAN: ${formatRupiah(totalPrice)}`,
      '-------------------------------------------',
      'Mohon konfirmasi ketersediaan pasokan, estimasi jadwal kirim, dan nomor rekening resmi CV. Putra AR.',
      'Terima kasih telah bermitra dengan CV. Putra AR.',
    ];

    const waNumber = '6281310641534';
    const encoded = encodeURIComponent(messageLines.join('\n'));
    window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        totalPrice,
        isOpen,
        setIsOpen,
        toggleCart: () => setIsOpen((prev) => !prev),
        addItem,
        removeItem,
        clearCart,
        showToast,
        sendWhatsAppOrder,
        toastMessage,
        toastVisible,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
