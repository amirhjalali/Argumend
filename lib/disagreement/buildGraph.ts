import type {
  ArgumentEdge,
  ArgumentGraph,
  ArgumentNode,
  Claim,
  EdgeType,
  Position,
  Question,
} from "@/types/argument";
import { validateArgumentGraph } from "@/lib/argument/validate";
import { parseArgumentGraph } from "@/lib/schemas/argument";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";

const CREATED_AT = "2026-08-18T00:00:00.000Z";

function questionNode(statement: string): Question {
  const trimmed = statement.trim();
  const withMark = trimmed.endsWith("?") ? trimmed : `${trimmed}?`;
  return {
    id: "q-main",
    type: "question",
    statement: withMark,
    provenance: { origin: "extracted" },
    createdAt: CREATED_AT,
    modelVersion: 2,
  };
}

function toEpistemicType(
  value: RawDisagreementExtractionV1["claims"][number]["epistemicType"],
): Claim["epistemicType"] {
  return value;
}

export function buildArgumentGraph(
  extraction: RawDisagreementExtractionV1,
  topicId = "disagreement-session",
): { graph: ArgumentGraph; warnings: string[]; valid: boolean } {
  const warnings: string[] = [];
  const question = questionNode(extraction.mainQuestion || "What is the disagreement?");
  const nodes: ArgumentNode[] = [question];
  const edges: ArgumentEdge[] = [];
  let edgeIndex = 0;

  const addEdge = (from: string, to: string, type: EdgeType) => {
    edgeIndex += 1;
    edges.push({
      id: `e-${edgeIndex}`,
      from,
      to,
      type,
    });
  };

  const canBuildPositions = extraction.positions.length >= 2;
  if (!canBuildPositions) {
    warnings.push("Graph omitted positions because a valid multi-position structure was not available.");
    const graph: ArgumentGraph = {
      topicId,
      modelVersion: 2,
      question,
      nodes,
      edges,
    };
    const parsed = parseArgumentGraph(graph);
    return {
      graph: parsed.ok ? parsed.graph : graph,
      warnings,
      valid: parsed.ok && validateArgumentGraph(graph).every((issue) => issue.severity !== "error"),
    };
  }

  extraction.positions.forEach((position, index) => {
    const node: Position = {
      id: position.id,
      type: "position",
      statement: position.thesis,
      label: position.label,
      constituency: position.participantIds.join(", ") || "unspecified",
      steelmanBasis: position.steelman,
      displayRank: index + 1,
      provenance: { origin: "extracted" },
      createdAt: CREATED_AT,
      modelVersion: 2,
    };
    nodes.push(node);
  });

  for (const claim of extraction.claims) {
    const node: Claim = {
      id: claim.id,
      type: "claim",
      statement: claim.statement,
      epistemicType: toEpistemicType(claim.epistemicType),
      status: claim.disputedByParticipantIds.length > 0 ? "contested" : "unresolved",
      statusBasis: "extracted from submitted source; uncorroborated",
      implicit: claim.explicitness === "inferred",
      attributedTo: claim.participantIds,
      resolution: claim.resolution,
      provenance: { origin: "extracted" },
      createdAt: CREATED_AT,
      modelVersion: 2,
    };
    nodes.push(node);

    for (const stance of claim.stanceByPosition) {
      addEdge(claim.id, stance.positionId, stance.relation);
    }
  }

  const claimIds = new Set(extraction.claims.map((claim) => claim.id));
  for (const relation of extraction.claimRelations) {
    if (!claimIds.has(relation.fromClaimId) || !claimIds.has(relation.toClaimId)) continue;
    if (relation.type === "undercuts") {
      warnings.push("Dropped undercuts edge because V1 does not mint inference nodes.");
      continue;
    }
    addEdge(relation.fromClaimId, relation.toClaimId, relation.type);
  }

  const graph: ArgumentGraph = {
    topicId,
    modelVersion: 2,
    question,
    nodes,
    edges,
  };

  const parsed = parseArgumentGraph(graph);
  const issues = parsed.ok ? validateArgumentGraph(parsed.graph) : [];
  const errors = parsed.ok
    ? issues.filter((issue) => issue.severity === "error")
    : [{ message: parsed.ok ? "" : parsed.errors.join("; ") }];

  if (errors.length > 0) {
    // Naming the failure keeps this diagnosable. A silent fallback degrades a
    // substantive report to "insufficient context" with nothing to act on.
    const reasons = errors
      .map((issue) => issue.message)
      .filter(Boolean)
      .slice(0, 3)
      .join("; ");
    warnings.push(
      `ArgumentGraph failed validation; falling back to a question-only graph${reasons ? ` (${reasons})` : ""}.`,
    );
    const fallback: ArgumentGraph = {
      topicId,
      modelVersion: 2,
      question,
      nodes: [question],
      edges: [],
    };
    return { graph: fallback, warnings, valid: false };
  }

  return { graph: parsed.ok ? parsed.graph : graph, warnings, valid: true };
}
