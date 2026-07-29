import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { categoryColors, statusColors } from "./categoryColors";
import { TopicCategorySchema, TopicStatusSchema } from "./schemas/topic";

describe("categoryColors", () => {
  it("maps every category enum value (exact key parity)", () => {
    for (const category of TopicCategorySchema.options) {
      expect(categoryColors[category], `missing category mapping: ${category}`).toBeTruthy();
    }
    expect(Object.keys(categoryColors).sort()).toEqual([...TopicCategorySchema.options].sort());
  });

  it("maps every status enum value (exact key parity)", () => {
    for (const status of TopicStatusSchema.options) {
      expect(statusColors[status], `missing status mapping: ${status}`).toBeTruthy();
    }
    expect(Object.keys(statusColors).sort()).toEqual([...TopicStatusSchema.options].sort());
  });

  it("uses no banned off-brand color tokens", () => {
    // Guard the on-brand palette: no amber/tangerine/orange/yellow/indigo/violet/sky.
    // vitest runs from the repo root, so resolve the source relative to cwd.
    const source = readFileSync(join(process.cwd(), "lib", "categoryColors.ts"), "utf8");
    const banned = /(amber|tangerine|orange|yellow|indigo|violet|sky)-[0-9]/;
    expect(banned.test(source), "found a banned off-brand color token").toBe(false);
  });

  it("decouples settled status from the science category (no green-as-verdict)", () => {
    expect(statusColors.settled).not.toBe(categoryColors.science);
  });
});

/**
 * Regression guard for the category/status color consolidation.
 *
 * These pages each used to declare their OWN local category/status color maps
 * with off-brand emerald — so the `science` category rendered green and the
 * `settled` STATUS badge rendered green, reintroducing the "green = this claim
 * is true" verdict signal that this module exists to kill. They were migrated
 * to import the canonical maps. This guard fails if any of them regresses by
 * (a) dropping the canonical import, (b) redeclaring a local color map, or
 * (c) reintroducing an emerald/green verdict-signal token.
 *
 * Intentionally scoped to these files rather than a full app/** scan: other
 * (un-migrated) files still legitimately use green for unrelated purposes, and
 * a repo-wide assertion would false-positive on code outside this migration.
 */
describe("category/status color SOT consolidation (repo guard)", () => {
  const migratedFiles = [
    "app/dashboard/page.tsx",
    "app/saved/SavedClient.tsx",
    "app/topics/tag/[slug]/page.tsx",
    "app/topics/category/[slug]/page.tsx",
    "app/topics/compare/[id1]/vs/[id2]/ComparisonView.tsx",
    "app/topics/compare/CompareIndexView.tsx",
  ];

  // Read relative to the repo root (vitest cwd); split so the literal
  // bracketed segments like `[slug]` are passed as path parts, not globs.
  const readSource = (rel: string) =>
    readFileSync(join(process.cwd(), ...rel.split("/")), "utf8");

  it.each(migratedFiles)(
    "%s imports the canonical color maps from @/lib/categoryColors",
    (file) => {
      expect(readSource(file)).toMatch(
        /from\s+["']@\/lib\/categoryColors["']/,
      );
    },
  );

  it.each(migratedFiles)(
    "%s declares no local category/status color map (must use the SOT)",
    (file) => {
      const localColorMap =
        /\bconst\s+(categoryColors|statusColors|categoryBgColors|categoryTopBorder)\b/;
      expect(
        localColorMap.test(readSource(file)),
        `${file} redeclares a local category/status color map`,
      ).toBe(false);
    },
  );

  it.each(migratedFiles)(
    "%s contains no emerald/green verdict-signal color token",
    (file) => {
      const offBrandGreen = /(emerald|green)-\d/;
      expect(
        offBrandGreen.test(readSource(file)),
        `${file} reintroduced an off-brand emerald/green token`,
      ).toBe(false);
    },
  );
});

/**
 * Repo-wide guard against off-palette Tailwind color tokens.
 *
 * The Argumend palette is stone/parchment + deep-teal, rust, crux-crimson and
 * brown. amber / yellow / tangerine / indigo / sky / violet are HARD-banned
 * (the founder purged amber/tangerine entirely; the others never belonged).
 *
 * This walks the app/ and components/ source trees and asserts ZERO uses of any
 * banned `<color>-<number>` utility (e.g. `bg-yellow-50`, `text-indigo-600`).
 * Comments and `.test.` files are excluded so a guard or a doc-comment may name
 * a banned token without tripping the assertion.
 */
describe("off-palette color guard (app + components source trees)", () => {
  const BANNED = /(amber|yellow|tangerine|indigo|sky|violet)-[0-9]/;
  const SCAN_ROOTS = ["app", "components"];
  const SOURCE_EXT = /\.(tsx?|jsx?|m[jt]s|c[jt]s)$/;

  /** Strip block + line comments so banned tokens inside comments are ignored. */
  const stripComments = (src: string): string =>
    src
      // block comments, incl. JSX `{/* … */}` and `/** … */`
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // trailing line comments, but preserve the `//` in URLs like `https://`
      .replace(/([^:])\/\/.*$/gm, "$1")
      // whole-line comments
      .replace(/^\s*\/\/.*$/gm, "");

  /** Recursively collect source files under a directory. */
  const collectSourceFiles = (dir: string): string[] => {
    const out: string[] = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
        out.push(...collectSourceFiles(full));
      } else if (
        SOURCE_EXT.test(entry.name) &&
        !entry.name.includes(".test.") &&
        !entry.name.includes(".spec.")
      ) {
        out.push(full);
      }
    }
    return out;
  };

  const files = SCAN_ROOTS.flatMap((root) =>
    collectSourceFiles(join(process.cwd(), root)),
  );

  it("finds source files to scan (sanity check)", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it("uses no banned off-palette color tokens in app/ or components/", () => {
    const offenders = files.filter((file) =>
      BANNED.test(stripComments(readFileSync(file, "utf8"))),
    );
    expect(
      offenders,
      `off-palette (amber/yellow/tangerine/indigo/sky/violet) tokens found in:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });
});
