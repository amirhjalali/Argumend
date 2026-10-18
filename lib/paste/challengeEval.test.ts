import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import challenge from "@/data/evals/paste-matching/challenge.json";
import { findMaps, getMapIndex } from "./maps";
import { formatSummary, scoreCase, summarize, type PasteEvalRow, type PasteEvalSet } from "./matchEval";

const set = challenge as PasteEvalSet;
const rows: PasteEvalRow[] = [];

beforeAll(async () => {
  vi.stubGlobal("fetch", vi.fn(() => { throw new Error("matching must remain offline"); }));
  const index = await getMapIndex();
  for (const testCase of set.cases) {
    for (const id of [...testCase.expected, ...testCase.related]) {
      expect(index.byId.has(id), `${testCase.id}: unknown map ${id}`).toBe(true);
    }
    const maps = await findMaps(testCase.text);
    const named = maps.match?.id ?? null;
    rows.push(scoreCase(testCase, {
      named,
      shown: [named, ...maps.related.map((map) => map.id), ...maps.closest.map((map) => map.id)]
        .filter((id): id is string => id !== null),
    }));
  }
}, 60_000);

afterAll(() => vi.unstubAllGlobals());

describe("the fixed subject-boundary challenge", () => {
  it("retains positive recall while reducing uncovered answers and closest lists", () => {
    const summary = summarize(rows);
    const detail = formatSummary(set.set, summary);
    // Recorded origin/main baseline on 2026-10-18: 14/20 named, 18/20 shown,
    // 3/21 uncovered pastes named, and 12/21 offered at least one map.
    // Common policy names recover fast-lane and hair-braiding arguments.
    expect(summary.correct, detail).toBeGreaterThanOrEqual(16);
    expect(summary.top3, detail).toBe(1);
    expect(summary.wrong, detail).toBe(0);
    expect(summary.falsePositives, detail).toBe(0);
    expect(summary.negativesOffered, detail).toBeLessThanOrEqual(6);
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([
    "challenge-neg-abortion-bodily",
    "challenge-neg-train-fares",
    "challenge-neg-pets-rental",
    "challenge-neg-garage-allocation",
    "challenge-neg-diamond-proposal",
    "challenge-neg-remote-inheritance",
    "challenge-neg-hydrogen-water-bottle",
    "challenge-neg-voting-sunday",
    "challenge-neg-vitamin-d",
  ])("offers no map for %s", (id) => {
    const row = rows.find((candidate) => candidate.id === id);
    expect(row?.named).toBeNull();
    expect(row?.shown).toEqual([]);
  });
});
