# Changelog

Toutes les modifications notables de ce projet sont documentées ici.

Format : [Semantic Versioning](https://semver.org) | [Conventional Commits](https://www.conventionalcommits.org)

---

## [0.1.0] — 2026-06-23

### Added
- Structure complète de répertoires (css, js, data, assets)
- Shell HTML5 (`index.html`) — sémantique, accessible, bilingue-ready
- Pipeline CSS : `main.css` avec imports ordonnés (base → composants → pages → utils)
- Scaffold JS ES Modules : core (app, router) + stubs composants/pages/utils
- Routeur SPA hash-based (`router.js`) avec 6 routes
- Moteur i18n FR/EN (`i18n.js`) avec persistence localStorage
- Utilitaire de protection XSS (`sanitize.js`)
- Validateurs de formulaire (`validators.js`)
- Gestion du thème dark/light (`ThemeToggle.js`) avec persistence
- Traductions initiales FR/EN (`data/translations/`)
- `.gitignore` web project
- `README.md` avec instructions de démarrage
