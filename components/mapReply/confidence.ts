/**
 * The line below which a Jev placement is shown as a guess.
 *
 * `docs/reviews/2026-09-16-jev-typesafe-probe.md` found the routing reliable
 * well above this and unreliable below it — the comment that sat between two
 * sections of the rent-control map was placed at 41% and placed differently
 * on a rerun. The pipeline does not act on this number (its own thresholds
 * live in `lib/mapReply/constants.ts`); it is purely a presentation rule, so
 * it lives with the presentation.
 */
export const DISPLAY_CONFIDENCE_HEDGE = 0.7;

export function isHedged(confidence: number): boolean {
  return confidence < DISPLAY_CONFIDENCE_HEDGE;
}
