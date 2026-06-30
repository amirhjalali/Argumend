import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
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
