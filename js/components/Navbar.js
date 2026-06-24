/**
 * Navbar.js — Barre de navigation principale
 *
 * Responsabilités :
 *   - Rendre les liens de navigation avec état actif
 *   - Toggle thème dark/light
 *   - Toggle langue FR/EN
 *   - Menu hamburger responsive (mobile)
 *   - Ombre au scroll
 */

import { i18n }        from '../utils/i18n.js';
import { ThemeToggle } from './ThemeToggle.js';

const NAV_ITEMS = [
  { key: 'nav.home',       href: '#/' },
  { key: 'nav.about',      href: '#/about' },
  { key: 'nav.projects',   href: '#/projects' },
  { key: 'nav.skills',     href: '#/skills' },
  { key: 'nav.experience', href: '#/experience' },
  { key: 'nav.contact',    href: '#/contact' },
];

function getRoute() {
  return window.location.hash.replace('#', '') || '/';
}

function themeIcon(theme) {
  return theme === 'dark'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

function buildLinks(currentRoute) {
  return NAV_ITEMS.map(({ key, href }) => {
    const route   = href.replace('#', '') || '/';
    const isActive = route === currentRoute;
    return `
      <li role="listitem">
        <a
          class="navbar__link${isActive ? ' active' : ''}"
          href="${href}"
          data-i18n="${key}"
          aria-current="${isActive ? 'page' : 'false'}"
        >${i18n.t(key)}</a>
      </li>`;
  }).join('');
}

export const Navbar = {

  render() {
    const el = document.getElementById('navbar');
    if (!el) return;

    const theme = ThemeToggle.getCurrent();
    const lang  = i18n.getLang();

    el.innerHTML = `
      <nav class="navbar" role="navigation" aria-label="Navigation principale">
        <div class="navbar__container">

          <a class="navbar__logo" href="#/" aria-label="Bertin Anlovi — Accueil">
            <span class="text-accent">B</span>ertin<span class="text-accent">.</span>
          </a>

          <ul class="navbar__links" id="nav-links" role="list">
            ${buildLinks(getRoute())}
          </ul>

          <div class="navbar__actions">
            <button
              class="navbar__lang btn btn--ghost btn--sm"
              id="lang-toggle"
              aria-label="Changer la langue / Switch language"
              title="Switch to ${lang === 'fr' ? 'English' : 'Français'}"
            >${lang.toUpperCase()}</button>

            <button
              class="navbar__theme btn btn--icon btn--ghost"
              id="theme-toggle"
              aria-label="Changer le thème"
            >${themeIcon(theme)}</button>

            <button
              class="navbar__hamburger"
              id="hamburger"
              aria-label="Ouvrir le menu de navigation"
              aria-expanded="false"
              aria-controls="nav-links"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

        </div>
      </nav>`;

    this._bindEvents();
  },

  // Appelé par router.js après chaque navigation
  updateActiveLink(route) {
    document.querySelectorAll('.navbar__link').forEach(link => {
      const linkRoute = link.getAttribute('href').replace('#', '') || '/';
      const isActive  = linkRoute === route;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  },

  _bindEvents() {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('nav-links');

    // ── Hamburger ──────────────────────────────────────────
    hamburger?.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Ferme le menu mobile au clic sur un lien
    navLinks?.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger?.classList.remove('open');
        hamburger?.setAttribute('aria-expanded', 'false');
      });
    });

    // Ferme le menu mobile au clic en dehors
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar') && navLinks?.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger?.classList.remove('open');
        hamburger?.setAttribute('aria-expanded', 'false');
      }
    });

    // ── Toggle thème ───────────────────────────────────────
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      const next = ThemeToggle.toggle();
      document.getElementById('theme-toggle').innerHTML = themeIcon(next);
    });

    // ── Toggle langue ──────────────────────────────────────
    document.getElementById('lang-toggle')?.addEventListener('click', async () => {
      const next = i18n.getLang() === 'fr' ? 'en' : 'fr';
      await i18n.setLang(next);
      this.render(); // Re-rendu navbar avec nouvelle langue
      // Notifie le Router pour re-rendre la page dans la nouvelle langue
      window.dispatchEvent(new CustomEvent('lang-change'));
    });

    // ── Ombre au scroll ────────────────────────────────────
    // Remplace le listener précédent pour éviter les doublons
    window.removeEventListener('scroll', Navbar._onScroll);
    Navbar._onScroll = () => {
      document.querySelector('.navbar')
        ?.classList.toggle('navbar--scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', Navbar._onScroll, { passive: true });
  },
};
