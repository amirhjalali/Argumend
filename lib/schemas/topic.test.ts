import { describe, it, expect } from "vitest";
import {
  TopicSchema,
  EvidenceSchema,
  PillarSchema,
  computeConfidenceScore,
  calculateEvidenceScore,
  getVerdictLabel,
  parseTopic,
  safeParseTopics,
} from "./topic";

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
    status: "contested",
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
});

describe("computeConfidenceScore", () => {
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

    expect(computeConfidenceScore(pillars)).toBe(50);
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

    const score = computeConfidenceScore(pillars);
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

describe("getVerdictLabel", () => {
  it("returns correct labels for different score ranges", () => {
    expect(getVerdictLabel(98)).toBe("Established beyond reasonable doubt");
    expect(getVerdictLabel(80)).toBe("Preponderance of evidence supports");
    expect(getVerdictLabel(60)).toBe("Evidence leans toward, but contested");
    expect(getVerdictLabel(30)).toBe("Insufficient evidence");
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
