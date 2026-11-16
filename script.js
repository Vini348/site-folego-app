(() => {
  const menuButton = document.querySelector('.menu');
  const nav = document.querySelector('.nav nav');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
    nav?.classList.toggle('is-open', !open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded', 'false');
  }));

  const revealTargets = document.querySelectorAll(
    '.hero-copy,.hero-visual,.hero-bottom,.manifesto-main,.product-intro,.feature,.quote-inner,.closing-content,.footer'
  );
  revealTargets.forEach((el, index) => { el.classList.add('reveal'); el.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`); });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  } else revealTargets.forEach(el => el.classList.add('is-visible'));

  // Start decorative motion only while the hero phone is on screen.
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && 'IntersectionObserver' in window) {
    const motionObserver = new IntersectionObserver(([entry]) => {
      heroVisual.classList.toggle('motion-active', entry.isIntersecting);
    }, { threshold: 0.15 });
    motionObserver.observe(heroVisual);
  } else heroVisual?.classList.add('motion-active');

  // Respect reduced-motion preferences and defer non-critical media until visible.
  document.querySelectorAll('img[loading="lazy"]').forEach(img => { img.decoding = 'async'; });
})();
