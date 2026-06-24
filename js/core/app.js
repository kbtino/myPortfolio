/**
 * app.js — Point d'entrée de l'application
 *
 * Responsabilités :
 *   1. Restaurer les préférences (thème, langue) avant le premier rendu
 *   2. Initialiser les composants globaux (Navbar, Footer)
 *   3. Démarrer le routeur SPA
 */

import { Router }       from './router.js';
import { Navbar }       from '../components/Navbar.js';
import { Footer }       from '../components/Footer.js';
import { ThemeToggle }  from '../components/ThemeToggle.js';
import { i18n }         from '../utils/i18n.js';

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrolled  = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct       = maxScroll > 0 ? Math.round((scrolled / maxScroll) * 100) : 0;
    bar.style.width = `${pct}%`;
    bar.setAttribute('aria-valuenow', pct);
  }, { passive: true });
}

async function init() {
  // Préférences utilisateur : appliquées avant le rendu pour éviter le flash
  ThemeToggle.restore();
  await i18n.load();

  // Composants persistants (présents sur toutes les routes)
  Navbar.render();
  Footer.render();

  // Routeur : écoute hashchange et charge la bonne page
  Router.init();

  // Barre de progression de lecture (#scroll-progress déjà stylé dans reset.css)
  initScrollProgress();
}

document.addEventListener('DOMContentLoaded', init);
