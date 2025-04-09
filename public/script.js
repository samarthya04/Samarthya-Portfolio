/**
 * Enhanced Matrix Theme JavaScript
 * Advanced matrix rain effect with performance optimizations and interactive elements
 */

// Matrix Rain Effect with improved performance
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Matrix canvas initialization with performance optimizations
function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Enhanced character set for more variety
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbols = '∫∬∭∮∯∰≈≡≠√∛∜∝∞≪≫';
    
    const chars = katakana + latin + nums + symbols;
    
    const fontSize = 18;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const speed = Array(columns).fill().map(() => Math.random() * 1.5 + 0.5); // Variable speed for each column
    
    // Use a variety of green shades for more depth
    const colors = [
        '#00FF41', // bright green
        '#00DF38', // slightly dimmer
        '#00CF35', // dimmer
        '#00BF32', // even dimmer
        '#00AF2F', // darker green
        '#A4FFC9'  // light accent green
    ];
    
    // Use requestAnimationFrame for smoother animation with throttling
    let lastTime = 0;
    const fps = 30; // Target 30 FPS for better performance
    const fpsInterval = 1000 / fps;
    
    function draw(currentTime) {
        // Throttle frame rate for performance
        if (currentTime - lastTime < fpsInterval) {
            requestAnimationFrame(draw);
            return;
        }
        lastTime = currentTime;
        
        // Black overlay with transparency to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Vary colors with a bias toward brighter greens for foreground characters
            const colorIndex = Math.floor(Math.random() * colors.length);
            const alpha = drops[i] < 5 ? '0.9' : '0.7'; // Fade effect for characters
            ctx.fillStyle = colors[colorIndex] + alpha;
            
            // Dynamic font size based on position (smaller as they fall)
            const dynamicSize = fontSize - (Math.random() * 4);
            ctx.font = `${dynamicSize}px monospace`;
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset drops with a slight randomization of restart positions
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Increment Y position based on variable speed
            drops[i] += speed[i];
        }
        
        requestAnimationFrame(draw);
    }
    
    // Start the animation
    requestAnimationFrame(draw);
}

// Initialize matrix on load
window.addEventListener('load', initMatrix);

// Recalculate matrix dimensions on resize with debounce
window.addEventListener('resize', debounce(() => {
    initMatrix();
}, 200));

// Theme toggle with animations
function initThemeToggle() {
    const toggleBtn = document.querySelector('.theme-toggle');
    
    if (!toggleBtn) return;
    
    // Check for saved preference or system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                    (localStorage.getItem('darkMode') === null && prefersDarkMode);
    
    // Set initial mode
    if (!isDarkMode) {
        document.documentElement.classList.add('light-mode');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Handle toggle click
    toggleBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
        document.documentElement.classList.toggle('light-mode');
        
        // Animate toggle
        toggleBtn.classList.add('spin');
        
        // Update icon
        if (isDarkMode) {
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        setTimeout(() => {
            toggleBtn.classList.remove('spin');
        }, 600);
        
        // Additional animation for the entire page
        document.body.style.transition = "background-color 0.6s ease";
    });
}

// Mobile menu handling with improved animations
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu a');
    
    if (!menuBtn || !mobileMenu) return;
    
    // Open menu with staggered animations
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Animate menu items sequentially
        menuLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(50px)';
            setTimeout(() => {
                link.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, 100 + index * 80);
        });
    });
    
    // Close menu and reset animations
    function closeMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        menuLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(50px)';
        });
    }
    
    closeBtn.addEventListener('click', closeMenu);
    
    // Close menu when clicking links
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            e.target !== menuBtn) {
            closeMenu();
        }
    });
}

// Smooth scrolling with active state tracking
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Update active nav state
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Calculate header height dynamically
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Smooth scroll with offset
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active state on scroll
    window.addEventListener('scroll', debounce(() => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100));
}

// Header scroll effects
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Typed text animation for hero section
function initTypedEffect() {
    const textElement = document.querySelector('.typewriter');
    
    if (!textElement) return;
    
    const text = textElement.textContent;
    textElement.textContent = '';
    textElement.style.display = 'inline-block';
    
    let index = 0;
    function typeText() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, Math.random() * 60 + 40); // Random typing speed for realism
        } else {
            // Add blinking cursor at the end
            const cursor = document.createElement('span');
            cursor.className = 'terminal-cursor';
            textElement.appendChild(cursor);
        }
    }
    
    // Start typing after a brief delay
    setTimeout(typeText, 800);
}

// Copy code functionality for code blocks
function initCodeCopy() {
    document.querySelectorAll('.code-block').forEach(block => {
        // Add copy button if not exists
        if (!block.querySelector('.copy-btn')) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<i class="fas fa-clipboard"></i> Copy';
            block.appendChild(copyBtn);
            
            copyBtn.addEventListener('click', () => {
                const codeContent = block.querySelector('.code-block-content').innerText;
                
                // Use clipboard API
                navigator.clipboard.writeText(codeContent)
                    .then(() => {
                        // Show success state
                        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                        copyBtn.classList.add('copied');
                        
                        // Reset after 2 seconds
                        setTimeout(() => {
                            copyBtn.innerHTML = '<i class="fas fa-clipboard"></i> Copy';
                            copyBtn.classList.remove('copied');
                        }, 2000);
                    })
                    .catch(() => {
                        copyBtn.textContent = 'Failed';
                    });
            });
        }
    });
}

