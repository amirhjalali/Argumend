import { OG_SUBTITLE_MAX_CHARACTERS, OG_TITLE_MAX_CHARACTERS } from "./og";

export interface GenericOgParams {
  title?: string;
  subtitle?: string;
  verdict?: "for" | "against" | "draw";
  score?: number;
}

export type GenericOgParseResult =
  | { success: true; data: GenericOgParams }
  | { success: false; status: 400 | 414; code: "INVALID_OG_QUERY" | "OG_QUERY_TOO_LARGE" };

const ALLOWED_KEYS = new Set(["title", "subtitle", "verdict", "score"]);
const VERDICTS = new Set<GenericOgParams["verdict"]>(["for", "against", "draw"]);
const SCORE_PATTERN = /^\d{1,3}(?:\.\d)?$/;

function normalizeText(value: string, maxLength: number): string | null {
  if (Array.from(value).length > maxLength) return null;
  return value
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Lightweight, Edge-safe runtime schema for the four supported query keys. */
export function parseGenericOgUrl(url: string): GenericOgParseResult {
  if (url.length > 4096) {
    return { success: false, status: 414, code: "OG_QUERY_TOO_LARGE" };
  }

  const searchParams = new URL(url).searchParams;
  for (const [key] of searchParams) {
    if (!ALLOWED_KEYS.has(key) || searchParams.getAll(key).length > 1) {
      return { success: false, status: 400, code: "INVALID_OG_QUERY" };
    }
  }

  const title = normalizeText(searchParams.get("title") ?? "", OG_TITLE_MAX_CHARACTERS);
  const subtitle = normalizeText(searchParams.get("subtitle") ?? "", OG_SUBTITLE_MAX_CHARACTERS);
  const verdictValue = searchParams.get("verdict") || undefined;
  const scoreValue = searchParams.get("score") || undefined;
  if (
    title === null ||
    subtitle === null ||
    (verdictValue !== undefined && !VERDICTS.has(verdictValue as GenericOgParams["verdict"])) ||
    (scoreValue !== undefined && !SCORE_PATTERN.test(scoreValue.trim()))
  ) {
    return { success: false, status: 400, code: "INVALID_OG_QUERY" };
  }

  const score = scoreValue === undefined ? undefined : Number(scoreValue);
  if (score !== undefined && (!Number.isFinite(score) || score < 0 || score > 100)) {
    return { success: false, status: 400, code: "INVALID_OG_QUERY" };
  }

  return {
    success: true,
    data: {
      ...(title ? { title } : {}),
      ...(subtitle ? { subtitle } : {}),
      ...(verdictValue ? { verdict: verdictValue as GenericOgParams["verdict"] } : {}),
      ...(score !== undefined ? { score } : {}),
    },
  };
}
