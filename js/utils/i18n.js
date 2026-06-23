/**
 * i18n.js — Moteur de traduction FR/EN
 *
 * Fonctionnement :
 *   1. load()    → détecte la langue (localStorage > navigateur > 'fr')
 *                  puis charge data/translations/{lang}.json
 *   2. t(key)    → accès à une clé imbriquée ('nav.home' → 'Accueil')
 *   3. setLang() → change la langue et met à jour les éléments [data-i18n]
 *
 * Utilisation dans le HTML : <span data-i18n="nav.home"></span>
 */

const SUPPORTED_LANGS = ['fr', 'en'];

let translations  = {};
let currentLang   = 'fr';

export const i18n = {

  async load(lang = null) {
    const saved   = localStorage.getItem('lang');
    const browser = navigator.language?.split('-')[0];

    currentLang = lang
      ?? saved
      ?? (SUPPORTED_LANGS.includes(browser) ? browser : 'fr');

    try {
      const res = await fetch(`data/translations/${currentLang}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      translations = await res.json();
    } catch {
      // Dégradation gracieuse : affiche les clés si les traductions sont indisponibles
      translations = {};
    }

    document.documentElement.setAttribute('lang', currentLang);
    localStorage.setItem('lang', currentLang);
  },

  // Résout une clé pointée : t('nav.home') → translations.nav.home
  t(key) {
    return key.split('.').reduce((obj, k) => obj?.[k], translations) ?? key;
  },

  getLang() {
    return currentLang;
  },

  async setLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    await this.load(lang);
    this.applyAll();
  },

  // Met à jour tous les éléments marqués avec data-i18n dans le DOM
  applyAll() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = this.t(el.dataset.i18n);
    });
  },
};
