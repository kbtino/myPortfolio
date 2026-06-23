/**
 * helpers.js — Utilitaires purs sans effets de bord
 */

// Limite le nombre d'appels d'une fonction sur une période donnée
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Formate une date selon la langue active du portfolio
export function formatDate(dateStr, lang = 'fr') {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year:  'numeric',
    month: 'long',
  });
}

// Génère un identifiant unique simple (non cryptographique)
export function uid(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
