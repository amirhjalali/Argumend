import { afterEach, describe, expect, it } from "vitest";
import { CRUX_LEVERS_OFF, CRUX_LEVER_ENV_VARS, type CruxLeverFlags } from "@/lib/crux";
import type { DisagreementReportV1, RawDisagreementExtractionV1 } from "@/types/disagreement";
import { analyzeDisagreement } from "./analyze";
import { buildArgumentGraph } from "./buildGraph";
import { FakeDisagreementProvider } from "./model/fake";
import { normalizeExtraction } from "./normalize";
import { projectDisagreementReport } from "./projectReport";
import { normalizeSourceText } from "./source";

const SKIP_PREFIX = "Projection skipped engine crux";

/**
 * Two people who agree the bridge is closed and disagree about what to do.
 * The shared fact is wired as supporting both positions, disputed by nobody,
 * and contradicted by nothing, so it is exactly what filter C withholds; the
 * two proposals oppose each other's position and are disputed, so they stay.
 */
const SOURCE = [
  "Ana: The bridge is closed until May. We should reroute the bus now. Rerouting now keeps riders moving.",
  "Ben: Yes, the bridge is closed until May, but we should wait for the survey. The survey will show whether a detour is even needed.",
].join("\n");

function extraction(): RawDisagreementExtractionV1 {
  return {
    mainQuestion: "Should the bus be rerouted now?",
    participants: [
      { id: "ana", label: "Ana", kind: "named" },
      { id: "ben", label: "Ben", kind: "named" },
    ],
    positions: [
      {
        id: "p-reroute",
        label: "Reroute now",
        participantIds: ["ana"],
        thesis: "The bus should be rerouted now.",
        steelman: "Riders need a working route today.",
        explicitness: "explicit",
        confidence: "high",
        groundingQuotes: [{ quote: "We should reroute the bus now.", participantId: "ana" }],
      },
      {
        id: "p-wait",
        label: "Wait for the survey",
        participantIds: ["ben"],
        thesis: "The bus should keep its route until the survey reports.",
        steelman: "A detour may prove unnecessary.",
        explicitness: "explicit",
        confidence: "high",
        groundingQuotes: [{ quote: "we should wait for the survey", participantId: "ben" }],
      },
    ],
    claims: [
      {
        id: "c-closed",
        statement: "The bridge is closed until May.",
        participantIds: ["ana", "ben"],
        epistemicType: "empirical",
        explicitness: "explicit",
        stanceByPosition: [
          { positionId: "p-reroute", relation: "supports" },
          { positionId: "p-wait", relation: "supports" },
        ],
        acceptedByParticipantIds: ["ana", "ben"],
        disputedByParticipantIds: [],
        confidence: "high",
        groundingQuotes: [{ quote: "The bridge is closed until May.", participantId: "ana" }],
      },
      {
        id: "c-reroute",
        statement: "Rerouting now keeps riders moving.",
        participantIds: ["ana"],
        epistemicType: "predictive",
        explicitness: "explicit",
        stanceByPosition: [
          { positionId: "p-reroute", relation: "supports" },
          { positionId: "p-wait", relation: "opposes" },
        ],
        acceptedByParticipantIds: ["ana"],
        disputedByParticipantIds: ["ben"],
        confidence: "medium",
        groundingQuotes: [{ quote: "Rerouting now keeps riders moving.", participantId: "ana" }],
      },
      {
        id: "c-wait",
        statement: "The survey will show whether a detour is even needed.",
        participantIds: ["ben"],
        epistemicType: "predictive",
        explicitness: "explicit",
        stanceByPosition: [
          { positionId: "p-wait", relation: "supports" },
          { positionId: "p-reroute", relation: "opposes" },
        ],
        acceptedByParticipantIds: ["ben"],
        disputedByParticipantIds: ["ana"],
        confidence: "medium",
        groundingQuotes: [{ quote: "The survey will show whether a detour is even needed.", participantId: "ben" }],
      },
    ],
    claimRelations: [{ fromClaimId: "c-wait", toClaimId: "c-reroute", type: "opposes" }],
    commonGroundCandidates: [],
    disagreementCandidates: [
      {
        id: "d-1",
        question: "Should the bus be rerouted now or after the survey?",
        type: "procedural",
        summary: "Ana wants to reroute immediately; Ben wants to wait for the survey.",
        claimIds: ["c-reroute", "c-wait"],
        participantStances: [
          { participantId: "ana", positionId: "p-reroute", stance: "Reroute now." },
          { participantId: "ben", positionId: "p-wait", stance: "Wait for the survey." },
        ],
        resolutionCondition: "The survey result.",
        confidence: "high",
        groundingQuotes: [],
      },
    ],
    caveats: [],
  };
}

