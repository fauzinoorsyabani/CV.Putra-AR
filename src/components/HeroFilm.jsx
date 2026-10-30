import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Users } from 'lucide-react';
import { filmSlides } from '../data/slides';

export const HeroFilm = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timecode, setTimecode] = useState('00:01:24:18');

  // Automated scene transitions every 5.5 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filmSlides.length);
    }, 5500);
    return () => clearInterval(slideTimer);
  }, []);

  // Live cinematic timecode ticker
  useEffect(() => {
    let frame = 18;
    let sec = 24;
    const tcTimer = setInterval(() => {
      frame++;
      if (frame >= 24) {
        frame = 0;
        sec++;
      }
      const sStr = String(sec % 60).padStart(2, '0');
      const fStr = String(frame).padStart(2, '0');
      setTimecode(`00:01:${sStr}:${fStr}`);
    }, 1000 / 24);
    return () => clearInterval(tcTimer);
  }, []);

  // Automated Typewriter Headline Rotation
  const headlinePhrases = [
    { prefix: 'Cita Rasa Otentik, Standar ', highlight: 'Modern' },
    { prefix: 'Manufaktur Higienis Berteknologi ', highlight: 'Jepang' },
    { prefix: 'Produksi Bakso Raja Raoz & ', highlight: 'Pangan Olahan' },
    { prefix: 'Pasokan Berkualitas untuk ', highlight: 'Mitra Grosir' },
    { prefix: 'Dedikasi Mutu Pangan Terbaik ', highlight: 'Nusantara' },
  ];

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typedCount, setTypedCount] = useState(
    headlinePhrases[0].prefix.length + headlinePhrases[0].highlight.length
  );
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = headlinePhrases[phraseIdx];
    const fullLen = current.prefix.length + current.highlight.length;

    let timer;
    if (isDeleting) {
      if (typedCount > 0) {
        timer = setTimeout(() => {
          setTypedCount((prev) => prev - 1);
        }, 22);
      } else {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % headlinePhrases.length);
        timer = setTimeout(() => {}, 400);
      }
    } else {
      if (typedCount < fullLen) {
        timer = setTimeout(() => {
          setTypedCount((prev) => prev + 1);
        }, 42);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2600);
      }
    }

    return () => clearTimeout(timer);
  }, [typedCount, isDeleting, phraseIdx]);

  const activePhrase = headlinePhrases[phraseIdx];
  const prefixPart = activePhrase.prefix.substring(0, typedCount);
  const highlightPart =
    typedCount > activePhrase.prefix.length
      ? activePhrase.highlight.substring(0, typedCount - activePhrase.prefix.length)
      : '';

  const activeSlideData = filmSlides[currentSlide];

  return (
    <header className="film-hero" id="home">
      {/* Cinematic Top Letterbox Bar */}
      <div className="film-letterbox-top"></div>

      {/* Cinematic HUD Overlay */}
      <div className="film-hud">
        <div className="film-hud-rec">
          <span className="film-rec-dot"></span>
          <span>REC // LIVE VIEW</span>
        </div>
        <div className="film-hud-timecode">{timecode}</div>
        <div className="film-hud-meta">
          <span>{activeSlideData.lens}</span> | <span>{activeSlideData.iso}</span> | <span>{activeSlideData.fps}</span>
        </div>
      </div>

      {/* Cinematic Background Slides with Ken Burns Motion */}
      <div className="film-slides-viewport">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlideData.id}
            className="film-slide-item active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={activeSlideData.image}
              alt={activeSlideData.title}
              initial={{ scale: 1 }}
              animate={{ scale: 1.15 }}
              transition={{ duration: 6.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Solid Dark Navy Scrim Overlay */}
      <div className="film-scrim-overlay"></div>

      {/* Subtle Film Grain Layer */}
      <div className="film-grain-layer"></div>

      {/* Hero Typography & CTA */}
      <div className="film-hero-container">
        <motion.span
          className="film-pre-badge"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Manufaktur Pangan Resmi • Berdiri Sejak 2017
        </motion.span>

        <h1 className="film-main-headline">
          <span>{prefixPart}</span>
          {highlightPart && <em className="italic">{highlightPart}</em>}
          <span className="film-typing-cursor">|</span>
        </h1>

        <motion.p
          className="film-lead-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Produsen bakso Raja Raoz, otak-otak, kwetiau, dan camilan olahan bermutu tinggi.
          Didukung otomasi mesin berstandar Jepang untuk pasokan grosir terpercaya di seluruh Pulau Jawa.
        </motion.p>

        <motion.div
          className="film-cta-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#products" className="btn-solid-primary">
            <ShoppingBag size={18} /> Katalog Produk
          </a>
          <a href="#partnership" className="btn-solid-secondary">
            <Users size={18} /> Kemitraan Grosir
          </a>
        </motion.div>
      </div>

      {/* Cinematic Lower-Third Reel Info */}
      <div className="film-lower-third">
        <div className="film-scene-name">
          <span>{activeSlideData.scene}</span> : {activeSlideData.title}
        </div>
        <div className="film-reel-dots">
          {filmSlides.map((slide, idx) => (
            <span
              key={slide.id}
              className={`film-reel-dot ${idx === currentSlide ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </div>

      {/* Cinematic Bottom Letterbox Bar */}
      <div className="film-letterbox-bottom"></div>
    </header>
  );
};
