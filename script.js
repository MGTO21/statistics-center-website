// Theme Toggle Functionality
const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const navbar = document.querySelector('.navbar');
const backToTopBtn = document.getElementById('backToTop');
const menuToggle = document.getElementById('menu-toggle');
const progressBar = document.getElementById('progressBar');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark', currentTheme === 'dark');

// Update theme button icon
function updateThemeIcon() {
    const icon = themeBtn.querySelector('i');
    if (body.classList.contains('dark')) {
        icon.className = 'fas fa-sun';
        themeBtn.setAttribute('aria-pressed', 'true');
    } else {
        icon.className = 'fas fa-moon';
        themeBtn.setAttribute('aria-pressed', 'false');
    }
}

updateThemeIcon();

// Theme toggle event listener
themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    const newTheme = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active section highlight in nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function updateActiveNav() {
    let currentId = '';
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 200) {
            currentId = section.id;
        }
    });
    navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        const id = href.replace('#', '');
        if (id === currentId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Navbar background change on scroll with class toggle
function applyNavbarScrolledState() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', applyNavbarScrolledState);
window.addEventListener('load', applyNavbarScrolledState);

// Back to top button
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
        if (progressBar) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Accessible hamburger toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
    });
    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menuToggle.click();
        }
    });
}

// Prefetch service pages on hover for faster navigation
document.querySelectorAll('a[href^="services/"]').forEach(link => {
    link.addEventListener('mouseenter', () => {
        const url = link.getAttribute('href');
        if (url) fetch(url, { method: 'GET' }).catch(() => {});
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const service = this.querySelector('select').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'جاري الإرسال...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .consultation-item, .stat-card, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Force mobile viewport on mobile devices
function forceMobileViewport() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    
    if (isMobile || isSmallScreen) {
        // Force mobile viewport
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
        
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        // Force mobile layout
        document.body.style.fontSize = '14px';
        
        // Ensure all containers are full width
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            container.style.width = '100%';
            container.style.maxWidth = '100%';
            container.style.padding = '0 15px';
        });
        
        // Force hero content to be block
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.display = 'block';
            heroContent.style.width = '100%';
        }
        
        // Force services grid to be block
        const servicesGrids = document.querySelectorAll('.services-grid, .consultation-grid');
        servicesGrids.forEach(grid => {
            grid.style.display = 'block';
        });
        
        // Force service cards to be full width
        const serviceCards = document.querySelectorAll('.service-card, .consultation-item');
        serviceCards.forEach(card => {
            card.style.width = '100%';
            card.style.display = 'block';
            card.style.marginBottom = '20px';
        });
    }
}

// Run immediately and on load/resize
forceMobileViewport();
window.addEventListener('load', forceMobileViewport);
window.addEventListener('resize', forceMobileViewport);

// Add some interactive hover effects
document.querySelectorAll('.service-card, .consultation-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);