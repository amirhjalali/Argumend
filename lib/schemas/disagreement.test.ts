import { describe, expect, it } from "vitest";
import {
  DISAGREEMENT_LIMITS,
  DISAGREEMENT_PROMPT_VERSION,
  DISAGREEMENT_REPORT_SCHEMA_VERSION,
  DISAGREEMENT_SHARE_EYEBROW,
} from "@/lib/disagreement/constants";
import {
  RawDisagreementExtractionSchema,
  DisagreementReportSchema,
  collectRawExtractionReferenceIssues,
  collectReportQuoteCharacters,
  collectReportReferenceIssues,
  parseDisagreementReport,
  parseRawDisagreementExtraction,
  uniqueIds,
} from "./disagreement";

function rawExtraction(overrides: Record<string, unknown> = {}) {
  return {
    mainQuestion: "Does immigration lower wages for close substitutes?",
    participants: [
      { id: "p-a", label: "Alex", kind: "named" },
      { id: "p-b", label: "Blair", kind: "named" },
    ],
    positions: [
      {
        id: "pos-a",
        label: "Supply depresses wages",
        participantIds: ["p-a"],
        thesis: "Added labor supply lowers wages for substitutable natives.",
        steelman: "A larger supply of close substitutes reduces their market wage.",
        explicitness: "explicit",
        confidence: "high",
        groundingQuotes: [{ quote: "Immigration is destroying wages", participantId: "p-a" }],
      },
      {
        id: "pos-b",
        label: "Complementarity offsets supply",
        participantIds: ["p-b"],
        thesis: "Demand and complementarity offset any supply effect.",
        steelman: "Immigrants raise demand and fill complementary roles.",
        explicitness: "explicit",
        confidence: "high",
        groundingQuotes: [{ quote: "Immigrants grow the economy", participantId: "p-b" }],
      },
    ],
    claims: [
      {
        id: "c1",
        statement: "Immigration reduces wages among close substitutes.",
        participantIds: ["p-a"],
        epistemicType: "empirical",
        explicitness: "explicit",
        stanceByPosition: [
          { positionId: "pos-a", relation: "supports" },
          { positionId: "pos-b", relation: "opposes" },
        ],
        acceptedByParticipantIds: ["p-a"],
        disputedByParticipantIds: ["p-b"],
        confidence: "medium",
        groundingQuotes: [{ quote: "Immigration is destroying wages", participantId: "p-a" }],
      },
    ],
    claimRelations: [],
    commonGroundCandidates: [
      {
        statement: "Both speakers care about native worker wages.",
        participantIds: ["p-a", "p-b"],
        basis: "strongly-implied",
        confidence: "medium",
        groundingQuotes: [],
      },
    ],
    disagreementCandidates: [
      {
        id: "d1",
        question: "What is the causal wage effect on close substitutes?",
        type: "causal",
        summary: "They dispute the labor-supply mechanism.",
        claimIds: ["c1"],
        participantStances: [
          { participantId: "p-a", positionId: "pos-a", stance: "The supply effect dominates." },
          { participantId: "p-b", positionId: "pos-b", stance: "Complementarity dominates." },
        ],
        resolutionCondition: "A clean natural experiment on substitutable natives.",
        confidence: "high",
        groundingQuotes: [],
      },
    ],
    caveats: ["Source-only analysis."],
    ...overrides,
  };
}

