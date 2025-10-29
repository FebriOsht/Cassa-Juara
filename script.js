document.addEventListener('DOMContentLoaded', function() {
    
    // ================================================================
    // 1. NAVIGATION & MOBILE MENU
    // ================================================================
    const hamburger = document.querySelector('.hamburger-icon');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            // Toggle class 'active' untuk menampilkan/menyembunyikan menu di mobile
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? '✖' : '☰';
        });

        // Menutup menu saat link di klik (untuk navigasi anchor)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Pastikan hanya menutup di tampilan mobile (jika diperlukan)
                if (window.innerWidth < 768) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '☰';
                }
            });
        });
    }

    // ================================================================
    // 2. COUNTDOWN TIMER (PROMO SECTION)
    // ================================================================
    function startCountdown() {
        // Tentukan waktu berakhir (Contoh: 24 jam dari sekarang)
        const endTime = new Date().getTime() + (24 * 60 * 60 * 1000); 

        const timerInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = endTime - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const timerHours = document.getElementById('timer-hours');
            const timerMinutes = document.getElementById('timer-minutes');
            const timerSeconds = document.getElementById('timer-seconds');
            
            const formatTime = (time) => time < 10 ? "0" + time : time;

            if (timerHours && timerMinutes && timerSeconds) {
                timerHours.innerHTML = formatTime(hours);
                timerMinutes.innerHTML = formatTime(minutes);
                timerSeconds.innerHTML = formatTime(seconds);
            }
            
            if (distance < 0) {
                clearInterval(timerInterval);
                if (timerHours) timerHours.innerHTML = "00";
                if (timerMinutes) timerMinutes.innerHTML = "00";
                if (timerSeconds) timerSeconds.innerHTML = "00";
                const promoContent = document.querySelector('.promo-banner p');
                if (promoContent) {
                    promoContent.textContent = "Maaf, promo telah berakhir. Ikuti terus update kami!";
                }
            }
        }, 1000);
    }

    startCountdown();


    // ================================================================
    // 3. STICKY CTA MOBILE HIDE/SHOW ON SCROLL
    // ================================================================
    const floatingCta = document.querySelector('.floating-cta-mobile');
    let lastScrollY = window.scrollY;
    
    // Pastikan fungsionalitas ini hanya berjalan di perangkat mobile
    if (floatingCta && window.innerWidth < 768) { 
        window.addEventListener('scroll', function() {
            // Sembunyikan saat scroll ke bawah dan sudah melewati 200px
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                floatingCta.style.transform = 'translateY(100%)';
            } 
            // Tampilkan saat scroll ke atas
            else if (window.scrollY < lastScrollY) {
                floatingCta.style.transform = 'translateY(0)';
            }
            
            lastScrollY = window.scrollY;
        });
    }

    // ================================================================
    // 4. SCROLL REVEAL (Intersection Observer)
    // ================================================================
    const revealElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan kelas 'visible' untuk memicu animasi
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Munculkan elemen saat 10% dari elemen terlihat
        threshold: 0.1 
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

});