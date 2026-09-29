/**
 * Wire types for TypeSafe AI's Jev "System One" endpoint.
 *
 * Jev is non-generative: it returns typed decisions with calibrated
 * probabilities and no text at all. A request is a `state` (arbitrary JSON the
 * questions refer to by path) plus a map of question id -> question. A response
 * is a map of the same ids -> answer.
 *
 * Field names below mirror the API exactly (snake_case in `usage`); everything
 * this repo adds is camelCase and lives on `JevResult`.
 */

/** Pick exactly one option. `criteria` maps option key -> what that option means. */
export interface JevChoiceQuestion {
  type: "choice";
  instructions: string;
  criteria: Record<string, string>;
}

/** A calibrated yes/no. `criteria` optionally spells out what true and false mean. */
export interface JevNoulQuestion {
  type: "noul";
  instructions: string;
  criteria?: { true: string; false: string };
}

/** A 0–1 score against an ordered list of anchors. */
export interface JevScoreQuestion {
  type: "score";
  instructions: string;
  criteria: string[];
}

export type JevQuestion = JevChoiceQuestion | JevNoulQuestion | JevScoreQuestion;

/** Question id -> question. Ids come back unchanged on the answer side. */
export type JevQuestionSet = Record<string, JevQuestion>;

export interface JevAnswer {
  type: string;
  /** Choice answers only: the winning option key. */
  choice?: string;
  /** Choice answers only: probability mass per option key. */
  probabilities?: Record<string, number>;
  /** Choice answers only: probability of the winning option, 0–1. */
  confidence?: number;
  /** Noul answers only: probability that the statement is true, 0–1. */
  noul?: number;
  /** Score answers only: 0–1. */
  score?: number;
}

export interface JevUsage {
  input_tokens: number;
  output_tokens: number;
}

export interface JevResponse {
  model: string;
  answers: Record<string, JevAnswer>;
  usage: JevUsage;
}

export interface JevResult extends JevResponse {
  /** Wall time of the successful attempt only, in milliseconds. */
  latencyMs: number;
  /** How many attempts failed before the successful one. */
  retries: number;
  /** The caller's label for this request, echoed back for fixtures and logs. */
  label?: string;
}

export interface JevCallOptions {
  /**
   * A stable name for this request ("topic-select", "turns-0", …). The HTTP
   * lane only logs it; the fake lane uses it to find recorded fixtures.
   */
  label?: string;
  /** Caller cancellation, merged with the client's own deadline. */
  signal?: AbortSignal;
  /** Budget for one attempt. */
  timeoutMs?: number;
  /** Budget across every attempt of this call. */
  totalTimeoutMs?: number;
  /** Total attempts including the first. */
  maxAttempts?: number;
}

/**
 * The seam the pipeline talks to. `FakeJevProvider` implements it from
 * fixtures so tests and offline runs never touch the network.
 */
export interface JevProvider {
  readonly lane: "http" | "fake";
  systemOne(
    state: unknown,
    questions: JevQuestionSet,
    options?: JevCallOptions,
  ): Promise<JevResult>;
}

/** Recorded responses, keyed by the `label` passed to `systemOne`. */
export type JevFixtures = Record<string, JevResponse>;
