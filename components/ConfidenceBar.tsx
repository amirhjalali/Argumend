"use client";

/**
 * A compact horizontal weight bar for visualizing an evidence score.
 *
 * Evidence scores are 0–40 (source reliability + independence + replicability +
 * directness). The data already exists on every evidence node but was previously
 * shown only as the text "28/40" — this renders it as a filled bar so the
 * relative strength is legible at a glance, which is the whole point of an
 * evidence-weighted argument map.
 */
interface ConfidenceBarProps {
  /** Current score. */
  value: number;
  /** Maximum possible score (defaults to the 0–40 evidence scale). */
  max?: number;
  /** Visual tone — "for" = rust (proponent), "against" = stone (skeptic). */
  tone: "for" | "against";
}

export function ConfidenceBar({ value, max = 40, tone }: ConfidenceBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const isFor = tone === "for";

  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200/70"
      role="meter"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={`Evidence weight ${Math.round(value)} of ${max}`}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 ${
          isFor ? "bg-rust-500" : "bg-stone-500"
        }`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
