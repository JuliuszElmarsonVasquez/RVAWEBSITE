/* =============================================
   JULIUSZ ELMARSON P. VASQUEZ — E-PORTFOLIO
   script.js  |  Interactions & Animations
   ============================================= */

'use strict';

// ── 1. DOM READY WRAPPER ─────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ── 2. SET FOOTER YEAR ──────────────────────
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  // ── 3. NAVBAR: scroll-triggered styling ─────
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Run once on load


  // ── 4. MOBILE NAV: hamburger toggle ─────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    // Prevent body scroll while menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });


  // ── 5. ACTIVE NAV LINK: highlight on scroll ─
  const sections  = document.querySelectorAll('section[id]');
  const navItems  = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });

    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });


  // ── 6. SCROLL REVEAL: IntersectionObserver ──
  // All elements with .reveal-up / .reveal-left / .reveal-right
  // become visible when they enter the viewport.

  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Stop observing once revealed (animation plays only once)
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,       // Trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px'  // Slight offset from bottom
    }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  // ── 7. QUIZ IMAGE: auto-fix orientation ─────
  // If the quiz image is taller than it is wide (portrait), we rotate it
  // to force a landscape/horizontal display.

  const quizImg = document.querySelector('.quiz-image');

  if (quizImg) {
    const fixQuizOrientation = () => {
      const naturalW = quizImg.naturalWidth;
      const naturalH = quizImg.naturalHeight;

      if (naturalW > 0 && naturalH > 0 && naturalH > naturalW) {
        // Portrait image detected → rotate 90deg to landscape
        quizImg.style.transform        = 'rotate(-90deg)';
        quizImg.style.transformOrigin  = 'center center';
        // Swap perceived aspect ratio so the container fits
        quizImg.style.maxHeight        = '100%';
        quizImg.style.width            = 'auto';
      }
    };

    if (quizImg.complete && quizImg.naturalWidth) {
      fixQuizOrientation();
    } else {
      quizImg.addEventListener('load', fixQuizOrientation);
    }
  }


  // ── 8. SMOOTH SCROLL (fallback for older browsers) ──
  // Modern browsers handle scroll-behavior: smooth via CSS.
  // This JS fallback ensures anchor links work everywhere.

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    });
  });


  // ── 9. HERO ENTRANCE ANIMATION ──────────────
  // Trigger the hero elements as soon as the page loads
  // (they use CSS reveal classes with delays already set)

  const heroRevealEls = document.querySelectorAll('#hero .reveal-up');
  // Small timeout to let the browser paint first
  setTimeout(() => {
    heroRevealEls.forEach(el => el.classList.add('is-visible'));
  }, 100);


  // ── 10. PARALLAX BLOBS in hero ──────────────
  // Subtle mouse-follow parallax on the decorative blobs

  const blobA = document.querySelector('.hero-blob--a');
  const blobB = document.querySelector('.hero-blob--b');

  if (blobA && blobB) {
    document.addEventListener('mousemove', e => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;  // -1 to 1
      const dy = (e.clientY - cy) / cy;  // -1 to 1

      blobA.style.transform = `translate(${dx * 30}px, ${dy * 20}px)`;
      blobB.style.transform = `translate(${-dx * 25}px, ${-dy * 18}px)`;
    });
  }


  // ── 11. NAVBAR ACTIVE STYLE (CSS inject) ────
  // Inject .active style into <head> so we don't need it in CSS
  const style = document.createElement('style');
  style.textContent = `.nav-link.active { color: var(--gold) !important; }
  .nav-link.active::after { transform: scaleX(1); }`;
  document.head.appendChild(style);


  // ── 12. CARDS: subtle tilt on hover ─────────
  // Adds a gentle 3D tilt to about-cards and feedback-cards on desktop

  function addTiltEffect(selector) {
    const cards = document.querySelectorAll(selector);
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) / (rect.width  / 2);
        const dy   = (e.clientY - cy) / (rect.height / 2);
        // Max 6deg tilt
        card.style.transform = `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
      });
    });
  }

  // Only apply on non-touch (desktop) devices
  if (window.matchMedia('(hover: hover)').matches) {
    addTiltEffect('.about-card');
    addTiltEffect('.feedback-card');
  }

}); // end DOMContentLoaded
