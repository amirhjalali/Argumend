import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";

/**
 * Repo-wide guard for bare `text-deep` on dark surfaces.
 *
 * `tailwind.config.ts` registers `deep` as the FIXED hex #3a6965 (chosen for
 * 4.5:1 on parchment). On every dark surface it measures 2.5-2.8:1, so a bare
 * `text-deep` link, eyebrow or icon fails WCAG AA the moment dark mode is on.
 * The verification sweep of 2026-09-15 (`docs/reviews/2026-09-15-dark-mode-verification.md`,
 * F3) counted 139 such sites: sidebar "View all", "Browse all topics", FAQ
 * answers, research citations, pagination, share buttons, and more.
 *
 * The validated pair is:
 *   text-deep                   -> "text-deep dark:text-deep-bright"
 *   text-deep/40 (decorative)   -> "text-deep/40 dark:text-deep-bright/40"
 * `deep.bright` (#6fa39e) is 6.2:1 on the #1a1917 canvas and 5.1:1 on dark
 * cards. Any adjacent `dark:text-*` override counts as the fix, because the
 * point is that the dark colour is chosen deliberately rather than inherited.
 * `dark:text-deep-light` is NOT an acceptable text override (3.7:1) and is
 * flagged separately below for the shared style maps.
 *
 * Hover variants are the same defect one state later: `hover:text-deep-dark`
 * (#2d524f, ~1.9:1) with no `dark:hover:text-*` sends a link *darker* when
 * hovered in dark mode. The pair there is `dark:hover:text-deep-brighter`, and
 * for a light-to-teal hover (`hover:text-deep` on stone text) it is
 * `dark:hover:text-deep-bright`.
 *
 * How the scan works: it tokenises every string literal ("…", '…', `…`) in
 * app/, components/ and lib/ and checks each literal on its own. That means a
 * class string living in a style map (`lib/categoryColors.ts`,
 * `QUADRANT_STYLE`, a ternary branch) is judged by its own contents, not by
 * whatever `dark:` utility happens to sit on the same line. Only string
 * literals are scanned, so comments that mention `text-deep` (for instance
 * `lib/variantStyles.ts`) do not trip it.
 *
 * SVG note: SVG `fill`/`stroke` attributes carry colour values, never
 * `text-*` utilities, so nothing in the regex needs to exclude them. Icon
 * components (`<Crown className="text-deep …">`) DO use `text-*` through
 * `currentColor` and are deliberately in scope: an icon next to its label
 * should get the same dark tint.
 *
 * The count was driven to zero in one pass, so the ceiling is zero. The only
 * exemptions are surfaces that are always light (a rasterised share card and
 * a fixed parchment gradient), where dark text is correct in both modes.
 */

const SCAN_ROOTS = ["app", "components", "lib"];
const SOURCE_EXT = /\.(tsx?|jsx?|m[jt]s|c[jt]s)$/;

/** Every string literal in a source file (template literals are taken whole). */
const STRING_LITERAL = /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g;

/**
 * A bare `text-deep`, with optional opacity modifier.
 * - The lookbehind rejects variant-prefixed forms (`dark:text-deep`,
 *   `hover:text-deep`), `--text-deep`, and any longer identifier.
 * - The lookahead rejects `text-deep-dark` / `-light` / `-bright`.
 */
const BARE_DEEP = /(?<![-\w:])text-deep(?:\/\d{1,3})?(?![-\w/])/;
const DARK_TEXT_OVERRIDE = /(?<![-\w])dark:text-/;

/** `hover:text-deep-dark` / `hover:text-deep` with no dark hover override. */
const HOVER_DEEP = /(?<![-\w:])(?:group-)?hover:text-deep(?:-dark)?(?![-\w/])/;
const DARK_HOVER_OVERRIDE = /(?<![-\w])dark:(?:group-)?hover:text-/;

/** `dark:text-deep-light` / `dark:text-skeptic-light` used as a text tint. */
const LOW_CONTRAST_DARK_TINT = /(?<![-\w])dark:text-(?:deep|skeptic)-light(?![-\w/])/;

/**
 * Always-light surfaces where the fixed teal is correct in both modes. Each
 * entry is the exact literal (quotes included) so a drift in the surrounding
 * markup re-surfaces the site for review.
 */
const FIXED_LIGHT_EXEMPT: Record<string, string[]> = {
  // The "Compare your verdict" card is a fixed #faf8f5 -> #f4f1eb gradient.
  "components/VerdictVoting.tsx": [
    '"font-mono font-semibold text-deep tabular-nums"',
    '"text-deep font-medium"',
  ],
  // The share card is rasterised to a PNG on a hard-coded #f4f1eb background.
  "components/ShareVerdictCard.tsx": ['"text-[10px] font-bold text-deep tracking-[0.2em]"'],
  // Decorative crown / list icons on already-tinted chrome; F4 in the
  // verification report scoped the deep-light -> deep-bright swap to text.
  "components/HeroMiniCanvas.tsx": ['"h-3 w-3 text-deep dark:text-deep-light"'],
  "components/nodes/MetaNode.tsx": ['"h-3.5 w-3.5 text-deep dark:text-deep-light"'],
  "components/TableOfContents.tsx": ['"h-4 w-4 text-deep dark:text-deep-light"'],
};

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

type Kind = "bare" | "hover" | "low-tint";

