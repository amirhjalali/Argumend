import type {
  ArgumentEdge,
  ArgumentGraph,
  ArgumentNode,
  Claim,
  Evidence,
  Position,
  Question,
} from "@/types/argument";
import type {
  ExtractedArgument,
  ExtractedArguments,
  ExtractedPosition,
  IdentifiedCrux,
} from "./extractor";

export interface ExtractedToArgumentGraphOptions {
  topicId: string;
}

export interface ExtractedToArgumentGraphResult {
  graph: ArgumentGraph;
  reviewFlags: string[];
}

const ADAPTER_MODEL_ID = "analyze-adapter-v1";
const CREATED_AT = "2026-08-11T00:00:00.000Z";
const STATUS_BASIS = "extracted from single adversarial source; uncorroborated";
const ATTRIBUTION_VERB_PATTERN =
  /\b(finds?|found|reports?|reported|estimates?|estimated|says?|said|puts?|according to|shows?|showed)\b/i;

interface ClaimRef {
  id: string;
  side: ExtractedPosition["side"];
  strengthScore: number;
  sequence: number;
}

export function extractedToArgumentGraph(
  extracted: ExtractedArguments,
  opts: ExtractedToArgumentGraphOptions
): ExtractedToArgumentGraphResult {
  const reviewFlags: string[] = [];
  const nodes: ArgumentNode[] = [];
  const edges: ArgumentEdge[] = [];
  const claimRefs: ClaimRef[] = [];

  const question = questionNode(extracted.topic);
  nodes.push(question);
  reviewFlags.push("QUESTION requires review after adapter interrogative rewrite.");

  const positions = mappablePositions(extracted.positions, reviewFlags);

  if (positions.length < 2) {
    reviewFlags.push(
      "Extracted positions were not mapped because validator-compliant position discrimination requires at least two argued sides; no counterposition was fabricated."
    );
  } else {
    for (const position of positions) {
      addPosition(position, extracted.topic, nodes, reviewFlags);
    }

    let claimSequence = 0;
    for (const position of positions) {
      for (const [argumentIndex, argument] of position.arguments.entries()) {
        const claimId = claimIdFor(position, argument, argumentIndex);
        if (claimWouldFailValidator(argument.claim)) {
          reviewFlags.push(
            `CLAIM "${claimId}" omitted because its statement appears to contain a validator-blocked source attribution.`
          );
          continue;
        }

        const claim = claimNode(claimId, argument.claim);
        nodes.push(claim);
        claimRefs.push({
          id: claim.id,
          side: position.side,
          strengthScore: argument.strengthScore ?? 0,
          sequence: claimSequence,
        });
        claimSequence += 1;

        reviewFlags.push(`CLAIM "${claim.id}" epistemicType defaulted to empirical.`);
        if (containsSourceAttributionPattern(argument.claim)) {
          reviewFlags.push(
            `CLAIM "${claim.id}" may contain source attribution and requires review.`
          );
        }

        edges.push(
          edge(
            edgeIdFor(claim.id, "supports", positionIdFor(position.side)),
            claim.id,
            positionIdFor(position.side),
            "supports"
          )
        );

        for (const otherPosition of positions) {
          if (otherPosition.side === position.side) continue;
          edges.push(
            edge(
              edgeIdFor(claim.id, "opposes", positionIdFor(otherPosition.side)),
              claim.id,
              positionIdFor(otherPosition.side),
              "opposes"
            )
          );
        }

        addEvidenceNodes(argument, claim.id, argumentIndex, nodes, edges);
      }
    }

    const mappedClaimSides = new Set(claimRefs.map((claim) => claim.side));
    if (claimRefs.length === 0 || mappedClaimSides.size < 2) {
      reviewFlags.push(
        "Mapped claims did not cover two opposing sides after validation checks; partial position structure was omitted rather than inventing support."
      );
      removeAllButQuestion(nodes, edges, question);
    } else {
      addCruxClaims(extracted.identifiedCruxes, strongestClaimId(claimRefs), nodes, edges, reviewFlags);
    }
  }

  addAnnotationFlags(extracted, reviewFlags);

  const graph: ArgumentGraph = {
    topicId: opts.topicId,
    modelVersion: 2,
    question,
    nodes,
    edges,
  };

  return { graph, reviewFlags };
}

