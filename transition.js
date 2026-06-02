// Page transition system
document.addEventListener('DOMContentLoaded', () => {
  // Run entrance animation
  document.body.classList.add('navigating-in');
  setTimeout(() => {
    document.body.classList.remove('navigating-in');
  }, 800);

  // Scroll-reveal observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.group-title, .rule-card, .lexique-item, .sanction-item, .command-card').forEach((el, i) => {
    const parent = el.parentElement;
    const siblings = Array.from(parent.children).filter(c => c.classList.contains(el.classList[0]));
    const idx = siblings.indexOf(el);
    el.dataset.delay = idx * 60;
    observer.observe(el);
  });

  // Intercept navigation links for transition
  document.querySelectorAll('a[data-transition]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      document.body.classList.add('navigating');
      setTimeout(() => {
        window.location.href = href;
      }, 350);
    });
  });
});
