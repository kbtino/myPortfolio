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

async function init() {
  // Préférences utilisateur : appliquées avant le rendu pour éviter le flash
  ThemeToggle.restore();
  await i18n.load();

  // Composants persistants (présents sur toutes les routes)
  Navbar.render();
  Footer.render();

  // Routeur : écoute hashchange et charge la bonne page
  Router.init();
}

document.addEventListener('DOMContentLoaded', init);
