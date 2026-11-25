// Builds public/og.png (1200x630) from the 3D thread render.
// Usage: node scripts/home-film/og-card.mjs [path/to/render.png]
// Type is EB Garamond (OFL), instanced from app/fonts at wght 400/500 into og-fonts/*.ttf.
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const fontDir = path.join(here, "og-fonts");

import { execFileSync } from "node:child_process";
// Text is outlined to SVG paths (python3 + fontTools, see og-text-paths.py) because
// librsvg in sharp ignores @font-face and has no EB Garamond installed.
const outline = (font, size, track, x, y, text) =>
  execFileSync("python3", [path.join(here, "og-text-paths.py"), path.join(fontDir, `og-garamond-${font}.ttf`), size, track, x, y, text]).toString().trim();

const sharp = createRequire(path.join(root, "package.json"))("sharp");
const src = process.argv[2] ??
  "/private/tmp/claude-501/-Users-amirjalali-argumend/22017951-9588-414f-8f81-7b8fa85006b0/scratchpad/film/lookdev/final-state-0-d.png";

const W = 1200, H = 630, PAPER = "#f4f1ec";
// Render is 3200x1800; scale so the tangle (about 1400 px tall) is ~520 px tall.
const scale = 0.375, rw = Math.round(3200 * scale), rh = Math.round(1800 * scale);
const dx = -20, dy = -22; // crop offsets inside the scaled render

let art = await sharp(src).resize(rw, rh).toBuffer();
// crop to the card window, replicating edge pixels where the render falls short
const left = Math.max(0, -dx), top = Math.max(0, -dy);
art = await sharp(art)
  .extract({ left, top, width: Math.min(W, rw - left), height: Math.min(H, rh - top) })
  .extend({ right: Math.max(0, W - Math.min(W, rw - left)), bottom: Math.max(0, H - Math.min(H, rh - top)), extendWith: "copy" })
  .toBuffer();

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <path fill="#3d3a36" d="${outline(500, 22, 7.5, 76, 104, "ARGUMEND")}"/>
  <rect x="76" y="150" width="44" height="3" fill="#a23b3b"/>
  <path fill="#3d3a36" d="${outline(500, 68, -0.4, 72, 272, "Find what the")}"/>
  <path fill="#3d3a36" d="${outline(500, 68, -0.4, 72, 346, "argument actually")}"/>
  <path fill="#3d3a36" d="${outline(500, 68, -0.4, 72, 420, "turns on.")}"/>
  <path fill="#564d45" d="${outline(400, 27, 0, 76, 516, "Maps of live disagreements. No winner named.")}"/>
</svg>`;

const out = path.join(root, "public/og.png");
await sharp({ create: { width: W, height: H, channels: 3, background: PAPER } })
  .composite([{ input: art }, { input: Buffer.from(svg) }])
  .png({ palette: true, quality: 92, effort: 10, colours: 256, dither: 0.6 })
  .toFile(out);
console.log("wrote", out);
