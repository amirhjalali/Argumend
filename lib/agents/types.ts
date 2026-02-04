/**
 * Agent Types
 *
 * Defines the abstraction layer for different types of AI agents
 * that can participate in debates and content analysis.
 */

import type { LLMModel } from "@/types/logic";

/**
 * Types of agents that can participate in debates
 */
export type AgentType = "local-llm" | "moltbook" | "webhook" | "custom";

/**
 * Configuration for an agent
 */
export interface AgentConfig {
  /** Unique identifier for this agent */
  id: string;
  /** Display name for the agent */
  name: string;
  /** Type of agent (determines execution path) */
  type: AgentType;
  /** For local-llm type: which model to use */
  model?: LLMModel;
  /** For webhook type: endpoint URL */
  webhookUrl?: string;
  /** Custom system prompt override */
  systemPrompt?: string;
  /** Optional timeout in milliseconds */
  timeoutMs?: number;
}

/**
 * Response from an agent execution
 */
export interface AgentResponse {
  /** The generated content */
  content: string;
  /** ID of the agent that produced this response */
  agentId: string;
  /** Time taken to generate response */
  latencyMs?: number;
  /** Whether this was a fallback response */
  fallback?: boolean;
  /** Error message if the request failed but was recoverable */
  error?: string;
}

/**
 * Request to execute an agent
 */
export interface AgentExecutionRequest {
  /** The agent configuration to use */
  agent: AgentConfig;
  /** System prompt for the agent */
  systemPrompt: string;
  /** User prompt / main content */
  userPrompt: string;
  /** Optional previous context for conversational agents */
  context?: string;
}

/**
 * Predefined agent configurations for common use cases
 */
export const DEFAULT_JUDGE_AGENTS: AgentConfig[] = [
  {
    id: "judge-claude",
    name: "Claude Judge",
    type: "local-llm",
    model: "claude",
  },
  {
    id: "judge-gpt4",
    name: "GPT-4 Judge",
    type: "local-llm",
    model: "gpt-4",
  },
  {
    id: "judge-gemini",
    name: "Gemini Judge",
    type: "local-llm",
    model: "gemini",
  },
];
