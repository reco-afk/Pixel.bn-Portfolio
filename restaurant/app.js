(() => {
  const html = document.documentElement;
  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function markReady() {
    requestAnimationFrame(() => body.classList.add('page-ready'));
  }

  function setActiveNavigation() {
    const page = body.dataset.page;
    document.querySelectorAll('[data-page-link]').forEach((link) => {
      const active = link.dataset.pageLink === page;
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function setupMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (!menu) return;
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => menu.removeAttribute('open')));
    document.addEventListener('click', (event) => {
      if (menu.open && !menu.contains(event.target)) menu.removeAttribute('open');
    });
  }

  function setupPageTransitions() {
    if (reducedMotion) return;
    document.querySelectorAll('a[data-transition]').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
        const target = new URL(link.href, location.href);
        if (target.origin !== location.origin || (target.pathname === location.pathname && target.hash)) return;
        event.preventDefault();
        body.classList.add('page-leaving');
        window.setTimeout(() => { location.href = target.href; }, 180);
      });
    });
    window.addEventListener('pageshow', () => body.classList.remove('page-leaving'));
  }

  function setupReveals() {
    const elements = [...document.querySelectorAll('[data-reveal]')];
    if (!elements.length || reducedMotion || !('IntersectionObserver' in window)) return;
    html.classList.add('reveal-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    elements.forEach((element) => observer.observe(element));
  }

  function setupLightbox() {
    const dialog = document.querySelector('#image-dialog');
    if (!dialog) return;
    const image = dialog.querySelector('img');
    const caption = dialog.querySelector('[data-dialog-caption]');
    document.querySelectorAll('[data-lightbox]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        image.src = trigger.dataset.lightbox;
        image.alt = trigger.dataset.alt || '';
        caption.textContent = trigger.dataset.caption || '';
        dialog.showModal();
      });
    });
    dialog.querySelector('[data-dialog-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  function setupImageFallbacks() {
    document.querySelectorAll('img').forEach((image) => {
      const showFallback = () => {
        image.hidden = true;
        image.parentElement?.classList.add('media-fallback');
      };
      if (image.complete && image.naturalWidth === 0) showFallback();
      else image.addEventListener('error', showFallback, { once: true });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setActiveNavigation();
    setupMobileMenu();
    setupPageTransitions();
    setupReveals();
    setupLightbox();
    setupImageFallbacks();
    markReady();
  });
})();
