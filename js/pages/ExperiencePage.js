/**
 * ExperiencePage.js — Page Expérience (#/experience)
 *
 * v0.8.0 — Timeline verticale bilingue :
 *   1. Expériences professionnelles (4 postes, ordre anti-chronologique)
 *   2. Formation & Distinctions (Licence EPL + Prix Huawei)
 *
 * Sécurité : toutes les chaînes insérées via sanitize()
 */

import { i18n }     from '../utils/i18n.js';
import { sanitize } from '../utils/sanitize.js';

// ── Expériences professionnelles (plus récent en premier) ─────
const WORK_ITEMS = [
  {
    type:    'work',
    current: true,
    period:  { fr: 'Mai 2026 — Présent',       en: 'May 2026 — Present'      },
    title:   { fr: 'Data Engineer Freelance',    en: 'Freelance Data Engineer'  },
    company: 'HflexSys',
    location:'Lomé, Togo',
    desc: {
      fr: 'Développement d\'un pipeline ETL de nettoyage et d\'agrégation de données de ventes. Automatisation de la détection des doublons, valeurs manquantes et anomalies avec Pandas et NumPy.',
      en: 'Development of an ETL pipeline for cleaning and aggregating sales data. Automated detection of duplicates, missing values and anomalies using Pandas and NumPy.',
    },
    tags: ['Python', 'Pandas', 'NumPy', 'Data Engineering'],
  },
  {
    type:    'work',
    current: false,
    period:  { fr: 'Jan. 2026 — Avr. 2026',    en: 'Jan. 2026 — Apr. 2026'   },
    title:   { fr: 'Stagiaire Développeur Backend', en: 'Backend Developer Intern' },
    company: 'HflexSys',
    location:'Lomé, Togo',
    desc: {
      fr: 'Conception du backend d\'une application de gestion de stock : Django REST Framework, authentification JWT, gestion des rôles. Modélisation et administration PostgreSQL. Projet en équipe de 4 développeurs.',
      en: 'Backend design for an inventory management application: Django REST Framework, JWT authentication, role management. PostgreSQL modeling and administration. Team project of 4 developers.',
    },
    tags: ['Django', 'DRF', 'PostgreSQL', 'JWT'],
  },
  {
    type:    'work',
    current: false,
    period:  { fr: 'Sept. 2025 — Nov. 2025',   en: 'Sept. 2025 — Nov. 2025'  },
    title:   { fr: 'Stagiaire Développeur Full Stack', en: 'Full Stack Developer Intern' },
    company: 'La Citoyenne Vie S.A.',
    location:'Lomé, Togo',
    desc: {
      fr: 'Développement d\'une application de gestion de rendez-vous avec frontend Angular et backend Django sécurisé. Intégration du traitement de données personnelles et base MySQL.',
      en: 'Development of an appointment management application with an Angular frontend and a secure Django backend. Personal data processing integration and MySQL database.',
    },
    tags: ['Angular', 'Django', 'MySQL', 'TypeScript'],
  },
  {
    type:    'work',
    current: false,
    period:  { fr: 'Nov. 2024 — Août 2025',    en: 'Nov. 2024 — Aug. 2025'   },
    title:   { fr: 'Stagiaire Systèmes & Réseaux', en: 'Systems & Networks Intern' },
    company: 'LARSI — Université de Lomé',
    location:'Lomé, Togo',
    desc: {
      fr: 'Participation au déploiement d\'un cluster de calcul haute performance (HPC) sous Rocky Linux. Configuration des équipements réseaux, mise en place du VPN et de l\'accès distant, installation d\'outils de calcul scientifique.',
      en: 'Contributed to deploying an HPC cluster under Rocky Linux. Network equipment configuration, VPN and remote access setup, scientific computing tools installation.',
    },
    tags: ['Linux', 'HPC', 'Rocky Linux', 'VPN', 'Networking'],
  },
];

