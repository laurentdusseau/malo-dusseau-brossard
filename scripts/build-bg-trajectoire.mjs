import sharp from "sharp";

const src = "assets/devenir-partenaire/_ref/p04.png";
const out = "assets/devenir-partenaire/bg-trajectoire.jpg";

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;
const px = Buffer.from(data);
const idx = (x, y) => (y * w + x) * 4;

const mask = new Uint8Array(w * h);

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = idx(x, y);
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum > 215 && Math.abs(r - g) < 25 && Math.abs(g - b) < 25) mask[y * w + x] = 1;
    if (r > 180 && g < 80 && b < 80) mask[y * w + x] = 1;
  }
}

// Jersey inset (top-right) — wiped so HTML figure sits clean
for (let y = 40; y < 360; y++) {
  for (let x = 1380; x < 1900; x++) mask[y * w + x] = 1;
}

// Bottom cards / UI plates
for (let y = Math.floor(h * 0.55); y < h; y++) {
  for (let x = 40; x < w - 40; x++) {
    const i = idx(x, y);
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum > 100) mask[y * w + x] = 1;
    if (r > 160 && g < 90 && b < 90) mask[y * w + x] = 1;
  }
}

const mask2 = new Uint8Array(mask);
for (let y = 1; y < h - 1; y++) {
  for (let x = 1; x < w - 1; x++) {
    if (mask[y * w + x]) continue;
    let n = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) n += mask[(y + dy) * w + (x + dx)];
    }
    if (n >= 3) mask2[y * w + x] = 1;
  }
}

for (let pass = 0; pass < 32; pass++) {
  let changed = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const m = y * w + x;
      if (!mask2[m]) continue;
      let rs = 0;
      let gs = 0;
      let bs = 0;
      let c = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const xx = x + dx;
          const yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
          if (mask2[yy * w + xx]) continue;
          const i = idx(xx, yy);
          rs += px[i];
          gs += px[i + 1];
          bs += px[i + 2];
          c++;
        }
      }
      if (c > 0) {
        const i = idx(x, y);
        px[i] = Math.round(rs / c);
        px[i + 1] = Math.round(gs / c);
        px[i + 2] = Math.round(bs / c);
        mask2[m] = 0;
        changed++;
      }
    }
  }
  if (changed === 0) break;
  if (pass % 4 === 0) console.log("pass", pass, "filled", changed);
}

await sharp(px, { raw: { width: w, height: h, channels: 4 } })
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(out);

await sharp(out).resize(960, 540).toFile("assets/devenir-partenaire/_ref/probe-bg-final.jpg");
console.log("wrote", out);
