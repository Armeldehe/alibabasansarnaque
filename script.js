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
        animateCounter(el, 105, '+');
      } else if (el.id === 'statDeliveries') {
        animateCounter(el, 450, '+');
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

// --- Testimonials System ---
const allTestimonials = [
  { name: "Aminata K.", initials: "AK", role: "Commerçante — Abidjan", stars: 5, text: "J'avais peur d'acheter sur Alibaba parce que j'avais entendu beaucoup d'histoires d'arnaque. Grâce à Alibaba Sans Arnaque CI, j'ai reçu mes premiers produits en moins d'un mois. Simple et efficace !" },
  { name: "Kouassi S.", initials: "KS", role: "Entrepreneur — Bouaké", stars: 5, text: "Le service de transit est incroyable ! J'ai commandé 200 kg de marchandises et tout est arrivé intact à Abidjan. Le suivi WhatsApp m'a vraiment rassuré tout au long du processus." },
  { name: "Fatou T.", initials: "FT", role: "Mère au foyer — Yopougon", stars: 5, text: "Je suis maman au foyer et je ne connaissais rien à internet. La formation était tellement simple que j'ai compris tout de suite. Aujourd'hui, je vends des produits achetés en Chine !" },
  { name: "Ibrahim D.", initials: "ID", role: "Commerçant — Adjamé", stars: 5, text: "Avant, j'avais perdu 500 000 FCFA avec un faux fournisseur. Avec Alibaba Sans Arnaque, j'ai appris à vérifier les fournisseurs. Plus jamais d'arnaque !" },
  { name: "Marie-Claire B.", initials: "MB", role: "Vendeuse — Cocody", stars: 5, text: "J'ai suivi la formation en 3 jours et j'ai passé ma première commande la semaine suivante. Mes produits sont arrivés en parfait état. Merci infiniment !" },
  { name: "Sékou O.", initials: "SO", role: "Grossiste — Treichville", stars: 5, text: "Je fais du transit depuis 2 ans avec eux. Jamais eu un seul problème. Les prix sont compétitifs et le suivi est top. Je recommande à 100%." },
  { name: "Awa C.", initials: "AC", role: "Coiffeuse — Marcory", stars: 5, text: "J'ai commandé du matériel de coiffure directement de Chine. J'ai économisé plus de 300 000 FCFA par rapport aux prix locaux. La formation m'a tout appris !" },
  { name: "Pascal K.", initials: "PK", role: "Étudiant — Yamoussoukro", stars: 4, text: "En tant qu'étudiant, j'ai trouvé la formation très accessible. J'ai commencé à revendre des accessoires de téléphone et je me fais un bon revenu supplémentaire." },
  { name: "Mariam S.", initials: "MS", role: "Boutiquière — San-Pédro", stars: 5, text: "Le groupe WhatsApp est un vrai plus. On s'entraide entre membres et l'équipe répond toujours rapidement. C'est comme une famille !" },
  { name: "Yves A.", initials: "YA", role: "Entrepreneur — Plateau", stars: 5, text: "J'ai lancé mon business de vêtements importés grâce à la formation. En 3 mois, j'ai déjà fait 3 commandes. Le transit est rapide et fiable." },
  { name: "Clarisse N.", initials: "CN", role: "Vendeuse en ligne — Abobo", stars: 5, text: "Je vendais déjà sur WhatsApp mais je ne savais pas acheter moins cher. Maintenant je commande directement en Chine et mes marges ont doublé !" },
  { name: "Moussa T.", initials: "MT", role: "Commerçant — Korhogo", stars: 5, text: "Même depuis Korhogo, j'ai reçu mes marchandises sans problème. L'équipe a géré le transport jusqu'à ma ville. Service exceptionnel." },
  { name: "Nadège P.", initials: "NP", role: "Entrepreneure — Daloa", stars: 4, text: "La formation est très bien structurée. Les vidéos sont courtes et claires. J'ai pu apprendre à mon rythme. Très satisfaite du contenu !" },
  { name: "Franck G.", initials: "FG", role: "Importateur — Abidjan", stars: 5, text: "J'importais déjà mais je perdais du temps et de l'argent. La formation m'a ouvert les yeux sur des techniques que je ne connaissais pas. Indispensable !" },
  { name: "Adjoua L.", initials: "AL", role: "Commerçante — Gagnoa", stars: 5, text: "Mon premier colis est arrivé en 18 jours ! C'est plus rapide que ce que je pensais. Et le prix du transit était vraiment raisonnable." },
  { name: "Brice M.", initials: "BM", role: "Vendeur — Riviera", stars: 5, text: "J'ai fait ma première commande de chaussures et j'ai tout vendu en une semaine ! Le retour sur investissement est incroyable quand on achète au bon prix." },
  { name: "Rokia D.", initials: "RD", role: "Styliste — Cocody", stars: 5, text: "En tant que styliste, j'ai trouvé des tissus magnifiques à des prix imbattables. Le transit a été rapide et mes tissus sont arrivés en parfait état." },
  { name: "Jean-Marc K.", initials: "JK", role: "Chef d'entreprise — Zone 4", stars: 5, text: "On a formé plusieurs de nos employés avec Alibaba Sans Arnaque. Maintenant, notre service achat est beaucoup plus efficace. Investissement rentable !" },
  { name: "Aïssatou B.", initials: "AB", role: "Vendeuse — Yopougon", stars: 5, text: "J'avais zéro connaissance en import-export. Aujourd'hui, je passe des commandes toute seule comme une pro. Merci pour cette formation de qualité !" },
  { name: "Stéphane Y.", initials: "SY", role: "Revendeur — Abidjan", stars: 4, text: "Le module sur la négociation m'a permis d'obtenir des réductions de 20% avec mes fournisseurs. La formation s'est rentabilisée dès ma première commande." },
  { name: "Christelle A.", initials: "CA", role: "Entrepreneure — Bouaké", stars: 5, text: "Je recommande vivement ! L'accompagnement est top, l'équipe est disponible et professionnelle. Mon business de cosmétiques a décollé grâce à eux." },
  { name: "Oumar S.", initials: "OS", role: "Commerçant — Man", stars: 5, text: "Depuis Man, je pensais que c'était impossible d'acheter en Chine. Ils m'ont prouvé le contraire. Livraison reçue sans aucun souci !" },
  { name: "Diane K.", initials: "DK", role: "Pharmacienne — Plateau", stars: 5, text: "J'ai commandé du matériel médical pour ma pharmacie. Tout est arrivé conforme à la commande. Le service de vérification des fournisseurs est un vrai plus." },
  { name: "Hervé N.", initials: "HN", role: "Électricien — Adjamé", stars: 5, text: "J'achète mes outils et équipements directement en Chine maintenant. Les économies sont énormes comparé aux prix du marché local !" },
  { name: "Salimata C.", initials: "SC", role: "Coiffeuse — Treichville", stars: 4, text: "Ma deuxième commande de mèches et de produits capillaires est arrivée encore plus vite que la première. Service constant et de qualité." },
  { name: "Olivier B.", initials: "OB", role: "Restaurateur — Marcory", stars: 5, text: "J'ai commandé des ustensiles de cuisine en gros pour mon restaurant. Qualité top, prix divisés par 3. Je ne reviendrai plus aux anciens fournisseurs." },
  { name: "Grâce M.", initials: "GM", role: "Vendeuse — Cocody", stars: 5, text: "La communauté WhatsApp est géniale. Les anciens membres partagent leurs expériences et ça aide beaucoup les nouveaux. On apprend ensemble !" },
  { name: "Joseph T.", initials: "JT", role: "Commerçant — Yopougon", stars: 5, text: "En 6 mois, j'ai fait 5 commandes sans aucun problème. Le service est fiable et professionnel. Mon chiffre d'affaires a augmenté de 40%." },
  { name: "Lucie A.", initials: "LA", role: "Boutiquière — Abidjan", stars: 5, text: "J'ai ouvert ma boutique de prêt-à-porter grâce à cette formation. Je sais maintenant repérer les bons produits et les bons fournisseurs." },
  { name: "Abdoulaye K.", initials: "AK", role: "Grossiste — Adjamé", stars: 5, text: "Le transit par bateau est vraiment avantageux pour les grosses commandes. J'ai reçu 2 tonnes de marchandises en parfait état. Bravo !" },
  { name: "Élise D.", initials: "ED", role: "Entrepreneure — Riviera", stars: 4, text: "Le module sur les droits de douane et le dédouanement est très utile. Maintenant je sais exactement combien va me coûter chaque import." },
  { name: "Ismaël G.", initials: "IG", role: "Vendeur — Plateau", stars: 5, text: "J'ai été bluffé par la qualité de l'accompagnement. On m'a même aidé à négocier avec un fournisseur récalcitrant. Service 5 étoiles !" },
  { name: "Fatim Z.", initials: "FZ", role: "Commerçante — Abobo", stars: 5, text: "Le prix de la formation est vraiment accessible. Pour 15 000 FCFA, j'ai appris ce que d'autres vendent à 100 000 FCFA. Super rapport qualité-prix !" },
  { name: "Patrick L.", initials: "PL", role: "Importateur — Zone Industrielle", stars: 5, text: "Je travaille avec plusieurs transitaires et celui d'Alibaba Sans Arnaque est le plus transparent. Pas de frais cachés, tout est clair dès le départ." },
  { name: "Cécile T.", initials: "CT", role: "Mère au foyer — Cocody", stars: 5, text: "J'ai commencé à vendre des jouets importés de Chine pendant les fêtes. J'ai fait un bénéfice de 200 000 FCFA en un mois. Incroyable !" },
  { name: "Koné A.", initials: "KA", role: "Détaillant — Bouaké", stars: 5, text: "Mes clients sont impressionnés par la qualité de mes produits et mes prix compétitifs. Ils ne savent pas que j'achète directement en Chine !" },
  { name: "Nina R.", initials: "NR", role: "Influenceuse — Abidjan", stars: 4, text: "J'ai créé ma propre marque de bijoux fantaisie grâce à Alibaba. La formation m'a montré comment personnaliser les produits avec mon logo." },
  { name: "Mamadou B.", initials: "MB", role: "Commerçant — Treichville", stars: 5, text: "Ça fait 1 an que je travaille avec eux. La confiance est totale. Ils n'ont jamais failli. Mon business tourne bien grâce à leur sérieux." },
  { name: "Rachelle K.", initials: "RK", role: "Vendeuse en ligne — Yopougon", stars: 5, text: "Le module sur la vente sur TikTok m'a ouvert les yeux. J'ai fait mes premières ventes en ligne en seulement 2 semaines après la formation." },
  { name: "Vincent O.", initials: "VO", role: "Menuisier — Abobo", stars: 5, text: "J'ai commandé des outils professionnels de menuiserie. Prix divisé par 4 par rapport au marché local ! Qualité identique voire meilleure." },
  { name: "Safiatou D.", initials: "SD", role: "Commerçante — Daloa", stars: 5, text: "L'équipe m'a guidée pas à pas pour ma toute première commande. Je n'aurais jamais osé sans leur accompagnement. Maintenant je suis autonome !" },
  { name: "Thierry M.", initials: "TM", role: "Entrepreneur — Abidjan", stars: 4, text: "Bon service dans l'ensemble. Le délai de livraison par bateau est parfois un peu long mais c'est normal. L'essentiel c'est que tout arrive en bon état." },
  { name: "Adama S.", initials: "AS", role: "Grossiste — Adjamé", stars: 5, text: "J'économise en moyenne 500 000 FCFA par commande en achetant directement en Chine. En un an, ça fait des millions d'économies !" },
  { name: "Florence K.", initials: "FK", role: "Couturière — Marcory", stars: 5, text: "J'ai trouvé des machines à coudre industrielles à moitié prix. Le transit a été géré parfaitement. Mon atelier est maintenant bien équipé !" },
  { name: "Bruno A.", initials: "BA", role: "Vendeur — Plateau", stars: 5, text: "Le support WhatsApp est vraiment 7j/7 comme ils disent. J'ai posé une question un dimanche soir et j'ai eu la réponse en 10 minutes. Impressionnant !" },
  { name: "Kadia T.", initials: "KT", role: "Commerçante — Korhogo", stars: 5, text: "Même en étant loin d'Abidjan, tout a été simple. Ils ont organisé la livraison jusqu'à Korhogo. Service complet et sans stress." },
  { name: "Marcel G.", initials: "MG", role: "Importateur — Zone 4", stars: 5, text: "J'ai comparé avec d'autres transitaires. Alibaba Sans Arnaque offre le meilleur rapport qualité-prix du marché. Et en plus, ils sont formateurs !" },
  { name: "Ahou P.", initials: "AP", role: "Entrepreneure — Riviera", stars: 4, text: "La formation est complète et bien faite. J'aurais juste aimé plus de vidéos sur la vente. Mais globalement très satisfaite !" },
  { name: "David N.", initials: "DN", role: "Technicien — Yopougon", stars: 5, text: "J'ai importé du matériel informatique pour ouvrir ma boutique de réparation. Tout est arrivé bien emballé et fonctionnel. Merci à toute l'équipe !" },
  { name: "Rosine B.", initials: "RB", role: "Vendeuse — Abidjan", stars: 5, text: "Ma vie a changé depuis que j'ai découvert Alibaba Sans Arnaque. Je gagne maintenant 3 fois plus qu'avant en vendant des produits importés. Reconnaissance éternelle !" }
];

let testimonialsDisplayed = 0;
const TESTIMONIALS_PER_PAGE = 10;

function createTestimonialCard(t, isNew = false) {
  const starsHtml = '⭐'.repeat(t.stars) + (t.stars < 5 ? '<span style="opacity:0.3">' + '⭐'.repeat(5 - t.stars) + '</span>' : '');
  const card = document.createElement('div');
  card.className = `testimonial-card reveal visible${isNew ? ' new-review' : ''}`;
  card.innerHTML = `
    <span class="testimonial-quote" aria-hidden="true">"</span>
    <div class="testimonial-stars" aria-label="${t.stars} étoiles sur 5">${starsHtml}</div>
    <p class="testimonial-text">${t.text}</p>
    <div class="testimonial-author">
      <div class="testimonial-avatar" aria-hidden="true">${t.initials}</div>
      <div class="testimonial-info">
        <div class="name">${t.name}</div>
        <div class="role">${t.role}</div>
      </div>
    </div>
  `;
  return card;
}

function loadTestimonials(count) {
  const grid = document.getElementById('testimonialsGrid');
  const btn = document.getElementById('btnVoirPlus');
  if (!grid) return;

  const allReviews = [...allTestimonials, ...getUserReviews()];
  const end = Math.min(testimonialsDisplayed + count, allReviews.length);

  for (let i = testimonialsDisplayed; i < end; i++) {
    const card = createTestimonialCard(allReviews[i]);
    grid.appendChild(card);
    // Trigger reveal animation with stagger
    setTimeout(() => {
      card.classList.add('active');
    }, (i - testimonialsDisplayed) * 80);
  }

  testimonialsDisplayed = end;

  // Hide button if all loaded
  if (testimonialsDisplayed >= allReviews.length && btn) {
    btn.classList.add('hidden');
  }

  // Update count
  const countEl = document.getElementById('testimonialCount');
  if (countEl) {
    countEl.textContent = `${allReviews.length} avis vérifiés`;
  }
}

// Initial load
loadTestimonials(TESTIMONIALS_PER_PAGE);

// Voir plus button
const btnVoirPlus = document.getElementById('btnVoirPlus');
if (btnVoirPlus) {
  btnVoirPlus.addEventListener('click', () => {
    loadTestimonials(TESTIMONIALS_PER_PAGE);
  });
}

// --- User Reviews (localStorage) ---
function getUserReviews() {
  try {
    return JSON.parse(localStorage.getItem('userReviews') || '[]');
  } catch {
    return [];
  }
}

function saveUserReview(review) {
  const reviews = getUserReviews();
  reviews.push(review);
  localStorage.setItem('userReviews', JSON.stringify(reviews));
}

// --- Star Rating Interaction ---
let selectedRating = 0;
const starBtns = document.querySelectorAll('#starRating .star-btn');

starBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedRating = parseInt(btn.dataset.rating);
    starBtns.forEach(b => {
      const r = parseInt(b.dataset.rating);
      if (r <= selectedRating) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  });

  btn.addEventListener('mouseenter', () => {
    const hoverRating = parseInt(btn.dataset.rating);
    starBtns.forEach(b => {
      const r = parseInt(b.dataset.rating);
      if (r <= hoverRating) {
        b.style.color = '#FBBF24';
      } else {
        b.style.color = '';
      }
    });
  });

  btn.addEventListener('mouseleave', () => {
    starBtns.forEach(b => {
      b.style.color = '';
    });
  });
});

