// ===== ALIBABA SANS ARNAQUE CI - JAVASCRIPT =====
// Version 2.0 — Enhanced UX, Mobile-First, Accessible

// --- Navbar Scroll Effect ---
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// --- Mobile Menu ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMobileMenu() {
  mobileMenu.classList.add('active');
  mobileOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  mobileMenuBtn.setAttribute('aria-expanded', 'true');
  // Focus the close button for accessibility
  setTimeout(() => mobileMenuClose.focus(), 300);
}

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu-links a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
    if (modalOverlayEl && modalOverlayEl.classList.contains('active')) {
      closeInscriptionModal();
    }
  }
});

// --- Inscription Modal ---
const modalOverlayEl = document.getElementById('modalOverlay');
const inscriptionModal = document.getElementById('inscriptionModal');
const modalCloseBtn = document.getElementById('modalClose');

function isNearFormSection() {
  const formSection = document.getElementById('inscription');
  if (!formSection) return false;
  const rect = formSection.getBoundingClientRect();
  // Consider "near" if the form section top is within 200px below the viewport bottom
  // or already visible
  return rect.top < window.innerHeight + 200;
}

function openInscriptionModal() {
  if (!modalOverlayEl) return;
  modalOverlayEl.classList.add('active');
  modalOverlayEl.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  // Focus first input after animation
  setTimeout(() => {
    const firstInput = document.getElementById('modal-nom');
    if (firstInput) firstInput.focus();
  }, 400);
}

function closeInscriptionModal() {
  if (!modalOverlayEl) return;
  modalOverlayEl.classList.remove('active');
  modalOverlayEl.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Close modal on overlay click (not on modal itself)
if (modalOverlayEl) {
  modalOverlayEl.addEventListener('click', (e) => {
    if (e.target === modalOverlayEl) {
      closeInscriptionModal();
    }
  });
}

// Close modal on close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeInscriptionModal);
}

// --- Hero Particles (reduced on mobile for performance) ---
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 8 : 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 6 + 3;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;
    const opacity = Math.random() * 0.5 + 0.1;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.opacity = opacity;

    container.appendChild(particle);
  }
}

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  createParticles();
}

// --- Scroll Progress Bar ---
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = `${Math.min(scrollPercent, 100)}%`;
  }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// --- Back to Top Button ---
const backToTop = document.getElementById('backToTop');

function updateBackToTop() {
  if (window.scrollY > 600) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

window.addEventListener('scroll', updateBackToTop, { passive: true });

// --- Scroll Reveal Animation (with IntersectionObserver for performance) ---
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('active');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach((el, index) => {
      // Add stagger delay to sibling elements
      const parent = el.parentElement;
      const siblings = parent ? Array.from(parent.children).filter(c => 
        c.classList.contains('reveal') || 
        c.classList.contains('reveal-left') || 
        c.classList.contains('reveal-right') ||
        c.classList.contains('reveal-scale')
      ) : [];
      const siblingIndex = siblings.indexOf(el);
      if (siblingIndex > 0) {
        el.dataset.delay = siblingIndex * 100;
      }
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    reveals.forEach(el => el.classList.add('active'));
  }
}

initScrollReveal();

// --- FAQ Toggle with Keyboard Support ---
function toggleFaq(id) {
  const item = document.getElementById(id);
  const isActive = item.classList.contains('active');
  const question = item.querySelector('.faq-question');

  // Close all items
  document.querySelectorAll('.faq-item').forEach(faqItem => {
    faqItem.classList.remove('active');
    const answer = faqItem.querySelector('.faq-answer');
    answer.style.maxHeight = null;
    const q = faqItem.querySelector('.faq-question');
    if (q) q.setAttribute('aria-expanded', 'false');
  });

  // Open clicked item if it was closed
  if (!isActive) {
    item.classList.add('active');
    const answer = item.querySelector('.faq-answer');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    if (question) question.setAttribute('aria-expanded', 'true');
  }
}

// Keyboard support for FAQ
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const faqItem = question.closest('.faq-item');
      if (faqItem) toggleFaq(faqItem.id);
    }
  });
});

