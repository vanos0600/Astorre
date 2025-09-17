// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeCookieBanner();
    initializeNavigation();
    initializeScrollAnimations();
    initializeContactForm();
    initializeSmoothScrolling();
}

// Cookie Banner Functionality
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    const manageBtn = document.getElementById('managePreferences');
    
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('astorre-cookie-consent');
    
    if (cookieConsent) {
        hideCookieBanner();
    } else {
        showCookieBanner();
    }
    
    // Event listeners
    acceptBtn?.addEventListener('click', function() {
        handleCookieConsent(true);
    });
    
    manageBtn?.addEventListener('click', function() {
        handleCookieConsent(false);
    });
}

function handleCookieConsent(accepted) {
    const consent = accepted ? 'accepted' : 'declined';
    localStorage.setItem('astorre-cookie-consent', consent);
    hideCookieBanner();
    
    // You can add analytics or other tracking code here based on consent
    if (accepted) {
        console.log('Cookies accepted - you can initialize tracking here');
    }
}

function showCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
        cookieBanner?.classList?.remove('hidden');
        // Add slide-up animation
        setTimeout(() => {
            cookieBanner.style.transform = 'translateY(0)';
        }, 100);
    }
}

function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
        cookieBanner.style.transform = 'translateY(100%)';
        setTimeout(() => {
            cookieBanner?.classList?.add('hidden');
        }, 300);
    }
}

// Navigation Functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const logoBtn = document.getElementById('logoBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let isMenuOpen = false;
    
    // Mobile menu toggle
    mobileMenuBtn?.addEventListener('click', function() {
        toggleMobileMenu();
    });
    
    // Logo click - scroll to top
    logoBtn?.addEventListener('click', function() {
        scrollToTop();
    });
    
    // Navigation links smooth scrolling
    navLinks?.forEach(link => {
        link?.addEventListener('click', function(e) {
            e?.preventDefault();
            const targetId = this.getAttribute('href')?.substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu if open
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navMenu?.contains(e?.target) && !mobileMenuBtn?.contains(e?.target)) {
            toggleMobileMenu();
        }
    });
    
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        const icon = mobileMenuBtn?.querySelector('i');
        
        if (isMenuOpen) {
            navMenu?.style?.setProperty('display', 'flex');
            navMenu?.style?.setProperty('flex-direction', 'column');
            navMenu?.style?.setProperty('position', 'absolute');
            navMenu?.style?.setProperty('top', '100%');
            navMenu?.style?.setProperty('left', '0');
            navMenu?.style?.setProperty('right', '0');
            navMenu?.style?.setProperty('background', 'white');
            navMenu?.style?.setProperty('border-top', '1px solid var(--color-border)');
            navMenu?.style?.setProperty('padding', '1rem');
            navMenu?.style?.setProperty('gap', '1rem');
            navMenu?.style?.setProperty('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)');
            
            if (icon) {
                icon.className = 'fas fa-times';
            }
        } else {
            navMenu?.style?.setProperty('display', 'none');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    }
    
    // Handle navbar on scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement?.scrollTop;
        
        // Add shadow on scroll
        if (scrollTop > 10) {
            navbar?.classList?.add('scrolled');
        } else {
            navbar?.classList?.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth Scrolling Functions
function initializeSmoothScrolling() {
    // Smooth scroll behavior for all anchor links
    document.querySelectorAll('a[href^="#"]')?.forEach(anchor => {
        anchor?.addEventListener('click', function(e) {
            e?.preventDefault();
            const targetId = this.getAttribute('href')?.substring(1);
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element?.offsetTop - 80; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll')?.forEach(el => {
        observer?.observe(el);
    });
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    contactForm?.addEventListener('submit', function(e) {
        e?.preventDefault();
        handleFormSubmit();
    });
    
    // Real-time validation
    const formInputs = contactForm?.querySelectorAll('input, select');
    formInputs?.forEach(input => {
        input?.addEventListener('blur', function() {
            validateField(this);
        });
        
        input?.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function handleFormSubmit() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData?.entries());
    
    // Validate all fields
    let isValid = validateForm();
    
    if (isValid) {
        // Simulate form submission
        showLoadingState();
        
        setTimeout(() => {
            hideLoadingState();
            showSuccessMessage();
            resetForm();
        }, 1500);
        
        console.log('Form submitted:', data);
    }
}

function validateForm() {
    const requiredFields = ['name', 'email', 'purpose'];
    let isValid = true;
    
    requiredFields?.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field?.value?.trim();
    const fieldName = field?.name;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (!value && field?.hasAttribute('required')) {
        errorMessage = `${fieldName?.charAt(0)?.toUpperCase() + fieldName?.slice(1)} is required`;
        isValid = false;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex?.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    // Show/hide error
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
        errorElement.textContent = errorMessage;
        field.style.borderColor = isValid ? '' : 'var(--color-error)';
    }
    
    return isValid;
}

function clearFieldError(field) {
    const fieldName = field?.name;
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement && field?.value?.trim()) {
        errorElement.textContent = '';
        field.style.borderColor = '';
    }
}

function showLoadingState() {
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }
}

function hideLoadingState() {
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Get in touch';
    }
}

function showSuccessMessage() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm && successMessage) {
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Add animation class
        successMessage?.classList?.add('animate-on-scroll', 'visible');
        
        // Reset after 5 seconds
        setTimeout(() => {
            hideSuccessMessage();
        }, 5000);
    }
}

