# Changelog

Toutes les modifications notables de ce projet sont documentées ici.

Format : [Semantic Versioning](https://semver.org) | [Conventional Commits](https://www.conventionalcommits.org)

---

## [0.7.0] — 2026-06-24

### Added
- `js/pages/SkillsPage.js` — 4 catégories (Frontend, Backend, Data Engineering, Systèmes & Réseaux) avec barres de progression animées, section outils & environnements
- `css/components/skills-bar.css` — Composant `.skill-bar` réutilisable : animation `growBar` CSS (`cubic-bezier` 0→`--pct`), niveau coloré `--cat-color`, `prefers-reduced-motion` respecté
- `css/pages/skills.css` — Grille 2×2 responsive, cartes catégorie avec barre `border-top` colorée, section outils avec `.skills__tools-grid`
- `data/translations/fr.json` — Clés `skills.subtitle` et `skills.tools_title`
- `data/translations/en.json` — Clés `skills.subtitle` et `skills.tools_title`

### Notes
- Les niveaux (Expert / Avancé / Intermédiaire) sont bilingues : directement dans `CATEGORIES` en JS
- Les pourcentages reflètent les compétences réelles attestées par les projets du CV
- La section "Outils" utilise des `.tech-tag` sans barre (outils secondaires)

---

## [0.6.0] — 2026-06-24

### Added
- `data/projects.json` — 5 projets réels : pipeline de données, gestion de stock, gestion de rendez-vous, cluster HPC, portfolio
- `js/pages/ProjectsPage.js` — Grille de cartes avec filtres par catégorie (data / backend / fullstack / systems / frontend), chargement async, protection XSS, support FR/EN
- `css/components/cards.css` — Composant `.project-card` réutilisable : barre `border-top` colorée par catégorie via `--cat-color`, hover lift, étoile featured, tags
- `css/pages/projects.css` — Layout grille `auto-fill minmax(320px)`, boutons filtres pill, états loading/empty
- `data/translations/fr.json` — Clé `projects.subtitle` ajoutée
- `data/translations/en.json` — Clé `projects.subtitle` ajoutée

### Notes
- Mettre à jour `github` et `demo` dans `data/projects.json` lorsque les repos sont publics
- Le portfolio pointe sur `https://github.com/bertin-anlovi/portfolio` — à ajuster si différent
- Chaque carte affiche automatiquement la langue courante (FR/EN) sans re-fetch

---

## [0.5.0] — 2026-06-24

### Added
- `js/pages/AboutPage.js` — Bio, coordonnées cliquables, langues, diplôme EPL, 6 compétences personnelles, 3 blocs certifications (Cisco, Huawei, DataCamp)
- `css/pages/about.css` — Layout intro 2 colonnes, carte diplôme avec barre accent, grille soft-skills, grille certifications, badge "En cours" animé
- `data/translations/fr.json` — Section `about` complète (14 nouvelles clés)
- `data/translations/en.json` — Section `about` complète (14 nouvelles clés)

### Notes
- La carte Huawei met en avant la compétition internationale IA+IoT (Maroc 2024)
- Badge "En cours" avec animation `pulse` pour DataCamp Data Engineer Associate
- Mettre à jour les URLs GitHub/LinkedIn dans `AboutPage.js` si différentes de celles dans `Footer.js`

---

## [0.4.0] — 2026-06-24

### Added
- `js/pages/HomePage.js` — Hero complet : greeting, nom, rôle animé (classe `Typer`), description, CTAs, réseaux sociaux, photo/initiales, badges flottants, scroll indicator
- `css/components/hero.css` — Grille de fond, lueurs cyan/violet, anneau tournant (conic-gradient), badges flottants, animations fadeUp/fadeLeft/blink/float/spin
- `data/translations/fr.json` — Ajout `hero.cta_cv`
- `data/translations/en.json` — Ajout `hero.cta_cv`
- `js/components/Navbar.js` — Dispatch `lang-change` après toggle de langue
- `js/core/router.js` — Écoute `lang-change` → re-rend la page courante dans la nouvelle langue

### Notes
- Déposer la photo dans `assets/images/profile/photo.jpg` et décommenter le `<img>` dans `HomePage.js`
- Déposer le CV PDF dans `assets/cv/CV_Anlovi.pdf` pour activer le bouton téléchargement
- Mettre à jour les URLs GitHub/LinkedIn dans `HomePage.js` (lignes SOCIAL)

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
