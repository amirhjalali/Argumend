import { describe, expect, it } from "vitest";
import { contentWords, overlapRatio, scoreMapRecovery, summarizeRecovery, type MapRecoveryScore } from "./recovery";
import type { DebateGroundTruth } from "./renderDebate";
import type { DisagreementReportV1, DisagreementType, ReportCrux, ReportPosition } from "@/types/disagreement";
import type { EpistemicType } from "@/types/argument";

function makeReportPosition(id: string): ReportPosition {
  return {
    id,
    label: `Position ${id}`,
    participantIds: [],
    thesis: `Thesis for ${id}`,
    steelman: "steelman",
    explicitness: "explicit",
    confidence: "medium",
    grounding: [],
  };
}

function makeReportCrux(question: string, type: DisagreementType, claimId: string): ReportCrux {
  return {
    id: `crux-${claimId}`,
    claimId,
    question,
    type,
    whyItMatters: "it matters",
    affectedPositionIds: [],
    branches: [],
    resolution: { kind: "existing-evidence", condition: "condition" },
    evidenceState: "asserted-in-source",
    confidence: "medium",
  };
}

function baseReport(): DisagreementReportV1 {
  return {
    schemaVersion: 1,
    title: "Test report",
    question: "Is X true?",
    sourceMode: "source-only",
    summary: "summary",
    diagnosis: {
      pattern: "single-empirical-crux",
      headline: "headline",
      insight: "insight",
      sharedGround: "moderate",
      resolvability: "medium",
      confidence: "medium",
      confidenceBasis: "basis",
    },
    participants: [],
    positions: [],
    commonGround: [],
    disagreements: [],
    cruxes: [],
    resolutionPaths: [],
    caveats: [],
    share: {
      eyebrow: "THE REAL DISAGREEMENT",
      headline: "headline",
      subheadline: "sub",
      metrics: { positionCount: 0, commonGroundCount: 0, disagreementCount: 0, cruxCount: 0 },
    },
    quality: {
      groundingCoverage: 0.5,
      droppedUngroundedQuoteCount: 0,
      inferredPositionCount: 0,
      warnings: [],
    },
    provenance: {
      promptVersion: "v1",
      provider: "fake",
      model: "fake-model",
      generatedAt: "2026-08-18T00:00:00Z",
      sourceCharacterCount: 100,
      independentlyVerified: false,
    },
  };
}

function makeReport(overrides: {
  positions?: ReportPosition[];
  cruxes?: ReportCrux[];
  diagnosis?: Partial<DisagreementReportV1["diagnosis"]>;
  quality?: Partial<DisagreementReportV1["quality"]>;
} = {}): DisagreementReportV1 {
  const base = baseReport();
  return {
    ...base,
    positions: overrides.positions ?? base.positions,
    cruxes: overrides.cruxes ?? base.cruxes,
    diagnosis: { ...base.diagnosis, ...overrides.diagnosis },
    quality: { ...base.quality, ...overrides.quality },
  };
}

function makeTruth(overrides: Partial<DebateGroundTruth> = {}): DebateGroundTruth {
  return {
    topicId: "topic",
    question: "Q?",
    positionCount: 2,
    positionIds: ["p-1", "p-2"],
    positionStatements: ["Statement 1", "Statement 2"],
    cruxClaimIds: ["c-1"],
    cruxStatements: ["Crux statement one"],
    cruxEpistemicTypes: ["empirical"],
    ...overrides,
  };
}

describe("contentWords", () => {
  it("drops stop words and lowercases", () => {
    const words = contentWords("The Wage And Cost Are For Debate");
    expect(words.has("the")).toBe(false);
    expect(words.has("and")).toBe(false);
    expect(words.has("are")).toBe(false);
    expect(words.has("for")).toBe(false);
    expect(words.has("wage")).toBe(true);
    expect(words.has("cost")).toBe(true);
    expect(words.has("debate")).toBe(true);
  });

  it("drops words of two characters or fewer even when they are not stop words", () => {
    const words = contentWords("ox ox cow wage");
    expect(words.has("ox")).toBe(false);
    expect(words.has("cow")).toBe(true);
  });

  it("folds simple plurals but not words ending in ss", () => {
    const words = contentWords("wages workers process");
    expect(words.has("wage")).toBe(true);
    expect(words.has("wages")).toBe(false);
    expect(words.has("worker")).toBe(true);
    expect(words.has("workers")).toBe(false);
    expect(words.has("process")).toBe(true);
  });
});

describe("overlapRatio", () => {
  it("returns 1 when one text's content words are a subset of the other's", () => {
    const score = overlapRatio("wage growth", "does wage growth outpace inflation this decade");
    expect(score).toBe(1);
  });

  it("returns 0 for disjoint texts", () => {
    const score = overlapRatio("wage growth trends", "unrelated topic about weather patterns");
    expect(score).toBe(0);
  });

  it("returns 0 when either side has no content words", () => {
    expect(overlapRatio("", "wage growth")).toBe(0);
    expect(overlapRatio("wage growth", "")).toBe(0);
    expect(overlapRatio("the and or", "wage growth")).toBe(0);
  });

  it("is symmetric", () => {
    const a = "wage growth outpaces inflation";
    const b = "does wage growth truly outpace measured inflation this decade";
    expect(overlapRatio(a, b)).toBe(overlapRatio(b, a));
  });
});

