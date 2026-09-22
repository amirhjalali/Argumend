import { describe, expect, it } from "vitest";
import type { ArgumentGraph, Claim } from "@/types/argument";
import { baseNode, evidence } from "@/lib/argument/fixtures";
import { argumentTopicIds, loadArgumentTopic } from "@/lib/argument/draftTopics";
import {
  CRUX_PROJECTION_JEV_GATE_ENV,
  contestednessOverridesFrom,
  jevProjectionGateEnabled,
  overriddenContestedness,
} from "./contestedness";
import { identifyCruxes } from "./rank";

function claimNode(
  id: string,
  statement: string,
  status: Claim["status"] = "contested",
): Claim {
  return {
    ...baseNode(id, "claim", statement),
    type: "claim",
    status,
    statusBasis: "fixture status basis",
    epistemicType: "empirical",
    resolution: { kind: "existing-evidence", condition: "fixture condition" },
  };
}

/**
 * Two forking claims with identical topology. `c-a` alone carries one
 * supporting and one challenging evidence node, so its balance term is 1 and
 * it outranks `c-b` by exactly the contestedness gap — which makes any move
 * in C directly visible in the order.
 */
function forkGraph(): ArgumentGraph {
  const q1 = { ...baseNode("q1", "question", "Should the bridge be tolled?"), type: "question" as const };
  return {
    topicId: "fork-fixture",
    modelVersion: 2,
    question: q1,
    nodes: [
      q1,
      {
        ...baseNode("p1", "position", "Toll the bridge"),
        type: "position" as const,
        label: "Toll the bridge",
        constituency: "Toll supporters",
        steelmanBasis: "Congestion falls and revenue funds transit.",
        displayRank: 1,
      },
      {
        ...baseNode("p2", "position", "Do not toll the bridge"),
        type: "position" as const,
        label: "Do not toll the bridge",
        constituency: "Toll opponents",
        steelmanBasis: "Costs land on commuters with no alternative.",
        displayRank: 2,
      },
      claimNode("c-a", "Tolling the bridge would cut peak congestion by a fifth"),
      claimNode("c-b", "Tolling the bridge would push traffic onto residential streets"),
      claimNode("c-c", "The bridge needs structural repair within five years", "uncontested"),
      evidence("e1", "A cordon study measured a 21% peak reduction", "Transport Institute"),
      evidence("e2", "A second cordon study found no durable peak reduction", "City Audit Office"),
    ],
    edges: [
      { id: "e-a-p1", from: "c-a", to: "p1", type: "supports" },
      { id: "e-a-p2", from: "c-a", to: "p2", type: "opposes" },
      { id: "e-b-p2", from: "c-b", to: "p2", type: "supports" },
      { id: "e-b-p1", from: "c-b", to: "p1", type: "opposes" },
      { id: "e-c-p1", from: "c-c", to: "p1", type: "supports" },
      { id: "e-e1-a", from: "e1", to: "c-a", type: "evidences", polarity: "supporting" },
      { id: "e-e2-a", from: "e2", to: "c-a", type: "evidences", polarity: "challenging" },
    ],
  };
}

function pin(graph: ArgumentGraph, claimId: string): ArgumentGraph {
  return {
    ...graph,
    nodes: graph.nodes.map((node) =>
      node.id === claimId && node.type === "claim"
        ? { ...node, cruxOverride: "pin" as const, overrideBasis: "Pinned for review." }
        : node,
    ),
  };
}

