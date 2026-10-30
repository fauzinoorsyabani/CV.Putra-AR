document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        activeCategory: 'all',
        searchQuery: '',
        activeProduct: null,
        isDetailOpen: false,

        items: [
            { 
                id: 1, 
                name: 'Otak-Otak Ikan Premium', 
                category: 'otakotak',
                categoryLabel: 'Otak-Otak',
                img: '1.webp', 
                price: 20000,
                desc: 'Otak-otak ikan tenggiri segar dengan racikan rempah pilihan khas Nusantara. Memiliki tekstur kenyal sempurna dan gurih alami berstandar pabrik modern.',
                rating: 5,
                unit: '10 pcs / pack',
                isBestSeller: true
            },
            { 
                id: 2, 
                name: 'Bakso Sapi Super Raja Raoz', 
                category: 'bakso',
                categoryLabel: 'Bakso',
                img: '2.webp', 
                price: 25000,
                desc: 'Bakso daging sapi asli berkualitas prima dengan resep legendaris Raja Raoz. Diproduksi higienis dengan mesin modern Jepang tanpa pengawet berbahaya.',
                rating: 5,
                unit: '20 pcs / pack',
                isBestSeller: true
            },
            { 
                id: 3, 
                name: 'Basreng Pedas Daun Jeruk', 
                category: 'snack',
                categoryLabel: 'Snack & Camilan',
                img: '3.webp', 
                price: 30000,
                desc: 'Baso goreng potongan stik renyah berpadu dengan cabai rawit merah asli dan aroma daun jeruk purut segar yang pedas, gurih, dan nagih.',
                rating: 5,
                unit: '250 gram',
                isBestSeller: true
            },
            { 
                id: 4, 
                name: 'Cimol Ayam Gurih Krispi', 
                category: 'snack',
                categoryLabel: 'Snack & Camilan',
                img: '4.webp', 
                price: 15000,
                desc: 'Cimol kenyal berisi olahan daging ayam cincang gurih, siap goreng dengan hasil mekar renyah di luar dan lembut di dalam.',
                rating: 5,
                unit: '300 gram',
                isBestSeller: false
            },
            { 
                id: 5, 
                name: 'Stik Bawang Gurih Renyah', 
                category: 'snack',
                categoryLabel: 'Snack & Camilan',
                img: '5.webp', 
                price: 30000,
                desc: 'Camilan stik bawang renyah tradisional dengan harum seledri dan rempah bawang segar pilihan yang cocok untuk teman santai.',
                rating: 5,
                unit: '250 gram',
                isBestSeller: false
            },
            { 
                id: 6, 
                name: 'Basreng Ayam Original', 
                category: 'snack',
                categoryLabel: 'Snack & Camilan',
                img: '6.webp', 
                price: 30000,
                desc: 'Baso goreng potongan stik rasa ayam gurih renyah tanpa rasa pedas, cocok dinikmati semua kalangan dan anak-anak.',
                rating: 5,
                unit: '250 gram',
                isBestSeller: false
            },
        ],

        get filteredItems() {
            return this.items.filter(item => {
                const matchesCategory = this.activeCategory === 'all' || item.category === this.activeCategory;
                const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                                      item.desc.toLowerCase().includes(this.searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });
        },

        openDetail(item) {
            this.activeProduct = item;
            this.isDetailOpen = true;
            document.body.style.overflow = 'hidden';
        },

        closeDetail() {
            this.isDetailOpen = false;
            document.body.style.overflow = '';
        },

        addToCartFromDetail() {
            if (this.activeProduct) {
                Alpine.store('cart').add(this.activeProduct);
                this.closeDetail();
            }
        }
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        isOpen: false,

        toggle() {
            this.isOpen = !this.isOpen;
        },

        close() {
            this.isOpen = false;
        },

        add(newItem) {
            const cartItem = this.items.find((item) => item.id === newItem.id);

            if (!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                this.items = this.items.map((item) => {
                    if (item.id === newItem.id) {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                    }
                    return item;
                });
            }

            // Trigger animation on cart badge & show toast
            showToast(`${newItem.name} ditambahkan ke keranjang.`);
            const badge = document.querySelector('.quantity-badge');
            if (badge) {
                badge.classList.remove('badge-pop');
                void badge.offsetWidth;
                badge.classList.add('badge-pop');
            }
        },

        remove(id) {
            const cartItem = this.items.find((item) => item.id === id);
            if (!cartItem) return;

            if (cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    if (item.id === id) {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                    }
                    return item;
                });
            } else {
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },

        clear() {
            this.items = [];
            this.total = 0;
            this.quantity = 0;
        }
    });
});

// Toast notification function
function showToast(message) {
    let toast = document.getElementById('site-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'site-toast';
        toast.className = 'site-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

// Rupiah formatting helper
function rupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number || 0);
}

// Checkout form handling
document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutButton = document.getElementById('checkout-button');

    if (checkoutForm && checkoutButton) {
        const validateInputs = () => {
            const nameInput = checkoutForm.querySelector('#name');
            const phoneInput = checkoutForm.querySelector('#phone');
            const addressInput = checkoutForm.querySelector('#address');
            
            const isValid = nameInput && nameInput.value.trim().length >= 2 &&
                            phoneInput && phoneInput.value.trim().length >= 8 &&
                            addressInput && addressInput.value.trim().length >= 5;

            checkoutButton.disabled = !isValid;
            if (isValid) {
                checkoutButton.classList.remove('disabled');
            } else {
                checkoutButton.classList.add('disabled');
            }
        };

        checkoutForm.addEventListener('input', validateInputs);

        checkoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            const formData = new FormData(checkoutForm);
            const data = Object.fromEntries(formData.entries());
            
            const cartItems = Alpine.store('cart').items;
            if (!cartItems.length) {
                showToast('Keranjang Anda masih kosong.');
                return;
            }

            const totalAmount = Alpine.store('cart').total;
            const message = formatWhatsAppOrder(data, cartItems, totalAmount);
            const waNumber = '6281310641534';
            window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
        });
    }
});

// WhatsApp order message formatting (STRICTLY ZERO EMOJIS)
function formatWhatsAppOrder(customer, items, total) {
    const dateStr = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const itemsList = items.map((item, index) => 
        `${index + 1}. ${item.name} (${item.quantity}x) = ${rupiah(item.total)}`
    ).join('\n');

    return [
        'FORMULIR PEMESANAN RESMI - CV. PUTRA AR',
        '-------------------------------------------',
        `Tanggal: ${dateStr}`,
        '',
        'DATA PEMESAN:',
        `Nama: ${customer.name || '-'}`,
        `Nomor Telepon/WA: ${customer.phone || '-'}`,
        `Alamat Pengiriman: ${customer.address || '-'}`,
        `Catatan Tambahan: ${customer.notes || '-'}`,
        '',
        'RINCIAN PESANAN:',
        itemsList,
        '-------------------------------------------',
        `TOTAL PEMBAYARAN: ${rupiah(total)}`,
        '-------------------------------------------',
        'Mohon konfirmasi ketersediaan stok, ongkos kirim, dan nomor rekening pembayaran.',
        'Terima kasih telah memesan di CV. Putra AR.'
    ].join('\n');
}
