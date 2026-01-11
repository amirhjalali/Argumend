import { BlueprintNode } from "@/types/graph";
import { Topic } from "@/types/logic";
import { moonLanding } from "./topics";

// Topic-specific configurations for images, references, and questions
const topicConfigs: Record<string, {
  imageUrl: string;
  references: Array<{ title: string; url: string }>;
  questions: Array<{ id: string; title: string; content: string; imageUrl?: string; references?: Array<{ title: string; url: string }> }>;
}> = {
  'moon-landing': {
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=60',
    references: [
      { title: "NASA Mission Report (Apollo 11)", url: "https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html" },
      { title: "LRO Imagery Verification", url: "https://www.nasa.gov/mission_pages/LRO/main/index.html" }
    ],
    questions: [
      { id: "q1", title: "Where is the physical evidence?", content: "What specific physical traces remain on the lunar surface that can be verified from Earth today?", imageUrl: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=800&q=60", references: [{ title: "Laser Ranging Retroreflector Experiment", url: "https://en.wikipedia.org/wiki/Lunar_Laser_Ranging_experiment" }] },
      { id: "q2", title: "How was radiation handled?", content: "How did the astronauts survive the lethal Van Allen radiation belts without heavy shielding?", imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=60" },
      { id: "q3", title: "Why haven't we returned?", content: "If the technology existed in 1969, what economic or political factors have prevented a return mission?", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=60" }
    ]
  },
  'simulation-hypothesis': {
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=60',
    references: [
      { title: "Bostrom's Original Paper (2003)", url: "https://www.simulation-argument.com/simulation.html" },
      { title: "OpenWorm Project", url: "https://openworm.org/" },
      { title: "Pierre Auger Observatory", url: "https://www.auger.org/" }
    ],
    questions: [
      { id: "q1", title: "Can consciousness be computed?", content: "Is subjective experience substrate-independent, or does it require specific biological physics that cannot be digitally replicated?", imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=60", references: [{ title: "OpenWorm Project", url: "https://openworm.org/" }] },
      { id: "q2", title: "Why would they simulate us?", content: "What motivations would a post-human civilization have for running detailed ancestor simulations rather than pursuing other goals?", imageUrl: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=800&q=60" },
      { id: "q3", title: "Can we detect the simulation?", content: "Are there empirical tests that could reveal computational artifacts in the fabric of reality, such as lattice spacing or rendering optimizations?", imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=60" }
    ]
  },
  'ai-risk': {
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=60',
    references: [
      { title: "Superintelligence (Bostrom)", url: "https://en.wikipedia.org/wiki/Superintelligence:_Paths,_Dangers,_Strategies" },
      { title: "AI Alignment Forum", url: "https://www.alignmentforum.org/" }
    ],
    questions: [
      { id: "q1", title: "Will AGI pursue human values?", content: "Can we ensure that a superintelligent system's goals remain aligned with human flourishing, or is misalignment inevitable?", imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=60" },
      { id: "q2", title: "Can we control a superintelligence?", content: "Once an AI surpasses human intelligence, what mechanisms could keep it under human control or oversight?", imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=60" },
      { id: "q3", title: "How soon could AGI emerge?", content: "What are the most credible timelines for achieving artificial general intelligence, and how do they affect our preparation window?", imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=60" }
    ]
  },
  'free-will': {
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=60',
    references: [
      { title: "Libet's Original Experiment (1983)", url: "https://en.wikipedia.org/wiki/Benjamin_Libet#Libet's_experiment" },
      { title: "Stanford Encyclopedia: Free Will", url: "https://plato.stanford.edu/entries/freewill/" },
      { title: "Sam Harris: Free Will (2012)", url: "https://www.samharris.org/books/free-will" }
    ],
    questions: [
      { id: "q1", title: "Is our sense of agency an illusion?", content: "When we feel we 'choose' an action, is that feeling causally effective or merely a byproduct of unconscious neural processes?", imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=60", references: [{ title: "The Illusion of Conscious Will (Wegner)", url: "https://en.wikipedia.org/wiki/The_Illusion_of_Conscious_Will" }] },
      { id: "q2", title: "Does determinism undermine responsibility?", content: "If our choices are the inevitable result of prior causes, can we meaningfully hold people accountable for their actions?", imageUrl: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=800&q=60" },
      { id: "q3", title: "What would 'genuine' choice require?", content: "For free will to be 'real,' what conditions must be met? Could any physical system satisfy those conditions?", imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=60" }
    ]
  }
};

export function generateBlueprint(topic: Topic): Record<string, BlueprintNode> {
  const rootId = "root";
  const config = topicConfigs[topic.id];
  const hasQuestions = config && config.questions.length > 0;

  const rootChildren = [];

  // 1. Add "Logic Map" nodes (Questions/Inquiries) to the RIGHT
  if (hasQuestions) {
    config.questions.forEach(q => {
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
      imageUrl: config?.imageUrl,
      references: config?.references ?? [],
      children: rootChildren,
    },
  };

  // Add the Logic Map Nodes (Questions)
  if (hasQuestions) {
    config.questions.forEach(q => {
      blueprint[q.id] = {
        id: q.id,
        variant: "question",
        title: q.title,
        subtitle: "Inquiry",
        content: q.content,
        imageUrl: q.imageUrl,
        references: q.references,
        children: []
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