describe("scoreMapRecovery", () => {
  it("counts positions and flags overProducedPositions only when recovered exceeds truth", () => {
    const truth = makeTruth({ positionCount: 2, positionIds: ["p-1", "p-2"] });

    const same = scoreMapRecovery({
      report: makeReport({ positions: [makeReportPosition("rp-1"), makeReportPosition("rp-2")] }),
      truth,
    });
    expect(same.recoveredPositionCount).toBe(2);
    expect(same.truthPositionCount).toBe(2);
    expect(same.overProducedPositions).toBe(false);

    const more = scoreMapRecovery({
      report: makeReport({
        positions: [makeReportPosition("rp-1"), makeReportPosition("rp-2"), makeReportPosition("rp-3")],
      }),
      truth,
    });
    expect(more.recoveredPositionCount).toBe(3);
    expect(more.overProducedPositions).toBe(true);

    const fewer = scoreMapRecovery({
      report: makeReport({ positions: [makeReportPosition("rp-1")] }),
      truth,
    });
    expect(fewer.recoveredPositionCount).toBe(1);
    expect(fewer.overProducedPositions).toBe(false);
  });

  it("marks preservedMultiplePositions true whenever truth has two or fewer positions, regardless of recovered count", () => {
    const truthTwo = makeTruth({ positionCount: 2 });

    const one = scoreMapRecovery({ report: makeReport({ positions: [makeReportPosition("rp-1")] }), truth: truthTwo });
    expect(one.preservedMultiplePositions).toBe(true);

    const four = scoreMapRecovery({
      report: makeReport({
        positions: [
          makeReportPosition("rp-1"),
          makeReportPosition("rp-2"),
          makeReportPosition("rp-3"),
          makeReportPosition("rp-4"),
        ],
      }),
      truth: truthTwo,
    });
    expect(four.preservedMultiplePositions).toBe(true);
  });

  it("marks preservedMultiplePositions true only when recovered has more than two positions for a truth with more than two", () => {
    const truthFour = makeTruth({ positionCount: 4, positionIds: ["p-1", "p-2", "p-3", "p-4"] });

    const flattened = scoreMapRecovery({
      report: makeReport({ positions: [makeReportPosition("rp-1"), makeReportPosition("rp-2")] }),
      truth: truthFour,
    });
    expect(flattened.preservedMultiplePositions).toBe(false);

    const preserved = scoreMapRecovery({
      report: makeReport({
        positions: [makeReportPosition("rp-1"), makeReportPosition("rp-2"), makeReportPosition("rp-3")],
      }),
      truth: truthFour,
    });
    expect(preserved.preservedMultiplePositions).toBe(true);
  });

  it("picks the best crux pairing across all recovered x truth combinations", () => {
    const truth = makeTruth({
      cruxStatements: [
        "Does the minimum wage reduce total employment among low-wage workers?",
        "Should tenants have a right to counsel in eviction proceedings?",
      ],
      cruxEpistemicTypes: ["empirical", "normative"],
      cruxClaimIds: ["c-wage", "c-tenant"],
    });
    const report = makeReport({
      cruxes: [
        makeReportCrux("Is climate policy popular with voters this year?", "empirical", "r-1"),
        makeReportCrux("Does raising the minimum wage cut employment for low-wage workers?", "causal", "r-2"),
      ],
    });

    const score = scoreMapRecovery({ report, truth });

    expect(score.bestCruxPairing).toEqual({
      recovered: "Does raising the minimum wage cut employment for low-wage workers?",
      truth: "Does the minimum wage reduce total employment among low-wage workers?",
    });
    expect(score.cruxLexicalOverlap).toBeGreaterThan(0.5);
  });

  describe("cruxTypeCompatible", () => {
    const cases: Array<[EpistemicType, DisagreementType, boolean]> = [
      ["empirical", "causal", true],
      ["empirical", "empirical", true],
      ["normative", "priority", true],
      ["definitional", "definitional", true],
      ["definitional", "causal", false],
    ];

    for (const [truthType, recoveredType, expected] of cases) {
      it(`is ${expected} for truth type ${truthType} vs recovered type ${recoveredType}`, () => {
        const truth = makeTruth({ cruxEpistemicTypes: [truthType] });
        const report = makeReport({ cruxes: [makeReportCrux("Some crux question?", recoveredType, "c-x")] });
        expect(scoreMapRecovery({ report, truth }).cruxTypeCompatible).toBe(expected);
      });
    }

    it("scores the pairing that actually won the overlap, not always the first crux", () => {
      // The best lexical match is the SECOND recovered crux against the SECOND
      // map crux. Scoring index 0 instead would compare an unrelated pair and
      // report a compatibility that describes a different comparison than the
      // overlap number sitting next to it.
      const truth = makeTruth({
        cruxStatements: [
          "Whether the term poverty is defined by income or by consumption.",
          "Does the minimum wage reduce total employment among low-wage workers?",
        ],
        cruxEpistemicTypes: ["definitional", "empirical"],
      });
      const report = makeReport({
        cruxes: [
          makeReportCrux("Is the tax code fair to renters?", "normative", "c-1"),
          makeReportCrux(
            "Does raising the minimum wage cut employment for low-wage workers?",
            "causal",
            "c-2",
          ),
        ],
      });

      const score = scoreMapRecovery({ report, truth });

      expect(score.bestCruxPairing?.recovered).toContain("minimum wage");
      expect(score.recoveredCruxType).toBe("causal");
      expect(score.truthCruxEpistemicType).toBe("empirical");
      expect(score.cruxTypeCompatible).toBe(true);
    });

    it("is false when the report has no crux", () => {
      const truth = makeTruth({ cruxEpistemicTypes: ["empirical"] });
      const report = makeReport({ cruxes: [] });
      expect(scoreMapRecovery({ report, truth }).cruxTypeCompatible).toBe(false);
    });

    it("is false when the truth graph has no crux", () => {
      const truth = makeTruth({ cruxEpistemicTypes: [] });
      const report = makeReport({ cruxes: [makeReportCrux("Some crux question?", "empirical", "c-x")] });
      expect(scoreMapRecovery({ report, truth }).cruxTypeCompatible).toBe(false);
    });
  });

  it("passes through groundingCoverage, pattern, and warnings from the report", () => {
    const truth = makeTruth();
    const report = makeReport({
      quality: {
        groundingCoverage: 0.73,
        droppedUngroundedQuoteCount: 2,
        inferredPositionCount: 1,
        warnings: ["low grounding", "short excerpt"],
      },
      diagnosis: { pattern: "causal-model-split" },
    });

    const score = scoreMapRecovery({ report, truth });

    expect(score.groundingCoverage).toBe(0.73);
    expect(score.pattern).toBe("causal-model-split");
    expect(score.warnings).toEqual(["low grounding", "short excerpt"]);
  });

  it("handles a report with zero cruxes without throwing", () => {
    const truth = makeTruth({ cruxStatements: [], cruxEpistemicTypes: [], cruxClaimIds: [] });
    const report = makeReport({ cruxes: [] });

    const score = scoreMapRecovery({ report, truth });

    expect(score.cruxLexicalOverlap).toBe(0);
    expect(score.bestCruxPairing).toBeUndefined();
    expect(score.cruxTypeCompatible).toBe(false);
  });
});

