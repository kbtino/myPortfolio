/**
 * AboutPage.js — Page À propos (#/about)
 *
 * Sections :
 *   1. Bio + photo + coordonnées
 *   2. Formation (EPL)
 *   3. Compétences personnelles
 *   4. Certifications
 *   5. CTAs
 */

import { i18n }     from '../utils/i18n.js';
import { sanitize } from '../utils/sanitize.js';

// ── Données : compétences personnelles ────────────────────────
const SOFT_SKILLS = [
  {
    fr: 'Gestion du temps', en: 'Time Management',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8" aria-hidden="true">
             <circle cx="12" cy="12" r="10"/>
             <polyline points="12 6 12 12 16 14"/>
           </svg>`,
  },
  {
    fr: 'Pensée critique', en: 'Critical Thinking',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8" aria-hidden="true">
             <path d="M12 2a7 7 0 0 1 7 7c0 3-1.8 5.5-4 6.6V18H9v-2.4C6.8 14.5 5 12 5 9a7 7 0 0 1 7-7z"/>
             <line x1="9" y1="21" x2="15" y2="21"/>
             <line x1="9" y1="18" x2="15" y2="18"/>
           </svg>`,
  },
  {
    fr: 'Autonomie', en: 'Autonomy',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8" aria-hidden="true">
             <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
           </svg>`,
  },
  {
    fr: 'Rigueur', en: 'Rigor',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8" aria-hidden="true">
             <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
             <polyline points="22 4 12 14.01 9 11.01"/>
           </svg>`,
  },
  {
    fr: 'Adaptabilité', en: 'Adaptability',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8" aria-hidden="true">
             <polyline points="17 1 21 5 17 9"/>
             <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
             <polyline points="7 23 3 19 7 15"/>
             <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
           </svg>`,
  },
  {
    fr: 'Travail d\'équipe', en: 'Teamwork',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8" aria-hidden="true">
             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
             <circle cx="9" cy="7" r="4"/>
             <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
             <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
           </svg>`,
  },
];

// ── Données : certifications ──────────────────────────────────
const CERTS = [
  {
    org:   'Cisco Networking Academy',
    abbr:  'CISCO',
    color: '#00bceb',
    items: [
      { fr: 'Python Essentielle',            en: 'Python Essentials',            year: '2025',   done: true  },
      { fr: 'Introduction à la cybersécurité', en: 'Introduction to Cybersecurity', year: '2025', done: true  },
    ],
  },
  {
    org:   'Huawei ICT Academy',
    abbr:  'HW',
    color: '#cf0a2c',
    items: [
      { fr: 'Seeds for the Future — IA, 5G, Cloud',   en: 'Seeds for the Future — AI, 5G, Cloud',   year: '2024', done: true },
      { fr: 'Compétition IA+IoT · Essaouira, Maroc',  en: 'AI+IoT Competition · Essaouira, Morocco', year: '2024', done: true },
    ],
  },
  {
    org:   'DataCamp',
    abbr:  'DC',
    color: '#03ef62',
    items: [
      { fr: 'Fondamentaux de l\'IA',        en: 'AI Fundamentals',        year: '2025', done: true  },
      { fr: 'Ingénieur de données Associé', en: 'Data Engineer Associate', year: null,  done: false },
    ],
  },
];

// ── Coordonnées ───────────────────────────────────────────────
const CONTACT_INFO = [
  {
    label: '📍',
    value: 'Lomé, Togo',
    href:  null,
  },
  {
    label: '✉',
    value: 'anlovibertin10@gmail.com',
    href:  'mailto:anlovibertin10@gmail.com',
  },
  {
    label: '📱',
    value: '+228 98 53 23 93',
    href:  'tel:+22898532393',
  },
];

// ── Helpers ───────────────────────────────────────────────────
function buildContactInfo() {
  return CONTACT_INFO.map(({ label, value, href }) => {
    const content = sanitize(value);
    return `
      <li class="about__info-item">
        <span class="about__info-icon" aria-hidden="true">${label}</span>
        ${href
          ? `<a href="${href}" class="about__info-link">${content}</a>`
          : `<span>${content}</span>`}
      </li>`;
  }).join('');
}

function buildSoftSkills(lang) {
  return SOFT_SKILLS.map(({ icon, fr, en }) => `
    <div class="about__soft-item">
      <div class="about__soft-icon">${icon}</div>
      <span class="about__soft-label">${lang === 'en' ? en : fr}</span>
    </div>`).join('');
}

function buildCerts(lang) {
  return CERTS.map(({ org, abbr, color, items }) => `
    <div class="about__cert-card">
      <div class="about__cert-header">
        <div class="about__cert-logo" style="background:${color}22; color:${color}; border-color:${color}44">
          ${sanitize(abbr)}
        </div>
        <span class="about__cert-org">${sanitize(org)}</span>
      </div>
      <ul class="about__cert-items">
        ${items.map(({ fr, en, year, done }) => `
          <li class="about__cert-item">
            <span class="about__cert-name">${sanitize(lang === 'en' ? en : fr)}</span>
            <span class="about__cert-badge ${done ? '' : 'about__cert-badge--progress'}">
              ${done ? (year ?? '') : i18n.t('about.cert_in_progress')}
            </span>
          </li>`).join('')}
      </ul>
    </div>`).join('');
}

