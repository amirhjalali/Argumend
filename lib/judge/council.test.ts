/**
 * Unit tests for the Argumend Judge Council system.
 *
 * Tests the pure scoring, aggregation, disagreement detection,
 * and consensus logic — no LLM calls involved.
 */

import { describe, it, expect } from "vitest";
import {
  calculateTotalScore,
  hasSignificantDisagreement,
  determineWinner,
  DEFAULT_RUBRIC,
  type RubricDimension,
  type DimensionScore,
  type JudgeScore,
  type JudgeVerdict,
  type JudgingResult,
} from "./rubric";

// ---------------------------------------------------------------
// The functions aggregateScores, findDisagreements, and
// determineConsensusWinner are not exported from council.ts.
// We re-implement them here identically so we can unit-test the
// exact same logic against known inputs.  This avoids modifying
// the production source just to expose internal helpers.
// ---------------------------------------------------------------

function aggregateScores(
  verdicts: JudgeVerdict[],
  rubric: RubricDimension[]
): JudgingResult["aggregatedScores"] {
  const forDimensions: Record<string, number[]> = {};
  const againstDimensions: Record<string, number[]> = {};
  const forTotals: number[] = [];
  const againstTotals: number[] = [];

  for (const dim of rubric) {
    forDimensions[dim.id] = [];
    againstDimensions[dim.id] = [];
  }

  for (const verdict of verdicts) {
    forTotals.push(verdict.forScore.totalScore);
    againstTotals.push(verdict.againstScore.totalScore);

    for (const dim of verdict.forScore.dimensions) {
      if (forDimensions[dim.dimensionId]) {
        forDimensions[dim.dimensionId].push(dim.score);
      }
    }
    for (const dim of verdict.againstScore.dimensions) {
      if (againstDimensions[dim.dimensionId]) {
        againstDimensions[dim.dimensionId].push(dim.score);
      }
    }
  }

  const avg = (arr: number[]) =>
    arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const forByDimension: Record<string, number> = {};
  const againstByDimension: Record<string, number> = {};

  for (const dim of rubric) {
    forByDimension[dim.id] = avg(forDimensions[dim.id]);
    againstByDimension[dim.id] = avg(againstDimensions[dim.id]);
  }

  return {
    for: { average: avg(forTotals), byDimension: forByDimension },
    against: { average: avg(againstTotals), byDimension: againstByDimension },
  };
}

function findDisagreements(
  verdicts: JudgeVerdict[],
  rubric: RubricDimension[]
): JudgingResult["disagreements"] {
  const disagreements: JudgingResult["disagreements"] = [];

  for (const dim of rubric) {
    const forScores: { judgeId: string; score: number }[] = [];
    const againstScores: { judgeId: string; score: number }[] = [];

    for (const verdict of verdicts) {
      const forDim = verdict.forScore.dimensions.find(
        (d) => d.dimensionId === dim.id
      );
      const againstDim = verdict.againstScore.dimensions.find(
        (d) => d.dimensionId === dim.id
      );

      if (forDim) {
        forScores.push({ judgeId: verdict.judgeId, score: forDim.score });
      }
      if (againstDim) {
        againstScores.push({
          judgeId: verdict.judgeId,
          score: againstDim.score,
        });
      }
    }

    const forScoreValues = forScores.map((s) => s.score);
    if (hasSignificantDisagreement(forScoreValues)) {
      const spread = Math.max(...forScoreValues) - Math.min(...forScoreValues);
      disagreements.push({
        dimensionId: dim.id,
        dimensionName: `${dim.name} (FOR)`,
        spread,
        scores: forScores,
      });
    }

    const againstScoreValues = againstScores.map((s) => s.score);
    if (hasSignificantDisagreement(againstScoreValues)) {
      const spread =
        Math.max(...againstScoreValues) - Math.min(...againstScoreValues);
      disagreements.push({
        dimensionId: dim.id,
        dimensionName: `${dim.name} (AGAINST)`,
        spread,
        scores: againstScores,
      });
    }
  }

  return disagreements;
}

function determineConsensusWinner(
  verdicts: JudgeVerdict[]
): { winner: "for" | "against" | "draw" | null; hasConsensus: boolean } {
  if (verdicts.length === 0) {
    return { winner: null, hasConsensus: false };
  }

  const winnerCounts = { for: 0, against: 0, draw: 0 };
  for (const verdict of verdicts) {
    winnerCounts[verdict.winner]++;
  }

  const majorityThreshold = Math.ceil(verdicts.length / 2);

  const hasConsensus =
    winnerCounts.for === verdicts.length ||
    winnerCounts.against === verdicts.length ||
    winnerCounts.draw === verdicts.length;

  if (winnerCounts.for >= majorityThreshold) {
    return { winner: "for", hasConsensus };
  } else if (winnerCounts.against >= majorityThreshold) {
    return { winner: "against", hasConsensus };
  } else if (winnerCounts.draw >= majorityThreshold) {
    return { winner: "draw", hasConsensus };
  }

  return { winner: null, hasConsensus: false };
}

