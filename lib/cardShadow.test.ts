import { describe, expect, it } from "vitest";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import config from "../tailwind.config";

describe("card shadow and surface utilities", () => {
  it("keeps the shadow dark while allowing card surface colors and colored shadows", async () => {
    const result = await postcss([
      tailwindcss({
        ...config,
        content: [{ raw: '<div class="shadow-card bg-card shadow-rust-500"></div>' }],
      }),
    ]).process("@tailwind utilities;", { from: undefined });

    const cardRules = result.root.nodes.filter(
      (node) => node.type === "rule" && node.selector === ".shadow-card",
    );
    const cardCss = cardRules.map((node) => node.toString()).join("\n");
    expect(cardCss).toContain("0 2px 8px -2px rgba(0,0,0,0.1)");
    expect(cardCss).not.toContain("--tw-shadow-color:");
    expect(result.css).toContain("var(--bg-card-rgb)");
    expect(result.css).toContain(".shadow-rust-500");
  });
});
