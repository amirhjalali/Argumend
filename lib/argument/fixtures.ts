import type { ArgumentGraph, ArgumentNode } from "@/types/argument";

export const createdAt = "2026-08-11T00:00:00.000Z";
export const provenance = { origin: "curator" as const };

export function baseNode(id: string, type: ArgumentNode["type"], statement: string) {
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

export function claim(
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

export function evidence(id: string, finding: string, institution: string) {
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