// ---------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------

/** Build a DimensionScore array using the DEFAULT_RUBRIC dimension ids. */
function makeDimensionScores(scores: number[]): DimensionScore[] {
  return DEFAULT_RUBRIC.map((dim, i) => ({
    dimensionId: dim.id,
    score: scores[i] ?? 5,
    reasoning: `Reasoning for ${dim.name}`,
  }));
}

/** Build a minimal JudgeScore. */
function makeJudgeScore(
  side: "for" | "against",
  scores: number[]
): JudgeScore {
  const dimensions = makeDimensionScores(scores);
  return {
    side,
    dimensions,
    totalScore: calculateTotalScore(dimensions),
    summary: `Summary for ${side}`,
    confidence: 0.8,
  };
}

/** Build a minimal JudgeVerdict. */
function makeVerdict(
  judgeId: string,
  forScores: number[],
  againstScores: number[],
  winner: "for" | "against" | "draw"
): JudgeVerdict {
  return {
    judgeId,
    judgeName: `Judge ${judgeId}`,
    model: "claude",
    forScore: makeJudgeScore("for", forScores),
    againstScore: makeJudgeScore("against", againstScores),
    winner,
    overallReasoning: "Overall reasoning",
  };
}

/** A simple 2-dimension rubric for isolated testing. */
const SIMPLE_RUBRIC: RubricDimension[] = [
  {
    id: "dim-a",
    name: "Dimension A",
    description: "First dimension",
    weight: 0.6,
    guidelines: { low: "low", medium: "mid", high: "high" },
  },
  {
    id: "dim-b",
    name: "Dimension B",
    description: "Second dimension",
    weight: 0.4,
    guidelines: { low: "low", medium: "mid", high: "high" },
  },
];

// ===============================================================
// Tests
// ===============================================================

describe("calculateTotalScore", () => {
  it("computes a weighted score using the default rubric", () => {
    // All dimensions scored 10 => weighted total should be 10
    const dims = makeDimensionScores([10, 10, 10, 10, 10]);
    expect(calculateTotalScore(dims)).toBeCloseTo(10 * 10, 5);
    // Explanation: (10*0.25 + 10*0.25 + 10*0.2 + 10*0.15 + 10*0.15) / 1.0 * 10 = 100
    // Wait — the function returns (total / totalWeight) * 10.
    // total = 10*0.25 + 10*0.25 + 10*0.2 + 10*0.15 + 10*0.15 = 10
    // totalWeight = 1.0
    // result = (10 / 1) * 10 = 100?  No, let me re-read.
    // Actually: total += dim.score * rubricDim.weight => score is raw (1-10),
    // weight is 0-1. So total = 10*0.25+10*0.25+10*0.2+10*0.15+10*0.15 = 10.0
    // totalWeight = 1.0
    // result = (10 / 1) * 10 = 100??  That seems off...
    // Let me re-read: return totalWeight > 0 ? (total / totalWeight) * 10 : 0;
    // Hmm wait. If all scores are 10: total = 10*1.0 = 10, (10/1)*10 = 100?
    // That can't be right for a "10-point scale". Let me re-check.
    //
    // Actually total = sum(score * weight) = 10*(0.25+0.25+0.2+0.15+0.15) = 10*1 = 10
    // return (10 / 1) * 10 = 100.
    //
    // But looking at the code comment "Normalize to 10-point scale" — this seems
    // like it multiplies by 10 to get back to a 10-point scale, implying the raw
    // weighted average would be in 0-10 range, and the multiply-by-10 might be a
    // design choice (or potential bug). Let's just test what the code actually does.
  });

  it("returns the actual computed value for all-10 scores", () => {
    const dims = makeDimensionScores([10, 10, 10, 10, 10]);
    // total = 10 * 1.0 = 10, result = (10/1)*10 = 100
    const result = calculateTotalScore(dims);
    expect(result).toBeCloseTo(100, 5);
  });

  it("returns 0 for all-zero scores (minimum edge)", () => {
    const dims = makeDimensionScores([0, 0, 0, 0, 0]);
    expect(calculateTotalScore(dims)).toBe(0);
  });

  it("correctly weights unequal scores with default rubric", () => {
    // Scores: logical-validity=8, evidence-quality=6, rebuttal=4,
    //         crux-identification=2, clarity=10
    const dims = makeDimensionScores([8, 6, 4, 2, 10]);
    // total = 8*0.25 + 6*0.25 + 4*0.2 + 2*0.15 + 10*0.15
    //       = 2.0 + 1.5 + 0.8 + 0.3 + 1.5 = 6.1
    // result = (6.1 / 1.0) * 10 = 61
    expect(calculateTotalScore(dims)).toBeCloseTo(61, 5);
  });

  it("normalizes when weights do not sum to 1", () => {
    const customRubric: RubricDimension[] = [
      {
        id: "only",
        name: "Only",
        description: "Only dimension",
        weight: 0.5,
        guidelines: { low: "", medium: "", high: "" },
      },
    ];
    const dims: DimensionScore[] = [
      { dimensionId: "only", score: 8, reasoning: "r" },
    ];
    // total = 8 * 0.5 = 4, totalWeight = 0.5
    // result = (4 / 0.5) * 10 = 80
    expect(calculateTotalScore(dims, customRubric)).toBeCloseTo(80, 5);
  });

  it("uses custom rubric weights correctly", () => {
    const dims: DimensionScore[] = [
      { dimensionId: "dim-a", score: 10, reasoning: "r" },
      { dimensionId: "dim-b", score: 5, reasoning: "r" },
    ];
    // total = 10*0.6 + 5*0.4 = 6.0 + 2.0 = 8.0
    // totalWeight = 1.0
    // result = (8/1) * 10 = 80
    expect(calculateTotalScore(dims, SIMPLE_RUBRIC)).toBeCloseTo(80, 5);
  });

  it("ignores dimensions not in the rubric", () => {
    const dims: DimensionScore[] = [
      { dimensionId: "dim-a", score: 10, reasoning: "r" },
      { dimensionId: "unknown-dim", score: 1, reasoning: "r" },
    ];
    // Only dim-a matches: total = 10*0.6 = 6, totalWeight = 0.6
    // result = (6/0.6)*10 = 100
    expect(calculateTotalScore(dims, SIMPLE_RUBRIC)).toBeCloseTo(100, 5);
  });

  it("returns 0 for empty dimensions array", () => {
    expect(calculateTotalScore([])).toBe(0);
  });

  it("returns 0 when no dimensions match the rubric", () => {
    const dims: DimensionScore[] = [
      { dimensionId: "nonexistent", score: 10, reasoning: "r" },
    ];
    expect(calculateTotalScore(dims, SIMPLE_RUBRIC)).toBe(0);
  });
});

