import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";

/**
 * Repo-wide ratchet for the systemic dark-mode text-token defect
 * (see `.work/dark-mode-systemic-2026-06-30.md`).
 *
 * This complements `lib/darkModeTextTokens.test.ts`'s precise per-file guard:
 * that file asserts specific migrated files stay migrated. This file instead
 * scans the *whole* app/components tree so files not yet added to the
 * per-file list still can't quietly regress, and so newly-written code that
 * introduces a fresh unpaired `text-primary`/`text-secondary` on a
 * dark-adaptive surface gets caught even before anyone adds it to a list.
 *
 * `tailwind.config.ts` defines the brand text colors as FIXED hex:
 *   primary: #3d3a36, secondary: #564d45, muted: #6d6058
 * So the utilities `text-primary` / `text-secondary` / `text-muted` do NOT
 * adapt in dark mode. On a dark-adaptive surface (`#1a1917` canvas) a bare
 * `text-primary` renders near-invisible dark-on-dark and fails WCAG AA.
 *
 * The validated fix (already applied wholesale for `text-muted`) is to pair
 * the bare utility with an adjacent dark override:
 *   text-primary   -> "text-primary dark:text-stone-200"
 *   text-secondary -> "text-secondary dark:text-stone-400"
 * The CSS-var form (`dark:text-[var(--text-primary)]`) is equally acceptable —
 * `:root`/`.dark` in globals.css redefine those variables.
 *
 * The semantic `bg-canvas`/`bg-panel` tokens now adapt through RGB-channel CSS
 * variables, so they count as dark-adaptive even without an explicit
 * `dark:bg` utility. This keeps new collection and detail pages in scope.
 *
 * Because the migration is incremental, the repo-wide assertion is a RATCHET:
 * the number of unpaired instances may only go DOWN. Fixing files is expected
 * to fail this test with "actual < ceiling" — when that happens, lower
 * `BARE_TOKEN_CEILING` to the reported actual count. Never raise it.
 */

const SCAN_ROOTS = ["app", "components"];
const SOURCE_EXT = /\.(tsx?|jsx?|m[jt]s|c[jt]s)$/;

/**
 * A bare (unpaired) `text-primary` / `text-secondary` utility.
 *
 * - The lookbehind rejects `--text-primary` (the CSS-variable form), and any
 *   variant-prefixed use such as `dark:text-primary` / `hover:text-primary`,
 *   which are overrides rather than the base color.
 * - The lookahead accepts any adjacent `dark:text-*` override as the fix.
 */
const BARE_BRAND_TEXT =
  /(?<![-\w:])text-(?:primary|secondary)(?:\/\d{1,3})?(?![\/\d])\b(?![\s"'`]*dark:text-)/g;

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

/** A file "does dark mode" if it adapts at least one background. */
const isDarkAdaptive = (src: string): boolean =>
  /dark:bg|\bbg-(?:canvas|panel)(?:\/\d{1,3})?\b/.test(src);

const countBare = (src: string): number => src.match(BARE_BRAND_TEXT)?.length ?? 0;

/**
 * Upper bound on unpaired instances across dark-adaptive files. Lower this as
 * the migration proceeds; never raise it. Recomputed after the 2026-07-29
 * dark-mode burst-fix merge landed all six parallel chunks.
 */
// Honest fixed-light floor: NewsletterSignup's two brand-text lines live on a
// permanently parchment card, while ShareVerdictCard and VerdictVoting each
// contain one fixed-light capture/raster surface. Their precise guards document
// those exemptions; every dark-adaptive brand-text use is migrated.
const BARE_TOKEN_CEILING = 4;

describe("dark-mode text token guard (text-primary / text-secondary) — repo-wide ratchet", () => {
  const cwd = process.cwd();
  const files = SCAN_ROOTS.flatMap((root) => collectSourceFiles(join(cwd, root)));

  it("finds source files to scan (sanity check)", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it("regex flags a bare utility but not a paired or CSS-var one", () => {
    expect(countBare(`className="text-primary"`)).toBe(1);
    expect(countBare(`className="text-secondary mb-4"`)).toBe(1);
    expect(countBare(`className="text-primary/90"`)).toBe(1);
    expect(countBare(`className="text-primary dark:text-stone-200"`)).toBe(0);
    expect(countBare(`className="text-secondary dark:text-stone-400"`)).toBe(0);
    expect(countBare(`className="text-primary/90 dark:text-stone-200/90"`)).toBe(0);
    expect(countBare(`className="text-primary dark:text-[var(--text-primary)]"`)).toBe(0);
    expect(countBare(`className="text-[var(--text-secondary)]"`)).toBe(0);
    expect(countBare(`isActive ? "text-rust-700" : "text-primary dark:text-stone-200"`)).toBe(0);
  });

  it("does not increase unpaired brand text tokens on dark-adaptive surfaces", () => {
    const offenders: Array<[string, number]> = [];
    let total = 0;
    for (const file of files) {
      const src = readFileSync(file, "utf8");
      if (!isDarkAdaptive(src)) continue;
      const n = countBare(src);
      if (n > 0) {
        total += n;
        offenders.push([file.replace(`${cwd}/`, ""), n]);
      }
    }
    offenders.sort((a, b) => b[1] - a[1]);
    expect(
      total,
      `Unpaired text-primary/text-secondary on dark-adaptive surfaces changed.\n` +
        `Ceiling is ${BARE_TOKEN_CEILING}, actual is ${total}.\n` +
        `If you FIXED files, lower BARE_TOKEN_CEILING to ${total}. Never raise it.\n` +
        `Top offenders:\n${offenders
          .slice(0, 15)
          .map(([f, n]) => `  ${n}  ${f}`)
          .join("\n")}`,
    ).toBeLessThanOrEqual(BARE_TOKEN_CEILING);
  });
});
