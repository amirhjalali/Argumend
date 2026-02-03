/**
 * Helper functions for accessing topic data.
 *
 * Issue #15: Adds helper functions for deep access into topics data structure.
 */

import type { Topic, Pillar, Evidence, Crux } from "@/types/logic";
import { topics } from "./topics";

/**
 * Find a topic by its ID.
 */
export function getTopicById(topicId: string): Topic | undefined {
  return topics.find((t) => t.id === topicId);
}

/**
 * Find a pillar within a topic.
 */
export function getPillarFromTopic(
  topic: Topic,
  pillarId: string
): Pillar | undefined {
  return topic.pillars.find((p) => p.id === pillarId);
}

/**
 * Get a pillar by topic ID and pillar ID.
 */
export function getPillarById(
  topicId: string,
  pillarId: string
): Pillar | undefined {
  const topic = getTopicById(topicId);
  if (!topic) return undefined;
  return getPillarFromTopic(topic, pillarId);
}

/**
 * Get all evidence for a specific side within a topic.
 */
export function getEvidenceBySide(
  topic: Topic,
  side: "for" | "against"
): Evidence[] {
  const topicEvidence =
    topic.evidence?.filter((e) => e.side === side) ?? [];
  const pillarEvidence = topic.pillars.flatMap(
    (p) => p.evidence?.filter((e) => e.side === side) ?? []
  );
  return [...topicEvidence, ...pillarEvidence];
}

/**
 * Get all cruxes from a topic.
 */
export function getAllCruxes(topic: Topic): Crux[] {
  return topic.pillars.map((p) => p.crux);
}

/**
 * Get a crux by its ID within a topic.
 */
export function getCruxById(topic: Topic, cruxId: string): Crux | undefined {
  return topic.pillars.find((p) => p.crux.id === cruxId)?.crux;
}

/**
 * Get total evidence count for a topic.
 */
export function getTotalEvidenceCount(topic: Topic): {
  for: number;
  against: number;
  total: number;
} {
  const forEvidence = getEvidenceBySide(topic, "for");
  const againstEvidence = getEvidenceBySide(topic, "against");
  return {
    for: forEvidence.length,
    against: againstEvidence.length,
    total: forEvidence.length + againstEvidence.length,
  };
}

/**
 * Get pillar titles for a topic.
 */
export function getPillarTitles(topic: Topic): string[] {
  return topic.pillars.map((p) => p.title);
}

/**
 * Check if a topic exists.
 */
export function topicExists(topicId: string): boolean {
  return topics.some((t) => t.id === topicId);
}

/**
 * Get all topic IDs.
 */
export function getAllTopicIds(): string[] {
  return topics.map((t) => t.id);
}

/**
 * Get topics by status.
 */
export function getTopicsByStatus(
  status: "settled" | "contested" | "highly_speculative"
): Topic[] {
  return topics.filter((t) => t.status === status);
}
