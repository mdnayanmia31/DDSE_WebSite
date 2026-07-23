/* ============================================================
   DDSE — Main JavaScript
   Navigation, Page Loader, GSAP Hero, ScrollReveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ─── Reduced Motion Check ───
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Page Loader ───
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => { loader.classList.add('loaded'); }, 1200);
  }

  // ─── Floating WhatsApp Icon ───
  if (!document.querySelector('.floating-wa')) {
    const waIcon = document.createElement('a');
    waIcon.href = "https://wa.me/8801754012596";
    waIcon.target = "_blank";
    waIcon.className = "floating-wa";
    waIcon.innerHTML = `<svg width="35" height="35" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;
    document.body.appendChild(waIcon);
  }

  // ─── Hero Slider ───
  const slides = document.querySelectorAll('.hero-slider .slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove('slide-active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('slide-active');
    }, 5000); // Change slide every 5 seconds
  }

  // ─── Mobile Navigation ───
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Active Nav Link ───
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── Navbar Scroll ───
  const header = document.querySelector('header');
  let lastScroll = 0;
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (header) {
      if (scrollY > 80) { 
        header.classList.add('header--scrolled'); 
      }
      else { 
        header.classList.remove('header--scrolled'); 
      }
    }
    lastScroll = scrollY;
  };
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => { handleScroll(); scrollTicking = false; });
      scrollTicking = true;
    }
  });

  // ─── GSAP Animations (if GSAP loaded) ───
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    const navbar = document.querySelector('.navbar');

    // Navbar entrance (animation removed to ensure visibility)
    if (navbar) {
      // gsap.from(navbar, { y: -80, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.3 });
    }

    // Hero animations
    const hero = document.querySelector('.hero');
    if (hero) {
      // Hero entrance timeline
      const heroTl = gsap.timeline({ delay: 1.4 });
      const heroTag = hero.querySelector('.hero-tag');
      const heroTitle = hero.querySelector('.hero-title');
      const heroSubtitle = hero.querySelector('.hero-subtitle');
      const heroCta = hero.querySelector('.hero-cta-group');
      const scrollInd = hero.querySelector('.scroll-indicator');

      if (heroTag) heroTl.from(heroTag, { opacity: 0, y: -20, duration: 0.6, ease: 'power3.out' });
      if (heroTitle) {
        const lines = heroTitle.querySelectorAll('.line');
        if (lines.length > 0) {
          lines.forEach((line, i) => {
            heroTl.from(line, { opacity: 0, y: 60, duration: 0.9, ease: 'power4.out' }, `-=${i ? 0.6 : 0.3}`);
          });
        } else {
          heroTl.from(heroTitle, { opacity: 0, y: 60, duration: 0.9, ease: 'power4.out' }, '-=0.3');
        }
      }
      if (heroSubtitle) heroTl.from(heroSubtitle, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.2');
      if (heroCta) heroTl.from(heroCta, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4');
      if (scrollInd) heroTl.from(scrollInd, { opacity: 0, duration: 1 }, '-=0.2');

    }

    // ─── Dynamic Experience ───
    const startYear = 2015;
    const currentYear = new Date().getFullYear();
    const expYears = currentYear - startYear;
    
    // Update counter attributes BEFORE ScrollTrigger animation runs
    document.querySelectorAll('.dynamic-years-counter').forEach(el => {
      el.setAttribute('data-counter', expYears);
    });

    // Stat counters
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseInt(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val) + suffix;
            }
          });
        }
      });
    });

    // Section heading clip-path reveal
    document.querySelectorAll('.section-title').forEach(title => {
      gsap.from(title, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: title, start: 'top 85%', once: true }
      });
    });

    // Service cards stagger
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
      gsap.from(serviceCards, {
        y: 60, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: serviceCards[0].parentElement, start: 'top 80%', once: true }
      });
    }

    // CTA hover glow
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { boxShadow: '0 0 30px rgba(0,194,255,0.5)', duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { boxShadow: 'none', duration: 0.3, ease: 'power2.out' });
      });
    });

    // Card hover GSAP
    document.querySelectorAll('.service-card').forEach(card => {
      const icon = card.querySelector('.card-icon-wrap');
      const shine = card.querySelector('.card-shine');
      card.addEventListener('mouseenter', () => {
        if (icon) gsap.to(icon, { scale: 1.15, rotate: 5, duration: 0.35, ease: 'back.out(2)' });
        gsap.to(card, { y: -6, duration: 0.35, ease: 'power2.out' });
        if (shine) gsap.to(shine, { opacity: 1, duration: 0.3 });
      });
      card.addEventListener('mouseleave', () => {
        if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.35, ease: 'power2.out' });
        gsap.to(card, { y: 0, duration: 0.35, ease: 'power2.out' });
        if (shine) gsap.to(shine, { opacity: 0, duration: 0.3 });
      });
    });



    // Timeline items entrance
    document.querySelectorAll('.timeline-item').forEach(item => {
      gsap.from(item, {
        x: -30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%', once: true }
      });
    });
  }

  // ─── ScrollReveal ───
  if (typeof ScrollReveal !== 'undefined' && !prefersReducedMotion) {
    const sr = ScrollReveal({ distance: '40px', duration: 800, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', reset: false, viewFactor: 0.15 });
    sr.reveal('.reveal-up', { origin: 'bottom', distance: '40px', delay: 100 });
    sr.reveal('.reveal-left', { origin: 'left', distance: '50px', delay: 150 });
    sr.reveal('.reveal-right', { origin: 'right', distance: '50px', delay: 150 });
    sr.reveal('.reveal-scale', { scale: 0.85, delay: 100, duration: 700 });
    sr.reveal('.reveal-stagger', { origin: 'bottom', distance: '30px', interval: 120 });
  }

  // ─── Dynamic Footer Year & Texts ───
 // Initialize Year Update
if(document.getElementById('current-year')) {
  document.getElementById('current-year').textContent = new Date().getFullYear();
}


  const expYearsGlobal = new Date().getFullYear() - 2015;
  
  // Update English text elements
  document.querySelectorAll('.dynamic-years-text').forEach(el => {
    el.textContent = expYearsGlobal;
  });
  
  // Update Bengali text elements
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const expYearsBn = expYearsGlobal.toString().split('').map(d => bengaliDigits[d]).join('');
  document.querySelectorAll('.dynamic-years-bengali').forEach(el => {
    el.textContent = expYearsBn;
  });

    // ─── Mini Report Form (Home Page) ───
  const miniReportBtn = document.getElementById('mini-report-submit');
  if (miniReportBtn) {
    miniReportBtn.addEventListener('click', () => {
      const id = document.getElementById('mini-report-id')?.value.trim();
      const phone = document.getElementById('mini-phone')?.value.trim();
      const params = new URLSearchParams();
      if (id) params.set('id', id);
      if (phone) params.set('phone', phone);
      window.location.href = `reports.html${params.toString() ? '?' + params : ''}`;
    });
  }

  initGlobalReach();
  initPromoCarousel();
});

function initGlobalReach() {
  const stops = document.querySelectorAll('.route-stop');
  const tabs = document.querySelectorAll('.route-year-tabs button');
  const panels = document.querySelectorAll('.route-year-panel');
  if (!stops.length || !tabs.length || !panels.length) return;

  const activateYear = (year) => {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.year === year));
    panels.forEach(p => p.classList.toggle('active', p.dataset.year === year));
    stops.forEach(s => s.classList.toggle('active', s.dataset.year === year));
  };
  tabs.forEach(tab => tab.addEventListener('click', () => activateYear(tab.dataset.year)));
  stops.forEach(stop => {
    stop.addEventListener('click', () => activateYear(stop.dataset.year));
    stop.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stop.click(); } });
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.route-path').forEach((path, i) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.to(path, { strokeDashoffset: 0, duration: 1, ease: 'power2.out', delay: i * 0.12,
        scrollTrigger: { trigger: '.route-map', start: 'top 75%', once: true } });
    } else {
      path.style.transition = `stroke-dashoffset 1s ${i * 0.12}s ease-out`;
      requestAnimationFrame(() => requestAnimationFrame(() => { path.style.strokeDashoffset = 0; }));
    }
  });
}

function initPromoCarousel() {
  const track = document.getElementById('promo-track');
  const cards = document.querySelectorAll('.promo-card');
  const dotsWrap = document.getElementById('promo-dots');
  const carousel = document.getElementById('promo-carousel');
  if (!track || !cards.length || !dotsWrap || !carousel) return;

  let index = 0, timer = null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'promo-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('.promo-dot');

  function goTo(i) {
    index = (i + cards.length) % cards.length;
    const offset = -index * 100;
    if (typeof gsap !== 'undefined' && !reduced) {
      gsap.to(track, { xPercent: offset, duration: 0.7, ease: 'power3.inOut' });
    } else {
      track.style.transform = `translateX(${offset}%)`;
    }
    cards.forEach((c, ci) => c.classList.toggle('is-active', ci === index));
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
  }
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);
  function startAuto() { if (reduced) return; stopAuto(); timer = setInterval(next, 6000); }
  function stopAuto() { if (timer) clearInterval(timer); }

  document.getElementById('promo-prev')?.addEventListener('click', () => { prev(); startAuto(); });
  document.getElementById('promo-next')?.addEventListener('click', () => { next(); startAuto(); });
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin', stopAuto);
  carousel.addEventListener('focusout', startAuto);
  cards[0].classList.add('is-active');
  startAuto();
}
