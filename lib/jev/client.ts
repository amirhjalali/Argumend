/**
 * Typed client for TypeSafe AI's Jev "System One" endpoint.
 *
 * Jev answers typed questions (Choice / Noul / Score) about a `state` and
 * returns calibrated probabilities with no generated text. The hard-won rules
 * from `docs/reviews/2026-09-16-jev-typesafe-probe.md` are about *composition*,
 * not transport, and they live in `lib/mapReply/`; this file only handles the
 * wire: auth, a pinned model, a per-attempt deadline, retries on 429/5xx, and
 * a per-process daily token ceiling.
 *
 * The key is read from `process.env.TYPESAFE_API_KEY` and from nowhere else. It
 * is never logged, never echoed into an error message, and never leaves the
 * Authorization header. Request bodies are never logged either: they carry the
 * text a user pasted.
 */
import {
  isJevBudgetExhausted,
  recordJevTokens,
  resolveDailyTokenCeiling,
} from "./budget";
import { JevError } from "./errors";
import { FakeJevProvider } from "./fake";
import type {
  JevAnswer,
  JevCallOptions,
  JevFixtures,
  JevProvider,
  JevQuestionSet,
  JevResponse,
  JevResult,
} from "./types";

export const JEV_ENDPOINT = "https://api.typesafe.ai/v1/systemone";

/**
 * Pinned, not aliased. `jev-latest` moves without notice and every threshold in
 * `lib/mapReply/constants.ts` was tuned against this version; a silent model
 * bump would move the numbers under them. `JEV_MODEL` overrides it deliberately.
 */
export const JEV_DEFAULT_MODEL = "jev-1.13.0";

/** Per attempt. The vendor's p99 is well under a second; 10s is already generous. */
export const JEV_REQUEST_TIMEOUT_MS = 10_000;
/** Safety net across all attempts of one call, so a retry storm cannot hang a request. */
export const JEV_TOTAL_TIMEOUT_MS = 45_000;
/** One first attempt plus five retries: the API returned 529s repeatedly in launch week. */
export const JEV_DEFAULT_MAX_ATTEMPTS = 6;
/** Retry-After is honoured but never allowed to park a request handler. */
export const JEV_MAX_RETRY_AFTER_MS = 10_000;

export function resolveJevModel(): string {
  const configured = process.env.JEV_MODEL?.trim();
  return configured ? configured : JEV_DEFAULT_MODEL;
}

export interface HttpJevProviderOptions {
  apiKey: string;
  endpoint?: string;
  model?: string;
  /** Per attempt. */
  timeoutMs?: number;
  /** Across all attempts of one call. */
  totalTimeoutMs?: number;
  maxAttempts?: number;
  /** Injectable for tests; defaults to the global fetch. */
  fetchImpl?: typeof fetch;
  /** Injectable for tests; defaults to setTimeout-based sleeping. */
  sleepImpl?: (ms: number) => Promise<void>;
}

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Exponential backoff with jitter, matching the probe harness that survived the
 * launch-week 529s. Capped so one retry cannot eat the whole call budget.
 */
export function backoffDelayMs(attempt: number, random = Math.random): number {
  return Math.min(4_000, 400 * 2 ** attempt) + Math.floor(random() * 250);
}

/** `Retry-After` is either delta-seconds or an HTTP date. Both are clamped. */
export function parseRetryAfterMs(header: string | null, now: number = Date.now()): number | null {
  if (!header) return null;
  const trimmed = header.trim();
  if (!trimmed) return null;

  const seconds = Number(trimmed);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.min(JEV_MAX_RETRY_AFTER_MS, Math.round(seconds * 1000));
  }

  const date = Date.parse(trimmed);
  if (Number.isNaN(date)) return null;
  return Math.min(JEV_MAX_RETRY_AFTER_MS, Math.max(0, date - now));
}

