import { CATEGORY_ORDER, topicSummaries } from "@/data/topicIndex";

export const libraryTopicSampler = CATEGORY_ORDER.flatMap((category) =>
  topicSummaries.filter((topic) => topic.category === category).slice(0, 3),
);
