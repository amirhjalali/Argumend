/**
 * Mock debate data for demonstration purposes.
 *
 * Issue #2: Extracted from DebateView.tsx:61-92
 *
 * The raw data lives in mockDebates.json (~700 KB) so that bundlers can
 * tree-shake or lazy-load it instead of inlining it into every client chunk.
 */

import type { DebateMessage } from "@/types/debate";
import type { LLMModel } from "@/types/logic";
import _data from "./mockDebates.json";

export type { DebateMessage } from "@/types/debate";

/**
 * Pre-generated debate exchanges indexed by topic ID.
 * Used for demonstration when API calls are not available.
 */
export const MOCK_DEBATES: Record<string, DebateMessage[]> = _data as Record<
  string,
  DebateMessage[]
>;

/**
 * Check if mock debate data exists for a topic.
 */
export function hasMockDebate(topicId: string | undefined): boolean {
  return Boolean(topicId && MOCK_DEBATES[topicId]);
}

/**
 * Get mock debate messages for a topic.
 */
export function getMockDebate(topicId: string): DebateMessage[] {
  return MOCK_DEBATES[topicId] ?? [];
}

/**
 * Get the default models used in mock debates.
 */
export function getMockDebateModels(): {
  forModel: LLMModel;
  againstModel: LLMModel;
} {
  return {
    forModel: "claude",
    againstModel: "gpt-4",
  };
}

/**
 * Get the number of rounds in a mock debate.
 */
export function getMockDebateRounds(topicId: string): number {
  const debate = MOCK_DEBATES[topicId];
  if (!debate || debate.length === 0) return 0;
  return Math.max(...debate.map((m) => m.round));
}
