import { describe, expect, it } from "vitest";
import type { ArgumentGraph } from "@/types/argument";
import { ArgumentGraphSchema, ClaimSchema } from "@/lib/schemas/argument";
import { baseNode, claim, workedExampleGraph } from "./fixtures";
import { validateArgumentGraph } from "./validate";

function cloneGraph(graph = workedExampleGraph()): ArgumentGraph {
  return JSON.parse(JSON.stringify(graph)) as ArgumentGraph;
}

function errorRules(graph: ArgumentGraph): string[] {
  return validateArgumentGraph(graph)
    .filter((issue) => issue.severity === "error")
    .map((issue) => issue.rule);
}

function warningRules(graph: ArgumentGraph): string[] {
  return validateArgumentGraph(graph)
    .filter((issue) => issue.severity === "warning")
    .map((issue) => issue.rule);
}

describe("validateArgumentGraph", () => {
  it("accepts the v1.1 worked-example graph with zero errors", () => {
    const errors = validateArgumentGraph(workedExampleGraph()).filter(
      (issue) => issue.severity === "error"
    );
    expect(errors).toEqual([]);
  });

  it("rejects invalid role node types", () => {
    const graph = cloneGraph();
    graph.nodes.push({ ...baseNode("bad", "claim", "Invalid role"), type: "objection" } as never);
    expect(ArgumentGraphSchema.safeParse(graph).success).toBe(false);
  });

  it("rejects undercuts targeting a CLAIM", () => {
    const graph = cloneGraph();
    graph.edges.push({ id: "edge-bad-undercut", from: "c5", to: "c1", type: "undercuts" });
    expect(errorRules(graph)).toContain("edge-matrix");
  });

  it("flags conjunction-heavy claims", () => {
    const graph = cloneGraph();
    const c1 = graph.nodes.find((node) => node.id === "c1");
    if (c1 !== undefined) c1.statement = "AI is displacing juniors and firms are lying about it";
    expect(warningRules(graph)).toContain("claim-atomicity-conjunction");
  });

  it("rejects source attributions inside claims", () => {
    const graph = cloneGraph();
    const c1 = graph.nodes.find((node) => node.id === "c1");
    if (c1 !== undefined) c1.statement = "Stanford finds a 16% relative decline";
    expect(errorRules(graph)).toContain("claim-no-source-attribution");
  });

  it("rejects confidence without basis", () => {
    const parsed = ClaimSchema.safeParse({ ...claim("bad", "A claim"), confidence: { value: 0.7 } });
    expect(parsed.success).toBe(false);
  });

  it("rejects an INFERENCE with two conclusions", () => {
    const graph = cloneGraph();
    graph.edges.push({ id: "edge-i1-c3", from: "i1", to: "c3", type: "concludes" });
    expect(errorRules(graph)).toContain("inference-shape");
  });

  it("rejects loaded QUESTION framing", () => {
    const graph = cloneGraph();
    graph.question.statement = "Why does the corpus ignore workers?";
    const q1 = graph.nodes.find((node) => node.id === "q1");
    if (q1 !== undefined) q1.statement = graph.question.statement;
    expect(errorRules(graph)).toContain("question-not-loaded");
  });

  it("rejects stored crux node types", () => {
    const graph = cloneGraph();
    graph.nodes.push({ ...baseNode("x1", "claim", "Computed crux"), type: "crux" } as never);
    expect(ArgumentGraphSchema.safeParse(graph).success).toBe(false);
  });

  it("rejects support/dependence double-counting pairs", () => {
    const graph = cloneGraph();
    graph.edges.push({ id: "edge-c4-c2", from: "c4", to: "c2", type: "supports" });
    expect(errorRules(graph)).toContain("forbidden-support-dependence-pair");
  });

  it("flags restated warrants", () => {
    const graph = cloneGraph();
    const i1 = graph.nodes.find((node) => node.id === "i1");
    if (i1?.type === "inference") {
      i1.warrant =
        "Early-career workers in AI-exposed occupations have suffered a relative employment decline since 2022 That decline is caused by AI adoption rather than the tech cycle or offshoring";
    }
    expect(warningRules(graph)).toContain("warrant-adequacy");
  });

  it("enforces edge endpoints, evidence anchors, cycles, and contradicts ordering", () => {
    const missing = cloneGraph();
    missing.edges.push({ id: "edge-missing", from: "missing", to: "c1", type: "supports" });
    expect(errorRules(missing)).toContain("edge-endpoints-exist");

    const orphanEvidence = cloneGraph();
    orphanEvidence.edges = orphanEvidence.edges.filter((edge) => edge.from !== "e3");
    expect(errorRules(orphanEvidence)).toContain("evidence-has-anchor");

    const cyclic = cloneGraph();
    cyclic.edges.push({ id: "edge-c4-c1", from: "c4", to: "c1", type: "depends_on" });
    expect(errorRules(cyclic)).toContain("acyclic-reasoning");

    const contradicts = cloneGraph();
    contradicts.edges.push({ id: "edge-z-a", from: "c2", to: "c1", type: "contradicts" });
    expect(errorRules(contradicts)).toContain("contradicts-lexicographic");
  });

  it("enforces position connectivity and discrimination", () => {
    const disconnected = cloneGraph();
    disconnected.nodes.push(claim("orphan", "This claim is disconnected"));
    expect(errorRules(disconnected)).toContain("position-component-connectivity");

    const noSupport = cloneGraph();
    noSupport.edges = noSupport.edges.filter(
      (edge) => edge.to !== "p2" && !(edge.from === "p2" && edge.type === "depends_on")
    );
    expect(errorRules(noSupport)).toContain("position-has-supporting-chain");

    const identical = cloneGraph();
    identical.edges.push({ id: "edge-c5-p1", from: "c5", to: "p1", type: "supports" });
    identical.edges = identical.edges.filter((edge) => edge.id !== "edge-p1-c2");
    expect(errorRules(identical)).toContain("position-supporting-sets-differ");
  });

  it("spot-checks the edge matrix", () => {
    const illegal = cloneGraph();
    illegal.edges.push({ id: "edge-e1-p1", from: "e1", to: "p1", type: "supports" });
    expect(errorRules(illegal)).toContain("edge-matrix");

    const evidenceUndercutsInference = cloneGraph();
    evidenceUndercutsInference.edges.push({
      id: "edge-e2-i1",
      from: "e2",
      to: "i1",
      type: "undercuts",
    });
    expect(errorRules(evidenceUndercutsInference)).not.toContain("edge-matrix");

    const claimLimitsEvidence = cloneGraph();
    claimLimitsEvidence.edges.push({
      id: "edge-c6-e1",
      from: "c6",
      to: "e1",
      type: "limits_scope",
    });
    expect(errorRules(claimLimitsEvidence)).not.toContain("edge-matrix");
  });
});
