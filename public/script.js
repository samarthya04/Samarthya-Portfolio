// Matrix Rain Effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ';
    const fontSize = 18;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    const colors = ['#D4A5FF', '#FFD700', '#A89BB9'];

    function draw() {
        ctx.fillStyle = 'rgba(26, 11, 46, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const colorIndex = Math.floor(Math.random() * colors.length);
            ctx.fillStyle = colors[colorIndex];
            const variableFontSize = fontSize - 2 + Math.random() * 4;
            ctx.font = `${variableFontSize}px 'Fira Code', monospace`;
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    function animate() {
        draw();
        requestAnimationFrame(animate);
    }
    
    animate();
}

initMatrix();
window.addEventListener('resize', debounce(() => initMatrix(), 200));

// Particles
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.querySelector('.hero').prepend(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = 6 + Math.random() * 10 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Swiper
function initSwiper() {
    return new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 40,
        loop: true,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 25,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
        },
        pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        keyboard: { enabled: true },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
        autoplay: { delay: 4000, disableOnInteraction: false },
        on: { init: addMouseParallaxToSlides }
    });
}

function addMouseParallaxToSlides() {
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
        slide.addEventListener('mousemove', e => {
            const { left, top, width, height } = slide.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            const img = slide.querySelector('.project-img');
            if (img) {
                img.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) scale3d(1.05, 1.05, 1.05)`;
            }
        });
        slide.addEventListener('mouseleave', () => {
            const img = slide.querySelector('.project-img');
            if (img) img.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu a');
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        menuLinks.forEach((link, index) => {
            link.style.animation = `fadeInRight 0.3s forwards ${0.1 + index * 0.1}s`;
        });
    });
    
    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        menuLinks.forEach(link => link.style.animation = '');
    });
    
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Counters
function initCounters() {
    const statsContainer = document.createElement('div');
    statsContainer.className = 'stats-container';
    statsContainer.innerHTML = `
        <div class="stat-item card">
            <span class="stat-count" data-target="15">0</span>
            <span class="stat-label">Projects</span>
        </div>
        <div class="stat-item card">
            <span class="stat-count" data-target="8">0</span>
            <span class="stat-label">Technologies</span>
        </div>
        <div class="stat-item card">
            <span class="stat-count" data-target="3">0</span>
            <span class="stat-label">Years</span>
        </div>
    `;
    const aboutSection = document.getElementById('about');
    aboutSection.parentNode.insertBefore(statsContainer, aboutSection.nextSibling);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-count');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const updateCounter = () => {
                        const increment = target / 50;
                        if (count < target) {
                            count += increment;
                            counter.textContent = Math.ceil(count);
                            setTimeout(updateCounter, 30);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsContainer);
}

// Terminal Effect
function initTerminalEffect() {
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        const originalText = block.innerHTML;
        block.innerHTML = '';
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                block.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, Math.random() * 15 + 10);
            }
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(block);
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        const label = input.previousElementSibling;
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(label);
        wrapper.appendChild(input);
        
        input.addEventListener('focus', () => wrapper.classList.add('focused'));
        input.addEventListener('blur', () => {
            if (input.value === '') wrapper.classList.remove('focused');
        });
        if (input.value !== '') wrapper.classList.add('focused');
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.parentNode.classList.add('error');
            } else {
                input.parentNode.classList.remove('error');
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const submitBtn = form.querySelector('.form-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            form.reset();
            inputs.forEach(input => input.parentNode.classList.remove('focused'));
            showNotification('Message sent successfully!', 'success');
        } catch (error) {
            showNotification('Failed to send message. Try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const icon = document.createElement('i');
    if (type === 'success') icon.className = 'fas fa-check-circle';
    else if (type === 'error') icon.className = 'fas fa-exclamation-circle';
    else icon.className = 'fas fa-info-circle';
    
    notification.prepend(icon);
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Theme Toggle
function initThemeToggle() {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    toggleBtn.setAttribute('aria-label', 'Toggle light/dark mode');
    document.querySelector('header .container').appendChild(toggleBtn);
    
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                    (localStorage.getItem('darkMode') === null && prefersDarkMode);
    
    if (!isDarkMode) document.documentElement.classList.add('light-mode');
    
    toggleBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
        document.documentElement.classList.toggle('light-mode');
        toggleBtn.classList.add('spin');
        toggleBtn.innerHTML = isDarkMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        setTimeout(() => toggleBtn.classList.remove('spin'), 300);
    });
}

// Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        console.log('Browser supports native lazy loading');
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) img.src = src;
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '200px 0px', threshold: 0.1 });
        
        images.forEach(img => {
            const src = img.getAttribute('src');
            img.setAttribute('data-src', src);
            img.removeAttribute('src');
            observer.observe(img);
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatableElements = document.querySelectorAll('.card, .section-title');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
    
    animatableElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Glitch Effect
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        const originalText = element.textContent;
        element.addEventListener('mouseover', () => {
            element.classList.add('glitching');
            let iterations = 0;
            const maxIterations = 8;
            const interval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations || Math.random() < 0.5) return char;
                        return '01'[Math.floor(Math.random() * 2)];
                    })
                    .join('');
                iterations += 1 / 3;
                if (iterations >= maxIterations) {
                    clearInterval(interval);
                    element.textContent = originalText;
                    element.classList.remove('glitching');
                }
            }, 50);
        });
    });
}

// Parallax
function initParallaxScrolling() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) heroContent.style.transform = `translateY(${scrollPosition * 0.15}px)`;
        
        const aboutImage = document.querySelector('.about-image');
        if (aboutImage) {
            const aboutOffset = aboutImage.offsetTop;
            const distance = scrollPosition - aboutOffset;
            if (distance > -500 && distance < 500) {
                aboutImage.style.transform = `translateY(${distance * -0.03}px)`;
            }
        }
    });
}

// Skill Bars
function initSkillBars() {
    const skillLists = document.querySelectorAll('.skill-list');
    skillLists.forEach(list => {
        const items = list.querySelectorAll('li');
        const skillBars = document.createElement('div');
        skillBars.className = 'skill-bars';
        
        items.forEach(item => {
            const proficiency = 70 + Math.floor(Math.random() * 25);
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';
            skillBar.innerHTML = `
                <div class="skill-name">${item.textContent}</div>
                <div class="skill-progress">
                    <div class="skill-percentage" style="width: 0%" data-width="${proficiency}%">
                        <span>${proficiency}%</span>
                    </div>
                </div>
            `;
            skillBars.appendChild(skillBar);
        });
        list.parentNode.replaceChild(skillBars, list);
    });
    
    const skillBars = document.querySelectorAll('.skill-percentage');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => bar.style.width = width, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => observer.observe(bar));
}

// Cursor Follower
function initCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);
    
    let cursorVisible = false;
    let cursorEnlarged = false;
    let mouseTimeout;
    
    const moveCursor = (e) => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
        if (!cursorVisible) {
            cursor.style.opacity = '1';
            cursorVisible = true;
        }
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            cursor.style.opacity = '0';
            cursorVisible = false;
        }, 5000);
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    const enlargeCursor = () => {
        cursor.classList.add('enlarged');
        cursorEnlarged = true;
    };
    
    const resetCursor = () => {
        cursor.classList.remove('enlarged');
        cursorEnlarged = false;
    };
    
    document.querySelectorAll('a, button, .skill-list li, .project-links a, .swiper-button-next, .swiper-button-prev')
        .forEach(item => {
            item.addEventListener('mouseover', enlargeCursor);
            item.addEventListener('mouseout', resetCursor);
        });
    
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorVisible = false;
        }
    });
}

// Back to Top
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Debounce
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    const swiper = initSwiper();
    initParticles();
    initTerminalEffect();
    initContactForm();
    initThemeToggle();
    initLazyLoading();
    initScrollAnimations();
    initGlitchEffect();
    initParallaxScrolling();
    initSkillBars();
    initCounters();
    initCursorFollower();
    initBackToTop();
    document.body.classList.add('js-loaded');
});
