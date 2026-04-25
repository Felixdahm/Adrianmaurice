/* ════════════════════════════════════════════════════════════
   Leadpilot — main.js
   Vanilla JS: Nav, Parallax, Scroll Reveal, Tilt, Form
   ════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   SITE CONFIG — Fülle diese zwei Werte aus, alles andere läuft.
   ───────────────────────────────────────────────────────────── */
const SITE_CONFIG = {
  // Dein Calendly-Link, z. B. "https://calendly.com/leadpilot/30min"
  calendlyUrl: '[CALENDLY_LINK]',

  // Deine Formspree-ID aus formspree.io/forms — z. B. "xpwzyvkj"
  formspreeId: '[FORMSPREE_ID]',
};

/* ── Helpers ── */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
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
   3. SCROLL REVEAL — fade-in + slide-up on enter
   ═══════════════════════════════════════════════════════════ */
(function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  $$('.reveal').forEach(el => obs.observe(el));
})();


/* ═══════════════════════════════════════════════════════════
   4. PARALLAX — Hero content depth shift
   ═══════════════════════════════════════════════════════════ */
(function initParallax() {
  const heroContent = $('[data-parallax]');
  if (!heroContent) return;

  let ticking = false;

  const update = () => {
    const y      = window.scrollY;
    const factor = parseFloat(heroContent.dataset.parallax) || 0.3;
    const heroH  = heroContent.closest('section').offsetHeight;

    if (y > heroH * 1.5) { ticking = false; return; }

    heroContent.style.transform = `translateY(${y * factor}px)`;
    heroContent.style.opacity   = Math.max(0, 1 - (y / heroH) * 1.8);

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();


/* ═══════════════════════════════════════════════════════════
   5. CARD TILT — Subtle 3D tilt on hover (desktop only)
   ═══════════════════════════════════════════════════════════ */
(function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  const MAX_TILT = 6;

  $$('[data-hover]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);

      card.style.transform = `perspective(800px) rotateX(${-dy * MAX_TILT}deg) rotateY(${dx * MAX_TILT}deg) scale(1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s linear';
    });
  });
})();


/* ═══════════════════════════════════════════════════════════
   6. HERO GRADIENT — Mouse tracking
   ═══════════════════════════════════════════════════════════ */
(function initMouseGradient() {
  const hero = $('.hero');
  if (!hero) return;
  if (window.matchMedia('(hover: none)').matches) return;

  let raf = null;

  hero.addEventListener('mousemove', (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width)  * 100}%`);
      hero.style.setProperty('--my', `${((e.clientY - rect.top)  / rect.height) * 100}%`);
      raf = null;
    });
  });
})();


/* ═══════════════════════════════════════════════════════════
   7. SMOOTH SCROLL — Native enhancement with nav offset
   ═══════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  const NAV_HEIGHT = 70;

  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT, behavior: 'smooth' });
    });
  });
})();


/* ═══════════════════════════════════════════════════════════
   8. CONTACT FORM — Validation + Formspree submission
   ═══════════════════════════════════════════════════════════ */