// --- Counter Animation ---
function animateCounter(element, target, suffix = '') {
  if (prefersReducedMotion) {
    // Skip animation, just show final value
    if (target >= 1000) {
      element.textContent = target.toLocaleString('fr-FR') + suffix;
    } else {
      element.textContent = target + suffix;
    }
    return;
  }

  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    if (target >= 1000) {
      element.textContent = Math.floor(current).toLocaleString('fr-FR') + suffix;
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

// Observe stats for animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;

      if (el.id === 'statStudents') {
        animateCounter(el, 500, '+');
      } else if (el.id === 'statDeliveries') {
        animateCounter(el, 1200, '+');
      } else if (el.id === 'statSatisfaction') {
        animateCounter(el, 98, '%');
      }

      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stat-number').forEach(stat => {
  statsObserver.observe(stat);
});

// --- Form Step Indicator ---
function updateFormSteps() {
  const nom = document.getElementById('nom');
  const prenom = document.getElementById('prenom');
  const whatsapp = document.getElementById('whatsapp');
  const ville = document.getElementById('ville');
  const offre = document.getElementById('offre');

  const steps = document.querySelectorAll('.form-step-dot');
  const lines = document.querySelectorAll('.form-step-line');

  if (!steps.length) return;

  // Step 1: Name fields
  const step1Complete = nom.value.trim() !== '' && prenom.value.trim() !== '';
  // Step 2: Contact info
  const step2Complete = whatsapp.value.trim() !== '';
  // Step 3: Choices
  const step3Complete = ville.value !== '' && offre.value !== '';

  // Update step 1
  if (step1Complete) {
    steps[0].classList.add('completed');
    steps[0].classList.remove('active');
    steps[0].textContent = '✓';
    if (lines[0]) lines[0].classList.add('completed');
    steps[1].classList.add('active');
  } else {
    steps[0].classList.remove('completed');
    steps[0].classList.add('active');
    steps[0].textContent = '1';
    if (lines[0]) lines[0].classList.remove('completed');
    steps[1].classList.remove('active');
  }

  // Update step 2
  if (step2Complete && step1Complete) {
    steps[1].classList.add('completed');
    steps[1].classList.remove('active');
    steps[1].textContent = '✓';
    if (lines[1]) lines[1].classList.add('completed');
    steps[2].classList.add('active');
  } else if (!step1Complete) {
    steps[1].classList.remove('completed', 'active');
    steps[1].textContent = '2';
    if (lines[1]) lines[1].classList.remove('completed');
    steps[2].classList.remove('active');
  } else {
    steps[1].classList.remove('completed');
    steps[1].textContent = '2';
    if (lines[1]) lines[1].classList.remove('completed');
    steps[2].classList.remove('active');
  }

  // Update step 3
  if (step3Complete && step2Complete && step1Complete) {
    steps[2].classList.add('completed');
    steps[2].classList.remove('active');
    steps[2].textContent = '✓';
  } else if (!step2Complete || !step1Complete) {
    steps[2].classList.remove('completed', 'active');
    steps[2].textContent = '3';
  } else {
    steps[2].classList.remove('completed');
    steps[2].textContent = '3';
  }
}

// Attach form step listeners
['nom', 'prenom', 'whatsapp', 'ville', 'offre'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', updateFormSteps);
    el.addEventListener('change', updateFormSteps);
  }
});

// --- Form Submission → WhatsApp Redirect ---
const form = document.getElementById('inscriptionForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const prenom = document.getElementById('prenom').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const ville = document.getElementById('ville').value;
  const offre = document.getElementById('offre').value;

  // Validate
  if (!nom || !prenom || !whatsapp || !ville || !offre) {
    // Show friendly validation
    showFormError('Merci de remplir tous les champs pour continuer 🙏');
    return;
  }

  // Build WhatsApp message
  const message = `Bonjour ! 👋

Je souhaite m'inscrire à *Alibaba Sans Arnaque CI*.

📋 *Mes informations :*
• Nom : ${nom}
• Prénom : ${prenom}
• WhatsApp : ${whatsapp}
• Ville : ${ville}
• Offre choisie : ${offre}

Merci de confirmer mon inscription ! 🙏`;

  const encodedMessage = encodeURIComponent(message);

  // Change the phone number below to your actual WhatsApp number
  const phoneNumber = '2250701799598';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Button feedback
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.innerHTML = '✅ Redirection vers WhatsApp...';
  submitBtn.style.opacity = '0.8';
  submitBtn.disabled = true;

  // Success haptic feedback (if available)
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }

  // Redirect after small delay
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');

    // Reset form after redirect
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = '✅ Valider mon inscription';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
      updateFormSteps();
    }, 2000);
  }, 800);
});