function addPosition(
  position: ExtractedPosition,
  topic: string,
  nodes: ArgumentNode[],
  reviewFlags: string[]
) {
  const sideLabel = position.side === "for" ? "For" : "Against";
  const id = positionIdFor(position.side);
  const constituency = position.speaker?.trim() || "[REQUIRES REVIEW]";

  if (!position.speaker?.trim()) {
    reviewFlags.push(`POSITION "${id}" constituency requires review.`);
  }
  reviewFlags.push(`POSITION "${id}" steelmanBasis requires review.`);

  const node: Position = {
    ...baseNode(id, `${sideLabel} ${topic.trim().replace(/[.?!]+$/, "")}`),
    type: "position",
    label: sideLabel,
    constituency,
    steelmanBasis: "[REQUIRES REVIEW] extracted, not steel-manned",
    displayRank: position.side === "for" ? 1 : 2,
  };
  nodes.push(node);
}

function addEvidenceNodes(
  argument: ExtractedArgument,
  claimId: string,
  argumentIndex: number,
  nodes: ArgumentNode[],
  edges: ArgumentEdge[]
) {
  for (const [evidenceIndex, finding] of (argument.evidence ?? []).entries()) {
    const evidenceId = stableId("evidence", `${claimId}:${argumentIndex}:${evidenceIndex}:${finding}`);
    const evidenceNode: Evidence = {
      ...baseNode(evidenceId, finding),
      type: "evidence",
      finding,
      source: {
        title: argument.source?.trim() || "Unattributed",
        kind: "other",
        verification: "unverified",
      },
      relevance: "offered in source material for the parent claim",
    };
    nodes.push(evidenceNode);
    edges.push(
      edge(
        edgeIdFor(evidenceId, "evidences", claimId),
        evidenceId,
        claimId,
        "evidences",
        "supporting"
      )
    );
  }
}

function addCruxClaims(
  cruxes: IdentifiedCrux[],
  targetClaimId: string,
  nodes: ArgumentNode[],
  edges: ArgumentEdge[],
  reviewFlags: string[]
) {
  for (const [index, crux] of cruxes.entries()) {
    const claimId = stableId("claim-crux", `${index}:${crux.description}`);
    if (claimWouldFailValidator(crux.description)) {
      reviewFlags.push(
        `CRUX "${claimId}" omitted because its statement appears to contain a validator-blocked source attribution.`
      );
      continue;
    }

    const claim: Claim = {
      ...baseNode(claimId, crux.description),
      type: "claim",
      epistemicType: "empirical",
      status: "unresolved",
      statusBasis: crux.significance || "extracted crux candidate",
      cruxOverride: "pin",
      overrideBasis: "extracted crux candidate",
    };
    nodes.push(claim);
    edges.push(
      edge(edgeIdFor(claimId, "qualifies", targetClaimId), claimId, targetClaimId, "qualifies")
    );
    reviewFlags.push(`CLAIM "${claimId}" epistemicType defaulted to empirical.`);
    reviewFlags.push(`CRUX "${claimId}" linkage requires review.`);
  }
}

function addAnnotationFlags(extracted: ExtractedArguments, reviewFlags: string[]) {
  for (const fallacy of extracted.potentialFallacies) {
    reviewFlags.push(
      `Potential fallacy carried for review, not mapped as a node: ${fallacy.type} - ${fallacy.explanation}`
    );
  }

  for (const bias of extracted.detectedBiases) {
    reviewFlags.push(
      `Detected bias carried for review, not mapped as a node: ${bias.type} - ${bias.explanation}`
    );
  }
}

function questionNode(topic: string): Question {
  return {
    ...baseNode("question", rewriteQuestion(topic)),
    type: "question",
  };
}

