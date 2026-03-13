import type { Topic } from "@/lib/schemas/topic";

// ============================================================================
// Question Variation Type
// ============================================================================

export interface QuestionVariation {
  /** URL-safe slug, e.g. "is-nuclear-energy-safe" */
  slug: string;
  /** Full question text for the H1, e.g. "Is nuclear energy safe?" */
  question: string;
  /** Short description for meta tags */
  metaDescription: string;
  /** The topic ID this question maps to */
  topicId: string;
}

// ============================================================================
// Per-Topic Question Definitions
// ============================================================================

/**
 * Hand-crafted question variations for each topic. Each entry maps a topic ID
 * to 1-3 question-format strings that real people search for. The first
 * question is treated as the "primary" variation.
 */
const TOPIC_QUESTIONS: Record<string, string[]> = {
  "nuclear-energy-safety": [
    "Is nuclear energy safe?",
    "Should we build more nuclear power plants?",
    "Is nuclear power good for the environment?",
  ],
  "universal-healthcare": [
    "Should the US have universal healthcare?",
    "Is universal healthcare better than private insurance?",
    "Does universal healthcare save money?",
  ],
  "gun-control-effectiveness": [
    "Does gun control reduce violence?",
    "Do stricter gun laws work?",
    "Should the US have more gun control?",
  ],
  "minimum-wage-effects": [
    "Does raising the minimum wage cause job losses?",
    "Should the minimum wage be raised?",
    "Is a $15 minimum wage a good idea?",
  ],
  "drug-decriminalization": [
    "Should drugs be decriminalized?",
    "Does drug decriminalization reduce addiction?",
    "Is drug decriminalization safer than prohibition?",
  ],
  "death-penalty-deterrence": [
    "Does the death penalty deter crime?",
    "Should the death penalty be abolished?",
    "Is capital punishment morally justified?",
  ],
  "police-reform": [
    "Does police reform reduce crime?",
    "Should we defund the police?",
    "Is policing reform effective?",
  ],
  "mandatory-voting": [
    "Should voting be mandatory?",
    "Does mandatory voting improve democracy?",
    "Is compulsory voting a good idea?",
  ],
  "reparations-slavery": [
    "Should the US pay reparations for slavery?",
    "Are reparations for slavery justified?",
    "Would reparations reduce racial inequality?",
  ],
  "immigration-wage-impact": [
    "Does immigration lower wages?",
    "Is immigration good for the economy?",
    "Do immigrants take jobs from citizens?",
  ],
  "open-borders": [
    "Should borders be open?",
    "Is open borders a good policy?",
    "Would open borders help the economy?",
  ],
  "universal-basic-income": [
    "Does universal basic income work?",
    "Should the government give everyone a basic income?",
    "Is UBI better than welfare?",
  ],
  "wealth-tax": [
    "Should billionaires pay a wealth tax?",
    "Does a wealth tax reduce inequality?",
    "Is a wealth tax effective?",
  ],
  "standardized-testing-debate": [
    "Are standardized tests fair?",
    "Should schools eliminate standardized testing?",
    "Do standardized tests measure intelligence?",
  ],
  "electoral-college-reform": [
    "Should the electoral college be abolished?",
    "Is the electoral college fair?",
    "Does the electoral college serve its purpose?",
  ],
  "surveillance-public-safety": [
    "Does surveillance make us safer?",
    "Is government surveillance justified?",
    "Should we accept surveillance for security?",
  ],
  "us-iran-conflict": [
    "Is US policy toward Iran effective?",
    "Should the US negotiate with Iran?",
    "Has US-Iran confrontation made the Middle East safer?",
  ],
  "epstein-files": [
    "What do the Epstein files reveal?",
    "Was the Epstein case properly investigated?",
    "Did institutions cover up the Epstein case?",
  ],

  // --- Technology & Society ---
  "social-media-age-limits": [
    "Should social media have age limits?",
    "Is social media harmful for children?",
    "Should kids be banned from social media?",
  ],
  "social-media-mental-health": [
    "Does social media cause depression?",
    "Is social media bad for mental health?",
    "Does social media harm teenagers?",
  ],
  "ai-risk": [
    "Is artificial intelligence dangerous?",
    "Could AI destroy humanity?",
    "Should we worry about AGI?",
  ],
  "ai-content-labeling": [
    "Should AI-generated content be labeled?",
    "Is mandatory AI labeling a good idea?",
    "Can you tell if content is AI-generated?",
  ],
  "big-tech-antitrust": [
    "Should big tech companies be broken up?",
    "Is big tech a monopoly?",
    "Does big tech have too much power?",
  ],
  "cancel-culture": [
    "Is cancel culture harmful?",
    "Does cancel culture threaten free speech?",
    "Is cancel culture effective accountability?",
  ],
  "media-bias-democracy": [
    "Is media bias a threat to democracy?",
    "Are news outlets biased?",
    "Does media bias distort public opinion?",
  ],
  "space-colonization-feasibility": [
    "Can humans colonize Mars?",
    "Is space colonization realistic?",
    "Should we invest in space colonization?",
  ],
  "lab-grown-meat-adoption": [
    "Is lab-grown meat safe to eat?",
    "Will lab-grown meat replace farming?",
    "Should we switch to lab-grown meat?",
  ],

  // --- Science & Environment ---
  "climate-change": [
    "Is climate change caused by humans?",
    "How serious is climate change?",
    "Can we still stop climate change?",
  ],
  "ev-environmental-impact": [
    "Are electric cars better for the environment?",
    "Do electric vehicles really reduce emissions?",
    "Is switching to an EV worth it?",
  ],
  "factory-farming-ban": [
    "Should factory farming be banned?",
    "Is factory farming cruel?",
    "Is factory farming bad for the environment?",
  ],
  "organic-food-health": [
    "Is organic food healthier?",
    "Is organic food worth the price?",
    "Does organic food have fewer pesticides?",
  ],
  "gene-editing-embryos": [
    "Should we edit the genes of human embryos?",
    "Is gene editing ethical?",
    "Could CRISPR eliminate genetic diseases?",
  ],
  "space-exploration-value": [
    "Is space exploration worth the cost?",
    "Should we spend money on space exploration?",
    "What has space exploration achieved?",
  ],
  "veganism-environmental-impact": [
    "Is veganism better for the environment?",
    "Does going vegan reduce your carbon footprint?",
    "Should everyone be vegan for the planet?",
  ],
  "psychedelics-mental-health": [
    "Can psychedelics treat depression?",
    "Are psychedelics safe for therapy?",
    "Should psilocybin be legal for mental health?",
  ],
  "lab-leak-theory": [
    "Did COVID come from a lab?",
    "Was COVID-19 engineered?",
    "What is the evidence for the lab leak theory?",
  ],

  // --- Economics & Education ---
  "remote-work-permanence": [
    "Is remote work here to stay?",
    "Is working from home more productive?",
    "Should companies allow permanent remote work?",
  ],
  "college-value-proposition": [
    "Is college worth it anymore?",
    "Is a college degree still valuable?",
    "Should you go to college?",
  ],
  "standardized-testing-value": [
    "Do standardized tests predict success?",
    "Should colleges require test scores?",
    "Are SAT and ACT scores meaningful?",
  ],
  "homeschooling-effectiveness": [
    "Is homeschooling better than public school?",
    "Do homeschooled students do better?",
    "Is homeschooling effective?",
  ],
  "billionaire-wealth": [
    "Should billionaires exist?",
    "Is extreme wealth harmful to society?",
    "Do billionaires earn their wealth?",
  ],
  "foreign-aid-effectiveness": [
    "Does foreign aid actually work?",
    "Is foreign aid a waste of money?",
    "Does foreign aid help developing countries?",
  ],
  "cryptocurrency-value": [
    "Is cryptocurrency a good investment?",
    "Is Bitcoin a store of value?",
    "Should you invest in crypto?",
  ],
  "ubi-economics": [
    "Can we afford universal basic income?",
    "Does UBI reduce poverty?",
    "Is universal basic income economically viable?",
  ],
  "gig-economy-regulation": [
    "Should gig workers be classified as employees?",
    "Is the gig economy exploitative?",
    "Does the gig economy need more regulation?",
  ],

  // --- Philosophy & Speculation ---
  "free-will": [
    "Do humans have free will?",
    "Is free will an illusion?",
    "Does neuroscience disprove free will?",
  ],
  "simulation-hypothesis": [
    "Are we living in a simulation?",
    "Is the simulation theory real?",
    "Could reality be a computer simulation?",
  ],
  "moon-landing": [
    "Did we really land on the moon?",
    "Was the moon landing faked?",
    "What is the evidence for the moon landing?",
  ],
  "minneapolis-shooting": [
    "What happened in the Minneapolis ICE shooting?",
    "Was the Minneapolis ICE raid shooting justified?",
  ],
  "free-will-determinism": [
    "Is everything predetermined?",
    "Can free will and determinism coexist?",
    "Does determinism make morality meaningless?",
  ],
  "consciousness-ai-systems": [
    "Can AI be conscious?",
    "Will machines ever be sentient?",
    "Is artificial consciousness possible?",
  ],
  "meaning-without-religion": [
    "Can life have meaning without God?",
    "Is religion necessary for morality?",
    "Can you find purpose without religion?",
  ],
};

