
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const nav = document.getElementById('nav');
        
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
        
        // FAQ Accordion
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
        
        // Back to Top Button
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
      // Activa animaciones solo cuando los elementos entran en pantalla (scroll)
// Agrega la clase "active" a .store-path para animar el dash
// Y elimina estilos iniciales de opacidad/translate para fadeInUp

document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll('.faq-container, .faq-item, .features-animation, .feature-card, .animation-container');
  const storePaths = document.querySelectorAll('.store-path');

  const options = {
    threshold: 0.2,
  };

  const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.animationPlayState = 'running';
      appearOnScroll.unobserve(entry.target);
    });
  }, options);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Animar SVG dash cuando está visible
  const dashObserver = new IntersectionObserver((entries, dashObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        dashObserver.unobserve(entry.target);
      }
    });
  }, options);

  storePaths.forEach(path => {
    dashObserver.observe(path);
  });
});

