import { describe, expect, it } from "vitest";
import type { RawClaimStakeCandidate, StakeRole, UpdateEffect } from "@/types/disagreement";
import {
  deriveStakeDiagnostic,
  projectClaimStakes,
  STAKE_STATUS_COPY,
} from "./stakes";
import { normalizeExtraction } from "./normalize";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";

describe("deriveStakeDiagnostic", () => {
  const cases: Array<{
    role: StakeRole;
    effect: UpdateEffect;
    alternativeBasis?: string;
    expected: string;
  }> = [
    // Clear stakes: any stated consequence.
    { role: "hinge", effect: "withdraw", expected: "clear-stake" },
    { role: "material", effect: "substantially-weaken", expected: "clear-stake" },
    { role: "supporting", effect: "somewhat-weaken", expected: "clear-stake" },
    { role: "hinge", effect: "reconsider", expected: "clear-stake" },
    // Commitment gap: a major reason with no stated update.
    { role: "hinge", effect: "not-stated", expected: "commitment-gap" },
    { role: "material", effect: "not-stated", expected: "commitment-gap" },
    { role: "supporting", effect: "not-stated", expected: "commitment-gap" },
    // Unclear: no update stated AND no major role claimed.
    { role: "context", effect: "not-stated", expected: "unclear" },
    { role: "unclear", effect: "not-stated", expected: "unclear" },
    // No-change splits on whether another reason carries the conclusion.
    { role: "hinge", effect: "no-change", alternativeBasis: "the site is unsafe", expected: "overdetermined" },
    { role: "material", effect: "no-change", expected: "non-load-bearing" },
    // Rebuttal-only is classified by role before effect.
    { role: "rebuttal-only", effect: "reconsider", expected: "rebuttal-only" },
    { role: "rebuttal-only", effect: "no-change", expected: "rebuttal-only" },
  ];

  for (const { role, effect, alternativeBasis, expected } of cases) {
    it(`${role}/${effect}${alternativeBasis ? "/alt" : ""} -> ${expected}`, () => {
      expect(deriveStakeDiagnostic({ role, ifFalseEffect: effect, alternativeBasis })).toBe(expected);
    });
  }
});

describe("STAKE_STATUS_COPY", () => {
  it("never accuses the participant", () => {
    const forbidden = /propaganda|bad.?faith|dishonest|insincer|lying|liar|hypocrit|motive|goalposts/i;
    for (const copy of Object.values(STAKE_STATUS_COPY)) {
      expect(copy).not.toMatch(forbidden);
    }
  });
});

function stake(overrides: Partial<RawClaimStakeCandidate>): RawClaimStakeCandidate {
  return {
    id: "stake-1",
    claimId: "c-1",
    participantId: "p-1",
    targetConclusion: "The conclusion.",
    role: "hinge",
    ifFalseEffect: "withdraw",
    consequence: "The conclusion falls.",
    basis: "explicit",
    groundingQuotes: [],
    ...overrides,
  };
}

function extraction(overrides: {
  claims?: RawDisagreementExtractionV1["claims"];
  stakes?: RawClaimStakeCandidate[];
  mainQuestion?: string;
}): RawDisagreementExtractionV1 {
  return {
    mainQuestion: overrides.mainQuestion ?? "Should the project proceed?",
    participants: [
      { id: "p-1", label: "One", kind: "named" },
      { id: "p-2", label: "Two", kind: "named" },
    ],
    positions: [
      {
        id: "pos-1",
        label: "Proceed",
        participantIds: ["p-1"],
        thesis: "Proceed.",
        steelman: "Proceed.",
        explicitness: "explicit",
        confidence: "high",
        groundingQuotes: [],
      },
      {
        id: "pos-2",
        label: "Stop",
        participantIds: ["p-2"],
        thesis: "Stop.",
        steelman: "Stop.",
        explicitness: "explicit",
        confidence: "high",
        groundingQuotes: [],
      },
    ],
    claims: overrides.claims ?? [
      {
        id: "c-1",
        statement: "The load test passed.",
        participantIds: ["p-1"],
        epistemicType: "empirical",
        explicitness: "explicit",
        stanceByPosition: [
          { positionId: "pos-1", relation: "supports" },
          { positionId: "pos-2", relation: "opposes" },
        ],
        acceptedByParticipantIds: ["p-1"],
        disputedByParticipantIds: ["p-2"],
        confidence: "medium",
        groundingQuotes: [],
      },
      {
        id: "c-2",
        statement: "The budget covers it.",
        participantIds: ["p-1"],
        epistemicType: "empirical",
        explicitness: "explicit",
        stanceByPosition: [
          { positionId: "pos-1", relation: "supports" },
          { positionId: "pos-2", relation: "opposes" },
        ],
        acceptedByParticipantIds: ["p-1"],
        disputedByParticipantIds: [],
        confidence: "medium",
        groundingQuotes: [],
      },
    ],
    claimRelations: [],
    commonGroundCandidates: [],
    disagreementCandidates: [],
    claimStakeCandidates: overrides.stakes ?? [],
    caveats: [],
  };
}

