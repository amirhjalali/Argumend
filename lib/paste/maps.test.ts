import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { EXAMPLE_ANALYSIS_TEXT } from "@/lib/constants";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import type { Pillar } from "@/lib/schemas/topic";
import { EXPECTED_MAP_COUNT } from "./mapDocuments";
import type { RankedMap } from "./mapIndex";
import { decideMatch, findMaps, getMapIndex, MAP_MATCH, pickPillar } from "./maps";
import { ASSISTED_LIVING_PASTE, NUCLEAR_PASTE } from "./testPastes";

/**
 * A ranking with the given scores. Every word of the paste is scored, so
 * coverage follows `ceiling`. Unless `exclusive` says otherwise, the maps
 * share no words, so the lead on the words where two maps differ is the plain
 * ratio of their scores.
 */
function ranking(scores: number[], ceiling = 100, exclusive?: (a: string, b: string) => number) {
  const ranked: RankedMap[] = scores.map((score, index) => ({
    id: `map-${index}`,
    title: `Map ${index}`,
    claim: "A claim.",
    score,
    wordScore: score,
    wordsMatched: 3,
  }));
  const byId = new Map(ranked.map((map) => [map.id, map.score]));
  const exclusiveLead =
    exclusive ?? ((a: string, b: string) => (byId.get(a) ?? 0) / (byId.get(b) ?? 1));
  return { ranked, ceiling, exclusiveLead };
}

const noSiblings = () => false;
/** map-0 and map-1 are siblings (the two nuclear-power maps, say). */
const zeroAndOne = (a: string, b: string) =>
  a !== b && [a, b].every((id) => id === "map-0" || id === "map-1");

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

