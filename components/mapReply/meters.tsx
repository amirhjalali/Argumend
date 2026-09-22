/**
 * The small numeric primitives the map reply is made of.
 *
 * Every claim in the reply is a number, so the numbers have to be legible
 * rather than decorative: each meter is always accompanied by its own printed
 * percentage, and a meter that has a threshold draws the threshold as a tick
 * on the track. That tick is the point of the component. A signal that missed
 * its bar by two points is more interesting than one that missed it by fifty,
 * and hiding sub-threshold signals is what would make the reply look more
 * certain than it is.
 */

export type MeterTone = "teal" | "rust" | "brown" | "crux" | "stone";

/** Static class strings so Tailwind's content scanner can see every variant. */
const TONE_FILL: Record<MeterTone, string> = {
  teal: "bg-deep dark:bg-deep-light",
  rust: "bg-rust-500 dark:bg-rust-400",
  brown: "bg-skeptic dark:bg-skeptic-light",
  crux: "bg-crux dark:bg-crux-light",
  stone: "bg-stone-400 dark:bg-stone-500",
};

const TONE_TEXT: Record<MeterTone, string> = {
  teal: "text-deep dark:text-deep-light",
  rust: "text-rust-600 dark:text-rust-400",
  brown: "text-skeptic dark:text-skeptic-light",
  crux: "text-crux dark:text-crux-light",
  stone: "text-[var(--text-muted)]",
};

export function toneText(tone: MeterTone): string {
  return TONE_TEXT[tone];
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function percentLabel(value: number): string {
  return `${Math.round(clamp01(value) * 100)}%`;
}

/**
 * A 0-1 bar. `threshold` draws the line the number had to clear, so a reader
 * can see the miss as well as the hit.
 */
export function Meter({
  value,
  tone = "teal",
  threshold,
  thick = false,
  className = "",
}: {
  value: number;
  tone?: MeterTone;
  threshold?: number;
  thick?: boolean;
  className?: string;
}) {
  const width = clamp01(value) * 100;
  const tick = threshold === undefined ? null : clamp01(threshold) * 100;

  return (
    <div
      aria-hidden="true"
      className={`relative w-full rounded-full bg-[var(--bg-overlay)] ${thick ? "h-2" : "h-1.5"} ${className}`.trim()}
    >
      <div
        className={`absolute inset-y-0 left-0 rounded-full ${TONE_FILL[tone]}`}
        style={{ width: `${width}%` }}
      />
      {tick === null ? null : (
        <span
          className="absolute -top-1 -bottom-1 w-px bg-[var(--text-muted)]"
          style={{ left: `${tick}%` }}
        />
      )}
    </div>
  );
}

/**
 * A meter with its own label and printed value on one line. Used wherever a
 * probe number stands alone; the section bar and the evidence cards lay their
 * numbers out themselves.
 */
export function LabelledMeter({
  label,
  value,
  tone = "teal",
  threshold,
  note,
}: {
  label: string;
  value: number;
  tone?: MeterTone;
  threshold?: number;
  note?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-[var(--text-secondary)]">{label}</span>
        <span className={`font-sans text-sm tabular-nums ${TONE_TEXT[tone]}`}>
          {percentLabel(value)}
        </span>
      </div>
      <Meter value={value} tone={tone} threshold={threshold} />
      {note ? <p className="text-xs text-[var(--text-muted)]">{note}</p> : null}
    </div>
  );
}
