import { describe, it, expect } from "vitest";
import {
  computeConfidenceScore,
  calculateEvidenceScore,
  getVerdictLabel,
  type Pillar,
  type EvidenceWeight,
} from "./topic";

// ============================================================================
// Helper to build a minimal valid pillar
// ============================================================================

function makePillar(
  evidence: { side: "for" | "against"; weights: [number, number, number, number] }[] = []
): Pillar {
  return {
    id: "p-test",
    title: "Test Pillar",
    short_summary: "Summary",
    icon_name: "Scale",
    skeptic_premise: "Skeptic view",
    proponent_rebuttal: "Proponent view",
    crux: {
      id: "c-test",
      title: "Test Crux",
      description: "Desc",
      methodology: "Method",
      verification_status: "theoretical",
      cost_to_verify: "$0",
    },
    evidence: evidence.map((e, i) => ({
      id: `ev-${i}`,
      title: `Evidence ${i}`,
      description: `Description ${i}`,
      side: e.side,
      weight: {
        sourceReliability: e.weights[0],
        independence: e.weights[1],
        replicability: e.weights[2],
        directness: e.weights[3],
      },
    })),
  };
}

// ============================================================================
// computeConfidenceScore
// ============================================================================

describe("computeConfidenceScore", () => {
  it("returns 50 for no evidence (empty pillars)", () => {
    const pillars = [makePillar([])];
    expect(computeConfidenceScore(pillars)).toBe(50);
  });

  it("returns 50 for pillars with no evidence arrays", () => {
    const pillar = makePillar([]);
    // Remove the evidence array entirely
    delete (pillar as Record<string, unknown>).evidence;
    expect(computeConfidenceScore([pillar])).toBe(50);
  });

  it("returns >50 when for evidence outweighs against", () => {
    const pillars = [
      makePillar([
        { side: "for", weights: [9, 9, 9, 9] },
        { side: "against", weights: [2, 2, 2, 2] },
      ]),
    ];
    const score = computeConfidenceScore(pillars);
    expect(score).toBeGreaterThan(50);
  });

  it("returns <50 when against evidence outweighs for", () => {
    const pillars = [
      makePillar([
        { side: "for", weights: [2, 2, 2, 2] },
        { side: "against", weights: [9, 9, 9, 9] },
      ]),
    ];
    const score = computeConfidenceScore(pillars);
    expect(score).toBeLessThan(50);
  });

  it("handles a single for evidence item", () => {
    const pillars = [
      makePillar([{ side: "for", weights: [5, 5, 5, 5] }]),
    ];
    const score = computeConfidenceScore(pillars);
    // forScore=20, againstScore=0, raw = 20/(20+0+1) ≈ 0.952
    expect(score).toBeGreaterThan(50);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("handles a single against evidence item", () => {
    const pillars = [
      makePillar([{ side: "against", weights: [5, 5, 5, 5] }]),
    ];
    const score = computeConfidenceScore(pillars);
    // forScore=0, againstScore=20, raw = 0/(0+20+1) ≈ 0
    expect(score).toBeLessThan(50);
    expect(score).toBeGreaterThanOrEqual(0);
  });

  it("handles many evidence items across multiple pillars", () => {
    const pillars = [
      makePillar([
        { side: "for", weights: [8, 8, 8, 8] },
        { side: "for", weights: [7, 7, 7, 7] },
        { side: "against", weights: [3, 3, 3, 3] },
      ]),
      makePillar([
        { side: "for", weights: [6, 6, 6, 6] },
        { side: "against", weights: [4, 4, 4, 4] },
      ]),
    ];
    const score = computeConfidenceScore(pillars);
    // forScore = 32+28+24 = 84, againstScore = 12+16 = 28
    // raw = 84 / (84 + 28 + 1) = 84/113 ≈ 0.743 → 74
    expect(score).toBeGreaterThan(50);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("returns a value between 0 and 100 inclusive", () => {
    // Test with extreme values
    const extremeFor = [
      makePillar([{ side: "for", weights: [10, 10, 10, 10] }]),
    ];
    const extremeAgainst = [
      makePillar([{ side: "against", weights: [10, 10, 10, 10] }]),
    ];

    const forScore = computeConfidenceScore(extremeFor);
    const againstScore = computeConfidenceScore(extremeAgainst);

    expect(forScore).toBeGreaterThanOrEqual(0);
    expect(forScore).toBeLessThanOrEqual(100);
    expect(againstScore).toBeGreaterThanOrEqual(0);
    expect(againstScore).toBeLessThanOrEqual(100);
  });

  it("produces symmetric scores for symmetric evidence", () => {
    const forHeavy = [
      makePillar([
        { side: "for", weights: [8, 8, 8, 8] },
        { side: "against", weights: [3, 3, 3, 3] },
      ]),
    ];
    const againstHeavy = [
      makePillar([
        { side: "for", weights: [3, 3, 3, 3] },
        { side: "against", weights: [8, 8, 8, 8] },
      ]),
    ];
    const forScore = computeConfidenceScore(forHeavy);
    const againstScore = computeConfidenceScore(againstHeavy);
    // They should be roughly symmetric around 50
    expect(forScore + againstScore).toBeCloseTo(100, -1);
  });
});

// ============================================================================
// getVerdictLabel
// ============================================================================

describe("getVerdictLabel", () => {
  it("returns 'Established beyond reasonable doubt' for score >= 95", () => {
    expect(getVerdictLabel(95)).toBe("Established beyond reasonable doubt");
    expect(getVerdictLabel(100)).toBe("Established beyond reasonable doubt");
    expect(getVerdictLabel(98)).toBe("Established beyond reasonable doubt");
  });

  it("returns 'Preponderance of evidence supports' for score 75-94", () => {
    expect(getVerdictLabel(75)).toBe("Preponderance of evidence supports");
    expect(getVerdictLabel(80)).toBe("Preponderance of evidence supports");
    expect(getVerdictLabel(94)).toBe("Preponderance of evidence supports");
  });

  it("returns 'Evidence leans toward, but contested' for score 50-74", () => {
    expect(getVerdictLabel(50)).toBe("Evidence leans toward, but contested");
    expect(getVerdictLabel(60)).toBe("Evidence leans toward, but contested");
    expect(getVerdictLabel(74)).toBe("Evidence leans toward, but contested");
  });

  it("returns 'Insufficient evidence' for score < 50", () => {
    expect(getVerdictLabel(0)).toBe("Insufficient evidence");
    expect(getVerdictLabel(30)).toBe("Insufficient evidence");
    expect(getVerdictLabel(49)).toBe("Insufficient evidence");
  });

  it("handles edge case at exactly 0", () => {
    expect(getVerdictLabel(0)).toBe("Insufficient evidence");
  });
});

// ============================================================================
// calculateEvidenceScore
// ============================================================================

describe("calculateEvidenceScore", () => {
  it("returns the sum of all 4 weight dimensions", () => {
    const weight: EvidenceWeight = {
      sourceReliability: 8,
      independence: 7,
      replicability: 6,
      directness: 5,
    };
    expect(calculateEvidenceScore(weight)).toBe(26);
  });

  it("returns 0 for minimum weights (all 0s)", () => {
    const weight: EvidenceWeight = {
      sourceReliability: 0,
      independence: 0,
      replicability: 0,
      directness: 0,
    };
    expect(calculateEvidenceScore(weight)).toBe(0);
  });

  it("returns 40 for maximum weights (all 10s)", () => {
    const weight: EvidenceWeight = {
      sourceReliability: 10,
      independence: 10,
      replicability: 10,
      directness: 10,
    };
    expect(calculateEvidenceScore(weight)).toBe(40);
  });

  it("handles mixed weights correctly", () => {
    const weight: EvidenceWeight = {
      sourceReliability: 1,
      independence: 10,
      replicability: 5,
      directness: 3,
    };
    expect(calculateEvidenceScore(weight)).toBe(19);
  });

  it("handles single dimension at maximum, rest at minimum", () => {
    const weight: EvidenceWeight = {
      sourceReliability: 10,
      independence: 0,
      replicability: 0,
      directness: 0,
    };
    expect(calculateEvidenceScore(weight)).toBe(10);
  });
});