// Friendly form error message
function showFormError(message, targetForm) {
  // Check if error already exists
  let existingError = document.querySelector('.form-error-message');
  if (existingError) existingError.remove();

  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error-message';
  errorDiv.style.cssText = `
    background: #FEF2F2;
    border: 1px solid #FECACA;
    color: #991B1B;
    padding: 14px 18px;
    border-radius: 12px;
    margin-bottom: 20px;
    font-size: 0.95rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: fadeInUp 0.3s ease;
  `;
  errorDiv.innerHTML = `<span>⚠️</span> ${message}`;

  const formEl = targetForm || document.getElementById('inscriptionForm');
  formEl.insertBefore(errorDiv, formEl.firstChild);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    errorDiv.style.opacity = '0';
    errorDiv.style.transform = 'translateY(-10px)';
    errorDiv.style.transition = 'all 0.3s ease';
    setTimeout(() => errorDiv.remove(), 300);
  }, 4000);

  // Haptic feedback
  if (navigator.vibrate) {
    navigator.vibrate([50, 50, 50]);
  }
}

// --- Smooth Scroll for anchor links (with modal intercept for #inscription) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    e.preventDefault();

    // Close mobile menu if open
    if (mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }

    // Intercept #inscription links — show modal if not near the form section
    if (targetId === '#inscription' && !isNearFormSection()) {
      openInscriptionModal();
      return;
    }

    const target = document.querySelector(targetId);
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 10;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// --- Active Nav Link Highlight ---
function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 200;

  // Desktop nav
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    const link = document.querySelector(`.navbar-links a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        link.style.color = '#F97316';
      } else {
        link.style.color = '';
      }
    }
  });

  // Mobile bottom nav
  const bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .nav-item:not(.cta-item)');
  bottomNavItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetSection = document.querySelector(href);
      if (targetSection) {
        const top = targetSection.offsetTop;
        const height = targetSection.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      }
    }
  });
}

window.addEventListener('scroll', highlightActiveSection, { passive: true });

// --- Testimonials Carousel (Mobile) ---
function initTestimonialsCarousel() {
  const grid = document.getElementById('testimonialsGrid');
  const dots = document.querySelectorAll('.carousel-dot');
  
  if (!grid || !dots.length) return;

  // Track active dot on scroll
  let scrollTimeout;
  grid.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollLeft = grid.scrollLeft;
      const cardWidth = grid.querySelector('.testimonial-card')?.offsetWidth || 300;
      const gap = 16;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }, 50);
  }, { passive: true });

  // Click dots to scroll
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const cards = grid.querySelectorAll('.testimonial-card');
      if (cards[i]) {
        cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  });
}

initTestimonialsCarousel();

// --- Ripple Effect on Buttons ---
function initRippleEffect() {
  document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

initRippleEffect();

// --- Performance: Throttled scroll handler ---
let ticking = false;

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollProgress();
      updateBackToTop();
      highlightActiveSection();
      ticking = false;
    });
    ticking = true;
  }
}

// Replace individual scroll listeners with single throttled one
window.removeEventListener('scroll', updateScrollProgress);
window.removeEventListener('scroll', updateBackToTop);
window.removeEventListener('scroll', highlightActiveSection);
window.addEventListener('scroll', onScroll, { passive: true });

// --- Mobile: Handle viewport height changes (keyboard open/close) ---
function handleViewportResize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', handleViewportResize);
handleViewportResize();

// --- Touch: Prevent double-tap zoom on buttons ---
document.querySelectorAll('.btn, .faq-question, .mobile-bottom-nav .nav-item').forEach(el => {
  el.addEventListener('touchend', (e) => {
    // Allow default behavior, just prevent double-tap zoom
  }, { passive: true });
});

// --- Lazy load images with IntersectionObserver ---
function initLazyLoad() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    images.forEach(img => imageObserver.observe(img));
  }
}

initLazyLoad();

// --- Service Worker Registration (for offline support) ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Only register if service worker file exists
    // navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// --- Modal Form Submission → WhatsApp Redirect ---
const modalForm = document.getElementById('modalInscriptionForm');

if (modalForm) {
  modalForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nom = document.getElementById('modal-nom').value.trim();
    const prenom = document.getElementById('modal-prenom').value.trim();
    const whatsapp = document.getElementById('modal-whatsapp').value.trim();
    const ville = document.getElementById('modal-ville').value;
    const offre = document.getElementById('modal-offre').value;

    // Validate
    if (!nom || !prenom || !whatsapp || !ville || !offre) {
      showFormError('Merci de remplir tous les champs pour continuer 🙏', modalForm);
      return;
    }

    // Build WhatsApp message
    const message = `Bonjour ! 👋\n\nJe souhaite m'inscrire à *Alibaba Sans Arnaque CI*.\n\n📋 *Mes informations :*\n• Nom : ${nom}\n• Prénom : ${prenom}\n• WhatsApp : ${whatsapp}\n• Ville : ${ville}\n• Offre choisie : ${offre}\n\nMerci de confirmer mon inscription ! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '2250701799598';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Button feedback
    const submitBtn = document.getElementById('modalSubmitBtn');
    submitBtn.innerHTML = '✅ Redirection vers WhatsApp...';
    submitBtn.style.opacity = '0.8';
    submitBtn.disabled = true;

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    // Redirect after small delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');

      // Close modal and reset form
      setTimeout(() => {
        closeInscriptionModal();
        modalForm.reset();
        submitBtn.innerHTML = '✅ Valider mon inscription';
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
        updateModalFormSteps();
      }, 1500);
    }, 800);
  });
}

