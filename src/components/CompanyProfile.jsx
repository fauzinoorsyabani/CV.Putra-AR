import React from 'react';
import { motion } from 'framer-motion';

export const CompanyProfile = () => {
  return (
    <section className="section-profile" id="profile">
      <div className="profile-container">
        <motion.div
          className="profile-content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="profile-eyebrow">Profil &amp; Sejarah Perusahaan</span>
          <h2 className="profile-heading">
            Melayani Kebutuhan Pangan Nusantara <em className="italic">Sejak Tahun 2017</em>
          </h2>

          <p className="profile-body-text">
            CV. Putra AR merupakan perusahaan manufaktur makanan olahan terkemuka yang berpusat di Ciamis, Jawa Barat. Bermula dari sebuah perusahaan dagang (PD), tingginya kepercayaan mitra mendorong transformasi resmi menjadi CV pada tahun 2017, dan saat ini sedang dalam proses menuju Perseroan Terbatas (PT).
          </p>

          <p className="profile-body-text">
            Kami memusatkan keahlian pada aneka bakso kemasan beku bermerk <em>Raja Raoz</em>, otak-otak ikan tenggiri, kwetiau basah, dan camilan gurih. Seluruh proses produksi diproses secara higienis menggunakan mesin otomasi modern berstandar Jepang.
          </p>

          <div className="profile-stats-row">
            <div className="profile-stat-box">
              <h3>309+</h3>
              <p>Tenaga Kerja Terlatih</p>
            </div>
            <div className="profile-stat-box">
              <h3>500 Jt</h3>
              <p>Kapasitas Harian (Unit)</p>
            </div>
            <div className="profile-stat-box">
              <h3>100+</h3>
              <p>Jaringan Mitra Se-Jawa</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="profile-visual"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="profile-img-card">
            <img
              src="img/tentang-kami-cvputraar.webp"
              alt="Fasilitas Pabrik CV. Putra AR Ciamis"
              loading="lazy"
            />
          </div>

          <div className="profile-quote-card">
            <p>
              "Menjaga konsistensi rasa dan higienitas pangan dengan mesin modern berstandar Jepang untuk kepuasan mitra dan konsumen di seluruh Pulau Jawa."
            </p>
            <span>Manajemen CV. Putra AR - Ciamis</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
