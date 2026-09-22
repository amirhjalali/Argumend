/**
 * The map-reply pipeline: pasted thread in, composed Argumend reply out.
 *
 * Four Jev stages, all of them atomic questions composed in code:
 *   A. topic selection — a lexical shortlist of eight, then one Choice plus "none"
 *   B. per-turn routing — section, stance, fallacy, factual, eight turns per request
 *   C. thread-level shape — pattern plus four Nouls, one request
 *   D. crux touch — one Noul per section crux, one request
 *
 * B, C and D run in parallel once a map is chosen. The pipeline never asks who
 * is right and never composes a winner.
 *
 * Nothing leaves this process un-scrubbed: emails, phone numbers and @handles
 * are replaced with placeholders and every speaker becomes "Speaker n" before
 * any state is built. The real names are put back when the reply is composed.
 * The pasted text is never written to a database and never logged.
 */
import { loadTopicById } from "@/data/topicLoader";
import type { TopicSummary } from "@/data/topicIndex";
import type { Topic } from "@/lib/schemas/topic";
import type { JevAnswer, JevProvider, JevResult } from "@/lib/jev/types";
import { chunkTurns } from "./chunk";
import { composeMapReply, composeNoMatch } from "./compose";
import {
  MAP_REPLY_LIMITS,
  MAP_REPLY_VERSION,
  resolveTopicConfidenceThreshold,
} from "./constants";
import { parseThread } from "./parse";
import { prefilterTopics, type PrefilterCandidate } from "./prefilter";
import {
  NONE_OPTION,
  buildCruxQuestions,
  buildCruxState,
  buildThreadQuestions,
  buildThreadState,
  buildTopicSelectQuestions,
  buildTopicSelectState,
  buildTurnChunkState,
  buildTurnQuestions,
} from "./questions";
import { renderMapReplyMarkdown, renderNoMatchMarkdown } from "./render";
import { scrubThread, type ScrubCounts } from "./scrub";
import type {
  MapReplyExecution,
  MapReplyResult,
  MapReplyTimings,
  MapReplyTopicChoice,
} from "./types";

export interface RunMapReplyOptions {
  text: string;
  provider: JevProvider;
  signal?: AbortSignal;
  /** Overrides the env value and the 0.5 default. */
  topicConfidenceThreshold?: number;
  /** Defaults to the full topic index; tests pass a slice. */
  summaries?: readonly TopicSummary[];
  /** Defaults to the per-topic lazy loader. */
  loadTopic?: (topicId: string) => Promise<Topic | null>;
  candidateLimit?: number;
}

function elapsed(from: number): number {
  return Math.round(performance.now() - from);
}

async function timed<T>(run: () => Promise<T>): Promise<[T, number]> {
  const startedAt = performance.now();
  const value = await run();
  return [value, elapsed(startedAt)];
}

function summarizeExecution(
  lane: JevProvider["lane"],
  results: readonly JevResult[],
  timings: MapReplyTimings,
  redactions: ScrubCounts,
): MapReplyExecution {
  return {
    version: MAP_REPLY_VERSION,
    lane,
    redactions,
    model: results.find((result) => result.model && result.model !== "unknown")?.model ?? "unknown",
    requests: results.length,
    retries: results.reduce((sum, result) => sum + result.retries, 0),
    usage: {
      inputTokens: results.reduce((sum, result) => sum + result.usage.input_tokens, 0),
      outputTokens: results.reduce((sum, result) => sum + result.usage.output_tokens, 0),
    },
    timings,
  };
}

