import { describe, expect, it } from "vitest";
import type { ArgumentGraph, Claim, EpistemicType } from "@/types/argument";
import { baseNode, evidence, workedExampleGraph } from "@/lib/argument/fixtures";
import { identifyCruxes } from "./rank";

function makeClaim(
  id: string,
  statement: string,
  epistemicType: EpistemicType,
  status: Claim["status"] = "contested"
): Claim {
  return {
    ...baseNode(id, "claim", statement),
    type: "claim",
    epistemicType,
    status,
    statusBasis: "fixture status basis",
    resolution: { kind: epistemicType === "normative" ? "value-difference" : "future-observable", condition: "fixture condition" },
  };
}

function weightedEvidence(id: string, finding: string, institution: string) {
  return {
    ...evidence(id, finding, institution),
    weight: {
      sourceReliability: 6,
      independence: 6,
      replicability: 6,
      directness: 6,
      weightBasis: "fixture weight",
    },
  };
}

function congestionPricingGraph(): ArgumentGraph {
  const q1 = { ...baseNode("q1", "question", "Should the city adopt congestion pricing?"), type: "question" as const };
  const positions = [
    {
      ...baseNode("p1", "position", "Adopt congestion pricing"),
      type: "position" as const,
      label: "Adopt congestion pricing",
      constituency: "Pricing supporters",
      steelmanBasis: "Benefits exceed costs with mitigations.",
      displayRank: 1,
    },
    {
      ...baseNode("p2", "position", "Reject congestion pricing"),
      type: "position" as const,
      label: "Reject congestion pricing",
      constituency: "Pricing opponents",
      steelmanBasis: "Burdens and risks exceed benefits.",
      displayRank: 2,
    },
  ];
  const inferences = [
    {
      ...baseNode("i1", "inference", "Elastic drivers and traffic effects imply peak traffic falls"),
      type: "inference" as const,
      warrant: "Price-sensitive trips and lower-emission traffic jointly support lower peak traffic.",
      warrantImplicit: false,
      warrantKind: "causal-identification" as const,
    },
    {
      ...baseNode("i2", "inference", "Main benefits exceed implementation costs"),
      type: "inference" as const,
      warrant: "Traffic, revenue, existing costs, and capacity jointly determine the benefit case.",
      warrantImplicit: false,
      warrantKind: "aggregation-model" as const,
    },
  ];

  return {
    topicId: "congestion",
    modelVersion: 2,
    question: q1,
    nodes: [
      q1,
      ...positions,
      makeClaim("c1", "Drivers are price-sensitive for peak trips", "empirical"),
      makeClaim("c2", "Peak traffic will fall", "predictive"),
      makeClaim("c3", "Reduced traffic lowers emissions and delay", "empirical", "broadly_accepted"),
      makeClaim("c4", "Revenue will improve transit", "predictive", "unresolved"),
      makeClaim("c5", "Benefits exceed implementation costs", "normative"),
      makeClaim("c6", "Low-income commuters bear unfair burden", "normative"),
      makeClaim("c7", "Rebates and exemptions mitigate the burden", "predictive", "unresolved"),
      makeClaim("c8", "Privacy and administrative burden is manageable", "empirical"),
      makeClaim("c9", "Downtown businesses will lose customers", "predictive"),
      makeClaim("c10", "Existing congestion creates large social costs", "empirical", "broadly_accepted"),
      makeClaim("c11", "Equity should constrain efficiency gains", "normative"),
      makeClaim("c12", "Transit can absorb shifted commuters", "empirical", "unresolved"),
      makeClaim("hub", "Evidence matters to policy choices", "empirical", "broadly_accepted"),
      makeClaim("isolated", "The mayor likes complicated dashboards", "empirical"),
      ...inferences,
      weightedEvidence("e1", "Pilot pricing reduced peak trips", "Pilot"),
      weightedEvidence("e2", "Some corridors did not respond to tolls", "Corridor study"),
      weightedEvidence("e3", "Commute costs fall hardest on low-income drivers", "Equity study"),
      weightedEvidence("e4", "Exemption programs miss eligible riders", "Program audit"),
    ],
    edges: [
      { id: "c1-i1", from: "c1", to: "i1", type: "premise_of" },
      { id: "c3-i1", from: "c3", to: "i1", type: "premise_of" },
      { id: "i1-c2", from: "i1", to: "c2", type: "concludes" },
      { id: "c2-i2", from: "c2", to: "i2", type: "premise_of" },
      { id: "c4-i2", from: "c4", to: "i2", type: "premise_of" },
      { id: "c10-i2", from: "c10", to: "i2", type: "premise_of" },
      { id: "c12-i2", from: "c12", to: "i2", type: "premise_of" },
      { id: "i2-c5", from: "i2", to: "c5", type: "concludes" },
      { id: "c5-p1", from: "c5", to: "p1", type: "supports" },
      { id: "c5-p2", from: "c5", to: "p2", type: "opposes" },
      { id: "c6-p1", from: "c6", to: "p1", type: "opposes" },
      { id: "c6-p2", from: "c6", to: "p2", type: "supports" },
      { id: "c7-c6", from: "c7", to: "c6", type: "opposes" },
      { id: "c8-p1", from: "c8", to: "p1", type: "supports" },
      { id: "c8-p2", from: "c8", to: "p2", type: "opposes" },
      { id: "c9-p1", from: "c9", to: "p1", type: "opposes" },
      { id: "c9-p2", from: "c9", to: "p2", type: "supports" },
      { id: "c8-c5", from: "c8", to: "c5", type: "supports" },
      { id: "c9-c5", from: "c9", to: "c5", type: "opposes" },
      { id: "c11-c6", from: "c11", to: "c6", type: "supports" },
      { id: "e1-c1", from: "e1", to: "c1", type: "evidences", polarity: "supporting" },
      { id: "e2-c1", from: "e2", to: "c1", type: "evidences", polarity: "challenging" },
      { id: "e3-c6", from: "e3", to: "c6", type: "evidences", polarity: "supporting" },
      { id: "e4-c7", from: "e4", to: "c7", type: "evidences", polarity: "challenging" },
      { id: "hub-c1", from: "hub", to: "c1", type: "supports" },
      { id: "hub-c2", from: "hub", to: "c2", type: "supports" },
      { id: "hub-c5", from: "hub", to: "c5", type: "supports" },
      { id: "hub-c6", from: "hub", to: "c6", type: "supports" },
    ],
  };
}

