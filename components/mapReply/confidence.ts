/**
 * Presentation-only hedging, for the two numbers the pipeline does not gate.
 *
 * Every threshold the reply actually applies now travels with the result, in
 * `thresholds` and on each crux and signal, so the UI reads those rather than
 * keeping its own copy. Two numbers are left over:
 *
 * - **Topic confidence.** The pipeline's gate is `thresholds.topicConfidence`
 *   (0.5): below it there is no map at all. Above it the map is shown, and
 *   between 0.5 and 0.7 it is shown on evidence the routing experiment says is
 *   weak, so the page hedges where the pipeline does not.
 * - **Pattern confidence.** The eight-way Choice has no threshold anywhere; the
 *   reply prints whichever pattern won.
 *
 * 0.7 is the line `docs/reviews/2026-09-16-jev-typesafe-probe.md` drew for
 * routing — the same number the pipeline now uses for its section floor — and
 * it is reused here for want of a better-measured one, not because those two
 * questions were calibrated together.
 *
 * Per-turn placement is NOT decided here. It comes from `turn.placement`,
 * which the pipeline computes against `thresholds.sectionConfidence`.
 */
export const DISPLAY_CONFIDENCE_HEDGE = 0.7;

export function isHedged(confidence: number): boolean {
  return confidence < DISPLAY_CONFIDENCE_HEDGE;
}
