# Changelog

Toutes les modifications notables de ce projet sont documentées ici.

Format : [Semantic Versioning](https://semver.org) | [Conventional Commits](https://www.conventionalcommits.org)

---

## [1.0.0] — 2026-06-24 — Release

### Added
- `js/utils/observer.js` — IntersectionObserver : stratégie hybride (visible → `.is-visible` immédiat, hors-écran → IO), évite le FOIUC (Flash Of Invisible Unstyled Content)
- `css/utils/animations.css` — Système d'animation complet : keyframes `fadeUp`/`fadeLeft`, classes `.animate-fade-up/.animate-fade-left` + état `.is-visible`, `.section-header`, `prefers-reduced-motion`
- `js/core/app.js` — `initScrollProgress()` : mise à jour de `#scroll-progress` au scroll (passive listener, aria-valuenow dynamique)
- `index.html` — `<meta name="theme-color">` dark/light, commentaires pour `og:url` et `og:image`

### Changed
- `js/core/router.js` — Import `initScrollAnimations`, appelé après chaque navigation (y compris `lang-change`)
- `js/pages/ProjectsPage.js` — Import `initScrollAnimations`, appelé après le chargement async des cartes
- `css/components/hero.css` — Keyframes `fadeUp`/`fadeLeft` et classes `.animate-fade-up/.animate-fade-left` retirés (migrés dans `animations.css`)

### Fonctionnement de l'animation
1. Chaque page est rendue → `initScrollAnimations()` appelé
2. Éléments dans le viewport → `.is-visible` ajouté **synchronement** (pas de flash)
3. Éléments hors écran → IO les surveille → `.is-visible` au scroll
4. `.animate-fade-up.is-visible` → `@keyframes fadeUp` avec `--delay` CSS custom property

### SEO — actions restantes après déploiement
- Renseigner `og:url` avec l'URL de production
- Créer `assets/og-preview.png` (1200×630px, screenshot du portfolio) et renseigner `og:image`
- Soumettre le sitemap dans Google Search Console

---

## [0.9.0] — 2026-06-24

### Added
- `js/pages/ContactPage.js` — Formulaire sécurisé : honeypot anti-bot, rate limiting 30 s, validation par champ (blur + submit), envoi AJAX FormSubmit, spinner de chargement, messages de statut succès/erreur
- `css/pages/contact.css` — Grille 2 colonnes (info | form), cartes de coordonnées, socials pills, badge disponibilité animé, états `.invalid` + focus, spinner `@keyframes contactSpin`, messages statut colorés
- `data/translations/fr.json` — Section contact complète (19 nouvelles clés)
- `data/translations/en.json` — Section contact complète (19 nouvelles clés)

### Sécurité (OWASP)
- **A03 Injection / XSS** : `sanitize()` sur tout contenu affiché, aucune donnée utilisateur insérée via `innerHTML` en brut
- **Honeypot** : champ `_honey` caché par CSS (`position: absolute; left: -9999px`), pas `display:none` (détectable par les bots)
- **Rate limiting** : 30 s minimum entre deux envois (timestamp JS côté client)
- **Pas de données sensibles** : aucune clé API, aucun token dans le code
- **FormSubmit AJAX** : POST JSON vers `formsubmit.co`, reCAPTCHA désactivé côté serveur (`_captcha: false`)

### Notes
- **Activation requise** : FormSubmit envoie un e-mail de confirmation à `bertino@hflexsys.com` lors du premier message — cliquer le lien pour activer
- Mettre à jour l'URL LinkedIn dans `ContactPage.js` (SOCIAL_LINKS) lorsque disponible
- Le rate limiting est côté client uniquement (protection UX, pas sécuritaire absolue)

---

## [0.8.0] — 2026-06-24

### Added
- `js/pages/ExperiencePage.js` — Timeline bilingue : 4 postes professionnels + Licence EPL + Prix Huawei, dot animé pour le poste actuel, badges "Mention" et "Représentant du Togo"
- `css/components/timeline.css` — Composant `.experience-item` (flex aside+carte), dot pulsant pour poste actuel, ligne de connexion dégradée, `.experience-card` avec barre gauche `--type-color`
- `css/pages/experience.css` — Layout sections, `.exp-section-title` avec barre dégradée et icône
- `data/translations/fr.json` — Clé `experience.subtitle` + libellé `education` mis à jour
- `data/translations/en.json` — Clé `experience.subtitle` + libellé `education` mis à jour

### Notes
- Couleurs par type : Cyan → travail, Violet → formation, Ambre → distinction
- `color-mix()` utilisé pour le halo du dot actuel, fallback CSS prévu pour les anciens navigateurs
- Les données sont hardcodées dans le JS (pas de JSON externe) — mise à jour directe dans `WORK_ITEMS` / `EDU_ITEMS`

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
