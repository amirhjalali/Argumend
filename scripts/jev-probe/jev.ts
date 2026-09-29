// Minimal Jev client over the HTTP API (no SDK install needed).
export type Question =
  | { type: "noul"; instructions: unknown; criteria?: { true?: string; false?: string } }
  | { type: "choice"; instructions: unknown; criteria: Record<string, string | null> }
  | { type: "score"; instructions: unknown; criteria: string[] };

export interface Answer {
  type: string;
  choice?: string;
  confidence?: number;
  probabilities?: Record<string, number>;
  noul?: number;
  score?: number;
}

export interface JevResponse {
  model: string;
  answers: Record<string, Answer>;
  usage: { input_tokens: number; output_tokens: number };
  ms: number;
}

const key = process.env.TYPESAFE_API_KEY;
if (!key) throw new Error("TYPESAFE_API_KEY missing");

export interface JevOptions {
  maxAttempts?: number;
  /**
   * Model id sent to the API. `jev-latest` is an alias that moves without
   * notice, so anything whose numbers are being compared over time — a gate
   * threshold, a stored override — should pin an exact version and record the
   * `model` the response returns.
   */
  model?: string;
}

/** Seconds to wait from a Retry-After header (delta-seconds or HTTP date), capped. */
function retryAfterMs(header: string | null): number | undefined {
  if (!header) return undefined;
  const seconds = Number(header);
  if (Number.isFinite(seconds) && seconds >= 0) return Math.min(30_000, seconds * 1000);
  const when = Date.parse(header);
  if (Number.isNaN(when)) return undefined;
  return Math.min(30_000, Math.max(0, when - Date.now()));
}

// Retries on 429/5xx (the API returned 529 "system_overloaded" during launch week, and the status page
// reported intermittent instability on 2026-09-21). Retry-After is honoured when the API sends one.
// Latency `ms` is the successful attempt only; `retries` records how many attempts failed first.
export async function jev(
  state: unknown,
  questions: Record<string, Question>,
  options: JevOptions = {},
): Promise<JevResponse & { retries: number }> {
  const maxAttempts = options.maxAttempts ?? 6;
  const model = options.model ?? "jev-latest";
  let retries = 0;
  for (;;) {
    const t0 = performance.now();
    const res = await fetch("https://api.typesafe.ai/v1/systemone", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ state, model, questions }),
    });
    const ms = Math.round(performance.now() - t0);
    if (res.ok) {
      const json = (await res.json()) as Omit<JevResponse, "ms">;
      return { ...json, ms, retries };
    }
    const body = await res.text();
    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || retries + 1 >= maxAttempts) throw new Error(`HTTP ${res.status}: ${body}`);
    retries += 1;
    const backoff = Math.min(8000, 500 * 2 ** retries) + Math.random() * 300;
    await new Promise((r) => setTimeout(r, retryAfterMs(res.headers.get("retry-after")) ?? backoff));
  }
}

export const pct = (n: number | undefined) => (n === undefined ? "  - " : `${Math.round(n * 100)}`.padStart(3) + "%");
