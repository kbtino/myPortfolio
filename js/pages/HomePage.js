/**
 * HomePage.js — Page d'accueil (#/)
 *
 * Sections :
 *   - Hero : nom, rôle animé (typing), description, CTAs, photo, badges tech
 *
 * Pour ajouter ta photo : remplace le div.hero__photo-placeholder par
 *   <img src="assets/images/profile/photo.jpg" alt="Bertin Anlovi" loading="eager">
 * et dépose ta photo dans assets/images/profile/.
 *
 * Pour activer le téléchargement CV : dépose le fichier PDF dans
 *   assets/cv/CV_Anlovi.pdf
 */

import { i18n }     from '../utils/i18n.js';
import { sanitize } from '../utils/sanitize.js';

// ── Rôles affichés en boucle (typing animation) ───────────────
const ROLES = {
  fr: ['Data Engineer', 'Développeur Full Stack', 'Développeur Python', 'Développeur Angular'],
  en: ['Data Engineer', 'Full Stack Developer',   'Python Developer',   'Angular Developer'],
};

// ── Liens sociaux ─────────────────────────────────────────────
const SOCIAL = [
  {
    name: 'GitHub',
    href: 'https://github.com/bertin-anlovi',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/></svg>`,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/bertin-anlovi',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
];

// ── Classe Typer : animation de frappe / effacement ───────────
class Typer {
  constructor(el, roles, opts = {}) {
    this.el         = el;
    this.roles      = roles;
    this.speed      = opts.speed      ?? 80;
    this.eraseSpeed = opts.eraseSpeed ?? 45;
    this.pause      = opts.pause      ?? 2200;
    this.index      = 0;
    this.charIndex  = 0;
    this.isErasing  = false;
    this._timer     = null;
  }

  start() { this._tick(); }

  stop() { clearTimeout(this._timer); }

  _tick() {
    const word = this.roles[this.index];

    if (!this.isErasing) {
      this.el.textContent = word.slice(0, this.charIndex + 1);
      this.charIndex++;

      if (this.charIndex === word.length) {
        this._timer = setTimeout(() => {
          this.isErasing = true;
          this._tick();
        }, this.pause);
        return;
      }
    } else {
      this.el.textContent = word.slice(0, this.charIndex - 1);
      this.charIndex--;

      if (this.charIndex === 0) {
        this.isErasing = false;
        this.index = (this.index + 1) % this.roles.length;
      }
    }

    this._timer = setTimeout(
      () => this._tick(),
      this.isErasing ? this.eraseSpeed : this.speed
    );
  }
}

// ── Page ──────────────────────────────────────────────────────
export const HomePage = {
  _typer: null,

  render(container) {
    // Arrête l'animation précédente si on revient sur la page
    if (this._typer) { this._typer.stop(); this._typer = null; }

    const lang  = i18n.getLang();
    const roles = ROLES[lang] ?? ROLES.fr;

    const socialHTML = SOCIAL.map(({ name, href, icon }) => `
      <a
        class="hero__social-link"
        href="${href}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${sanitize(name)}"
        title="${sanitize(name)}"
      >${icon}</a>`).join('');

    container.innerHTML = `
      <section class="hero" aria-label="Section héro">

        <!-- Fond décoratif (grille + lueurs) -->
        <div class="hero__bg" aria-hidden="true">
          <div class="hero__grid"></div>
          <div class="hero__glow hero__glow--cyan"></div>
          <div class="hero__glow hero__glow--violet"></div>
        </div>

        <div class="hero__container">

          <!-- ── Zone texte ── -->
          <div class="hero__content">

            <p class="hero__greeting animate-fade-up" style="--delay:0ms">
              <span class="hero__line" aria-hidden="true"></span>
              <span data-i18n="hero.greeting">${i18n.t('hero.greeting')}</span>
              <span class="hero__line" aria-hidden="true"></span>
            </p>

            <h1 class="hero__name animate-fade-up" style="--delay:100ms">
              Bertin <span class="text-accent">Anlovi</span>
            </h1>

            <div class="hero__role-wrapper animate-fade-up" style="--delay:200ms" aria-live="polite" aria-atomic="true">
              <span class="hero__role-prefix">&lt;</span>
              <span id="typed-role" class="hero__role"></span>
              <span class="hero__cursor" aria-hidden="true">|</span>
              <span class="hero__role-prefix">/&gt;</span>
            </div>

            <p class="hero__subtitle animate-fade-up" style="--delay:300ms" data-i18n="hero.subtitle">
              ${i18n.t('hero.subtitle')}
            </p>

            <div class="hero__actions animate-fade-up" style="--delay:400ms">
              <a href="#/projects" class="btn btn--primary btn--lg">
                ${i18n.t('hero.cta_projects')}
              </a>
              <a
                href="assets/cv/CV_Anlovi.pdf"
                class="btn btn--outline btn--lg"
                download
                data-i18n="hero.cta_cv"
              >
                ${i18n.t('hero.cta_cv')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </a>
            </div>

            <nav class="hero__social animate-fade-up" style="--delay:500ms" aria-label="Réseaux sociaux">
              ${socialHTML}
            </nav>

          </div>

          <!-- ── Zone photo ── -->
          <div class="hero__visual animate-fade-left" style="--delay:200ms" aria-hidden="true">

            <div class="hero__photo-outer">
              <div class="hero__photo">
                <!--
                  Photo de profil :
                  Dépose ton image dans assets/images/profile/photo.jpg
                  puis remplace le span ci-dessous par :
                  <img src="assets/images/profile/photo.jpg" alt="Bertin Anlovi" loading="eager">
                -->
                <span class="hero__initials">BA</span>
              </div>
            </div>

            <!-- Badges tech flottants -->
            <span class="hero__badge hero__badge--1 tech-tag">Python</span>
            <span class="hero__badge hero__badge--2 tech-tag">Django</span>
            <span class="hero__badge hero__badge--3 tech-tag">Angular</span>
            <span class="hero__badge hero__badge--4 tech-tag">PostgreSQL</span>

          </div>

        </div>

        <!-- Indicateur de scroll -->
        <div class="hero__scroll" aria-hidden="true">
          <div class="hero__scroll-mouse">
            <div class="hero__scroll-wheel"></div>
          </div>
          <span class="hero__scroll-label">Scroll</span>
        </div>

      </section>`;

    // Lance l'animation de typing après insertion dans le DOM
    const roleEl = document.getElementById('typed-role');
    if (roleEl) {
      this._typer = new Typer(roleEl, roles);
      this._typer.start();
    }
  },
};
