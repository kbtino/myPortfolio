# Changelog

Toutes les modifications notables de ce projet sont documentées ici.

Format : [Semantic Versioning](https://semver.org) | [Conventional Commits](https://www.conventionalcommits.org)

---

## [0.3.0] — 2026-06-24

### Added
- `js/components/Navbar.js` — Navbar complète : liens actifs, hamburger mobile, toggle thème, toggle FR/EN, ombre au scroll
- `js/components/Footer.js` — Footer avec liens sociaux (GitHub, LinkedIn), copyright dynamique
- `js/core/router.js` — Import Navbar + appel `updateActiveLink()` après chaque navigation
- `css/components/navbar.css` — Glassmorphism, animation hamburger → croix, menu mobile déroulant
- `css/components/footer.css` — Flex responsive, hover sur icônes sociaux
- `css/utils/responsive.css` — Breakpoints sm/md/lg, réduction typographique mobile, `prefers-reduced-motion`

### Notes
- Mettre à jour les URLs GitHub et LinkedIn dans `js/components/Footer.js`
- La Navbar se re-rend automatiquement lors du changement de langue (i18n)
- Le lien actif est mis à jour par `Router` après chaque navigation (pas de listener dupliqué)

---

## [0.2.0] — 2026-06-24

### Added
- `css/base/variables.css` — Design tokens complets : couleurs dark/light, typographie, espacement, radius, ombres, transitions, layout
- `css/base/reset.css` — Modern CSS Reset : box model universel, antialiasing, focus accessible, squelette `.page` et `.page__placeholder`
- `css/base/typography.css` — Échelle typographique complète, patterns `.section-title` / `.section-subtitle` / `.tech-tag` réutilisables sur toutes les pages
- `css/components/buttons.css` — Système de boutons : 3 variantes (primary, outline, ghost), 2 tailles (sm, lg), états disabled et focus

### Details
- Thème dark : fond `#0a0a0f`, accent cyan `#00d4ff`, accent secondaire violet `#7c3aed`
- Thème light : fond `#f8fafc`, accent cyan `#0099bb` — activé via `data-theme="light"` sur `<html>`
- `.section-title::after` : ligne dégradée cyan→violet automatique sous chaque titre
- Transition fluide thème dark↔light sans flash (CSS Custom Properties + transition body)

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
