import { DISAGREEMENT_LIMITS } from "@/lib/disagreement/constants";

/**
 * One set of limits for the one paste box at /analyze.
 *
 * The maximum is the diagnosis lane's, so a paste that fits the box fits
 * every lane. The minimum depends on the lane: the diagnosis needs enough of
 * an argument to separate positions, while the map lane can place a single
 * short line ("nukes keep the peace", 20 characters) on the right map; at 40
 * it refused that line outright (r9 live review #4). Its floors on how much
 * of a paste a map must account for still apply to a short one.
 */
export const PASTE_LIMITS = {
  maxCharacters: DISAGREEMENT_LIMITS.maxSourceCharacters,
  minMapCharacters: 12,
  minDiagnosisCharacters: DISAGREEMENT_LIMITS.minSourceCharacters,
} as const;

export function minCharactersFor(diagnosisEnabled: boolean): number {
  return diagnosisEnabled ? PASTE_LIMITS.minDiagnosisCharacters : PASTE_LIMITS.minMapCharacters;
}
