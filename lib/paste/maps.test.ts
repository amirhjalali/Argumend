import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EXAMPLE_ANALYSIS_TEXT } from "@/lib/constants";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import type { PrefilterCandidate } from "@/lib/mapReply/prefilter";
import type { Pillar } from "@/lib/schemas/topic";
import { findMaps, isClearMatch, MAP_MATCH, PASTE_MAP_COUNT, pickPillar } from "./maps";

function candidates(scores: number[]): PrefilterCandidate[] {
  return scores.map((score, index) => ({
    id: `map-${index}`,
    title: `Map ${index}`,
    metaClaim: "A claim.",
    score,
  }));
}

function pillar(id: string, text: string): Pillar {
  return {
    id,
    title: text,
    short_summary: "",
    icon_name: "Target",
    skeptic_premise: "",
    proponent_rebuttal: "",
    crux: {
      id: `crux-${id}`,
      title: "",
      description: "",
      methodology: "",
      verification_status: "theoretical",
      cost_to_verify: "",
    },
  };
}

describe("isClearMatch", () => {
  it("needs the absolute floor", () => {
    expect(isClearMatch(candidates([MAP_MATCH.minScore - 0.1]))).toBe(false);
    expect(isClearMatch(candidates([MAP_MATCH.minScore]))).toBe(true);
  });

  it("needs a lead over the pack, but lets a sibling map tie at rank two", () => {
    // Two nuclear maps tie; the rest trail well behind.
    expect(isClearMatch(candidates([50, 49.8, 31, 29, 20, 18]))).toBe(true);
    // Long unrelated text: everything rises together.
    expect(isClearMatch(candidates([26.5, 26.4, 26.1, 22.6, 21, 20]))).toBe(false);
  });

  it("is false with no candidates", () => {
    expect(isClearMatch([])).toBe(false);
  });
});

describe("pickPillar", () => {
  const pillars = [
    pillar("a", "Labor market wages elasticity"),
    pillar("b", "Fiscal cost taxes welfare budget"),
  ];

  it("keeps the map's lead crux unless another shares clearly more words", () => {
    expect(pickPillar(pillars, "wages and the budget")?.id).toBe("a");
    expect(pickPillar(pillars, "the fiscal cost: taxes, welfare and the budget")?.id).toBe("b");
  });
});

describe("findMaps", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        throw new Error("no network");
      }),
    );
  });
  afterEach(() => vi.unstubAllGlobals());

  it("searches the pillar maps and the flagship maps", async () => {
    const result = await findMaps(DISAGREEMENT_EXAMPLE_SOURCE);
    expect(result.reading.mapsSearched).toBe(PASTE_MAP_COUNT);
    expect(PASTE_MAP_COUNT).toBeGreaterThan(150);
  });

  it("returns at most three maps and never repeats the match as a closest map", async () => {
    for (const text of [DISAGREEMENT_EXAMPLE_SOURCE, EXAMPLE_ANALYSIS_TEXT]) {
      const result = await findMaps(text);
      const ids = [result.match?.id, ...result.closest.map((map) => map.id)].filter(Boolean);
      expect(ids.length).toBeLessThanOrEqual(MAP_MATCH.maxMaps);
      expect(new Set(ids).size).toBe(ids.length);
    }
    expect(fetch).not.toHaveBeenCalled();
  });

  it("copies the crux and cards from the map, and links the crux anchor", async () => {
    const result = await findMaps(DISAGREEMENT_EXAMPLE_SOURCE);
    const match = result.match;
    expect(match?.id).toBe("immigration-wage-impact");
    expect(match?.crux?.question).toBe("Labor Demand Elasticity for Low-Skill Workers");
    expect(match?.crux?.href).toBe("/topics/immigration-wage-impact#crux-wage-elasticity-immigration");
    expect(match?.cards.length).toBe(2);
  });

  it("names nothing for text with no words in common with any map", async () => {
    const result = await findMaps("Honestly this is exhausting. Can we just agree to disagree?");
    expect(result.status).toBe("none");
    expect(result.match).toBeNull();
    expect(result.closest).toEqual([]);
  });
});
