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
 * Two guards below:
 *  1. CONSISTENCY (repo-wide): wherever a pairing exists, it must use the
 *     canonical dark class — no ad-hoc stone-300/stone-500/etc. variants.
 *  2. COVERAGE (per-file): the files already migrated must stay migrated; a new
 *     unpaired `text-primary` / `text-secondary` in one of them fails the test.
 *
 * Note the CSS-variable form (`text-[var(--text-primary)]`) already adapts via
 * `globals.css` and is not matched by these guards.
 */

const CANONICAL_DARK = {
  "text-primary": "dark:text-stone-200",
  "text-secondary": "dark:text-stone-400",
} as const;

type Token = keyof typeof CANONICAL_DARK;
const TOKENS = Object.keys(CANONICAL_DARK) as Token[];

/**
 * Matches a *bare* utility use: not `dark:text-primary`, not
 * `hover:text-primary`, not the `--text-primary` CSS variable, and not a longer
 * class such as `text-primary-foo`.
 */
const bareUse = (token: Token) =>
  new RegExp(String.raw`(?<![-:\w])${token}(?![-\w])`, "g");

/** Matches an existing pairing so we can check which dark class was used. */
const pairedUse = (token: Token) =>
  new RegExp(String.raw`(?<![-:\w])${token}(?![-\w])\s+(dark:text-[\w-]+)`, "g");

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
          const paired =
            line.match(
              new RegExp(
                String.raw`(?<![-:\w])${token}(?![-\w])\s+${CANONICAL_DARK[token]}(?![-\w])`,
                "g",
              ),
            )?.length ?? 0;
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

  it.each(MIGRATED_FILES)(
    "$path uses only the canonical dark override class",
    ({ path }) => {
      const src = read(path);
      const offenders: string[] = [];

      for (const token of TOKENS) {
        for (const match of src.matchAll(pairedUse(token))) {
          if (match[1] !== CANONICAL_DARK[token]) {
            offenders.push(
              `${token} paired with "${match[1]}", expected "${CANONICAL_DARK[token]}"`,
            );
          }
        }
      }

      expect(
        offenders,
        `Non-canonical dark pairing in ${path}:\n${offenders.join("\n")}`,
      ).toEqual([]);
    },
  );
});
