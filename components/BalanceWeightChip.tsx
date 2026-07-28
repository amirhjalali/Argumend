import type { Verdict, VerdictQuadrant } from "@/lib/schemas/topic";

/** Quadrant → color/label. The ONLY place verdict colors are defined. */
export const QUADRANT_STYLE: Record<
  VerdictQuadrant,
  { color: string; bg: string; short: string }
> = {
  settled: { color: "#3a6965", bg: "rgba(58, 105, 101, 0.10)", short: "Settled" },
  contested: { color: "#a23b3b", bg: "rgba(162, 59, 59, 0.10)", short: "Contested" },
  moderate: { color: "#C4613C", bg: "rgba(196, 97, 60, 0.10)", short: "Moderate" },
  open: { color: "#7a7068", bg: "rgba(122, 112, 104, 0.12)", short: "Open" },
};

interface BalanceWeightChipProps {
  balance: number;
  weight: number;
  verdict: Verdict;
  /** Show the quadrant word ("Settled" / "Contested" / …) after the glyphs */
  showLabel?: boolean;
  className?: string;
}

/**
 * Compact two-axis readout for cards and lists: a diverging balance glyph
 * (dot on a centered track) + a small weight-fill bar + optional quadrant word.
 * Server-safe: no hooks, no client directive.
 */
export function BalanceWeightChip({
  balance,
  weight,
  verdict,
  showLabel = false,
  className = "",
}: BalanceWeightChipProps) {
  const s = QUADRANT_STYLE[verdict.quadrant];
  const balancePos = Math.min(97, Math.max(3, balance));

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-sans ${className}`}
      style={{ backgroundColor: s.bg, color: s.color }}
      title={`Balance ${balance}/100 · Weight ${weight}/100 — ${verdict.label}`}
    >
      {/* Balance: diverging track, center tick, dot at the balance position */}
      <span className="relative inline-block h-1.5 w-8 shrink-0" aria-hidden="true">
        <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-current opacity-25" />
        <span className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-current opacity-40" />
        <span
          className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-[left] duration-500 ease-out"
          style={{ left: `${balancePos}%` }}
        />
      </span>
      {/* Weight: small fill bar. Track and fill are siblings (not nested) so the
          track's reduced opacity doesn't also dim the fill. */}
      <span
        className="relative inline-block h-1.5 w-4 shrink-0 overflow-hidden rounded-full"
        aria-hidden="true"
      >
        <span className="absolute inset-0 rounded-full bg-current opacity-25" />
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-current transition-[width] duration-500 ease-out"
          style={{ width: `${weight}%` }}
        />
      </span>
      {showLabel && (
        <span className="text-[10px] font-semibold uppercase tracking-wider">{s.short}</span>
      )}
      <span className="sr-only">
        {`Balance ${balance} of 100, weight ${weight} of 100. ${verdict.label}`}
      </span>
    </span>
  );
}
