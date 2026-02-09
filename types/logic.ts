// Re-export all types from Zod schemas
export type {
  EvidenceWeight,
  Evidence,
  Crux,
  IconName,
  Pillar,
  Reference,
  Question,
  TopicCategory,
  TopicStatus,
  Topic,
} from "@/lib/schemas/topic";

export {
  calculateEvidenceScore,
  getVerdictLabel,
  computeConfidenceScore,
} from "@/lib/schemas/topic";

// Debate mode types (not part of topic schema)
export type ArgumentView = "logic-map" | "scales" | "debate";

export type LLMModel = "claude" | "gpt-4" | "gemini" | "grok";

export interface Debater {
  readonly id: string;
  readonly name: string;
  readonly model: LLMModel;
  readonly side: "for" | "against";
  readonly avatar?: string;
}

export interface DebateArgument {
  readonly id: string;
  readonly debaterId: string;
  readonly content: string;
  readonly round: number;
  readonly timestamp: number;
  readonly referencedEvidence?: readonly string[]; // IDs of Evidence referenced
}

export interface DebateRound {
  readonly roundNumber: number;
  readonly forArgument: DebateArgument;
  readonly againstArgument: DebateArgument;
  readonly summary?: string;
}

export interface DebateState {
  readonly topicId: string;
  readonly forDebater: Debater;
  readonly againstDebater: Debater;
  readonly rounds: readonly DebateRound[];
  readonly currentRound: number;
  readonly status: "setup" | "in_progress" | "completed";
  readonly winner?: "for" | "against" | "draw";
}
