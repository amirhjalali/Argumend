import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import tailwindConfig from "../tailwind.config";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

const SURFACES = {
  canvas: { light: "244 241 235", dark: "26 25 23" },
  panel: { light: "253 250 246", dark: "37 36 32" },
  paper: { light: "254 253 251", dark: "42 41 38" },
  sidebar: { light: "239 233 223", dark: "30 29 26" },
  overlay: { light: "231 224 213", dark: "48 46 42" },
} as const;

describe("dark-adaptive semantic surface tokens", () => {
  const tailwind = read("tailwind.config.ts");
  const globals = read("app/globals.css");
  const rootBlock = globals.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  const darkBlock = globals.match(/\.dark\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

  it.each(Object.entries(SURFACES))(
    "%s maps through RGB channels with alpha support",
    (surface) => {
      expect(tailwind).toContain(
        `${surface}: "rgb(var(--bg-${surface}-rgb) / <alpha-value>)"`,
      );
    },
  );

  it.each(Object.entries(SURFACES))(
    "%s defines distinct light and dark RGB channels",
    (surface, values) => {
      expect(rootBlock).toContain(`--bg-${surface}-rgb: ${values.light};`);
      expect(darkBlock).toContain(`--bg-${surface}-rgb: ${values.dark};`);
      expect(values.light).not.toBe(values.dark);
    },
  );

  it("compiles opacity modifiers against the semantic RGB channels", async () => {
    const result = await postcss([
      tailwindcss({
        ...tailwindConfig,
        content: [{ raw: '<div class="bg-canvas bg-panel/85"></div>' }],
      }),
    ]).process("@tailwind utilities;", { from: undefined });

    expect(result.css).toMatch(
      /\.bg-canvas\s*\{[^}]*background-color:\s*rgb\(var\(--bg-canvas-rgb\)\s*\/\s*var\(--tw-bg-opacity,\s*1\)\)/,
    );
    expect(result.css).toMatch(
      /\.bg-panel\\\/85\s*\{[^}]*background-color:\s*rgb\(var\(--bg-panel-rgb\)\s*\/\s*0\.85\)/,
    );
  });
});

describe("theme-adaptive tokens that need opacity modifiers", () => {
  const globals = read("app/globals.css");
  const rootBlock = globals.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  const darkBlock = globals.match(/\.dark\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

  // Brand text tokens used to be fixed hex, so a bare `text-primary` went
  // dark-on-dark (every blog post body; 2026-09-22 design audit, finding 1).
  const CHANNELS = [
    "--text-primary-rgb",
    "--text-secondary-rgb",
    "--text-muted-rgb",
    "--bg-card-rgb",
    "--bg-subtle-rgb",
    "--border-divider-rgb",
  ];

  it.each(CHANNELS)("%s is defined for both themes", (name) => {
    const light = rootBlock.match(new RegExp(`${name}:\\s*([^;]+);`))?.[1];
    const dark = darkBlock.match(new RegExp(`${name}:\\s*([^;]+);`))?.[1];
    expect(light).toBeTruthy();
    expect(dark).toBeTruthy();
    expect(light).not.toBe(dark);
  });

  it("compiles text and surface tokens against the channels", async () => {
    const result = await postcss([
      tailwindcss({
        ...tailwindConfig,
        content: [
          { raw: '<p class="text-primary text-muted/70 bg-card/80 border-divider/60"></p>' },
        ],
      }),
    ]).process("@tailwind utilities;", { from: undefined });
    expect(result.css).toMatch(/rgb\(var\(--text-primary-rgb\)/);
    expect(result.css).toMatch(/rgb\(var\(--text-muted-rgb\)\s*\/\s*0\.7\)/);
    expect(result.css).toMatch(/rgb\(var\(--bg-card-rgb\)\s*\/\s*0\.8\)/);
    expect(result.css).toMatch(/rgb\(var\(--border-divider-rgb\)\s*\/\s*0\.6\)/);
  });

  // Tailwind 3 cannot apply an opacity modifier to an arbitrary `var()` color
  // and drops the class without a warning. The sticky top bar stayed light in
  // dark mode because of `dark:bg-[var(--bg-canvas)]/90` (audit finding 2).
  // The type-hinted, fallback form `bg-[color:var(--crux-crimson,#a23b3b)]/5`
  // is dropped the same way, so the pattern covers it too.
  const DROPPED = /-\[(?:color:)?var\(--[\w-]+(?:,[^\]]*)?\)\]\/\d+/;

  it("the dropped-class pattern matches every var() form Tailwind 3 drops", async () => {
    const forms = [
      "bg-[var(--bg-card)]/80",
      "border-[color:var(--crux-crimson,#a23b3b)]/30",
      "bg-[color:var(--crux-crimson,#a23b3b)]/5",
    ];
    for (const form of forms) {
      expect(form).toMatch(DROPPED);
      const result = await postcss([
        tailwindcss({ ...tailwindConfig, content: [{ raw: `<p class="${form}"></p>` }] }),
      ]).process("@tailwind utilities;", { from: undefined });
      expect(result.css.trim()).toBe("");
    }
  });

  it("no source uses an arbitrary var() color with an opacity modifier", () => {
    const walk = (dir: string): string[] =>
      readdirSync(join(process.cwd(), dir), { withFileTypes: true }).flatMap((e) =>
        e.isDirectory()
          ? e.name === "node_modules" || e.name.startsWith(".")
            ? []
            : walk(join(dir, e.name))
          : /\.(tsx?|jsx?)$/.test(e.name) && !e.name.includes(".test.")
            ? [join(dir, e.name)]
            : [],
      );
    const offenders = ["app", "components", "lib", "hooks"]
      .flatMap(walk)
      .filter((file) => DROPPED.test(read(file)));
    expect(offenders).toEqual([]);
  });
});
