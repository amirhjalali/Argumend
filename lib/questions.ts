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

  // --- New Topics (March 2026) ---
  "ai-job-displacement": [
    "Will AI take my job?",
    "How many jobs will AI replace?",
    "Is AI automating jobs faster than creating new ones?",
  ],
  "ai-in-education": [
    "Should AI be used in schools?",
    "Is AI good for education?",
    "Will AI replace teachers?",
  ],
  "ai-regulation": [
    "Should AI be regulated by the government?",
    "Is AI regulation necessary?",
    "Can we regulate AI without stifling innovation?",
  ],
  "housing-affordability-crisis": [
    "Why is housing so expensive?",
    "Is there a housing affordability crisis?",
    "What is causing the housing crisis?",
  ],
  "social-media-elections": [
    "Does social media influence elections?",
    "Should social media be regulated during elections?",
    "Can social media undermine democracy?",
  ],
  "ultra-processed-food": [
    "Is ultra-processed food bad for you?",
    "Should ultra-processed food be regulated?",
    "Does ultra-processed food cause obesity?",
  ],
  "four-day-work-week": [
    "Does the four-day work week actually work?",
    "Should companies adopt a four-day work week?",
    "Is a four-day work week more productive?",
  ],
  "tiktok-ban": [
    "Should TikTok be banned?",
    "Is TikTok a national security threat?",
    "Is banning TikTok a violation of free speech?",
  ],
  "immigration-border-crisis": [
    "Is there a border crisis?",
    "How should the US handle the border crisis?",
    "What is causing the immigration crisis?",
  ],
  "longevity-science": [
    "Can science extend human lifespan?",
    "Is anti-aging research legitimate?",
    "Will we ever cure aging?",
  ],
  "nuclear-weapons-abolition": [
    "Should nuclear weapons be abolished?",
    "Is nuclear disarmament possible?",
    "Do nuclear weapons prevent war?",
  ],
  "gender-affirming-care-minors": [
    "Should minors receive gender-affirming care?",
    "Is gender-affirming care safe for children?",
    "What does the evidence say about gender-affirming care?",
  ],
  "consciousness-hard-problem": [
    "What is the hard problem of consciousness?",
    "Can science explain consciousness?",
    "Why is consciousness so hard to explain?",
  ],
  "school-phone-bans": [
    "Should phones be banned in schools?",
    "Do phone bans improve student performance?",
    "Are school phone bans effective?",
  ],
  "student-debt-forgiveness": [
    "Should student debt be forgiven?",
    "Is student loan forgiveness fair?",
    "Does student debt forgiveness help the economy?",
  ],
  "microplastics-health-crisis": [
    "Are microplastics harmful to health?",
    "How dangerous are microplastics?",
    "Should microplastics be regulated?",
  ],
  "glp1-weight-loss-drugs": [
    "Are GLP-1 weight loss drugs safe?",
    "Should everyone take Ozempic?",
    "Do weight loss drugs like Ozempic actually work?",
  ],
  "ai-white-collar-displacement": [
    "Will AI replace white-collar workers?",
    "Is AI coming for office jobs?",
    "Which white-collar jobs are most at risk from AI?",
  ],
  "artificial-reproduction-ethics": [
    "Is artificial reproduction ethical?",
    "Should we allow artificial wombs?",
    "What are the ethics of reproductive technology?",
  ],
  "government-platform-bans": [
    "Should governments ban social media platforms?",
    "Is it right for governments to ban apps?",
    "Do government platform bans protect citizens?",
  ],
  "gain-of-function-research-ban": [
    "Should gain-of-function research be banned?",
    "Is gain-of-function research too dangerous?",
    "Did gain-of-function research cause COVID?",
  ],
  "children-smartphone-age": [
    "At what age should children get a smartphone?",
    "Are smartphones bad for children?",
    "Should there be a minimum age for smartphones?",
  ],
  "alternatives-to-democracy": [
    "Are there better alternatives to democracy?",
    "Is democracy the best form of government?",
    "Could technocracy work better than democracy?",
  ],
  "geoengineering-climate": [
    "Should we use geoengineering to fight climate change?",
    "Is geoengineering safe?",
    "Can geoengineering reverse global warming?",
  ],
  "central-bank-digital-currency": [
    "Should central banks issue digital currency?",
    "Is a digital dollar a good idea?",
    "Will CBDCs replace cash?",
  ],
  "masculinity-crisis": [
    "Is there a masculinity crisis?",
    "Are men falling behind in society?",
    "What is causing the crisis in masculinity?",
  ],
  "ai-deepfakes-truth-collapse": [
    "Are deepfakes destroying trust?",
    "Can we stop AI deepfakes?",
    "Will deepfakes make truth impossible?",
  ],
  "declining-birth-rates": [
    "Why are birth rates declining?",
    "Should we be worried about falling birth rates?",
    "Is population decline a crisis?",
  ],
  "longevity-anti-aging": [
    "Can we reverse aging?",
    "Is anti-aging medicine real?",
    "Will we be able to live to 150?",
  ],
  "nuclear-proliferation-new-arms-race": [
    "Are we in a new nuclear arms race?",
    "Is nuclear proliferation getting worse?",
    "Can we stop nuclear weapons from spreading?",
  ],
  "transgender-athletes-sports": [
    "Should transgender athletes compete in their identified gender?",
    "Is it fair for trans women to compete in womens sports?",
    "What does science say about transgender athletes?",
  ],
  "animal-consciousness-rights": [
    "Are animals conscious?",
    "Should animals have legal rights?",
    "Do animals experience suffering like humans?",
  ],
  "immigration-national-identity": [
    "Does immigration threaten national identity?",
    "Can immigration and national identity coexist?",
    "Does multiculturalism weaken social cohesion?",
  ],
  "psychedelic-therapy-hype": [
    "Is psychedelic therapy overhyped?",
    "Does psychedelic therapy actually work?",
    "Are the claims about psychedelic therapy exaggerated?",
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
