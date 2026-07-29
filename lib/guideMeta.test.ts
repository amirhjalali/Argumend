import { describe, it, expect } from "vitest";
import { guides } from "@/data/guides";
import {
  guideTracks,
  guideTrackOrder,
  getGuideTrack,
  getGuideIcon,
  groupGuidesByTrack,
  totalReadingMinutes,
} from "./guideMeta";

describe("guideMeta", () => {
  it("maps every guide in the catalog to a real track (no silent reading-fallback)", () => {
    // A guide added to data/guides.ts but not to trackById would silently land
    // in "reading"; assert the mapping is explicit by checking the grouped
    // membership rather than just that a track object came back.
    const groups = groupGuidesByTrack(guides);
    const readingIds = new Set(
      groups.find((g) => g.track.id === "reading")?.items.map((g) => g.id) ?? []
    );
    const explicitlyReading = [
      "how-to-read-an-argument-map",
      "running-your-first-analysis",
      "crux-test",
      "steelmanning-practice",
      "argument-audit",
    ];
    expect([...readingIds].sort()).toEqual([...explicitlyReading].sort());

    for (const guide of guides) {
      expect(Object.values(guideTracks)).toContainEqual(getGuideTrack(guide.id));
    }
  });

  it("gives every guide in the catalog a distinct icon", () => {
    const icons = guides.map((g) => getGuideIcon(g.id));
    expect(new Set(icons).size).toBe(guides.length);
  });

  it("falls back to a generic icon and the reading track for unknown ids", () => {
    expect(getGuideIcon("not-a-guide")).toBeDefined();
    expect(getGuideTrack("not-a-guide")).toBe(guideTracks.reading);
  });

  it("groups the full catalog into all four tracks with no duplicates or omissions", () => {
    const groups = groupGuidesByTrack(guides);
    expect(groups).toHaveLength(guideTrackOrder.length);

    const total = groups.reduce((sum, g) => sum + g.items.length, 0);
    expect(total).toBe(guides.length);

    const seenIds = new Set(groups.flatMap((g) => g.items.map((g2) => g2.id)));
    expect(seenIds.size).toBe(guides.length);
  });

  it("orders groups by guideTrackOrder", () => {
    const groups = groupGuidesByTrack(guides);
    expect(groups.map((g) => g.track.id)).toEqual(
      guideTrackOrder.filter((id) => groups.some((g) => g.track.id === id))
    );
  });

  it("omits tracks with no matching guides", () => {
    const onlyReading = guides.filter((g) => getGuideTrack(g.id).id === "reading");
    const groups = groupGuidesByTrack(onlyReading);
    expect(groups).toHaveLength(1);
    expect(groups[0].track.id).toBe("reading");
  });

  it("gives each track a unique numeral and label, in order I-IV", () => {
    const numerals = guideTrackOrder.map((id) => guideTracks[id].numeral);
    expect(numerals).toEqual(["I", "II", "III", "IV"]);

    const labels = guideTrackOrder.map((id) => guideTracks[id].label);
    expect(new Set(labels).size).toBe(guideTrackOrder.length);
  });

  it("keeps track styling on the four on-brand color tokens", () => {
    // CLAUDE.md design system: deep teal, rust, crux crimson, skeptic brown.
    // Guard against a regression to the old indigo/amber/slate per-guide hexes.
    const banned = /amber|tangerine|indigo|violet|sky|blue|purple|emerald|#5b6abf|#b37d1e|#4a6b8a/i;
    const tokens = ["deep", "rust", "crux", "skeptic"];

    for (const id of guideTrackOrder) {
      const track = guideTracks[id];
      const styles = [
        track.chip,
        track.iconBg,
        track.iconText,
        track.hoverBorder,
        track.borderAccent,
        track.dotBg,
      ];
      for (const style of styles) {
        expect(style).not.toMatch(banned);
        expect(tokens.some((t) => style.includes(t))).toBe(true);
      }
    }
  });

  it("sums reading time from the catalog's readTime strings", () => {
    const total = totalReadingMinutes(guides);
    expect(total).toBeGreaterThan(0);
    expect(total).toBe(
      guides.reduce((sum, g) => sum + parseInt(g.readTime, 10), 0)
    );
  });

  it("treats unparseable readTime as zero rather than NaN", () => {
    const total = totalReadingMinutes([
      { ...guides[0], readTime: "quick read" },
      { ...guides[1], readTime: "10 min read" },
    ]);
    expect(total).toBe(10);
  });

  it("returns zero total for an empty list", () => {
    expect(totalReadingMinutes([])).toBe(0);
    expect(groupGuidesByTrack([])).toEqual([]);
  });
});
