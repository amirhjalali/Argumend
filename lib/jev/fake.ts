/**
 * The offline Jev lane.
 *
 * Two jobs. First, replay recorded answers: `fixtures` is keyed by the `label`
 * a caller passes to `systemOne`, so a fixture survives prompt edits as long as
 * the question ids are stable. Second, answer anything not recorded with a
 * deterministic synthetic value derived from the question id — the same input
 * always produces the same number, which keeps tests and dev runs stable
 * without pretending to be a real judgement.
 *
 * Synthetic choices never pick "none" unless it is the only option, so a
 * pipeline exercised on the fake lane still reaches its composition steps.
 */
import type {
  JevAnswer,
  JevCallOptions,
  JevFixtures,
  JevProvider,
  JevQuestion,
  JevQuestionSet,
  JevResult,
} from "./types";

/** FNV-1a, 32-bit. Small, dependency-free, and stable across runtimes. */
function hash32(input: string): number {
  let value = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    value ^= input.charCodeAt(i);
    value = Math.imul(value, 0x01000193) >>> 0;
  }
  return value >>> 0;
}

function unit(input: string): number {
  return hash32(input) / 0x100000000;
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

export function synthesizeJevAnswer(id: string, question: JevQuestion, seed = ""): JevAnswer {
  const base = `${seed}::${id}`;

  if (question.type === "noul") {
    return { type: "noul", noul: round(unit(`${base}::noul`)) };
  }

  if (question.type === "score") {
    return { type: "score", score: round(unit(`${base}::score`)) };
  }

  const keys = Object.keys(question.criteria);
  if (keys.length === 0) return { type: "choice" };
  const pool = keys.filter((key) => key !== "none");
  const candidates = pool.length > 0 ? pool : keys;
  const choice = candidates[hash32(`${base}::choice`) % candidates.length];
  const confidence = round(0.45 + unit(`${base}::confidence`) * 0.5);

  const others = keys.filter((key) => key !== choice);
  const weights = others.map((key) => unit(`${base}::${key}`) + 0.01);
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  const probabilities: Record<string, number> = { [choice]: confidence };
  others.forEach((key, index) => {
    probabilities[key] = round(((1 - confidence) * weights[index]) / total);
  });

  return { type: "choice", choice, confidence, probabilities };
}

export class FakeJevProvider implements JevProvider {
  readonly lane = "fake" as const;

  constructor(private readonly fixtures: JevFixtures = {}) {}

  /** Labels this provider can replay from recorded answers. */
  get recordedLabels(): string[] {
    return Object.keys(this.fixtures);
  }

  async systemOne(
    state: unknown,
    questions: JevQuestionSet,
    options: JevCallOptions = {},
  ): Promise<JevResult> {
    if (options.signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    const label = options.label;
    const fixture = label ? this.fixtures[label] : undefined;
    const answers: Record<string, JevAnswer> = {};
    for (const [id, question] of Object.entries(questions)) {
      answers[id] = fixture?.answers[id] ?? synthesizeJevAnswer(id, question, label ?? "");
    }

    return {
      model: fixture?.model ?? "fake-jev",
      answers,
      usage: fixture?.usage ?? { input_tokens: 0, output_tokens: 0 },
      latencyMs: 1,
      retries: 0,
      label,
    };
  }
}
