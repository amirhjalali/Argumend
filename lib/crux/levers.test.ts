import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { baseNode } from "@/lib/argument/fixtures";
import { parseArgumentGraph } from "@/lib/schemas/argument";
import type { ArgumentGraph, Claim } from "@/types/argument";
import { CRUX_LEVERS_OFF, CRUX_LEVER_ENV_VARS, type CruxLeverFlags } from "./flags";
import { identifyCruxes } from "./rank";
import { computeCruxSignals } from "./signals";

const GROUND_TRUTH_PATH = "data/evals/crux-recall/flagship-propositions.json";

/**
 * Flags-off top-15 of each flagship draft, captured from
 * `tsx scripts/validate-crux-recall.ts` on 2026-09-15 before any lever existed.
 * Every lever defaults off, so this must never change unless the engine or a
 * draft changes on purpose.
 */
const FLAGS_OFF_SNAPSHOT: Record<string, string[]> = {
  "ai-mass-unemployment": [
    "c-firms-cut-hiring-not-output:0.782",
    "c-targeted-programs-can-help:0.770",
    "c-displaced-workers-can-retrain-costlessly:0.750",
    "c-mass-unemployment-definition-strict:0.664",
    "c-insider-forecasts-discounted:0.650",
    "c-reliability-is-the-threshold:0.645",
    "c-credential-pathway-narrows:0.565",
    "c-care-reallocation-counts-as-adjustment:0.478",
    "c-capability-plateau:0.460",
    "c-offshoring-rival-explanation:0.452",
    "c-no-remaining-comparative-advantage:0.447",
    "c-decline-caused-by-ai:0.446",
    "c-reinstatement-will-continue:0.445",
    "c-time-horizons-keep-doubling:0.362",
    "c-enterprise-diffusion-slow:0.362",
  ],
  "capitalism-after-ai": [
    "c-ai-ownership-stays-concentrated:0.828",
    "c-reallocation-keeps-pace:0.750",
    "c-survival-definition-contested:0.715",
    "c-demand-collapse-without-recycling:0.606",
    "c-wage-channel-loses-primacy:0.590",
    "c-ai-task-generality-breaks-analogy:0.498",
    "c-reinstatement-will-recur:0.486",
    "c-open-models-lower-entry-barriers:0.473",
    "c-ai-markets-tip-into-durable-oligopoly:0.470",
    "c-task-automation-lowers-labor-share:0.462",
    "c-capital-owners-recycle-demand:0.447",
    "c-automation-complements-labor-historically:0.441",
    "c-agi-transformative-claim-unverified:0.337",
    "c-data-ownership-boundaries-contested:0.322",
    "c-broad-labor-income-definition:0.276",
  ],
  "us-israel-support": [
    "c-regional-stability-depends-on-alliance:0.807",
    "c-gaza-death-toll-uncertain:0.770",
    "c-casualty-figures-mostly-combatants:0.614",
    "c-alliance-obligations-override-complicity:0.560",
    "c-aid-buys-leverage:0.556",
    "c-bomb-pause-no-durable-shift:0.534",
    "c-aid-hasnt-bought-compliance:0.529",
    "c-casualty-figures-mostly-civilian:0.508",
    "c-nsm20-evasion:0.484",
    "c-complicity-overrides-alliance:0.484",
    "c-nsm20-lawful-application:0.477",
    "c-aid-preserves-access:0.471",
    "c-entanglement-risk:0.438",
    "c-reduced-support-weakens-regional-camp:0.427",
    "c-conditioning-unlikely-to-durably-shift-policy:0.371",
  ],
};

