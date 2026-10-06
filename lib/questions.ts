import type { Topic } from "@/lib/schemas/topic";

type QuestionTopic = Pick<Topic, "id" | "meta_claim">;

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
  /**
   * The topic's first question. Only the primary is a page in its own right:
   * the other phrasings render the same content, list under "Also asked as"
   * and point their canonical URL at the primary.
   */
  primary: boolean;
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
    "Are EVs clearly greener than gas cars once mining is counted?",
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
    "Is psychedelic therapy a genuine revolution in mental health care?",
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
    "Can national security justify banning foreign-owned apps like TikTok?",
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
    "Could human lifespans pass 120 within our lifetimes?",
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

  // --- From the retired /is pages (2026-09-29) ---
  // Each map below had an /is/* "Is it true?" page and no question page. Its
  // /is question is its primary question here, so every retired /is URL
  // redirects to a real /questions page (next.config.js, the "learn" block;
  // lib/learn/isToQuestions.test.ts keeps the two in step).
  "fluoride-water-supplies": ["Is fluoride in water safe?"],
  "rent-control-effectiveness": ["Does rent control hurt housing affordability?"],
  "vaccine-mandates": ["Are government vaccine mandates justified?"],
  "seed-oils-health": ["Are seed oils harmful to your health?"],
  "self-driving-car-safety": ["Are self-driving cars safer than human drivers?"],
  "congestion-pricing": ["Does congestion pricing work?"],
  "right-to-repair": ["Is right to repair good for consumers?"],
  "assisted-dying-euthanasia": ["Should terminally ill adults have the right to assisted dying?"],
  "sex-work-decriminalization": ["Does decriminalizing sex work improve safety?"],
  "carbon-tax-effectiveness": ["Does a carbon tax reduce emissions?"],
  "china-taiwan-invasion": ["Will China invade Taiwan before 2030?"],
  "pandemic-preparedness": ["Should governments invest heavily in pandemic preparedness?"],
  "global-water-crisis": ["Is the world heading for water wars?"],
  "sugar-tax-effectiveness": ["Do sugar taxes reduce obesity?"],
  "eacc-vs-tech-regulation": ["Does rapid, unregulated tech progress do more good than harm?"],
  "ai-superintelligence-timeline": ["Will superintelligent AI arrive before 2035?"],
  "nuclear-renaissance-smr": ["Can small modular reactors scale this decade?"],
  "tiktok-brain-rot": ["Is short-form video rotting our attention spans?"],
  "ai-replacing-doctors": ["Will AI replace doctors within a decade?"],
  "privacy-vs-convenience": ["Is digital privacy already dead?"],
  "obesity-personal-responsibility": ["Is obesity mainly a matter of personal responsibility?"],
  "loneliness-epidemic": ["Is there really a loneliness epidemic?"],
  "cryptocurrency-regulation": ["Should cryptocurrency be regulated like traditional finance?"],
  "inflation-monetary-policy": ["Was post-pandemic inflation caused by government spending?"],
  "global-housing-bubble": ["Is there a global housing bubble about to burst?"],
  "us-national-debt-crisis": ["Is the US national debt a ticking time bomb?"],
  "return-to-office-productivity": ["Does return-to-office improve productivity?"],
  "lab-diamonds-ethics": ["Are lab-grown diamonds more ethical than mined diamonds?"],
  "degrowth-economics": ["Do we need degrowth to save the planet?"],
  "meritocracy-myth": ["Is meritocracy a myth?"],
  "open-weight-ai-models": ["Should frontier AI models be released open-weight?"],
  "second-amendment-individual-right": ["Does the Second Amendment protect an individual right?"],
  "net-neutrality": ["Is net neutrality necessary?"],
  "generative-ai-art-copyright": ["Is training AI on copyrighted work theft?"],
  "facial-recognition-policing": ["Should police facial recognition be restricted?"],
  "nuclear-fusion-timeline": ["Will fusion power arrive within 20 years?"],
  "ssri-antidepressant-efficacy": ["Do antidepressants (SSRIs) actually work?"],
  "social-security-retirement-age": ["Should the retirement age be raised?"],
  "estate-inheritance-tax": ["Is the estate tax fair?"],
  "occupational-licensing-reform": ["Does occupational licensing do more harm than good?"],
  "encryption-backdoors": ["Should governments have encryption backdoors?"],
  "section-230-reform": ["Should Section 230 be reformed or repealed?"],
  "autonomous-weapons-ban": ["Should lethal autonomous weapons be banned?"],
  "ai-energy-water-footprint": ["Is AI's energy and water use a serious problem?"],
  "adhd-overdiagnosis": ["Is ADHD overdiagnosed?"],
  "vaping-harm-reduction": ["Is vaping a good way to quit smoking?"],
  "congressional-term-limits": ["Would term limits improve Congress?"],
  "effective-altruism": ["Is effective altruism a sound way to do good?"],
  "alcohol-no-safe-level": ["Is any amount of alcohol safe to drink?"],
  "modern-monetary-theory": ["Is Modern Monetary Theory sound?"],
  "gmo-crops-safety": ["Are GMO crops safe to eat?"],
  "dark-matter-vs-mond": ["Does dark matter actually exist?"],
  "trump-tariffs": ["Do tariffs strengthen the economy?"],
  "affirmative-action-meritocracy": ["Is affirmative action necessary for equal opportunity?"],
  "ukraine-peace-terms": [
    "Should the Russia-Ukraine war end in a negotiated settlement along current lines?",
  ],
  "rfk-health-policy": ["Will RFK Jr's Make America Healthy Again agenda improve US health?"],
  "doge-federal-cuts": ["Did DOGE actually cut government waste and make Washington leaner?"],
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
export function getQuestionVariations(topic: QuestionTopic): QuestionVariation[] {
  const questions = TOPIC_QUESTIONS[topic.id];
  if (!questions || questions.length === 0) return [];

  return questions.map((question, index) => ({
    slug: questionToSlug(question),
    question,
    metaDescription: `${question} What both sides agree on, what the disagreement turns on, and what would settle it. ${topic.meta_claim}`,
    topicId: topic.id,
    primary: index === 0,
  }));
}

/** Every phrasing of a topic's question ("Also asked as"), primary first. */
export function getTopicQuestionPhrasings(topicId: string): readonly string[] {
  return TOPIC_QUESTIONS[topicId] ?? [];
}

/**
 * The slug of a topic's primary question, or undefined when the topic has no
 * question page. Needs only the id, so config-time code can call it.
 */
export function getPrimaryQuestionSlug(topicId: string): string | undefined {
  const first = TOPIC_QUESTIONS[topicId]?.[0];
  return first ? questionToSlug(first) : undefined;
}

/** One question per topic: the primary phrasing of each. */
export function getPrimaryQuestionVariations(
  topics: readonly QuestionTopic[],
): QuestionVariation[] {
  return getAllQuestionVariations(topics).filter((variation) => variation.primary);
}

/**
 * Generate all question variations across all topics.
 * Used by generateStaticParams().
 */
export function getAllQuestionVariations(
  topics: readonly QuestionTopic[]
): QuestionVariation[] {
  return topics.flatMap(getQuestionVariations);
}

/**
 * Find a question variation by its slug.
 * Returns undefined if no match.
 */
export function findQuestionBySlug<T extends QuestionTopic>(
  slug: string,
  topics: readonly T[]
): { variation: QuestionVariation; topic: T } | undefined {
  for (const topic of topics) {
    const variations = getQuestionVariations(topic);
    const match = variations.find((v) => v.slug === slug);
    if (match) {
      return { variation: match, topic };
    }
  }
  return undefined;
}
