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

  // The ArgumentGraph validator requires every POSITION to carry both a
  // supporting claim chain and an opposing claim. A model that extracts four
  // faithful positions but wires claims to only three of them would otherwise
  // lose the ENTIRE graph — and with it every crux — while a thinner
  // two-position extraction succeeds. Richer output must not be punished, so an
  // under-wired position is left out of the graph rather than taken as grounds
  // to discard the rest. The report still presents every extracted position;
  // only the graph, which is an assertion about argumentative structure,
  // declines to include what the source did not support.
  const positionWiring = new Map<string, { supports: number; opposes: number }>();
  for (const position of extraction.positions) {
    positionWiring.set(position.id, { supports: 0, opposes: 0 });
  }
  for (const claim of extraction.claims) {
    for (const stance of claim.stanceByPosition) {
      const wiring = positionWiring.get(stance.positionId);
      if (!wiring) continue;
      if (stance.relation === "supports") wiring.supports += 1;
      else wiring.opposes += 1;
    }
  }
  const keptPositions = extraction.positions.filter((position) => {
    const wiring = positionWiring.get(position.id);
    return Boolean(wiring && wiring.supports > 0 && wiring.opposes > 0);
  });
  const keptPositionIds = new Set(keptPositions.map((position) => position.id));
  const droppedCount = extraction.positions.length - keptPositions.length;
  if (droppedCount > 0 && keptPositions.length >= 2) {
    warnings.push(
      `Graph omitted ${droppedCount} position(s) that the source did not both support and contest; the report still lists them.`,
    );
  }

  const canBuildPositions = keptPositions.length >= 2;
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

  keptPositions.forEach((position, index) => {
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
      if (!keptPositionIds.has(stance.positionId)) continue;
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
