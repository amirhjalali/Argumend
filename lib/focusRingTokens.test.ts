import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Keyboard focus rings go through one theme-aware token, `ring-focus`
 * (--focus-ring-rgb in globals.css), and that token has to stay visible.
 *
 * Before 2026-09-29 most rings were `focus-visible:ring-deep/40`: 1.8:1
 * against the parchment canvas and 1.4:1 against the dark one, so a fifth of
 * the site's tab stops (506 of 2,520 measured across 13 pages, both themes,
 * 390 and 1440 wide) had a focus indicator under WCAG's 3:1 non-text minimum.
 * See docs/reviews/2026-09-29-r2-a11y-dark.md.
 *
 * This file guards three things:
 *  1. The token exists in both themes and clears 3:1 against every surface
 *     a ring sits on (canvas, card, panel), computed from the CSS itself.
 *  2. No source file draws a focus ring in any other colour, faded or not,
 *     except the error ring on an invalid field.
 *  3. No dark-only focus-ring hex override creeps back in: the token already
 *     switches colour, and a second source of truth is how the ring drifted.
 */

const ROOT = process.cwd();
const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");

type Rgb = [number, number, number];

function luminance([r, g, b]: Rgb): number {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** The value of `--name-rgb: R G B;` inside the first block matching `selector {`. */
function channelVar(css: string, selector: string, name: string): Rgb {
  const start = css.indexOf(`${selector} {`);
  expect(start, `${selector} block in globals.css`).toBeGreaterThanOrEqual(0);
  const block = css.slice(start, css.indexOf("\n}", start));
  const match = block.match(new RegExp(`--${name}:\\s*(\\d+)\\s+(\\d+)\\s+(\\d+);`));
  expect(match, `--${name} in ${selector}`).toBeTruthy();
  return [Number(match![1]), Number(match![2]), Number(match![3])];
}

describe("focus ring token", () => {
  const css = read("app/globals.css");

  it("is defined for both themes and wired into Tailwind as `focus`", () => {
    const config = read("tailwind.config.ts");
    expect(config).toMatch(/focus:\s*"rgb\(var\(--focus-ring-rgb\) \/ <alpha-value>\)"/);
    channelVar(css, ":root", "focus-ring-rgb");
    channelVar(css, ".dark", "focus-ring-rgb");
    // The global outline for elements without their own ring uses it too.
    expect(css).toMatch(/:focus-visible\s*\{[^}]*outline:\s*2px solid rgb\(var\(--focus-ring-rgb\)\)/);
  });

  for (const theme of [":root", ".dark"] as const) {
    it(`clears 3:1 against the canvas, cards and panels in ${theme === ":root" ? "light" : "dark"} mode`, () => {
      const ring = channelVar(css, theme, "focus-ring-rgb");
      for (const surface of ["bg-canvas-rgb", "bg-card-rgb", "bg-panel-rgb"]) {
        const ratio = contrast(ring, channelVar(css, theme, surface));
        expect(ratio, `${theme} ring on --${surface}`).toBeGreaterThanOrEqual(3);
      }
    });
  }
});

const SCAN_ROOTS = ["app", "components", "lib"];
const SOURCE = /\.(tsx?|css)$/;

function sources(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    const rel = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      out.push(...sources(rel));
    } else if (SOURCE.test(entry.name) && !entry.name.includes(".test.")) {
      out.push(rel);
    }
  }
  return out;
}

/**
 * A ring colour on a focus variant: `focus-visible:ring-deep/40`,
 * `focus:ring-rust-500`, `has-[:focus-visible]:ring-[#4f7b77]`,
 * `dark:focus-visible:ring-[#6fa39e]`. Widths (`ring-2`), `ring-inset` and
 * `ring-offset-*` are not colours and are skipped.
 */
const FOCUS_RING_COLOUR =
  /(?<![\w-])((?:dark:)?(?:[\w-]+:)*?(?:focus|focus-visible|focus-within|has-\[:focus-visible\]|group-focus-visible|peer-focus-visible):ring-(?!\d|inset\b|offset-)([\w#[\]./-]+))/g;

const ALLOWED = new Set(["focus", "error"]);

describe("focus rings in source", () => {
  const files = SCAN_ROOTS.flatMap(sources);

  it("scans the app, components and lib trees", () => {
    expect(files.length).toBeGreaterThan(100);
  });

  it("all use the focus token (or the error ring on an invalid field)", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const src = read(file);
      for (const match of src.matchAll(FOCUS_RING_COLOUR)) {
        const [, whole, colour] = match;
        if (!ALLOWED.has(colour)) offenders.push(`${file}: ${whole}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
