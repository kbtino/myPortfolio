# Bertin Anlovi — Portfolio

Portfolio professionnel de **ANLOVI Komla Bertin Mawutowu**, Data Engineer & Développeur Full Stack basé à Lomé, Togo.

## Stack

- HTML5 sémantique
- CSS3 avec Custom Properties (Design Tokens)
- JavaScript ES Modules — SPA Vanilla, zéro dépendance
- Routeur hash-based maison
- Système i18n FR/EN intégré

## Structure

```
portfolio/
├── index.html              # Point d'entrée unique (SPA)
├── css/                    # Styles modulaires
│   ├── base/               # reset, variables, typographie
│   ├── components/         # navbar, cards, boutons...
│   ├── pages/              # styles par route
│   └── utils/              # animations, responsive
├── js/                     # Logique applicative
│   ├── core/               # app.js, router.js
│   ├── components/         # Navbar, Footer, ThemeToggle...
│   ├── pages/              # une classe par route
│   └── utils/              # i18n, sanitize, validators...
├── data/                   # Contenu JSON découplé du code
│   └── translations/       # fr.json, en.json
└── assets/                 # Images et icônes
```

## Lancer le projet

Un serveur local est requis (ES Modules + fetch JSON).

```bash
# Option 1 — Node.js
npx serve .

# Option 2 — Python
python -m http.server 8080

# Option 3 — VS Code
# Installer "Live Server" → clic droit sur index.html → "Open with Live Server"
```

## Versioning

| Version | Description |
|---------|-------------|
| v0.1.0  | Initialisation — structure, HTML shell, scaffold JS/CSS |
| v0.2.0  | Fondations CSS (reset, variables design, typographie) |
| v0.3.0  | Navigation (Navbar responsive, Router SPA, Footer) |
| v0.4.0  | Page Accueil (hero section) |
| v0.5.0  | Page À propos |
| v0.6.0  | Page Projets (grille + filtres) |
| v0.7.0  | Page Compétences |
| v0.8.0  | Page Expérience (timeline) |
| v0.9.0  | Page Contact (formulaire sécurisé) |
| v1.0.0  | Dark mode, animations, SEO, Lighthouse 90+ |

Voir [CHANGELOG.md](CHANGELOG.md) pour le détail de chaque version.

## Auteur

**ANLOVI Komla Bertin Mawutowu**
Lomé, Togo
