/* ════════════════════════════════════════════════════════════
   Adrian & Maurice — main.js
   Vanilla JS: Nav, Parallax, Scroll Reveal, Counter, Form
   ════════════════════════════════════════════════════════════ */

'use strict';

/* ── Helpers ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ═══════════════════════════════════════════════════════════
   1. NAVIGATION — Dark Hero-aware + Glassmorphism on scroll
   ═══════════════════════════════════════════════════════════ */
(function initNav() {
  const nav       = $('#nav');
  const burger    = $('#navBurger');
  const mobileNav = $('#navMobile');
  const hero      = $('.hero');

  const onScroll = () => {
    const scrolled   = window.scrollY > 20;
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
    const overHero   = heroBottom > 60;

    nav.classList.toggle('is-scrolled', scrolled);
    // Dark-Nav nur solange der Hero sichtbar ist und noch nicht gescrollt
    nav.classList.toggle('nav--dark', !scrolled && overHero);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Burger toggle */
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('is-open');
    mobileNav.classList.toggle('is-open', open);
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  });

  /* Close mobile nav on link click */
  $$('.nav__mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-open');
      mobileNav.classList.remove('is-open');
    });
  });

  /* Active link on scroll (IntersectionObserver) */
  const sections = $$('section[id]');
  const navLinks  = $$('.nav__link');

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(l => {
        l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`);
      });
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObs.observe(s));
})();


/* ═══════════════════════════════════════════════════════════
   2. SCROLL REVEAL — fade-in + slide-up on enter
   ═══════════════════════════════════════════════════════════ */
(function initReveal() {
  const reveals = $$('.reveal');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => obs.observe(el));
})();


/* ═══════════════════════════════════════════════════════════
   3. PARALLAX — Hero orbs + content depth shift
   ═══════════════════════════════════════════════════════════ */
(function initParallax() {
  const heroContent = $('[data-parallax]');
  const orbs        = $$('.hero__orb');

  if (!heroContent) return;

  let ticking = false;
  let lastY    = 0;

  const update = () => {
    const y       = window.scrollY;
    const factor  = parseFloat(heroContent.dataset.parallax) || 0.3;
    const heroH   = heroContent.closest('section').offsetHeight;

    if (y > heroH * 1.5) { ticking = false; return; }

    // Content moves slower than scroll → depth effect
    heroContent.style.transform = `translateY(${y * factor}px)`;
    heroContent.style.opacity   = Math.max(0, 1 - (y / heroH) * 1.8);

    // Orbs move at different speeds → depth layers
    orbs.forEach((orb, i) => {
      const speed = 0.12 + i * 0.08;
      orb.style.transform = `translateY(${y * speed}px)`;
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    lastY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();


/* ═══════════════════════════════════════════════════════════
   4. COUNTER ANIMATION — Stats section numbers
   ═══════════════════════════════════════════════════════════ */
(function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const animateCounter = (el, target, duration = 1800) => {
    const start = performance.now();

    const step = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOutQuart(progress) * target);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      animateCounter(el, target);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
})();


/* ═══════════════════════════════════════════════════════════
   5. CARD TILT — Subtle 3D tilt on hover (desktop)
   ═══════════════════════════════════════════════════════════ */
(function initTilt() {
  // Skip on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const MAX_TILT = 6; // degrees

  $$('[data-hover]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rx     = -dy * MAX_TILT;
      const ry     =  dx * MAX_TILT;

      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`;
    });

    const reset = () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    card.addEventListener('mouseleave', reset);
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s linear';
    });
  });
})();


/* ═══════════════════════════════════════════════════════════
   6. HERO GRADIENT PARALLAX — Mouse tracking on hero
   ═══════════════════════════════════════════════════════════ */
(function initMouseGradient() {
  const hero = $('.hero');
  if (!hero) return;
  if (window.matchMedia('(hover: none)').matches) return;

  let raf = null;

  hero.addEventListener('mousemove', (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const rect  = hero.getBoundingClientRect();
      const px    = ((e.clientX - rect.left) / rect.width)  * 100;
      const py    = ((e.clientY - rect.top)  / rect.height) * 100;

      hero.style.setProperty('--mx', `${px}%`);
      hero.style.setProperty('--my', `${py}%`);
      raf = null;
    });
  });
})();


/* ═══════════════════════════════════════════════════════════
   7. SMOOTH SCROLL — Native smooth scroll enhancement
   ═══════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  const NAV_HEIGHT = 70; // px offset so section isn't hidden under nav

  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ═══════════════════════════════════════════════════════════
   8. CONTACT FORM — Validation + Submit feedback
   ═══════════════════════════════════════════════════════════ */
(function initForm() {
  const form = $('#contactForm');
  if (!form) return;

  const btnText = form.querySelector('.btn__text');
  const btnIcon = form.querySelector('.btn__icon');

  const setError = (input, msg) => {
    input.style.borderColor = '#ff3b30';
    input.style.boxShadow   = '0 0 0 4px rgba(255, 59, 48, 0.12)';
    // Remove old error
    input.nextElementSibling?.nextElementSibling?.remove();
    const err = document.createElement('p');
    err.style.cssText = 'font-size:0.78rem;color:#ff3b30;margin-top:0.3rem;padding-left:0.25rem;';
    err.textContent   = msg;
    input.parentNode.appendChild(err);
  };

  const clearError = (input) => {
    input.style.borderColor = '';
    input.style.boxShadow   = '';
    input.parentNode.querySelector('p')?.remove();
  };

  const validate = () => {
    let valid = true;
    const name    = form.name;
    const email   = form.email;
    const message = form.message;

    if (!name.value.trim()) {
      setError(name, 'Bitte gib deinen Namen an.'); valid = false;
    } else clearError(name);

    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      setError(email, 'Bitte gib eine gültige E-Mail-Adresse an.'); valid = false;
    } else clearError(email);

    if (!message.value.trim() || message.value.trim().length < 10) {
      setError(message, 'Bitte schreib uns mindestens 10 Zeichen.'); valid = false;
    } else clearError(message);

    return valid;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Sending state
    form.classList.add('is-sending');
    btnText.textContent = 'Wird gesendet…';
    btnIcon.textContent = '';

    // Simulated send (replace with real fetch/formspree/etc.)
    await new Promise(r => setTimeout(r, 1500));

    form.classList.remove('is-sending');
    form.classList.add('is-sent');
    btnText.textContent = 'Gesendet ✓';
    btnIcon.textContent = '';

    setTimeout(() => {
      form.classList.remove('is-sent');
      form.reset();
      btnText.textContent = 'Nachricht senden';
      btnIcon.textContent = '→';
    }, 3000);
  });

  // Live clear errors on input
  $$('input, textarea', form).forEach(el => {
    el.addEventListener('input', () => clearError(el));
  });
})();


/* ═══════════════════════════════════════════════════════════
   9. SCROLL-TRIGGERED SECTION GRADIENT PULSE
      Stats & CTA sections pulse their background on enter
   ═══════════════════════════════════════════════════════════ */
(function initSectionPulse() {
  const pulseEls = $$('.stats, .cta-banner');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-in-view', entry.isIntersecting);
    });
  }, { threshold: 0.2 });

  pulseEls.forEach(el => obs.observe(el));
})();