// ── Formation & Distinctions ──────────────────────────────────
const EDU_ITEMS = [
  {
    type:    'education',
    current: false,
    period:  { fr: 'Oct. 2021 — Avr. 2025',   en: 'Oct. 2021 — Apr. 2025'   },
    title:   { fr: 'Licence Professionnelle',    en: 'Professional Bachelor\'s' },
    company: 'École Polytechnique de Lomé — Université de Lomé',
    location:'Lomé, Togo',
    desc: {
      fr: 'Spécialisation en Maintenance et Réseaux Informatiques. Mention Assez-Bien (13,59 / 20) · 183 crédits validés sur 180.',
      en: 'Specialization in Computer Maintenance and Networking. Mention Assez-Bien (13.59 / 20) · 183 credits validated out of 180.',
    },
    tags: ['Réseaux', 'Systèmes', 'Développement', 'Bases de données'],
    badge: { fr: 'Mention Assez-Bien', en: 'Mention Assez-Bien' },
  },
  {
    type:    'award',
    current: false,
    period:  { fr: '2024', en: '2024' },
    title:   { fr: 'Seeds for the Future — Compétition IA+IoT', en: 'Seeds for the Future — AI+IoT Competition' },
    company: 'Huawei ICT Academy',
    location:'Essaouira, Maroc',
    desc: {
      fr: 'Lauréat du programme Huawei Seeds for the Future. Représentation du Togo lors de la compétition internationale IA + IoT à Essaouira, Maroc. Thématiques : 5G, Cloud, IA embarquée.',
      en: 'Laureate of the Huawei Seeds for the Future program. Represented Togo at the international AI+IoT competition in Essaouira, Morocco. Topics: 5G, Cloud, embedded AI.',
    },
    tags: ['IA', 'IoT', '5G', 'Cloud'],
    badge: { fr: 'Représentant du Togo', en: 'Representing Togo' },
  },
];

// ── Couleurs par type ─────────────────────────────────────────
const TYPE_COLOR = {
  work:      'var(--accent)',
  education: 'var(--accent-2)',
  award:     '#f59e0b',
};

// ── Icônes de section ─────────────────────────────────────────
const ICON_BRIEFCASE = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="1.8" aria-hidden="true">
  <rect x="2" y="7" width="20" height="14" rx="2"/>
  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  <line x1="12" y1="12" x2="12" y2="12.01"/>
  <line x1="8" y1="12" x2="16" y2="12"/>
</svg>`;

const ICON_GRADUATION = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="1.8" aria-hidden="true">
  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
</svg>`;

// ── Builders ──────────────────────────────────────────────────
function buildItem(item, lang) {
  const title   = item.title[lang]   ?? item.title.fr;
  const desc    = item.desc[lang]    ?? item.desc.fr;
  const period  = item.period[lang]  ?? item.period.fr;
  const badge   = item.badge ? (item.badge[lang] ?? item.badge.fr) : null;
  const color   = TYPE_COLOR[item.type] ?? 'var(--accent)';

  const dotClass = item.current
    ? 'experience-item__dot experience-item__dot--current'
    : 'experience-item__dot';

  const periodBadge = item.current
    ? `<span class="experience-card__period experience-card__period--current tech-tag">${sanitize(period)}</span>`
    : `<span class="experience-card__period tech-tag">${sanitize(period)}</span>`;

  const mentionBadge = badge
    ? `<span class="experience-card__mention">${sanitize(badge)}</span>`
    : '';

  const tags = item.tags
    .map(t => `<span class="tech-tag">${sanitize(t)}</span>`)
    .join('');

  return `
    <div class="experience-item" style="--type-color:${color}">
      <div class="experience-item__aside">
        <div class="${dotClass}"></div>
        <div class="experience-item__line"></div>
      </div>
      <div class="experience-card">
        <div class="experience-card__header">
          <div class="experience-card__titles">
            <h4 class="experience-card__title">${sanitize(title)}</h4>
            <p class="experience-card__company">
              ${sanitize(item.company)}
              <span class="experience-card__location">· ${sanitize(item.location)}</span>
            </p>
          </div>
          ${periodBadge}
        </div>
        <p class="experience-card__desc">${sanitize(desc)}</p>
        ${mentionBadge}
        <div class="experience-card__tags">${tags}</div>
      </div>
    </div>`;
}

function buildSection(items, lang, sectionTitle, icon) {
  return `
    <section class="experience-page__section animate-fade-up">
      <h3 class="exp-section-title">
        <span class="exp-section-title__icon">${icon}</span>
        ${sanitize(sectionTitle)}
      </h3>
      <div class="experience-timeline">
        ${items.map(item => buildItem(item, lang)).join('')}
      </div>
    </section>`;
}

// ── Page ──────────────────────────────────────────────────────
export const ExperiencePage = {
  render(container) {
    const lang = i18n.getLang();

    container.innerHTML = `
      <div class="page experience-page">

        <header class="section-header animate-fade-up" style="--delay:0ms">
          <h2 class="section-title" data-i18n="experience.title">${i18n.t('experience.title')}</h2>
          <p class="section-subtitle" data-i18n="experience.subtitle">${i18n.t('experience.subtitle')}</p>
        </header>

        ${buildSection(
          WORK_ITEMS,
          lang,
          i18n.t('experience.work'),
          ICON_BRIEFCASE
        )}

        ${buildSection(
          EDU_ITEMS,
          lang,
          i18n.t('experience.education'),
          ICON_GRADUATION
        )}

      </div>`;
  },
};
