import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import baseline from "./copyStyle.baseline.json";

/**
 * Ratchet: no em dashes (U+2014) in user-facing copy.
 *
 * The house style is no em dash in any new or edited copy (UI strings, map
 * data, blog posts, docs, alt text). Older content still has many, so this is
 * a ratchet like lib/darkModeTextTokenRatchet.test.ts: the count per file may
 * only go DOWN. `lib/copyStyle.baseline.json` maps file -> allowed count;
 * files with zero are simply absent, so a new file with one fails.
 *
 * When a count goes down the test tells you to lower the baseline. Do that
 * (or delete the entry when it reaches zero). Never raise it. Reword instead:
 * a comma, colon, period or parentheses, rewritten so it still reads well.
 * Do not swap in " - ", "--" or an en dash.
 *
 * The check is a string search for U+2014 (written as an escape below so this
 * file does not contain the character itself).
 */

const EM_DASH = "\u2014";
const ROOT = process.cwd();
const SCAN_ROOTS = ["data", "components", "app"];
const COPY_EXT = /\.(tsx?|json)$/;
/** Generated from the maps by scripts/regen-summaries.ts; the maps are the source. */
const EXCLUDED = new Set(["data/topicSummaries.json"]);

const collect = (dir: string): string[] => {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      out.push(...collect(full));
    } else if (
      COPY_EXT.test(entry.name) &&
      !entry.name.includes(".test.") &&
      !entry.name.includes(".spec.")
    ) {
      out.push(full);
    }
  }
  return out;
};

const countDashes = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const root of SCAN_ROOTS) {
    for (const file of collect(join(ROOT, root))) {
      const rel = relative(ROOT, file).split("\\").join("/");
      if (EXCLUDED.has(rel)) continue;
      const n = readFileSync(file, "utf8").split(EM_DASH).length - 1;
      if (n > 0) counts[rel] = n;
    }
  }
  return counts;
};

describe("copy style ratchet: no em dashes", () => {
  const actual = countDashes();
  const allowed = baseline as Record<string, number>;

  it("no file gains an em dash or introduces its first", () => {
    const worse = Object.entries(actual)
      .filter(([file, n]) => n > (allowed[file] ?? 0))
      .map(([file, n]) => `${file}: ${n} (allowed ${allowed[file] ?? 0})`);
    expect(
      worse,
      "Em dashes (U+2014) are not allowed in new or edited copy. Reword with a comma, colon, period or parentheses.",
    ).toEqual([]);
  });

  it("the baseline is lowered when a file improves", () => {
    const stale = Object.entries(allowed)
      .filter(([file, n]) => (actual[file] ?? 0) < n)
      .map(([file, n]) => `${file}: baseline ${n}, actual ${actual[file] ?? 0}`);
    expect(
      stale,
      "Good, fewer em dashes. Lower these entries in lib/copyStyle.baseline.json to the actual count (delete the entry at zero). Never raise one.",
    ).toEqual([]);
  });
});