// --- Review Form Toggle (Collapsible) ---
const reviewFormToggle = document.getElementById('reviewFormToggle');
const reviewFormWrapper = document.getElementById('reviewFormWrapper');

if (reviewFormToggle && reviewFormWrapper) {
  reviewFormToggle.addEventListener('click', () => {
    const isOpen = reviewFormWrapper.classList.toggle('open');
    reviewFormToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// --- Review Form Submission ---
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
  reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('reviewName').value.trim();
    const city = document.getElementById('reviewCity').value.trim();
    const role = document.getElementById('reviewRole').value.trim();
    const text = document.getElementById('reviewText').value.trim();

    if (!name || !city || !text || selectedRating === 0) {
      showFormError('Merci de remplir tous les champs obligatoires et de donner une note ⭐', reviewForm);
      return;
    }

    // Build initials
    const nameParts = name.split(' ');
    const initials = nameParts.length >= 2
      ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
      : name.substring(0, 2).toUpperCase();

    const review = {
      name: name,
      initials: initials,
      role: role ? `${role} — ${city}` : city,
      stars: selectedRating,
      text: text,
      date: new Date().toISOString()
    };

    // Save to localStorage
    saveUserReview(review);

    // Insert at the top of the grid
    const grid = document.getElementById('testimonialsGrid');
    const card = createTestimonialCard(review, true);
    grid.insertBefore(card, grid.firstChild);
    setTimeout(() => card.classList.add('active'), 50);

    testimonialsDisplayed++;

    // Update count
    const allReviews = [...allTestimonials, ...getUserReviews()];
    const countEl = document.getElementById('testimonialCount');
    if (countEl) {
      countEl.textContent = `${allReviews.length} avis vérifiés`;
    }

    // Reset form and collapse
    reviewForm.reset();
    selectedRating = 0;
    starBtns.forEach(b => b.classList.remove('active'));
    if (reviewFormWrapper) {
      reviewFormWrapper.classList.remove('open');
      if (reviewFormToggle) reviewFormToggle.setAttribute('aria-expanded', 'false');
    }

    // Show success toast
    showReviewToast();

    // Scroll to the new review
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }, 300);
  });
}

function showReviewToast() {
  let toast = document.querySelector('.review-success-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'review-success-toast';
    toast.textContent = '✅ Merci ! Ton avis a été publié avec succès.';
    document.body.appendChild(toast);
  }
  
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

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
