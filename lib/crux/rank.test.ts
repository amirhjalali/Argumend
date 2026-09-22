import { describe, expect, it } from "vitest";
import type { ArgumentGraph, Claim, EpistemicType } from "@/types/argument";
import type { CruxLedgerEntry, LedgerInputByClaim } from "@/types/cruxLedger";
import { baseNode, claim, evidence, workedExampleGraph } from "@/lib/argument/fixtures";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";
import { currentLedgerEntries } from "@/lib/argument/ledger";
import { identifyCruxes, identifyCruxesWithDiagnostics } from "./rank";
import { computeCruxSignals } from "./signals";

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

describe("identifyCruxes with crux-ledger status (v1.3, spec §1.3)", () => {
  const ids = (ledgerStatus: LedgerInputByClaim, limit?: number) =>
    identifyCruxes(workedExampleGraph(), { ledgerStatus, limit }).map((result) => result.claimId);
  const baseScoreOf = (graph: ArgumentGraph, claimId: string) =>
    computeCruxSignals(graph).signals.find((signal) => signal.claim.id === claimId)?.baseScore;
  const setOverride = (graph: ArgumentGraph, claimId: string, cruxOverride: "pin" | "suppress") => {
    const node = graph.nodes.find(
      (candidate): candidate is Claim => candidate.id === claimId && candidate.type === "claim"
    );
    if (node === undefined) throw new Error(`fixture has no claim ${claimId}`);
    node.cruxOverride = cruxOverride;
    node.overrideBasis = "Curator override for the ledger test.";
  };

  it("reproduces the default ranking exactly with an empty ledger", () => {
    const graph = workedExampleGraph();
    const expected = JSON.stringify(identifyCruxes(graph));

    expect(JSON.stringify(identifyCruxes(graph, { ledgerStatus: {} }))).toBe(expected);
    const diagnostics = identifyCruxesWithDiagnostics(graph, { ledgerStatus: {} });
    expect(JSON.stringify(diagnostics.cruxes)).toBe(expected);
    expect(diagnostics.droppedByLedgerIds).toEqual([]);
  });

  it("rule 4: open changes nothing but the reported status", () => {
    const graph = workedExampleGraph();
    const expected = identifyCruxes(graph);
    const open = identifyCruxes(graph, {
      ledgerStatus: { c1: "open", c2: "open", c3: "open", c4: "open" },
    });

    expect(open.map((result) => result.ledgerStatus)).toEqual(["open", "open", "open", "open"]);
    expect(
      JSON.stringify(
        open.map((result) => {
          const { ledgerStatus, ...rest } = result;
          void ledgerStatus;
          return rest;
        })
      )
    ).toBe(JSON.stringify(expected));
  });

  it("rule 1: resolved leaves candidacy and is reported, and gates say so", () => {
    expect(ids({})).toContain("c2");
    const ranking = identifyCruxesWithDiagnostics(workedExampleGraph(), {
      ledgerStatus: { c2: "resolved" },
    });
    const c4 = ranking.cruxes.find((result) => result.claimId === "c4");

    expect(ranking.cruxes.map((result) => result.claimId)).not.toContain("c2");
    expect(ranking.droppedByLedgerIds).toEqual(["c2"]);
    expect(ranking.droppedByFloorIds).toEqual([]);
    // c3 (the definition of "mass unemployment") had reach only through the
    // claim it scopes; with c2 settled there is nothing left for it to gate.
    expect(ranking.cruxes.map((result) => result.claimId)).not.toContain("c3");
    expect(c4?.gatesClaimIds).toEqual([]);
    expect(c4?.explanationFacts).toContain(
      "Gates: none; removed from candidacy as resolved in the crux ledger: c2."
    );
  });

  it("rule 2: unresolvable is selected on its own base score, ahead of unpinned claims", () => {
    const graph = workedExampleGraph();
    const defaultC1 = identifyCruxes(graph).find((result) => result.claimId === "c1");
    const c1Base = Number((baseScoreOf(graph, "c1") ?? 0).toFixed(3));
    // c1's downstream set is c4's, so redundancy control cuts its score by default...
    expect(defaultC1?.score).toBeLessThan(c1Base);
    // ...and at limit 2 it does not make the set.
    expect(ids({}, 2)).toEqual(["c4", "c3"]);

    const results = identifyCruxes(graph, {
      limit: 2,
      ledgerStatus: {
        c1: {
          status: "unresolvable",
          date: "2026-04-02",
          note: "Both sides accept the cohort data; they weigh early-career harm against aggregate output differently",
        },
      },
    });

    expect(results.map((result) => result.claimId)).toEqual(["c1", "c4"]);
    expect(results[0]?.score).toBe(c1Base);
    expect(results[0]?.ledgerStatus).toBe("unresolvable");
    expect(results[0]?.explanationFacts).toContain(
      "Ledger: unresolvable on 2026-04-02 — Both sides accept the cohort data; they weigh early-career harm against aggregate output differently."
    );
  });

  it("rule 2: an unresolvable claim below the floor is not forced into the set", () => {
    const graph = workedExampleGraph();
    graph.nodes.push(
      claim("c7", "A weakly connected implicit assumption", "empirical", true, "broadly_accepted")
    );
    graph.edges.push({ id: "edge-c7-e3", from: "c7", to: "e3", type: "supports" });
    expect(baseScoreOf(graph, "c7")).toBeLessThan(0.15);

    const results = identifyCruxes(graph, { limit: 10, ledgerStatus: { c7: "unresolvable" } });

    expect(results.map((result) => result.claimId)).not.toContain("c7");
    expect(JSON.stringify(results)).toBe(JSON.stringify(identifyCruxes(graph, { limit: 10 })));
  });

  it("rule 2: pins plus unresolvable claims never exceed the limit", () => {
    const graph = workedExampleGraph();
    setOverride(graph, "c4", "pin");

    const results = identifyCruxes(graph, {
      limit: 2,
      ledgerStatus: { c1: "unresolvable", c2: "unresolvable", c3: "unresolvable" },
    });

    // One slot is left after the pin; the held claim with the highest base score takes it.
    expect(results.map((result) => result.claimId)).toEqual(["c4", "c3"]);
  });

  it("rule 3: narrowed drops the evidence-starved annotation and cites the entry, score unchanged", () => {
    const graph = workedExampleGraph();
    const before = identifyCruxes(graph);
    const after = identifyCruxes(graph, {
      ledgerStatus: {
        c3: {
          status: "narrowed",
          date: "2026-05-01",
          note: "BLS added a U-3-by-cohort series, so the threshold question now has one agreed measure.",
        },
      },
    });
    const beforeC3 = before.find((result) => result.claimId === "c3");
    const afterC3 = after.find((result) => result.claimId === "c3");

    expect(beforeC3?.evidenceStarved).toBe(true);
    expect(afterC3?.evidenceStarved).toBe(false);
    expect(afterC3?.ledgerStatus).toBe("narrowed");
    expect(afterC3?.explanationFacts.at(-1)).toBe(
      "Ledger: narrowed on 2026-05-01 — BLS added a U-3-by-cohort series, so the threshold question now has one agreed measure."
    );
    expect(after.map((result) => [result.claimId, result.score])).toEqual(
      before.map((result) => [result.claimId, result.score])
    );
  });

  it("cruxOverride wins: suppress beats unresolvable", () => {
    const graph = workedExampleGraph();
    setOverride(graph, "c1", "suppress");

    const results = identifyCruxes(graph, { ledgerStatus: { c1: "unresolvable" } });

    expect(results.map((result) => result.claimId)).not.toContain("c1");
  });

  it("cruxOverride wins: a pin keeps a resolved claim", () => {
    const graph = workedExampleGraph();
    setOverride(graph, "c2", "pin");

    const ranking = identifyCruxesWithDiagnostics(graph, { ledgerStatus: { c2: "resolved" } });

    expect(ranking.cruxes[0]?.claimId).toBe("c2");
    expect(ranking.cruxes[0]?.ledgerStatus).toBe("resolved");
    expect(ranking.droppedByLedgerIds).toEqual([]);
  });

  it("unreviewed judgment entries can never move the ranking", () => {
    const topicId = "ai-mass-unemployment";
    // Evidence-starved in the unledgered ranking, so a narrowing is visible.
    const claimId = "c-credential-pathway-narrows";
    const proposal: CruxLedgerEntry = {
      id: `${topicId}:${claimId}:2026-05-01:1`,
      topicId,
      claimId,
      date: "2026-05-01",
      status: "narrowed",
      resolutionKind: "existing-evidence",
      evidenceNodeIds: ["e-dallas-fed-wage-growth"],
      note: "A model proposal that new wage-growth data narrows the credential-pathway question.",
      author: {
        kind: "judgment",
        modelId: "fixture-model",
        promptVersion: "ledger-v1",
        contentHash: "sha256:fixture",
        validator: "pass",
      },
      createdAt: "2026-05-02",
    };
    const reviewed: CruxLedgerEntry = {
      ...proposal,
      author: {
        kind: "judgment",
        modelId: "fixture-model",
        promptVersion: "ledger-v1",
        contentHash: "sha256:fixture",
        validator: "pass",
        reviewedBy: "curator",
      },
    };
    const load = (entries: CruxLedgerEntry[]) => {
      const topic = loadArgumentTopic(topicId, {
        readLedger: () => JSON.stringify({ topicId, entries }),
      });
      if (topic === null) throw new Error(`${topicId} is not registered`);
      return topic;
    };
    const baseline = load([]);
    const unreviewed = load([proposal]);

    expect(unreviewed.ledger).toHaveLength(1);
    expect(currentLedgerEntries(unreviewed.ledger)).toEqual({});
    expect(JSON.stringify(unreviewed.cruxes)).toBe(JSON.stringify(baseline.cruxes));

    // The same entry, once reviewed, does move the card: review is the gate.
    const afterReview = load([reviewed]).cruxes.find((result) => result.claimId === claimId);
    expect(baseline.cruxes.find((result) => result.claimId === claimId)?.evidenceStarved).toBe(true);
    expect(afterReview?.evidenceStarved).toBe(false);
    expect(afterReview?.ledgerStatus).toBe("narrowed");
  });
});
