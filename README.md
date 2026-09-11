# Site officiel — Malo Dusseau Brossard (MDB)

Site **statique** HTML/CSS/JS pour malodusseaubrossard.com.

## Distinction projets

| | **MDB** (ce dépôt) | **LFL** (autre dépôt) |
|--|--|--|
| Produit | Malo Dusseau Brossard | Liberté Financière |
| Dossier local | `Malo-Sponsoring/site-web` | `LiberteFinanciere` |
| Stack | HTML statique | Next.js |
| Hébergement | Hostinger PHP/HTML → `public_html` | Hostinger Node.js |

**Ne pas** mélanger ce dépôt avec `libertefinanciere`.

## Lancer en local

```bash
cd site-web
npx --yes serve -p 5173
```

→ http://localhost:5173

## Déploiement Hostinger

Uploader / déployer le **contenu** de ce dépôt à la racine `public_html/` du site `malodusseaubrossard.com`.

## Médias (`assets/`)

Un **répertoire par page** (junction → `Malo-Sponsoring/assets/`) :

`accueil/` · `medias/` · `partenaires/` · `apropos/` · `devenir-partenaire/`

URL : `/assets/{page}/{fichier}` — voir `assets/README.md`.
