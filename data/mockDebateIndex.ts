/**
 * Lightweight availability index for pre-generated example debates.
 *
 * Keep the 690 KB mock debate corpus behind a dynamic import. Debate setup only
 * needs to know whether the current topic has an example available.
 */
export const MOCK_DEBATE_TOPIC_IDS = [
  "moon-landing",
  "simulation-hypothesis",
  "ai-risk",
  "universal-healthcare",
  "free-will",
  "drug-decriminalization",
  "universal-basic-income",
  "gene-editing-embryos",
  "psychedelics-mental-health",
  "cancel-culture",
  "nuclear-energy-safety",
  "gun-control-effectiveness",
  "death-penalty-deterrence",
  "wealth-tax",
  "social-media-mental-health",
  "police-reform",
  "cryptocurrency-value",
  "ai-content-labeling",
  "space-colonization-feasibility",
  "lab-grown-meat",
  "remote-work-permanence",
  "college-value-proposition",
  "minimum-wage-effects",
  "immigration-wage-impact",
  "factory-farming-ban",
  "mandatory-voting",
  "social-media-age-limits",
  "big-tech-antitrust",
  "billionaire-wealth",
  "ev-environmental-impact",
  "homeschooling-effectiveness",
  "organic-food-health",
  "media-bias-democracy",
  "open-borders",
  "reparations-slavery",
  "foreign-aid-effectiveness",
  "space-exploration-value",
  "gig-economy-regulation",
  "surveillance-public-safety",
  "electoral-college-reform",
  "veganism-environmental-impact",
  "consciousness-ai-systems",
  "meaning-without-religion",
  "us-iran-conflict",
  "lab-leak-theory",
  "epstein-files",
  "minneapolis-shooting",
  "climate-change",
  "lab-grown-meat-adoption",
  "standardized-testing-debate",
] as const;

const mockDebateTopicIds = new Set<string>(MOCK_DEBATE_TOPIC_IDS);

export function hasMockDebate(topicId: string | undefined): boolean {
  return Boolean(topicId && mockDebateTopicIds.has(topicId));
}
