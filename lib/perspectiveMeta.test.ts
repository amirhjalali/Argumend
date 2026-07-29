import { describe, it, expect } from "vitest";
import {
  getPerspectiveIcon,
  getPerspectiveLens,
  groupScenesByLens,
  perspectiveLensOrder,
  perspectiveLenses,
  perspectiveSceneIds,
} from "./perspectiveMeta";

/** The only accents the design system allows (CLAUDE.md "Color Palette"). */
const BRAND_HEXES = ["#a23b3b", "#C4613C", "#8B5A3C", "#3a6965"];

const scenes = perspectiveSceneIds.map((id) => ({ id }));

describe("perspectiveMeta", () => {
  it("maps every scene to a real lens (no silent framing-fallback)", () => {
    for (const id of perspectiveSceneIds) {
      const lens = getPerspectiveLens(id);
      expect(Object.values(perspectiveLenses)).toContainEqual(lens);
    }
    // The opening scene is the one legitimately in "framing"; every other
    // scene must have been mapped explicitly rather than defaulted into it.
    const framingScenes = perspectiveSceneIds.filter(
      (id) => getPerspectiveLens(id).id === "framing"
    );
    expect(framingScenes).toEqual(["moment"]);
  });

  it("gives every scene a distinct icon", () => {
    const icons = perspectiveSceneIds.map((id) => getPerspectiveIcon(id));
    expect(new Set(icons).size).toBe(perspectiveSceneIds.length);
  });

  it("uses only on-brand accents, one per lens", () => {
    const accents = perspectiveLensOrder.map((id) => perspectiveLenses[id].accent);
    for (const accent of accents) {
      expect(BRAND_HEXES).toContain(accent);
    }
    expect(new Set(accents).size).toBe(perspectiveLensOrder.length);
  });

  it("numbers the lenses I through IV in order", () => {
    expect(perspectiveLensOrder.map((id) => perspectiveLenses[id].numeral)).toEqual([
      "I",
      "II",
      "III",
      "IV",
    ]);
  });

  it("keeps every lens record self-consistent and captioned", () => {
    for (const id of perspectiveLensOrder) {
      const lens = perspectiveLenses[id];
      expect(lens.id).toBe(id);
      expect(lens.label.length).toBeGreaterThan(0);
      expect(lens.description.length).toBeGreaterThan(20);
    }
    expect(Object.keys(perspectiveLenses).sort()).toEqual([...perspectiveLensOrder].sort());
  });

  it("groups the full story into all four lenses with no duplicates or omissions", () => {
    const groups = groupScenesByLens(scenes);
    expect(groups).toHaveLength(perspectiveLensOrder.length);

    const total = groups.reduce((sum, g) => sum + g.items.length, 0);
    expect(total).toBe(perspectiveSceneIds.length);

    const seen = new Set(groups.flatMap((g) => g.items.map((s) => s.id)));
    expect(seen.size).toBe(perspectiveSceneIds.length);
  });

  it("orders groups by perspectiveLensOrder", () => {
    const groups = groupScenesByLens(scenes);
    expect(groups.map((g) => g.lens.id)).toEqual([...perspectiveLensOrder]);
  });

  it("omits lenses with no scenes rather than emitting empty chapters", () => {
    const groups = groupScenesByLens([{ id: "third-witness" }]);
    expect(groups.map((g) => g.lens.id)).toEqual(["vantage"]);
  });

  it("falls back safely for unknown scene ids", () => {
    expect(getPerspectiveLens("not-a-scene").id).toBe("framing");
    expect(getPerspectiveIcon("not-a-scene")).toBe(getPerspectiveIcon("moment"));
  });
});