function report(overrides: Record<string, unknown> = {}) {
  return {
    schemaVersion: DISAGREEMENT_REPORT_SCHEMA_VERSION,
    title: "Immigration and native wages",
    question: "Does immigration lower wages for close substitutes?",
    sourceMode: "source-only",
    summary: "Two speakers dispute the wage effect on substitutes.",
    diagnosis: {
      pattern: "causal-model-split",
      headline: "They agree on the goal. The fight is about causation.",
      insight: "Both want wages to rise. They disagree about the labor-supply effect.",
      primaryType: "causal",
      sharedGround: "moderate",
      resolvability: "medium",
      confidence: "high",
      confidenceBasis: "Both positions are explicit and quote-grounded.",
    },
    participants: [
      { id: "p-a", label: "Alex", kind: "named" },
      { id: "p-b", label: "Blair", kind: "named" },
    ],
    positions: [
      {
        id: "pos-a",
        label: "Supply depresses wages",
        participantIds: ["p-a"],
        thesis: "Added labor supply lowers wages for substitutable natives.",
        steelman: "A larger supply of close substitutes reduces their market wage.",
        explicitness: "explicit",
        confidence: "high",
        grounding: [
          {
            id: "g1",
            quote: "Immigration is destroying wages",
            participantId: "p-a",
            start: 0,
            end: 32,
          },
        ],
      },
      {
        id: "pos-b",
        label: "Complementarity offsets supply",
        participantIds: ["p-b"],
        thesis: "Demand and complementarity offset any supply effect.",
        steelman: "Immigrants raise demand and fill complementary roles.",
        explicitness: "explicit",
        confidence: "high",
        grounding: [
          {
            id: "g2",
            quote: "Immigrants grow the economy",
            participantId: "p-b",
            start: 40,
            end: 67,
          },
        ],
      },
    ],
    commonGround: [
      {
        id: "cg1",
        statement: "Native worker wages matter.",
        participantIds: ["p-a", "p-b"],
        basis: "strongly-implied",
        confidence: "medium",
        grounding: [],
      },
    ],
    disagreements: [
      {
        id: "d1",
        question: "What is the causal wage effect on close substitutes?",
        type: "causal",
        summary: "They dispute the labor-supply mechanism.",
        participantStances: [
          { participantId: "p-a", positionId: "pos-a", stance: "The supply effect dominates." },
          { participantId: "p-b", positionId: "pos-b", stance: "Complementarity dominates." },
        ],
        relatedClaimIds: ["c1"],
        resolvability: "medium",
        resolutionCondition: "A clean natural experiment on substitutable natives.",
        confidence: "high",
        grounding: [],
      },
    ],
    cruxes: [
      {
        id: "crux-1",
        claimId: "c1",
        question: "What is the causal wage effect on close substitutes?",
        type: "causal",
        whyItMatters: "Each side's conclusion follows if this is true.",
        affectedPositionIds: ["pos-a", "pos-b"],
        branches: [
          { condition: "Substitutes lose wages", consequence: "Alex's case strengthens." },
          { condition: "No persistent loss", consequence: "Blair's case strengthens." },
        ],
        resolution: {
          kind: "existing-evidence",
          condition: "A well-identified wage elasticity for substitutes.",
        },
        evidenceState: "asserted-in-source",
        confidence: "high",
      },
    ],
    resolutionPaths: [
      {
        id: "rp1",
        label: "Check the evidence",
        description: "Compare spatial-shock and skill-cell estimates.",
        kind: "evidence",
        disagreementIds: ["d1"],
      },
    ],
    caveats: [
      "This analysis maps the submitted text. It does not independently verify factual claims.",
    ],
    share: {
      eyebrow: DISAGREEMENT_SHARE_EYEBROW,
      headline: "They agree on the goal. The fight is about causation.",
      subheadline: "The argument turns on the wage effect for close substitutes.",
      metrics: {
        positionCount: 2,
        commonGroundCount: 1,
        disagreementCount: 1,
        cruxCount: 1,
      },
    },
    quality: {
      groundingCoverage: 0.75,
      droppedUngroundedQuoteCount: 0,
      inferredPositionCount: 0,
      warnings: [],
    },
    provenance: {
      promptVersion: DISAGREEMENT_PROMPT_VERSION,
      provider: "fake",
      model: "test",
      generatedAt: "2026-08-18T00:00:00.000Z",
      sourceCharacterCount: 240,
      independentlyVerified: false,
    },
    ...overrides,
  };
}