export async function runMapReply(options: RunMapReplyOptions): Promise<MapReplyResult> {
  const { text, provider, signal } = options;
  const startedAt = performance.now();
  const characterCount = text.length;
  const threshold = resolveTopicConfidenceThreshold(options.topicConfidenceThreshold);
  const loadTopic = options.loadTopic ?? loadTopicById;

  const parseStartedAt = performance.now();
  const parsed = parseThread(text);
  // Redact before any state is built, so nothing downstream can leak an
  // identifier by accident.
  const scrubbed = scrubThread(parsed);
  const parseMs = elapsed(parseStartedAt);

  const timings: MapReplyTimings = {
    parseMs,
    prefilterMs: 0,
    topicMs: 0,
    turnsMs: 0,
    threadMs: 0,
    cruxMs: 0,
    totalMs: 0,
  };
  const results: JevResult[] = [];

  const noMatch = (
    reason: "no_turns" | "no_candidates" | "low_confidence" | "map_unavailable",
    message: string,
    candidates: PrefilterCandidate[],
    topicChoice: MapReplyTopicChoice | null,
  ) => {
    timings.totalMs = elapsed(startedAt);
    return composeNoMatch({
      reason,
      message,
      parsed,
      characterCount,
      candidates,
      topicChoice,
      execution: summarizeExecution(provider.lane, results, timings, scrubbed.redactions),
      renderMarkdown: renderNoMatchMarkdown,
    });
  };

  if (parsed.turns.length === 0) {
    return noMatch("no_turns", "There was no readable text in this paste.", [], null);
  }

  const transcript = scrubbed.transcript;

  const prefilterStartedAt = performance.now();
  // The shortlist is computed locally, but on the same text Jev will see.
  const candidates = prefilterTopics(transcript, {
    limit: options.candidateLimit ?? MAP_REPLY_LIMITS.prefilterCandidates,
    summaries: options.summaries,
  });
  timings.prefilterMs = elapsed(prefilterStartedAt);

  if (candidates.length === 0) {
    return noMatch("no_candidates", "No Argumend map shares any wording with this thread.", [], null);
  }

  // Stage A — one real Choice over the shortlist plus "none".
  const [topicResult, topicMs] = await timed(() =>
    provider.systemOne(
      buildTopicSelectState(transcript, candidates),
      buildTopicSelectQuestions(candidates),
      { label: "topic-select", signal },
    ),
  );
  timings.topicMs = topicMs;
  results.push(topicResult);

  const topicAnswer = topicResult.answers.topic;
  const topicChoice: MapReplyTopicChoice = {
    choice: typeof topicAnswer?.choice === "string" ? topicAnswer.choice : NONE_OPTION,
    confidence: typeof topicAnswer?.confidence === "number" ? topicAnswer.confidence : 0,
    probabilities: topicAnswer?.probabilities ?? {},
    threshold,
  };

  const chosen = candidates.find((candidate) => candidate.id === topicChoice.choice);
  if (!chosen || topicChoice.choice === NONE_OPTION) {
    return noMatch(
      "low_confidence",
      "None of the closest maps is what this thread is arguing about.",
      candidates,
      topicChoice,
    );
  }
  if (topicChoice.confidence < threshold) {
    return noMatch(
      "low_confidence",
      "The closest map was not a confident enough match to show.",
      candidates,
      topicChoice,
    );
  }

  const topic = await loadTopic(chosen.id);
  if (!topic) {
    return noMatch("map_unavailable", "That map could not be loaded.", candidates, topicChoice);
  }

  // Stages B, C and D in parallel. Each turn chunk carries only its own turns.
  const chunks = chunkTurns(parsed.substantive);
  const [[turnResults, turnsMs], [threadResult, threadMs], [cruxResult, cruxMs]] = await Promise.all([
    timed(() =>
      Promise.all(
        chunks.map((chunk, chunkIndex) => {
          const scrubbedChunk = chunk.map(
            (turn) => scrubbed.byIndex.get(turn.index) ?? { index: turn.index, alias: "Speaker 1", text: "" },
          );
          const questions = Object.assign(
            {},
            ...chunk.map((turn, local) => buildTurnQuestions(local, turn.index, topic.pillars)),
          );
          return provider.systemOne(
            buildTurnChunkState(topic.meta_claim, topic.pillars, scrubbedChunk),
            questions,
            { label: `turns-${chunkIndex}`, signal },
          );
        }),
      ),
    ),
    timed(() =>
      provider.systemOne(
        buildThreadState(topic.meta_claim, transcript),
        buildThreadQuestions(),
        { label: "thread", signal },
      ),
    ),
    timed(() =>
      provider.systemOne(buildCruxState(transcript, topic.pillars), buildCruxQuestions(topic.pillars), {
        label: "crux",
        signal,
      }),
    ),
  ]);
  timings.turnsMs = turnsMs;
  timings.threadMs = threadMs;
  timings.cruxMs = cruxMs;
  results.push(...turnResults, threadResult, cruxResult);

  const turnAnswers: Record<string, JevAnswer> = Object.assign(
    {},
    ...turnResults.map((result) => result.answers),
  );
  timings.totalMs = elapsed(startedAt);

  return composeMapReply({
    topic,
    parsed,
    characterCount,
    candidates,
    topicChoice,
    turnAnswers,
    threadAnswers: threadResult.answers,
    cruxAnswers: cruxResult.answers,
    execution: summarizeExecution(provider.lane, results, timings, scrubbed.redactions),
    renderMarkdown: renderMapReplyMarkdown,
  });
}