describe("summarizeRecovery", () => {
  it("computes correct means and counts across scores", () => {
    const scores: MapRecoveryScore[] = [
      {
        id: "a",
        recoveredPositionCount: 2,
        truthPositionCount: 2,
        preservedMultiplePositions: true,
        overProducedPositions: false,
        cruxLexicalOverlap: 0.5,
        cruxTypeCompatible: true,
        groundingCoverage: 0.8,
        pattern: "single-empirical-crux",
        warnings: [],
      },
      {
        id: "b",
        recoveredPositionCount: 4,
        truthPositionCount: 2,
        preservedMultiplePositions: true,
        overProducedPositions: true,
        cruxLexicalOverlap: 1,
        cruxTypeCompatible: false,
        groundingCoverage: 0.6,
        pattern: "mixed-disagreement",
        warnings: [],
      },
      {
        id: "c",
        recoveredPositionCount: 1,
        truthPositionCount: 3,
        preservedMultiplePositions: false,
        overProducedPositions: false,
        cruxLexicalOverlap: 0,
        cruxTypeCompatible: false,
        groundingCoverage: 0.4,
        pattern: "not-a-disagreement",
        warnings: [],
      },
    ];

    const summary = summarizeRecovery(scores);

    expect(summary.count).toBe(3);
    expect(summary.meanCruxOverlap).toBeCloseTo((0.5 + 1 + 0) / 3, 3);
    expect(summary.meanGroundingCoverage).toBeCloseTo((0.8 + 0.6 + 0.4) / 3, 3);
    expect(summary.preservedMultiplePositions).toBe(2);
    expect(summary.overProducedPositions).toBe(1);
    expect(summary.cruxTypeCompatible).toBe(1);
  });

  it("returns zeros for an empty array without dividing by zero", () => {
    const summary = summarizeRecovery([]);
    expect(summary).toEqual({
      count: 0,
      meanCruxOverlap: 0,
      meanGroundingCoverage: 0,
      preservedMultiplePositions: 0,
      overProducedPositions: 0,
      cruxTypeCompatible: 0,
    });
  });
});