// ============================================================================
// Slug Generation
// ============================================================================

/** Convert a question string to a URL-safe slug. */
export function questionToSlug(question: string): string {
  return question
    .toLowerCase()
    .replace(/['']/g, "") // Remove apostrophes
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-|-$/g, ""); // Trim leading/trailing hyphens
}

// ============================================================================
// Question Variation Builder
// ============================================================================

/**
 * Generate all question variations for a given topic.
 * Returns an empty array if the topic has no defined questions.
 */
export function getQuestionVariations(topic: Topic): QuestionVariation[] {
  const questions = TOPIC_QUESTIONS[topic.id];
  if (!questions || questions.length === 0) return [];

  return questions.map((question) => ({
    slug: questionToSlug(question),
    question,
    metaDescription: `${question} Explore the strongest arguments for and against, backed by weighted evidence. ${topic.meta_claim}`,
    topicId: topic.id,
  }));
}

/**
 * Generate all question variations across all topics.
 * Used by generateStaticParams().
 */
export function getAllQuestionVariations(
  topics: Topic[]
): QuestionVariation[] {
  return topics.flatMap(getQuestionVariations);
}

/**
 * Find a question variation by its slug.
 * Returns undefined if no match.
 */
export function findQuestionBySlug(
  slug: string,
  topics: Topic[]
): { variation: QuestionVariation; topic: Topic } | undefined {
  for (const topic of topics) {
    const variations = getQuestionVariations(topic);
    const match = variations.find((v) => v.slug === slug);
    if (match) {
      return { variation: match, topic };
    }
  }
  return undefined;
}
