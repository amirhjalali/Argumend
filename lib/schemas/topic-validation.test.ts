import { describe, it, expect } from "vitest";
import {
  TopicCategorySchema,
  TopicStatusSchema,
  IconNameSchema,
  ReferenceSchema,
  EvidenceSchema,
  TopicSchema,
  computeConfidenceScore,
  parseTopic,
  safeParseTopics,
  type Pillar,
} from "./topic";

// Complements topic.test.ts: confidence-score asymmetry/uncertainty, enum
// schemas, URL validation, keystone_fact, and the mixed valid/invalid path of
// safeParseTopics. (Boundary cases for confidenceTier/getVerdict* live in
// flagship.test.ts / verdict-sentence.test.ts.)

const validTopic = {
  id: "topic-1",
  title: "Test Topic",
  meta_claim: "A claim",
  confidence_score: 75,
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

function pillarWith(evidence: Pillar["evidence"]): Pillar {
  return { ...validTopic.pillars[0], evidence } as Pillar;
}

const strong = { sourceReliability: 10, independence: 10, replicability: 10, directness: 10 };

describe("computeConfidenceScore — asymmetry and uncertainty", () => {
  it("falls below 50 when against evidence outweighs for", () => {
    const score = computeConfidenceScore([
      pillarWith([
        { id: "e1", title: "weak for", description: "d", side: "for", weight: { sourceReliability: 2, independence: 2, replicability: 2, directness: 2 } },
        { id: "e2", title: "strong against", description: "d", side: "against", weight: strong },
      ]),
    ]);
    expect(score).toBeLessThan(50);
  });

  it("stays just under 50 for evenly matched evidence (the +1 uncertainty term)", () => {
    const score = computeConfidenceScore([
      pillarWith([
        { id: "e1", title: "for", description: "d", side: "for", weight: strong },
        { id: "e2", title: "against", description: "d", side: "against", weight: strong },
      ]),
    ]);
    expect(score).toBeLessThan(50);
    expect(score).toBeGreaterThanOrEqual(48);
  });
});

describe("enum schemas", () => {
  it("accepts every documented category and status", () => {
    for (const c of ["policy", "technology", "science", "economics", "philosophy"]) {
      expect(TopicCategorySchema.safeParse(c).success).toBe(true);
    }
    for (const s of ["settled", "contested", "highly_speculative"]) {
      expect(TopicStatusSchema.safeParse(s).success).toBe(true);
    }
  });

  it("rejects unknown category, status, and icon values", () => {
    expect(TopicCategorySchema.safeParse("sports").success).toBe(false);
    expect(TopicStatusSchema.safeParse("debunked").success).toBe(false);
    expect(IconNameSchema.safeParse("Rocket").success).toBe(false);
    expect(IconNameSchema.safeParse("Atom").success).toBe(true);
  });
});

describe("URL validation", () => {
  it("requires a valid URL for references", () => {
    expect(ReferenceSchema.safeParse({ title: "T", url: "https://example.com" }).success).toBe(true);
    expect(ReferenceSchema.safeParse({ title: "T", url: "not-a-url" }).success).toBe(false);
  });

  it("rejects evidence with a malformed sourceUrl", () => {
    const evidence = { id: "e", title: "t", description: "d", side: "for", weight: strong, sourceUrl: "ht!tp://bad" };
    expect(EvidenceSchema.safeParse(evidence).success).toBe(false);
  });
});

describe("keystone_fact (optional flagship field)", () => {
  it("accepts a well-formed keystone_fact", () => {
    const topic = { ...validTopic, keystone_fact: { statement: "X is true", confidence: 90, source: "OWID" } };
    expect(TopicSchema.safeParse(topic).success).toBe(true);
  });

  it("rejects a keystone_fact confidence above 100", () => {
    const topic = { ...validTopic, keystone_fact: { statement: "X", confidence: 120, source: "S" } };
    expect(TopicSchema.safeParse(topic).success).toBe(false);
  });
});

describe("parseTopic / safeParseTopics", () => {
  it("parseTopic returns the parsed topic for valid input", () => {
    expect(parseTopic(validTopic).id).toBe("topic-1");
  });

  it("safeParseTopics partitions a mix of valid and invalid topics", () => {
    const result = safeParseTopics([validTopic, { id: "bad", invalid: true }]);
    expect(result.success).toBe(false);
    expect(result.topics.length).toBe(1);
    expect(result.topics[0].id).toBe("topic-1");
    expect(result.errors.length).toBe(1);
  });
});