// --- Modal Form Step Indicator ---
function updateModalFormSteps() {
  const nom = document.getElementById('modal-nom');
  const prenom = document.getElementById('modal-prenom');
  const whatsapp = document.getElementById('modal-whatsapp');
  const ville = document.getElementById('modal-ville');
  const offre = document.getElementById('modal-offre');

  const container = document.getElementById('modalFormSteps');
  if (!container) return;

  const steps = container.querySelectorAll('.form-step-dot');
  const lines = container.querySelectorAll('.form-step-line');

  if (!steps.length) return;

  const step1Complete = nom.value.trim() !== '' && prenom.value.trim() !== '';
  const step2Complete = whatsapp.value.trim() !== '';
  const step3Complete = ville.value !== '' && offre.value !== '';

  // Step 1
  if (step1Complete) {
    steps[0].classList.add('completed');
    steps[0].classList.remove('active');
    steps[0].textContent = '✓';
    if (lines[0]) lines[0].classList.add('completed');
    steps[1].classList.add('active');
  } else {
    steps[0].classList.remove('completed');
    steps[0].classList.add('active');
    steps[0].textContent = '1';
    if (lines[0]) lines[0].classList.remove('completed');
    steps[1].classList.remove('active');
  }

  // Step 2
  if (step2Complete && step1Complete) {
    steps[1].classList.add('completed');
    steps[1].classList.remove('active');
    steps[1].textContent = '✓';
    if (lines[1]) lines[1].classList.add('completed');
    steps[2].classList.add('active');
  } else {
    steps[1].classList.remove('completed');
    steps[1].textContent = '2';
    if (lines[1]) lines[1].classList.remove('completed');
    if (!step1Complete) steps[1].classList.remove('active');
    steps[2].classList.remove('active');
  }

  // Step 3
  if (step3Complete && step2Complete && step1Complete) {
    steps[2].classList.add('completed');
    steps[2].classList.remove('active');
    steps[2].textContent = '✓';
  } else {
    steps[2].classList.remove('completed');
    steps[2].textContent = '3';
    if (!(step2Complete && step1Complete)) steps[2].classList.remove('active');
  }
}

// Attach modal form step listeners
['modal-nom', 'modal-prenom', 'modal-whatsapp', 'modal-ville', 'modal-offre'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', updateModalFormSteps);
    el.addEventListener('change', updateModalFormSteps);
  }
});

console.log('🚀 Alibaba Sans Arnaque CI — Landing Page v2.0 chargée avec succès !');
