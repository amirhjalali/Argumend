import { describe, it, expect } from "vitest";
import { fallacies } from "@/data/fallacies";
import {
  fallacyFamilies,
  fallacyFamilyOrder,
  getFallacyFamily,
  getFallacyIcon,
  groupFallaciesByFamily,
} from "./fallacyMeta";

describe("fallacyMeta", () => {
  it("maps every fallacy in the catalog to a real family (no silent diversion-fallback)", () => {
    for (const fallacy of fallacies) {
      const family = getFallacyFamily(fallacy.slug);
      expect(Object.values(fallacyFamilies)).toContainEqual(family);
    }
  });

  it("gives every fallacy in the catalog a distinct icon", () => {
    const icons = fallacies.map((f) => getFallacyIcon(f.slug));
    const unique = new Set(icons);
    expect(unique.size).toBe(fallacies.length);
  });

  it("groups the full catalog into all four families with no duplicates or omissions", () => {
    const groups = groupFallaciesByFamily(fallacies);
    expect(groups).toHaveLength(fallacyFamilyOrder.length);

    const total = groups.reduce((sum, g) => sum + g.items.length, 0);
    expect(total).toBe(fallacies.length);

    const seenSlugs = new Set(groups.flatMap((g) => g.items.map((f) => f.slug)));
    expect(seenSlugs.size).toBe(fallacies.length);
  });

  it("orders groups by fallacyFamilyOrder", () => {
    const groups = groupFallaciesByFamily(fallacies);
    expect(groups.map((g) => g.family.id)).toEqual(
      fallacyFamilyOrder.filter((id) => groups.some((g) => g.family.id === id))
    );
  });
});