function loadFlagshipGraphs(): Map<string, ArgumentGraph> {
  const truth = JSON.parse(readFileSync(GROUND_TRUTH_PATH, "utf8")) as {
    topics: Record<string, { draft: string }>;
  };
  const graphs = new Map<string, ArgumentGraph>();
  for (const [topicId, spec] of Object.entries(truth.topics)) {
    const parsed = parseArgumentGraph(JSON.parse(readFileSync(spec.draft, "utf8")));
    if (!parsed.ok) throw new Error(`${spec.draft}: schema parse failed`);
    graphs.set(topicId, parsed.graph);
  }
  return graphs;
}

function rankingOf(graph: ArgumentGraph, levers?: Partial<CruxLeverFlags>) {
  return identifyCruxes(graph, { limit: 15, levers }).map(
    (result) => `${result.claimId}:${result.score.toFixed(3)}`,
  );
}

function contestedClaim(id: string, statement: string): Claim {
  return {
    ...baseNode(id, "claim", statement),
    type: "claim",
    epistemicType: "empirical",
    status: "contested",
    statusBasis: "fixture",
    resolution: { kind: "existing-evidence", condition: "fixture" },
  };
}

function fillerClaim(id: string): Claim {
  return {
    ...baseNode(id, "claim", `Background fact ${id}`),
    type: "claim",
    epistemicType: "empirical",
    status: "uncontested",
    statusBasis: "fixture",
  };
}

/**
 * Two leaf claims that each support p1 and oppose p2 and reach no other
 * claim. Their affected sets are the same two positions, so the baseline
 * redundancy penalty is maximal; with positions excluded it is zero.
 * `fillerCount` background claims raise the reach normaliser (0.15 x claim
 * count) without joining the contest, so position-aware reach has room to lift.
 */
function twoLeafGraph(fillerCount = 0): ArgumentGraph {
  const question = { ...baseNode("q1", "question", "Should the route change?"), type: "question" as const };
  const position = (id: string, label: string) => ({
    ...baseNode(id, "position", label),
    type: "position" as const,
    label,
    constituency: "fixture",
    steelmanBasis: "fixture",
    displayRank: 1,
  });
  return {
    topicId: "levers",
    modelVersion: 2,
    question,
    nodes: [
      question,
      position("p1", "Change the route"),
      position("p2", "Keep the route"),
      contestedClaim("c1", "The detour is faster."),
      contestedClaim("c2", "The bridge is unsafe."),
      ...Array.from({ length: fillerCount }, (_, index) => fillerClaim(`f${index + 1}`)),
    ],
    edges: [
      { id: "c1-p1", from: "c1", to: "p1", type: "supports" },
      { id: "c1-p2", from: "c1", to: "p2", type: "opposes" },
      { id: "c2-p1", from: "c2", to: "p1", type: "supports" },
      { id: "c2-p2", from: "c2", to: "p2", type: "opposes" },
    ],
  };
}

const ENV_KEYS = Object.values(CRUX_LEVER_ENV_VARS);
const savedEnv = new Map<string, string | undefined>();

beforeAll(() => {
  for (const key of ENV_KEYS) {
    savedEnv.set(key, process.env[key]);
    Reflect.deleteProperty(process.env, key);
  }
});

afterAll(() => {
  for (const key of ENV_KEYS) {
    const value = savedEnv.get(key);
    if (value === undefined) Reflect.deleteProperty(process.env, key);
    else process.env[key] = value;
  }
});

