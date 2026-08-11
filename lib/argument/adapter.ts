import type { ArgumentEdge, ArgumentGraph, ArgumentNode, Claim, Evidence, Source } from "@/types/argument";
import type { Crux, Evidence as LegacyEvidence, Pillar, Topic } from "@/lib/schemas/topic";

interface TopicMeta {
  metaClaim: string;
  balance: number;
  weight: number;
  verdictSource: "legacy";
}

export interface AdaptTopicToArgumentGraphResult {
  graph: ArgumentGraph;
  topicMeta: TopicMeta;
  reviewFlags: string[];
}

const ADAPTER_MODEL_ID = "adapter-v1";
const CREATED_AT = "2026-08-11T00:00:00.000Z";

export function adaptTopicToArgumentGraph(topic: Topic): AdaptTopicToArgumentGraphResult {
  const reviewFlags: string[] = [];
  const nodes: ArgumentNode[] = [];
  const edges: ArgumentEdge[] = [];

  const question = {
    ...baseNode("question", naiveQuestion(topic.meta_claim)),
    type: "question" as const,
  };
  nodes.push(question);
  reviewFlags.push("QUESTION requires editorial review after naive declarative-to-interrogative rewrite.");

  const skepticPosition = {
    ...baseNode("position-skeptic", "The AI 2027 scenario is too aggressive."),
    type: "position" as const,
    label: "Skeptic",
    constituency: "[REQUIRES REVIEW] synthesized from pillar structure",
    steelmanBasis: "[REQUIRES REVIEW] synthesized from pillar structure",
    displayRank: 1,
  };
  const proponentPosition = {
    ...baseNode("position-proponent", "The AI 2027 scenario identifies a real short-timeline risk."),
    type: "position" as const,
    label: "Proponent",
    constituency: "[REQUIRES REVIEW] synthesized from pillar structure",
    steelmanBasis: "[REQUIRES REVIEW] synthesized from pillar structure",
    displayRank: 2,
  };
  nodes.push(skepticPosition, proponentPosition);
  reviewFlags.push("Synthesized skeptic/proponent POSITION nodes require constituency review.");
  reviewFlags.push(
    "Evidence items were attached to BOTH pillar claims with opposite polarities (mirroring the legacy two-sided rendering); the challenging edges are inferred, not authored — review before relying on them."
  );

  const firstPillarClaimIds = new Map<"skeptic" | "proponent", string>();

  for (const pillar of topic.pillars) {
    const ids = addPillar(pillar, nodes, edges, reviewFlags);
    if (!firstPillarClaimIds.has("skeptic")) firstPillarClaimIds.set("skeptic", ids.skepticClaimId);
    if (!firstPillarClaimIds.has("proponent")) {
      firstPillarClaimIds.set("proponent", ids.proponentClaimId);
    }
  }

  for (const evidence of topic.evidence ?? []) {
    const skepticClaimId = firstPillarClaimIds.get("skeptic");
    const proponentClaimId = firstPillarClaimIds.get("proponent");

    if (skepticClaimId === undefined || proponentClaimId === undefined) {
      reviewFlags.push(`Topic-level evidence "${evidence.id}" could not be attached without claims.`);
      continue;
    }

    addLegacyEvidence(
      evidence,
      `topic-${evidence.id}`,
      "topic-level legacy evidence",
      { skepticClaimId, proponentClaimId },
      nodes,
      edges
    );
  }

  const graph: ArgumentGraph = {
    topicId: topic.id,
    modelVersion: 2,
    question,
    nodes,
    edges,
  };

  return {
    graph,
    topicMeta: {
      metaClaim: topic.meta_claim,
      balance: topic.balance,
      weight: topic.weight,
      verdictSource: "legacy",
    },
    reviewFlags,
  };
}

