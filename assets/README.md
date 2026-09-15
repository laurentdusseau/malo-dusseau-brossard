# Assets MDB — un répertoire par page

| Dossier | Page |
|---------|------|
| `accueil/` | Accueil (hero) |
| `medias/` | Médias (photos + vidéos) |
| `partenaires/` | Partenaires (logos) |
| `apropos/` | À propos |
| `devenir-partenaire/` | Devenir partenaire |
| `ppt/` | Pages PPT (interne) |
| `preview/` | Previews (interne) |

## Médias — nomenclature

Fichiers dans `medias/` : `{année}_{site}_{numéro}.ext`  
(ex. `2026_valence_1.jpeg`, `2025_loureira_2.jpeg`, `2024_saintgalmier.mp4`).

Sans année (sessions) : `entrainement_1.jpg`.

Pour **exclure** une photo de la galerie sans la supprimer : ajouter `_old` dans le nom  
(ex. `2024_saintgalmier_1_old.jpg`). Le script `scripts/list-gallery-medias.mjs` et `js/site.js` ignorent ces fichiers.

## Originaux haute résolution

Les JPEG web de la galerie sont compressés (~1600 px). Les fichiers appareil photo se conservent dans **`medias-hr/`** (local + Hostinger). Ce dossier n’est pas lu par la galerie ; l’accès HTTP y est refusé (`.htaccess`).