describe("identifyCruxes", () => {
  it("recovers the worked-example causal and definitional cruxes and boosts the implicit claim", () => {
    const results = identifyCruxes(workedExampleGraph());
    const ids = results.map((result) => result.claimId);
    const c3 = results.find((result) => result.claimId === "c3");
    const c4 = results.find((result) => result.claimId === "c4");

    expect(ids).toEqual(expect.arrayContaining(["c2", "c3"]));
    expect(c3?.directDiscrimination).toBeLessThan(c3?.discrimination ?? 0);
    expect(c4?.implicitBoost).toBe(1.15);
  });

  it("ranks the congestion-pricing main cost-benefit and burden cruxes while excluding controls", () => {
    const ids = identifyCruxes(congestionPricingGraph()).map((result) => result.claimId);

    expect(ids).toEqual(expect.arrayContaining(["c5", "c6"]));
    expect(ids).not.toContain("hub");
    expect(ids).not.toContain("isolated");
  });

  it("applies redundancy, pin, suppress, and deterministic explanation facts", () => {
    const graph = congestionPricingGraph();
    const c1 = graph.nodes.find((node): node is Claim => node.id === "c1" && node.type === "claim");
    const c2 = graph.nodes.find((node): node is Claim => node.id === "c2" && node.type === "claim");
    const c6 = graph.nodes.find((node): node is Claim => node.id === "c6" && node.type === "claim");
    const suppressIds = new Set(["c7", "c8", "c9", "c11"]);
    if (c1 !== undefined) {
      c1.cruxOverride = "pin";
      c1.overrideBasis = "Pinned for review.";
    }
    if (c2 !== undefined) c2.statusBasis = "Duplicate downstream route.";
    if (c6 !== undefined) {
      c6.cruxOverride = "suppress";
      c6.overrideBasis = "Suppressed by curator.";
    }
    for (const node of graph.nodes) {
      if (node.type === "claim" && suppressIds.has(node.id)) {
        node.cruxOverride = "suppress";
        node.overrideBasis = "Suppressed to inspect downstream redundancy.";
      }
    }

    const results = identifyCruxes(graph);
    const c1Result = results.find((result) => result.claimId === "c1");
    const c2Result = results.find((result) => result.claimId === "c2");
    const c5Result = results.find((result) => result.claimId === "c5");
    const numberTokens = (c1Result?.explanationFacts.join(" ").match(/-?\d+\.\d+/g) ?? []).map(Number);
    const computedNumbers = new Set(
      [
        c1Result?.score,
        c1Result?.contestedness,
        c1Result?.reach,
        c1Result?.discrimination,
        c1Result?.tractability,
        c1Result?.implicitBoost,
        c1Result?.scopingBonus,
        ...(c1Result?.affectedPositions.map((target) => target.delta) ?? []),
      ].map((value) => value?.toFixed(3))
    );

    expect(results[0]?.claimId).toBe("c1");
    expect(results.map((result) => result.claimId)).not.toContain("c6");
    expect(c2Result?.score ?? 1).toBeLessThan(c5Result?.score ?? 0);
    expect(numberTokens.every((value) => computedNumbers.has(value.toFixed(3)))).toBe(true);
  });
});