describe("flags off (default) is byte-identical to the pre-lever engine", () => {
  const graphs = loadFlagshipGraphs();

  it("reproduces the flagship top-15 rankings and scores captured before the levers existed", () => {
    for (const [topicId, expected] of Object.entries(FLAGS_OFF_SNAPSHOT)) {
      const graph = graphs.get(topicId);
      expect(graph, topicId).toBeDefined();
      expect(rankingOf(graph!), topicId).toEqual(expected);
    }
  });

  it("returns the same full results whether levers are omitted or explicitly off", () => {
    for (const graph of graphs.values()) {
      expect(identifyCruxes(graph, { limit: 15 })).toEqual(
        identifyCruxes(graph, { limit: 15, levers: CRUX_LEVERS_OFF }),
      );
      expect(identifyCruxes(graph)).toEqual(identifyCruxes(graph, { levers: CRUX_LEVERS_OFF }));
    }
  });

  it("reads the environment, and lets an explicit off override it", () => {
    const graph = graphs.get("ai-mass-unemployment")!;
    process.env[CRUX_LEVER_ENV_VARS.redundancyClaimsOnly] = "true";
    try {
      expect(rankingOf(graph)).not.toEqual(FLAGS_OFF_SNAPSHOT["ai-mass-unemployment"]);
      expect(rankingOf(graph, CRUX_LEVERS_OFF)).toEqual(FLAGS_OFF_SNAPSHOT["ai-mass-unemployment"]);
    } finally {
      Reflect.deleteProperty(process.env, CRUX_LEVER_ENV_VARS.redundancyClaimsOnly);
    }
  });
});

describe("lever A: redundancy overlap over affected claims only", () => {
  it("stops two position-only leaf claims from penalising each other", () => {
    const graph = twoLeafGraph();
    const off = identifyCruxes(graph, { levers: CRUX_LEVERS_OFF });
    const on = identifyCruxes(graph, { levers: { redundancyClaimsOnly: true } });

    expect(off.map((result) => result.claimId)).toEqual(["c1", "c2"]);
    expect(on.map((result) => result.claimId)).toEqual(["c1", "c2"]);
    // Baseline: identical affected sets, overlap 1, so the second pays the full rho = 0.35.
    // Scores are rounded to three decimals, so the ratio is only good to two.
    expect(off[1]!.score / off[0]!.score).toBeCloseTo(0.65, 2);
    // Lever A: the claim-only sets are empty, so there is no overlap and no penalty.
    expect(on[1]!.score).toBe(on[0]!.score);
    expect(on[0]!.score).toBe(off[0]!.score);
  });

  it("exposes the claim-only set beside the full affected set without changing the latter", () => {
    const { signals } = computeCruxSignals(twoLeafGraph());
    const c1 = signals.find((signal) => signal.claim.id === "c1")!;
    expect([...c1.affectedSet].sort()).toEqual(["p1", "p2"]);
    expect(c1.affectedClaimSet.size).toBe(0);
  });
});

describe("lever B: position-aware reach", () => {
  it("lifts a leaf claim's reach to the position-delta average when that is larger", () => {
    const graph = twoLeafGraph(18);
    const off = identifyCruxes(graph, { levers: CRUX_LEVERS_OFF })[0]!;
    const on = identifyCruxes(graph, { levers: { positionAwareReach: true } })[0]!;
    const positionSum = off.affectedPositions.reduce((sum, target) => sum + Math.abs(target.delta), 0);

    // 20 claims: baseline normaliser is 3, so R = sum / 3; lever B offers sum / 2 positions.
    expect(off.directReach).toBeCloseTo(Math.min(1, positionSum / 3), 2);
    expect(on.directReach).toBeCloseTo(Math.max(off.directReach, Math.min(1, positionSum / 2)), 2);
    expect(on.directReach).toBeGreaterThan(off.directReach);
    expect(on.score).toBeGreaterThan(off.score);
  });

  it("never lowers any candidate's reach on the flagship graphs", () => {
    for (const graph of loadFlagshipGraphs().values()) {
      const limit = graph.nodes.length;
      const off = new Map(
        identifyCruxes(graph, { limit, levers: CRUX_LEVERS_OFF }).map((result) => [result.claimId, result]),
      );
      const on = identifyCruxes(graph, { limit, levers: { positionAwareReach: true } });
      for (const result of on) {
        const baseline = off.get(result.claimId);
        if (!baseline) continue;
        expect(result.reach).toBeGreaterThanOrEqual(baseline.reach);
        expect(result.directReach).toBeGreaterThanOrEqual(baseline.directReach);
      }
    }
  });
});
