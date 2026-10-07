import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { MAP_COUNT } from "@/data/topicIndex";
import { EXAMPLE_ANALYSIS_TEXT } from "@/lib/constants";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import type { Pillar } from "@/lib/schemas/topic";
import { EXPECTED_MAP_COUNT } from "./mapDocuments";
import type { RankedMap } from "./mapIndex";
import { decideMatch, findMaps, getMapIndex, MAP_MATCH, pickPillars } from "./maps";
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

  it("names a short paste's map when the paste uses a rare word only that map's name has", () => {
    // 5.25 against 2.84, coverage 0.27: the microplastics paste of r9 review #2.
    const scores = [5.25, 2.84];
    const ownZero = (id: string) => id === "map-0";
    expect(decideMatch(ranking(scores, 19.4, () => 1.85), noSiblings).named).toBeNull();
    expect(decideMatch(ranking(scores, 19.4, () => 1.85), noSiblings, undefined, undefined, ownZero).named?.id).toBe("map-0");
    // Never on a near tie, and never under the short-paste score.
    expect(decideMatch(ranking([5.25, 4.5], 19.4), noSiblings, undefined, undefined, ownZero).named).toBeNull();
    const tiny = MAP_MATCH.minShortScore - 1;
    expect(decideMatch(ranking([tiny, 1], 19.4), noSiblings, undefined, undefined, ownZero).named).toBeNull();
  });

  it("lists a map on another subject only when the paste uses a telling word of its name", () => {
    const sharesName = (id: string) => id !== "map-1";
    const beside = decideMatch(ranking([40, 25, 22], 100, () => Infinity), noSiblings, undefined, undefined, undefined, sharesName);
    expect(beside.named?.id).toBe("map-0");
    expect(beside.closest.map((map) => map.id)).toEqual(["map-2"]);
    const instead = decideMatch(ranking([26.5, 26.4, 26.1, 22.6]), noSiblings, undefined, undefined, undefined, sharesName);
    expect(instead.closest.map((map) => map.id)).toEqual(["map-0", "map-2", "map-3"]);
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

  it("names nothing, and lists nothing, when the clear winner is off its subject", () => {
    const offZero = (id: string) => id === "map-0";
    const decision = decideMatch(ranking([40, 20, 12, 10]), noSiblings, undefined, offZero);
    expect(decision.named).toBeNull();
    expect(decision.closest).toEqual([]);
    expect(decision.top?.id).toBe("map-0");
    // Another map being off its subject changes nothing.
    expect(decideMatch(ranking([40, 20, 12, 10]), noSiblings, undefined, (id) => id === "map-1").named?.id).toBe("map-0");
  });

  it("never shows more than three maps", () => {
    const decision = decideMatch(ranking([60, 55, 50, 30, 29, 28]), (a, b) => a !== b && [a, b].every((id) => ["map-0", "map-1", "map-2"].includes(id)));
    expect(1 + decision.related.length + decision.closest.length).toBeLessThanOrEqual(MAP_MATCH.maxMaps);
  });

  it("is empty for an empty ranking", () => {
    expect(decideMatch({ ranked: [], ceiling: 0, exclusiveLead: () => 0 }, noSiblings).named).toBeNull();
  });
});

describe("pickPillars", () => {
  const pillars = [
    pillar("a", "Labor market wages elasticity"),
    pillar("b", "Fiscal cost taxes welfare budget"),
  ];
  // Every word as rare as any other across the maps.
  const flatIdf = () => 3;
  const ids = (text: string) => pickPillars(pillars, text, flatIdf).map((picked) => picked.id);

  it("opens at the map's lead crux when the paste says nothing that tells the cruxes apart", () => {
    expect(ids("the weather was lovely today")).toEqual(["a"]);
  });

  it("shows the one crux the paste is about when it clearly leads", () => {
    expect(ids("the fiscal cost: taxes, welfare and the budget")).toEqual(["b"]);
    expect(ids("labor market elasticity and wages")).toEqual(["a"]);
  });

  it("shows the two leaders, best first, when neither clearly leads", () => {
    expect(ids("wages and the budget")).toEqual(["a", "b"]);
    // A tie keeps the map's order.
    expect(ids("the budget and wages")).toEqual(["a", "b"]);
  });

  it("does not let a long crux win on raw word counts", () => {
    const long = pillar(
      "long",
      "Rent control supply construction landlords developers buildings units market economists returns conversion",
    );
    const short = pillar("short", "Displacement of families from neighborhoods");
    // The long crux shares two words, the short one two rarer, closer ones.
    const picked = pickPillars([long, short], "rent control keeps families in their neighborhoods", flatIdf);
    expect(picked[0]?.id).toBe("short");
  });
});

describe("findMaps", () => {
  it("opens the rent-control map for a rent-control paste, not the broader housing map", async () => {
    // The standalone smoke test's paste. Both maps discuss rent control and
    // score close; the paste uses the rent-control map's own name words and
    // none that only the housing map's name has.
    const result = await findMaps(
      "Rent control protects tenants from being priced out. Economists answer that it reduces supply and landlords stop maintaining buildings.",
    );
    expect(result.match?.id).toBe("rent-control-effectiveness");
    expect(result.related.map((map) => map.id)).toContain("housing-affordability-crisis");
  });

  it("keeps a nuclear-power article on the nuclear map although it mentions small modular reactors", async () => {
    const result = await findMaps(EXAMPLE_ANALYSIS_TEXT);
    expect(result.match?.id).toBe("nuclear-energy-safety");
  });

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
    // The count the home page and the health probe give (r9 review #15).
    expect(EXPECTED_MAP_COUNT).toBe(MAP_COUNT);
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

  it("shows a card on each side when the crux's own evidence is one-sided", async () => {
    // r9 live review #7: the Section 230 paste's crux has only "yes" cards,
    // and was shown two of them under "The strongest card on each side".
    const result = await findMaps(
      "Platforms want it both ways. They curate and algorithmically promote content like a publisher but claim they're just a neutral bulletin board when someone sues. Strip their immunity and watch how fast they moderate.",
    );
    expect(result.match?.id).toBe("section-230-reform");
    expect(new Set(result.match?.cards.map((card) => card.side))).toEqual(new Set(["for", "against"]));
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

  it("does not name the artificial-wombs map for an abortion argument, but does for artificial wombs", async () => {
    const abortion = await findMaps(
      "A: Life begins at conception and abortion ends a human life. B: A woman has the right to decide what happens to her own body. A: Rights don't include ending someone else's life.",
    );
    expect(abortion.match).toBeNull();
    expect(abortion.closest.map((map) => map.id)).not.toContain("artificial-reproduction-ethics");
    const wombs = await findMaps(
      "If artificial wombs can carry a fetus from 22 weeks, viability no longer depends on the mother's body, and the abortion debate changes.",
    );
    expect(wombs.match?.id).toBe("artificial-reproduction-ethics");
  });

  it("names nothing for text with no words in common with any map", async () => {
    const result = await findMaps("Honestly this is exhausting. Can we just agree to disagree?");
    expect(result.status).toBe("none");
    expect(result.match).toBeNull();
    expect(result.closest).toEqual([]);
  });
});
