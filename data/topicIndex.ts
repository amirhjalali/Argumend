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
}

/** Pre-computed summaries — ~17KB vs ~500KB for the full topics array. */
export const topicSummaries: TopicSummary[] = summaries as TopicSummary[];

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
export const featuredTopicId = "social-media-mental-health";

/** Short editorial hook explaining why this topic is featured right now. */
export const featuredReason =
  "The Surgeon General just called for warning labels on social media. Where does the evidence actually land?";

export type { TopicCategory, TopicStatus };
