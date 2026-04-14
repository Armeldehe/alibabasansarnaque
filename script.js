// ===== ALIBABA SANS ARNAQUE CI - JAVASCRIPT =====

// --- Navbar Scroll Effect ---
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll);

// --- Mobile Menu ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMobileMenu() {
  mobileMenu.classList.add('active');
  mobileOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu-links a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// --- Hero Particles ---
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const particleCount = 20;

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

createParticles();

// --- Scroll Reveal Animation ---
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;

  reveals.forEach((el, index) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      // Add a slight stagger to sibling elements
      const delay = (index % 4) * 100;
      setTimeout(() => {
        el.classList.add('active');
      }, delay);
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// --- FAQ Toggle ---
function toggleFaq(id) {
  const item = document.getElementById(id);
  const isActive = item.classList.contains('active');

  // Close all items
  document.querySelectorAll('.faq-item').forEach(faqItem => {
    faqItem.classList.remove('active');
    const answer = faqItem.querySelector('.faq-answer');
    answer.style.maxHeight = null;
  });

  // Open clicked item if it was closed
  if (!isActive) {
    item.classList.add('active');
    const answer = item.querySelector('.faq-answer');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// --- Counter Animation ---
function animateCounter(element, target, suffix = '') {
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
      const text = el.textContent;

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
    alert('Merci de remplir tous les champs.');
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

  // Redirect after small delay
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');

    // Reset form after redirect
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = '✅ Valider mon inscription';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
    }, 2000);
  }, 800);
});

// --- Smooth Scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    e.preventDefault();
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
}

window.addEventListener('scroll', highlightActiveSection);

// --- Debounce utility for scroll performance ---
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) return;

  scrollTimeout = setTimeout(() => {
    scrollTimeout = null;
  }, 10);
});

console.log('🚀 Alibaba Sans Arnaque CI — Landing Page chargée avec succès !');
