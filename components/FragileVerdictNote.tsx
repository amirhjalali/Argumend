/**
 * The one honest line that goes under a verdict the robustness guard demoted.
 *
 * A "settled" reading that a single defensible evidence relabel could erase is
 * published as "moderate" with `verdict.fragile` set (see
 * lib/verdictSensitivity.ts). Wherever the label shows, this says why —
 * quietly, in the muted UI voice, with no alarm colour.
 *
 * Server-safe: no hooks, no client directive.
 */

export const FRAGILE_VERDICT_NOTE = "One evidence card could change this reading";

interface FragileVerdictNoteProps {
  /** Nothing renders unless this is true, so callers can pass verdict.fragile straight through. */
  fragile?: boolean;
  className?: string;
}

export function FragileVerdictNote({ fragile, className = "" }: FragileVerdictNoteProps) {
  if (!fragile) return null;
  return (
    <p
      className={`font-sans text-xs italic leading-snug text-muted dark:text-stone-400 ${className}`}
    >
      {FRAGILE_VERDICT_NOTE}
    </p>
  );
}
