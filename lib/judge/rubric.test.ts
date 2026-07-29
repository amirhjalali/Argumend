import { describe, it, expect } from "vitest";
import {
  DEFAULT_RUBRIC,
  calculateTotalScore,
  hasSignificantDisagreement,
  determineWinner,
  type DimensionScore,
  type RubricDimension,
} from "./rubric";

const score = (dimensionId: string, value: number): DimensionScore => ({
  dimensionId,
  score: value,
  reasoning: `stub reasoning for ${dimensionId}`,
});

/** A full set of dimension scores, all at the same value. */
const flatScores = (value: number): DimensionScore[] =>
  DEFAULT_RUBRIC.map((d) => score(d.id, value));

describe("DEFAULT_RUBRIC", () => {
  it("has weights summing to 1 (otherwise scores silently renormalize)", () => {
    const sum = DEFAULT_RUBRIC.reduce((acc, d) => acc + d.weight, 0);
    expect(sum).toBeCloseTo(1, 10);
  });

  it("has unique dimension ids", () => {
    const ids = DEFAULT_RUBRIC.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every dimension a positive weight and all three guideline bands", () => {
    for (const dim of DEFAULT_RUBRIC) {
      expect(dim.weight, `${dim.id} weight`).toBeGreaterThan(0);
      expect(dim.weight, `${dim.id} weight`).toBeLessThan(1);
      expect(dim.name.length).toBeGreaterThan(0);
      expect(dim.description.length).toBeGreaterThan(0);
      expect(dim.guidelines.low.length).toBeGreaterThan(0);
      expect(dim.guidelines.medium.length).toBeGreaterThan(0);
      expect(dim.guidelines.high.length).toBeGreaterThan(0);
    }
  });

  it("weights logical validity and evidence quality most heavily", () => {
    const sorted = [...DEFAULT_RUBRIC].sort((a, b) => b.weight - a.weight);
    expect(sorted.slice(0, 2).map((d) => d.id).sort()).toEqual([
      "evidence-quality",
      "logical-validity",
    ]);
  });
});

describe("calculateTotalScore", () => {
  it("returns the shared value when every dimension scores the same", () => {
    expect(calculateTotalScore(flatScores(7))).toBeCloseTo(7);
    expect(calculateTotalScore(flatScores(1))).toBeCloseTo(1);
    expect(calculateTotalScore(flatScores(10))).toBeCloseTo(10);
  });

  it("weights dimensions rather than averaging them evenly", () => {
    // 10 on the two heaviest dimensions (0.22 each), 0 elsewhere.
    const dimensions = DEFAULT_RUBRIC.map((d) =>
      score(d.id, d.id === "logical-validity" || d.id === "evidence-quality" ? 10 : 0),
    );
    // Weighted: (10*0.22 + 10*0.22) / 1.0 = 4.4 — NOT the flat mean of 10/3.
    expect(calculateTotalScore(dimensions)).toBeCloseTo(4.4);
    expect(calculateTotalScore(dimensions)).not.toBeCloseTo(10 / 3);
  });

  it("renormalizes when only a subset of dimensions is scored", () => {
    // Only clarity (0.12) is present: total 8*0.12, weight 0.12 -> 8.
    expect(calculateTotalScore([score("clarity", 8)])).toBeCloseTo(8);
  });

  it("ignores dimension ids that are not in the rubric", () => {
    const withJunk = [...flatScores(6), score("not-a-real-dimension", 10)];
    expect(calculateTotalScore(withJunk)).toBeCloseTo(6);
  });

  it("returns 0 when no scored dimension matches the rubric", () => {
    expect(calculateTotalScore([score("bogus", 10)])).toBe(0);
    expect(calculateTotalScore([])).toBe(0);
  });

  it("honours a custom rubric passed in", () => {
    const custom: RubricDimension[] = [
      {
        id: "a",
        name: "A",
        description: "d",
        weight: 0.75,
        guidelines: { low: "l", medium: "m", high: "h" },
      },
      {
        id: "b",
        name: "B",
        description: "d",
        weight: 0.25,
        guidelines: { low: "l", medium: "m", high: "h" },
      },
    ];
    // (8*0.75 + 4*0.25) / 1 = 7
    expect(calculateTotalScore([score("a", 8), score("b", 4)], custom)).toBeCloseTo(7);
  });
});

describe("hasSignificantDisagreement", () => {
  it("is false with fewer than two scores", () => {
    expect(hasSignificantDisagreement([])).toBe(false);
    expect(hasSignificantDisagreement([9])).toBe(false);
  });

  it("is false at exactly a 3-point spread (strictly greater than 3)", () => {
    expect(hasSignificantDisagreement([4, 7])).toBe(false);
  });

  it("is true above a 3-point spread", () => {
    expect(hasSignificantDisagreement([4, 8])).toBe(true);
    expect(hasSignificantDisagreement([1, 10])).toBe(true);
  });

  it("uses the full min/max spread, not adjacent differences", () => {
    // Adjacent gaps are all <= 2, but min..max is 4.
    expect(hasSignificantDisagreement([3, 5, 7])).toBe(true);
  });

  it("is false for identical scores", () => {
    expect(hasSignificantDisagreement([6, 6, 6])).toBe(false);
  });
});

describe("determineWinner", () => {
  it("returns a draw inside the default threshold", () => {
    expect(determineWinner(7, 7)).toBe("draw");
    expect(determineWinner(7.2, 7)).toBe("draw");
    expect(determineWinner(7, 7.2)).toBe("draw");
  });

  it("returns a draw at exactly the threshold (strict less-than)", () => {
    expect(determineWinner(7.5, 7)).toBe("for");
    expect(determineWinner(7.49, 7)).toBe("draw");
  });

  it("picks the higher side once the margin clears the threshold", () => {
    expect(determineWinner(9, 5)).toBe("for");
    expect(determineWinner(5, 9)).toBe("against");
  });

  it("honours a custom threshold", () => {
    expect(determineWinner(8, 6, 3)).toBe("draw");
    expect(determineWinner(8, 6, 1)).toBe("for");
  });

  it("is antisymmetric — swapping the sides swaps the winner", () => {
    const pairs: [number, number][] = [
      [9, 5],
      [5, 9],
      [6.4, 6.1],
      [1, 10],
    ];
    for (const [a, b] of pairs) {
      const forward = determineWinner(a, b);
      const backward = determineWinner(b, a);
      const flipped =
        forward === "draw" ? "draw" : forward === "for" ? "against" : "for";
      expect(backward, `swap of (${a}, ${b})`).toBe(flipped);
    }
  });
});
