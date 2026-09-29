import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Token guard for the shared primitives in components/ui.
 *
 * The primitives exist so pages stop hand-rolling colours. If a primitive
 * itself reaches for a raw palette hex (`text-[#3a6965]`, `bg-[#f4f1eb]`) or a
 * Tailwind `teal-*` shade (neon mint #5eead4 in dark mode), every page built
 * on it inherits the drift. Use the semantic tokens instead: `text-deep`,
 * `text-accent-text`, `bg-canvas`, `bg-card`, `border-divider`, `rust-*`,
 * `text-primary`/`secondary`/`muted`, or a tone from lib/categoryColors.ts.
 *
 * Scoped to components/ui on purpose: the rest of the tree still has raw hex
 * that the page sweep removes as each page moves onto these primitives.
 */

const UI_ROOT = join(process.cwd(), "components", "ui");

const collect = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return collect(full);
    if (!/\.(tsx?|jsx?)$/.test(entry.name) || entry.name.includes(".test.")) return [];
    return [full];
  });

const stripComments = (src: string): string =>
  src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");

/** An arbitrary Tailwind colour value written as a hex literal: `-[#abc]`, `-[#aabbcc]/50`. */
const RAW_HEX_CLASS = /-\[#[0-9a-fA-F]{3,8}\]/;
/** Any Tailwind teal shade: `text-teal-300`, `dark:ring-teal-400/40`. */
const TEAL_SHADE = /\bteal-\d/;
/** The founder-banned hues, and hues outside the palette. */
const OFF_PALETTE = /\b(?:amber|orange|tangerine|yellow|indigo|violet|sky|purple|pink|emerald|green|blue|cyan)-\d/;

const files = collect(UI_ROOT);

describe("components/ui token guard", () => {
  it("finds the primitives to scan", () => {
    const names = files.map((file) => relative(UI_ROOT, file)).sort();
    expect(names).toEqual(
      expect.arrayContaining([
        "Button.tsx",
        "Chip.tsx",
        "PageContainer.tsx",
        "PageHeader.tsx",
        "Section.tsx",
        "index.ts",
      ]),
    );
  });

  it.each(files.map((file) => [relative(process.cwd(), file), file]))(
    "%s uses no raw palette hex, teal shade or off-palette hue",
    (_name, file) => {
      const src = stripComments(readFileSync(file, "utf8"));
      expect(src.match(RAW_HEX_CLASS)?.[0], "raw hex colour class").toBeUndefined();
      expect(src.match(TEAL_SHADE)?.[0], "teal-* shade; use deep / accent-text").toBeUndefined();
      expect(src.match(OFF_PALETTE)?.[0], "off-palette hue").toBeUndefined();
    },
  );

  it("the patterns catch what they are meant to catch", () => {
    expect("text-[#3a6965]").toMatch(RAW_HEX_CLASS);
    expect("bg-[#f4f1eb]/90").toMatch(RAW_HEX_CLASS);
    expect("dark:text-teal-300").toMatch(TEAL_SHADE);
    expect("bg-amber-500").toMatch(OFF_PALETTE);
    expect("text-deep dark:text-accent-text bg-canvas").not.toMatch(RAW_HEX_CLASS);
    expect("text-deep dark:text-accent-text bg-canvas").not.toMatch(TEAL_SHADE);
  });
});

describe(".btn-primary is the brand CTA", () => {
  it("is the rust 600→700 gradient with white text, matching <Button>", () => {
    const globals = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");
    const rule = globals.match(/\.btn-primary\s*\{([^}]*)\}/)?.[1] ?? "";
    expect(rule).toContain("bg-gradient-to-b from-rust-600 to-rust-700");
    expect(rule).toContain("text-white");
    expect(rule).not.toMatch(/#3d3a36|stone-200/);
  });
});