describe("raw extraction schema", () => {
  it("accepts a valid two-position extraction", () => {
    expect(RawDisagreementExtractionSchema.safeParse(rawExtraction()).success).toBe(true);
  });

  it("accepts a one-sided extraction with no invented opponent", () => {
    const oneSided = rawExtraction({
      participants: [{ id: "p-a", label: "Author", kind: "author" }],
      positions: [
        {
          id: "pos-a",
          label: "Author thesis",
          participantIds: ["p-a"],
          thesis: "The article argues only one case.",
          steelman: "The strongest form of the article's claim.",
          explicitness: "explicit",
          confidence: "medium",
          groundingQuotes: [],
        },
      ],
      claims: [],
      commonGroundCandidates: [],
      disagreementCandidates: [],
    });
    expect(parseRawDisagreementExtraction(oneSided).success).toBe(true);
  });

  it("rejects more than eight participants", () => {
    const participants = Array.from({ length: 9 }, (_, index) => ({
      id: `p${index}`,
      label: `Speaker ${index}`,
      kind: "speaker-label",
    }));
    expect(RawDisagreementExtractionSchema.safeParse(rawExtraction({ participants })).success).toBe(
      false,
    );
  });

  it("rejects more than eight positions", () => {
    const positions = Array.from({ length: 9 }, (_, index) => ({
      id: `pos${index}`,
      label: `Position ${index}`,
      participantIds: ["p-a"],
      thesis: "A thesis.",
      steelman: "A steelman.",
      explicitness: "inferred",
      confidence: "low",
      groundingQuotes: [],
    }));
    expect(RawDisagreementExtractionSchema.safeParse(rawExtraction({ positions })).success).toBe(
      false,
    );
  });

  it("rejects more than forty claims", () => {
    const claims = Array.from({ length: 41 }, (_, index) => ({
      id: `c${index}`,
      statement: "A claim.",
      participantIds: ["p-a"],
      epistemicType: "empirical",
      explicitness: "inferred",
      stanceByPosition: [],
      acceptedByParticipantIds: [],
      disputedByParticipantIds: [],
      confidence: "low",
      groundingQuotes: [],
    }));
    expect(RawDisagreementExtractionSchema.safeParse(rawExtraction({ claims })).success).toBe(false);
  });

  it("rejects more than eighty claim relations", () => {
    const claims = Array.from({ length: 2 }, (_, index) => ({
      id: `c${index}`,
      statement: "A claim.",
      participantIds: ["p-a"],
      epistemicType: "empirical",
      explicitness: "inferred",
      stanceByPosition: [],
      acceptedByParticipantIds: [],
      disputedByParticipantIds: [],
      confidence: "low",
      groundingQuotes: [],
    }));
    const claimRelations = Array.from({ length: 81 }, () => ({
      fromClaimId: "c0",
      toClaimId: "c1",
      type: "supports",
    }));
    expect(
      RawDisagreementExtractionSchema.safeParse(rawExtraction({ claims, claimRelations })).success,
    ).toBe(false);
  });

  it("rejects a quote longer than 280 characters", () => {
    const extraction = rawExtraction();
    extraction.positions[0].groundingQuotes = [{ quote: "x".repeat(281), participantId: "p-a" }];
    expect(RawDisagreementExtractionSchema.safeParse(extraction).success).toBe(false);
  });

  it("rejects a thesis longer than 500 characters", () => {
    const extraction = rawExtraction();
    extraction.positions[0].thesis = "x".repeat(501);
    expect(RawDisagreementExtractionSchema.safeParse(extraction).success).toBe(false);
  });

  it("rejects more than four grounding quotes on one object", () => {
    const extraction = rawExtraction();
    extraction.positions[0].groundingQuotes = Array.from({ length: 5 }, (_, index) => ({
      quote: `quote ${index}`,
      participantId: "p-a",
    }));
    expect(RawDisagreementExtractionSchema.safeParse(extraction).success).toBe(false);
  });

  it("rejects caveats whose combined length exceeds 1000 characters", () => {
    expect(
      RawDisagreementExtractionSchema.safeParse(
        rawExtraction({ caveats: ["a".repeat(600), "b".repeat(401)] }),
      ).success,
    ).toBe(false);
  });

  it("rejects unknown keys on the raw payload", () => {
    expect(
      RawDisagreementExtractionSchema.safeParse(rawExtraction({ winner: "p-a" })).success,
    ).toBe(false);
  });

  it("rejects a for/against side field on a position", () => {
    const extraction = rawExtraction();
    Object.assign(extraction.positions[0], { side: "for" });
    expect(RawDisagreementExtractionSchema.safeParse(extraction).success).toBe(false);
  });

  it("flags a dangling participant reference", () => {
    const extraction = rawExtraction();
    extraction.positions[0].participantIds = ["missing"];
    const parsed = RawDisagreementExtractionSchema.parse(extraction);
    const issues = collectRawExtractionReferenceIssues(parsed);
    expect(issues.some((issue) => issue.message.includes("missing"))).toBe(true);
  });

  it("flags a dangling claim relation", () => {
    const extraction = rawExtraction({
      claimRelations: [{ fromClaimId: "c1", toClaimId: "missing", type: "opposes" }],
    });
    const parsed = RawDisagreementExtractionSchema.parse(extraction);
    expect(collectRawExtractionReferenceIssues(parsed).length).toBeGreaterThan(0);
  });

  it("flags duplicate participant ids", () => {
    const extraction = rawExtraction({
      participants: [
        { id: "p-a", label: "Alex", kind: "named" },
        { id: "p-a", label: "Also Alex", kind: "named" },
      ],
    });
    const parsed = RawDisagreementExtractionSchema.parse(extraction);
    expect(
      collectRawExtractionReferenceIssues(parsed).some((issue) =>
        issue.message.includes("Duplicate"),
      ),
    ).toBe(true);
  });

  it("parseRawDisagreementExtraction returns issues instead of data when refs dangle", () => {
    const result = parseRawDisagreementExtraction(
      rawExtraction({
        claimRelations: [{ fromClaimId: "nope", toClaimId: "c1", type: "supports" }],
      }),
    );
    expect(result.success).toBe(false);
    if (!result.success) {
      expect("issues" in result).toBe(true);
    }
  });
});