describe("contestedness overrides in identifyCruxes", () => {
  it("leaves the ranking untouched when no override is supplied", () => {
    const graph = forkGraph();
    const base = identifyCruxes(graph);

    expect(identifyCruxes(graph, {})).toEqual(base);
    expect(identifyCruxes(graph, { contestednessOverrides: {} })).toEqual(base);
    expect(identifyCruxes(graph, { contestednessOverrides: { "c-unknown": 0.01 } })).toEqual(base);
    expect(base.every((result) => result.contestednessOverride === undefined)).toBe(true);
  });

  it("replaces the balance modulator and lowers the rank of a claim the probe says is undisputed", () => {
    const graph = forkGraph();
    const before = identifyCruxes(graph);
    expect(before.map((result) => result.claimId)).toEqual(["c-a", "c-b"]);
    expect(before[0].contestedness).toBe(1);

    const after = identifyCruxes(graph, { contestednessOverrides: { "c-a": 0.3 } });
    expect(after.map((result) => result.claimId)).toEqual(["c-b", "c-a"]);
    const cA = after.find((result) => result.claimId === "c-a");
    expect(cA?.contestedness).toBe(0.3);
    expect(cA?.contestednessOverride).toBe(0.3);
    // A claim with no override keeps its own signals untouched. Its final
    // score can still move, because the redundancy penalty is applied in
    // selection order and c-b is now selected first — the override changes
    // which claim pays the overlap penalty, not how c-b is measured.
    const cB = after.find((result) => result.claimId === "c-b");
    expect(cB?.contestedness).toBe(before.find((result) => result.claimId === "c-b")?.contestedness);
    expect(cB?.contestednessOverride).toBeUndefined();
  });

  it("drops a claim below the candidacy floor out of the ranking entirely", () => {
    const graph = forkGraph();
    const gated = identifyCruxes(graph, { contestednessOverrides: { "c-a": 0.07 } });

    expect(gated.map((result) => result.claimId)).toEqual(["c-b"]);
    // 0.07 is above a floor of 0.05, so the same claim survives with a lower C.
    const lenient = identifyCruxes(graph, {
      contestednessOverrides: { "c-a": 0.07 },
      candidacyFloor: 0.05,
    });
    expect(lenient.map((result) => result.claimId)).toContain("c-a");
    expect(lenient.find((result) => result.claimId === "c-a")?.contestedness).toBe(0.07);
  });

  it("keeps a pinned claim even when the probe puts it under the floor", () => {
    const graph = pin(forkGraph(), "c-a");
    const results = identifyCruxes(graph, { contestednessOverrides: { "c-a": 0.02 } });

    expect(results[0]?.claimId).toBe("c-a");
    expect(results[0]?.contestedness).toBe(0.02);
    expect(results[0]?.contestednessOverride).toBe(0.02);
  });

  it("lets the probe veto but never nominate: an uncontested claim stays at zero", () => {
    // c-c is editorially uncontested. Pinning makes it a candidate; a confident
    // probe must not manufacture contestedness the extraction never recorded.
    const graph = pin(forkGraph(), "c-c");
    const results = identifyCruxes(graph, { contestednessOverrides: { "c-c": 0.98 } });

    expect(results[0]?.claimId).toBe("c-c");
    expect(results[0]?.contestedness).toBe(0);
  });

  it("names the probe in the explanation facts without inventing a number", () => {
    const results = identifyCruxes(forkGraph(), { contestednessOverrides: { "c-a": 0.07 }, candidacyFloor: 0 });
    const cA = results.find((result) => result.claimId === "c-a");
    const facts = cA?.explanationFacts.join(" ") ?? "";

    expect(facts).toContain("Contestedness from probe: 0.070");
    const numberTokens = (facts.match(/-?\d+\.\d+/g) ?? []).map(Number);
    const computed = new Set(
      [
        cA?.score,
        cA?.contestedness,
        cA?.contestednessOverride,
        cA?.reach,
        cA?.discrimination,
        cA?.tractability,
        cA?.implicitBoost,
        cA?.scopingBonus,
        ...(cA?.affectedPositions.map((target) => target.delta) ?? []),
      ].map((value) => value?.toFixed(3)),
    );
    expect(numberTokens.every((value) => computed.has(value.toFixed(3)))).toBe(true);
  });

  it("clamps out-of-range and non-finite override values", () => {
    const graph = forkGraph();
    expect(
      identifyCruxes(graph, { contestednessOverrides: { "c-a": 7 } }).find((r) => r.claimId === "c-a")
        ?.contestedness,
    ).toBe(1);
    expect(
      identifyCruxes(graph, { contestednessOverrides: { "c-a": Number.NaN }, candidacyFloor: 0 }).find(
        (r) => r.claimId === "c-a",
      )?.contestedness,
    ).toBe(0);
  });
});

