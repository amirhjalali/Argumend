import { describe, expect, it } from "vitest";
import {
  describeUncontestedReason,
  isExplicitCommonGround,
  isUndisputed,
  statementsMatch,
  uncontestedCruxReason,
  type ProjectionClaimFacts,
} from "./projectionFilter";

function claim(overrides: Partial<ProjectionClaimFacts> = {}): ProjectionClaimFacts {
  return {
    id: "c-fact",
    statement: "Ellis is out for six weeks.",
    disputedByParticipantIds: [],
    stanceByPosition: [
      { positionId: "p-rookie", relation: "supports" },
      { positionId: "p-veteran", relation: "supports" },
    ],
    ...overrides,
  };
}

describe("statementsMatch", () => {
  it("matches after case, whitespace, and terminal punctuation normalisation", () => {
    expect(statementsMatch("Ellis is out for six weeks.", "  ellis IS out  for six weeks")).toBe(true);
  });

  it("matches when at least 80% of each side's content words are shared", () => {
    expect(statementsMatch("Ellis will be out for six weeks", "Ellis is out for six weeks.")).toBe(true);
    expect(
      statementsMatch("The reservoir is above its design limit", "The dam passes every federal check"),
    ).toBe(false);
  });

  it("does not match a short statement against a much longer one that merely contains it", () => {
    expect(
      statementsMatch(
        "The schedule is soft",
        "The schedule is soft enough to absorb the rookie's mistakes over ten road games",
      ),
    ).toBe(false);
  });

  it("never matches on empty content", () => {
    expect(statementsMatch("", "Ellis is out")).toBe(false);
    expect(statementsMatch("", "")).toBe(false);
    expect(statementsMatch("is the", "the is")).toBe(false);
  });

  it("keeps negation and numerical disagreements out of common ground", () => {
    expect(statementsMatch("Ellis is out for six weeks", "Ellis is not out for six weeks")).toBe(false);
    expect(statementsMatch("The bridge passed all safety checks", "The bridge never passed all safety checks")).toBe(false);
    expect(statementsMatch("The inspection can rule out structural damage", "The inspection can't rule out structural damage")).toBe(false);
    expect(statementsMatch("The repairs cost 5 million dollars", "The repairs cost 10 million dollars")).toBe(false);
  });
});

describe("isUndisputed", () => {
  it("is true only when nothing in the extraction contests the claim", () => {
    expect(isUndisputed(claim(), [])).toBe(true);
    expect(isUndisputed(claim(), [{ fromClaimId: "c-fact", toClaimId: "c-x", type: "supports" }])).toBe(true);
    expect(isUndisputed(claim(), [{ fromClaimId: "c-x", toClaimId: "c-fact", type: "qualifies" }])).toBe(true);
    expect(isUndisputed(claim(), [{ fromClaimId: "c-x", toClaimId: "c-fact", type: "depends_on" }])).toBe(true);
  });

  it("is false when a participant disputes the claim", () => {
    expect(isUndisputed(claim({ disputedByParticipantIds: ["gio"] }), [])).toBe(false);
  });

  it("is false when the claim opposes any position", () => {
    expect(
      isUndisputed(
        claim({
          stanceByPosition: [
            { positionId: "p-rookie", relation: "supports" },
            { positionId: "p-veteran", relation: "opposes" },
          ],
        }),
        [],
      ),
    ).toBe(false);
  });

  it("is false when another claim contradicts, opposes, or undercuts it in either direction", () => {
    for (const type of ["contradicts", "opposes", "undercuts"]) {
      expect(isUndisputed(claim(), [{ fromClaimId: "c-x", toClaimId: "c-fact", type }])).toBe(false);
      expect(isUndisputed(claim(), [{ fromClaimId: "c-fact", toClaimId: "c-x", type }])).toBe(false);
    }
  });
});

describe("uncontestedCruxReason", () => {
  it("names explicit common ground before the undisputed test", () => {
    const reason = uncontestedCruxReason(claim({ disputedByParticipantIds: ["gio"] }), {
      commonGroundStatements: ["Ellis is out for six weeks."],
      claimRelations: [],
    });
    expect(reason).toBe("explicit-common-ground");
    expect(isExplicitCommonGround(claim(), ["The rookie needs reps."])).toBe(false);
  });

  it("returns undisputed when nothing contests the claim and it is not common ground", () => {
    expect(uncontestedCruxReason(claim(), { commonGroundStatements: [], claimRelations: [] })).toBe(
      "undisputed",
    );
  });

  it("returns nothing for a contested claim", () => {
    expect(
      uncontestedCruxReason(claim({ disputedByParticipantIds: ["gio"] }), {
        commonGroundStatements: [],
        claimRelations: [],
      }),
    ).toBeUndefined();
  });

  it("keeps a disputed claim when shared ground states its opposite", () => {
    expect(uncontestedCruxReason(claim({ disputedByParticipantIds: ["gio"] }), {
      commonGroundStatements: ["Ellis is not out for six weeks."],
      claimRelations: [],
    })).toBeUndefined();
  });

  it("describes each reason in reader-facing words", () => {
    expect(describeUncontestedReason("explicit-common-ground")).toContain("common ground");
    expect(describeUncontestedReason("undisputed")).toContain("no position disputes");
  });
});
