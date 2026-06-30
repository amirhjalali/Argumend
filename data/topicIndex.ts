/**
 * Lightweight topic index for client components.
 *
 * The full `data/topics.ts` file is ~500KB. When client components import it,
 * the entire payload gets duplicated into every page chunk that uses it.
 * This file re-exports only the minimal fields needed for listing, searching,
 * and navigation — keeping client bundles small (~17KB vs ~500KB).
 *
 * For full topic data (pillars, evidence, cruxes), import from `data/topics.ts`
 * only in server components or lazy-loaded client code (e.g., CanvasView).
 */

import summaries from "./topicSummaries.json";

import type { TopicCategory, TopicStatus } from "@/lib/schemas/topic";

// ---------------------------------------------------------------------------
// Lightweight Topic Summary type
// ---------------------------------------------------------------------------

export interface TopicSummary {
  id: string;
  title: string;
  meta_claim: string;
  confidence_score: number;
  status: TopicStatus;
  category: TopicCategory;
  pillarCount: number;
  evidenceCount: number;
  tags: string[];
  addedAt?: string;
}

/** Pre-computed summaries — ~17KB vs ~500KB for the full topics array. */
export const topicSummaries: TopicSummary[] = summaries as TopicSummary[];

/** Exact topic count. */
export const TOPIC_COUNT = topicSummaries.length;

/**
 * Rounded-down topic count for marketing copy, e.g. "130+".
 * Auto-updates as topics are added, so titles/descriptions never go stale.
 */
export const TOPIC_COUNT_LABEL = `${Math.floor(TOPIC_COUNT / 10) * 10}+`;

// ---------------------------------------------------------------------------
// Category constants (inlined to avoid importing topics.ts)
// ---------------------------------------------------------------------------

export const CATEGORY_LABELS: Record<TopicCategory, string> = {
  policy: "Policy",
  technology: "Technology",
  science: "Science",
  economics: "Economics",
  philosophy: "Philosophy",
};

export const CATEGORY_ORDER: TopicCategory[] = [
  "policy",
  "technology",
  "science",
  "economics",
  "philosophy",
];

/** Rotate this ID weekly to feature a different debate on the homepage. */
export const featuredTopicId = "consciousness-ai-systems";

/** Short editorial hook explaining why this topic is featured right now. */
export const featuredReason =
  "Anthropic now studies model welfare. Could today's AI already have a stake in how we treat it? Where the evidence actually lands.";

// ---------------------------------------------------------------------------
// Cross-category related topics (summaries-only)
// ---------------------------------------------------------------------------

/**
 * Thematic cross-category clusters: topic ID -> related topic IDs in OTHER
 * categories. This is a lightweight (string-only) mirror of
 * `CROSS_CATEGORY_CLUSTERS` in `data/topics.ts`, kept here so client components
 * can compute related topics without importing the ~500KB topics module.
 *
 * Keep in sync with `data/topics.ts`. (Ideal future refactor: have
 * `data/topics.ts` import this map from here so there's a single source.)
 */