// Animation on scroll with observer
function initScrollAnimations() {
    const elements = document.querySelectorAll('.card, .section-title, .skill-bar, .timeline-item');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Add parallax effects
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        // Parallax for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = `${scrollY * 0.5}px`;
        }
        
        // Counter parallax for certain elements
        document.querySelectorAll('.parallax-reverse').forEach(element => {
            element.style.transform = `translateY(-${scrollY * 0.05}px)`;
        });
        
        // Regular parallax for other elements
        document.querySelectorAll('.parallax').forEach(element => {
            element.style.transform = `translateY(${scrollY * 0.05}px)`;
        });
    });
}

// Glitch text effect for headings
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        const originalText = element.textContent;
        
        element.addEventListener('mouseover', () => {
            let iterations = 0;
            
            const interval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations || Math.random() > 0.3) {
                            return char;
                        }
                        return ['0', '1', '#', '%', '&', ':', ';', '>', '<'][Math.floor(Math.random() * 8)];
                    })
                    .join('');
                
                iterations += 1/3;
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    element.textContent = originalText;
                }
            }, 30);
        });
    });
}

// Custom cursor follower
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        
        // Dot follows with delay for trailing effect
        dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });
    
    // Scale effect on clickable elements
    document.querySelectorAll('a, button, .card, input, textarea')
        .forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-active');
                dot.classList.add('dot-active');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-active');
                dot.classList.remove('dot-active');
            });
        });
}

// Matrix banner text effect for the scroll banner
function initScrollingBanner() {
    const banner = document.querySelector('.scroll-banner');
    
    if (!banner) return;
    
    const text = banner.textContent;
    const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    let iterations = 0;
    const maxIterations = 3;
    
    const interval = setInterval(() => {
        banner.textContent = text
            .split('')
            .map((char, index) => {
                if (char === ' ') return ' ';
                if (index < iterations || Math.random() > 0.3) {
                    return char;
                }
                return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('');
        
        iterations += 0.3;
        
        if (iterations >= text.length) {
            clearInterval(interval);
        }
    }, 50);
}

// Audio effects for the Matrix theme
function initMatrixAudio() {
    // Create audio controls if they don't exist
    if (!document.querySelector('.audio-controls')) {
        const audioControls = document.createElement('div');
        audioControls.className = 'audio-controls';
        
        // Background ambience toggle
        const ambienceBtn = document.createElement('button');
        ambienceBtn.className = 'audio-btn';
        ambienceBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        ambienceBtn.setAttribute('title', 'Toggle ambient sound');
        
        // Typing sound toggle
        const typingBtn = document.createElement('button');
        typingBtn.className = 'audio-btn';
        typingBtn.innerHTML = '<i class="fas fa-keyboard"></i>';
        typingBtn.setAttribute('title', 'Toggle typing sounds');
        
        audioControls.appendChild(ambienceBtn);
        audioControls.appendChild(typingBtn);
        
        document.body.appendChild(audioControls);
        
        // Create audio elements
        const ambienceAudio = new Audio('https://assets.codepen.io/123456/matrix-ambience.mp3');
        ambienceAudio.loop = true;
        ambienceAudio.volume = 0.2;
        
        const typingAudio = new Audio('https://assets.codepen.io/123456/keyboard-typing.mp3');
        typingAudio.volume = 0.3;
        
        // Toggle ambience
        ambienceBtn.addEventListener('click', () => {
            if (ambienceAudio.paused) {
                ambienceAudio.play().catch(() => {
                    console.log('Audio play prevented by browser policy');
                });
                ambienceBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                ambienceBtn.classList.add('active');
            } else {
                ambienceAudio.pause();
                ambienceBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                ambienceBtn.classList.remove('active');
            }
        });
        
        // Add typing sounds to inputs
        document.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('keydown', () => {
                if (!typingBtn.classList.contains('active')) return;
                
                // Clone to allow overlapping sounds
                const typingSound = typingAudio.cloneNode();
                typingSound.currentTime = Math.random() * 0.2;
                typingSound.play().catch(() => {});
            });
        });
        
        // Toggle typing sounds
        typingBtn.addEventListener('click', () => {
            typingBtn.classList.toggle('active');
        });
    }
}

// Add interactive 3D card effect
function init3DCards() {
    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left; 
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
}

// Add responsive navigation
function initResponsiveNav() {
    // Check if on mobile and add an overlay
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-overlay';
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => {
                document.querySelector('.mobile-menu').classList.remove('active');
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 300);
                document.body.style.overflow = '';
            });
            
            // Show overlay when menu opens
            document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
                overlay.style.display = 'block';
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
            });
        }
    }
}

// Utility functions
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initThemeToggle();
    
    // Visual enhancements
    initScrollAnimations();
    initParallax();
    initTypedEffect();
    initGlitchEffect();
    init3DCards();
    initCodeCopy();
    initCustomCursor();
    initScrollingBanner();
    
    // Advanced features
    initMatrixAudio();
    initResponsiveNav();
    
    // Add a "loaded" class to the body for potential animation triggers
    document.body.classList.add('js-loaded');
    
    // Log to console with Matrix style
    console.log("%c✧ Matrix Theme Initialized ✧", "color: #00FF41; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(0,255,65,0.7);");
});
