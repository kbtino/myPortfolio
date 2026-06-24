/**
 * observer.js — Animations au scroll via IntersectionObserver
 *
 * v1.0.0 — Stratégie hybride (évite le flash FOIUC) :
 *   1. Éléments déjà visibles au chargement → .is-visible immédiat (sync)
 *   2. Éléments hors écran → IO les surveille et déclenche à l'entrée en vue
 *
 * Appeler initScrollAnimations() après chaque navigation SPA.
 */

let _observer = null;

export function initScrollAnimations() {
  if (_observer) {
    _observer.disconnect();
    _observer = null;
  }

  // Sélectionne uniquement les éléments pas encore visibles
  const elements = [
    ...document.querySelectorAll(
      '.animate-fade-up:not(.is-visible), .animate-fade-left:not(.is-visible)'
    ),
  ];

  if (!elements.length) return;

  const belowFold = [];

  elements.forEach(el => {
    const { top } = el.getBoundingClientRect();
    if (top < window.innerHeight * 0.98) {
      // Dans le viewport → marque immédiatement (pas de flash)
      el.classList.add('is-visible');
    } else {
      belowFold.push(el);
    }
  });

  if (!belowFold.length) return;

  _observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          _observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );

  belowFold.forEach(el => _observer.observe(el));
}
