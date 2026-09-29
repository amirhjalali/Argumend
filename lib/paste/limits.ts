import { DISAGREEMENT_LIMITS } from "@/lib/disagreement/constants";

/**
 * One set of limits for the one paste box at /analyze.
 *
 * The maximum is the diagnosis lane's, so a paste that fits the box fits
 * every lane. The minimum depends on the lane: the diagnosis needs enough of
 * an argument to separate positions, while the map lane can place a single
 * sentence ("rent control reduces supply") on the right map.
 */
export const PASTE_LIMITS = {
  maxCharacters: DISAGREEMENT_LIMITS.maxSourceCharacters,
  minMapCharacters: 40,
  minDiagnosisCharacters: DISAGREEMENT_LIMITS.minSourceCharacters,
} as const;

export function minCharactersFor(diagnosisEnabled: boolean): number {
  return diagnosisEnabled ? PASTE_LIMITS.minDiagnosisCharacters : PASTE_LIMITS.minMapCharacters;
}
