import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ContactSection = () => {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(`Terima kasih, Bapak/Ibu ${formData.name}. Pesan Anda telah kami terima.`);
    setFormData({ name: '', phone: '', subject: '', message: '' });
  };

  return (
    <section className="section-contact" id="contact">
      <div className="standards-header">
        <span className="standards-eyebrow">Hubungi Perusahaan</span>
        <h2>
          Layanan Pelanggan &amp; <em className="italic">Kunjungan Pabrik</em>
        </h2>
        <p>
          Tim layanan resmi CV. Putra AR siap menjawab pertanyaan mengenai produk, jadwal produksi, hingga peluang keagenan.
        </p>
      </div>

      <div className="contact-layout">
        <motion.div
          className="contact-info-card"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-item-row">
            <div className="contact-icon-box">
              <MapPin />
            </div>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: 4 }}>Alamat Fasilitas Produksi</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Desa Sukahurip, Kecamatan Cihaurbeuti, Kabupaten Ciamis, Jawa Barat 46262, Indonesia
              </p>
            </div>
          </div>

          <div className="contact-item-row">
            <div className="contact-icon-box">
              <Phone />
            </div>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: 4 }}>Telepon &amp; WhatsApp Resmi</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Hotline: (0265) 5401232<br />
                WhatsApp: +62 813-1064-1534
              </p>
            </div>
          </div>

          <div className="contact-item-row">
            <div className="contact-icon-box">
              <Clock />
            </div>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: 4 }}>Jam Operasional Pelayanan</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Senin - Sabtu: 08.00 - 17.00 WIB<br />
                Minggu &amp; Libur Nasional: Konfirmasi Terlebih Dahulu
              </p>
            </div>
          </div>

          <div className="contact-item-row" style={{ marginBottom: 0 }}>
            <div className="contact-icon-box">
              <Mail />
            </div>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: 4 }}>Surat Elektronik Resmi</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                layanan@cvputra-ar.co.id
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="contact-form-card"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="c-name">Nama Lengkap / Instansi Usaha</label>
              <input
                type="text"
                id="c-name"
                required
                placeholder="Nama Anda atau Usaha"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="c-phone">Nomor Telepon / WhatsApp Aktif</label>
              <input
                type="tel"
                id="c-phone"
                required
                placeholder="Contoh: 08123456789"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="c-subject">Perihal Pertanyaan</label>
              <input
                type="text"
                id="c-subject"
                required
                placeholder="Pemesanan grosir, keagenan, katering..."
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="c-msg">Isi Pesan</label>
              <textarea
                id="c-msg"
                rows="3"
                required
                placeholder="Tuliskan detail kebutuhan pasokan atau pesan Anda"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="btn-form-submit">
              <Send size={16} /> Kirim Pesan Resmi
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