describe("public report schema", () => {
  it("accepts a valid report", () => {
    expect(parseDisagreementReport(report()).success).toBe(true);
  });

  it("rejects a report that claims independent verification", () => {
    expect(
      DisagreementReportSchema.safeParse(
        report({
          provenance: {
            promptVersion: DISAGREEMENT_PROMPT_VERSION,
            provider: "fake",
            model: "test",
            generatedAt: "2026-08-18T00:00:00.000Z",
            sourceCharacterCount: 240,
            independentlyVerified: true,
          },
        }),
      ).success,
    ).toBe(false);
  });

  it("rejects a winner field", () => {
    expect(DisagreementReportSchema.safeParse(report({ winner: "Alex" })).success).toBe(false);
  });

  it("rejects a numerical agreement percentage field", () => {
    expect(DisagreementReportSchema.safeParse(report({ agreementPercent: 64 })).success).toBe(
      false,
    );
  });

  it("requires source-only mode", () => {
    expect(DisagreementReportSchema.safeParse(report({ sourceMode: "web-verified" })).success).toBe(
      false,
    );
  });

  it("requires the share eyebrow literal", () => {
    const value = report();
    expect(
      DisagreementReportSchema.safeParse({
        ...value,
        share: { ...value.share, eyebrow: "BALANCE SCORE" },
      }).success,
    ).toBe(false);
  });

  it("rejects schemaVersion other than 1", () => {
    expect(DisagreementReportSchema.safeParse(report({ schemaVersion: 2 })).success).toBe(false);
  });

  it("rejects a grounding span where end <= start", () => {
    const value = report();
    value.positions[0].grounding[0].end = 0;
    expect(DisagreementReportSchema.safeParse(value).success).toBe(false);
  });

  it("rejects more than three cruxes", () => {
    const crux = (report().cruxes as object[])[0];
    expect(
      DisagreementReportSchema.safeParse(
        report({
          cruxes: [
            { ...crux, id: "c1" },
            { ...crux, id: "c2" },
            { ...crux, id: "c3" },
            { ...crux, id: "c4" },
          ],
        }),
      ).success,
    ).toBe(false);
  });

  it("rejects persisted quotes over the 1500-character cap", () => {
    const value = report();
    value.positions[0].grounding[0].quote = "q".repeat(280);
    value.positions[1].grounding[0].quote = "r".repeat(280);
    value.commonGround[0].grounding = [
      { id: "g3", quote: "s".repeat(280), start: 0, end: 280 },
      { id: "g4", quote: "t".repeat(280), start: 0, end: 280 },
    ] as typeof value.commonGround[0]["grounding"];
    value.disagreements[0].grounding = [
      { id: "g5", quote: "u".repeat(280), start: 0, end: 280 },
      { id: "g6", quote: "v".repeat(120), start: 0, end: 120 },
    ] as typeof value.disagreements[0]["grounding"];
    expect(collectReportQuoteCharacters(value)).toBeGreaterThan(
      DISAGREEMENT_LIMITS.maxPublishedQuoteCharactersTotal,
    );
    expect(DisagreementReportSchema.safeParse(value).success).toBe(false);
  });

  it("flags share metrics that do not match counts", () => {
    const value = DisagreementReportSchema.parse(report());
    value.share.metrics.positionCount = 99;
    expect(
      collectReportReferenceIssues(value).some((issue) => issue.path.includes("positionCount")),
    ).toBe(true);
  });

  it("flags a resolution path that points at a missing disagreement", () => {
    const value = DisagreementReportSchema.parse(
      report({
        resolutionPaths: [
          {
            id: "rp1",
            label: "Check the evidence",
            description: "Compare estimates.",
            kind: "evidence",
            disagreementIds: ["missing"],
          },
        ],
      }),
    );
    expect(collectReportReferenceIssues(value).length).toBeGreaterThan(0);
  });

  it("allows zero cruxes for a non-argument", () => {
    const value = report({
      diagnosis: {
        pattern: "not-a-disagreement",
        headline: "This is not a disagreement.",
        insight: "The text does not contain opposing positions.",
        sharedGround: "unknown",
        resolvability: "unknown",
        confidence: "medium",
        confidenceBasis: "No opposing claims were found.",
      },
      positions: [
        {
          id: "pos-a",
          label: "Single voice",
          participantIds: ["p-a"],
          thesis: "Only one thesis is present.",
          steelman: "The text states one case.",
          explicitness: "explicit",
          confidence: "medium",
          grounding: [],
        },
      ],
      participants: [{ id: "p-a", label: "Alex", kind: "named" }],
      commonGround: [],
      disagreements: [],
      cruxes: [],
      resolutionPaths: [],
      share: {
        eyebrow: DISAGREEMENT_SHARE_EYEBROW,
        headline: "This is not a disagreement.",
        subheadline: "No opposing positions were found.",
        metrics: {
          positionCount: 1,
          commonGroundCount: 0,
          disagreementCount: 0,
          cruxCount: 0,
        },
      },
    });
    expect(parseDisagreementReport(value).success).toBe(true);
  });

  it("rejects groundingCoverage outside 0-1", () => {
    const value = report();
    value.quality.groundingCoverage = 1.2;
    expect(DisagreementReportSchema.safeParse(value).success).toBe(false);
  });

  it("rejects a mismatched prompt version", () => {
    const value = report();
    value.provenance.promptVersion = "old";
    expect(DisagreementReportSchema.safeParse(value).success).toBe(false);
  });
});

describe("helpers", () => {
  it("uniqueIds reports duplicates", () => {
    expect(uniqueIds(["a", "b"])).toBe(true);
    expect(uniqueIds(["a", "a"])).toBe(false);
  });

  it("counts quote characters across report sections", () => {
    expect(collectReportQuoteCharacters(report())).toBe(
      "Immigration is destroying wages".length + "Immigrants grow the economy".length,
    );
  });
});
