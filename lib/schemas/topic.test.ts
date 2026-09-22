import { describe, it, expect } from "vitest";
import {
  TopicSchema,
  EvidenceSchema,
  PillarSchema,
  VerdictSchema,
  applyVerdictRobustness,
  computeBalance,
  getVerdict,
  calculateEvidenceScore,
  parseTopic,
  safeParseTopics,
} from "./topic";
import type { VerdictSensitivity } from "@/lib/verdictSensitivity";

describe("EvidenceSchema", () => {
  it("validates a valid evidence object", () => {
    const evidence = {
      id: "ev-1",
      title: "Test Evidence",
      description: "A description",
      side: "for",
      weight: {
        sourceReliability: 8,
        independence: 7,
        replicability: 9,
        directness: 6,
      },
    };

    const result = EvidenceSchema.safeParse(evidence);
    expect(result.success).toBe(true);
  });

  it("rejects evidence with invalid side", () => {
    const evidence = {
      id: "ev-1",
      title: "Test",
      description: "Desc",
      side: "neutral", // Invalid
      weight: {
        sourceReliability: 8,
        independence: 7,
        replicability: 9,
        directness: 6,
      },
    };

    const result = EvidenceSchema.safeParse(evidence);
    expect(result.success).toBe(false);
  });

  it("rejects weights outside 0-10 range", () => {
    const evidence = {
      id: "ev-1",
      title: "Test",
      description: "Desc",
      side: "for",
      weight: {
        sourceReliability: 15, // Invalid
        independence: 7,
        replicability: 9,
        directness: 6,
      },
    };

    const result = EvidenceSchema.safeParse(evidence);
    expect(result.success).toBe(false);
  });
});

describe("PillarSchema", () => {
  const validPillar = {
    id: "pillar-1",
    title: "Test Pillar",
    short_summary: "A summary",
    icon_name: "Scale",
    skeptic_premise: "The skeptic says...",
    proponent_rebuttal: "The proponent responds...",
    crux: {
      id: "crux-1",
      title: "Test Crux",
      description: "A description",
      methodology: "A methodology",
      verification_status: "theoretical",
      cost_to_verify: "$100",
    },
  };

  it("validates a valid pillar", () => {
    const result = PillarSchema.safeParse(validPillar);
    expect(result.success).toBe(true);
  });

  it("validates a pillar with evidence", () => {
    const pillarWithEvidence = {
      ...validPillar,
      evidence: [
        {
          id: "ev-1",
          title: "Evidence 1",
          description: "Desc",
          side: "for",
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 6,
          },
        },
      ],
    };

    const result = PillarSchema.safeParse(pillarWithEvidence);
    expect(result.success).toBe(true);
  });
});

describe("TopicSchema", () => {
  const validTopic = {
    id: "topic-1",
    title: "Test Topic",
    meta_claim: "A claim",
    confidence_score: 75,
    balance: 75,
    weight: 60,
    verdict: { label: "Leans toward the claim — moderately evidenced", quadrant: "moderate" },
    status: "contested",
    category: "policy",
    pillars: [
      {
        id: "pillar-1",
        title: "Test Pillar",
        short_summary: "Summary",
        icon_name: "Scale",
        skeptic_premise: "Skeptic view",
        proponent_rebuttal: "Proponent view",
        crux: {
          id: "crux-1",
          title: "Crux",
          description: "Desc",
          methodology: "Method",
          verification_status: "theoretical",
          cost_to_verify: "$0",
        },
      },
    ],
  };

  it("validates a valid topic", () => {
    const result = TopicSchema.safeParse(validTopic);
    expect(result.success).toBe(true);
  });

  it("rejects confidence score outside 0-100", () => {
    const invalidTopic = { ...validTopic, confidence_score: 150 };
    const result = TopicSchema.safeParse(invalidTopic);
    expect(result.success).toBe(false);
  });

  it("rejects invalid status", () => {
    const invalidTopic = { ...validTopic, status: "unknown" };
    const result = TopicSchema.safeParse(invalidTopic);
    expect(result.success).toBe(false);
  });

  it("rejects balance/weight outside 0-100", () => {
    expect(TopicSchema.safeParse({ ...validTopic, balance: 150 }).success).toBe(false);
    expect(TopicSchema.safeParse({ ...validTopic, weight: -5 }).success).toBe(false);
  });

  it("rejects an invalid verdict quadrant", () => {
    expect(
      TopicSchema.safeParse({
        ...validTopic,
        verdict: { label: "x", quadrant: "sideways" },
      }).success
    ).toBe(false);
  });
});