// ── Rendu ─────────────────────────────────────────────────────
export const AboutPage = {
  render(container) {
    const lang = i18n.getLang();

    container.innerHTML = `
      <div class="page about-page">

        <!-- En-tête de page -->
        <header class="section-header animate-fade-up" style="--delay:0ms">
          <h2 class="section-title" data-i18n="about.title">${i18n.t('about.title')}</h2>
          <p class="section-subtitle" data-i18n="about.subtitle">${i18n.t('about.subtitle')}</p>
        </header>

        <!-- ── 1. Bio + Photo ── -->
        <section class="about__intro animate-fade-up" style="--delay:100ms">

          <!-- Colonne photo + infos -->
          <div class="about__photo-col">
            <div class="about__photo-wrapper">
              <div class="about__photo">
                <!--
                  Remplace par :
                  <img src="assets/images/profile/photo.jpg" alt="Bertin Anlovi" loading="lazy">
                -->
                <span class="about__initials" aria-hidden="true">BA</span>
              </div>
            </div>

            <ul class="about__info-list" aria-label="${i18n.t('about.contact_title')}">
              ${buildContactInfo()}
            </ul>

            <!-- Langues -->
            <div class="about__languages">
              <p class="about__languages-title" data-i18n="about.languages_title">
                ${i18n.t('about.languages_title')}
              </p>
              <div class="about__lang-item">
                <span class="about__lang-name" data-i18n="about.lang_fr">${i18n.t('about.lang_fr')}</span>
                <span class="about__lang-level" data-i18n="about.lang_fr_level">${i18n.t('about.lang_fr_level')}</span>
              </div>
              <div class="about__lang-item">
                <span class="about__lang-name" data-i18n="about.lang_en">${i18n.t('about.lang_en')}</span>
                <span class="about__lang-level" data-i18n="about.lang_en_level">${i18n.t('about.lang_en_level')}</span>
              </div>
            </div>
          </div>

          <!-- Colonne bio -->
          <div class="about__bio-col">
            <h3 class="about__bio-title" data-i18n="about.bio_title">${i18n.t('about.bio_title')}</h3>
            <p class="about__bio-text" data-i18n="about.bio_p1">${i18n.t('about.bio_p1')}</p>
            <p class="about__bio-text" data-i18n="about.bio_p2">${i18n.t('about.bio_p2')}</p>
          </div>

        </section>

        <!-- ── 2. Formation ── -->
        <section class="about__section animate-fade-up" style="--delay:200ms">
          <h3 class="about__section-title" data-i18n="about.edu_title">${i18n.t('about.edu_title')}</h3>

          <div class="about__edu-card">
            <div class="about__edu-accent"></div>
            <div class="about__edu-body">
              <div class="about__edu-top">
                <div>
                  <p class="about__edu-degree" data-i18n="about.edu_degree">${i18n.t('about.edu_degree')}</p>
                  <p class="about__edu-field"  data-i18n="about.edu_field">${i18n.t('about.edu_field')}</p>
                </div>
                <span class="about__edu-period tech-tag" data-i18n="about.edu_period">${i18n.t('about.edu_period')}</span>
              </div>
              <p class="about__edu-school" data-i18n="about.edu_school">${i18n.t('about.edu_school')}</p>
              <div class="about__edu-badges">
                <span class="about__edu-badge about__edu-badge--mention" data-i18n="about.edu_mention">
                  ${i18n.t('about.edu_mention')}
                </span>
                <span class="about__edu-badge" data-i18n="about.edu_credits">
                  ${i18n.t('about.edu_credits')}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 3. Compétences personnelles ── -->
        <section class="about__section animate-fade-up" style="--delay:300ms">
          <h3 class="about__section-title" data-i18n="about.soft_title">${i18n.t('about.soft_title')}</h3>
          <div class="about__soft-grid">
            ${buildSoftSkills(lang)}
          </div>
        </section>

        <!-- ── 4. Certifications ── -->
        <section class="about__section animate-fade-up" style="--delay:400ms">
          <h3 class="about__section-title" data-i18n="about.cert_title">${i18n.t('about.cert_title')}</h3>
          <div class="about__certs-grid">
            ${buildCerts(lang)}
          </div>
        </section>

        <!-- ── 5. CTAs ── -->
        <div class="about__cta animate-fade-up" style="--delay:500ms">
          <a href="assets/cv/CV_Anlovi.pdf" class="btn btn--primary btn--lg" download>
            <span data-i18n="about.cta_cv">${i18n.t('about.cta_cv')}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </a>
          <a href="#/projects" class="btn btn--outline btn--lg">
            <span data-i18n="about.cta_projects">${i18n.t('about.cta_projects')}</span>
          </a>
        </div>

      </div>`;
  },
};
