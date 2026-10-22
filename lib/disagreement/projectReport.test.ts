import { describe, expect, it } from "vitest";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { buildArgumentGraph } from "./buildGraph";
import { normalizeExtraction } from "./normalize";
import { projectDisagreementReport } from "./projectReport";
import { oscillatingGraph } from "@/lib/crux/__fixtures__/oscillatingGraph";
import { PROPAGATION_NON_CONVERGENCE_WARNING } from "@/lib/crux/propagate";
import { DisagreementReportSchema } from "@/lib/schemas/disagreement";
import { DISAGREEMENT_LIMITS } from "./constants";
import { canPublishReport } from "./quality";

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

function projectOscillation(extraWarnings: string[] = []) {
  const raw = extraction();
  raw.claims = ["x", "a", "b", "c"].map((id) => claim(id, `Claim ${id} matters to the pilot`));
  raw.claimRelations = [];
  return projectDisagreementReport({
    extraction: normalizeExtraction(raw).extraction,
    graph: oscillatingGraph(),
    graphValid: true,
    source: SOURCE,
    provider: "fake",
    model: "fixture",
    extraWarnings,
  });
}

describe("projectDisagreementReport numerical diagnostics", () => {
  it("retains one content-free nonconvergence warning alongside other quality warnings", () => {
    const existing = Array.from({ length: 39 }, (_, i) => `Existing quality warning ${i}`);
    const report = projectOscillation(existing);

    expect(report.quality.warnings).toContain(PROPAGATION_NON_CONVERGENCE_WARNING);
    expect(report.quality.warnings.filter((warning) => warning === PROPAGATION_NON_CONVERGENCE_WARNING)).toHaveLength(1);
    expect(report.quality.warnings).toEqual(expect.arrayContaining(existing));
    expect(DisagreementReportSchema.safeParse(report).success).toBe(true);
  });

  it("reserves room for the numerical diagnostic when the warning capacity is full", () => {
    const report = projectOscillation(Array.from({ length: 40 }, (_, i) => `Existing quality warning ${i}`));

    expect(report.quality.warnings).toHaveLength(40);
    expect(report.quality.warnings[0]).toBe(PROPAGATION_NON_CONVERGENCE_WARNING);
    expect(report.quality.warnings[1]).toBe("Existing quality warning 0");
    expect(DisagreementReportSchema.safeParse(report).success).toBe(true);
  });

  it("does not duplicate a diagnostic already supplied by the caller", () => {
    const report = projectOscillation([PROPAGATION_NON_CONVERGENCE_WARNING, "Another quality warning"]);

    expect(report.quality.warnings.filter((warning) => warning === PROPAGATION_NON_CONVERGENCE_WARNING)).toHaveLength(1);
    expect(report.quality.warnings).toContain("Another quality warning");
  });

  it("retains a late critical warning and its publication block even when its detail exceeds the limit", () => {
    const existing = Array.from({ length: DISAGREEMENT_LIMITS.maxQualityWarnings }, (_, i) => `Existing quality warning ${i}`);
    const report = projectOscillation([
      ...existing,
      `${"Long diagnostic detail. ".repeat(20)}Critical quality failure.`,
    ]);

    expect(report.quality.warnings[0]).toBe(PROPAGATION_NON_CONVERGENCE_WARNING);
    expect(report.quality.warnings[1]).toMatch(/^Critical quality warning: /);
    expect(report.quality.warnings).toHaveLength(DISAGREEMENT_LIMITS.maxQualityWarnings);
    expect(DisagreementReportSchema.safeParse(report).success).toBe(true);
    expect(canPublishReport(report).reasons).toContain("Critical quality warnings remain.");
  });
});

describe("projectDisagreementReport caveat capacity", () => {
  it.each([
    Array.from({ length: DISAGREEMENT_LIMITS.maxCaveats }, (_, index) => `Caveat ${index + 1} applies.`),
    ["A".repeat(DISAGREEMENT_LIMITS.maxSummaryCharacters), "B".repeat(DISAGREEMENT_LIMITS.maxSummaryCharacters)],
  ])("reserves the required disclaimer while retaining complete model caveats", (...caveats) => {
    const raw = extraction();
    raw.caveats = caveats;
    const normalized = normalizeExtraction(raw).extraction;
    const graph = buildArgumentGraph(normalized);

    const report = projectDisagreementReport({
      extraction: normalized, graph: graph.graph, graphValid: graph.valid, source: SOURCE,
      provider: "fake", model: "fixture",
    });

    expect(report.caveats[0]).toBe(caveats[0]);
    expect(report.caveats.at(-1)).toMatch(/^This analysis maps the submitted text\./);
    expect(report.caveats.slice(0, -1)).toEqual(caveats.slice(0, report.caveats.length - 1));
    expect(report.caveats.length).toBeLessThanOrEqual(DISAGREEMENT_LIMITS.maxCaveats);
    expect(report.caveats.join("").length).toBeLessThanOrEqual(DISAGREEMENT_LIMITS.maxCaveatsCombinedCharacters);
    expect(DisagreementReportSchema.safeParse(report).success).toBe(true);
  });
});

describe("projectDisagreementReport Jev contestedness gate", () => {
  it("presents the engine's ranked cruxes when the gate is off", () => {
    const baseline = project();
    expect(baseline.cruxes.map((crux) => crux.claimId)).toEqual(BASELINE_CRUXES);

    // Supplying probe values without the flag must change nothing at all.
    const withData = project({ contestedness: { "c-congested": 0.01, "c-delay": 0.01 } });
    expect(withData.cruxes.map((crux) => crux.claimId)).toEqual(BASELINE_CRUXES);
    expect(withData.quality.warnings).toEqual(baseline.quality.warnings);

    // An explicit false also wins over an environment that turned it on.
    const pinnedOff = project({
      jevGate: false,
      contestedness: { "c-congested": 0.01, "c-delay": 0.01 },
    });
    expect(pinnedOff.cruxes.map((crux) => crux.claimId)).toEqual(BASELINE_CRUXES);
  });

  it("skips a ranked crux the probe puts below the floor and takes the next one", () => {
    const gated = project({ jevGate: true, contestedness: { "c-congested": 0.07 } });

    expect(gated.cruxes.map((crux) => crux.claimId)).toEqual(["c-delay", "c-diversion"]);
    expect(gated.quality.warnings).toContainEqual(
      expect.stringContaining('Projection skipped engine crux at rank 1'),
    );
    expect(gated.quality.warnings.join(" ")).toContain(
      "the contestedness probe scored it 0.07, below the 0.25 floor",
    );
    // The crux box is repopulated from the engine's own next-ranked claim.
    expect(gated.summary).toContain("The pilot cut corridor delays by a fifth");
  });

  it("does not interpret model-authored skipped-claim text as a critical warning", () => {
    const raw = extraction();
    raw.claims[2].statement = "Critical thinking is needed to interpret the corridor data.";
    const normalized = normalizeExtraction(raw).extraction;
    const graph = buildArgumentGraph(normalized);
    const report = projectDisagreementReport({
      extraction: normalized, graph: graph.graph, graphValid: graph.valid, source: SOURCE,
      provider: "fake", model: "fixture", jevGate: true, contestedness: { "c-congested": 0.01 },
    });

    expect(report.quality.warnings.join(" ")).toContain("Projection skipped engine crux at rank");
    expect(report.quality.warnings.join(" ")).not.toMatch(/critical/i);
    expect(canPublishReport(report).ok).toBe(true);
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