function hideSuccessMessage() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm && successMessage) {
        successMessage.style.display = 'none';
        contactForm.style.display = 'block';
    }
}

function resetForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form?.reset();
        
        // Clear all error messages
        const errorMessages = form?.querySelectorAll('.error-message');
        errorMessages?.forEach(error => {
            error.textContent = '';
        });
        
        // Reset field styles
        const fields = form?.querySelectorAll('input, select');
        fields?.forEach(field => {
            field.style.borderColor = '';
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some enhanced interactions
function addEnhancedInteractions() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.pillar-card, .audience-card, .step');
    cards?.forEach(card => {
        card?.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card?.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons?.forEach(button => {
        button?.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Initialize enhanced interactions after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addEnhancedInteractions, 1000);
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
        const navMenu = document.getElementById('navMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const icon = mobileMenuBtn?.querySelector('i');
        
        if (navMenu) {
            navMenu.style.display = '';
            navMenu?.style?.removeProperty('flex-direction');
            navMenu?.style?.removeProperty('position');
            navMenu?.style?.removeProperty('top');
            navMenu?.style?.removeProperty('left');
            navMenu?.style?.removeProperty('right');
            navMenu?.style?.removeProperty('background');
            navMenu?.style?.removeProperty('border-top');
            navMenu?.style?.removeProperty('padding');
            navMenu?.style?.removeProperty('gap');
            navMenu?.style?.removeProperty('box-shadow');
        }
        
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    }
}, 250));

// Add some performance optimizations
function optimizePerformance() {
    // Lazy load images if any are added later
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images?.forEach(img => imageObserver?.observe(img));
    
    // Preload critical resources
    const criticalLinks = document.querySelectorAll('link[rel="preload"]');
    criticalLinks?.forEach(link => {
        const resource = document.createElement('link');
        resource.rel = 'preload';
        resource.href = link?.href;
        resource.as = link?.dataset?.as || 'style';
        document.head?.appendChild(resource);
    });
}

// Call performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Export functions for global access
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e?.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (navMenu && navMenu?.style?.display === 'flex') {
            const icon = mobileMenuBtn?.querySelector('i');
            navMenu.style.display = 'none';
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    }
});

// Add focus management for accessibility
function manageFocus() {
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabIndex="-1"])'
    );
    
    focusableElements?.forEach(element => {
        element?.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });
        
        element?.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', manageFocus);

// Console welcome message
console.log('🚀 Astorre website loaded successfully!');
console.log('Built with vanilla HTML, CSS, and JavaScript');
console.log('Contact: m.shulga@astorre.tech');