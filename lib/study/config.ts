/**
 * Flags and server configuration for the study (docs/plans/2026-11-03-study-plan.md,
 * "Running it"). Everything is off by default.
 *
 * - NEXT_PUBLIC_ENABLE_STUDY=true renders /study (it 404s otherwise). Read at
 *   build time, like every NEXT_PUBLIC_ variable.
 * - ENABLE_STUDY_RESPONSES=true opens POST /api/study/assign and
 *   /api/study/response (they 404 otherwise). Separate from the page flag so
 *   that rendering the page for review never opens the write path.
 * - STUDY_PID_SECRET (32+ characters) keys the HMAC that turns a Prolific id
 *   into the stored pseudonym. Required whenever DATABASE_URL is set.
 * - STUDY_COMPLETION_CODE, STUDY_SCREENOUT_CODE: Prolific completion codes,
 *   returned only by the server after a valid submission.
 */
import { createHmac } from "node:crypto";

export function isStudyPageEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_STUDY === "true";
}

export function isStudyApiEnabled(): boolean {
  return process.env.ENABLE_STUDY_RESPONSES === "true";
}

export const STUDY_PID_SECRET_MIN_LENGTH = 32;

/** The HMAC secret, or null when it is missing or too short to be one. */
export function studyPidSecret(): string | null {
  const secret = process.env.STUDY_PID_SECRET?.trim();
  return secret && secret.length >= STUDY_PID_SECRET_MIN_LENGTH ? secret : null;
}

/** HMAC-SHA256 of the Prolific id, hex. The raw id is never stored or logged. */
export function hashProlificId(prolificPid: string, secret: string): string {
  return createHmac("sha256", secret).update(prolificPid).digest("hex");
}

/**
 * Prolific's completion URL. The host is the one Prolific's study setup page
 * shows; confirm it there before launch (older docs show app.prolific.co).
 */
export const PROLIFIC_COMPLETE_URL = "https://app.prolific.com/submissions/complete";
const COMPLETION_CODE_PATTERN = /^[A-Za-z0-9]{4,32}$/;

function completionUrlFor(code: string | undefined): string | null {
  const trimmed = code?.trim();
  if (!trimmed || !COMPLETION_CODE_PATTERN.test(trimmed)) return null;
  return `${PROLIFIC_COMPLETE_URL}?cc=${encodeURIComponent(trimmed)}`;
}

export function studyCompletionUrl(): string | null {
  return completionUrlFor(process.env.STUDY_COMPLETION_CODE);
}

export function studyScreenoutUrl(): string | null {
  return completionUrlFor(process.env.STUDY_SCREENOUT_CODE);
}
