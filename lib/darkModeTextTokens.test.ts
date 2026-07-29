import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Dark-mode guard for the fixed-hex brand text tokens.
 *
 * `tailwind.config.ts` defines `primary: "#3d3a36"` / `secondary: "#564d45"` as
 * literal hex, so the Tailwind utilities `text-primary` / `text-secondary` do
 * NOT adapt in dark mode — a bare use on a dark-adaptive surface renders as
 * near-black text on the `#1a1917` canvas. See
 * `.work/dark-mode-systemic-2026-06-30.md`.
 *
 * The distributed fix (mirroring the earlier `text-muted` pass) is to pair every
 * bare use on a dark-adaptive surface with a canonical dark override:
 *   text-primary   -> "text-primary dark:text-stone-200"
 *   text-secondary -> "text-secondary dark:text-stone-400"
 *
 * This file is the single guard for the whole migration — every branch of the
 * 2026-07-29 dark-mode burst fix appends its files to MIGRATED_FILES rather
 * than creating a parallel guard, so coverage only ever grows in one place.
 *
 * Three guards:
 *  1. COVERAGE (per-file): every bare `text-primary`/`text-secondary` in a
 *     migrated file must carry its canonical dark override.
 *  2. CONSISTENCY (repo-wide): wherever a pairing exists, it must use the
 *     canonical dark class — no ad-hoc stone-300/stone-500/etc. variants.
 *  3. VARIANT COVERAGE: variant-prefixed uses (`hover:text-primary`) also need
 *     their `dark:` counterpart (`dark:hover:text-primary`) — these aren't
 *     "bare" so guard #1 doesn't see them.
 *
 * Note the CSS-variable form (`text-[var(--text-primary)]`) already adapts via
 * `globals.css` and is not matched by these guards.
 */

const CANONICAL_DARK = {
  "text-primary": "dark:text-stone-200",
  "text-secondary": "dark:text-stone-400",
} as const;

/**
 * The CSS-variable form (`dark:text-[var(--text-primary)]`) is also a valid
 * pairing — `globals.css` redefines `--text-primary`/`--text-secondary` for
 * `.dark`, so it adapts correctly. A couple of migrated files (e.g.
 * `components/nodes/MetaNode.tsx`) use this form instead of the stone-class
 * shorthand; both are accepted as "paired" for coverage purposes, but only
 * the stone-class form is the *canonical* one enforced by the consistency
 * check below.
 */
const CSS_VAR_DARK = {
  "text-primary": "dark:text-[var(--text-primary)]",
  "text-secondary": "dark:text-[var(--text-secondary)]",
} as const;

type Token = keyof typeof CANONICAL_DARK;
const TOKENS = Object.keys(CANONICAL_DARK) as Token[];

/**
 * Matches a *bare* utility use: not `dark:text-primary`, not
 * `hover:text-primary`, not the `--text-primary` CSS variable, and not a longer
 * class such as `text-primary-foo`.
 */
const bareUse = (token: Token) =>
  new RegExp(String.raw`(?<![-:\w])${token}(?:/\d{1,3})?(?![-\w])`, "g");

/** Matches an existing pairing so we can check which dark class was used
 *  (opacity modifier, if any, is captured separately and stripped before the
 *  canonical-class comparison — "text-primary/90 dark:text-stone-200/90" is
 *  just as canonical as the unmodified pairing). */
const pairedUse = (token: Token) =>
  new RegExp(String.raw`(?<![-:\w])${token}(?:/\d{1,3})?(?![-\w])\s+(dark:text-[\w-]+)(?:/\d{1,3})?`, "g");

/** A variant-prefixed use, e.g. `hover:text-primary`, needs `dark:hover:...`. */
const variantUse = (token: Token) =>
  new RegExp(String.raw`(?<!dark:)([a-z-]+:)${token}(?![-\w])`, "g");

const read = (relPath: string) =>
  readFileSync(join(process.cwd(), relPath), "utf8");

/**
 * Files migrated by the dark-mode text-token pass. Every bare `text-primary` /
 * `text-secondary` in these must carry its canonical dark pairing.
 *
 * `exempt` lists substrings of lines that are intentionally always-light (e.g.
 * artwork rasterized onto a fixed light canvas) and therefore must NOT be
 * paired.
 */
