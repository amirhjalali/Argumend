import { BlueprintNode } from "@/types/graph";
import { Topic, Evidence } from "@/types/logic";
import { calculateEvidenceScore } from "@/lib/schemas/topic";
import { moonLanding } from "./topics";

export function generateBlueprint(topic: Topic): Record<string, BlueprintNode> {
  const rootId = "root";
  const hasQuestions = topic.questions && topic.questions.length > 0;

  const rootChildren = [];

  // 1. Add "Logic Map" nodes (Questions/Inquiries) to the RIGHT
  if (hasQuestions) {
    topic.questions!.forEach((q) => {
      rootChildren.push({ id: q.id, slot: "right" as const });
    });
  } else {
    // Default generic structure for topics without custom questions
    rootChildren.push(
      { id: "root-skeptic", slot: "right" as const },
      { id: "root-proponent", slot: "right" as const }
    );
  }

  // 2. Add Pillars vertically BELOW (Center slot)
  topic.pillars.forEach((p) => {
    rootChildren.push({ id: p.id, slot: "center" as const });
  });

  const blueprint: Record<string, BlueprintNode> = {
    [rootId]: {
      id: rootId,
      variant: "meta",
      title: topic.title,
      subtitle: "Meta Claim",
      content: topic.meta_claim,
      score: topic.confidence_score,
      imageUrl: topic.imageUrl,
      references: topic.references ?? [],
      children: rootChildren,
    },
  };

  // Add the Logic Map Nodes (Questions)
  if (hasQuestions) {
    topic.questions!.forEach((q) => {
      blueprint[q.id] = {
        id: q.id,
        variant: "question",
        title: q.title,
        subtitle: "Inquiry",
        content: q.content,
        imageUrl: q.imageUrl,
        references: q.references,
        children: [],
      };
    });
  } else {
    // Default nodes for topics without custom questions
    blueprint["root-skeptic"] = {
      id: "root-skeptic",
      variant: "skeptic",
      title: "Skeptic Thesis",
      subtitle: "Meta Doubt",
      content: "Arguments challenging the core premise.",
      children: [],
    };
    blueprint["root-proponent"] = {
      id: "root-proponent",
      variant: "proponent",
      title: "Proponent Thesis",
      subtitle: "Meta Support",
      content: "Arguments supporting the core premise.",
      children: [],
    };
  }

  // Generate nodes for each pillar (Vertical Stack)
  topic.pillars.forEach((pillar) => {
    const cruxId = `crux-${pillar.crux.id}`;
    const skepticId = `skeptic-${pillar.id}`;
    const proponentId = `proponent-${pillar.id}`;
    const hasEvidence = pillar.evidence && pillar.evidence.length > 0;

    // Build pillar children: skeptic (left), crux (center), proponent (right)
    const pillarChildren = [
      { id: skepticId, slot: "left" as const },
      { id: cruxId, slot: "center" as const },
      { id: proponentId, slot: "right" as const },
    ];

    blueprint[pillar.id] = {
      id: pillar.id,
      variant: "pillar",
      title: pillar.title,
      subtitle: "Foundational Pillar",
      content: pillar.short_summary,
      imageUrl: pillar.image_url,
      hasEvidence, // Flag for UI to show "Show Evidence" button
      children: pillarChildren,
    };

    // Skeptic node (opposing view)
    blueprint[skepticId] = {
      id: skepticId,
      variant: "skeptic",
      title: "Skeptic Position",
      subtitle: "Opposition View",
      content: pillar.skeptic_premise,
      children: [],
    };

    // Proponent node (supporting view)
    blueprint[proponentId] = {
      id: proponentId,
      variant: "proponent",
      title: "Proponent Rebuttal",
      subtitle: "Supporting View",
      content: pillar.proponent_rebuttal,
      children: [],
    };

    // Crux node
    blueprint[cruxId] = {
      id: cruxId,
      variant: "crux",
      title: pillar.crux.title,
      subtitle: "Verification Crux",
      content: pillar.crux.description,
      detail: {
        description: pillar.crux.description,
        methodology: pillar.crux.methodology,
        equation: pillar.crux.equation,
        status: pillar.crux.verification_status,
        cost: pillar.crux.cost_to_verify,
      },
      children: [],
    };

    // Add evidence nodes if present (children of pillar for lazy loading)
    if (hasEvidence) {
      pillar.evidence!.forEach((ev) => {
        const evidenceId = `evidence-${ev.id}`;
        blueprint[evidenceId] = {
          id: evidenceId,
          variant: "evidence",
          title: ev.title,
          content: ev.description,
          subtitle: ev.side === "for" ? "Supporting Evidence" : "Opposing Evidence",
          evidenceData: {
            side: ev.side,
            score: calculateEvidenceScore(ev.weight),
            source: ev.source,
            sourceUrl: ev.sourceUrl,
          },
          children: [],
        };
      });
    }
  });

  return blueprint;
}

/**
 * Get evidence node IDs for a given pillar from a topic.
 * Used for lazy loading evidence nodes.
 */
export function getEvidenceIdsForPillar(topic: Topic, pillarId: string): string[] {
  const pillar = topic.pillars.find((p) => p.id === pillarId);
  if (!pillar || !pillar.evidence) return [];
  return pillar.evidence.map((ev) => `evidence-${ev.id}`);
}

export const logicBlueprint = generateBlueprint(moonLanding);
