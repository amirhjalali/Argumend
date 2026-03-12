/**
 * Canonical debate message types.
 *
 * DebateMessage — the full shape used by UI components and persistence.
 * DebateMessageInput — the minimal shape sent to judge/debate APIs.
 */

import type { LLMModel } from "./logic";

/** Full debate message used in components and storage. */
export interface DebateMessage {
  id: string;
  side: "for" | "against";
  model: LLMModel;
  content: string;
  round: number;
}

/** Minimal shape for API inputs (judging, prompt building). */
export interface DebateMessageInput {
  side: "for" | "against";
  content: string;
  round: number;
}