const CROSS_CATEGORY_CLUSTERS: Record<string, string[]> = {
  // Criminal justice cluster
  "gun-control-effectiveness": ["death-penalty-deterrence", "police-reform", "drug-decriminalization", "surveillance-public-safety"],
  "death-penalty-deterrence": ["gun-control-effectiveness", "police-reform", "drug-decriminalization", "reparations-slavery"],
  "police-reform": ["gun-control-effectiveness", "death-penalty-deterrence", "surveillance-public-safety", "reparations-slavery"],

  // Energy & environment cluster
  "nuclear-energy-safety": ["climate-change", "ev-environmental-impact", "veganism-environmental-impact", "space-exploration-value"],
  "climate-change": ["nuclear-energy-safety", "ev-environmental-impact", "veganism-environmental-impact", "factory-farming-ban"],
  "ev-environmental-impact": ["nuclear-energy-safety", "climate-change", "veganism-environmental-impact", "lab-grown-meat-adoption"],

  // Economic inequality cluster
  "universal-basic-income": ["wealth-tax", "billionaire-wealth", "gig-economy-regulation", "minimum-wage-effects"],
  "wealth-tax": ["universal-basic-income", "billionaire-wealth", "minimum-wage-effects", "open-borders"],
  "billionaire-wealth": ["wealth-tax", "universal-basic-income", "minimum-wage-effects", "gig-economy-regulation"],

  // AI governance cluster
  "ai-risk": ["ai-content-labeling", "consciousness-ai-systems", "social-media-mental-health", "big-tech-antitrust"],
  "ai-content-labeling": ["ai-risk", "consciousness-ai-systems", "media-bias-democracy", "cancel-culture"],
  "consciousness-ai-systems": ["ai-risk", "ai-content-labeling", "free-will", "simulation-hypothesis"],

  // Tech & society cluster
  "social-media-mental-health": ["social-media-age-limits", "cancel-culture", "big-tech-antitrust", "ai-risk"],
  "social-media-age-limits": ["social-media-mental-health", "cancel-culture", "surveillance-public-safety", "big-tech-antitrust"],
  "big-tech-antitrust": ["social-media-mental-health", "social-media-age-limits", "ai-content-labeling", "media-bias-democracy"],

  // Philosophy cluster
  "simulation-hypothesis": ["free-will", "consciousness-ai-systems", "ai-risk", "meaning-without-religion"],
  "meaning-without-religion": ["free-will", "simulation-hypothesis", "consciousness-ai-systems", "moon-landing"],
  "free-will": ["meaning-without-religion", "simulation-hypothesis", "consciousness-ai-systems", "moon-landing"],

  // Education cluster
  "standardized-testing-debate": ["college-value-proposition", "homeschooling-effectiveness", "mandatory-voting", "foreign-aid-effectiveness"],
  "college-value-proposition": ["standardized-testing-debate", "homeschooling-effectiveness", "remote-work-permanence", "universal-basic-income"],
  "homeschooling-effectiveness": ["college-value-proposition", "standardized-testing-debate", "social-media-age-limits", "meaning-without-religion"],

  // Health & food cluster
  "organic-food-health": ["veganism-environmental-impact", "factory-farming-ban", "lab-grown-meat-adoption", "gene-editing-embryos"],
  "factory-farming-ban": ["organic-food-health", "veganism-environmental-impact", "lab-grown-meat-adoption", "climate-change"],
  "veganism-environmental-impact": ["factory-farming-ban", "organic-food-health", "climate-change", "lab-grown-meat-adoption"],
  "lab-grown-meat-adoption": ["factory-farming-ban", "organic-food-health", "veganism-environmental-impact", "gene-editing-embryos"],
  "psychedelics-mental-health": ["drug-decriminalization", "social-media-mental-health", "meaning-without-religion", "gene-editing-embryos"],
  "gene-editing-embryos": ["organic-food-health", "psychedelics-mental-health", "lab-grown-meat-adoption", "ai-risk"],

  // Governance & democracy cluster
  "mandatory-voting": ["electoral-college-reform", "media-bias-democracy", "cancel-culture", "open-borders"],
  "electoral-college-reform": ["mandatory-voting", "media-bias-democracy", "reparations-slavery", "surveillance-public-safety"],
  "media-bias-democracy": ["cancel-culture", "ai-content-labeling", "mandatory-voting", "big-tech-antitrust"],
  "cancel-culture": ["media-bias-democracy", "social-media-mental-health", "social-media-age-limits", "big-tech-antitrust"],
  "surveillance-public-safety": ["police-reform", "social-media-age-limits", "gun-control-effectiveness", "big-tech-antitrust"],

  // Immigration & global policy cluster
  "open-borders": ["immigration-wage-impact", "universal-basic-income", "reparations-slavery", "foreign-aid-effectiveness"],
  "immigration-wage-impact": ["open-borders", "minimum-wage-effects", "universal-basic-income", "foreign-aid-effectiveness"],
  "reparations-slavery": ["police-reform", "death-penalty-deterrence", "wealth-tax", "electoral-college-reform"],
  "foreign-aid-effectiveness": ["open-borders", "immigration-wage-impact", "universal-healthcare", "space-exploration-value"],

  // Work & economy cluster
  "remote-work-permanence": ["gig-economy-regulation", "college-value-proposition", "universal-basic-income", "minimum-wage-effects"],
  "gig-economy-regulation": ["remote-work-permanence", "minimum-wage-effects", "billionaire-wealth", "universal-basic-income"],
  "minimum-wage-effects": ["universal-basic-income", "gig-economy-regulation", "immigration-wage-impact", "remote-work-permanence"],
  "cryptocurrency-value": ["big-tech-antitrust", "wealth-tax", "gig-economy-regulation", "surveillance-public-safety"],

  // Healthcare cluster
  "universal-healthcare": ["universal-basic-income", "drug-decriminalization", "psychedelics-mental-health", "foreign-aid-effectiveness"],
  "drug-decriminalization": ["psychedelics-mental-health", "police-reform", "universal-healthcare", "gun-control-effectiveness"],

  // Space & science cluster
  "space-exploration-value": ["space-colonization-feasibility", "nuclear-energy-safety", "simulation-hypothesis", "climate-change"],
  "space-colonization-feasibility": ["space-exploration-value", "ai-risk", "nuclear-energy-safety", "simulation-hypothesis"],
  "moon-landing": ["space-exploration-value", "simulation-hypothesis", "lab-leak-theory", "media-bias-democracy"],
  "lab-leak-theory": ["surveillance-public-safety", "media-bias-democracy", "us-iran-conflict", "epstein-files"],
  "minneapolis-shooting": ["police-reform", "media-bias-democracy", "gun-control-effectiveness", "cancel-culture"],

  // Geopolitics & accountability cluster
  "us-iran-conflict": ["surveillance-public-safety", "media-bias-democracy", "lab-leak-theory", "epstein-files"],
  "epstein-files": ["police-reform", "surveillance-public-safety", "media-bias-democracy", "us-iran-conflict"],

  // Reproduction & demographics cluster
  "artificial-reproduction-ethics": ["gene-editing-embryos", "declining-birth-rates", "longevity-science", "consciousness-hard-problem"],
  "declining-birth-rates": ["housing-affordability-crisis", "universal-basic-income", "artificial-reproduction-ethics", "masculinity-crisis"],

  // Tech & society cluster (new topics)
  "government-platform-bans": ["big-tech-antitrust", "surveillance-public-safety", "social-media-age-limits", "ai-deepfakes-truth-collapse"],
  "children-smartphone-age": ["social-media-age-limits", "social-media-mental-health", "school-phone-bans", "masculinity-crisis"],
  "ai-deepfakes-truth-collapse": ["ai-content-labeling", "media-bias-democracy", "surveillance-public-safety", "ai-risk"],

  // Pandemic preparedness cluster
  "pandemic-preparedness": ["gain-of-function-research-ban", "covid-origins", "universal-healthcare", "surveillance-public-safety"],

  // Policy cluster (new topics)
  "gain-of-function-research-ban": ["lab-leak-theory", "surveillance-public-safety", "covid-origins", "pandemic-preparedness"],

  // Economics cluster (new topics)
  "cryptocurrency-regulation": ["cryptocurrency-value", "central-bank-digital-currency", "big-tech-antitrust", "ai-regulation"],
  "central-bank-digital-currency": ["cryptocurrency-value", "cryptocurrency-regulation", "surveillance-public-safety", "wealth-tax"],

  // Philosophy cluster (new topics)
  "alternatives-to-democracy": ["mandatory-voting", "electoral-college-reform", "media-bias-democracy", "free-will"],
  "masculinity-crisis": ["social-media-mental-health", "meaning-without-religion", "children-smartphone-age", "declining-birth-rates"],

  // Climate/environment cluster (new topics)
  "geoengineering-climate": ["climate-change", "nuclear-energy-safety", "space-colonization-feasibility", "ev-environmental-impact"],

  // Lithium mining & EV cluster
  "lithium-mining-ev-impact": ["ev-environmental-impact", "climate-change", "nuclear-energy-safety", "geoengineering-climate"],

  // New topics batch 2 clusters
  "longevity-anti-aging": ["gene-editing-embryos", "glp1-weight-loss-drugs", "ai-risk", "declining-birth-rates"],
  "nuclear-proliferation-new-arms-race": ["us-iran-conflict", "surveillance-public-safety", "alternatives-to-democracy", "foreign-aid-effectiveness"],
  "transgender-athletes-sports": ["cancel-culture", "gender-affirming-care-minors", "masculinity-crisis", "social-media-mental-health"],
  "animal-consciousness-rights": ["consciousness-ai-systems", "factory-farming-ban", "veganism-environmental-impact", "meaning-without-religion"],
  "immigration-national-identity": ["immigration-wage-impact", "open-borders", "declining-birth-rates", "housing-affordability-crisis"],
  "psychedelic-therapy-hype": ["psychedelics-mental-health", "drug-decriminalization", "glp1-weight-loss-drugs", "social-media-mental-health"],

  // New topics batch 3 clusters
  "iran-war-justification": ["us-iran-conflict", "nuclear-proliferation-new-arms-race", "surveillance-public-safety", "china-taiwan-invasion"],
  "inflation-monetary-policy": ["us-national-debt-crisis", "wealth-tax", "housing-affordability-crisis", "central-bank-digital-currency"],
  "ai-superintelligence-timeline": ["ai-risk", "consciousness-ai-systems", "eacc-vs-tech-regulation", "ai-regulation"],
  "global-housing-bubble": ["housing-affordability-crisis", "inflation-monetary-policy", "wealth-tax", "declining-birth-rates"],
  "seed-oils-health": ["ultra-processed-food", "organic-food-health", "obesity-personal-responsibility", "glp1-weight-loss-drugs"],
  "us-national-debt-crisis": ["inflation-monetary-policy", "wealth-tax", "universal-basic-income", "central-bank-digital-currency"],
  "tiktok-brain-rot": ["social-media-mental-health", "social-media-age-limits", "children-smartphone-age", "school-phone-bans"],
  "obesity-personal-responsibility": ["glp1-weight-loss-drugs", "ultra-processed-food", "seed-oils-health", "universal-healthcare"],
  "china-taiwan-invasion": ["us-iran-conflict", "nuclear-proliferation-new-arms-race", "surveillance-public-safety", "iran-war-justification"],
  "return-to-office-productivity": ["remote-work-permanence", "four-day-work-week", "gig-economy-regulation", "loneliness-epidemic"],
  "nuclear-renaissance-smr": ["nuclear-energy-safety", "climate-change", "geoengineering-climate", "space-colonization-feasibility"],
  "loneliness-epidemic": ["social-media-mental-health", "masculinity-crisis", "declining-birth-rates", "return-to-office-productivity"],

  // New topics batch 4 clusters
  "ai-replacing-doctors": ["ai-risk", "ai-job-displacement", "ai-regulation", "universal-healthcare"],
  "global-water-crisis": ["climate-change", "geoengineering-climate", "foreign-aid-effectiveness", "immigration-border-crisis"],
  "sugar-tax-effectiveness": ["obesity-personal-responsibility", "ultra-processed-food", "universal-healthcare", "glp1-weight-loss-drugs"],
  "lab-diamonds-ethics": ["factory-farming-ban", "veganism-environmental-impact", "foreign-aid-effectiveness", "climate-change"],
  "rent-control-effectiveness": ["housing-affordability-crisis", "global-housing-bubble", "minimum-wage-effects", "wealth-tax"],
  "privacy-vs-convenience": ["surveillance-public-safety", "big-tech-antitrust", "ai-deepfakes-truth-collapse", "government-platform-bans"],
  "meritocracy-myth": ["affirmative-action-meritocracy", "billionaire-wealth", "reparations-slavery", "college-value-proposition"],
  "degrowth-economics": ["climate-change", "wealth-tax", "universal-basic-income", "geoengineering-climate"],
};

/**
 * Summaries-only mirror of `getCrossCategoryRelated` in `data/topics.ts`.
 * Returns up to `limit` thematically related topics from DIFFERENT categories,
 * as lightweight `TopicSummary` objects (no pillars/evidence). Same lookup,
 * filter, and slice semantics as the full-data version.
 */
export function getCrossCategoryRelatedSummaries(
  topicId: string,
  currentCategory: TopicCategory,
  limit = 4,
): TopicSummary[] {
  const clusterIds = CROSS_CATEGORY_CLUSTERS[topicId] ?? [];
  return clusterIds
    .map((id) => topicSummaries.find((t) => t.id === id))
    .filter((t): t is TopicSummary => t != null && t.category !== currentCategory)
    .slice(0, limit);
}

export type { TopicCategory, TopicStatus };