describe("computeBalance", () => {
  it("returns 50 for empty evidence", () => {
    const pillars = [
      {
        id: "p-1",
        title: "Test",
        short_summary: "Summary",
        icon_name: "Scale" as const,
        skeptic_premise: "Skeptic",
        proponent_rebuttal: "Proponent",
        crux: {
          id: "c-1",
          title: "Crux",
          description: "Desc",
          methodology: "Method",
          verification_status: "theoretical" as const,
          cost_to_verify: "$0",
        },
      },
    ];

    expect(computeBalance(pillars)).toBe(50);
  });

  it("calculates higher score when for evidence outweighs against", () => {
    const pillars = [
      {
        id: "p-1",
        title: "Test",
        short_summary: "Summary",
        icon_name: "Scale" as const,
        skeptic_premise: "Skeptic",
        proponent_rebuttal: "Proponent",
        crux: {
          id: "c-1",
          title: "Crux",
          description: "Desc",
          methodology: "Method",
          verification_status: "theoretical" as const,
          cost_to_verify: "$0",
        },
        evidence: [
          {
            id: "ev-1",
            title: "Strong For",
            description: "Desc",
            side: "for" as const,
            weight: { sourceReliability: 10, independence: 10, replicability: 10, directness: 10 },
          },
          {
            id: "ev-2",
            title: "Weak Against",
            description: "Desc",
            side: "against" as const,
            weight: { sourceReliability: 2, independence: 2, replicability: 2, directness: 2 },
          },
        ],
      },
    ];

    const score = computeBalance(pillars);
    expect(score).toBeGreaterThan(50);
    expect(score).toBeLessThanOrEqual(100);
  });
});

describe("calculateEvidenceScore", () => {
  it("sums all weight dimensions", () => {
    const weight = {
      sourceReliability: 8,
      independence: 7,
      replicability: 6,
      directness: 5,
    };

    expect(calculateEvidenceScore(weight)).toBe(26);
  });

  it("returns 40 for max weights", () => {
    const maxWeight = {
      sourceReliability: 10,
      independence: 10,
      replicability: 10,
      directness: 10,
    };

    expect(calculateEvidenceScore(maxWeight)).toBe(40);
  });
});

describe("getVerdict", () => {
  it("returns 2-D verdicts", () => {
    expect(getVerdict(80, 80).quadrant).toBe("settled");
    expect(getVerdict(52, 70).quadrant).toBe("contested");
    expect(getVerdict(60, 50).quadrant).toBe("moderate");
    expect(getVerdict(60, 20).quadrant).toBe("open");
  });

  it("never sets fragile on its own — that is the guard's job", () => {
    expect(getVerdict(80, 80).fragile).toBeUndefined();
  });
});

