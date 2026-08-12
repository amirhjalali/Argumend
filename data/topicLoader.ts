import type { Topic, TopicInput } from "@/lib/schemas/topic";

type TopicModuleLoader = () => Promise<unknown>;

const topicModuleLoaders = {
  "sports-betting-legalization": () => import("./topics/sports-betting-legalization"),
  "pfas-forever-chemicals": () => import("./topics/pfas-forever-chemicals"),
  "intermittent-fasting-efficacy": () => import("./topics/intermittent-fasting-efficacy"),
  "daylight-saving-time-abolition": () => import("./topics/daylight-saving-time-abolition"),
  "tipping-culture": () => import("./topics/tipping-culture"),
  "ai-therapy-chatbots": () => import("./topics/ai-therapy-chatbots"),
  "carbon-capture-viability": () => import("./topics/carbon-capture-viability"),
  "hydrogen-economy-viability": () => import("./topics/hydrogen-economy-viability"),
  "vertical-farming-viability": () => import("./topics/vertical-farming-viability"),
  "de-extinction-species": () => import("./topics/de-extinction-species"),
  "scott-cost-disease": () => import("./topics/scott-cost-disease"),
  "moloch": () => import("./topics/moloch"),
  "ai-2027": () => import("./topics/ai-2027"),
  "jones-act": () => import("./topics/jones-act"),
  "nuclear-energy-safety": () => import("./topics/nuclear-energy-safety"),
  "universal-healthcare": () => import("./topics/universal-healthcare"),
  "gun-control-effectiveness": () => import("./topics/gun-control-effectiveness"),
  "minimum-wage-effects": () => import("./topics/minimum-wage-effects"),
  "drug-decriminalization": () => import("./topics/drug-decriminalization"),
  "death-penalty-deterrence": () => import("./topics/death-penalty-deterrence"),
  "police-reform": () => import("./topics/police-reform"),
  "mandatory-voting": () => import("./topics/mandatory-voting"),
  "reparations-slavery": () => import("./topics/reparations-slavery"),
  "immigration-wage-impact": () => import("./topics/immigration-wage-impact"),
  "open-borders": () => import("./topics/open-borders"),
  "universal-basic-income": () => import("./topics/universal-basic-income"),
  "wealth-tax": () => import("./topics/wealth-tax"),
  "standardized-testing-debate": () => import("./topics/standardized-testing-debate"),
  "electoral-college-reform": () => import("./topics/electoral-college-reform"),
  "surveillance-public-safety": () => import("./topics/surveillance-public-safety"),
  "us-iran-conflict": () => import("./topics/us-iran-conflict"),
  "epstein-files": () => import("./topics/epstein-files"),
  "tiktok-ban": () => import("./topics/tiktok-ban"),
  "immigration-border-crisis": () => import("./topics/immigration-border-crisis"),
  "social-media-elections": () => import("./topics/social-media-elections"),
  "nuclear-weapons-abolition": () => import("./topics/nuclear-weapons-abolition"),
  "school-phone-bans": () => import("./topics/school-phone-bans"),
  "pandemic-preparedness": () => import("./topics/pandemic-preparedness"),
  "iran-war-justification": () => import("./topics/iran-war-justification"),
  "china-taiwan-invasion": () => import("./topics/china-taiwan-invasion"),
  "global-water-crisis": () => import("./topics/global-water-crisis"),
  "sugar-tax-effectiveness": () => import("./topics/sugar-tax-effectiveness"),
  "social-media-age-limits": () => import("./topics/social-media-age-limits"),
  "social-media-mental-health": () => import("./topics/social-media-mental-health"),
  "ai-risk": () => import("./topics/ai-risk"),
  "ai-content-labeling": () => import("./topics/ai-content-labeling"),
  "big-tech-antitrust": () => import("./topics/big-tech-antitrust"),
  "cancel-culture": () => import("./topics/cancel-culture"),
  "media-bias-democracy": () => import("./topics/media-bias-democracy"),
  "space-colonization-feasibility": () => import("./topics/space-colonization-feasibility"),
  "lab-grown-meat-adoption": () => import("./topics/lab-grown-meat-adoption"),
  "ai-job-displacement": () => import("./topics/ai-job-displacement"),
  "ai-in-education": () => import("./topics/ai-in-education"),
  "ai-regulation": () => import("./topics/ai-regulation"),
  "ai-white-collar-displacement": () => import("./topics/ai-white-collar-displacement"),
  "eacc-vs-tech-regulation": () => import("./topics/eacc-vs-tech-regulation"),
  "ai-superintelligence-timeline": () => import("./topics/ai-superintelligence-timeline"),
  "nuclear-renaissance-smr": () => import("./topics/nuclear-renaissance-smr"),
  "tiktok-brain-rot": () => import("./topics/tiktok-brain-rot"),
  "ai-replacing-doctors": () => import("./topics/ai-replacing-doctors"),
  "privacy-vs-convenience": () => import("./topics/privacy-vs-convenience"),
  "climate-change": () => import("./topics/climate-change"),
  "ev-environmental-impact": () => import("./topics/ev-environmental-impact"),
  "factory-farming-ban": () => import("./topics/factory-farming-ban"),
  "organic-food-health": () => import("./topics/organic-food-health"),
  "gene-editing-embryos": () => import("./topics/gene-editing-embryos"),
  "space-exploration-value": () => import("./topics/space-exploration-value"),
  "veganism-environmental-impact": () => import("./topics/veganism-environmental-impact"),
  "psychedelics-mental-health": () => import("./topics/psychedelics-mental-health"),
  "lab-leak-theory": () => import("./topics/covid-origins"),
  "ultra-processed-food": () => import("./topics/ultra-processed-food"),
  "longevity-science": () => import("./topics/longevity-science"),
  "gender-affirming-care-minors": () => import("./topics/gender-affirming-care-minors"),
  "microplastics-health-crisis": () => import("./topics/microplastics-health-crisis"),
  "glp1-weight-loss-drugs": () => import("./topics/glp1-weight-loss-drugs"),
  "fluoride-water-supplies": () => import("./topics/fluoride-water-supplies"),
  "lithium-mining-ev-impact": () => import("./topics/lithium-mining-ev-impact"),
  "seed-oils-health": () => import("./topics/seed-oils-health"),
  "obesity-personal-responsibility": () => import("./topics/obesity-personal-responsibility"),
  "loneliness-epidemic": () => import("./topics/loneliness-epidemic"),
  "remote-work-permanence": () => import("./topics/remote-work-permanence"),
  "college-value-proposition": () => import("./topics/college-value-proposition"),
  "homeschooling-effectiveness": () => import("./topics/homeschooling-effectiveness"),
  "billionaire-wealth": () => import("./topics/billionaire-wealth"),
  "foreign-aid-effectiveness": () => import("./topics/foreign-aid-effectiveness"),
  "cryptocurrency-value": () => import("./topics/cryptocurrency-value"),
  "cryptocurrency-regulation": () => import("./topics/cryptocurrency-regulation"),
  "gig-economy-regulation": () => import("./topics/gig-economy-regulation"),
  "housing-affordability-crisis": () => import("./topics/housing-affordability-crisis"),
  "four-day-work-week": () => import("./topics/four-day-work-week"),
  "student-debt-forgiveness": () => import("./topics/student-debt-forgiveness"),
  "inflation-monetary-policy": () => import("./topics/inflation-monetary-policy"),
  "global-housing-bubble": () => import("./topics/global-housing-bubble"),
  "us-national-debt-crisis": () => import("./topics/us-national-debt-crisis"),
  "return-to-office-productivity": () => import("./topics/return-to-office-productivity"),
  "lab-diamonds-ethics": () => import("./topics/lab-diamonds-ethics"),
  "rent-control-effectiveness": () => import("./topics/rent-control-effectiveness"),
  "degrowth-economics": () => import("./topics/degrowth-economics"),
  "free-will": () => import("./topics/free-will"),
  "simulation-hypothesis": () => import("./topics/simulation-hypothesis"),
  "moon-landing": () => import("./topics/moon-landing"),
  "minneapolis-shooting": () => import("./topics/minneapolis-shooting"),
  "consciousness-ai-systems": () => import("./topics/consciousness-ai-systems"),
  "meaning-without-religion": () => import("./topics/meaning-without-religion"),
  "meritocracy-myth": () => import("./topics/meritocracy-myth"),
  "consciousness-hard-problem": () => import("./topics/consciousness-hard-problem"),
  "artificial-reproduction-ethics": () => import("./topics/artificial-reproduction-ethics"),
  "government-platform-bans": () => import("./topics/government-platform-bans"),
  "gain-of-function-research-ban": () => import("./topics/gain-of-function-research-ban"),
  "children-smartphone-age": () => import("./topics/children-smartphone-age"),
  "alternatives-to-democracy": () => import("./topics/alternatives-to-democracy"),
  "geoengineering-climate": () => import("./topics/geoengineering-climate"),
  "central-bank-digital-currency": () => import("./topics/central-bank-digital-currency"),
  "masculinity-crisis": () => import("./topics/masculinity-crisis"),
  "ai-deepfakes-truth-collapse": () => import("./topics/ai-deepfakes-truth-collapse"),
  "declining-birth-rates": () => import("./topics/declining-birth-rates"),
  "longevity-anti-aging": () => import("./topics/longevity-anti-aging"),
  "nuclear-proliferation-new-arms-race": () => import("./topics/nuclear-proliferation-new-arms-race"),
  "transgender-athletes-sports": () => import("./topics/transgender-athletes-sports"),
  "animal-consciousness-rights": () => import("./topics/animal-consciousness-rights"),
  "immigration-national-identity": () => import("./topics/immigration-national-identity"),
  "psychedelic-therapy-hype": () => import("./topics/psychedelic-therapy-hype"),
  "affirmative-action-meritocracy": () => import("./topics/affirmative-action-meritocracy"),
  "ukraine-peace-terms": () => import("./topics/ukraine-peace-terms"),
  "trump-tariffs": () => import("./topics/trump-tariffs"),
  "rfk-health-policy": () => import("./topics/rfk-health-policy"),
  "doge-federal-cuts": () => import("./topics/doge-federal-cuts"),
  "open-weight-ai-models": () => import("./topics/open-weight-ai-models"),
  "carbon-tax-effectiveness": () => import("./topics/carbon-tax-effectiveness"),
  "congestion-pricing": () => import("./topics/congestion-pricing"),
  "right-to-repair": () => import("./topics/right-to-repair"),
  "assisted-dying-euthanasia": () => import("./topics/assisted-dying-euthanasia"),
  "second-amendment-individual-right": () => import("./topics/second-amendment-individual-right"),
  "self-driving-car-safety": () => import("./topics/self-driving-car-safety"),
  "net-neutrality": () => import("./topics/net-neutrality"),
  "generative-ai-art-copyright": () => import("./topics/generative-ai-art-copyright"),
  "facial-recognition-policing": () => import("./topics/facial-recognition-policing"),
  "gmo-crops-safety": () => import("./topics/gmo-crops-safety"),
  "nuclear-fusion-timeline": () => import("./topics/nuclear-fusion-timeline"),
  "vaccine-mandates": () => import("./topics/vaccine-mandates"),
  "ssri-antidepressant-efficacy": () => import("./topics/ssri-antidepressant-efficacy"),
  "social-security-retirement-age": () => import("./topics/social-security-retirement-age"),
  "estate-inheritance-tax": () => import("./topics/estate-inheritance-tax"),
  "occupational-licensing-reform": () => import("./topics/occupational-licensing-reform"),
  "encryption-backdoors": () => import("./topics/encryption-backdoors"),
  "section-230-reform": () => import("./topics/section-230-reform"),
  "autonomous-weapons-ban": () => import("./topics/autonomous-weapons-ban"),
  "ai-energy-water-footprint": () => import("./topics/ai-energy-water-footprint"),
  "adhd-overdiagnosis": () => import("./topics/adhd-overdiagnosis"),
  "vaping-harm-reduction": () => import("./topics/vaping-harm-reduction"),
  "sex-work-decriminalization": () => import("./topics/sex-work-decriminalization"),
  "congressional-term-limits": () => import("./topics/congressional-term-limits"),
  "effective-altruism": () => import("./topics/effective-altruism"),
  "alcohol-no-safe-level": () => import("./topics/alcohol-no-safe-level"),
  "modern-monetary-theory": () => import("./topics/modern-monetary-theory"),
  "dark-matter-vs-mond": () => import("./topics/dark-matter-vs-mond"),
} satisfies Record<string, TopicModuleLoader>;

