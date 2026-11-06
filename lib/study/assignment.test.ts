import { describe, expect, it } from "vitest";
import { STUDY_CELLS, cellKey, chooseCell, type CellCounts } from "./assignment";

/** A seeded [0, 1) source, so the balance tests are reproducible. */
function seeded(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function run(participants: number, random: () => number): CellCounts {
  const counts: CellCounts = {};
  for (let i = 0; i < participants; i++) {
    const key = cellKey(chooseCell(counts, random));
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

describe("balanced assignment", () => {
  it("has nine cells: three topics by three arms", () => {
    expect(STUDY_CELLS).toHaveLength(9);
    expect(new Set(STUDY_CELLS.map(cellKey)).size).toBe(9);
  });

  it("fills every cell equally over a full block, and never lets cells drift more than one apart", () => {
    const random = seeded(42);
    const counts: CellCounts = {};
    for (let i = 0; i < 900; i++) {
      const key = cellKey(chooseCell(counts, random));
      counts[key] = (counts[key] ?? 0) + 1;
      const values = STUDY_CELLS.map((cell) => counts[cellKey(cell)] ?? 0);
      expect(Math.max(...values) - Math.min(...values)).toBeLessThanOrEqual(1);
    }
    for (const cell of STUDY_CELLS) expect(counts[cellKey(cell)]).toBe(100);
  });

  it("balances arms within each party stratum independently", () => {
    const democrats = run(450, seeded(1));
    const republicans = run(333, seeded(2));
    for (const counts of [democrats, republicans]) {
      const values = STUDY_CELLS.map((cell) => counts[cellKey(cell)] ?? 0);
      expect(Math.max(...values) - Math.min(...values)).toBeLessThanOrEqual(1);
    }
  });

  it("always picks a least-filled cell", () => {
    const counts: CellCounts = Object.fromEntries(STUDY_CELLS.map((cell) => [cellKey(cell), 5]));
    counts["immigration-border-crisis:chatbot"] = 2;
    for (let i = 0; i < 50; i++) {
      expect(cellKey(chooseCell(counts))).toBe("immigration-border-crisis:chatbot");
    }
  });

  it("breaks ties at random, reaching every tied cell", () => {
    const random = seeded(7);
    const seen = new Set<string>();
    for (let i = 0; i < 500; i++) seen.add(cellKey(chooseCell({}, random)));
    expect(seen.size).toBe(9);
  });

  it("copes with a random source that returns its upper bound", () => {
    expect(STUDY_CELLS).toContainEqual(chooseCell({}, () => 0.9999999999));
    expect(STUDY_CELLS).toContainEqual(chooseCell({}, () => 1));
  });
});