function addPillar(
  pillar: Pillar,
  nodes: ArgumentNode[],
  edges: ArgumentEdge[],
  reviewFlags: string[]
): { skepticClaimId: string; proponentClaimId: string } {
  const skepticClaimId = `claim-${slug(pillar.id)}-skeptic`;
  const proponentClaimId = `claim-${slug(pillar.id)}-proponent`;
  const cruxClaimId = `claim-${slug(pillar.id)}-crux-placeholder`;

  const skepticClaim = legacyClaim(skepticClaimId, pillar.skeptic_premise);
  const proponentClaim = legacyClaim(proponentClaimId, pillar.proponent_rebuttal);
  const cruxClaim = cruxPlaceholderClaim(cruxClaimId, pillar.crux);
  nodes.push(skepticClaim, proponentClaim, cruxClaim);

  edges.push(
    edge(`edge-${skepticClaimId}-supports-skeptic`, skepticClaimId, "position-skeptic", "supports"),
    edge(
      `edge-${proponentClaimId}-supports-proponent`,
      proponentClaimId,
      "position-proponent",
      "supports"
    ),
    edge(`edge-${skepticClaimId}-opposes-${proponentClaimId}`, skepticClaimId, proponentClaimId, "opposes"),
    edge(`edge-${proponentClaimId}-opposes-${skepticClaimId}`, proponentClaimId, skepticClaimId, "opposes"),
    edge(`edge-${cruxClaimId}-qualifies-${skepticClaimId}`, cruxClaimId, skepticClaimId, "qualifies"),
    edge(`edge-${cruxClaimId}-qualifies-${proponentClaimId}`, cruxClaimId, proponentClaimId, "qualifies")
  );

  reviewFlags.push(`Crux "${pillar.crux.id}" became a placeholder CLAIM requiring authoring.`);

  for (const evidenceItem of pillar.evidence ?? []) {
    addLegacyEvidence(
      evidenceItem,
      `${slug(pillar.id)}-${slug(evidenceItem.id)}`,
      `legacy evidence from pillar "${pillar.title}"`,
      { skepticClaimId, proponentClaimId },
      nodes,
      edges
    );
  }

  return { skepticClaimId, proponentClaimId };
}

function addLegacyEvidence(
  legacyEvidence: LegacyEvidence,
  idSuffix: string,
  sourceRef: string,
  targetIds: { skepticClaimId: string; proponentClaimId: string },
  nodes: ArgumentNode[],
  edges: ArgumentEdge[]
) {
  const evidenceId = `evidence-${idSuffix}`;
  const evidenceNode: Evidence = {
    ...baseNode(evidenceId, legacyEvidence.description),
    type: "evidence",
    finding: legacyEvidence.description,
    source: legacySource(legacyEvidence),
    relevance: legacyEvidence.reasoning ?? "migrated from legacy evidence attachment",
    status: "current",
    weight: {
      ...legacyEvidence.weight,
      weightBasis: "migrated from four-axis weights",
    },
  };
  evidenceNode.provenance.sourceRef = sourceRef;
  nodes.push(evidenceNode);

  if (legacyEvidence.side === "for") {
    edges.push(
      edge(
        `edge-${evidenceId}-evidences-${targetIds.proponentClaimId}`,
        evidenceId,
        targetIds.proponentClaimId,
        "evidences",
        "supporting"
      ),
      edge(
        `edge-${evidenceId}-evidences-${targetIds.skepticClaimId}`,
        evidenceId,
        targetIds.skepticClaimId,
        "evidences",
        "challenging"
      )
    );
  } else {
    edges.push(
      edge(
        `edge-${evidenceId}-evidences-${targetIds.skepticClaimId}`,
        evidenceId,
        targetIds.skepticClaimId,
        "evidences",
        "supporting"
      ),
      edge(
        `edge-${evidenceId}-evidences-${targetIds.proponentClaimId}`,
        evidenceId,
        targetIds.proponentClaimId,
        "evidences",
        "challenging"
      )
    );
  }
}

function legacyClaim(id: string, statement: string): Claim {
  return {
    ...baseNode(id, statement),
    type: "claim",
    epistemicType: "empirical",
    status: "contested",
    statusBasis: "migrated from legacy pillar text; editorial status not yet authored",
  };
}

function cruxPlaceholderClaim(id: string, crux: Crux): Claim {
  return {
    ...baseNode(id, `[REQUIRES AUTHORING] ${crux.title}`),
    type: "claim",
    epistemicType: "empirical",
    status: "unresolved",
    statusBasis: "legacy crux describes a test, not an authored proposition",
    resolution: {
      kind: resolutionKindForCrux(crux),
      condition: [crux.description, crux.methodology].join(" "),
    },
    cruxOverride: "pin",
    overrideBasis: crux.description,
  };
}

function resolutionKindForCrux(crux: Crux): NonNullable<Claim["resolution"]>["kind"] {
  if (crux.verification_status === "verified") return "existing-evidence";
  if (crux.verification_status === "theoretical") return "future-observable";
  return "value-difference";
}

function legacySource(legacyEvidence: LegacyEvidence): Source {
  const sourceText = legacyEvidence.source?.trim();

  return {
    title: sourceText ?? legacyEvidence.title,
    url: legacyEvidence.sourceUrl,
    institution: sourceText,
    kind: "other",
    verification: "unverified",
  };
}

function baseNode(id: string, statement: string) {
  return {
    id,
    statement,
    provenance: {
      origin: "extracted" as const,
      modelId: ADAPTER_MODEL_ID,
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
  return { id, from, to, type, polarity };
}

function naiveQuestion(metaClaim: string): string {
  return `Is it true that ${metaClaim.trim().replace(/[.?!]+$/, "")}?`;
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