export const TOPIC_LOADER_IDS = Object.freeze(Object.keys(topicModuleLoaders));

const topicPromiseCache = new Map<string, Promise<Topic | null>>();

function findTopicInput(module: unknown, expectedId: string): TopicInput | null {
  if (typeof module !== "object" || module === null) return null;

  for (const candidate of Object.values(module)) {
    if (
      typeof candidate === "object" &&
      candidate !== null &&
      "id" in candidate &&
      candidate.id === expectedId
    ) {
      return candidate as TopicInput;
    }
  }

  return null;
}

export function hasTopicLoader(topicId: string): boolean {
  return Object.hasOwn(topicModuleLoaders, topicId);
}

/**
 * Load and normalize one authored topic module. Unknown IDs return null without
 * triggering any dynamic import; successful loads are shared and cached.
 */
export function loadTopicById(topicId: string): Promise<Topic | null> {
  const existing = topicPromiseCache.get(topicId);
  if (existing) return existing;

  const loader = topicModuleLoaders[topicId as keyof typeof topicModuleLoaders];
  if (!loader) return Promise.resolve(null);

  const pending = Promise.all([loader(), import("./buildTopic")])
    .then(([module, { buildTopic }]) => {
      const input = findTopicInput(module, topicId);
      return input ? buildTopic(input) : null;
    })
    .catch(() => null);

  topicPromiseCache.set(topicId, pending);
  void pending.then((topic) => {
    // A transient chunk/load failure should not poison the session cache.
    if (!topic && topicPromiseCache.get(topicId) === pending) {
      topicPromiseCache.delete(topicId);
    }
  });
  return pending;
}
