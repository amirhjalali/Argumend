import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseArgumentGraph } from "@/lib/schemas/argument";
import {
  RANK_LIMIT,
  SCORED_WINDOW,
  describeMiss,
  evaluateNamedTest,
  fractionalRanks,
  loadGroundTruth,
  parseLeverArgs,
  scoreGraph,
  spearman,
  spearmanReport,
  type Proposition,
} from "./validate-crux-recall";

function proposition(id: string, claimIds: string[]): Proposition {
  return { id, statement: id, epistemicType: "empirical", claimIds, mapping: "authored", provenance: "" };
}

describe("fractionalRanks", () => {
  it("ranks distinct values 1..n", () => {
    expect(fractionalRanks([30, 10, 20])).toEqual([3, 1, 2]);
  });

  it("averages tied ranks", () => {
    expect(fractionalRanks([10, 10, 20])).toEqual([1.5, 1.5, 3]);
    expect(fractionalRanks([5, 1, 5, 5])).toEqual([3, 1, 3, 3]);
  });
});

describe("spearman", () => {
  it("is 1 for identical orderings and -1 for reversed ones", () => {
    expect(spearman([1, 2, 3, 4], [10, 20, 30, 40])).toBeCloseTo(1, 10);
    expect(spearman([1, 2, 3, 4], [40, 30, 20, 10])).toBeCloseTo(-1, 10);
  });

  it("matches the classic closed form when there are no ties", () => {
    // rho = 1 - 6*sum(d^2)/(n(n^2-1)); d = [0, -1, 1, -1, 1] -> sum 4 -> 1 - 24/120 = 0.8
    expect(spearman([1, 2, 3, 4, 5], [1, 3, 2, 5, 4])).toBeCloseTo(0.8, 10);
    // d = [0, 1, -1, 2, -2] -> sum 10 -> 1 - 60/120 = 0.5
    expect(spearman([1, 2, 3, 4, 5], [1, 4, 2, 5, 3])).toBeCloseTo(0.5, 10);
  });

  it("handles ties by average rank", () => {
    // ranks a = [1,2,3], ranks b = [1.5,1.5,3] -> rho = 0.866...
    expect(spearman([1, 2, 3], [7, 7, 9])).toBeCloseTo(Math.sqrt(3) / 2, 10);
  });

  it("is undefined for constant or too-short rankings", () => {
    expect(spearman([1, 2, 3], [4, 4, 4])).toBeNull();
    expect(spearman([1], [1])).toBeNull();
    expect(() => spearman([1, 2], [1])).toThrow();
  });
});

describe("spearmanReport", () => {
  const ranked = ["c-a", "c-b", "c-c", "c-d"];

  it("uses list order as the human rank and best mapped claim as the engine rank", () => {
    const report = spearmanReport(
      [proposition("p1", ["c-d", "c-b"]), proposition("p2", ["c-a"]), proposition("p3", ["c-c"])],
      ranked,
    );
    expect(report.n).toBe(3);
    expect(report.pairs).toEqual([
      { id: "p1", humanRank: 1, engineRank: 2 },
      { id: "p2", humanRank: 2, engineRank: 1 },
      { id: "p3", humanRank: 3, engineRank: 3 },
    ]);
    expect(report.rho).toBeCloseTo(0.5, 10);
  });

  it("skips unmapped propositions but keeps their list position", () => {
    const report = spearmanReport(
      [proposition("p1", []), proposition("p2", ["c-a"]), proposition("p3", ["c-b"])],
      ranked,
    );
    expect(report.pairs.map((pair) => pair.humanRank)).toEqual([2, 3]);
    expect(report.n).toBe(2);
  });

  it("places never-ranked propositions in a shared last slot", () => {
    const report = spearmanReport(
      [proposition("p1", ["c-a"]), proposition("p2", ["c-zzz"]), proposition("p3", ["c-yyy"])],
      ranked,
    );
    expect(report.pairs.map((pair) => pair.engineRank)).toEqual([1, 5, 5]);
  });
});

describe("evaluateNamedTest", () => {
  const ranked = ["c-1", "c-2", "c-3", "c-4", "c-5", "c-6"];

  it("supports the single-claim form", () => {
    expect(evaluateNamedTest({ id: "t", description: "", claimId: "c-5", withinTopK: 5 }, ranked))
      .toMatchObject({ pass: true, claims: [{ claimId: "c-5", rank: 5 }] });
    expect(evaluateNamedTest({ id: "t", description: "", claimId: "c-6", withinTopK: 5 }, ranked).pass)
      .toBe(false);
  });

  it("requires every claim of the multi-claim form to be within the cutoff", () => {
    const both = { id: "t", description: "", claimIds: ["c-2", "c-4"], withinTopK: 5 };
    expect(evaluateNamedTest(both, ranked).pass).toBe(true);
    const oneOut = { id: "t", description: "", claimIds: ["c-2", "c-6"], withinTopK: 5 };
    const result = evaluateNamedTest(oneOut, ranked);
    expect(result.pass).toBe(false);
    expect(result.claims.map((claim) => claim.rank)).toEqual([2, 6]);
  });

  it("treats withinTopK -1 as 'ranked at all' and fails unranked claims", () => {
    expect(evaluateNamedTest({ id: "t", description: "", claimId: "c-6", withinTopK: -1 }, ranked).pass)
      .toBe(true);
    expect(evaluateNamedTest({ id: "t", description: "", claimId: "c-x", withinTopK: -1 }, ranked).pass)
      .toBe(false);
    expect(evaluateNamedTest({ id: "t", description: "", withinTopK: -1 }, ranked).pass).toBe(false);
  });
});

