// CV. Putra AR - Interactive Script & Animation Controller

document.addEventListener('DOMContentLoaded', () => {
    // 1. Feather Icons Initialization
    if (window.feather) {
        feather.replace();
    }

    // 2. Navbar Elements & State
    const navbar = document.querySelector('.navbar');
    const hamburgerBtn = document.querySelector('#hamburger-menu');
    const navbarNav = document.querySelector('.navbar-nav');
    const searchBtn = document.querySelector('#search-button');
    const searchForm = document.querySelector('.search-form');
    const searchBox = document.querySelector('#search-box');
    const cartBtn = document.querySelector('#shopping-cart-button');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');

    // Scroll Navbar Effect & Progress Bar
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        if (scrollProgressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
            scrollProgressBar.style.width = `${progress}%`;
        }

        // Back to top visibility
        const backToTopBtn = document.querySelector('#back-to-top');
        if (backToTopBtn) {
            if (scrolled > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    // Hamburger Menu Toggle
    if (hamburgerBtn && navbarNav) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navbarNav.classList.toggle('active');
            if (searchForm) searchForm.classList.remove('active');
        });
    }

    // Search Toggle
    if (searchBtn && searchForm) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            searchForm.classList.toggle('active');
            if (navbarNav) navbarNav.classList.remove('active');
            if (searchForm.classList.contains('active') && searchBox) {
                setTimeout(() => searchBox.focus(), 150);
            }
        });
    }

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (navbarNav && !navbarNav.contains(e.target) && hamburgerBtn && !hamburgerBtn.contains(e.target)) {
            navbarNav.classList.remove('active');
        }
        if (searchForm && !searchForm.contains(e.target) && searchBtn && !searchBtn.contains(e.target)) {
            searchForm.classList.remove('active');
        }
    });

    // Close mobile nav on link click
    if (navbarNav) {
        navbarNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbarNav.classList.remove('active');
            });
        });
    }

    // Search Box live search triggering
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            // Scroll to product section if user is typing
            if (query.length >= 2) {
                const productSection = document.querySelector('#products');
                if (productSection && window.scrollY < productSection.offsetTop - 300) {
                    productSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Sync with Alpine data if active
            const productElem = document.querySelector('[x-data="products"]');
            if (productElem && Alpine && Alpine.$data(productElem)) {
                Alpine.$data(productElem).searchQuery = query;
            }
        });
    }

    // 3. Interactive Gate Entrance Simulation
    const gateEntranceContainer = document.querySelector('.gate-entrance-container');
    const openGateBtn = document.querySelector('#open-gate-trigger');
    const gateVideoPreview = document.querySelector('#gate-video-preview');
    const gateStatusPill = document.querySelector('#gate-status-pill');

    if (openGateBtn && gateEntranceContainer) {
        openGateBtn.addEventListener('click', () => {
            const isOpened = gateEntranceContainer.classList.toggle('gate-opened');
            if (isOpened) {
                openGateBtn.innerHTML = '<i data-feather="lock"></i> Tutup Gerbang Masuk';
                if (gateStatusPill) {
                    gateStatusPill.textContent = 'Akses Terbuka: Memasuki Area Fasilitas Produksi';
                    gateStatusPill.classList.add('status-open');
                }
                if (gateVideoPreview) {
                    gateVideoPreview.play().catch(() => {});
                }
            } else {
                openGateBtn.innerHTML = '<i data-feather="unlock"></i> Buka Gerbang Masuk Perusahaan';
                if (gateStatusPill) {
                    gateStatusPill.textContent = 'Pintu Gerbang Utama: Keamanan & Sterilisasi Terpadu';
                    gateStatusPill.classList.remove('status-open');
                }
            }
            if (window.feather) feather.replace();
        });
    }

    // 4. Virtual Tour Video Modal System
    const tourModal = document.querySelector('#tour-modal');
    const tourOpenBtns = document.querySelectorAll('.open-tour-trigger');
    const tourCloseBtn = document.querySelector('#tour-close-btn');
    const tourVideo = document.querySelector('#tour-main-video');
    const tourPlayPauseBtn = document.querySelector('#tour-play-pause');
    const tourMuteBtn = document.querySelector('#tour-mute');
    const tourChapters = document.querySelectorAll('.tour-chapter-item');

    const openTour = (chapterTime = 0) => {
        if (!tourModal) return;
        tourModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (tourVideo) {
            tourVideo.currentTime = chapterTime;
            tourVideo.play().catch(() => {});
            updatePlayPauseIcon(true);
        }
    };

    const closeTour = () => {
        if (!tourModal) return;
        tourModal.classList.remove('active');
        document.body.style.overflow = '';
        if (tourVideo) {
            tourVideo.pause();
            updatePlayPauseIcon(false);
        }
    };

    const updatePlayPauseIcon = (isPlaying) => {
        if (!tourPlayPauseBtn) return;
        if (isPlaying) {
            tourPlayPauseBtn.innerHTML = '<i data-feather="pause"></i>';
        } else {
            tourPlayPauseBtn.innerHTML = '<i data-feather="play"></i>';
        }
        if (window.feather) feather.replace();
    };

    tourOpenBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const time = parseFloat(btn.getAttribute('data-time') || '0');
            openTour(time);
        });
    });

    if (tourCloseBtn) {
        tourCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeTour();
        });
    }

    if (tourModal) {
        tourModal.addEventListener('click', (e) => {
            if (e.target === tourModal) {
                closeTour();
            }
        });
    }

    // Escape key closes modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeTour();
            const itemModal = document.querySelector('#item-detail-modal');
            if (itemModal) itemModal.style.display = 'none';
        }
    });

    if (tourPlayPauseBtn && tourVideo) {
        tourPlayPauseBtn.addEventListener('click', () => {
            if (tourVideo.paused) {
                tourVideo.play().catch(() => {});
                updatePlayPauseIcon(true);
            } else {
                tourVideo.pause();
                updatePlayPauseIcon(false);
            }
        });
    }

    if (tourMuteBtn && tourVideo) {
        tourMuteBtn.addEventListener('click', () => {
            tourVideo.muted = !tourVideo.muted;
            if (tourVideo.muted) {
                tourMuteBtn.innerHTML = '<i data-feather="volume-x"></i>';
            } else {
                tourMuteBtn.innerHTML = '<i data-feather="volume-2"></i>';
            }
            if (window.feather) feather.replace();
        });
    }

    // Chapter Navigation
    tourChapters.forEach(chapter => {
        chapter.addEventListener('click', () => {
            const time = parseFloat(chapter.getAttribute('data-chapter-time') || '0');
            if (tourVideo) {
                tourVideo.currentTime = time;
                tourVideo.play().catch(() => {});
                updatePlayPauseIcon(true);
            }
            tourChapters.forEach(c => c.classList.remove('active'));
            chapter.classList.add('active');
        });
    });

    // 5. Scroll Reveal Animations & Number Counters
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const counterElements = document.querySelectorAll('.counter-number');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Animated number counter
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseInt(target.getAttribute('data-count') || '0', 10);
                const suffix = target.getAttribute('data-suffix') || '';
                const prefix = target.getAttribute('data-prefix') || '';
                const duration = 1800;
                let startTimestamp = null;

                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    // easeOutQuart
                    const easeProgress = 1 - Math.pow(1 - progress, 4);
                    const currentVal = Math.floor(easeProgress * endVal);
                    target.textContent = `${prefix}${currentVal.toLocaleString('id-ID')}${suffix}`;
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        target.textContent = `${prefix}${endVal.toLocaleString('id-ID')}${suffix}`;
                    }
                };

                window.requestAnimationFrame(step);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.4 });

    counterElements.forEach(counter => counterObserver.observe(counter));

    // 6. Interactive 3D Card Hover / Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // 7. Back To Top
    const backToTopBtn = document.querySelector('#back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 8. Contact Form feedback
    const contactForm = document.querySelector('.contact-form-inner');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[type="text"]').value;
            showToast(`Terima kasih, ${name || 'Bapak/Ibu'}. Pesan Anda telah terkirim ke customer care kami.`);
            contactForm.reset();
        });
    }
});