describe("flagship regression with no overrides", () => {
  // Frozen from main at 2026-09-21. The override input must not move a single
  // id on a map that was never probed.
  const EXPECTED_TOP_5: Record<string, string[]> = {
    "ai-mass-unemployment": [
      "c-firms-cut-hiring-not-output",
      "c-targeted-programs-can-help",
      "c-displaced-workers-can-retrain-costlessly",
      "c-mass-unemployment-definition-strict",
      "c-credential-pathway-narrows",
    ],
    "capitalism-after-ai": [
      "c-ai-ownership-stays-concentrated",
      "c-reallocation-keeps-pace",
      "c-survival-definition-contested",
      "c-demand-collapse-without-recycling",
      "c-wage-channel-loses-primacy",
    ],
    "us-israel-support": [
      "c-regional-stability-depends-on-alliance",
      "c-gaza-death-toll-uncertain",
      "c-casualty-figures-mostly-combatants",
      "c-alliance-obligations-override-complicity",
      "c-aid-buys-leverage",
    ],
  };

  for (const topicId of argumentTopicIds) {
    it(`${topicId} keeps its top-5 and its serialized shape`, () => {
      const topic = loadArgumentTopic(topicId);
      expect(topic).not.toBeNull();
      const graph = topic!.graph;
      const base = identifyCruxes(graph);

      expect(base.map((result) => result.claimId)).toEqual(EXPECTED_TOP_5[topicId]);
      expect(identifyCruxes(graph, { contestednessOverrides: {} })).toEqual(base);
      expect(JSON.stringify(base)).not.toContain("contestednessOverride");
    });
  }
});

describe("contestednessOverridesFrom", () => {
  it("withholds an override for a claim the probe could not see in the source", () => {
    const { overrides, absentClaimIds } = contestednessOverridesFrom({
      "c-1": { contested: 0.98, present: 0.95 },
      "c-2": { contested: 0.07, present: 0.9 },
      "c-3": { contested: 0.08, present: 0.12 },
      "c-4": { contested: 0.44 },
    });

    expect(overrides).toEqual({ "c-1": 0.98, "c-2": 0.07, "c-4": 0.44 });
    expect(absentClaimIds).toEqual(["c-3"]);
  });

  it("honours a custom presence floor and clamps values", () => {
    const { overrides, absentClaimIds } = contestednessOverridesFrom(
      { "c-1": { contested: 1.4, present: 0.4 }, "c-2": { contested: -0.2, present: 0.3 } },
      { presenceFloor: 0.35 },
    );

    expect(overrides).toEqual({ "c-1": 1 });
    expect(absentClaimIds).toEqual(["c-2"]);
  });
});

describe("overriddenContestedness", () => {
  it("multiplies the status weight by the probe value", () => {
    expect(overriddenContestedness(1, 0.07)).toBeCloseTo(0.07, 10);
    expect(overriddenContestedness(0.3, 0.9)).toBeCloseTo(0.27, 10);
    expect(overriddenContestedness(0, 0.98)).toBe(0);
  });
});

describe("jevProjectionGateEnabled", () => {
  it("defaults off and only accepts true/1", () => {
    expect(jevProjectionGateEnabled(undefined, {})).toBe(false);
    expect(jevProjectionGateEnabled(undefined, { [CRUX_PROJECTION_JEV_GATE_ENV]: "false" })).toBe(false);
    expect(jevProjectionGateEnabled(undefined, { [CRUX_PROJECTION_JEV_GATE_ENV]: "yes" })).toBe(false);
    expect(jevProjectionGateEnabled(undefined, { [CRUX_PROJECTION_JEV_GATE_ENV]: "TRUE" })).toBe(true);
    expect(jevProjectionGateEnabled(undefined, { [CRUX_PROJECTION_JEV_GATE_ENV]: "1" })).toBe(true);
  });

  it("lets an explicit value win over the environment", () => {
    expect(jevProjectionGateEnabled(false, { [CRUX_PROJECTION_JEV_GATE_ENV]: "true" })).toBe(false);
    expect(jevProjectionGateEnabled(true, {})).toBe(true);
  });
});
