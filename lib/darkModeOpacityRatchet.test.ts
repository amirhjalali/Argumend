import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import tailwindConfig from "../tailwind.config";

/**
 * Repo-wide guard against the non-compiling dark-mode opacity pattern.
 *
 * Tailwind 3 cannot apply an opacity modifier to an arbitrary CSS-variable
 * colour. A utility such as
 *
 *   dark:bg-[var(--bg-card)]/80
 *   dark:border-[var(--border-divider)]/60
 *
 * emits NO CSS AT ALL (verified by compiling a probe; the compile test below
 * re-proves it on every run). The `/80` modifier needs the colour's RGB
 * channels so it can build `rgb(r g b / 0.8)`, and an opaque `var(--x)` gives
 * it nothing to work with, so the candidate is silently dropped. The result is
 * that the light-mode class (`bg-white/80`, `border-stone-200/40`, …) wins in
 * dark mode too: white translucent panels on the dark canvas, parchment top
 * bars, 1.1:1 wordmark contrast.
 *
 * The working form is a colour registered in `tailwind.config.ts` as
 * `rgb(var(--token-rgb) / <alpha-value>)`, with `--token-rgb` defined as bare
 * channels ("37 36 32") in BOTH `:root` and `.dark` of `app/globals.css`:
 *
 *   bg-card/80             (light value of --bg-card is white, so no pair needed)
 *   dark:bg-card/80        (when the light class is a different colour)
 *   dark:bg-canvas/50
 *   dark:bg-muted-surface/70
 *   dark:border-divider/60
 *   dark:divide-divider/60
 *
 * Adding a new alpha-bearing surface means adding `--<name>-rgb` in both
 * blocks and registering the colour, then using that name. Never write
 * `dark:<prop>-[var(--…)]/N`.
 *
 * Unlike `lib/darkModeTextTokenRatchet.test.ts`, this is not a descending
 * ceiling: the count was driven to zero in one pass, so the ceiling is zero.
 */

const SCAN_ROOTS = ["app", "components", "lib"];
const SOURCE_EXT = /\.(tsx?|jsx?|m[jt]s|c[jt]s)$/;

/**
 * A variant-prefixed colour utility whose colour is an arbitrary CSS variable
 * and which carries an opacity modifier. Any variant (`dark:`, `hover:`,
 * `dark:hover:`, …) is broken the same way, so the prefix is not restricted to
 * `dark:`; the bare unprefixed form is caught too.
 */
const BROKEN_VAR_OPACITY =
  /(?:[a-z-]+:)*(?:bg|border|text|ring|divide|from|via|to|outline|decoration|placeholder|accent|caret|fill|stroke|shadow)-(?:[xytrbls]-)?\[var\(--[a-z0-9-]+\)\]\/\d{1,3}\b/g;

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

const findBroken = (src: string): string[] => src.match(BROKEN_VAR_OPACITY) ?? [];

const compile = async (html: string): Promise<string> => {
  const result = await postcss([
    tailwindcss({ ...tailwindConfig, content: [{ raw: html }] }),
  ]).process("@tailwind utilities;", { from: undefined });
  return result.css;
};

