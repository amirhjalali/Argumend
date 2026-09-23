import type { Verdict, VerdictQuadrant } from "@/lib/schemas/topic";

/**
 * Quadrant → color/label. The ONLY place verdict colors are defined.
 *
 * Contested is stone ink (--text-secondary: #564d45 light, #b0a99f dark), not
 * crux crimson. Most maps are contested, so crimson here turned every list
 * into a column of alarms and spent the crux colour on something that is not
 * a crux; contested is the normal state of a live question. The variable form
 * also gives this one quadrant a dark-mode partner. Colours are CSS colour
 * strings, not always hex: derive tints with color-mix(), never by appending
 * alpha digits.
 */
export const QUADRANT_STYLE: Record<
  VerdictQuadrant,
  /** onColor: text colour for type set on a solid `color` fill. */
  { color: string; bg: string; onColor: string; short: string }
> = {
  // Solid stone ink (--text-primary: #3d3a36 light, #e8e4de dark), the same
  // family as the settled STATUS chip, so "settled" means one thing site-wide.
  // Teal stays evidence. It was teal here while the status chip was stone.
  // Contrast on its tint: 8.50:1 light, 9.64:1 dark (canvas); set solid, the
  // canvas-coloured type on it is 10.0:1 / 13.9:1.
  settled: {
    color: "rgb(var(--text-primary-rgb))",
    bg: "rgb(var(--text-primary-rgb) / 0.12)",
    onColor: "rgb(var(--bg-canvas-rgb))",
    short: "Settled",
  },
  contested: {
    color: "rgb(var(--text-secondary-rgb))",
    bg: "rgb(var(--text-secondary-rgb) / 0.10)",
    // The fill turns light in dark mode, so the type on it turns dark.
    onColor: "rgb(var(--bg-canvas-rgb))",
    short: "Contested",
  },
  // Rust ink token (--rust-text: rust-700 light, rust-500 dark); the tint stays
  // rust-500 so the chip reads as the same family.
  moderate: {
    color: "rgb(var(--rust-text-rgb))",
    bg: "rgba(196, 97, 60, 0.10)",
    onColor: "#ffffff",
    short: "Moderate",
  },
  // Muted stone ink (--text-muted: #6d6058 light, #9a9189 dark). The fixed
  // #7a7068 was 3.63:1 on the dark canvas; the token is 5.68:1.
  open: {
    color: "rgb(var(--text-muted-rgb))",
    bg: "rgb(var(--text-muted-rgb) / 0.06)",
    onColor: "rgb(var(--bg-canvas-rgb))",
    short: "Open",
  },
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