(function initForm() {
  const form = $('#contactForm');
  if (!form) return;

  const btnText = form.querySelector('.btn__text');
  const btnIcon = form.querySelector('.btn__icon');

  /* Error helpers */
  const setError = (input, msg) => {
    input.style.borderColor = 'var(--c-red)';
    input.style.boxShadow   = '0 0 0 4px rgba(255, 69, 58, 0.12)';
    let err = input.parentNode.querySelector('.form-error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'form-error';
      input.parentNode.appendChild(err);
    }
    err.textContent = msg;
  };

  const clearError = (input) => {
    input.style.borderColor = '';
    input.style.boxShadow   = '';
    input.parentNode.querySelector('.form-error')?.remove();
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

  /* Submit */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    form.classList.add('is-sending');
    btnText.textContent = 'Wird gesendet…';
    btnIcon.textContent = '';

    if (SITE_CONFIG.formspreeId === '[FORMSPREE_ID]') {
      /* ── Dev mode: Formspree not configured yet — simulate ── */
      await new Promise(r => setTimeout(r, 1200));
      showSuccess();
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${SITE_CONFIG.formspreeId}`, {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    new FormData(form),
      });

      if (res.ok) {
        showSuccess();
      } else {
        const data = await res.json().catch(() => ({}));
        showError(data.errors?.[0]?.message || 'Etwas ist schiefgelaufen. Versuch es bitte erneut.');
      }
    } catch {
      showError('Keine Verbindung. Bitte überprüfe deine Internetverbindung.');
    }
  });

  function showSuccess() {
    form.classList.remove('is-sending');
    form.classList.add('is-sent');
    btnText.textContent = 'Gesendet ✓';
    btnIcon.textContent = '';
    setTimeout(() => {
      form.classList.remove('is-sent');
      form.reset();
      btnText.textContent = 'Nachricht senden';
      btnIcon.textContent = '→';
    }, 3500);
  }

  function showError(msg) {
    form.classList.remove('is-sending');
    btnText.textContent = 'Nachricht senden';
    btnIcon.textContent = '→';
    // Show error below button
    let errEl = form.querySelector('.form-submit-error');
    if (!errEl) {
      errEl = document.createElement('p');
      errEl.className = 'form-error form-submit-error';
      form.querySelector('.btn').after(errEl);
    }
    errEl.textContent = msg;
    setTimeout(() => errEl.remove(), 6000);
  }

  /* Live clear errors on input */
  $$('input, textarea', form).forEach(el => {
    el.addEventListener('input', () => clearError(el));
  });
})();


/* ═══════════════════════════════════════════════════════════
   9. PORTFOLIO CAROUSEL — Auto-scroll + dots (mobile only)
   ═══════════════════════════════════════════════════════════ */
(function initPortfolioCarousel() {
  const grid = $('.portfolio__grid');
  if (!grid) return;
  if (!window.matchMedia('(max-width: 768px)').matches) return;

  const cards = [...grid.children];

  /* ── Helpers ── */
  // Distance between card starts (card width + gap) — measured live so it's
  // always correct regardless of viewport size or CSS changes.
  const stride = () =>
    cards.length > 1
      ? cards[1].offsetLeft - cards[0].offsetLeft
      : cards[0]?.offsetWidth ?? window.innerWidth;

  const activeIndex = () => Math.round(grid.scrollLeft / (stride() || 1));

  const goTo = (i) => {
    grid.scrollTo({ left: i * stride(), behavior: 'smooth' });
  };

  /* ── Dots ── */
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'portfolio__dots';

  const dots = cards.map((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'portfolio__dot' + (i === 0 ? ' is-active' : '');
    btn.setAttribute('aria-label', `Projekt ${i + 1}`);
    btn.addEventListener('click', () => { pauseAuto(8000); goTo(i); });
    dotsWrap.appendChild(btn);
    return btn;
  });

  grid.after(dotsWrap);

  const updateDots = () => {
    const idx = activeIndex();
    dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
  };
  grid.addEventListener('scroll', updateDots, { passive: true });

  /* ── Auto-scroll ── */
  let timer = null;
  let paused = false;

  const next = () => {
    if (paused) return;
    const last = cards.length - 1;
    const cur  = activeIndex();
    goTo(cur >= last ? 0 : cur + 1);
  };

  const startAuto = () => {
    clearInterval(timer);
    timer = setInterval(next, 3400);
  };

  const pauseAuto = (resumeAfter = 5000) => {
    paused = true;
    clearInterval(timer);
    setTimeout(() => { paused = false; startAuto(); }, resumeAfter);
  };

  grid.addEventListener('touchstart',  () => pauseAuto(6000), { passive: true });
  grid.addEventListener('pointerdown', () => pauseAuto(5000));

  setTimeout(startAuto, 1800);
})();
