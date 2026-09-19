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

// Retries on 429/5xx (the API returned 529 "system_overloaded" during launch week). Latency `ms` is the
// successful attempt only; `retries` records how many attempts failed first.
export async function jev(state: unknown, questions: Record<string, Question>, maxAttempts = 6): Promise<JevResponse & { retries: number }> {
  let retries = 0;
  for (;;) {
    const t0 = performance.now();
    const res = await fetch("https://api.typesafe.ai/v1/systemone", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ state, model: "jev-latest", questions }),
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
    await new Promise((r) => setTimeout(r, Math.min(8000, 500 * 2 ** retries) + Math.random() * 300));
  }
}

export const pct = (n: number | undefined) => (n === undefined ? "  - " : `${Math.round(n * 100)}`.padStart(3) + "%");
