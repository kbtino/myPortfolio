/**
 * ThemeToggle.js — Gestion du thème dark/light
 *
 * Principe :
 *   - restore() est appelé en premier dans app.js pour éviter le "flash"
 *   - La préférence est persistée dans localStorage
 *   - L'attribut data-theme sur <html> contrôle les CSS Custom Properties
 */

const STORAGE_KEY = 'theme';
const DEFAULT     = 'dark';

export const ThemeToggle = {
  restore() {
    const saved = localStorage.getItem(STORAGE_KEY) ?? DEFAULT;
    document.documentElement.setAttribute('data-theme', saved);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
    return next;
  },

  getCurrent() {
    return document.documentElement.getAttribute('data-theme') ?? DEFAULT;
  },
};
