/**
 * ProjectsPage.js — Page Projets (#/projects)
 *
 * v0.6.0 — Grille de cartes avec filtres par catégorie :
 *   - Chargement async data/projects.json
 *   - Filtres par catégorie (all / data / backend / fullstack / systems / frontend)
 *   - Cartes protégées XSS via sanitize()
 *   - Support FR/EN complet via i18n.getLang()
 */

import { i18n }     from '../utils/i18n.js';
import { sanitize } from '../utils/sanitize.js';

// ── Filtres ───────────────────────────────────────────────────
const FILTERS = [
  { key: 'all',       fr: 'Tous',       en: 'All'        },
  { key: 'data',      fr: 'Data',       en: 'Data'       },
  { key: 'backend',   fr: 'Backend',    en: 'Backend'    },
  { key: 'fullstack', fr: 'Full Stack', en: 'Full Stack' },
  { key: 'systems',   fr: 'Systèmes',   en: 'Systems'    },
  { key: 'frontend',  fr: 'Frontend',   en: 'Frontend'   },
];

const CAT_COLORS = {
  data:      'var(--accent)',
  backend:   'var(--accent-2)',
  fullstack: '#10b981',
  systems:   '#f59e0b',
  frontend:  '#3b82f6',
};

// ── Icônes SVG ────────────────────────────────────────────────
const ICON_FOLDER = `<svg width="36" height="36" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="1.5" aria-hidden="true">
  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
</svg>`;

const ICON_STAR = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
</svg>`;

const ICON_GITHUB = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.57v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.19.69.8.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
</svg>`;

const ICON_EXTERNAL = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  <polyline points="15 3 21 3 21 9"/>
  <line x1="10" y1="14" x2="21" y2="3"/>
</svg>`;

// ── Builders ──────────────────────────────────────────────────
function buildFilters(lang) {
  return FILTERS.map(({ key, fr, en }) => {
    const label = lang === 'fr' ? fr : en;
    return `<button class="projects__filter-btn${key === 'all' ? ' active' : ''}"
      data-filter="${key}" type="button">${label}</button>`;
  }).join('');
}

function buildCard(project, lang, index) {
  const title  = typeof project.title === 'object'       ? (project.title[lang]       ?? project.title.fr)       : String(project.title);
  const desc   = typeof project.description === 'object' ? (project.description[lang] ?? project.description.fr) : String(project.description);
  const period = typeof project.period === 'object'      ? (project.period[lang]       ?? project.period.fr)      : String(project.period);

  const catColor = CAT_COLORS[project.category] ?? 'var(--border)';
  const delay    = index * 80;

  const tags = project.tags
    .map(t => `<span class="tech-tag">${sanitize(t)}</span>`)
    .join('');

  const featured = project.featured
    ? `<span class="project-card__featured" title="${lang === 'fr' ? 'À la une' : 'Featured'}">${ICON_STAR}</span>`
    : '<span></span>';

  const githubBtn = project.github
    ? `<a href="${project.github}" class="btn btn--ghost btn--sm"
           target="_blank" rel="noopener noreferrer"
           aria-label="${lang === 'fr' ? 'Voir le code source' : 'View source code'}"
         >${ICON_GITHUB} Code</a>`
    : '';

  const demoBtn = project.demo
    ? `<a href="${project.demo}" class="btn btn--ghost btn--sm"
           target="_blank" rel="noopener noreferrer"
           aria-label="${lang === 'fr' ? 'Voir la démo' : 'View demo'}"
         >${ICON_EXTERNAL} Demo</a>`
    : '';

  const actions = (githubBtn || demoBtn)
    ? `<div class="project-card__actions">${githubBtn}${demoBtn}</div>`
    : '';

  return `
    <article
      class="project-card animate-fade-up"
      data-category="${sanitize(project.category)}"
      style="--delay:${delay}ms; --cat-color:${catColor}"
      aria-label="${sanitize(title)}"
    >
      <div class="project-card__head">
        <div class="project-card__folder">${ICON_FOLDER}</div>
        ${featured}
      </div>
      <h3 class="project-card__title">${sanitize(title)}</h3>
      <p class="project-card__meta">${sanitize(project.company)} · ${sanitize(period)}</p>
      <p class="project-card__desc">${sanitize(desc)}</p>
      <div class="project-card__tags">${tags}</div>
      ${actions}
    </article>`;
}

function buildGrid(projects, lang) {
  if (!projects.length) {
    return `<p class="projects__empty">${lang === 'fr' ? 'Aucun projet disponible.' : 'No projects available.'}</p>`;
  }
  return projects.map((p, i) => buildCard(p, lang, i)).join('');
}

// ── Page ──────────────────────────────────────────────────────
export const ProjectsPage = {

  render(container) {
    const lang = i18n.getLang();

    container.innerHTML = `
      <div class="page projects-page">

        <header class="section-header animate-fade-up" style="--delay:0ms">
          <h2 class="section-title" data-i18n="projects.title">${i18n.t('projects.title')}</h2>
          <p class="section-subtitle" data-i18n="projects.subtitle">${i18n.t('projects.subtitle')}</p>
        </header>

        <nav class="projects__filters animate-fade-up" style="--delay:100ms"
             aria-label="${lang === 'fr' ? 'Filtrer les projets' : 'Filter projects'}">
          ${buildFilters(lang)}
        </nav>

        <div class="projects__grid" id="projects-grid" aria-live="polite">
          <p class="projects__loading">${lang === 'fr' ? 'Chargement…' : 'Loading…'}</p>
        </div>

      </div>`;

    this._load(container, lang);
  },

  async _load(container, lang) {
    try {
      const res      = await fetch('data/projects.json');
      const projects = await res.json();
      const grid     = container.querySelector('#projects-grid');
      if (!grid) return;

      grid.innerHTML = buildGrid(projects, lang);
      this._bindFilters(container, lang);
    } catch {
      const grid = container.querySelector('#projects-grid');
      if (grid) {
        grid.innerHTML = `<p class="projects__empty">${lang === 'fr' ? 'Erreur de chargement.' : 'Failed to load projects.'}</p>`;
      }
    }
  },

  _bindFilters(container, lang) {
    const buttons  = container.querySelectorAll('.projects__filter-btn');
    const grid     = container.querySelector('#projects-grid');
    const noResult = lang === 'fr' ? 'Aucun projet dans cette catégorie.' : 'No projects in this category.';

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        buttons.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));

        let visible = 0;
        container.querySelectorAll('.project-card').forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('project-card--hidden', !show);
          if (show) visible++;
        });

        let emptyMsg = grid.querySelector('.projects__empty');
        if (visible === 0) {
          if (!emptyMsg) {
            emptyMsg = document.createElement('p');
            emptyMsg.className = 'projects__empty';
            grid.appendChild(emptyMsg);
          }
          emptyMsg.textContent = noResult;
        } else if (emptyMsg) {
          emptyMsg.remove();
        }
      });
    });
  },
};