const SOURCE = "The load test passed. Even if it failed, the budget covers it.";

function project(ex: RawDisagreementExtractionV1, cruxClaimIds: string[], seen?: Set<string>) {
  return projectClaimStakes({
    extraction: normalizeExtraction(ex).extraction,
    source: SOURCE,
    cruxClaimIds,
    seenQuoteTexts: seen,
  });
}

describe("projectClaimStakes", () => {
  it("grounds stake quotes verbatim and reports coverage", () => {
    const result = project(
      extraction({
        stakes: [
          stake({
            groundingQuotes: [{ quote: "The load test passed.", participantId: "p-1" }],
          }),
        ],
      }),
      ["c-1"],
    );
    expect(result.accountability.stakes).toHaveLength(1);
    expect(result.accountability.stakes[0].grounding).toHaveLength(1);
    expect(result.expectedQuoteCount).toBe(1);
    expect(result.groundedQuoteCount).toBe(1);
    expect(result.accountability.clearStakeCount).toBe(1);
    expect(result.accountability.gapCount).toBe(0);
  });

  it("drops ungrounded stake quotes and warns", () => {
    const result = project(
      extraction({
        stakes: [stake({ groundingQuotes: [{ quote: "Not in the source at all." }] })],
      }),
      ["c-1"],
    );
    expect(result.accountability.stakes[0].grounding).toHaveLength(0);
    expect(result.groundedQuoteCount).toBe(0);
    expect(result.warnings.some((w) => w.includes("ungrounded"))).toBe(true);
  });

  it("does not double-count a quote already grounded elsewhere", () => {
    const seen = new Set<string>(["the load test passed."]);
    const result = project(
      extraction({
        stakes: [
          stake({ groundingQuotes: [{ quote: "The load test passed." }] }),
        ],
      }),
      ["c-1"],
      seen,
    );
    // Displayed, but not counted again toward coverage.
    expect(result.accountability.stakes[0].grounding).toHaveLength(1);
    expect(result.expectedQuoteCount).toBe(0);
    expect(result.groundedQuoteCount).toBe(0);
  });

  it("mints an unattributed fallback stake when the primary crux has none", () => {
    const result = project(extraction({ stakes: [] }), ["c-1"]);
    const fallback = result.accountability.stakes.find(
      (item) => item.id === "stake-primary-crux-fallback",
    );
    expect(fallback).toBeDefined();
    expect(fallback?.participantId).toBeUndefined();
    expect(fallback?.role).toBe("unclear");
    expect(fallback?.basis).toBe("unstated");
    expect(fallback?.diagnostic).toBe("unclear");
    expect(result.accountability.headline).toBe("The source does not say what would change.");
  });

  it("does not mint a fallback when the model staked the primary crux", () => {
    const result = project(
      extraction({
        stakes: [stake({ claimId: "c-1", role: "material", ifFalseEffect: "not-stated", basis: "unstated" })],
      }),
      ["c-1"],
    );
    expect(
      result.accountability.stakes.some((item) => item.id === "stake-primary-crux-fallback"),
    ).toBe(false);
    expect(result.accountability.headline).toBe(
      "One important reason has no stated update attached to it.",
    );
  });

  it("prefers crux-attached stakes, then major roles, and caps the ledger", () => {
    const many: RawClaimStakeCandidate[] = [
      stake({ id: "s-noncrux-major", claimId: "c-2", role: "material", ifFalseEffect: "withdraw" }),
      stake({ id: "s-noncrux-context", claimId: "c-2", role: "context", ifFalseEffect: "not-stated" }),
      stake({ id: "s-crux", claimId: "c-1", role: "hinge", ifFalseEffect: "withdraw" }),
    ];
    const filler: RawClaimStakeCandidate[] = Array.from({ length: 9 }, (_, index) =>
      stake({
        id: `s-filler-${index}`,
        claimId: "c-2",
        role: "material",
        ifFalseEffect: "withdraw",
      }),
    );
    const result = project(extraction({ stakes: [...many, ...filler] }), ["c-1"]);
    expect(result.accountability.stakes.length).toBeLessThanOrEqual(8);
    expect(result.accountability.stakes[0].id).toBe("s-crux");
    expect(result.accountability.stakes[1].id).toBe("s-noncrux-major");
    expect(
      result.accountability.stakes.some((item) => item.id === "s-noncrux-context"),
    ).toBe(false);
  });

  it("derives the overdetermined headline when another reason carries it", () => {
    const result = project(
      extraction({
        stakes: [
          stake({
            claimId: "c-1",
            role: "material",
            ifFalseEffect: "no-change",
            alternativeBasis: "The budget covers it.",
            basis: "explicit",
            consequence: "The position stands on the budget.",
          }),
        ],
      }),
      ["c-1"],
    );
    expect(result.accountability.stakes[0].diagnostic).toBe("overdetermined");
    expect(result.accountability.headline).toBe(
      "The conclusion is supported by multiple independent reasons.",
    );
  });

  it("derives the non-load-bearing headline without an alternative basis", () => {
    const result = project(
      extraction({
        stakes: [
          stake({
            claimId: "c-1",
            role: "material",
            ifFalseEffect: "no-change",
            basis: "explicit",
            consequence: "Nothing stated changes.",
          }),
        ],
      }),
      ["c-1"],
    );
    expect(result.accountability.stakes[0].diagnostic).toBe("non-load-bearing");
    expect(result.accountability.headline).toBe(
      "Several claims are doing less work than they appear to.",
    );
  });

  it("normalization drops stakes with unresolved required references", () => {
    const normalized = normalizeExtraction(
      extraction({
        stakes: [
          stake({ id: "s-good", claimId: "c-1", participantId: "p-1" }),
          stake({ id: "s-bad-claim", claimId: "c-missing", participantId: "p-1" }),
          stake({ id: "s-bad-participant", claimId: "c-1", participantId: "p-missing" }),
          stake({ id: "s-dropped-position", claimId: "c-1", participantId: "p-1", positionId: "pos-missing" }),
        ],
      }),
    );
    const stakes = normalized.extraction.claimStakeCandidates ?? [];
    expect(stakes.map((item) => item.id)).toEqual(["s-good", "s-dropped-position"]);
    expect(stakes[1].positionId).toBeUndefined();
    expect(
      normalized.warnings.some((w) => w.includes("unknown claim")),
      JSON.stringify(normalized.warnings),
    ).toBe(true);
    expect(normalized.warnings.some((w) => w.includes("unknown participant"))).toBe(true);
    expect(normalized.warnings.some((w) => w.includes("without its dropped position"))).toBe(true);
  });

  it("normalization does not mutate the raw extraction", () => {
    const raw = extraction({
      stakes: [stake({ claimId: "c-1", participantId: "p-1", positionId: "pos-missing" })],
    });
    const original = JSON.stringify(raw);
    normalizeExtraction(raw);
    expect(JSON.stringify(raw)).toBe(original);
  });
});
