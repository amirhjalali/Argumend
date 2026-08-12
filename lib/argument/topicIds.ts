/**
 * Ids of new-model (ArgumentGraph) topics.
 *
 * Kept as a standalone constant module so the route proxy (middleware bundle)
 * can allowlist these ids without pulling in the draft JSON, Zod schemas, or
 * the crux engine that lib/argument/draftTopics.ts loads.
 */
export const argumentTopicIds = ["ai-mass-unemployment", "capitalism-after-ai"];
