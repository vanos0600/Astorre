// Cookie Banner Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    const manageCookies = document.getElementById('manageCookies');

    // Check if user has already made a choice
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted) {
        // Show banner if no choice has been made
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 1000);
    }

    // Accept Cookies
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
        // Here you would also set actual cookies
        console.log('Cookies accepted');
    });

    // Manage Cookies (basic implementation)
    manageCookies.addEventListener('click', function() {
        // For now, just hide the banner
        localStorage.setItem('cookiesAccepted', 'false');
        cookieBanner.style.display = 'none';
        console.log('Cookie preferences managed');
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Toggle menu icon
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('#nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
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
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const purpose = document.getElementById('purpose').value;
            
            if (!name || !email || !purpose) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, purpose });
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});

// Animation on scroll (basic implementation)
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.step, .pillar-card, .audience-card');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.step, .pillar-card, .audience-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 500);
});

/* Archivo: script.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener los elementos relevantes del DOM
    const nav = document.getElementById('nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn'); // Asume que este es el botón de la hamburguesa

    // 2. Comprobar si los elementos existen para evitar errores
    if (nav && mobileMenuBtn) {
        // 3. Añadir el event listener para el click en el botón
        mobileMenuBtn.addEventListener('click', () => {
           nav.classList.toggle('active');

        });

        //  Cerrar el menu si se hace clic en un enlace (para single-page applications)
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Solo si el menú está activo, lo cierra
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            });
        });
    } else {
        console.error('El elemento #nav o .mobile-menu-btn no se encontró en el DOM.');
    }
});