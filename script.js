document.addEventListener('DOMContentLoaded', function () {

  /* ---------- AOS init ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---------- Navbar shrink on scroll ---------- */
  var nav = document.getElementById('mainNav');
  var backToTop = document.getElementById('backToTop');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) {
      if (y > 60) { nav.classList.add('scrolled'); }
      else { nav.classList.remove('scrolled'); }
    }
    if (backToTop) {
      if (y > 500) { backToTop.classList.add('visible'); }
      else { backToTop.classList.remove('visible'); }
    }
    parallaxHero(y);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Collapse mobile menu after clicking a link ---------- */
  var navLinks = document.querySelectorAll('#navMenu .nav-link, #navMenu .btn-nav-cta');
  var collapseEl = document.getElementById('navMenu');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (collapseEl && collapseEl.classList.contains('show') && window.bootstrap) {
        var bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl);
        bsCollapse.hide();
      }
    });
  });

  /* ---------- Parallax hero background ---------- */
  var heroBg = document.getElementById('heroBg');
  var heroSection = document.getElementById('hero');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function parallaxHero(y) {
    if (!heroBg || !heroSection || reduceMotion) return;
    var heroHeight = heroSection.offsetHeight;
    if (y < heroHeight) {
      var offset = y * 0.35;
      heroBg.style.transform = 'translateY(' + offset + 'px) scale(1.06)';
    }
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var galleryImages = document.querySelectorAll('#galleryGrid img');
  var lastFocusedEl = null;

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lastFocusedEl = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Enlarged photograph';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
    if (lastFocusedEl) { lastFocusedEl.focus(); }
  }

  galleryImages.forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(img.getAttribute('data-full') || img.src, img.alt);
    });
    img.parentElement.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img.getAttribute('data-full') || img.src, img.alt);
      }
    });
    img.parentElement.setAttribute('tabindex', '0');
    img.parentElement.setAttribute('role', 'button');
    img.parentElement.setAttribute('aria-label', 'View larger image: ' + img.alt);
  });

  if (lightboxClose) { lightboxClose.addEventListener('click', closeLightbox); }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
  });

});
