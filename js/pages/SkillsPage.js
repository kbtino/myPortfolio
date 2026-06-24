/**
 * SkillsPage.js — Page Compétences (#/skills)
 *
 * v0.7.0 — 4 catégories avec barres de progression animées :
 *   Frontend · Backend · Data Engineering · Systèmes & Réseaux
 *   + section "Outils & Environnements" (tech-tags)
 *
 * Sécurité : toutes les chaînes passent par sanitize()
 */

import { i18n }     from '../utils/i18n.js';
import { sanitize } from '../utils/sanitize.js';

// ── Icônes de catégorie ────────────────────────────────────────
const ICON_MONITOR = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="1.8" aria-hidden="true">
  <rect x="2" y="3" width="20" height="14" rx="2"/>
  <line x1="8" y1="21" x2="16" y2="21"/>
  <line x1="12" y1="17" x2="12" y2="21"/>
</svg>`;

const ICON_SERVER = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="1.8" aria-hidden="true">
  <rect x="2" y="2" width="20" height="8" rx="2"/>
  <rect x="2" y="14" width="20" height="8" rx="2"/>
  <line x1="6" y1="6" x2="6.01" y2="6"/>
  <line x1="6" y1="18" x2="6.01" y2="18"/>
</svg>`;

const ICON_DATABASE = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="1.8" aria-hidden="true">
  <ellipse cx="12" cy="5" rx="9" ry="3"/>
  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
</svg>`;

const ICON_TERMINAL = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="1.8" aria-hidden="true">
  <polyline points="4 17 10 11 4 5"/>
  <line x1="12" y1="19" x2="20" y2="19"/>
</svg>`;

// ── Données : catégories et compétences ────────────────────────
const CATEGORIES = [
  {
    key:   'frontend',
    fr:    'Frontend',
    en:    'Frontend',
    color: '#3b82f6',
    icon:  ICON_MONITOR,
    skills: [
      { name: 'HTML5',         pct: 88, fr: 'Expert',        en: 'Expert'       },
      { name: 'CSS3',          pct: 85, fr: 'Expert',        en: 'Expert'       },
      { name: 'JavaScript',    pct: 75, fr: 'Avancé',        en: 'Advanced'     },
      { name: 'Angular',       pct: 74, fr: 'Avancé',        en: 'Advanced'     },
      { name: 'TypeScript',    pct: 62, fr: 'Intermédiaire', en: 'Intermediate' },
    ],
  },
  {
    key:   'backend',
    fr:    'Backend',
    en:    'Backend',
    color: 'var(--accent-2)',
    icon:  ICON_SERVER,
    skills: [
      { name: 'Python 3',      pct: 88, fr: 'Expert',        en: 'Expert'       },
      { name: 'Django',        pct: 80, fr: 'Avancé',        en: 'Advanced'     },
      { name: 'Django REST',   pct: 78, fr: 'Avancé',        en: 'Advanced'     },
      { name: 'SQL',           pct: 74, fr: 'Avancé',        en: 'Advanced'     },
      { name: 'REST API / JWT',pct: 70, fr: 'Avancé',        en: 'Advanced'     },
    ],
  },
  {
    key:   'data',
    fr:    'Data Engineering',
    en:    'Data Engineering',
    color: 'var(--accent)',
    icon:  ICON_DATABASE,
    skills: [
      { name: 'Pandas',        pct: 80, fr: 'Avancé',        en: 'Advanced'     },
      { name: 'NumPy',         pct: 78, fr: 'Avancé',        en: 'Advanced'     },
      { name: 'Data Cleaning', pct: 82, fr: 'Avancé',        en: 'Advanced'     },
      { name: 'PostgreSQL',    pct: 70, fr: 'Avancé',        en: 'Advanced'     },
      { name: 'MySQL',         pct: 68, fr: 'Intermédiaire', en: 'Intermediate' },
    ],
  },
  {
    key:   'systems',
    fr:    'Systèmes & Réseaux',
    en:    'Systems & Networking',
    color: '#f59e0b',
    icon:  ICON_TERMINAL,
    skills: [
      { name: 'Linux / Bash',  pct: 74, fr: 'Avancé',        en: 'Advanced'     },
      { name: 'Réseaux CCNA',  pct: 70, fr: 'Avancé',        en: 'Advanced'     },
      { name: 'Git & GitHub',  pct: 80, fr: 'Avancé',        en: 'Advanced'     },
      { name: 'Rocky Linux',   pct: 64, fr: 'Intermédiaire', en: 'Intermediate' },
      { name: 'VPN',           pct: 60, fr: 'Intermédiaire', en: 'Intermediate' },
    ],
  },
];

// Outils & environnements (tech-tags, pas de barre)
const TOOLS = [
  'Git', 'GitHub', 'VS Code', 'Postman',
  'Linux CLI', 'Bash', 'Cisco Packet Tracer', 'VirtualBox',
];

// ── Builders ──────────────────────────────────────────────────
function buildBar(skill, lang, index) {
  const level = lang === 'fr' ? skill.fr : skill.en;
  return `
    <div class="skill-bar">
      <div class="skill-bar__info">
        <span class="skill-bar__name">${sanitize(skill.name)}</span>
        <span class="skill-bar__level">${sanitize(level)}</span>
      </div>
      <div class="skill-bar__track"
           role="progressbar"
           aria-valuenow="${skill.pct}"
           aria-valuemin="0"
           aria-valuemax="100"
           aria-label="${sanitize(skill.name)}">
        <div class="skill-bar__fill"
             style="--pct:${skill.pct}%; --delay:${index * 90}ms"></div>
      </div>
    </div>`;
}

function buildCategory(cat, lang, catIndex) {
  const title = lang === 'fr' ? cat.fr : cat.en;
  return `
    <div class="skills__category animate-fade-up"
         style="--cat-color:${cat.color}; --delay:${catIndex * 60}ms">
      <div class="skills__category-header">
        <div class="skills__category-icon">${cat.icon}</div>
        <h3 class="skills__category-title">${sanitize(title)}</h3>
      </div>
      <div class="skills__bars">
        ${cat.skills.map((s, i) => buildBar(s, lang, i)).join('')}
      </div>
    </div>`;
}

// ── Page ──────────────────────────────────────────────────────
export const SkillsPage = {
  render(container) {
    const lang = i18n.getLang();

    container.innerHTML = `
      <div class="page skills-page">

        <header class="section-header animate-fade-up" style="--delay:0ms">
          <h2 class="section-title" data-i18n="skills.title">${i18n.t('skills.title')}</h2>
          <p class="section-subtitle" data-i18n="skills.subtitle">${i18n.t('skills.subtitle')}</p>
        </header>

        <!-- ── Grille des 4 catégories ── -->
        <div class="skills__grid">
          ${CATEGORIES.map((cat, i) => buildCategory(cat, lang, i)).join('')}
        </div>

        <!-- ── Outils & environnements ── -->
        <section class="skills__tools animate-fade-up" style="--delay:300ms">
          <h3 class="skills__tools-title" data-i18n="skills.tools_title">
            ${i18n.t('skills.tools_title')}
          </h3>
          <div class="skills__tools-grid">
            ${TOOLS.map(t => `<span class="tech-tag">${sanitize(t)}</span>`).join('')}
          </div>
        </section>

      </div>`;
  },
};