function project(
  raw: RawDisagreementExtractionV1,
  cruxFlags?: Partial<CruxLeverFlags>,
): DisagreementReportV1 {
  const normalized = normalizeExtraction(raw);
  const built = buildArgumentGraph(normalized.extraction);
  expect(built.valid).toBe(true);
  return projectDisagreementReport({
    extraction: normalized.extraction,
    graph: built.graph,
    graphValid: built.valid,
    source: normalizeSourceText(SOURCE),
    provider: "fake",
    model: "fake",
    cruxFlags,
  });
}

function cruxIds(report: DisagreementReportV1): string[] {
  return report.cruxes.map((crux) => crux.claimId);
}

function skipWarnings(report: DisagreementReportV1): string[] {
  return report.quality.warnings.filter((warning) => warning.startsWith(SKIP_PREFIX));
}

function withoutTimestamp(report: DisagreementReportV1) {
  const { provenance, ...rest } = report;
  const { generatedAt: _generatedAt, ...stableProvenance } = provenance;
  return { ...rest, provenance: stableProvenance };
}

afterEach(() => {
  Reflect.deleteProperty(process.env, CRUX_LEVER_ENV_VARS.projectionSkipUncontested);
});

describe("projection filter C (CRUX_PROJECTION_SKIP_UNCONTESTED)", () => {
  it("presents the undisputed shared fact when the flag is off, and is identical with levers explicitly off", () => {
    const report = project(extraction());
    expect(cruxIds(report)).toContain("c-closed");
    expect(skipWarnings(report)).toEqual([]);
    expect(withoutTimestamp(project(extraction(), CRUX_LEVERS_OFF))).toEqual(withoutTimestamp(report));
  });

  it("withholds a claim no position disputes, keeps the engine order of the rest, and names it in a warning", () => {
    const off = project(extraction());
    const on = project(extraction(), { projectionSkipUncontested: true });
    expect(cruxIds(on)).not.toContain("c-closed");
    expect(cruxIds(on)).toEqual(cruxIds(off).filter((id) => id !== "c-closed"));
    expect(skipWarnings(on)).toEqual([
      'Projection skipped engine crux "c-closed" (The bridge is closed until May.): no position disputes it',
    ]);
  });

  it("names explicit common ground as the reason when the report presents the claim as shared", () => {
    const raw = extraction();
    raw.commonGroundCandidates = [
      {
        statement: "The bridge is closed until May.",
        participantIds: ["ana", "ben"],
        basis: "explicit",
        confidence: "high",
        groundingQuotes: [
          { quote: "The bridge is closed until May.", participantId: "ana" },
          { quote: "the bridge is closed until May", participantId: "ben" },
        ],
      },
    ];
    const on = project(raw, { projectionSkipUncontested: true });
    expect(on.commonGround).toHaveLength(1);
    expect(cruxIds(on)).not.toContain("c-closed");
    expect(skipWarnings(on)[0]).toContain("it is explicit common ground in the report");
  });

  it("keeps the claim once anyone is recorded as disputing it", () => {
    const raw = extraction();
    raw.claims[0]!.disputedByParticipantIds = ["ben"];
    const on = project(raw, { projectionSkipUncontested: true });
    expect(cruxIds(on)).toContain("c-closed");
    expect(skipWarnings(on)).toEqual([]);
  });

  it("follows the environment through the full pipeline, and an explicit option overrides it", async () => {
    process.env[CRUX_LEVER_ENV_VARS.projectionSkipUncontested] = "true";
    const viaPipeline = await analyzeDisagreement({
      content: SOURCE,
      contentType: "conversation",
      requestId: "22222222-2222-2222-2222-222222222222",
      provider: new FakeDisagreementProvider(extraction()),
    });
    expect(cruxIds(viaPipeline.report)).not.toContain("c-closed");
    expect(skipWarnings(viaPipeline.report)).toHaveLength(1);

    const overridden = project(extraction(), { projectionSkipUncontested: false });
    expect(cruxIds(overridden)).toContain("c-closed");
  });
});