function isRetryableStatus(status: number): boolean {
  // 529 is TypeSafe's "system_overloaded"; it is covered by the >= 500 arm.
  return status === 408 || status === 429 || status >= 500;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/** Validate the wire shape without trusting any of it. */
export function parseJevResponse(payload: unknown): JevResponse {
  const root = asRecord(payload);
  const rawAnswers = root ? asRecord(root.answers) : null;
  if (!root || !rawAnswers) {
    throw new JevError("JEV_BAD_RESPONSE", "Jev response had no answers object.");
  }

  const answers: Record<string, JevAnswer> = {};
  for (const [id, value] of Object.entries(rawAnswers)) {
    const answer = asRecord(value);
    if (!answer) {
      throw new JevError("JEV_BAD_RESPONSE", `Jev answer "${id}" was not an object.`);
    }
    answers[id] = answer as unknown as JevAnswer;
  }

  const usage = asRecord(root.usage);
  return {
    model: typeof root.model === "string" ? root.model : "unknown",
    answers,
    usage: {
      input_tokens: typeof usage?.input_tokens === "number" ? usage.input_tokens : 0,
      output_tokens: typeof usage?.output_tokens === "number" ? usage.output_tokens : 0,
    },
  };
}

export class HttpJevProvider implements JevProvider {
  readonly lane = "http" as const;

  private readonly apiKey: string;
  private readonly endpoint: string;
  private readonly model: string;
  private readonly timeoutMs: number;
  private readonly totalTimeoutMs: number;
  private readonly maxAttempts: number;
  private readonly fetchImpl: typeof fetch;
  private readonly sleepImpl: (ms: number) => Promise<void>;

  constructor(options: HttpJevProviderOptions) {
    if (!options.apiKey) {
      throw new JevError("JEV_NOT_CONFIGURED", "TYPESAFE_API_KEY is missing.");
    }
    this.apiKey = options.apiKey;
    this.endpoint = options.endpoint ?? JEV_ENDPOINT;
    this.model = options.model ?? resolveJevModel();
    this.timeoutMs = options.timeoutMs ?? JEV_REQUEST_TIMEOUT_MS;
    this.totalTimeoutMs = options.totalTimeoutMs ?? JEV_TOTAL_TIMEOUT_MS;
    this.maxAttempts = Math.max(1, options.maxAttempts ?? JEV_DEFAULT_MAX_ATTEMPTS);
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
    this.sleepImpl = options.sleepImpl ?? defaultSleep;
  }

  async systemOne(
    state: unknown,
    questions: JevQuestionSet,
    options: JevCallOptions = {},
  ): Promise<JevResult> {
    if (Object.keys(questions).length === 0) {
      throw new JevError("JEV_REQUEST_FAILED", "A Jev request needs at least one question.");
    }
    if (isJevBudgetExhausted()) {
      throw new JevError(
        "JEV_BUDGET_EXCEEDED",
        `Daily Jev token ceiling of ${resolveDailyTokenCeiling()} reached for this process.`,
      );
    }

    // Two clocks: one per attempt, one across the whole call so a retry storm
    // cannot outlive the page request that started it.
    const total = AbortSignal.timeout(options.totalTimeoutMs ?? this.totalTimeoutMs);
    const perAttemptMs = options.timeoutMs ?? this.timeoutMs;
    const maxAttempts = Math.max(1, options.maxAttempts ?? this.maxAttempts);
    const body = JSON.stringify({ state, model: this.model, questions });

    let retries = 0;
    for (;;) {
      const attemptDeadline = AbortSignal.timeout(perAttemptMs);
      const signals: AbortSignal[] = [total, attemptDeadline];
      if (options.signal) signals.push(options.signal);
      const signal = AbortSignal.any(signals);

      const startedAt = performance.now();
      let response: Response;
      try {
        response = await this.fetchImpl(this.endpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body,
          signal,
        });
      } catch (error) {
        if (options.signal?.aborted) throw error;
        if (total.aborted) throw new JevError("JEV_TIMEOUT");
        // A per-attempt timeout is retryable; the total budget is not.
        if (retries + 1 >= maxAttempts) {
          throw new JevError(
            attemptDeadline.aborted ? "JEV_TIMEOUT" : "JEV_UNAVAILABLE",
            attemptDeadline.aborted ? undefined : "Jev could not be reached.",
          );
        }
        retries += 1;
        await this.sleepImpl(backoffDelayMs(retries));
        continue;
      }

      const latencyMs = Math.round(performance.now() - startedAt);

      if (response.ok) {
        let payload: unknown;
        try {
          payload = await response.json();
        } catch {
          throw new JevError("JEV_BAD_RESPONSE", "Jev returned invalid JSON.");
        }
        const parsed = parseJevResponse(payload);
        recordJevTokens(parsed.usage.input_tokens + parsed.usage.output_tokens);
        return { ...parsed, latencyMs, retries, label: options.label };
      }

      const retryAfterMs = parseRetryAfterMs(response.headers.get("retry-after"));
      // The error body can echo the request, which carries pasted text.
      await response.body?.cancel().catch(() => undefined);

      if (!isRetryableStatus(response.status) || retries + 1 >= maxAttempts) {
        throw new JevError(
          isRetryableStatus(response.status) ? "JEV_UNAVAILABLE" : "JEV_REQUEST_FAILED",
          `Jev responded with HTTP ${response.status}.`,
          response.status,
        );
      }

      retries += 1;
      await this.sleepImpl(retryAfterMs ?? backoffDelayMs(retries));
      if (total.aborted) throw new JevError("JEV_TIMEOUT");
    }
  }
}

