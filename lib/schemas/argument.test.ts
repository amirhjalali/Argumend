import { describe, expect, it } from "vitest";
import {
  ArgumentEdgeSchema,
  ArgumentGraphSchema,
  ClaimSchema,
  EvidenceSchema,
  PositionSchema,
  QuestionSchema,
  parseArgumentGraph,
} from "./argument";

const provenance = { origin: "curator" as const };
const createdAt = "2026-08-11T00:00:00.000Z";

function claim(overrides = {}) {
  return {
    id: "c1",
    type: "claim",
    statement: "AI adoption changes employment patterns",
    provenance,
    createdAt,
    modelVersion: 2,
    epistemicType: "empirical",
    status: "contested",
    statusBasis: "stated by both sides",
    ...overrides,
  };
}

function evidence(overrides = {}) {
  return {
    id: "e1",
    type: "evidence",
    statement: "A study measured a change in employment patterns",
    finding: "A study measured a change in employment patterns",
    provenance,
    createdAt,
    modelVersion: 2,
    source: {
      title: "Study",
      kind: "institutional",
      verification: "verified-live",
    },
    relevance: "It measures the phenomenon named in the claim.",
    ...overrides,
  };
}

function position(overrides = {}) {
  return {
    id: "p1",
    type: "position",
    statement: "AI will cause major labor-market disruption.",
    provenance,
    createdAt,
    modelVersion: 2,
    label: "Disruption",
    constituency: "Labor-market pessimists",
    steelmanBasis: "Strongest available labor-market evidence",
    displayRank: 1,
    ...overrides,
  };
}

function question(overrides = {}) {
  return {
    id: "q1",
    type: "question",
    statement: "Will AI cause major labor-market disruption?",
    provenance,
    createdAt,
    modelVersion: 2,
    ...overrides,
  };
}

describe("Argument schemas", () => {
  it("accepts absent confidence and rejects confidence without a basis", () => {
    expect(ClaimSchema.safeParse(claim()).success).toBe(true);
    expect(
      ClaimSchema.safeParse(claim({ confidence: { value: 0.8 } })).success
    ).toBe(false);
  });

  it("accepts confidence with value and basis and rejects values outside 0-1", () => {
    expect(
      ClaimSchema.safeParse(claim({ confidence: { value: 0.8, basis: "expert review" } }))
        .success
    ).toBe(true);
    expect(
      ClaimSchema.safeParse(claim({ confidence: { value: 1.2, basis: "expert review" } }))
        .success
    ).toBe(false);
  });

  it("accepts absent weight and rejects partial weight", () => {
    expect(EvidenceSchema.safeParse(evidence()).success).toBe(true);
    expect(
      EvidenceSchema.safeParse(
        evidence({
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
        })
      ).success
    ).toBe(false);
  });

  it("accepts full weight and rejects weight scores outside 0-10", () => {
    expect(
      EvidenceSchema.safeParse(
        evidence({
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 5,
            weightBasis: "curator scored all four axes",
          },
        })
      ).success
    ).toBe(true);
    expect(
      EvidenceSchema.safeParse(
        evidence({
          weight: {
            sourceReliability: 11,
            independence: 7,
            replicability: 6,
            directness: 5,
            weightBasis: "curator scored all four axes",
          },
        })
      ).success
    ).toBe(false);
  });

  it("requires overrideBasis exactly when cruxOverride is present", () => {
    expect(
      ClaimSchema.safeParse(claim({ cruxOverride: "pin", overrideBasis: "human pin" }))
        .success
    ).toBe(true);
    expect(ClaimSchema.safeParse(claim({ cruxOverride: "pin" })).success).toBe(false);
    expect(ClaimSchema.safeParse(claim({ overrideBasis: "orphan basis" })).success).toBe(
      false
    );
  });

  it("requires QUESTION statements to end with a question mark", () => {
    expect(QuestionSchema.safeParse(question()).success).toBe(true);
    expect(QuestionSchema.safeParse(question({ statement: "AI will disrupt labor." })).success).toBe(
      false
    );
  });

  it("requires polarity only on evidences edges", () => {
    expect(
      ArgumentEdgeSchema.safeParse({
        id: "edge-1",
        from: "e1",
        to: "c1",
        type: "evidences",
        polarity: "supporting",
      }).success
    ).toBe(true);
    expect(
      ArgumentEdgeSchema.safeParse({
        id: "edge-1",
        from: "e1",
        to: "c1",
        type: "evidences",
      }).success
    ).toBe(false);
    expect(
      ArgumentEdgeSchema.safeParse({
        id: "edge-1",
        from: "c1",
        to: "p1",
        type: "supports",
        polarity: "supporting",
      }).success
    ).toBe(false);
  });

  it("requires statusBasis, steelmanBasis, and relevance to be non-empty", () => {
    expect(ClaimSchema.safeParse(claim({ statusBasis: " " })).success).toBe(false);
    expect(PositionSchema.safeParse(position({ steelmanBasis: " " })).success).toBe(false);
    expect(EvidenceSchema.safeParse(evidence({ relevance: " " })).success).toBe(false);
  });

  it("allows only HTTP(S) evidence source URLs", () => {
    for (const url of ["https://example.com/study", "http://example.com/archive"]) {
      expect(
        EvidenceSchema.safeParse(
          evidence({ source: { ...evidence().source, url } }),
        ).success,
      ).toBe(true);
    }

    for (const url of [
      "not a url",
      "http://",
      "javascript:alert(1)",
      "data:text/html,<h1>unsafe</h1>",
      "ftp://example.com/study",
    ]) {
      expect(
        EvidenceSchema.safeParse(
          evidence({ source: { ...evidence().source, url } }),
        ).success,
      ).toBe(false);
    }
  });

  it("parses a complete graph and returns discriminated parse errors", () => {
    const q1 = question();
    const graph = {
      topicId: "topic-1",
      modelVersion: 2,
      question: q1,
      nodes: [q1, position(), claim()],
      edges: [{ id: "edge-1", from: "c1", to: "p1", type: "supports" }],
    };

    expect(ArgumentGraphSchema.safeParse(graph).success).toBe(true);
    const parsed = parseArgumentGraph({ ...graph, question: question({ id: "q2" }) });
    expect(parsed.ok).toBe(false);
    if (!parsed.ok) expect(parsed.errors[0]).toContain("ArgumentGraph.question");
  });
});
