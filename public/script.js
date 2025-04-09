// Matrix Rain Effect - Enhanced with color variation and speed control
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Matrix canvas initialization
function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array of drops - one per column
    const drops = Array(Math.floor(columns)).fill(1);
    
    // Array of colors for varying the matrix effect
    const colors = [
        '#00ff41', // Default bright green
        '#00df38', // Slightly darker green
        '#00cf35', // Even darker
        '#00bf32', // More variation
        '#00ff41'  // Back to default
    ];

    function draw() {
        // Black overlay with transparency to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < drops.length; i++) {
            // Random character from the charset
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Varying colors for more depth
            const colorIndex = Math.floor(Math.random() * colors.length);
            ctx.fillStyle = colors[colorIndex];
            
            // Varying font sizes for more dynamic look
            const variableFontSize = fontSize - 2 + Math.random() * 4;
            ctx.font = `${variableFontSize}px monospace`;
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset drops after reaching bottom with randomization
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Increment the Y coordinate for the drop
            drops[i]++;
        }
    }
    
    // Control animation frame rate with requestAnimationFrame for better performance
    function animate() {
        draw();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize matrix on load
initMatrix();

// Recalculate matrix dimensions on resize
window.addEventListener('resize', debounce(() => {
    initMatrix();
}, 200));

// Particles background effect for hero section
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.querySelector('.hero').prepend(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Random size
        const size = 1 + Math.random() * 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = 5 + Math.random() * 10 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Swiper Initialization with improved options
function initSwiper() {
    return new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        effect: 'coverflow', // Add cool effect
        coverflowEffect: {
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: {
            enabled: true,
        },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        on: {
            init: function() {
                addMouseParallaxToSlides();
            }
        }
    });
}

// Add mouse parallax effect to project slides
function addMouseParallaxToSlides() {
    const slides = document.querySelectorAll('.swiper-slide');
    
    slides.forEach(slide => {
        slide.addEventListener('mousemove', e => {
            const { left, top, width, height } = slide.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            const img = slide.querySelector('.project-img');
            if (img) {
                img.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) scale3d(1.05, 1.05, 1.05)`;
            }
        });
        
        slide.addEventListener('mouseleave', () => {
            const img = slide.querySelector('.project-img');
            if (img) {
                img.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
            }
        });
    });
}

// Mobile Menu Toggle with animation
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu a');
    
    // Open menu with animation
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        
        // Animate menu items in sequence
        menuLinks.forEach((link, index) => {
            link.style.animation = `fadeInRight 0.3s forwards ${0.1 + index * 0.1}s`;
        });
    });
    
    // Close menu and reset animations
    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        menuLinks.forEach(link => {
            link.style.animation = '';
        });
    });
    
    // Close menu when clicking on links
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add active class to current nav item
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for header height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animated counting stats
function initCounters() {
    const statsContainer = document.createElement('div');
    statsContainer.className = 'stats-container';
    statsContainer.innerHTML = `
        <div class="stat-item">
            <span class="stat-count" data-target="15">0</span>
            <span class="stat-label">Projects</span>
        </div>
        <div class="stat-item">
            <span class="stat-count" data-target="8">0</span>
            <span class="stat-label">Technologies</span>
        </div>
        <div class="stat-item">
            <span class="stat-count" data-target="3">0</span>
            <span class="stat-label">Years Experience</span>
        </div>
    `;
    
    // Insert after about section
    const aboutSection = document.getElementById('about');
    aboutSection.parentNode.insertBefore(statsContainer, aboutSection.nextSibling);
    
    // Animate counters when they come into view
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-count');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const updateCounter = () => {
                        const increment = target / 50; // Speed of counting
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
    }, observerOptions);
    
    observer.observe(statsContainer);
}

// Interactive terminal effect with typing animation
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
                setTimeout(typeWriter, Math.random() * 20 + 10);
            }
        };
        
        // Start typing when element is in view
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

// Enhanced form handling with validation and animation
function initContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Add floating label effect
    inputs.forEach(input => {
        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        
        const label = input.previousElementSibling;
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(label);
        wrapper.appendChild(input);
        
        // Handle focus and blur for animation
        input.addEventListener('focus', () => {
            wrapper.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                wrapper.classList.remove('focused');
            }
        });
        
        // Check if input has value on load (for browser autofill)
        if (input.value !== '') {
            wrapper.classList.add('focused');
        }
    });
    
    // Enhanced form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
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
        
        // Show loading state
        const submitBtn = form.querySelector('.form-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        
        // Submit form data
        const formData = new FormData(form);
        
        try {
            // Simulated submit for demo (replace with actual fetch)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success response
            form.reset();
            inputs.forEach(input => {
                input.parentNode.classList.remove('focused');
            });
            showNotification('Message sent successfully!', 'success');
            
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Custom notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add icon based on type
    const icon = document.createElement('i');
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
    } else {
        icon.className = 'fas fa-info-circle';
    }
    
    notification.prepend(icon);
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Implement dark/light mode toggle
function initThemeToggle() {
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-adjust"></i>';
    toggleBtn.setAttribute('aria-label', 'Toggle light/dark mode');
    
    // Add to header
    document.querySelector('header .container').appendChild(toggleBtn);
    
    // Check for saved preference or system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                    (localStorage.getItem('darkMode') === null && prefersDarkMode);
    
    // Set initial mode
    if (!isDarkMode) {
        document.documentElement.classList.add('light-mode');
    }
    
    // Handle toggle click
    toggleBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
        document.documentElement.classList.toggle('light-mode');
        
        // Animate toggle
        toggleBtn.classList.add('spin');
        setTimeout(() => {
            toggleBtn.classList.remove('spin');
        }, 300);
    });
}

// Implement lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        console.log('Browser supports native lazy loading');
    } else {
        // Fallback for browsers that don't support native lazy loading
        const options = {
            rootMargin: '200px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, options);
        
        images.forEach(img => {
            const src = img.getAttribute('src');
            img.setAttribute('data-src', src);
            img.removeAttribute('src');
            observer.observe(img);
        });
    }
}

// Add scroll-triggered animations
function initScrollAnimations() {
    const animatableElements = document.querySelectorAll('.about-grid, .skills-grid, .timeline-item, .contact-grid, .section-title');
    
    const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    animatableElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Add glitch effect on hover
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        const originalText = element.textContent;
        
        element.addEventListener('mouseover', () => {
            element.classList.add('glitching');
            
            // Glitch animation with random characters
            let iterations = 0;
            const maxIterations = 10;
            const interval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations || Math.random() < 0.5) {
                            return char;
                        }
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

// Add parallax scrolling effect
function initParallaxScrolling() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        // Apply parallax to hero section
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
        
        // Apply inverted parallax to about image
        const aboutImage = document.querySelector('.about-image');
        if (aboutImage) {
            const aboutOffset = aboutImage.offsetTop;
            const distance = scrollPosition - aboutOffset;
            if (distance > -500 && distance < 500) {
                aboutImage.style.transform = `translateY(${distance * -0.05}px)`;
            }
        }
    });
}

// Add skill bars with animation
function initSkillBars() {
    // Convert skill lists to skill bars
    const skillLists = document.querySelectorAll('.skill-list');
    
    skillLists.forEach(list => {
        const items = list.querySelectorAll('li');
        const skillBars = document.createElement('div');
        skillBars.className = 'skill-bars';
        
        items.forEach(item => {
            // Random proficiency between 75% and 95%
            const proficiency = 75 + Math.floor(Math.random() * 20);
            
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
        
        // Replace list with bars
        list.parentNode.replaceChild(skillBars, list);
    });
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-percentage');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                // Animate width
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Add a dynamic cursor follower
function initCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);
    
    let cursorVisible = false;
    let cursorEnlarged = false;
    
    // Hide cursor when inactive
    let mouseTimeout;
    
    const moveCursor = (e) => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
        
        // Show cursor
        if (!cursorVisible) {
            cursor.style.opacity = '1';
            cursorVisible = true;
        }
        
        // Reset timeout
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            cursor.style.opacity = '0';
            cursorVisible = false;
        }, 5000);
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    // Enlarge cursor over links and buttons
    const enlargeCursor = () => {
        cursor.classList.add('enlarged');
        cursorEnlarged = true;
    };
    
    const resetCursor = () => {
        cursor.classList.remove('enlarged');
        cursorEnlarged = false;
    };
    
    // Add hover effect to all clickable elements
    document.querySelectorAll('a, button, .skill-list li, .project-links a, .swiper-button-next, .swiper-button-prev')
        .forEach(item => {
            item.addEventListener('mouseover', enlargeCursor);
            item.addEventListener('mouseout', resetCursor);
        });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorVisible = false;
        }
    });
}

// Utility: Debounce function for resize events
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

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize base functionality
    initMobileMenu();
    initSmoothScroll();
    const swiper = initSwiper();
    initParticles();
    
    // Initialize enhanced features
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
    
    // Add CSS class to body when JS is loaded
    document.body.classList.add('js-loaded');
});
