// CV. Putra AR - Main Client Script & Directional Scroll Animations

document.addEventListener('DOMContentLoaded', () => {
    // 1. Feather Icons Initialization
    if (window.feather) {
        feather.replace();
    }

    // 2. Navbar Elements & Scroll Effects
    const navbar = document.querySelector('.navbar');
    const hamburgerBtn = document.querySelector('#hamburger-menu');
    const navbarNav = document.querySelector('.navbar-nav');
    const searchBtn = document.querySelector('#search-button');
    const searchForm = document.querySelector('.search-form');
    const searchBox = document.querySelector('#search-box');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    const backToTopBtn = document.querySelector('#back-to-top');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Navbar scrolled state
        if (scrolled > 40) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Top progress bar
        if (scrollProgressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
            scrollProgressBar.style.width = `${progress}%`;
        }

        // Back to top visibility
        if (backToTopBtn) {
            if (scrolled > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    // Mobile Hamburger Menu
    if (hamburgerBtn && navbarNav) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navbarNav.classList.toggle('active');
            if (searchForm) searchForm.classList.remove('active');
        });
    }

    // Quick Search Form
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

    if (navbarNav) {
        navbarNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbarNav.classList.remove('active');
            });
        });
    }

    // Search Box live sync with catalog
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length >= 2) {
                const productSection = document.querySelector('#products');
                if (productSection && window.scrollY < productSection.offsetTop - 300) {
                    productSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            const productElem = document.querySelector('[x-data="products"]');
            if (productElem && Alpine && Alpine.$data(productElem)) {
                Alpine.$data(productElem).searchQuery = query;
            }
        });
    }

    // 3. Fully Automated Continuous Ken Burns Hero Slideshow
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        let currentSlideIdx = 0;
        const totalSlides = heroSlides.length;
        const slideIntervalTime = 4800;

        function advanceHeroSlide() {
            heroSlides[currentSlideIdx].classList.remove('active');
            currentSlideIdx = (currentSlideIdx + 1) % totalSlides;
            heroSlides[currentSlideIdx].classList.add('active');
        }

        // Continuous automatic transition
        setInterval(advanceHeroSlide, slideIntervalTime);
    }

    // 4. Dynamic Rotating Hero Headline
    const rotatingTitleEl = document.querySelector('.hero-rotator-text');
    if (rotatingTitleEl) {
        const headlinePhrases = [
            'Cita Rasa Otentik, Standar <em class="italic">Modern</em>',
            'Olahan Higienis, Mutu <em class="italic">Terpercaya</em>',
            'Pangan Berkualitas, Rasa <em class="italic">Juara</em>',
            'Pasokan Grosir, Skala <em class="italic">Nusantara</em>',
            'Teknologi Presisi, Resep <em class="italic">Legendaris</em>'
        ];
        let headlineIdx = 0;
        const rotateInterval = 3600;

        setInterval(() => {
            rotatingTitleEl.classList.add('slide-out');
            setTimeout(() => {
                headlineIdx = (headlineIdx + 1) % headlinePhrases.length;
                rotatingTitleEl.innerHTML = headlinePhrases[headlineIdx];
                rotatingTitleEl.classList.remove('slide-out');
                rotatingTitleEl.classList.add('slide-in');
                setTimeout(() => {
                    rotatingTitleEl.classList.remove('slide-in');
                }, 380);
            }, 380);
        }, rotateInterval);
    }

    // 5. Directional Scroll Animations (Left, Right, Up, Stagger)
    const directionalElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    directionalElements.forEach(el => revealObserver.observe(el));

    // 6. Animated Number Counters
    const counterElements = document.querySelectorAll('.counter-number');
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
                    const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
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
    }, { threshold: 0.35 });

    counterElements.forEach(counter => counterObserver.observe(counter));

    // 7. Interactive 3D Card Hover / Subtle Perspective Tilt
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // 8. Back To Top Button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. Contact Form Handler
    const contactForm = document.querySelector('.contact-form-inner');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = contactForm.querySelector('#c-name');
            const name = nameInput ? nameInput.value : 'Bapak/Ibu';
            showToast(`Terima kasih, ${name}. Pesan Anda telah kami terima.`);
            contactForm.reset();
        });
    }
});