describe("decideMatch", () => {
  it("names the top map when it leads the best map on a different subject", () => {
    const decision = decideMatch(ranking([40, 20, 12, 10]), noSiblings);
    expect(decision.named?.id).toBe("map-0");
    expect(decision.lead).toBe(2);
  });

  it("refuses a top map whose lead comes from the words it shares with the rival", () => {
    // 40 against 25 overall, but on the words where the two differ, 1.5 to 1.
    const decision = decideMatch(ranking([40, 25, 10], 100, () => 1.5), noSiblings);
    expect(decision.named).toBeNull();
    expect(decision.exclusiveLead).toBe(1.5);
    // The same scores, the rival's words all shared with the top map: named.
    expect(decideMatch(ranking([40, 25, 10], 100, () => Infinity), noSiblings).named?.id).toBe("map-0");
  });

  it("never names a near tie, however the words split", () => {
    expect(decideMatch(ranking([30, 25, 10], 100, () => Infinity), noSiblings).named).toBeNull();
  });

  it("refuses a top map that barely leads, and offers the closest maps instead", () => {
    const decision = decideMatch(ranking([26.5, 26.4, 26.1, 22.6, 21, 20]), noSiblings);
    expect(decision.named).toBeNull();
    expect(decision.closest.map((map) => map.id)).toEqual(["map-0", "map-1", "map-2"]);
  });

  it("does not count a sibling against the top map, and shows it as closely related", () => {
    // The live-site failure: two nuclear maps close together, the rest well behind.
    const scores = [24, 23, 11, 10];
    expect(decideMatch(ranking(scores), noSiblings).named).toBeNull();
    const decision = decideMatch(ranking(scores), zeroAndOne);
    expect(decision.named?.id).toBe("map-0");
    expect(decision.related.map((map) => map.id)).toEqual(["map-1"]);
    expect(decision.rival?.id).toBe("map-2");
  });

  it("needs enough of the paste behind the map: a score floor, or a share of its words", () => {
    const low = MAP_MATCH.minScore - 2;
    expect(low).toBeGreaterThanOrEqual(MAP_MATCH.minShortScore);
    // Leads clearly, but a low score on a long paste: not named.
    expect(decideMatch(ranking([low, 3], 100), noSiblings).named).toBeNull();
    // The same score on a short paste it mostly accounts for: named.
    expect(decideMatch(ranking([low, 3], low / MAP_MATCH.minCoverage), noSiblings).named?.id).toBe("map-0");
  });

  it("never names a map on one borrowed word, however much of a short paste it covers", () => {
    const tiny = MAP_MATCH.minShortScore - 1;
    expect(decideMatch(ranking([tiny, 1], tiny), noSiblings).named).toBeNull();
  });

  it("names nothing and lists nothing when the best overlap is a word or two", () => {
    const decision = decideMatch(ranking([4, 3, 2], 100), noSiblings);
    expect(decision.named).toBeNull();
    expect(decision.closest).toEqual([]);
  });

  it("lists nothing when the overlap is a thin slice of a long text", () => {
    // Scores high on raw words, but the maps account for a tenth of the paste.
    const decision = decideMatch(ranking([20, 19.5, 19], 200), noSiblings);
    expect(decision.named).toBeNull();
    expect(decision.coverage).toBeLessThan(MAP_MATCH.closestCoverage);
    expect(decision.closest).toEqual([]);
  });

  it("lists nothing when one map stood clear but had too little behind it to be named", () => {
    // Clear of every other subject, too thin to name: listing it would name it anyway.
    const decision = decideMatch(ranking([11, 5], 40), noSiblings);
    expect(decision.named).toBeNull();
    expect(decision.lead).toBeGreaterThanOrEqual(MAP_MATCH.minLead);
    expect(decision.closest).toEqual([]);
  });

  it("never shows more than three maps", () => {
    const decision = decideMatch(ranking([60, 55, 50, 30, 29, 28]), (a, b) => a !== b && [a, b].every((id) => ["map-0", "map-1", "map-2"].includes(id)));
    expect(1 + decision.related.length + decision.closest.length).toBeLessThanOrEqual(MAP_MATCH.maxMaps);
  });

  it("is empty for an empty ranking", () => {
    expect(decideMatch({ ranked: [], ceiling: 0, exclusiveLead: () => 0 }, noSiblings).named).toBeNull();
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
  // The first paste in a process reads every map to build the index.
  beforeAll(() => getMapIndex(), 60_000);

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
    expect(result.reading.mapsSearched).toBe(EXPECTED_MAP_COUNT);
    expect(EXPECTED_MAP_COUNT).toBeGreaterThan(150);
  });

  it("returns at most three maps and never repeats the match as a closest map", async () => {
    for (const text of [DISAGREEMENT_EXAMPLE_SOURCE, EXAMPLE_ANALYSIS_TEXT]) {
      const result = await findMaps(text);
      const ids = [
        result.match?.id,
        ...result.related.map((map) => map.id),
        ...result.closest.map((map) => map.id),
      ].filter(Boolean);
      expect(ids.length).toBeLessThanOrEqual(MAP_MATCH.maxMaps);
      expect(new Set(ids).size).toBe(ids.length);
    }
    expect(fetch).not.toHaveBeenCalled();
  });

  it("copies the crux and cards from the map, and links the crux anchor", async () => {
    const result = await findMaps(DISAGREEMENT_EXAMPLE_SOURCE);
    const match = result.match;
    expect(match?.id).toBe("immigration-wage-impact");
    // Worded as the topic page words it: the pillar's authored crux question.
    expect(match?.crux?.question).toMatch(/^Does immigration barely move the wages of directly competing workers/);
    expect(match?.crux?.href).toBe("/topics/immigration-wage-impact#crux-labor-market-economics");
    expect(match?.cards.length).toBe(2);
  });

  it("offers no closest maps for a family argument no map covers", async () => {
    const result = await findMaps(ASSISTED_LIVING_PASTE);
    expect(result.status).toBe("none");
    expect(result.match).toBeNull();
    expect(result.closest).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("still names the nuclear map for the live-site nuclear paste", async () => {
    const result = await findMaps(NUCLEAR_PASTE);
    expect(result.status).toBe("matched");
    expect(result.match?.id).toBe("nuclear-energy-safety");
  });

  it("names nothing for text with no words in common with any map", async () => {
    const result = await findMaps("Honestly this is exhausting. Can we just agree to disagree?");
    expect(result.status).toBe("none");
    expect(result.match).toBeNull();
    expect(result.closest).toEqual([]);
  });
});
