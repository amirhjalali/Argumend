/**
 * Prolific's URL parameters (PROLIFIC_PID, STUDY_ID, SESSION_ID). The study
 * needs the first two; SESSION_ID is accepted in the URL, since Prolific sends
 * it, but it is neither needed nor kept.
 */
import { PROLIFIC_ID_PATTERN } from "./schema";

export interface ProlificParams {
  pid: string;
  studyId: string;
}

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** The participant and study ids, or null when either is missing or not a Prolific id. */
export function prolificParamsFrom(params: SearchParams): ProlificParams | null {
  const pid = first(params.PROLIFIC_PID)?.trim().toLowerCase();
  const studyId = first(params.STUDY_ID)?.trim().toLowerCase();
  if (!pid || !studyId) return null;
  if (!PROLIFIC_ID_PATTERN.test(pid) || !PROLIFIC_ID_PATTERN.test(studyId)) return null;
  return { pid, studyId };
}
