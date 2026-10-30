import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-corporate">
      <div className="footer-grid">
        <div className="footer-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <img
              src="img/imgcvputra/logoatas.webp"
              alt="CV. Putra AR Logo"
              style={{ width: 36, height: 36, objectFit: 'contain' }}
            />
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
              CV. PUTRA <em style={{ fontStyle: 'normal', color: 'var(--color-accent)' }}>AR</em>
            </span>
          </div>
          <p>
            Perusahaan manufaktur makanan olahan terpercaya yang berpusat di Ciamis, Jawa Barat. Memproduksi ragam bakso Raja Raoz, otak-otak ikan, kwetiau, dan camilan bermutu tinggi berstandar mesin modern Jepang.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navigasi Halaman</h4>
          <ul className="footer-links">
            <li><a href="#home">Beranda Utama</a></li>
            <li><a href="#profile">Profil Perusahaan</a></li>
            <li><a href="#gallery">Galeri Produk</a></li>
            <li><a href="#standards">Standar Mutu &amp; Lab</a></li>
            <li><a href="#products">Katalog Menu</a></li>
            <li><a href="#partnership">Kemitraan Grosir</a></li>
            <li><a href="#contact">Kontak &amp; Alamat</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Lini Manufaktur</h4>
          <ul className="footer-links">
            <li><a href="#products">Bakso Sapi Super Raja Raoz</a></li>
            <li><a href="#products">Otak-Otak Ikan Tenggiri Segar</a></li>
            <li><a href="#products">Basreng Pedas Daun Jeruk</a></li>
            <li><a href="#products">Kwetiau Segar Siap Olah</a></li>
            <li><a href="#products">Cimol &amp; Camilan Tradisional</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Kantor &amp; Fasilitas Produksi</h4>
          <p style={{ marginBottom: 10 }}>
            Desa Sukahurip, Kecamatan Cihaurbeuti, Kabupaten Ciamis, Jawa Barat 46262
          </p>
          <p style={{ marginBottom: 6 }}>
            Telepon: (0265) 5401232
          </p>
          <p>
            WhatsApp Resmi: +62 813-1064-1534
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          Hak Cipta &copy; {currentYear} CV. Putra AR. Seluruh Hak Dilindungi Undang-Undang.
        </span>
        <span>
          Manufaktur Pangan Olahan Berstandar Higienis Nasional
        </span>
      </div>
    </footer>
  );
};
