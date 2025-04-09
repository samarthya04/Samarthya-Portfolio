/**
 * Matrix Theme JS - Optimized, Interactive, and Hacker-tastic
 */

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Optimized Matrix Rain
function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789∫∬∮≠√∞';
    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const speeds = Array(columns).fill().map(() => Math.random() * 1.2 + 0.8);

    const greens = ['#00FF41', '#00DF38', '#00CF35', '#00BF32', '#00AF2F', '#A4FFC9'];

    let lastTime = 0;
    const fps = 25; // Lower FPS for performance + retro vibe
    const fpsInterval = 1000 / fps;

    function draw(currentTime) {
        if (currentTime - lastTime < fpsInterval) {
            requestAnimationFrame(draw);
            return;
        }
        lastTime = currentTime;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const color = greens[Math.floor(Math.random() * greens.length)];
            ctx.fillStyle = `${color}${drops[i] < 5 ? 'DD' : '99'}`; // Hex opacity
            ctx.font = `${fontSize - Math.random() * 3}px 'Fira Code', monospace`;
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) drops[i] = 0;
            drops[i] += speeds[i];
        }
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
}

window.addEventListener('load', initMatrix);
window.addEventListener('resize', debounce(() => initMatrix(), 150));

// Theme Toggle
function initThemeToggle() {
    const toggleBtn = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDark = localStorage.getItem('darkMode') === 'true' || (localStorage.getItem('darkMode') === null && prefersDark);

    if (!isDark) {
        document.documentElement.classList.add('light-mode');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    toggleBtn.addEventListener('click', () => {
        isDark = !isDark;
        localStorage.setItem('darkMode', isDark);
        document.documentElement.classList.toggle('light-mode');
        toggleBtn.classList.add('spin');
        toggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        setTimeout(() => toggleBtn.classList.remove('spin'), 500);
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');
    const links = menu.querySelectorAll('a');

    menuBtn.addEventListener('click', () => {
        menu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        links.forEach((link, i) => {
            link.style.animation = `slideIn 0.4s ease ${i * 0.1}s forwards`;
        });
    });

    const closeMenu = () => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        links.forEach(link => link.style.animation = '');
    };

    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    links.forEach(link => link.addEventListener('click', closeMenu));
}

// Smooth Scroll & Nav State
function initSmoothScroll() {
    const headerHeight = document.querySelector('header').offsetHeight;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                anchor.classList.add('active');
            }
        });
    });

    window.addEventListener('scroll', debounce(() => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - headerHeight - 50;
            if (window.scrollY >= top && window.scrollY < top + section.offsetHeight) {
                current = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    }, 100));
}

// Header Scroll
function initHeaderScroll() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 80);
    });
}

// Typewriter
function initTypedEffect() {
    const el = document.querySelector('.typewriter');
    if (!el) return;
    const text = el.textContent;
    el.textContent = '';
    let i = 0;
    const type = () => {
        if (i < text.length) {
            el.textContent += text[i++];
            setTimeout(type, Math.random() * 50 + 30);
        } else {
            el.insertAdjacentHTML('beforeend', '<span class="terminal-cursor"></span>');
        }
    };
    setTimeout(type, 600);
}

// Code Copy
function initCodeCopy() {
    document.querySelectorAll('.code-block').forEach(block => {
        const btn = block.querySelector('.copy-btn');
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(block.querySelector('.code-block-content').textContent)
                .then(() => {
                    btn.innerHTML = '<i class="fas fa-check"></i> Copied';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.innerHTML = '<i class="fas fa-clipboard"></i> Copy';
                        btn.classList.remove('copied');
                    }, 1500);
                });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.card, .section-title, .timeline-item').forEach(el => observer.observe(el));
}

// Back to Top
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Swiper
function initSwiper() {
    new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
}

// Utility: Debounce
function debounce(func, wait = 100) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Init All
document.addEventListener('DOMContentLoaded', () => {
    initMatrix();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initTypedEffect();
    initCodeCopy();
    initScrollAnimations();
    initBackToTop();
    initSwiper();
    document.body.classList.add('js-loaded');
    console.log("%c> Matrix Hack Online", "color: #00AF2F; font-size: 18px; text-shadow: 0 0 5px #00FF41;");
});
