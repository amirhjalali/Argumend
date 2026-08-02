import { readFileSync } from "node:fs";
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