const MIGRATED_FILES: { path: string; exempt?: string[] }[] = [
  { path: "app/analyses/page.tsx" },
  { path: "app/saved/SavedClient.tsx" },
  { path: "app/blog/category/[category]/page.tsx" },
  { path: "components/SynopticTable.tsx" },
  { path: "components/nodes/MetaNode.tsx" },
  { path: "app/topics/page.tsx" },
  {
    path: "components/VerdictVoting.tsx",
    // The "Compare your verdict" card is a fixed `from-[#faf8f5] to-[#f4f1eb]`
    // gradient with no dark variant, so dark text is correct in both modes.
    exempt: ['<span className="font-medium text-primary">'],
  },
  { path: "app/methodology/page.tsx" },
  { path: "app/how-it-works/page.tsx" },
  { path: "app/lessons-from-the-deep/page.tsx" },
  { path: "app/analysis/[id]/AnalysisView.tsx" },
  { path: "app/analyze/page.tsx" },
  { path: "components/FeaturedTopicHero.tsx" },
  {
    path: "components/ShareVerdictCard.tsx",
    // The share card itself is rasterized to a PNG on a hard-coded #f4f1eb
    // background, so it is always-light by design.
    exempt: ["font-serif font-bold text-primary leading-tight mt-3"],
  },
  { path: "components/ScalesOfEvidence.tsx" },
  { path: "components/SearchModal.tsx" },
  { path: "components/nodes/RichNode.tsx" },
  { path: "components/nodes/EvidenceNode.tsx" },
  { path: "app/embed/[topicId]/page.tsx" },
  { path: "app/about/page.tsx" },
  { path: "app/for-educators/page.tsx" },
  { path: "app/dashboard/page.tsx" },
  { path: "app/not-found.tsx" },
  { path: "app/topics/compare/CompareIndexView.tsx" },
  { path: "components/FalsificationCrux.tsx" },
  { path: "components/HeroMiniCanvas.tsx" },
  { path: "components/ZoomIndicator.tsx" },
];

describe("dark-mode pairing for fixed-hex text tokens", () => {
  it.each(MIGRATED_FILES)(
    "$path pairs every bare text-primary/text-secondary with its dark override",
    ({ path, exempt = [] }) => {
      const lines = read(path).split("\n");
      const offenders: string[] = [];

      lines.forEach((line, idx) => {
        if (exempt.some((snippet) => line.includes(snippet))) return;
        for (const token of TOKENS) {
          const bareCount = line.match(bareUse(token))?.length ?? 0;
          if (bareCount === 0) continue;
          const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const pairedCount =
            line.match(
              new RegExp(
                String.raw`(?<![-:\w])${token}(?:/\d{1,3})?(?![-\w])\s+${escapeRe(CANONICAL_DARK[token])}(?:/\d{1,3})?(?![-\w])`,
                "g",
              ),
            )?.length ?? 0;
          const cssVarPairedCount =
            line.match(
              new RegExp(
                String.raw`(?<![-:\w])${token}(?:/\d{1,3})?(?![-\w])\s+${escapeRe(CSS_VAR_DARK[token])}`,
                "g",
              ),
            )?.length ?? 0;
          const paired = pairedCount + cssVarPairedCount;
          if (paired < bareCount) {
            offenders.push(
              `L${idx + 1}: ${token} missing "${CANONICAL_DARK[token]}" — ${line.trim().slice(0, 140)}`,
            );
          }
        }
      });

      expect(
        offenders,
        `Unpaired fixed-hex text token(s) in ${path} (invisible in dark mode):\n${offenders.join("\n")}`,
      ).toEqual([]);
    },
  );

  it.each(MIGRATED_FILES)("$path uses only the canonical dark override class", ({ path }) => {
    const src = read(path);
    const offenders: string[] = [];

    for (const token of TOKENS) {
      for (const match of src.matchAll(pairedUse(token))) {
        if (match[1] !== CANONICAL_DARK[token]) {
          offenders.push(
            `${token} paired with "${match[1]}" (± opacity), expected "${CANONICAL_DARK[token]}"`,
          );
        }
      }
    }

    expect(offenders, `Non-canonical dark pairing in ${path}:\n${offenders.join("\n")}`).toEqual(
      [],
    );
  });

  it.each(MIGRATED_FILES)(
    "$path pairs every variant-prefixed text-primary/text-secondary (e.g. hover:) with its dark: counterpart",
    ({ path, exempt = [] }) => {
      const lines = read(path).split("\n");
      const offenders: string[] = [];

      lines.forEach((line, idx) => {
        if (exempt.some((snippet) => line.includes(snippet))) return;
        for (const token of TOKENS) {
          for (const match of line.matchAll(variantUse(token))) {
            const variant = match[1];
            // CANONICAL_DARK["text-primary"] is "dark:text-stone-200"; the
            // variant-prefixed counterpart is "dark:hover:text-stone-200",
            // i.e. "dark:" + variant + the suffix after CANONICAL_DARK's own
            // "dark:" prefix.
            const darkSuffix = CANONICAL_DARK[token].replace(/^dark:/, "");
            const expectedDarkVariant = `dark:${variant}${darkSuffix}`;
            if (!line.includes(expectedDarkVariant)) {
              offenders.push(
                `L${idx + 1}: ${variant}${token} without ${expectedDarkVariant} — ${line.trim().slice(0, 140)}`,
              );
            }
          }
        }
      });

      expect(offenders, offenders.join("\n")).toEqual([]);
    },
  );

  it("keeps the always-light exemptions real (each one still present)", () => {
    for (const { path, exempt = [] } of MIGRATED_FILES) {
      const src = read(path);
      for (const exemption of exempt) {
        expect(src, `stale exemption in ${path}: ${exemption}`).toContain(exemption);
      }
    }
  });
});
