/**
 * Server-side balanced assignment (docs/plans/2026-11-03-study-plan.md,
 * "Randomization").
 *
 * Within each stratum (one Prolific study × one party), a new participant goes
 * to whichever topic × arm cell has the fewest assignments so far, ties broken
 * uniformly at random. That keeps the nine cells within one participant of
 * each other inside every stratum, while the participant still cannot predict
 * or choose their cell. Counts include participants who started and did not
 * finish: assignment is to the cell, not to the completed response, so
 * differential drop-out stays visible.
 *
 * Two requests that read the counts at the same moment can both land in the
 * same cell. At Prolific's arrival rates that costs a cell or two of
 * imbalance, which the analysis does not depend on (arm is randomized either
 * way); the plan records it as a known limit.
 */
import { STUDY_ARMS, STUDY_TOPICS, type StudyArm, type StudyTopic } from "./constants";

export interface StudyCell {
  topic: StudyTopic;
  arm: StudyArm;
}

export const STUDY_CELLS: readonly StudyCell[] = STUDY_TOPICS.flatMap((topic) =>
  STUDY_ARMS.map((arm) => ({ topic, arm })),
);

export function cellKey(cell: StudyCell): string {
  return `${cell.topic}:${cell.arm}`;
}

/** Assignments so far in this stratum, keyed by `cellKey`. Missing keys count as 0. */
export type CellCounts = Partial<Record<string, number>>;

/**
 * The least-filled cell, ties broken by `random` (a [0, 1) source, injectable
 * for tests). With no counts at all this is a uniform draw over the nine cells.
 */
export function chooseCell(counts: CellCounts, random: () => number = Math.random): StudyCell {
  const countOf = (cell: StudyCell) => counts[cellKey(cell)] ?? 0;
  const fewest = Math.min(...STUDY_CELLS.map(countOf));
  const candidates = STUDY_CELLS.filter((cell) => countOf(cell) === fewest);
  const index = Math.min(candidates.length - 1, Math.floor(random() * candidates.length));
  return candidates[index];
}