// ---------------------------------------------------------------------------
// Lane selection
// ---------------------------------------------------------------------------

/** Server flag. Off by default: the HTTP lane posts pasted text to a third party. */
export function isJevMapReplyEnabled(): boolean {
  return process.env.ENABLE_JEV_MAP_REPLY === "true";
}

/** The only place the key is read. Returns undefined rather than an empty string. */
export function jevApiKey(): string | undefined {
  const key = process.env.TYPESAFE_API_KEY?.trim();
  return key ? key : undefined;
}

/**
 * `http` only when the flag is on and a key exists, so a misconfigured
 * deployment degrades to fixtures instead of failing at import time.
 * `ARGUMEND_JEV_PROVIDER` forces a lane for local runs and tests.
 */
export function resolveJevLane(): "http" | "fake" {
  const override = process.env.ARGUMEND_JEV_PROVIDER?.trim();
  if (override === "fake") return "fake";
  if (override === "http") return jevApiKey() ? "http" : "fake";
  return isJevMapReplyEnabled() && jevApiKey() ? "http" : "fake";
}

export interface GetJevProviderOptions {
  fixtures?: JevFixtures;
  timeoutMs?: number;
  totalTimeoutMs?: number;
  maxAttempts?: number;
}

/** Returns the fake lane whenever the flag is off or no key is configured. */
export function getJevProvider(options: GetJevProviderOptions = {}): JevProvider {
  const key = jevApiKey();
  if (resolveJevLane() === "http" && key) {
    return new HttpJevProvider({
      apiKey: key,
      timeoutMs: options.timeoutMs,
      totalTimeoutMs: options.totalTimeoutMs,
      maxAttempts: options.maxAttempts,
    });
  }
  return new FakeJevProvider(options.fixtures);
}

export {
  JEV_DEFAULT_DAILY_TOKEN_CEILING,
  isJevBudgetExhausted,
  jevTokensSpentToday,
  recordJevTokens,
  resetJevBudget,
  resolveDailyTokenCeiling,
} from "./budget";
export { JevError, isJevError, jevErrorMessage } from "./errors";
export type { JevErrorCode } from "./errors";
export { FakeJevProvider } from "./fake";
export type * from "./types";