/** Every offending literal in `src`, tagged by what is wrong with it. */
export const findOffenders = (src: string, exempt: string[] = []): Array<[Kind, string]> => {
  const out: Array<[Kind, string]> = [];
  for (const lit of src.match(STRING_LITERAL) ?? []) {
    if (exempt.includes(lit)) continue;
    if (BARE_DEEP.test(lit) && !DARK_TEXT_OVERRIDE.test(lit)) out.push(["bare", lit]);
    if (HOVER_DEEP.test(lit) && !DARK_HOVER_OVERRIDE.test(lit)) out.push(["hover", lit]);
    if (LOW_CONTRAST_DARK_TINT.test(lit)) out.push(["low-tint", lit]);
  }
  return out;
};

const kinds = (src: string) => findOffenders(src).map(([k]) => k);

describe("dark-mode bare text-deep guard — repo-wide ratchet (ceiling 0)", () => {
  const cwd = process.cwd();
  const files = SCAN_ROOTS.flatMap((root) => collectSourceFiles(join(cwd, root)));

  it("finds source files to scan (sanity check)", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it("flags a bare text-deep but not a paired one", () => {
    expect(kinds(`className="text-deep"`)).toEqual(["bare"]);
    expect(kinds(`className="text-xs text-deep font-medium"`)).toEqual(["bare"]);
    expect(kinds(`className="text-deep/70"`)).toEqual(["bare"]);
    expect(kinds(`className="text-deep dark:text-deep-bright"`)).toEqual([]);
    expect(kinds(`className="text-deep/40 dark:text-deep-bright/40"`)).toEqual([]);
    expect(kinds(`className="text-deep dark:text-[#9bc7c3]"`)).toEqual([]);
    expect(kinds(`className="text-deep dark:text-teal-300"`)).toEqual([]);
    // Siblings of the token are not the token.
    expect(kinds(`className="text-deep-dark"`)).toEqual([]);
    expect(kinds(`className="text-deep-light bg-deep/10 border-deep/20"`)).toEqual([]);
    expect(kinds(`className="text-[var(--text-deep)]"`)).toEqual([]);
  });

  it("judges each string literal on its own, so style maps and ternaries are covered", () => {
    expect(kinds(`moderate: "bg-deep/10 text-deep border-deep/20",`)).toEqual(["bare"]);
    expect(kinds(`isFor ? "text-deep" : "text-stone-600 dark:text-stone-400"`)).toEqual(["bare"]);
    expect(kinds(`isFor ? "text-deep dark:text-deep-bright" : "text-stone-600"`)).toEqual([]);
    // A comment is not a class string.
    expect(kinds(`// renders with text-deep / border-t-deep`)).toEqual([]);
  });

  it("flags hover variants that would darken in dark mode", () => {
    expect(kinds(`className="text-deep hover:text-deep-dark dark:text-deep-bright"`)).toEqual(["hover"]);
    expect(
      kinds(`className="text-deep hover:text-deep-dark dark:text-deep-bright dark:hover:text-deep-brighter"`),
    ).toEqual([]);
    expect(kinds(`className="text-stone-500 hover:text-deep"`)).toEqual(["hover"]);
    expect(kinds(`className="text-stone-500 hover:text-deep dark:hover:text-deep-bright"`)).toEqual([]);
    expect(
      kinds(`className="text-primary group-hover:text-deep dark:group-hover:text-deep-bright"`),
    ).toEqual([]);
  });

  it("flags the low-contrast dark tints used as text colour", () => {
    expect(kinds(`chip: "text-deep dark:text-deep-light"`)).toEqual(["low-tint"]);
    expect(kinds(`chip: "text-skeptic-dark dark:text-skeptic-light"`)).toEqual(["low-tint"]);
    expect(kinds(`chip: "text-deep dark:text-deep-bright"`)).toEqual([]);
    expect(kinds(`chip: "text-skeptic-dark dark:text-skeptic-bright"`)).toEqual([]);
    // Backgrounds and borders may keep the light tint.
    expect(kinds(`"bg-deep/10 dark:bg-deep-light/20 border-skeptic-light"`)).toEqual([]);
  });

  it("has no bare text-deep, dark-darkening hover, or low-contrast dark tint anywhere", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const rel = file.replace(`${cwd}/`, "");
      const hits = findOffenders(readFileSync(file, "utf8"), FIXED_LIGHT_EXEMPT[rel] ?? []);
      for (const [kind, lit] of hits) offenders.push(`  ${kind.padEnd(8)} ${rel}  ${lit.slice(0, 90)}`);
    }
    expect(
      offenders,
      `Found ${offenders.length} dark-mode text-deep problem(s). \`text-deep\` (#3a6965) measures\n` +
        `2.5-2.8:1 on every dark surface, so it needs a deliberate dark override:\n` +
        `  bare      -> add \`dark:text-deep-bright\` (keep the /NN modifier if decorative)\n` +
        `  hover     -> add \`dark:hover:text-deep-brighter\` after \`hover:text-deep-dark\`,\n` +
        `               or \`dark:hover:text-deep-bright\` after a bare \`hover:text-deep\`\n` +
        `  low-tint  -> \`dark:text-deep-light\` / \`dark:text-skeptic-light\` are 2.8-3.7:1;\n` +
        `               use \`dark:text-deep-bright\` / \`dark:text-skeptic-bright\` for text\n` +
        `Only an always-light surface may be exempted (see FIXED_LIGHT_EXEMPT).\n` +
        `Offenders:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it("keeps the exemption list honest: every exempt literal still exists", () => {
    for (const [rel, literals] of Object.entries(FIXED_LIGHT_EXEMPT)) {
      const src = readFileSync(join(cwd, rel), "utf8");
      for (const lit of literals) {
        expect(src.includes(lit), `${rel} no longer contains ${lit}`).toBe(true);
      }
    }
  });
});
