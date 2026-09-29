import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Token guard for the Learn library (2026-09-29): the two templates and every
 * page moved onto them. Same rules as the components/ui guard
 * (lib/uiPrimitiveTokens.test.ts): no raw palette hex in a class, no Tailwind
 * `teal-*` shade (neon mint in dark mode), no off-palette hue, and no crux
 * crimson or rust used to label a section. Use `text-deep`,
 * `text-accent-text`, `bg-canvas`, `border-divider`, the text tokens, or a
 * tone from lib/categoryColors.ts.
 */

const LEARN_COMPONENTS = readdirSync(join(process.cwd(), "components", "learn"))
  .filter((name) => /\.tsx?$/.test(name) && !name.includes(".test."))
  .map((name) => `components/learn/${name}`);

const LEARN_FILES = [
  ...LEARN_COMPONENTS,
  "app/learn/page.tsx",
  "app/questions/page.tsx",
  "app/questions/[slug]/page.tsx",
  "app/questions/QuestionsSearch.tsx",
  "app/blog/page.tsx",
  "app/blog/[slug]/page.tsx",
  "app/guides/[id]/page.tsx",
  "app/concepts/[slug]/page.tsx",
  "app/fallacies/page.tsx",
  "app/fallacies/[slug]/page.tsx",
  "components/TableOfContents.tsx",
  "app/glossary/page.tsx",
  "app/research/page.tsx",
  "app/for-educators/page.tsx",
];

const stripComments = (src: string): string =>
  src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");

const RAW_HEX_CLASS = /-\[#[0-9a-fA-F]{3,8}\]/;
const TEAL_SHADE = /\bteal-\d/;
const OFF_PALETTE =
  /\b(?:amber|orange|tangerine|yellow|indigo|violet|sky|purple|pink|emerald|green|blue|cyan)-\d/;
/** Crimson and rust are meanings (a crux, the CTA/proponent), not decoration. */
const CRUX_OR_RUST_CHROME = /\b(?:text|bg|border)-(?:crux|rust)(?:-\d+)?\b/;

describe("Learn token guard", () => {
  it("covers the two templates", () => {
    expect(LEARN_FILES).toEqual(
      expect.arrayContaining(["components/learn/ArticleLayout.tsx", "components/learn/CollectionIndex.tsx"]),
    );
  });

  it.each(LEARN_FILES)("%s uses tokens only", (file) => {
    const src = stripComments(readFileSync(join(process.cwd(), file), "utf8"));
    expect(src.match(RAW_HEX_CLASS)?.[0], "raw hex colour class").toBeUndefined();
    expect(src.match(TEAL_SHADE)?.[0], "teal-* shade; use deep / accent-text").toBeUndefined();
    expect(src.match(OFF_PALETTE)?.[0], "off-palette hue").toBeUndefined();
    expect(src.match(CRUX_OR_RUST_CHROME)?.[0], "crux crimson or rust as chrome").toBeUndefined();
    expect(src, "the canvas is bg-canvas").not.toMatch(/bg-\[var\(--bg-canvas\)\]/);
  });
});
