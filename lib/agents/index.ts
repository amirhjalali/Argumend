/**
 * Agent Definitions
 *
 * Centralized definitions for AI agents that represent Argumend
 * across different platforms and contexts.
 */

export {
  CRUXTACEAN_SYSTEM_PROMPT,
  CRUXTACEAN_PROFILE,
  buildCruxtaceanPrompt,
  type CruxtaceanContext,
} from "./cruxtacean";

export { generateCruxtaceanResponse } from "./generate";

export { executeAgent, executeAgentsInParallel } from "./executor";
export { DEFAULT_JUDGE_AGENTS } from "./types";
export type {
  AgentType,
  AgentConfig,
  AgentResponse,
  AgentExecutionRequest,
} from "./types";
