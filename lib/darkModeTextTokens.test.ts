import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Regression guard for the systemic dark-mode text-token defect.
 *
 * `tailwind.config.ts` defines `primary`/`secondary` (and `muted`) as FIXED hex
 * (#3d3a36 / #564d45), so the Tailwind utilities `text-primary` /
 * `text-secondary` do NOT adapt in dark mode — bare uses render near-invisible
 * dark-on-dark on the #1a1917 canvas. Only the CSS-variable form
 * (`text-[var(--text-primary)]`) adapts.
 *
 * The validated fix (mirroring the earlier `text-muted` + `dark:text-stone-400`
 * pass) is to pair each bare use on a dark-adaptive surface with an explicit
 * dark override. This guard locks in the files already migrated so they can't
 * silently regress. It is intentionally scoped to a file list rather than the
 * whole repo — the migration is incremental and the remaining files are still
 * being worked through.
 *
 * See `.work/dark-mode-systemic-2026-06-30.md`.
 */

const MIGRATED_FILES = [
  "app/analyses/page.tsx",
  "app/saved/SavedClient.tsx",
  "app/blog/category/[category]/page.tsx",
  "components/SynopticTable.tsx",
  "components/nodes/MetaNode.tsx",
  "app/topics/page.tsx",
  "components/VerdictVoting.tsx",
];

/**
 * Lines that are intentionally left with the fixed-light token because the
 * surface they sit on is itself fixed-light (no `dark:bg-*` variant), so dark
 * text is the correct rendering in both modes. Matched as substrings.
 */
const ALWAYS_LIGHT_EXEMPTIONS = [
  // VerdictVoting: the "Compare your verdict" card is a fixed
  // `from-[#faf8f5] to-[#f4f1eb]` gradient with no dark variant.
  '<span className="font-medium text-primary">',
];

/** Bare `text-primary` / `text-secondary`: not part of a longer token, not
 *  already prefixed by a variant (`dark:`, `hover:`) or inside `[var(--...)]`. */
function bareToken(token: "primary" | "secondary"): RegExp {
  return new RegExp(String.raw`(?<![\w:\-\[])text-${token}(?![\w\-\]])`);
}

/** A variant-prefixed use, e.g. `hover:text-primary`, needs `dark:hover:...`. */
function variantToken(token: "primary" | "secondary"): RegExp {
  return new RegExp(String.raw`(?<!dark:)([a-z-]+:)text-${token}(?![\w\-\]])`);
}

const DARK_PAIRING = {
  primary: [/dark:text-stone-200/, /dark:text-\[var\(--text-primary\)\]/],
  secondary: [/dark:text-stone-400/, /dark:text-\[var\(--text-secondary\)\]/],
} as const;

describe("dark-mode text token pairing", () => {
  for (const file of MIGRATED_FILES) {
    it(`pairs every bare text-primary/text-secondary with a dark override in ${file}`, () => {
      const lines = readFileSync(join(process.cwd(), file), "utf8").split("\n");
      const offenders: string[] = [];

      lines.forEach((line, idx) => {
        if (ALWAYS_LIGHT_EXEMPTIONS.some((ex) => line.includes(ex))) return;

        for (const token of ["primary", "secondary"] as const) {
          if (!bareToken(token).test(line)) continue;
          if (DARK_PAIRING[token].some((re) => re.test(line))) continue;
          offenders.push(`${file}:${idx + 1} bare text-${token} — ${line.trim()}`);
        }

        const variantMatch = variantToken("primary").exec(line);
        if (variantMatch && !line.includes(`dark:${variantMatch[1]}text-stone-200`)) {
          offenders.push(
            `${file}:${idx + 1} ${variantMatch[1]}text-primary without dark: counterpart — ${line.trim()}`,
          );
        }
      });

      expect(offenders, offenders.join("\n")).toEqual([]);
    });
  }

  it("keeps the always-light exemptions real (each one still present)", () => {
    const sources = MIGRATED_FILES.map((f) =>
      readFileSync(join(process.cwd(), f), "utf8"),
    ).join("\n");
    for (const exemption of ALWAYS_LIGHT_EXEMPTIONS) {
      expect(sources, `stale exemption: ${exemption}`).toContain(exemption);
    }
  });
});
