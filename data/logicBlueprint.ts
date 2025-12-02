import { BlueprintNode } from "@/types/graph";
import { Topic } from "@/types/logic";
import { moonLanding } from "./topics";

export function generateBlueprint(topic: Topic): Record<string, BlueprintNode> {
  const rootId = "root";

  // Custom logic for Moon Landing to match the requested "Screenshot" style with questions
  const isMoonLanding = topic.id === 'moon-landing';

  const rootChildren = [];

  // 1. Add "Logic Map" nodes (Questions/Inquiries) to the RIGHT
  if (isMoonLanding) {
    rootChildren.push(
      { id: "q1", slot: "right" as const },
      { id: "q2", slot: "right" as const },
      { id: "q3", slot: "right" as const }
    );
  } else {
    // Default generic structure
    rootChildren.push(
      { id: "root-skeptic", slot: "right" as const },
      { id: "root-proponent", slot: "right" as const }
    );
  }

  // 2. Add Pillars vertically BELOW (Center slot)
  topic.pillars.forEach(p => {
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
      imageUrl: isMoonLanding ? "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=60" : undefined,
      references: isMoonLanding ? [
        { title: "NASA Mission Report (Apollo 11)", url: "https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html" },
        { title: "LRO Imagery Verification", url: "https://www.nasa.gov/mission_pages/LRO/main/index.html" }
      ] : [],
      children: rootChildren,
    },
  };

  // Add the Logic Map Nodes (Questions)
  if (isMoonLanding) {
    blueprint["q1"] = {
      id: "q1",
      variant: "question",
      title: "Where is the physical evidence?",
      subtitle: "Inquiry",
      content: "What specific physical traces remain on the lunar surface that can be verified from Earth today?",
      imageUrl: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=800&q=60",
      references: [
        { title: "Laser Ranging Retroreflector Experiment", url: "https://en.wikipedia.org/wiki/Lunar_Laser_Ranging_experiment" }
      ],
      children: []
    };
    blueprint["q2"] = {
      id: "q2",
      variant: "question",
      title: "How was radiation handled?",
      subtitle: "Inquiry",
      content: "How did the astronauts survive the lethal Van Allen radiation belts without heavy shielding?",
      imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=60",
      children: []
    };
    blueprint["q3"] = {
      id: "q3",
      variant: "question",
      title: "Why haven't we returned?",
      subtitle: "Inquiry",
      content: "If the technology existed in 1969, what economic or political factors have prevented a return mission?",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=60",
      children: []
    };
  } else {
    // Default nodes
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

    blueprint[pillar.id] = {
      id: pillar.id,
      variant: "pillar",
      title: pillar.title,
      subtitle: "Foundational Pillar",
      content: pillar.short_summary,
      imageUrl: pillar.image_url,
      children: [
        // Pillars can have their own logic too, but let's keep it simple: Crux below
        { id: cruxId, slot: "center" }
      ],
    };

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
  });

  return blueprint;
}

export const logicBlueprint = generateBlueprint(moonLanding);