describe("describeMiss", () => {
  it("names the scored window and reports each claim's actual rank", () => {
    const text = describeMiss(
      {
        id: "p",
        claims: [
          { claimId: "c-near", rank: 12, unboundedRank: 13 },
          { claimId: "c-far", rank: 0, unboundedRank: 21 },
          { claimId: "c-never", rank: 0, unboundedRank: 0 },
        ],
      },
      25,
    );
    expect(text).toContain(`scored top-${SCORED_WINDOW}`);
    expect(text).toContain(`c-near at rank 12 of the top-${RANK_LIMIT}`);
    expect(text).toContain(`c-far outside the top-${RANK_LIMIT} (rank 21 of 25 in the unbounded ranking)`);
    expect(text).toContain("c-never never ranked");
    expect(text).not.toContain("in top-15");
  });
});

describe("ground truth file", () => {
  const truth = loadGroundTruth();

  it("keeps the pre-registered primary targets", () => {
    expect(truth.primaryRecallTargets).toEqual({ recallAt5: 0.6, recallAt10: 0.8 });
  });

  it("encodes all four named tests from CRUX_ENGINE.md on the AI-jobs map", () => {
    const ids = truth.topics["ai-mass-unemployment"]!.namedTests.map((test) => test.id);
    expect(ids).toEqual([
      "named-1-causal-and-definitional-top5",
      "named-2-normative-survives",
      "named-3-offshoring-top10",
      "named-4-implicit-assumption-ranked",
    ]);
  });

  it("only references claim ids that exist in each draft graph", () => {
    for (const spec of Object.values(truth.topics)) {
      const parsed = parseArgumentGraph(JSON.parse(readFileSync(spec.draft, "utf8")));
      expect(parsed.ok).toBe(true);
      if (!parsed.ok) continue;
      const claimIds = new Set(
        parsed.graph.nodes.filter((node) => node.type === "claim").map((node) => node.id),
      );
      for (const proposition of spec.propositions) {
        for (const id of proposition.claimIds) expect(claimIds.has(id), id).toBe(true);
      }
      for (const test of spec.namedTests) {
        for (const id of test.claimIds ?? [test.claimId!]) expect(claimIds.has(id), id).toBe(true);
      }
    }
  });

  it("scores every named test on the real AI-jobs graph without throwing", () => {
    const spec = truth.topics["ai-mass-unemployment"]!;
    const parsed = parseArgumentGraph(JSON.parse(readFileSync(spec.draft, "utf8")));
    if (!parsed.ok) throw new Error("parse failed");
    const outcome = scoreGraph("ai-mass-unemployment", spec, parsed.graph);
    expect(outcome.rankedIds.length).toBeLessThanOrEqual(RANK_LIMIT);
    expect(outcome.unboundedRankedIds.length).toBeGreaterThanOrEqual(outcome.rankedIds.length);
    expect(outcome.namedTestResults).toHaveLength(4);
    const namedOne = outcome.namedTestResults[0]!;
    expect(namedOne.claims.map((claim) => claim.claimId)).toEqual([
      "c-decline-caused-by-ai",
      "c-mass-unemployment-definition-strict",
    ]);
    expect(outcome.spearman.n).toBe(4);
  });
});

describe("parseLeverArgs", () => {
  it("returns undefined without the flag so the levers follow the environment", () => {
    expect(parseLeverArgs([])).toBeUndefined();
    expect(parseLeverArgs(["--other"])).toBeUndefined();
  });

  it("turns named levers on and unnamed ones off", () => {
    expect(parseLeverArgs(["--levers", "a"])).toEqual({ redundancyClaimsOnly: true, positionAwareReach: false });
    expect(parseLeverArgs(["--levers", "b"])).toEqual({ redundancyClaimsOnly: false, positionAwareReach: true });
    expect(parseLeverArgs(["--levers", "a,b"])).toEqual({ redundancyClaimsOnly: true, positionAwareReach: true });
    expect(parseLeverArgs(["--levers", " B , A "])).toEqual({ redundancyClaimsOnly: true, positionAwareReach: true });
  });

  it("pins both off for off/none/empty and rejects unknown names", () => {
    const off = { redundancyClaimsOnly: false, positionAwareReach: false };
    expect(parseLeverArgs(["--levers", "off"])).toEqual(off);
    expect(parseLeverArgs(["--levers", "none"])).toEqual(off);
    expect(parseLeverArgs(["--levers"])).toEqual(off);
    expect(() => parseLeverArgs(["--levers", "c"])).toThrow(/unknown lever/);
  });
});
