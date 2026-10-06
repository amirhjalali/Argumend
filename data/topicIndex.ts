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

// Data-only module (no imports of its own): safe for the proxy and clients.
import { argumentTopicIds } from "@/lib/argument/topicIds";
import type { TopicCategory, TopicStatus, Verdict } from "@/lib/schemas/topic";

// ---------------------------------------------------------------------------
// Lightweight Topic Summary type
// ---------------------------------------------------------------------------

export interface TopicSummary {
  id: string;
  title: string;
  /** The map's headline as a question, when authored; lists prefer it. */
  question?: string;
  meta_claim: string;
  /** @deprecated — always equal to balance; do not display */
  confidence_score: number;
  balance: number;
  weight: number;
  verdict: Verdict;
  status: TopicStatus;
  category: TopicCategory;
  pillarCount: number;
  evidenceCount: number;
  /** The question the map's first crux asks, as the map page heads it. */
  firstCrux?: string;
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

/**
 * Every map on the site: the pillar maps above plus the new-model
 * (ArgumentGraph) maps, which are not in `topicSummaries`. This is what
 * "N maps" means in copy (home, site description, /topics); TOPIC_COUNT is
 * only the older pillar maps.
 */
export const MAP_COUNT = TOPIC_COUNT + argumentTopicIds.length;

/** Rounded-down MAP_COUNT for copy that should not go stale, e.g. "150+". */
export const MAP_COUNT_LABEL = `${Math.floor(MAP_COUNT / 10) * 10}+`;

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

export type { TopicCategory, TopicStatus };
