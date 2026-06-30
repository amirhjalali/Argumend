import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { categoryColors, statusColors } from "./categoryColors";
import { TopicCategorySchema, TopicStatusSchema } from "./schemas/topic";

describe("categoryColors", () => {
  it("maps every category enum value (exact key parity)", () => {
    for (const category of TopicCategorySchema.options) {
      expect(categoryColors[category], `missing category mapping: ${category}`).toBeTruthy();
    }
    expect(Object.keys(categoryColors).sort()).toEqual([...TopicCategorySchema.options].sort());
  });

  it("maps every status enum value (exact key parity)", () => {
    for (const status of TopicStatusSchema.options) {
      expect(statusColors[status], `missing status mapping: ${status}`).toBeTruthy();
    }
    expect(Object.keys(statusColors).sort()).toEqual([...TopicStatusSchema.options].sort());
  });

  it("uses no banned off-brand color tokens", () => {
    // Guard the on-brand palette: no amber/tangerine/orange/yellow/indigo/violet/sky.
    // vitest runs from the repo root, so resolve the source relative to cwd.
    const source = readFileSync(join(process.cwd(), "lib", "categoryColors.ts"), "utf8");
    const banned = /(amber|tangerine|orange|yellow|indigo|violet|sky)-[0-9]/;
    expect(banned.test(source), "found a banned off-brand color token").toBe(false);
  });

  it("decouples settled status from the science category (no green-as-verdict)", () => {
    expect(statusColors.settled).not.toBe(categoryColors.science);
  });
});
