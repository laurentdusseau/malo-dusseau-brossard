/**
 * Liste les photos galerie dans assets/medias.
 * Tout fichier dont le nom contient "old" est exclu
 * (ex. 2024_saintgalmier_1_old.jpg).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const medias = path.join(root, "assets/medias");
const OLD = /_old/i;
const IMAGE = /\.(jpe?g|png|webp)$/i;
const SKIP = /(?:_poster|\.mp4$)/i;

const PREFIX = {
  "2026_valence": "valence",
  "2026_area47": "area47",
  entrainement: "entrainement",
  "2025_loureira": "loureira",
  "2025_monthey": "monthey",
  "2025_ainsa": "ainsa",
  "2024_saintgalmier": "saintgalmier",
  "2025_bouxwiller": "bouxwiller",
};

const groups = {};
for (const name of fs.readdirSync(medias)) {
  if (!IMAGE.test(name) || SKIP.test(name)) continue;
  if (OLD.test(name)) {
    console.log("old   ", name);
    continue;
  }
  const prefix = Object.keys(PREFIX).find((p) => name.startsWith(p + "_") || name.startsWith(p + "."));
  if (!prefix) continue;
  const key = PREFIX[prefix];
  (groups[key] ||= []).push("assets/medias/" + name);
}

for (const key of Object.keys(groups)) {
  groups[key].sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  console.log(key + ":", groups[key].length);
  for (const src of groups[key]) console.log("  ", src);
}
