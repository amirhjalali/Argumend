import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Regression guard: bare `text-primary` / `text-secondary` on dark-adaptive surfaces.
 *
 * `tailwind.config.ts` defines these brand colors as FIXED hex
 * (primary #3d3a36, secondary #564d45), so the Tailwind utilities do NOT adapt
 * in dark mode — bare `text-primary` renders near-invisible on the dark canvas
 * (#1a1917). Only the CSS-variable form (`text-[var(--text-primary)]`) adapts.
 * See `.work/dark-mode-systemic-2026-06-30.md`.
 *
 * The fix (mirroring the earlier `text-muted` + `dark:text-stone-400` pass in
 * commits 55400da / 6198832) is to pair every bare occurrence on a dark-adaptive
 * surface with an explicit dark override:
 *   text-primary   -> "text-primary dark:text-stone-200"
 *   text-secondary -> "text-secondary dark:text-stone-400"
 *
 * This guard is intentionally scoped to the files already migrated rather than a
 * repo-wide scan: hundreds of bare uses remain in un-migrated files, and several
 * pages are deliberately always-light (fixed `bg-canvas`/`bg-panel` with no
 * `dark:bg-*` anywhere), where adding a dark text variant would create a
 * light-on-light contrast failure. Add files here as they are migrated.
 */
describe("dark-mode text token pairing (migrated files)", () => {
  const MIGRATED_FILES = [
    "app/about/page.tsx",
    "app/for-educators/page.tsx",
    "app/dashboard/page.tsx",
    "app/not-found.tsx",
    "app/topics/compare/CompareIndexView.tsx",
    "components/FalsificationCrux.tsx",
    "components/HeroMiniCanvas.tsx",
    "components/ZoomIndicator.tsx",
  ];

  /**
   * Matches a bare `text-primary` / `text-secondary` utility (optionally with an
   * opacity modifier) that is NOT variant-prefixed (`hover:`, `dark:`, …) and is
   * NOT immediately followed by a `dark:text-*` pairing.
   */
  const UNPAIRED = /(?:^|[\s"'`])text-(?:primary|secondary)(?:\/\d{1,3})?(?![\w/-])(?!\s+dark:text-)/;

  /** Strip block + line comments so a doc-comment may name a token freely. */
  const stripComments = (src: string): string =>
    src
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/([^:])\/\/.*$/gm, "$1")
      .replace(/^\s*\/\/.*$/gm, "");

  const readSource = (rel: string) =>
    readFileSync(join(process.cwd(), ...rel.split("/")), "utf8");

  it.each(MIGRATED_FILES)(
    "%s pairs every bare text-primary/text-secondary with a dark: override",
    (file) => {
      const source = stripComments(readSource(file));
      const offending = source
        .split("\n")
        .map((line, i) => [i + 1, line] as const)
        .filter(([, line]) => UNPAIRED.test(line))
        .map(([n, line]) => `  ${file}:${n}  ${line.trim()}`);

      expect(
        offending,
        `unpaired text-primary/text-secondary (invisible in dark mode):\n${offending.join("\n")}`,
      ).toEqual([]);
    },
  );

  it("uses the canonical dark pairings (stone-200 / stone-400)", () => {
    for (const file of MIGRATED_FILES) {
      const source = stripComments(readSource(file));
      // Every `text-primary … dark:text-…` pairing must resolve to stone-200 or
      // the adaptive CSS var; `text-secondary` to stone-400 or the CSS var.
      for (const [, token, dark] of source.matchAll(
        /text-(primary|secondary)(?:\/\d{1,3})?\s+dark:text-(\S+?)(?=["'`\s])/g,
      )) {
        const expected =
          token === "primary"
            ? /^(stone-200(\/\d{1,3})?|\[var\(--text-primary\)\])$/
            : /^(stone-400(\/\d{1,3})?|\[var\(--text-secondary\)\])$/;
        expect(
          dark,
          `${file}: text-${token} paired with off-convention dark:text-${dark}`,
        ).toMatch(expected);
      }
    }
  });
});