describe("dark-mode opacity-on-CSS-variable guard — repo-wide ratchet", () => {
  const cwd = process.cwd();
  const files = SCAN_ROOTS.flatMap((root) => collectSourceFiles(join(cwd, root)));

  it("finds source files to scan (sanity check)", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it("regex flags the broken form but not the registered-token form", () => {
    expect(findBroken(`className="bg-white/80 dark:bg-[var(--bg-card)]/80"`)).toEqual([
      "dark:bg-[var(--bg-card)]/80",
    ]);
    expect(findBroken(`dark:border-[var(--border-divider)]/60`)).toHaveLength(1);
    expect(findBroken(`dark:divide-[var(--border-divider)]/60`)).toHaveLength(1);
    expect(findBroken(`dark:hover:bg-[var(--bg-muted)]/50`)).toHaveLength(1);
    expect(findBroken(`bg-[var(--bg-card)]/80`)).toHaveLength(1);
    expect(findBroken(`dark:border-t-[var(--border-divider)]/50`)).toHaveLength(1);
    // Opaque CSS-variable colours (no alpha) compile fine and stay allowed.
    expect(findBroken(`dark:bg-[var(--bg-card)] dark:border-[var(--border-default)]`)).toEqual([]);
    // The registered-token forms are the fix.
    expect(findBroken(`bg-card/80 dark:bg-canvas/50 dark:bg-muted-surface/70`)).toEqual([]);
    expect(findBroken(`dark:border-divider/60 dark:divide-divider/60`)).toEqual([]);
    // Hex-with-alpha arbitrary colours do compile; not this guard's concern.
    expect(findBroken(`dark:border-[#3d3a36]/60`)).toEqual([]);
  });

  it("has no opacity modifier on an arbitrary CSS-variable colour anywhere", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const src = readFileSync(file, "utf8");
      const hits = findBroken(src);
      if (hits.length > 0) {
        offenders.push(`  ${hits.length}  ${file.replace(`${cwd}/`, "")}  (${hits[0]})`);
      }
    }
    expect(
      offenders,
      `Found opacity modifiers on arbitrary CSS-variable colours. Tailwind 3 emits\n` +
        `NO CSS for e.g. \`dark:bg-[var(--bg-card)]/80\`, so the light class wins in\n` +
        `dark mode. Use a registered rgb-channel colour instead: \`bg-card/80\`,\n` +
        `\`dark:bg-canvas/50\`, \`dark:bg-muted-surface/70\`, \`dark:border-divider/60\`.\n` +
        `For a new surface, add \`--<name>-rgb\` to :root AND .dark in app/globals.css\n` +
        `and register it in tailwind.config.ts as rgb(var(--<name>-rgb) / <alpha-value>).\n` +
        `Offenders:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it("defines the rgb-channel tokens in both colour schemes with the hex tokens' channels", () => {
    const globals = readFileSync(join(cwd, "app/globals.css"), "utf8");
    const rootBlock = globals.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
    const darkBlock = globals.match(/\.dark\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
    const hexToChannels = (hex: string) =>
      [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(" ");
    for (const token of ["bg-card", "bg-muted", "border-divider"]) {
      for (const [scheme, block] of [
        ["root", rootBlock],
        ["dark", darkBlock],
      ] as const) {
        const hex = block.match(new RegExp(`--${token}: (#[0-9a-f]{6});`))?.[1];
        const rgb = block.match(new RegExp(`--${token}-rgb: (\\d+ \\d+ \\d+);`))?.[1];
        expect(hex, `--${token} hex in ${scheme}`).toBeDefined();
        expect(rgb, `--${token}-rgb in ${scheme}`).toBe(hexToChannels(hex!));
      }
    }
  });

  it("compiles the registered forms to rgb-with-alpha, and drops the broken form", async () => {
    const css = await compile(
      '<div class="bg-card/80 dark:bg-card/60 dark:bg-canvas/50 dark:bg-muted-surface/70 ' +
        'dark:border-divider/60 dark:divide-divider/60 dark:bg-[var(--bg-card)]/80"></div>',
    );
    expect(css).toMatch(/\.bg-card\\\/80\s*\{[^}]*rgb\(var\(--bg-card-rgb\)\s*\/\s*0\.8\)/);
    expect(css).toMatch(/\.dark\\:bg-card\\\/60[^{]*\{[^}]*rgb\(var\(--bg-card-rgb\)\s*\/\s*0\.6\)/);
    expect(css).toMatch(/\.dark\\:bg-canvas\\\/50[^{]*\{[^}]*rgb\(var\(--bg-canvas-rgb\)\s*\/\s*0\.5\)/);
    expect(css).toMatch(
      /\.dark\\:bg-muted-surface\\\/70[^{]*\{[^}]*rgb\(var\(--bg-muted-rgb\)\s*\/\s*0\.7\)/,
    );
    expect(css).toMatch(
      /\.dark\\:border-divider\\\/60[^{]*\{[^}]*rgb\(var\(--border-divider-rgb\)\s*\/\s*0\.6\)/,
    );
    expect(css).toMatch(
      /\.dark\\:divide-divider\\\/60[^{]*\{[^}]*rgb\(var\(--border-divider-rgb\)\s*\/\s*0\.6\)/,
    );
    // The defect itself: the arbitrary-variable-with-alpha candidate yields nothing.
    expect(css).not.toContain("var(--bg-card)");
  });
});
