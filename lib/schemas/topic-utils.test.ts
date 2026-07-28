import { describe, it, expect } from "vitest";
import {
  computeBalance,
  computeWeight,
  getVerdict,
  getLeanLabel,
  calculateEvidenceScore,
  type Pillar,
  type Evidence,
  type EvidenceWeight,
} from "./topic";
import { WEIGHT, VERDICT } from "@/lib/constants";

// ============================================================================
// Fixture helper for computeWeight / getVerdict tests
// ============================================================================

function ev(side: "for" | "against", each: number): Evidence {
  // `each` = per-dimension weight (0-10); total strength = each * 4
  return {
    id: `e-${side}-${Math.random().toString(36).slice(2, 8)}`,
    title: "t",
    description: "d",
    side,
    weight: { sourceReliability: each, independence: each, replicability: each, directness: each },
  };
}

function pillar(
  evidence: Evidence[],
  status: "verified" | "theoretical" | "impossible" = "verified"
): Pillar {
  return {
    id: `p-${Math.random().toString(36).slice(2, 8)}`,
    title: "P",
    short_summary: "s",
    icon_name: "Target",
    skeptic_premise: "sp",
    proponent_rebuttal: "pr",
    crux: {
      id: "c1",
      title: "C",
      description: "d",
      methodology: "m",
      verification_status: status,
      cost_to_verify: "$0",
    },
    evidence,
  };
}

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
// computeBalance
// ============================================================================

describe("computeBalance", () => {
  it("returns 50 for no evidence (empty pillars)", () => {
    const pillars = [makePillar([])];
    expect(computeBalance(pillars)).toBe(50);
  });

  it("returns 50 for pillars with no evidence arrays", () => {
    const pillar = makePillar([]);
    // Remove the evidence array entirely
    delete (pillar as Record<string, unknown>).evidence;
    expect(computeBalance([pillar])).toBe(50);
  });

  it("returns >50 when for evidence outweighs against", () => {
    const pillars = [
      makePillar([
        { side: "for", weights: [9, 9, 9, 9] },
        { side: "against", weights: [2, 2, 2, 2] },
      ]),
    ];
    const score = computeBalance(pillars);
    expect(score).toBeGreaterThan(50);
  });

  it("returns <50 when against evidence outweighs for", () => {
    const pillars = [
      makePillar([
        { side: "for", weights: [2, 2, 2, 2] },
        { side: "against", weights: [9, 9, 9, 9] },
      ]),
    ];
    const score = computeBalance(pillars);
    expect(score).toBeLessThan(50);
  });

  it("handles a single for evidence item", () => {
    const pillars = [
      makePillar([{ side: "for", weights: [5, 5, 5, 5] }]),
    ];
    const score = computeBalance(pillars);
    // forScore=20, againstScore=0, raw = 20/(20+0+1) ≈ 0.952
    expect(score).toBeGreaterThan(50);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("handles a single against evidence item", () => {
    const pillars = [
      makePillar([{ side: "against", weights: [5, 5, 5, 5] }]),
    ];
    const score = computeBalance(pillars);
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
    const score = computeBalance(pillars);
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

    const forScore = computeBalance(extremeFor);
    const againstScore = computeBalance(extremeAgainst);

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
    const forScore = computeBalance(forHeavy);
    const againstScore = computeBalance(againstHeavy);
    // With the +1 term gone, symmetry is exact to rounding
    expect(Math.abs(forScore + againstScore - 100)).toBeLessThanOrEqual(1);
  });
});

// ============================================================================
// computeWeight
// ============================================================================

describe("computeWeight", () => {
  it("returns 0 for no pillars", () => {
    expect(computeWeight([])).toBe(0);
  });

  it("returns only the resolvability component for pillars with no evidence", () => {
    // mass=0, quality=0, resolvability=1 (verified) => 100 * W_RESOLVABILITY
    expect(computeWeight([pillar([], "verified")])).toBe(
      Math.round(100 * WEIGHT.W_RESOLVABILITY)
    );
  });

  it("increases with more evidence (mass)", () => {
    const thin = computeWeight([pillar([ev("for", 8), ev("against", 8)])]);
    const rich = computeWeight([
      pillar(Array.from({ length: 8 }, (_, i) => ev(i % 2 ? "for" : "against", 8))),
    ]);
    expect(rich).toBeGreaterThan(thin);
  });

  it("increases with average evidence quality", () => {
    const low = computeWeight([pillar([ev("for", 3), ev("against", 3)])]);
    const high = computeWeight([pillar([ev("for", 9), ev("against", 9)])]);
    expect(high).toBeGreaterThan(low);
  });

  it("increases with crux resolvability, all else equal", () => {
    const evs = () => [ev("for", 8), ev("against", 8)];
    const impossible = computeWeight([pillar(evs(), "impossible")]);
    const theoretical = computeWeight([pillar(evs(), "theoretical")]);
    const verified = computeWeight([pillar(evs(), "verified")]);
    expect(verified).toBeGreaterThan(theoretical);
    expect(theoretical).toBeGreaterThan(impossible);
  });

  it("saturates: stays within 0-100 even for huge corpora", () => {
    const huge = [
      pillar(Array.from({ length: 100 }, (_, i) => ev(i % 2 ? "for" : "against", 10))),
    ];
    const w = computeWeight(huge);
    expect(w).toBeGreaterThan(80);
    expect(w).toBeLessThanOrEqual(100);
  });
});

// ============================================================================
// getVerdict
// ============================================================================

describe("getVerdict", () => {
  it("high weight + strong lean => settled, names the favored side", () => {
    const v = getVerdict(80, 80);
    expect(v.quadrant).toBe("settled");
    expect(v.label).toContain("favors the claim");
    const against = getVerdict(20, 80);
    expect(against.quadrant).toBe("settled");
    expect(against.label).toContain("favors the counterclaim");
  });

  it("high weight + weak lean => well-mapped, genuinely contested", () => {
    const v = getVerdict(55, 80);
    expect(v.quadrant).toBe("contested");
    expect(v.label).toBe("Well-mapped, genuinely contested");
  });

  it("medium weight => moderately evidenced, with lean", () => {
    expect(getVerdict(65, 50).quadrant).toBe("moderate");
    expect(getVerdict(65, 50).label).toContain("moderately evidenced");
    expect(getVerdict(51, 50).label).toContain("Balanced");
  });

  it("low weight => open question regardless of lean", () => {
    const v = getVerdict(90, 20);
    expect(v.quadrant).toBe("open");
    expect(v.label).toBe("Open question — limited evidence so far");
  });

  it("boundary behavior matches VERDICT constants", () => {
    expect(getVerdict(50 + VERDICT.SETTLED_D, VERDICT.HIGH_WEIGHT).quadrant).toBe("settled");
    expect(getVerdict(50, VERDICT.HIGH_WEIGHT).quadrant).toBe("contested");
    expect(getVerdict(50, VERDICT.LOW_WEIGHT).quadrant).toBe("moderate");
    expect(getVerdict(50, VERDICT.LOW_WEIGHT - 1).quadrant).toBe("open");
  });
});

// ============================================================================
// getLeanLabel
// ============================================================================

describe("getLeanLabel", () => {
  it("labels by lean magnitude", () => {
    expect(getLeanLabel(50)).toBe("Evenly balanced");
    expect(getLeanLabel(60)).toBe("Leans toward the claim");
    expect(getLeanLabel(40)).toBe("Leans toward the counterclaim");
    expect(getLeanLabel(75)).toBe("Clearly favors the claim");
    expect(getLeanLabel(5)).toBe("Strongly favors the counterclaim");
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
