/**
 * Lightweight public index for new-model (ArgumentGraph) topics.
 *
 * Keep this module data-only. It is safe to import from the route proxy and
 * client-side discovery surfaces because it does not pull in draft graph JSON,
 * Zod schemas, or the crux engine that `lib/argument/draftTopics.ts` loads.
 */
const REGISTERED_ARGUMENT_TOPIC_IDS = [
  "ai-mass-unemployment",
  "capitalism-after-ai",
  "us-israel-support",
] as const;

export type ArgumentTopicId = (typeof REGISTERED_ARGUMENT_TOPIC_IDS)[number];
export const argumentTopicIds: readonly string[] = REGISTERED_ARGUMENT_TOPIC_IDS;

export const argumentTopicIndex = [
  {
    id: REGISTERED_ARGUMENT_TOPIC_IDS[0],
    title: "Will AI cause mass unemployment?",
    tagline:
      "Employment among 22–25-year-olds in the most AI-exposed occupations fell 16% while unemployment sat near 4%. Which number matters? The whole fight in five questions.",
    aliases: [
      "artificial intelligence job loss",
      "AI jobs automation employment workforce",
    ],
  },
  {
    id: REGISTERED_ARGUMENT_TOPIC_IDS[1],
    title: "Can capitalism survive AI?",
    tagline:
      "Labor's share of income has declined globally over four decades, and the U.S. index is down since 2000. Four camps ask what AI means for the wage channel — and what “survive” even means.",
    aliases: [
      "capitalism after artificial intelligence",
      "labor share wages markets ownership UBI",
    ],
  },
  {
    id: REGISTERED_ARGUMENT_TOPIC_IDS[2],
    title: "Should the U.S. reduce its support for Israel?",
    tagline:
      "$38 billion pledged for FY2019–28, 100+ military sales reported from October 2023 through early March 2024, and four positions split by leverage, legal accountability, and civilian harm.",
    aliases: [
      "United States Israel aid",
      "US military support arms sales Gaza Palestine conditional aid",
    ],
  },
] as const;
