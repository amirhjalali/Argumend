import { describe, expect, it } from "vitest";
import type { ArgumentGraph, ArgumentNode } from "@/types/argument";
import { ArgumentGraphSchema, ClaimSchema } from "@/lib/schemas/argument";
import { validateArgumentGraph } from "./validate";

const createdAt = "2026-08-11T00:00:00.000Z";
const provenance = { origin: "curator" as const };

function baseNode(id: string, type: ArgumentNode["type"], statement: string) {
  return { id, type, statement, provenance, createdAt, modelVersion: 2 as const };
}

export function workedExampleGraph(): ArgumentGraph {
  const q1 = {
    ...baseNode("q1", "question", "Will AI cause mass unemployment in the U.S. within 15 years?"),
    type: "question" as const,
  };

  return {
    topicId: "ai-jobs",
    modelVersion: 2,
    question: q1,
    nodes: [
      q1,
      {
        ...baseNode("p1", "position", "Displacement-now"),
        type: "position" as const,
        label: "Displacement-now",
        constituency: "AI labor displacement pessimists",
        steelmanBasis: "Stanford/ADP plus Census QWI cell declines",
        displayRank: 1,
      },
      {
        ...baseNode("p2", "position", "Automation-panic redux"),
        type: "position" as const,
        label: "Automation-panic redux",
        constituency: "Historical base-rate skeptics",
        steelmanBasis: "250-year base rate plus confound evidence",
        displayRank: 2,
      },
      claim("c1", "Early-career workers in AI-exposed occupations have suffered a relative employment decline since 2022"),
      claim("c2", "That decline is caused by AI adoption rather than the tech cycle or offshoring"),
      claim("c3", "'Mass unemployment' means sustained U-3 above 10%", "definitional"),
      claim(
        "c4",
        "Firms respond to AI capability primarily by reducing hiring rather than expanding output",
        "empirical",
        true
      ),
      claim("c5", "Nearly half the tech-postings decline predates ChatGPT", "empirical", false, "broadly_accepted"),
      {
        ...baseNode(
          "i1",
          "inference",
          "Given exposed-occupation declines, it follows that AI caused the decline"
        ),
        type: "inference" as const,
        warrant:
          "occupation-level relative declines concentrated in exposed cells, robust to firm-time controls, license causal attribution",
        warrantImplicit: false,
        warrantKind: "causal-identification" as const,
      },
      evidence("e1", "Stanford/ADP reports a 16% relative decline", "Stanford/ADP"),
      evidence(
        "e2",
        "Indeed Hiring Lab reports about half of postings decline pre-ChatGPT",
        "Indeed Hiring Lab"
      ),
      evidence(
        "e3",
        "Klarna press release says its assistant did the equivalent work of 700 agents",
        "Klarna"
      ),
      claim(
        "c6",
        "Klarna's 700-agents figure measures workload equivalence, not eliminated positions",
        "empirical",
        false,
        "broadly_accepted"
      ),
    ],
    edges: [
      { id: "edge-e1-c1", from: "e1", to: "c1", type: "evidences", polarity: "supporting" },
      { id: "edge-c1-i1", from: "c1", to: "i1", type: "premise_of" },
      { id: "edge-i1-c2", from: "i1", to: "c2", type: "concludes" },
      { id: "edge-p1-c2", from: "p1", to: "c2", type: "depends_on" },
      { id: "edge-c5-i1", from: "c5", to: "i1", type: "undercuts" },
      { id: "edge-c5-p2", from: "c5", to: "p2", type: "supports" },
      { id: "edge-e2-c5", from: "e2", to: "c5", type: "evidences", polarity: "supporting" },
      { id: "edge-c2-c4", from: "c2", to: "c4", type: "depends_on" },
      { id: "edge-c3-c2", from: "c3", to: "c2", type: "qualifies" },
      { id: "edge-c6-e3", from: "c6", to: "e3", type: "limits_scope" },
      { id: "edge-e3-c2", from: "e3", to: "c2", type: "evidences", polarity: "qualifying" },
    ],
  };
}

function claim(
  id: string,
  statement: string,
  epistemicType: "empirical" | "definitional" = "empirical",
  implicit = false,
  status: "contested" | "broadly_accepted" = "contested"
) {
  return {
    ...baseNode(id, "claim", statement),
    type: "claim" as const,
    epistemicType,
    status,
    statusBasis: "worked example status basis",
    implicit: implicit || undefined,
  };
}

function evidence(id: string, finding: string, institution: string) {
  return {
    ...baseNode(id, "evidence", finding),
    type: "evidence" as const,
    finding,
    source: {
      title: institution,
      institution,
      kind: "institutional" as const,
      verification: "verified-live" as const,
    },
    relevance: "It bears directly on the attached claim.",
    status: "current" as const,
  };
}

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
