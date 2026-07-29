import type { Verdict } from "@/lib/schemas/topic";
import { QUADRANT_STYLE } from "./BalanceWeightChip";

interface BalanceWeightReadoutProps {
  balance: number;
  weight: number;
  verdict: Verdict;
  /** Anchor/href to the evidence breakdown that produced these numbers */
  evidenceHref?: string;
  className?: string;
}

/**
 * The full-size two-axis verdict readout: a tilting balance-scale glyph,
 * a diverging balance meter, and a weight bar — one metaphor, both axes.
 * Server-safe: no hooks, no client directive.
 */
export function BalanceWeightReadout({
  balance,
  weight,
  verdict,
  evidenceHref,
  className = "",
}: BalanceWeightReadoutProps) {
  const s = QUADRANT_STYLE[verdict.quadrant];
  // Same tilt convention as ScalesOfEvidence.BalanceMeter: FOR-heavy tips the
  // beam counter-clockwise, max ±10°.
  const tiltDeg = ((balance - 50) / 50) * -10;
  const balancePos = Math.min(98, Math.max(2, balance));

  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 ${className}`}
      style={{ borderColor: `${s.color}33`, backgroundColor: s.bg }}
    >
      <div className="flex items-center gap-4">
        {/* Balance-scale glyph — miniature of ScalesOfEvidence.BalanceMeter */}
        <svg width="64" height="44" viewBox="0 0 64 44" aria-hidden="true" className="shrink-0">
          {/* pedestal */}
          <ellipse cx="32" cy="39.5" rx="11" ry="1.3" fill={s.color} opacity="0.18" />
          <path d="M24 39 Q32 36.5 40 39 L39 37.5 Q32 35.5 25 37.5 Z" fill={s.color} />
          <rect x="24" y="38.4" width="16" height="1.3" rx="0.65" fill={s.color} />
          <path d="M28.5 37.5 L35.5 37.5 L34 33.5 L30 33.5 Z" fill={s.color} />
          <path d="M31.5 33.5 L32.5 33.5 L32 12 L31.5 12 Z" fill={s.color} opacity="0.85" />
          <path d="M29.5 12 L32 8 L34.5 12 Z" fill={s.color} />
          <circle cx="32" cy="10" r="1.2" fill={s.color} />
          {/* beam + pans, tilted by balance */}
          <g
            transform={`rotate(${tiltDeg} 32 10)`}
            style={{ transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)" }}
          >
            <line x1="10" y1="10" x2="54" y2="10" stroke={s.color} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="32" cy="10" r="1.6" fill={s.color} />
            <circle cx="10" cy="10" r="1.1" fill={s.color} />
            <circle cx="54" cy="10" r="1.1" fill={s.color} />
            {/* left pan */}
            <line x1="10" y1="10" x2="6" y2="17" stroke={s.color} strokeWidth="0.75" />
            <line x1="10" y1="10" x2="14" y2="17" stroke={s.color} strokeWidth="0.75" />
            <path d="M4 17 L16 17 Q14 22 10 22 Q6 22 4 17 Z" fill={s.color} fillOpacity="0.16" stroke={s.color} strokeWidth="1" />
            {/* right pan */}
            <line x1="54" y1="10" x2="50" y2="17" stroke={s.color} strokeWidth="0.75" />
            <line x1="54" y1="10" x2="58" y2="17" stroke={s.color} strokeWidth="0.75" />
            <path d="M48 17 L60 17 Q58 22 54 22 Q50 22 48 17 Z" fill={s.color} fillOpacity="0.16" stroke={s.color} strokeWidth="1" />
          </g>
        </svg>
        <div className="min-w-0">
          <p className="font-serif text-lg sm:text-xl font-semibold leading-snug text-primary">
            {verdict.label}
          </p>
          <p className="mt-0.5 font-sans text-xs text-secondary">
            Balance {balance}/100 · Weight {weight}/100
          </p>
        </div>
      </div>

      {/* Balance: diverging meter centered on 50 */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between font-sans text-[10px] uppercase tracking-widest text-muted">
          <span>Against</span>
          <span>Balance of evidence</span>
          <span>For</span>
        </div>
        <div
          className="relative h-2 rounded-full bg-stone-200 dark:bg-[#3d3a36]"
          role="meter"
          aria-valuenow={balance}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Balance of evidence: ${balance} of 100, where 50 is an even split`}
        >
          <span
            className="absolute -top-1 -bottom-1 left-1/2 w-px -translate-x-1/2 bg-stone-400/60"
            aria-hidden="true"
          />
          <span
            className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm transition-[left] duration-700 ease-out dark:border-[#1a1917]"
            style={{ left: `${balancePos}%`, backgroundColor: s.color }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Weight: plain fill meter */}
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between font-sans text-[10px] uppercase tracking-widest text-muted">
          <span>Weight of evidence</span>
          <span className="font-mono tabular-nums normal-case tracking-normal">{weight}/100</span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-[#3d3a36]"
          role="meter"
          aria-valuenow={weight}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Weight of evidence: ${weight} of 100`}
        >
          <span
            className="block h-full rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${weight}%`, backgroundColor: s.color }}
          />
        </div>
      </div>

      {evidenceHref && (
        <a
          href={evidenceHref}
          className="mt-3 inline-block font-sans text-xs font-medium link-underline"
          style={{ color: s.color }}
        >
          See the evidence behind this →
        </a>
      )}
    </div>
  );
}