describe("applyVerdictRobustness", () => {
  const sensitivity = (over: Partial<VerdictSensitivity>): VerdictSensitivity => ({
    quadrant: "settled",
    balance: 80,
    cardCount: 12,
    flipsToChange: 2,
    oneCardBalanceRange: { min: 72, max: 88, span: 16 },
    ...over,
  });

  it("leaves a robust settled verdict alone", () => {
    const verdict = getVerdict(80, 80);
    expect(applyVerdictRobustness(verdict, 80, sensitivity({}))).toEqual(verdict);
  });

  it("demotes a settled verdict that one card could undo", () => {
    const guarded = applyVerdictRobustness(
      getVerdict(80, 80),
      80,
      sensitivity({ flipsToChange: 1 })
    );
    expect(guarded.quadrant).toBe("moderate");
    expect(guarded.fragile).toBe(true);
    expect(guarded.label).toBe("Clearly favors the claim");
    expect(guarded.label).not.toMatch(/settled/i);
  });

  it("demotes a settled verdict on a map with too few cards", () => {
    const guarded = applyVerdictRobustness(getVerdict(95, 80), 95, sensitivity({ cardCount: 4 }));
    expect(guarded.quadrant).toBe("moderate");
    expect(guarded.fragile).toBe(true);
    expect(guarded.label).toBe("Strongly favors the claim");
  });

  it("keeps the direction of the lean when it demotes", () => {
    const guarded = applyVerdictRobustness(
      getVerdict(20, 80),
      20,
      sensitivity({ flipsToChange: 1, balance: 20 })
    );
    expect(guarded.label).toBe("Clearly favors the counterclaim");
  });

  it("pins a fragile settled reading when the topic is authored settled", () => {
    const pinned = applyVerdictRobustness(
      getVerdict(76, 82),
      76,
      sensitivity({ flipsToChange: 1, cardCount: 8, balance: 76 }),
      "settled"
    );
    expect(pinned.quadrant).toBe("settled");
    expect(pinned.label).toBe("Settled — evidence strongly favors the claim");
    // The pin keeps the word; it does not hide the measurement.
    expect(pinned.fragile).toBe(true);
    expect(pinned.pinnedByStatus).toBe(true);
  });

  it("does not pin a settled reading that never needed pinning", () => {
    const robust = applyVerdictRobustness(
      getVerdict(85, 83),
      85,
      sensitivity({ flipsToChange: 2, balance: 85 }),
      "settled"
    );
    expect(robust.quadrant).toBe("settled");
    expect(robust.fragile).toBeUndefined();
    expect(robust.pinnedByStatus).toBeUndefined();
  });

  it("pins on no authored status other than settled", () => {
    for (const status of ["contested", "highly_speculative", undefined] as const) {
      const guarded = applyVerdictRobustness(
        getVerdict(76, 82),
        76,
        sensitivity({ flipsToChange: 1, balance: 76 }),
        status
      );
      expect(guarded.quadrant, `status ${status}`).toBe("moderate");
      expect(guarded.fragile, `status ${status}`).toBe(true);
      expect(guarded.pinnedByStatus, `status ${status}`).toBeUndefined();
    }
  });

  it("never promotes: an authored-settled topic whose map is contested stays contested", () => {
    const verdict = getVerdict(55, 80);
    expect(verdict.quadrant).toBe("contested");
    const guarded = applyVerdictRobustness(
      verdict,
      55,
      sensitivity({ quadrant: "contested", flipsToChange: 1, balance: 55 }),
      "settled"
    );
    expect(guarded).toEqual(verdict);
    expect(guarded.pinnedByStatus).toBeUndefined();
    expect(guarded.fragile).toBeUndefined();
  });

  it("a pinned verdict parses as a Verdict", () => {
    const pinned = applyVerdictRobustness(
      getVerdict(76, 82),
      76,
      sensitivity({ flipsToChange: 1 }),
      "settled"
    );
    expect(VerdictSchema.safeParse(pinned).success).toBe(true);
  });

  it("never touches contested, moderate or open", () => {
    for (const [balance, weight] of [
      [52, 70],
      [60, 50],
      [60, 20],
    ] as const) {
      const verdict = getVerdict(balance, weight);
      const guarded = applyVerdictRobustness(
        verdict,
        balance,
        sensitivity({ quadrant: verdict.quadrant, flipsToChange: 1, cardCount: 2 })
      );
      expect(guarded).toEqual(verdict);
      expect(guarded.fragile).toBeUndefined();
    }
  });

  it("parses as a Verdict once fragile is set", () => {
    const guarded = applyVerdictRobustness(
      getVerdict(80, 80),
      80,
      sensitivity({ flipsToChange: 1 })
    );
    expect(VerdictSchema.safeParse(guarded).success).toBe(true);
  });
});

describe("parseTopic", () => {
  it("throws for invalid topic", () => {
    expect(() => parseTopic({ invalid: "data" })).toThrow();
  });
});

describe("safeParseTopics", () => {
  it("collects errors for invalid topics", () => {
    const result = safeParseTopics([
      { id: "bad-1", invalid: true },
      { id: "bad-2", also: "invalid" },
    ]);

    expect(result.success).toBe(false);
    expect(result.errors.length).toBe(2);
    expect(result.topics.length).toBe(0);
  });
});
