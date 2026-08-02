import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("root scroll behavior contract", () => {
  it("declares the global smooth-scroll behavior to Next route transitions", () => {
    const source = readFileSync("app/layout.tsx", "utf8");

    expect(source).toContain('data-scroll-behavior="smooth"');
  });
});
