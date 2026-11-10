import { describe, expect, it } from "vitest";
import {
  POINTS,
  STATE_COUNT,
  TREE_ROOT,
  buildStrands,
  knotCenter,
  strandPoint,
  treeNode,
  wobble,
} from "./threadGeometry";

const counts = { agreed: 23, contested: 31, cruxes: 5 };

describe("home thread figure geometry", () => {
  it("draws one strand per claim, the same way every time", () => {
    const strands = buildStrands(counts);
    expect(strands).toHaveLength(54);
    expect(strands.filter((strand) => strand.group === "agreed")).toHaveLength(23);
    expect(strands.filter((strand) => strand.group === "contested")).toHaveLength(31);
    expect(buildStrands(counts)).toEqual(strands);
  });

  it("shares the contested strands out across the cruxes", () => {
    const contested = buildStrands(counts).filter((strand) => strand.group === "contested");
    const sizes = Array.from({ length: 5 }, (_, k) => contested.filter((strand) => strand.knot === k).length);
    expect(sizes.reduce((sum, size) => sum + size, 0)).toBe(31);
    expect(Math.max(...sizes) - Math.min(...sizes)).toBeLessThanOrEqual(1);
    for (const strand of contested) {
      expect(strand.knotSize).toBe(sizes[strand.knot]);
      expect(strand.knotSlot).toBeLessThan(strand.knotSize);
    }
  });

  it("keeps every point of every arrangement finite and near its box", () => {
    const strands = buildStrands(counts);
    for (let state = 0; state < STATE_COUNT; state += 1) {
      for (const strand of strands) {
        for (let j = 0; j < POINTS; j += 1) {
          const [u, v] = strandPoint(strand, state, j / (POINTS - 1), counts);
          expect(Number.isFinite(u) && Number.isFinite(v)).toBe(true);
          expect(u).toBeGreaterThan(-0.5);
          expect(u).toBeLessThan(1.5);
          expect(v).toBeGreaterThan(-0.5);
          expect(v).toBeLessThan(1.5);
        }
      }
    }
  });

  it("lays the accepted claims flat, below the knot, once they are sorted", () => {
    for (const strand of buildStrands(counts).filter((s) => s.group === "agreed")) {
      const [, start] = strandPoint(strand, 2, 0, counts);
      const [, end] = strandPoint(strand, 2, 1, counts);
      expect(end).toBe(start);
      expect(start).toBeGreaterThanOrEqual(0.74);
      expect(strandPoint(strand, 3, 0.5, counts)[1]).toBe(start);
    }
  });

  it("gathers every contested strand through its own crux", () => {
    for (const strand of buildStrands(counts).filter((s) => s.group === "contested")) {
      const [ku, kv] = knotCenter(strand.knot, counts.cruxes);
      const [u, v] = strandPoint(strand, 3, ku, counts);
      expect(u).toBeCloseTo(ku, 6);
      expect(v).toBeCloseTo(kv, 6);
    }
  });

  it("ends as one tree: a trunk into the question, forks at the cruxes", () => {
    const strands = buildStrands(counts);
    const last = STATE_COUNT - 1;
    for (const strand of strands) {
      if (strand.group === "agreed") {
        const [u] = strandPoint(strand, last, 1, counts);
        expect(u).toBeCloseTo(TREE_ROOT[0], 6);
        continue;
      }
      expect(strandPoint(strand, last, 0, counts)).toEqual(TREE_ROOT);
      const [nu, nv] = treeNode(strand.knot, counts.cruxes);
      const [u, v] = strandPoint(strand, last, 0.5, counts);
      expect(u).toBeCloseTo(nu, 6);
      expect(v).toBeCloseTo(nv, 6);
      expect(strandPoint(strand, last, 1, counts)[0]).toBeCloseTo(1, 6);
    }
  });

  it("stops shivering once the strands are a map", () => {
    expect(wobble(0, "contested")).toBeGreaterThan(0);
    expect(wobble(STATE_COUNT - 1, "agreed")).toBe(0);
    expect(wobble(STATE_COUNT - 1, "contested")).toBe(0);
  });

  it("survives a map with one crux or no accepted claims", () => {
    for (const odd of [
      { agreed: 0, contested: 4, cruxes: 1 },
      { agreed: 3, contested: 0, cruxes: 2 },
      { agreed: 1, contested: 1, cruxes: 5 },
    ]) {
      for (const strand of buildStrands(odd)) {
        for (let state = 0; state < STATE_COUNT; state += 1) {
          const [u, v] = strandPoint(strand, state, 0.37, odd);
          expect(Number.isFinite(u) && Number.isFinite(v)).toBe(true);
        }
      }
    }
  });
});
