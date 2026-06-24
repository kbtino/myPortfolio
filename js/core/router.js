/**
 * router.js — Routeur SPA basé sur window.location.hash
 *
 * Convention : #/route → charge la page correspondante.
 * Toute route inconnue redirige vers #/ (page d'accueil).
 *
 * Après chaque navigation, Navbar.updateActiveLink() est appelé
 * pour synchroniser l'indicateur de lien actif.
 */

import { Navbar }        from '../components/Navbar.js';
import { HomePage }      from '../pages/HomePage.js';
import { AboutPage }     from '../pages/AboutPage.js';
import { ProjectsPage }  from '../pages/ProjectsPage.js';
import { SkillsPage }    from '../pages/SkillsPage.js';
import { ExperiencePage } from '../pages/ExperiencePage.js';
import { ContactPage }   from '../pages/ContactPage.js';

const ROUTES = {
  '/':           HomePage,
  '/about':      AboutPage,
  '/projects':   ProjectsPage,
  '/skills':     SkillsPage,
  '/experience': ExperiencePage,
  '/contact':    ContactPage,
};

function getRoute() {
  const hash = window.location.hash.replace('#', '') || '/';
  return hash.startsWith('/') ? hash : `/${hash}`;
}

function navigate() {
  const route     = getRoute();
  const Page      = ROUTES[route] ?? ROUTES['/'];
  const container = document.getElementById('app');

  if (!container) return;

  container.innerHTML = '';
  Page.render(container);

  // Synchronise le lien actif dans la navbar
  Navbar.updateActiveLink(route);

  // Accessibilité : focus sur le contenu principal après navigation
  container.focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export const Router = {
  init() {
    window.addEventListener('hashchange', navigate);
    navigate(); // Route initiale au chargement
  },
};
