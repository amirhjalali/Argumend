/**
 * Every question the map-reply pipeline asks Jev, and the state each one reads.
 *
 * Four rules are load-bearing here. Three come from the probe review:
 *   1. Atomic questions, composed in code. The eleven-way Choice lost to
 *      decomposed Nouls; the "best crux" Choice contradicted its own
 *      contestedness Noul. So nothing here asks for a judgement that the
 *      composition step can build from simpler ones.
 *   2. Small state. A turn chunk carries its own turns and nothing else.
 *   3. Jev is never asked who is right, who won, or who argued better.
 *
 * The fourth is a safety boundary. TypeSafe documents that injected
 * instructions and misleading framing in the state can influence outputs, so
 * every instruction this file produces is a fixed string built from map data
 * and never from the paste; the pasted text appears only under the state keys
 * named `pasted_thread` and `pasted_turns`, and nothing read from the paste is
 * ever interpolated into an `instructions` field. That does not make injection
 * impossible — a thread can still argue in a way that tilts a probe — but it
 * keeps the instruction channel and the data channel separate.
 */
import type { Pillar } from "@/lib/schemas/topic";
import type { JevQuestionSet } from "@/lib/jev/types";
import { MAP_REPLY_PATTERNS } from "./constants";
import type { PrefilterCandidate } from "./prefilter";
import type { ScrubbedTurn } from "./scrub";

export const NONE_OPTION = "none";

function sectionCriteria(pillars: readonly Pillar[]): Record<string, string> {
  const criteria: Record<string, string> = {};
  for (const pillar of pillars) {
    criteria[pillar.id] = `${pillar.title}: ${pillar.short_summary}`;
  }
  criteria[NONE_OPTION] =
    "Not an argument about the topic: a question, an insult, a personal attack, or off-topic";
  return criteria;
}

// ---------------------------------------------------------------------------
// Stage A — which map is this thread about
// ---------------------------------------------------------------------------

export function buildTopicSelectState(transcript: string, candidates: readonly PrefilterCandidate[]) {
  return {
    pasted_thread: transcript,
    maps: Object.fromEntries(
      candidates.map((candidate) => [candidate.id, `${candidate.title}: ${candidate.metaClaim}`]),
    ),
  };
}

export function buildTopicSelectQuestions(candidates: readonly PrefilterCandidate[]): JevQuestionSet {
  const criteria: Record<string, string> = {};
  for (const candidate of candidates) {
    criteria[candidate.id] = `${candidate.title}: ${candidate.metaClaim}`;
  }
  criteria[NONE_OPTION] = "None of these maps is what `pasted_thread` is arguing about";

  return {
    topic: {
      type: "choice",
      instructions:
        "Which of the argument maps in `maps` is the discussion in `pasted_thread` mainly about? Pick \"none\" if none of them covers the question these people are arguing over.",
      criteria,
    },
  };
}

// ---------------------------------------------------------------------------
// Stage B — per-turn routing, chunked
// ---------------------------------------------------------------------------

/** `pasted_turns.t0` … `.t7`: only this chunk's turns are in the state. */
export function buildTurnChunkState(
  metaClaim: string,
  pillars: readonly Pillar[],
  chunk: readonly ScrubbedTurn[],
) {
  return {
    topic_claim: metaClaim,
    sections: Object.fromEntries(
      pillars.map((pillar) => [pillar.id, { title: pillar.title, summary: pillar.short_summary }]),
    ),
    pasted_turns: Object.fromEntries(
      chunk.map((turn, local) => [`t${local}`, `${turn.alias}: ${turn.text}`]),
    ),
  };
}

export function buildTurnQuestions(
  localIndex: number,
  globalIndex: number,
  pillars: readonly Pillar[],
): JevQuestionSet {
  const ref = `\`pasted_turns.t${localIndex}\``;
  return {
    [`section_${globalIndex}`]: {
      type: "choice",
      instructions: `Which section of the argument map in \`sections\` is the turn ${ref} mainly arguing about? Pick "none" if it is not making an argument about the topic.`,
      criteria: sectionCriteria(pillars),
    },
    [`stance_${globalIndex}`]: {
      type: "choice",
      instructions: `Is the speaker of ${ref} arguing for \`topic_claim\`, against it, or neither?`,
      criteria: {
        for: "Argues for the topic claim",
        against: "Argues against the topic claim",
        neither: "Neither: asks a question, reframes, or is off-topic",
      },
    },
    [`fallacy_${globalIndex}`]: {
      type: "noul",
      instructions: `Does ${ref} rely mainly on a reasoning fallacy (ad hominem, motive attack, overgeneralization, appeal to popularity, strawman, anecdote as proof) rather than a substantive point?`,
    },
    [`factual_${globalIndex}`]: {
      type: "noul",
      instructions: `Does ${ref} make a checkable factual claim, as opposed to a value statement, a question, or a prediction?`,
    },
  };
}

// ---------------------------------------------------------------------------
// Stage C — thread-level shape
// ---------------------------------------------------------------------------

export function buildThreadState(metaClaim: string, transcript: string) {
  return { topic_claim: metaClaim, pasted_thread: transcript };
}

export function buildThreadQuestions(): JevQuestionSet {
  const criteria: Record<string, string> = {};
  for (const [id, pattern] of Object.entries(MAP_REPLY_PATTERNS)) {
    criteria[id] = pattern.description;
  }

  return {
    pattern: {
      type: "choice",
      instructions: "Which pattern best describes the disagreement in `pasted_thread` as a whole?",
      criteria,
    },
    empirical_lever: {
      type: "noul",
      instructions:
        "Is there a factual question such that at least one participant says or clearly implies they would change position if it were answered?",
    },
    value_residual: {
      type: "noul",
      instructions:
        "Does at least one participant hold a values position that no factual evidence would change?",
    },
    talking_past: {
      type: "noul",
      instructions:
        "Are at least two participants arguing about different questions while believing they are arguing about the same one?",
    },
    definitional: {
      type: "noul",
      instructions:
        "Are participants using a key term (for example fairness, affordability, safety, cheating) to mean different things?",
    },
  };
}

// ---------------------------------------------------------------------------
// Stage D — which of the map's cruxes the thread actually touches
// ---------------------------------------------------------------------------

export function buildCruxState(transcript: string, pillars: readonly Pillar[]) {
  return {
    pasted_thread: transcript,
    cruxes: Object.fromEntries(
      pillars.map((pillar) => [
        pillar.id,
        `${pillar.crux.title}. ${pillar.crux.description}`,
      ]),
    ),
  };
}

export function buildCruxQuestions(pillars: readonly Pillar[]): JevQuestionSet {
  const questions: JevQuestionSet = {};
  for (const pillar of pillars) {
    questions[`crux_${pillar.id}`] = {
      type: "noul",
      instructions: `Do the participants in \`pasted_thread\` actually argue about the question described in \`cruxes.${pillar.id}\`?`,
      criteria: {
        true: "At least two participants take opposing positions on that question",
        false: "Nobody raises it, or nobody disputes it",
      },
    };
  }
  return questions;
}
