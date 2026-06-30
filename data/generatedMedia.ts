export type GeneratedMediaKind = "blog" | "guide" | "topic";

export interface GeneratedImageAsset {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly prompt: string;
}

export interface GeneratedMedia {
  readonly kind: GeneratedMediaKind;
  readonly id: string;
  readonly hero: GeneratedImageAsset;
}

const IMAGE_DIMENSIONS = {
  width: 1672,
  height: 941,
} as const;

const basePrompt =
  "Warm parchment-toned editorial watercolor illustration for Argumend, abstract argument-map composition, deep teal and muted rust accents, fine ink linework, subtle paper grain, no readable text, no logos, no public figures, no sensational imagery.";

export const generatedMedia = [
  {
    kind: "guide",
    id: "how-to-read-an-argument-map",
    hero: {
      src: "/images/generated/guides/how-to-read-an-argument-map/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Abstract argument map with evidence paths and a central claim node.",
      prompt: `${basePrompt} Central claim node, three evidence paths, crux marker, and balanced supporting and opposing nodes.`,
    },
  },
  {
    kind: "guide",
    id: "evidence-hierarchy",
    hero: {
      src: "/images/generated/guides/evidence-hierarchy/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Evidence hierarchy pyramid with source cards and balance motifs.",
      prompt: `${basePrompt} Evidence pyramid made from source cards, balance scale, source markers, and reliability tiers.`,
    },
  },
  {
    kind: "guide",
    id: "triangulation",
    hero: {
      src: "/images/generated/guides/triangulation/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Three independent evidence paths converging on one verified point.",
      prompt: `${basePrompt} Three independent source paths converging on a verified point, triangulation and compass motifs.`,
    },
  },
  {
    kind: "blog",
    id: "did-covid-come-from-a-lab",
    hero: {
      src: "/images/generated/blog/did-covid-come-from-a-lab/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two unresolved evidence trails around a locked archive.",
      prompt: `${basePrompt} Two evidence trails, market symbol and lab-notebook symbol, locked missing-data archive, no literal virus, no real people or places.`,
    },
  },
  {
    kind: "blog",
    id: "could-ai-be-conscious",
    hero: {
      src: "/images/generated/blog/could-ai-be-conscious/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Abstract cognition signals branching around an uncertain awareness node.",
      prompt: `${basePrompt} Layered cognition signals, central uncertain awareness node, neuroscience, behavior, and philosophy evidence paths, calibrated confidence markers.`,
    },
  },
  {
    kind: "blog",
    id: "is-fluoride-in-water-safe",
    hero: {
      src: "/images/generated/blog/is-fluoride-in-water-safe/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Water safety margin diagram with dental and dose threshold symbols.",
      prompt: `${basePrompt} Measured safety-margin diagram with water droplet motifs, dental enamel symbol, dose threshold bands, evidence cards, and benefit-risk balance.`,
    },
  },
  {
    kind: "blog",
    id: "are-gmos-safe",
    hero: {
      src: "/images/generated/blog/are-gmos-safe/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Food safety evidence map with crop, genome, and policy branches.",
      prompt: `${basePrompt} Crop leaves, genome fragments, food safety evidence cards, verified eating-safety node, and separate branches for environmental and policy questions.`,
    },
  },
  {
    kind: "blog",
    id: "are-vaccine-mandates-justified",
    hero: {
      src: "/images/generated/blog/are-vaccine-mandates-justified/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Policy decision map balancing disease, trust, liberty, and protection nodes.",
      prompt: `${basePrompt} Branching policy decision map with disease severity, transmission protection, public trust, liberty cost, abstract shield, and community network motifs.`,
    },
  },
  {
    kind: "blog",
    id: "fact-or-value",
    hero: {
      src: "/images/generated/blog/fact-or-value/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Fact and value threads separating and recombining around a clarified crux.",
      prompt: `${basePrompt} Two intertwined threads separating into fact-evidence cards and value-compass symbols, then recombining around a clarified crux.`,
    },
  },
  {
    kind: "blog",
    id: "what-would-change-your-mind",
    hero: {
      src: "/images/generated/blog/what-would-change-your-mind/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Belief path passing through a crux gate toward updated evidence.",
      prompt: `${basePrompt} Belief marker connected to evidence paths shifting through a crux gate, falsifiability and updating motifs.`,
    },
  },
  {
    kind: "blog",
    id: "why-steel-manning-makes-you-smarter",
    hero: {
      src: "/images/generated/blog/why-steel-manning-makes-you-smarter/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A fragile argument structure rebuilt into a stronger supported frame.",
      prompt: `${basePrompt} Fragile straw outline transforming into a reinforced argument structure, opposing evidence cards strengthened before evaluation, bridge and scaffold motifs.`,
    },
  },
  {
    kind: "blog",
    id: "5-logical-fallacies-in-online-debates",
    hero: {
      src: "/images/generated/blog/5-logical-fallacies-in-online-debates/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Five distorted reasoning paths around a central argument map.",
      prompt: `${basePrompt} Five distorted reasoning paths marked by false fork, personal attack target, slippery slope curve, circular loop, and weak analogy bridge.`,
    },
  },
  {
    kind: "blog",
    id: "how-confidence-scores-change-thinking",
    hero: {
      src: "/images/generated/blog/how-confidence-scores-change-thinking/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Confidence gauge and evidence paths updating a belief marker.",
      prompt: `${basePrompt} Calibrated probability markers, confidence gauge, evidence cards shifting a belief marker from uncertainty toward a quantified range, Bayesian update arcs.`,
    },
  },
  {
    kind: "blog",
    id: "nuclear-energy-what-both-sides-get-right",
    hero: {
      src: "/images/generated/blog/nuclear-energy-what-both-sides-get-right/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Balanced nuclear energy debate map with benefit and risk paths.",
      prompt: `${basePrompt} Balanced energy debate map with reactor-core symbol, grid lines, climate benefit path, waste and safety risk path, and central crux node.`,
    },
  },
  {
    kind: "blog",
    id: "argue-against-your-own-beliefs",
    hero: {
      src: "/images/generated/blog/argue-against-your-own-beliefs/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Belief marker turned toward its own counter-evidence in a mirrored map.",
      prompt: `${basePrompt} Belief marker turning toward its own counter-evidence, mirror-like evidence map, disconfirming source cards, and intellectual humility compass.`,
    },
  },
  {
    kind: "blog",
    id: "what-is-a-crux-and-why-it-matters",
    hero: {
      src: "/images/generated/blog/what-is-a-crux-and-why-it-matters/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Central crux node holding up two opposing argument structures.",
      prompt: `${basePrompt} Central load-bearing crux node holding up two opposing argument structures, branching evidence paths, hinge and keystone motifs.`,
    },
  },
  {
    kind: "blog",
    id: "dunning-kruger-in-political-debates",
    hero: {
      src: "/images/generated/blog/dunning-kruger-in-political-debates/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Confidence curve with a false peak and a calibrated plateau.",
      prompt: `${basePrompt} Confidence mountain with a high false peak and a lower calibrated plateau, evidence markers correcting overconfidence, abstract disagreement paths.`,
    },
  },
  {
    kind: "topic",
    id: "ai-risk",
    hero: {
      src: "/images/generated/topics/ai-risk/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Branching future paths from a central AI capability node.",
      prompt: `${basePrompt} Branching future paths from a central capability node, safety constraints and uncertain crimson crux aperture, no robots.`,
    },
  },
  {
    kind: "topic",
    id: "climate-change",
    hero: {
      src: "/images/generated/topics/climate-change/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Climate evidence streams converging into a temperature trend.",
      prompt: `${basePrompt} Evidence paths converging on a temperature-trend signal, atmosphere and ice-core motifs, no disaster scene.`,
    },
  },
  {
    kind: "topic",
    id: "moon-landing",
    hero: {
      src: "/images/generated/topics/moon-landing/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Lunar evidence trails converging on a verified node.",
      prompt: `${basePrompt} Retroreflector beam, lunar trace, telemetry archive, orbital photograph card converging to a verified node, no flag dominance.`,
    },
  },
] as const satisfies readonly GeneratedMedia[];

const mediaByKey = new Map(
  generatedMedia.map((item) => [`${item.kind}:${item.id}`, item]),
);

export function getGeneratedMedia(
  kind: GeneratedMediaKind,
  id: string,
): GeneratedMedia | undefined {
  return mediaByKey.get(`${kind}:${id}`);
}

export function absoluteMediaUrl(src: string): string {
  return src.startsWith("http") ? src : `https://argumend.org${src}`;
}
