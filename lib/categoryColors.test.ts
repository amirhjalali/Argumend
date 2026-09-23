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

  it("keeps status chips in one neutral stone family (no signal hue)", () => {
    // Status is not a verdict. Rust is the proponent side and the CTA, teal is
    // evidence, crimson is a crux, brown is the skeptic side: none of them may
    // colour a status chip that sits beside a category chip.
    const hue = /(deep|rust|crux|skeptic|proponent|evidence|emerald|green|rose|red|amber|orange|yellow)[-/]/;
    for (const [status, cls] of Object.entries(statusColors)) {
      expect(hue.test(cls), `${status} status chip uses a signal hue: ${cls}`).toBe(false);
      expect(cls, `${status} status chip should be stone`).toMatch(/text-stone-\d/);
    }
  });

  it("keeps the reserved colours off category chips", () => {
    // Crimson means a crux and stone means a status; a category chip in either
    // reads as a signal it isn't. Every category gets its own hue.
    for (const [category, cls] of Object.entries(categoryColors)) {
      expect(cls, `${category} category chip uses crux crimson`).not.toMatch(/crux/);
      expect(cls, `${category} category chip uses status stone`).not.toMatch(/stone-\d/);
    }
    const hues = Object.values(categoryColors).map((cls) => cls.match(/text-([a-z]+)/)?.[1]);
    expect(new Set(hues).size, "two categories share a hue").toBe(hues.length);
  });

  it("tells contested from speculative by outline/fill, not only by shade", () => {
    expect(statusColors.contested).toMatch(/bg-transparent/);
    expect(statusColors.highly_speculative).toMatch(/border-dashed/);
    expect(statusColors.contested).not.toMatch(/border-dashed/);
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
    "components/MobileArgumentList.tsx",
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
 * Truth-signal guard: surfaces that label sides, statuses and verification
 * must not say "green = true / red = false". Proponent is rust, skeptic is
 * brown, evidence/verified is teal, status is stone. Error states are not in
 * these files, so any emerald/green/rose/red here is a verdict signal.
 */
describe("no green/red truth signals on side and status surfaces", () => {
  const signalFiles = [
    "components/MobileArgumentList.tsx",
    "app/api/og/[id]/route.tsx",
    "components/JudgingResults.tsx",
  ];
  const readSource = (rel: string) =>
    readFileSync(join(process.cwd(), ...rel.split("/")), "utf8");
  const TRUTH_SIGNAL = /(emerald|green|rose|red)-\d|#(059669|10b981|16a34a|22c55e|dc2626|ef4444|e11d48|f43f5e)\b/i;

  it.each(signalFiles)("%s uses no emerald/green/rose/red token or hex", (file) => {
    const hit = readSource(file).match(TRUTH_SIGNAL);
    expect(hit?.[0], `${file} signals truth with ${hit?.[0]}`).toBeUndefined();
  });
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

/**
 * Dark-mode guard: bare `text-primary` / `text-secondary` must carry a `dark:` pair.
 *
 * `tailwind.config.ts` defines primary (#3d3a36) and secondary (#564d45) as FIXED
 * hex, so the `text-primary` / `text-secondary` utilities do NOT adapt in dark
 * mode — they render near-invisible dark text on the #1a1917 dark canvas. The
 * validated fix (same shape as the earlier `text-muted` + `dark:text-stone-400`
 * pass) is to pair each bare use on a dark-adaptive surface:
 *
 *   text-primary   → "text-primary dark:text-stone-200"
 *   text-secondary → "text-secondary dark:text-stone-400"
 *
 * Scoped to the files already migrated rather than a repo-wide scan: the
 * migration is being rolled out file-by-file, and pages built entirely on the
 * fixed-light `bg-canvas`/`bg-panel` tokens (no dark surface at all) are
 * intentionally left alone — pairing their text alone would make it invisible.
 *
 * Variant forms (`hover:text-primary`, `group-hover:text-secondary`) and the
 * CSS-var form (`text-[var(--text-primary)]`, which already adapts) are out of
 * scope and not matched.
 */
describe("dark-mode pairing guard for text-primary / text-secondary", () => {
  const pairedFiles = [
    "app/topics/[id]/TopicDetailView.tsx",
    "components/ReadModeView.tsx",
    "app/topics/compare/[id1]/vs/[id2]/ComparisonView.tsx",
    "app/community/page.tsx",
    "components/JudgingResults.tsx",
    "components/FlagshipIntro.tsx",
  ];

  const EXPECTED_PAIR: Record<string, string> = {
    primary: "dark:text-stone-200",
    secondary: "dark:text-stone-400",
  };

  // A bare utility use: not preceded by a variant colon / word char / `[`,
  // and not followed by more of an identifier (excludes text-primary-foo and
  // the `text-[var(--text-primary)]` CSS-var form).
  const BARE_TOKEN = /(?<![\w:[-])text-(primary|secondary)(?![\w\]-])/g;

  const readSrc = (rel: string) =>
    readFileSync(join(process.cwd(), ...rel.split("/")), "utf8");

  it.each(pairedFiles)(
    "%s pairs every bare text-primary/text-secondary with its dark: override",
    (file) => {
      const src = readSrc(file);
      const unpaired: string[] = [];
      for (const m of src.matchAll(BARE_TOKEN)) {
        const token = m[1];
        const rest = src.slice(m.index! + m[0].length);
        if (!rest.startsWith(` ${EXPECTED_PAIR[token]}`)) {
          const line = src.slice(0, m.index).split("\n").length;
          unpaired.push(
            `${file}:${line} — text-${token} needs "${EXPECTED_PAIR[token]}"`,
          );
        }
      }
      expect(unpaired, unpaired.join("\n")).toEqual([]);
    },
  );

  it("uses the two canonical dark pairings and no ad-hoc substitutes", () => {
    const adHoc = /text-(?:primary|secondary)\s+dark:text-(?!stone-(?:200|400)\b)/;
    const offenders = pairedFiles.filter((file) => adHoc.test(readSrc(file)));
    expect(
      offenders,
      `non-canonical dark pairing (expected dark:text-stone-200 / -400) in:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });
});