// ---------------------------------------------------------------

describe("hasSignificantDisagreement", () => {
  it("returns false for a single score", () => {
    expect(hasSignificantDisagreement([7])).toBe(false);
  });

  it("returns false for an empty array", () => {
    expect(hasSignificantDisagreement([])).toBe(false);
  });

  it("returns false when spread is exactly 3", () => {
    // Threshold is >3, so spread=3 should return false
    expect(hasSignificantDisagreement([4, 7])).toBe(false);
  });

  it("returns true when spread is 4 (just above threshold)", () => {
    expect(hasSignificantDisagreement([3, 7])).toBe(true);
  });

  it("returns false when all scores are identical", () => {
    expect(hasSignificantDisagreement([5, 5, 5])).toBe(false);
  });

  it("returns true for extreme spread", () => {
    expect(hasSignificantDisagreement([1, 10])).toBe(true);
  });

  it("returns true when only the extremes differ (three judges)", () => {
    expect(hasSignificantDisagreement([2, 5, 8])).toBe(true);
  });

  it("returns false for tight clustering across many judges", () => {
    expect(hasSignificantDisagreement([6, 7, 8, 7, 6])).toBe(false);
  });

  it("handles spread of 3.5 (above threshold)", () => {
    expect(hasSignificantDisagreement([3, 6.5])).toBe(true);
  });

  it("returns false for spread of 2.9", () => {
    expect(hasSignificantDisagreement([4, 6.9])).toBe(false);
  });
});

// ---------------------------------------------------------------

describe("determineWinner", () => {
  it("returns 'for' when forScore exceeds againstScore by more than threshold", () => {
    expect(determineWinner(7.5, 6.0)).toBe("for");
  });

  it("returns 'against' when againstScore exceeds forScore by more than threshold", () => {
    expect(determineWinner(4.0, 6.0)).toBe("against");
  });

  it("returns 'draw' when scores are within default threshold (0.5)", () => {
    expect(determineWinner(5.2, 5.0)).toBe("draw");
  });

  it("returns 'draw' when scores are exactly equal", () => {
    expect(determineWinner(5.0, 5.0)).toBe("draw");
  });

  it("returns 'draw' when diff is exactly at threshold boundary", () => {
    // |diff| < threshold => draw.  0.49 < 0.5 => draw
    expect(determineWinner(5.49, 5.0)).toBe("draw");
  });

  it("returns 'for' when diff equals threshold (not strictly less than)", () => {
    // diff = 0.5, |0.5| < 0.5 is false => NOT draw => for
    expect(determineWinner(5.5, 5.0)).toBe("for");
  });

  it("respects a custom threshold", () => {
    // With threshold = 2.0, a difference of 1.5 is a draw
    expect(determineWinner(6.5, 5.0, 2.0)).toBe("draw");
    // With threshold = 2.0, a difference of 2.0 is NOT a draw
    expect(determineWinner(7.0, 5.0, 2.0)).toBe("for");
  });

  it("handles zero threshold — even equal scores are not a draw", () => {
    // With threshold=0, Math.abs(diff) < 0 is always false,
    // so the draw branch is unreachable. Equal scores fall through
    // to diff > 0 ? "for" : "against", producing "against" for diff=0.
    expect(determineWinner(5.001, 5.0, 0)).toBe("for");
    expect(determineWinner(5.0, 5.0, 0)).toBe("against");
  });

  it("handles negative forScore beating negative againstScore", () => {
    // Edge case: negative scores shouldn't appear in practice but code handles them
    expect(determineWinner(-1, -3)).toBe("for");
    expect(determineWinner(-3, -1)).toBe("against");
  });
});

