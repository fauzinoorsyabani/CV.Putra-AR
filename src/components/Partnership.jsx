import React from 'react';
import { motion } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';

export const Partnership = () => {
  const tiers = [
    {
      badge: 'Tier 1 - Mitra Toko',
      title: 'Reseller Resmi',
      minOrder: 'Min. Order: 50 Pack / Bulan',
      benefits: [
        'Diskon harga grosir 15% dari eceran',
        'Bebas mix varian produk Raja Raoz',
        'Dukungan materi promosi digital',
        'Jadwal kirim berkala terjamin',
      ],
      isFeatured: false,
    },
    {
      badge: 'Tier 2 - Terpopuler',
      title: 'Agen Wilayah',
      minOrder: 'Min. Order: 250 Pack / Bulan',
      benefits: [
        'Diskon harga distributor 25%',
        'Hak eksklusivitas tingkat kecamatan',
        'Prioritas pengiriman armada berpendingin',
        'Banner fisik & spanduk outlet resmi',
        'Pelatihan standar handling frozen food',
      ],
      isFeatured: true,
    },
    {
      badge: 'Tier 3 - Skala Kota',
      title: 'Distributor Utama',
      minOrder: 'Min. Order: 1.000+ Pack / Bulan',
      benefits: [
        'Harga pabrik langsung (Paling Kompetitif)',
        'Eksklusivitas teritorial tingkat kota/kabupaten',
        'Fasilitas tempo pembayaran berkala',
        'Pengiriman langsung dari gudang pusat Ciamis',
        'Dedicated account manager kemitraan',
      ],
      isFeatured: false,
    },
  ];

  const handleConsultation = (tierTitle) => {
    const text = encodeURIComponent(
      `Halo CV. Putra AR, saya berminat mengajukan kemitraan resmi untuk tingkatan [${tierTitle}]. Mohon informasi syarat dan katalog harga grosir pabrik.`
    );
    window.open(`https://wa.me/6281310641534?text=${text}`, '_blank');
  };

  return (
    <section className="section-partnership" id="partnership">
      <div className="partnership-container">
        <div className="partnership-header">
          <span className="standards-eyebrow">Peluang Kerjasama B2B</span>
          <h2>
            Program Kemitraan &amp; <em className="italic">Pasokan Grosir</em>
          </h2>
          <p>
            Dapatkan margin usaha yang menguntungkan dengan memasarkan produk olahan pangan resmi CV. Putra AR di wilayah Anda.
          </p>
        </div>

        <div className="partnership-tiers-grid">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.title}
              className={`tier-card ${tier.isFeatured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <span className="tier-badge">{tier.badge}</span>
              <h3 className="tier-title">{tier.title}</h3>
              <p className="tier-min">{tier.minOrder}</p>

              <ul className="tier-benefits">
                {tier.benefits.map((benefit, i) => (
                  <li key={i}>
                    <Check />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="btn-tier-cta"
                onClick={() => handleConsultation(tier.title)}
              >
                <MessageCircle size={17} /> Ajukan Kemitraan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