function claimNode(id: string, statement: string): Claim {
  return {
    ...baseNode(id, statement),
    type: "claim",
    epistemicType: "empirical",
    status: "contested",
    statusBasis: STATUS_BASIS,
  };
}

function baseNode(id: string, statement: string) {
  return {
    id,
    statement: statement.trim(),
    provenance: {
      origin: "extracted" as const,
      modelId: ADAPTER_MODEL_ID,
      sourceRef: "analyze session",
    },
    createdAt: CREATED_AT,
    modelVersion: 2 as const,
  };
}

function edge(
  id: string,
  from: string,
  to: string,
  type: ArgumentEdge["type"],
  polarity?: ArgumentEdge["polarity"]
): ArgumentEdge {
  return polarity === undefined ? { id, from, to, type } : { id, from, to, type, polarity };
}

function rewriteQuestion(topic: string): string {
  const trimmed = topic.trim().replace(/\s+/g, " ");
  const withoutTerminal = trimmed.replace(/[.?!]+$/, "");

  if (/^(is|are|was|were|do|does|did|can|could|should|would|will|may|might|must|has|have|had)\b/i.test(trimmed)) {
    return `${withoutTerminal}?`;
  }

  const whether = withoutTerminal.match(/^whether\s+(.+)$/i);
  if (whether?.[1]) {
    return `Is it true that ${lowercaseFirst(whether[1])}?`;
  }

  const debate = withoutTerminal.match(/^(?:debate|argument|discussion)\s+(?:over|about|on)\s+(.+)$/i);
  if (debate?.[1]) {
    return `Is it true that ${lowercaseFirst(debate[1])}?`;
  }

  return `Is it true that ${lowercaseFirst(withoutTerminal)}?`;
}

function lowercaseFirst(value: string): string {
  return value.length === 0 ? value : `${value[0]?.toLowerCase() ?? ""}${value.slice(1)}`;
}

function mappablePositions(
  positions: ExtractedPosition[],
  reviewFlags: string[]
): ExtractedPosition[] {
  const bySide = new Map<ExtractedPosition["side"], ExtractedPosition>();

  for (const position of positions) {
    if (bySide.has(position.side)) {
      reviewFlags.push(`Duplicate "${position.side}" POSITION extraction ignored.`);
      continue;
    }
    if (position.arguments.length === 0) {
      reviewFlags.push(`POSITION "${position.side}" ignored because it has no arguments.`);
      continue;
    }
    bySide.set(position.side, position);
  }

  return (["for", "against"] as const)
    .map((side) => bySide.get(side))
    .filter((position): position is ExtractedPosition => position !== undefined);
}

function strongestClaimId(claimRefs: ClaimRef[]): string {
  return [...claimRefs].sort((a, b) => {
    if (b.strengthScore !== a.strengthScore) return b.strengthScore - a.strengthScore;
    return a.sequence - b.sequence;
  })[0]?.id ?? claimRefs[0]?.id ?? "";
}

function positionIdFor(side: ExtractedPosition["side"]): string {
  return `position-${side}`;
}

function claimIdFor(
  position: ExtractedPosition,
  argument: ExtractedArgument,
  argumentIndex: number
): string {
  return stableId(`claim-${position.side}-${argumentIndex + 1}`, argument.claim);
}

function edgeIdFor(from: string, type: ArgumentEdge["type"], to: string): string {
  return `edge-${from}-${type}-${to}`;
}

function stableId(prefix: string, value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 44);
  const suffix = hashString(value);
  return slug.length > 0 ? `${prefix}-${slug}-${suffix}` : `${prefix}-${suffix}`;
}

function hashString(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function containsSourceAttributionPattern(statement: string): boolean {
  return ATTRIBUTION_VERB_PATTERN.test(statement) || /\bet al\./i.test(statement);
}

function claimWouldFailValidator(statement: string): boolean {
  return /\bet al\./i.test(statement);
}

function removeAllButQuestion(nodes: ArgumentNode[], edges: ArgumentEdge[], question: Question) {
  nodes.length = 0;
  nodes.push(question);
  edges.length = 0;
}
