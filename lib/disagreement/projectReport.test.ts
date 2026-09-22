import { describe, expect, it } from "vitest";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { buildArgumentGraph } from "./buildGraph";
import { normalizeExtraction } from "./normalize";
import { projectDisagreementReport } from "./projectReport";

const SOURCE = [
  "Ada: The pilot cut delays by a fifth, so we should extend it citywide.",
  "Ben: The pilot only moved delays to the side streets, so we should stop it.",
  "Ada: Everyone agrees the corridor is congested at peak.",
  "Ben: Nobody disputes that the pilot ran for six months.",
].join("\n");

function claim(
  id: string,
  statement: string,
  overrides: Partial<RawDisagreementExtractionV1["claims"][number]> = {},
): RawDisagreementExtractionV1["claims"][number] {
  return {
    id,
    statement,
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
    ...overrides,
  };
}

function extraction(): RawDisagreementExtractionV1 {
  return {
    mainQuestion: "Should the bus-lane pilot be extended citywide?",
    participants: [
      { id: "p-1", label: "Ada", kind: "named" },
      { id: "p-2", label: "Ben", kind: "named" },
    ],
    positions: [
      {
        id: "pos-1",
        label: "Extend the pilot",
        participantIds: ["p-1"],
        thesis: "Extend it.",
        steelman: "Delays fell where it ran.",
        explicitness: "explicit",
        confidence: "high",
        groundingQuotes: [],
      },
      {
        id: "pos-2",
        label: "Stop the pilot",
        participantIds: ["p-2"],
        thesis: "Stop it.",
        steelman: "The delays only moved.",
        explicitness: "explicit",
        confidence: "high",
        groundingQuotes: [],
      },
    ],
    claims: [
      claim("c-delay", "The pilot cut corridor delays by a fifth"),
      claim("c-diversion", "The pilot pushed the same delays onto residential side streets", {
        participantIds: ["p-2"],
        stanceByPosition: [
          { positionId: "pos-2", relation: "supports" },
          { positionId: "pos-1", relation: "opposes" },
        ],
        acceptedByParticipantIds: ["p-2"],
        disputedByParticipantIds: ["p-1"],
      }),
      claim("c-congested", "The corridor is congested at peak", {
        disputedByParticipantIds: [],
      }),
    ],
    claimRelations: [{ fromClaimId: "c-diversion", toClaimId: "c-delay", type: "contradicts" }],
    commonGroundCandidates: [],
    disagreementCandidates: [],
    claimStakeCandidates: [],
    caveats: [],
  };
}

interface GateOptions {
  contestedness?: Record<string, number>;
  jevGate?: boolean;
  contestednessFloor?: number;
}

function project(options: GateOptions = {}) {
  const normalized = normalizeExtraction(extraction());
  const graph = buildArgumentGraph(normalized.extraction);
  return projectDisagreementReport({
    extraction: normalized.extraction,
    graph: graph.graph,
    graphValid: graph.valid,
    source: SOURCE,
    provider: "fake",
    model: "fixture",
    ...options,
  });
}

/**
 * The fixture reproduces the failure the gate exists for: the extraction marks
 * every claim contested by default, so "the corridor is congested at peak" —
 * a line the source itself flags as agreed — outranks both real disputes and
 * becomes the presented crux.
 */
const BASELINE_CRUXES = ["c-congested", "c-delay", "c-diversion"];

describe("projectDisagreementReport Jev contestedness gate", () => {
  it("presents the engine's ranked cruxes when the gate is off", () => {
    const baseline = project();
    expect(baseline.cruxes.map((crux) => crux.claimId)).toEqual(BASELINE_CRUXES);

    // Supplying probe values without the flag must change nothing at all.
    const withData = project({ contestedness: { "c-congested": 0.01, "c-delay": 0.01 } });
    expect(withData.cruxes.map((crux) => crux.claimId)).toEqual(BASELINE_CRUXES);
    expect(withData.quality.warnings).toEqual(baseline.quality.warnings);
  });

  it("skips a ranked crux the probe puts below the floor and takes the next one", () => {
    const gated = project({ jevGate: true, contestedness: { "c-congested": 0.07 } });

    expect(gated.cruxes.map((crux) => crux.claimId)).toEqual(["c-delay", "c-diversion"]);
    expect(gated.quality.warnings).toContainEqual(
      expect.stringContaining('Projection skipped engine crux "c-congested"'),
    );
    expect(gated.quality.warnings.join(" ")).toContain(
      "the contestedness probe scored it 0.07, below the 0.25 floor",
    );
    // The crux box is repopulated from the engine's own next-ranked claim.
    expect(gated.summary).toContain("The pilot cut corridor delays by a fifth");
  });

  it("keeps a crux at the floor, and honours a custom floor", () => {
    const kept = project({ jevGate: true, contestedness: { "c-congested": 0.25 } });
    expect(kept.cruxes.map((crux) => crux.claimId)).toEqual(BASELINE_CRUXES);
    expect(kept.quality.warnings.join(" ")).not.toContain("Projection skipped");

    const strict = project({
      jevGate: true,
      contestedness: { "c-congested": 0.25 },
      contestednessFloor: 0.4,
    });
    expect(strict.cruxes.map((crux) => crux.claimId)).toEqual(["c-delay", "c-diversion"]);
  });

  it("leaves a ranked crux alone when the probe has no value for it", () => {
    const gated = project({ jevGate: true, contestedness: { "c-not-in-this-report": 0.01 } });
    expect(gated.cruxes.map((crux) => crux.claimId)).toEqual(BASELINE_CRUXES);
  });

  it("can empty the crux box when the probe rejects every ranked claim", () => {
    const gated = project({
      jevGate: true,
      contestedness: Object.fromEntries(BASELINE_CRUXES.map((id) => [id, 0.02])),
    });

    // The same tradeoff filter C makes: a gated claim does not come back
    // through the restatement fallback, so the report can present no crux.
    expect(gated.cruxes).toEqual([]);
    expect(gated.quality.warnings.filter((w) => w.startsWith("Projection skipped"))).toHaveLength(3);
    expect(gated.share.subheadline).toBe("No single crux could be established.");
  });
});
