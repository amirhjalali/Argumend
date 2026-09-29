import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import dev from "@/data/evals/paste-matching/pastes.json";
import holdout from "@/data/evals/paste-matching/holdout.json";
import { hasTopicLoader } from "@/data/topicLoader";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import { findMaps, getMapIndex } from "./maps";
import {
  formatSummary,
  scoreCase,
  summarize,
  type PasteEvalCase,
  type PasteEvalRow,
  type PasteEvalSet,
} from "./matchEval";

/**
 * The paste-matching eval (data/evals/paste-matching) as a regression gate.
 *
 * The floors sit a little under what the lane scored when it was tuned, so a
 * change to the scorer or to the maps' text that makes it name wrong maps,
 * or name maps for text no map covers, fails CI. See
 * docs/reviews/2026-09-29-r2-paste-matching.md for the measurements.
 */
const FLOORS = {
  /** Right map named, out of pastes that have one. */
  top1: 0.83,
  /** A map named that is neither right nor a near sibling of the right one. */
  wrongRate: 0.03,
  /** Near sibling named in place of the right map (the right one is then shown beside it). */
  siblingRate: 0.06,
  /** A right map among the (up to three) maps an answer shows. */
  top3: 0.93,
  /** Pastes no map covers that were named as a map anyway. */
  falsePositives: 1,
};

const SETS = [dev, holdout] as PasteEvalSet[];
const CASES: PasteEvalCase[] = SETS.flatMap((set) => set.cases);

let rows: PasteEvalRow[] = [];

beforeAll(async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => {
      throw new Error("the map lane must not make network requests");
    }),
  );
  await getMapIndex();
  rows = [];
  for (const testCase of CASES) {
    const maps = await findMaps(testCase.text);
    const named = maps.match?.id ?? null;
    const shown = [named, ...maps.related.map((map) => map.id), ...maps.closest.map((map) => map.id)]
      .filter((id): id is string => Boolean(id))
      .slice(0, 3);
    rows.push(scoreCase(testCase, { named, shown }));
  }
}, 60_000);

afterAll(() => vi.unstubAllGlobals());

describe("the paste-matching eval set", () => {
  it("is big enough and labelled with maps that exist", () => {
    const positives = CASES.filter((testCase) => testCase.expected.length > 0);
    const negatives = CASES.filter((testCase) => testCase.expected.length === 0);
    expect(dev.cases.length).toBeGreaterThanOrEqual(60);
    expect(negatives.length).toBeGreaterThanOrEqual(12);
    expect(positives.length).toBeGreaterThan(negatives.length);
    expect(new Set(CASES.map((testCase) => testCase.id)).size).toBe(CASES.length);

    const known = (id: string) => hasTopicLoader(id) || argumentTopicIds.includes(id);
    for (const testCase of CASES) {
      for (const id of [...testCase.expected, ...testCase.related]) {
        expect(known(id), `${testCase.id} names unknown map ${id}`).toBe(true);
      }
    }
  });

  it("holds the floors: no wrong maps, no maps for text no map covers", () => {
    const summary = summarize(rows);
    const detail = [
      formatSummary("dev + holdout", summary),
      ...rows
        .filter((row) => row.outcome === "wrong" || row.outcome === "false-positive" || row.outcome === "sibling")
        .map((row) => `  ${row.outcome}: ${row.id} named ${row.named}, expected ${row.expected.join(" or ") || "none"}`),
    ].join("\n");

    expect(summary.wrongRate, detail).toBeLessThanOrEqual(FLOORS.wrongRate);
    expect(summary.falsePositives, detail).toBeLessThanOrEqual(FLOORS.falsePositives);
    expect(summary.sibling / summary.positives, detail).toBeLessThanOrEqual(FLOORS.siblingRate);
    expect(summary.top1, detail).toBeGreaterThanOrEqual(FLOORS.top1);
    expect(summary.top3, detail).toBeGreaterThanOrEqual(FLOORS.top3);
  });

  it("names the nuclear-safety map for the paste the live site refused", () => {
    const row = rows.find((candidate) => candidate.id === "nuclear-live-site");
    expect(row?.outcome).toBe("correct");
  });

  it("finds both flagship debate maps it was given", () => {
    for (const id of ["israel-aid-leahy", "ai-jobs-graduates", "capitalism-who-buys"]) {
      expect(rows.find((row) => row.id === id)?.outcome, id).toBe("correct");
    }
  });
});
