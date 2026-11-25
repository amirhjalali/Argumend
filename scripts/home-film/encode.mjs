// Encode the rendered PNG frames of the home film to WebP under byte budgets.
//
//   node scripts/home-film/encode.mjs --src <png root> --theme light
//
// <png root>/<theme>/{d,m}/NNN.png        -> public/home-film/v1/<theme>/{d,m}/NNN.webp
// <png root>/<theme>/stills-{d,m}/still-K.png -> public/home-film/v1/<theme>/still-K-{d,m}.webp
//
// Quality is chosen per set: a sample of frames estimates the largest quality
// that fits the budget, the whole set is encoded, and the quality steps down
// until the set fits. Stills step down one by one until each fits its cap.
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../..");
const require = createRequire(path.join(repo, "package.json"));
const sharp = require("sharp");

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]]);
    return acc;
  }, []),
);
const src = args.src;
const theme = args.theme ?? "light";
const out = path.join(repo, "public/home-film/v1", theme);
if (!src) throw new Error("--src <png root> is required");

const SETS = {
  d: { frames: 150, budget: 8 * 1024 * 1024, stillCap: 120 * 1024 },
  m: { frames: 75, budget: 3 * 1024 * 1024, stillCap: 60 * 1024 },
};
const MARGIN = 0.97; // stay a little under each budget

const SIZE = { d: [1600, 900], m: [720, 1280] };

async function encode(file, quality, variant) {
  const [width, height] = SIZE[variant];
  // frames may be rendered supersampled; scale down to the delivery size
  return sharp(file)
    .resize(width, height, { kernel: "lanczos3" })
    .webp({ quality, effort: 5, smartSubsample: true })
    .toBuffer();
}

async function encodeSet(dir, variant) {
  const { frames, budget } = SETS[variant];
  const names = (await readdir(dir)).filter((n) => /^\d{3}\.png$/.test(n)).sort();
  if (names.length !== frames) throw new Error(`${dir}: expected ${frames} frames, found ${names.length}`);
  const files = names.map((n) => path.join(dir, n));
  // estimate from every 8th frame
  const sample = files.filter((_, i) => i % 8 === 0);
  let quality = 90;
  for (; quality > 20; quality -= 4) {
    let bytes = 0;
    for (const f of sample) bytes += (await encode(f, quality, variant)).length;
    if ((bytes / sample.length) * frames <= budget * MARGIN) break;
  }
  for (;;) {
    const bufs = [];
    for (const f of files) bufs.push(await encode(f, quality, variant));
    const total = bufs.reduce((a, b) => a + b.length, 0);
    console.log(`${theme}/${variant}: q${quality} -> ${(total / 1048576).toFixed(2)} MB`);
    if (total <= budget || quality <= 20) {
      const dst = path.join(out, variant);
      await mkdir(dst, { recursive: true });
      await Promise.all(bufs.map((b, i) => writeFile(path.join(dst, names[i].replace(".png", ".webp")), b)));
      return { quality, total };
    }
    quality -= 3;
  }
}

async function encodeStills(dir, variant) {
  const cap = SETS[variant].stillCap;
  await mkdir(out, { recursive: true });
  const result = [];
  for (let k = 0; k <= 5; k += 1) {
    const file = path.join(dir, `still-${k}.png`);
    await stat(file);
    let quality = 92;
    let buf = await encode(file, quality, variant);
    while (buf.length > cap && quality > 30) {
      quality -= 3;
      buf = await encode(file, quality, variant);
    }
    await writeFile(path.join(out, `still-${k}-${variant}.webp`), buf);
    result.push(`${k}:q${quality}/${Math.round(buf.length / 1024)}KB`);
  }
  console.log(`${theme}/stills-${variant}: ${result.join(" ")}`);
}

for (const variant of ["d", "m"]) {
  const dir = path.join(src, theme, variant);
  try {
    await stat(dir);
  } catch {
    console.log(`skip ${theme}/${variant}: no frames at ${dir}`);
    continue;
  }
  await encodeSet(dir, variant);
  await encodeStills(path.join(src, theme, `stills-${variant}`), variant);
}
