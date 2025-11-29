import { BlueprintNode } from "@/types/graph";
import { Topic } from "@/types/logic";

export function generateBlueprint(topic: Topic): Record<string, BlueprintNode> {
  const rootId = "root";
  
  const blueprint: Record<string, BlueprintNode> = {
    [rootId]: {
      id: rootId,
      variant: "meta",
      title: topic.title,
      subtitle: "Meta Claim",
      content: topic.meta_claim,
      score: topic.confidence_score,
      children: [
        { id: "root-skeptic", slot: "left" },
        { id: "root-proponent", slot: "right" },
        // Map pillars to center slots - currently simplified to first pillar for center
        // In a real multi-pillar layout, we'd map them all
        ...topic.pillars.map((p, i) => ({ 
          id: p.id, 
          slot: "center" as const 
        }))
      ],
    },
    "root-skeptic": {
      id: "root-skeptic",
      variant: "skeptic",
      title: "Skeptic Thesis",
      subtitle: "Meta Doubt",
      content: "Arguments challenging the core premise.",
      children: [],
    },
    "root-proponent": {
      id: "root-proponent",
      variant: "proponent",
      title: "Proponent Thesis",
      subtitle: "Meta Support",
      content: "Arguments supporting the core premise.",
      children: [],
    },
  };

  // Generate nodes for each pillar
  topic.pillars.forEach((pillar) => {
    const cruxId = `crux-${pillar.crux.id}`;
    
    blueprint[pillar.id] = {
      id: pillar.id,
      variant: "pillar",
      title: pillar.title,
      subtitle: "Pillar Node",
      content: pillar.short_summary,
      children: [
        { id: `${pillar.id}-skeptic`, slot: "left" },
        { id: `${pillar.id}-proponent`, slot: "right" },
        { id: cruxId, slot: "center" },
      ],
    };

    blueprint[`${pillar.id}-skeptic`] = {
      id: `${pillar.id}-skeptic`,
      variant: "skeptic",
      title: "Skeptic Premise",
      subtitle: pillar.title,
      content: pillar.skeptic_premise,
      children: [],
    };

    blueprint[`${pillar.id}-proponent`] = {
      id: `${pillar.id}-proponent`,
      variant: "proponent",
      title: "Proponent Rebuttal",
      subtitle: pillar.title,
      content: pillar.proponent_rebuttal,
      children: [],
    };

    blueprint[cruxId] = {
      id: cruxId,
      variant: "crux",
      title: pillar.crux.title,
      subtitle: pillar.title,
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
  });

  return blueprint;
}

// Keep the old export for backward compatibility if needed, or just initial state
import { moonLanding } from "./topics";
export const logicBlueprint = generateBlueprint(moonLanding);


