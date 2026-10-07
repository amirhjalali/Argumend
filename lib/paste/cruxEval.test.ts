import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import set from "@/data/evals/paste-matching/cruxes.json";
import { loadTopicById } from "@/data/topicLoader";
import { chooseCruxIds, getMapIndex } from "./maps";

/**
 * The crux-choice eval (data/evals/paste-matching/cruxes.json) as a
 * regression gate: given the paste's map, is the crux shown the one the
 * paste is about?
 *
 *   top-1   the first crux shown is the expected one
 *   shown   the expected crux is among those shown (one, or two when no crux
 *           clearly leads: "It may turn on one of these")
 *   two     how often two cruxes are shown instead of one
 *
 * Measured on 2026-10-06 over 36 pastes on 14 maps. Before (the old picker:
 * the first pillar unless another shared at least two more raw words;
 * flagships always opened at their first crux): top-1 27/36 = 75%, shown
 * 27/36, one crux always; on the 7 flagship pastes 2/7. After (BM25F per
 * crux, words weighted by IDF across the maps and across the map's own
 * cruxes, lib/paste/cruxChoice.ts): top-1 35/36 = 97%, shown 35/36, two
 * cruxes shown for 4/36; flagship pastes 7/7. The one miss (phone-scores) is
 * a paste whose only distinctive word, "parents", belongs to another crux.
 * The parameter grid tried on this set was flat (34–35 of 36 for every
 * setting), so the floors sit under it rather than at it.
 */
const FLOORS = {
  top1: 0.9,
  shown: 0.94,
  /** Two cruxes is a hedge; most pastes should get one. */
  maxTwo: 0.2,
};

interface CruxCase {
  id: string;
  map: string;
  text: string;
  expected: string;
  /** Written after the picker was tuned on the rest (r9 live review), scored apart. */
  holdout?: boolean;
}

const CASES = (set as { cases: CruxCase[] }).cases;

interface Row extends CruxCase {
  shown: string[];
}

let rows: Row[] = [];

beforeAll(async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => {
      throw new Error("the crux picker must not make network requests");
    }),
  );
  await getMapIndex();
  rows = [];
  for (const testCase of CASES) {
    rows.push({ ...testCase, shown: (await chooseCruxIds(testCase.map, testCase.text)) ?? [] });
  }
}, 60_000);

afterAll(() => vi.unstubAllGlobals());

function measure(scored: readonly Row[], label: string) {
  const top1 = scored.filter((row) => row.shown[0] === row.expected).length / scored.length;
  const shown = scored.filter((row) => row.shown.includes(row.expected)).length / scored.length;
  const two = scored.filter((row) => row.shown.length === 2).length / scored.length;
  const detail = [
    `${label}: top-1 ${(top1 * 100).toFixed(0)}%  shown ${(shown * 100).toFixed(0)}%  two shown ${(two * 100).toFixed(0)}%  (n=${scored.length})`,
    ...scored
      .filter((row) => row.shown[0] !== row.expected)
      .map(
        (row) =>
          `  ${row.shown.includes(row.expected) ? "second" : "MISS  "} ${row.id}: ${row.shown.join(" + ")} (want ${row.expected})`,
      ),
  ].join("\n");
  return { top1, shown, two, detail };
}

describe("the crux-choice eval set", () => {
  it("is big enough and labelled with cruxes that exist", async () => {
    expect(CASES.length).toBeGreaterThanOrEqual(25);
    expect(new Set(CASES.map((testCase) => testCase.map)).size).toBeGreaterThanOrEqual(10);
    expect(new Set(CASES.map((testCase) => testCase.id)).size).toBe(CASES.length);
    const { loadArgumentTopic } = await import("@/lib/argument/draftTopics");
    for (const testCase of CASES) {
      const topic = await loadTopicById(testCase.map);
      const ids = topic
        ? topic.pillars.map((pillar) => pillar.id)
        : (loadArgumentTopic(testCase.map)?.cruxes.map((crux) => crux.claimId) ?? []);
      expect(ids, `${testCase.id}: ${testCase.expected} on ${testCase.map}`).toContain(testCase.expected);
    }
  });

  it("holds the floors", () => {
    const { top1, shown, two, detail } = measure(rows.filter((row) => !row.holdout), "crux choice");
    console.info(detail);
    expect(top1, detail).toBeGreaterThanOrEqual(FLOORS.top1);
    expect(shown, detail).toBeGreaterThanOrEqual(FLOORS.shown);
    expect(two, detail).toBeLessThanOrEqual(FLOORS.maxTwo);
  });

  it("reports the held-out cases", () => {
    const held = rows.filter((row) => row.holdout);
    expect(held.length).toBeGreaterThanOrEqual(5);
    console.info(measure(held, "crux choice, holdout").detail);
  });

  it("shows the rent-control paste the displacement crux, not the construction one", () => {
    expect(rows.find((row) => row.id === "rc-uncle")?.shown[0]).toBe("incumbent-vs-newcomer");
  });
});
