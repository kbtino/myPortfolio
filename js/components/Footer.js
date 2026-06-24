/**
 * Footer.js — Pied de page
 *
 * Contenu : copyright, liens sociaux (GitHub, LinkedIn), mention "fait par".
 *
 * IMPORTANT : remplace les URLs des liens sociaux par tes vraies URLs.
 */

import { i18n } from '../utils/i18n.js';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    // Remplace par ton URL GitHub réelle
    href: 'https://github.com/bertin-anlovi',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/>
    </svg>`,
  },
  {
    name: 'LinkedIn',
    // Remplace par ton URL LinkedIn réelle
    href: 'https://linkedin.com/in/bertin-anlovi',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>`,
  },
];

export const Footer = {
  render() {
    const el = document.getElementById('footer');
    if (!el) return;

    const year = new Date().getFullYear();

    const socialLinks = SOCIAL_LINKS.map(({ name, href, icon }) => `
      <a
        class="footer__social-link"
        href="${href}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${name}"
        title="${name}"
      >${icon}</a>
    `).join('');

    el.innerHTML = `
      <div class="footer">
        <div class="footer__container">

          <p class="footer__copy">
            &copy; ${year}&nbsp;
            <span class="text-accent">Bertin Anlovi</span>.&nbsp;
            <span data-i18n="footer.rights">${i18n.t('footer.rights')}</span>
          </p>

          <nav class="footer__social" aria-label="Liens sociaux">
            ${socialLinks}
          </nav>

          <p class="footer__made font-mono">
            <span data-i18n="footer.made_by">${i18n.t('footer.made_by')}</span>
            &nbsp;<span class="text-accent">Bertin</span>
          </p>

        </div>
      </div>`;
  },
};