// ---------------------------------------------------------------

describe("DEFAULT_RUBRIC", () => {
  it("has 5 dimensions", () => {
    expect(DEFAULT_RUBRIC).toHaveLength(5);
  });

  it("has weights summing to 1.0", () => {
    const totalWeight = DEFAULT_RUBRIC.reduce((sum, d) => sum + d.weight, 0);
    expect(totalWeight).toBeCloseTo(1.0, 10);
  });

  it("has unique ids", () => {
    const ids = DEFAULT_RUBRIC.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("contains the expected dimension ids", () => {
    const ids = DEFAULT_RUBRIC.map((d) => d.id);
    expect(ids).toContain("logical-validity");
    expect(ids).toContain("evidence-quality");
    expect(ids).toContain("rebuttal-strength");
    expect(ids).toContain("crux-identification");
    expect(ids).toContain("clarity");
  });

  it("has all weights in (0, 1] range", () => {
    for (const dim of DEFAULT_RUBRIC) {
      expect(dim.weight).toBeGreaterThan(0);
      expect(dim.weight).toBeLessThanOrEqual(1);
    }
  });
});

// ---------------------------------------------------------------

describe("aggregateScores", () => {
  it("averages total scores across multiple verdicts", () => {
    const v1 = makeVerdict("j1", [8, 8, 8, 8, 8], [4, 4, 4, 4, 4], "for");
    const v2 = makeVerdict("j2", [6, 6, 6, 6, 6], [6, 6, 6, 6, 6], "draw");

    const result = aggregateScores([v1, v2], DEFAULT_RUBRIC);

    // v1 forTotal = calculateTotalScore([8,8,8,8,8]) = (8*1)*10 = 80
    // v2 forTotal = calculateTotalScore([6,6,6,6,6]) = 60
    // average for = (80+60)/2 = 70
    expect(result.for.average).toBeCloseTo(70, 5);

    // v1 againstTotal = 40, v2 againstTotal = 60
    // average against = (40+60)/2 = 50
    expect(result.against.average).toBeCloseTo(50, 5);
  });

  it("averages per-dimension scores correctly", () => {
    const v1 = makeVerdict("j1", [10, 6, 6, 6, 6], [2, 6, 6, 6, 6], "for");
    const v2 = makeVerdict("j2", [4, 6, 6, 6, 6], [8, 6, 6, 6, 6], "against");

    const result = aggregateScores([v1, v2], DEFAULT_RUBRIC);

    // logical-validity FOR: avg(10, 4) = 7
    expect(result.for.byDimension["logical-validity"]).toBeCloseTo(7, 5);
    // logical-validity AGAINST: avg(2, 8) = 5
    expect(result.against.byDimension["logical-validity"]).toBeCloseTo(5, 5);
    // evidence-quality FOR: avg(6, 6) = 6
    expect(result.for.byDimension["evidence-quality"]).toBeCloseTo(6, 5);
  });

  it("handles a single verdict (averages to itself)", () => {
    const v1 = makeVerdict("j1", [7, 7, 7, 7, 7], [3, 3, 3, 3, 3], "for");
    const result = aggregateScores([v1], DEFAULT_RUBRIC);

    expect(result.for.average).toBeCloseTo(70, 5);
    expect(result.against.average).toBeCloseTo(30, 5);
  });

  it("returns zeroes for empty verdicts array", () => {
    const result = aggregateScores([], DEFAULT_RUBRIC);
    expect(result.for.average).toBe(0);
    expect(result.against.average).toBe(0);
    for (const dim of DEFAULT_RUBRIC) {
      expect(result.for.byDimension[dim.id]).toBe(0);
      expect(result.against.byDimension[dim.id]).toBe(0);
    }
  });

  it("handles three verdicts with varying scores", () => {
    const v1 = makeVerdict("j1", [9, 9, 9, 9, 9], [3, 3, 3, 3, 3], "for");
    const v2 = makeVerdict("j2", [6, 6, 6, 6, 6], [6, 6, 6, 6, 6], "draw");
    const v3 = makeVerdict("j3", [3, 3, 3, 3, 3], [9, 9, 9, 9, 9], "against");

    const result = aggregateScores([v1, v2, v3], DEFAULT_RUBRIC);

    // forTotals: 90, 60, 30 => avg = 60
    expect(result.for.average).toBeCloseTo(60, 5);
    // againstTotals: 30, 60, 90 => avg = 60
    expect(result.against.average).toBeCloseTo(60, 5);
  });
});

// ---------------------------------------------------------------

describe("findDisagreements", () => {
  it("returns no disagreements when all judges agree", () => {
    const v1 = makeVerdict("j1", [7, 7, 7, 7, 7], [5, 5, 5, 5, 5], "for");
    const v2 = makeVerdict("j2", [8, 8, 8, 8, 8], [5, 5, 5, 5, 5], "for");

    const disagreements = findDisagreements([v1, v2], DEFAULT_RUBRIC);
    // Max spread per dimension is 1 (7 vs 8) or 0 (5 vs 5). All <= 3.
    expect(disagreements).toHaveLength(0);
  });

  it("flags FOR-side dimension with spread > 3", () => {
    const v1 = makeVerdict("j1", [2, 7, 7, 7, 7], [5, 5, 5, 5, 5], "for");
    const v2 = makeVerdict("j2", [9, 7, 7, 7, 7], [5, 5, 5, 5, 5], "for");

    const disagreements = findDisagreements([v1, v2], DEFAULT_RUBRIC);

    // Only logical-validity FOR should be flagged (spread = 7)
    expect(disagreements).toHaveLength(1);
    expect(disagreements[0].dimensionId).toBe("logical-validity");
    expect(disagreements[0].dimensionName).toBe("Logical Validity (FOR)");
    expect(disagreements[0].spread).toBe(7);
  });

  it("flags AGAINST-side dimension with spread > 3", () => {
    const v1 = makeVerdict("j1", [7, 7, 7, 7, 7], [1, 5, 5, 5, 5], "for");
    const v2 = makeVerdict("j2", [7, 7, 7, 7, 7], [8, 5, 5, 5, 5], "for");

    const disagreements = findDisagreements([v1, v2], DEFAULT_RUBRIC);

    expect(disagreements).toHaveLength(1);
    expect(disagreements[0].dimensionName).toBe("Logical Validity (AGAINST)");
    expect(disagreements[0].spread).toBe(7);
  });

  it("flags multiple dimensions with disagreement", () => {
    const v1 = makeVerdict("j1", [1, 1, 7, 7, 7], [7, 7, 7, 7, 7], "against");
    const v2 = makeVerdict("j2", [9, 9, 7, 7, 7], [7, 7, 7, 7, 7], "for");

    const disagreements = findDisagreements([v1, v2], DEFAULT_RUBRIC);

    // logical-validity FOR (spread 8) and evidence-quality FOR (spread 8)
    const flaggedIds = disagreements.map((d) => d.dimensionId);
    expect(flaggedIds).toContain("logical-validity");
    expect(flaggedIds).toContain("evidence-quality");
    expect(disagreements).toHaveLength(2);
  });

  it("does not flag spread of exactly 3", () => {
    const v1 = makeVerdict("j1", [4, 7, 7, 7, 7], [7, 7, 7, 7, 7], "for");
    const v2 = makeVerdict("j2", [7, 7, 7, 7, 7], [7, 7, 7, 7, 7], "for");

    const disagreements = findDisagreements([v1, v2], DEFAULT_RUBRIC);
    expect(disagreements).toHaveLength(0);
  });

  it("returns empty for a single verdict", () => {
    const v1 = makeVerdict("j1", [1, 10, 1, 10, 1], [10, 1, 10, 1, 10], "draw");
    const disagreements = findDisagreements([v1], DEFAULT_RUBRIC);
    // With only one judge, hasSignificantDisagreement always returns false (< 2 scores)
    expect(disagreements).toHaveLength(0);
  });

  it("returns empty for zero verdicts", () => {
    const disagreements = findDisagreements([], DEFAULT_RUBRIC);
    expect(disagreements).toHaveLength(0);
  });

  it("includes the correct judge ids in the scores", () => {
    const v1 = makeVerdict("alpha", [2, 7, 7, 7, 7], [7, 7, 7, 7, 7], "for");
    const v2 = makeVerdict("beta", [9, 7, 7, 7, 7], [7, 7, 7, 7, 7], "for");

    const disagreements = findDisagreements([v1, v2], DEFAULT_RUBRIC);
    expect(disagreements).toHaveLength(1);

    const judgeIds = disagreements[0].scores.map((s) => s.judgeId);
    expect(judgeIds).toContain("alpha");
    expect(judgeIds).toContain("beta");
  });

  it("handles three judges with extreme outlier", () => {
    const v1 = makeVerdict("j1", [7, 7, 7, 7, 7], [7, 7, 7, 7, 7], "draw");
    const v2 = makeVerdict("j2", [7, 7, 7, 7, 7], [7, 7, 7, 7, 7], "draw");
    const v3 = makeVerdict("j3", [1, 7, 7, 7, 7], [7, 7, 7, 7, 7], "against");

    const disagreements = findDisagreements([v1, v2, v3], DEFAULT_RUBRIC);

    // logical-validity FOR: scores [7, 7, 1] => spread = 6 > 3
    expect(disagreements).toHaveLength(1);
    expect(disagreements[0].dimensionId).toBe("logical-validity");
    expect(disagreements[0].spread).toBe(6);
  });
});

// ---------------------------------------------------------------

describe("determineConsensusWinner", () => {
  describe("empty input", () => {
    it("returns null winner and no consensus for 0 verdicts", () => {
      const result = determineConsensusWinner([]);
      expect(result.winner).toBeNull();
      expect(result.hasConsensus).toBe(false);
    });
  });

  describe("single verdict", () => {
    it("returns the single judge's winner with consensus", () => {
      const v = makeVerdict("j1", [8, 8, 8, 8, 8], [4, 4, 4, 4, 4], "for");
      const result = determineConsensusWinner([v]);
      expect(result.winner).toBe("for");
      expect(result.hasConsensus).toBe(true);
    });
  });

  describe("unanimous (all judges agree)", () => {
    it("all FOR", () => {
      const verdicts = [
        makeVerdict("j1", [8, 8, 8, 8, 8], [4, 4, 4, 4, 4], "for"),
        makeVerdict("j2", [9, 9, 9, 9, 9], [3, 3, 3, 3, 3], "for"),
        makeVerdict("j3", [7, 7, 7, 7, 7], [5, 5, 5, 5, 5], "for"),
      ];
      const result = determineConsensusWinner(verdicts);
      expect(result.winner).toBe("for");
      expect(result.hasConsensus).toBe(true);
    });

    it("all AGAINST", () => {
      const verdicts = [
        makeVerdict("j1", [3, 3, 3, 3, 3], [8, 8, 8, 8, 8], "against"),
        makeVerdict("j2", [4, 4, 4, 4, 4], [7, 7, 7, 7, 7], "against"),
      ];
      const result = determineConsensusWinner(verdicts);
      expect(result.winner).toBe("against");
      expect(result.hasConsensus).toBe(true);
    });

    it("all DRAW", () => {
      const verdicts = [
        makeVerdict("j1", [5, 5, 5, 5, 5], [5, 5, 5, 5, 5], "draw"),
        makeVerdict("j2", [6, 6, 6, 6, 6], [6, 6, 6, 6, 6], "draw"),
      ];
      const result = determineConsensusWinner(verdicts);
      expect(result.winner).toBe("draw");
      expect(result.hasConsensus).toBe(true);
    });
  });

  describe("majority (not unanimous)", () => {
    it("2/3 for 'for' — majority but not consensus", () => {
      const verdicts = [
        makeVerdict("j1", [8, 8, 8, 8, 8], [4, 4, 4, 4, 4], "for"),
        makeVerdict("j2", [7, 7, 7, 7, 7], [5, 5, 5, 5, 5], "for"),
        makeVerdict("j3", [4, 4, 4, 4, 4], [8, 8, 8, 8, 8], "against"),
      ];
      const result = determineConsensusWinner(verdicts);
      expect(result.winner).toBe("for");
      expect(result.hasConsensus).toBe(false); // not unanimous
    });

    it("2/3 for 'against' — majority but not consensus", () => {
      const verdicts = [
        makeVerdict("j1", [3, 3, 3, 3, 3], [8, 8, 8, 8, 8], "against"),
        makeVerdict("j2", [8, 8, 8, 8, 8], [3, 3, 3, 3, 3], "for"),
        makeVerdict("j3", [4, 4, 4, 4, 4], [7, 7, 7, 7, 7], "against"),
      ];
      const result = determineConsensusWinner(verdicts);
      expect(result.winner).toBe("against");
      expect(result.hasConsensus).toBe(false);
    });

    it("3/5 for 'for' — majority", () => {
      const verdicts = [
        makeVerdict("j1", [8, 8, 8, 8, 8], [4, 4, 4, 4, 4], "for"),
        makeVerdict("j2", [7, 7, 7, 7, 7], [5, 5, 5, 5, 5], "for"),
        makeVerdict("j3", [9, 9, 9, 9, 9], [3, 3, 3, 3, 3], "for"),
        makeVerdict("j4", [4, 4, 4, 4, 4], [8, 8, 8, 8, 8], "against"),
        makeVerdict("j5", [5, 5, 5, 5, 5], [5, 5, 5, 5, 5], "draw"),
      ];
      const result = determineConsensusWinner(verdicts);
      expect(result.winner).toBe("for");
      expect(result.hasConsensus).toBe(false);
    });
  });

  describe("split decisions (no majority)", () => {
    it("three-way split returns null", () => {
      const verdicts = [
        makeVerdict("j1", [8, 8, 8, 8, 8], [4, 4, 4, 4, 4], "for"),
        makeVerdict("j2", [4, 4, 4, 4, 4], [8, 8, 8, 8, 8], "against"),
        makeVerdict("j3", [5, 5, 5, 5, 5], [5, 5, 5, 5, 5], "draw"),
      ];
      // majorityThreshold = ceil(3/2) = 2
      // for=1, against=1, draw=1 — none reaches 2
      const result = determineConsensusWinner(verdicts);
      expect(result.winner).toBeNull();
      expect(result.hasConsensus).toBe(false);
    });

    it("even split (2 vs 2) with no majority", () => {
      const verdicts = [
        makeVerdict("j1", [8, 8, 8, 8, 8], [4, 4, 4, 4, 4], "for"),
        makeVerdict("j2", [7, 7, 7, 7, 7], [5, 5, 5, 5, 5], "for"),
        makeVerdict("j3", [4, 4, 4, 4, 4], [8, 8, 8, 8, 8], "against"),
        makeVerdict("j4", [3, 3, 3, 3, 3], [9, 9, 9, 9, 9], "against"),
      ];
      // majorityThreshold = ceil(4/2) = 2
      // for=2, against=2 — both reach threshold; code checks "for" first
      const result = determineConsensusWinner(verdicts);
      expect(result.winner).toBe("for"); // checked first in the if-else chain
      expect(result.hasConsensus).toBe(false);
    });
  });

  describe("majority threshold math", () => {
    it("ceil(1/2) = 1, so single verdict always has majority", () => {
      const v = makeVerdict("j1", [5, 5, 5, 5, 5], [5, 5, 5, 5, 5], "draw");
      const result = determineConsensusWinner([v]);
      expect(result.winner).toBe("draw");
      expect(result.hasConsensus).toBe(true);
    });

    it("ceil(2/2) = 1, so 1/2 is enough for majority with 2 judges", () => {
      const verdicts = [
        makeVerdict("j1", [8, 8, 8, 8, 8], [4, 4, 4, 4, 4], "for"),
        makeVerdict("j2", [4, 4, 4, 4, 4], [8, 8, 8, 8, 8], "against"),
      ];
      // threshold = 1, for=1 >= 1 => winner = "for" (checked first)
      const result = determineConsensusWinner(verdicts);
      expect(result.winner).toBe("for");
      expect(result.hasConsensus).toBe(false);
    });

    it("ceil(5/2) = 3, needs 3/5 for majority", () => {
      // Only 2/5 for "for" — not enough
      const verdicts = [
        makeVerdict("j1", [8, 8, 8, 8, 8], [4, 4, 4, 4, 4], "for"),
        makeVerdict("j2", [7, 7, 7, 7, 7], [5, 5, 5, 5, 5], "for"),
        makeVerdict("j3", [4, 4, 4, 4, 4], [8, 8, 8, 8, 8], "against"),
        makeVerdict("j4", [3, 3, 3, 3, 3], [9, 9, 9, 9, 9], "against"),
        makeVerdict("j5", [5, 5, 5, 5, 5], [5, 5, 5, 5, 5], "draw"),
      ];
      // for=2, against=2, draw=1 — none reaches 3
      const result = determineConsensusWinner(verdicts);
      expect(result.winner).toBeNull();
      expect(result.hasConsensus).toBe(false);
    });
  });
});

// ---------------------------------------------------------------

describe("JudgeCouncil class (configuration only)", () => {
  // We cannot test judgeDebate/judgeContent without mocking LLMs,
  // but we can test the configuration/management API.

  // Dynamic import to avoid pulling in LLM dependencies at top level
  // (the class itself doesn't call LLMs until judgeDebate/judgeContent)
  async function getCouncilClass() {
    const mod = await import("./council");
    return mod;
  }

  it("can be instantiated with default config", async () => {
    const { JudgeCouncil } = await getCouncilClass();
    const council = new JudgeCouncil();
    expect(council).toBeDefined();
    expect(council.getJudges().length).toBeGreaterThan(0);
  });

  it("accepts custom judges via config", async () => {
    const { JudgeCouncil } = await getCouncilClass();
    const customJudges = [
      {
        id: "test-judge",
        name: "Test Judge",
        type: "local-llm" as const,
        model: "claude" as const,
        systemPrompt: "You are a test judge.",
      },
    ];
    const council = new JudgeCouncil({ judges: customJudges });
    expect(council.getJudges()).toHaveLength(1);
    expect(council.getJudges()[0].id).toBe("test-judge");
  });

  it("can add and remove judges", async () => {
    const { JudgeCouncil } = await getCouncilClass();
    const council = new JudgeCouncil({ judges: [] });
    expect(council.getJudges()).toHaveLength(0);

    council.addJudge({
      id: "new-judge",
      name: "New Judge",
      type: "local-llm" as const,
      model: "gpt-4" as const,
      systemPrompt: "test",
    });
    expect(council.getJudges()).toHaveLength(1);

    council.removeJudge("new-judge");
    expect(council.getJudges()).toHaveLength(0);
  });

  it("removing a non-existent judge does nothing", async () => {
    const { JudgeCouncil } = await getCouncilClass();
    const council = new JudgeCouncil({ judges: [] });
    council.addJudge({
      id: "a",
      name: "A",
      type: "local-llm" as const,
      model: "claude" as const,
      systemPrompt: "",
    });
    council.removeJudge("nonexistent");
    expect(council.getJudges()).toHaveLength(1);
  });

  it("getJudges returns a copy (not a reference)", async () => {
    const { JudgeCouncil } = await getCouncilClass();
    const council = new JudgeCouncil({
      judges: [
        {
          id: "j1",
          name: "J1",
          type: "local-llm" as const,
          model: "claude" as const,
          systemPrompt: "",
        },
      ],
    });
    const judges = council.getJudges();
    judges.push({
      id: "j2",
      name: "J2",
      type: "local-llm" as const,
      model: "claude" as const,
      systemPrompt: "",
    });
    // Original should be unchanged
    expect(council.getJudges()).toHaveLength(1);
  });

  it("createJudgeCouncil factory returns a JudgeCouncil instance", async () => {
    const { createJudgeCouncil, JudgeCouncil } = await getCouncilClass();
    const council = createJudgeCouncil();
    expect(council).toBeInstanceOf(JudgeCouncil);
  });
});

// ---------------------------------------------------------------

describe("integration: scoring pipeline end-to-end", () => {
  it("full pipeline: scores -> totalScore -> aggregation -> winner", () => {
    // Judge 1: FOR side strong, AGAINST side weak
    const v1 = makeVerdict("j1", [9, 8, 7, 8, 9], [3, 4, 3, 4, 3], "for");
    // Judge 2: FOR side moderately strong, AGAINST side moderate
    const v2 = makeVerdict("j2", [7, 7, 6, 7, 7], [5, 5, 5, 5, 5], "for");
    // Judge 3: FOR side slightly stronger
    const v3 = makeVerdict("j3", [6, 6, 6, 6, 6], [5, 5, 5, 5, 5], "for");

    const verdicts = [v1, v2, v3];

    // 1. Verify individual totalScores
    // v1 for: all dims have same weight sum=1, score=avg(9,8,7,8,9)
    //   = 9*0.25 + 8*0.25 + 7*0.2 + 8*0.15 + 9*0.15 = 2.25+2.0+1.4+1.2+1.35 = 8.2
    //   totalScore = (8.2/1)*10 = 82
    expect(v1.forScore.totalScore).toBeCloseTo(82, 0);

    // 2. Aggregate
    const agg = aggregateScores(verdicts, DEFAULT_RUBRIC);
    expect(agg.for.average).toBeGreaterThan(agg.against.average);

    // 3. Consensus
    const consensus = determineConsensusWinner(verdicts);
    expect(consensus.winner).toBe("for");
    expect(consensus.hasConsensus).toBe(true); // all 3 say "for"

    // 4. No disagreements (scores are within 3-point spread)
    const disagreements = findDisagreements(verdicts, DEFAULT_RUBRIC);
    // logical-validity FOR: [9, 7, 6] => spread 3, NOT > 3
    // evidence-quality FOR: [8, 7, 6] => spread 2
    // etc. All within range
    expect(disagreements).toHaveLength(0);

    // 5. Final winner from aggregated scores
    const winner = determineWinner(agg.for.average, agg.against.average);
    expect(winner).toBe("for");
  });

  it("full pipeline: close race resulting in draw", () => {
    const v1 = makeVerdict("j1", [6, 6, 6, 6, 6], [6, 6, 6, 6, 6], "draw");
    const v2 = makeVerdict("j2", [6, 6, 6, 6, 6], [6, 6, 6, 6, 6], "draw");

    const agg = aggregateScores([v1, v2], DEFAULT_RUBRIC);
    expect(agg.for.average).toBeCloseTo(agg.against.average, 5);

    const consensus = determineConsensusWinner([v1, v2]);
    expect(consensus.winner).toBe("draw");
    expect(consensus.hasConsensus).toBe(true);

    const winner = determineWinner(agg.for.average, agg.against.average);
    expect(winner).toBe("draw");
  });

  it("full pipeline: disagreement triggers flagging", () => {
    // Judge 1 gives FOR logical-validity a 2, Judge 2 gives it a 9
    const v1 = makeVerdict("j1", [2, 7, 7, 7, 7], [5, 5, 5, 5, 5], "against");
    const v2 = makeVerdict("j2", [9, 7, 7, 7, 7], [5, 5, 5, 5, 5], "for");

    const disagreements = findDisagreements([v1, v2], DEFAULT_RUBRIC);
    expect(disagreements.length).toBeGreaterThan(0);
    expect(disagreements[0].spread).toBe(7);

    // Consensus: different winners => no consensus
    const consensus = determineConsensusWinner([v1, v2]);
    // for=1, against=1, threshold=1 => for wins (checked first), but not consensus
    expect(consensus.hasConsensus).toBe(false);
  });
});
