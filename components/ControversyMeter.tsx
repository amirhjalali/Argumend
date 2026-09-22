"use client";

import { useState } from "react";
import type { TopicStatus, Verdict } from "@/lib/schemas/topic";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ControversyMeterProps {
  balance: number; // 0-100, 50 = even
  weight: number; // 0-100
  verdict: Verdict;
  status: TopicStatus;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type HeatTier = "cool" | "warm" | "hot" | "explosive"; // internal keys only; nothing renders heat

// Quadrant → heat tier. Controversy is being well-mapped AND balanced:
// settled maps coolest, well-mapped-contested is hottest, thin maps speculative.
const QUADRANT_TIER: Record<Verdict["quadrant"], HeatTier> = {
  settled: "cool",
  moderate: "warm",
  contested: "hot",
  open: "explosive",
};

const tierConfig: Record<
  HeatTier,
  {
    label: string;
    description: string;
  }
> = {
  cool: {
    label: "Broad agreement",
    description:
      "Overwhelming expert agreement. Remaining debates are at the margins.",
  },
  warm: {
    label: "Contested",
    description:
      "Meaningful disagreement among researchers. Key evidence is debated.",
  },
  hot: {
    label: "Genuinely divided",
    description:
      "Strong disagreement. Experts are divided and evidence is actively challenged.",
  },
  explosive: {
    label: "Thinly evidenced",
    description:
      "Little consensus exists. Claims rest on limited or conflicting evidence.",
  },
};

/** Map TopicStatus to a fallback label when it differs from the tier label */
const statusOverride: Record<TopicStatus, string | null> = {
  settled: null, // use tier label
  contested: null,
  highly_speculative: "Highly speculative",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ControversyMeter({ balance, weight, verdict, status }: ControversyMeterProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const tier = QUADRANT_TIER[verdict.quadrant];
  const config = tierConfig[tier];
  const displayLabel = statusOverride[status] ?? config.label;

  // Contested-ness: rich evidence pulling both ways. 0 when settled or thin.
  const controversyPct = Math.round(weight * (1 - Math.abs(balance - 50) / 50));

  return (
    <div className="w-full mb-8">
      <div
        className="relative bg-transparent rounded-lg border border-stone-200/60 dark:border-[var(--border-default)] px-5 py-4"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="label-caps">How contested</h3>
            {/* Info dot */}
            <button
              type="button"
              className="relative w-4 h-4 rounded-full bg-stone-200 dark:bg-[#3d3a36] text-stone-500 dark:text-[var(--text-muted)] text-[10px] font-bold leading-none flex items-center justify-center hover:bg-stone-300 dark:hover:bg-[#4a4640] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-deep/40"
              aria-label="What does this meter mean?"
              onClick={() => setShowTooltip((v) => !v)}
            >
              ?
            </button>
          </div>
          <span className="text-sm font-medium text-primary dark:text-stone-200">{displayLabel}</span>
        </div>

        {/* Bar: one quiet stone fill. It used to be a heat gradient that
            pulsed and glowed hotter as a topic got more contested, which made
            disagreement read as an alarm (2026-09-22 design audit). */}
        <div className="relative h-1.5 rounded-full bg-stone-200/80 dark:bg-[var(--bg-muted)] overflow-visible">
          <div
            className="absolute inset-0 rounded-full bg-stone-400 dark:bg-stone-500"
            style={{ width: `${Math.max(controversyPct, 4)}%` }}
            role="meter"
            aria-valuenow={controversyPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Controversy level: ${displayLabel} (balance ${balance}/100, weight ${weight}/100)`}
          />

          {/* Marker */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white bg-stone-600 shadow-sm transition-all duration-700 ease-out dark:border-[#1a1917] dark:bg-stone-300"
            style={{
              left: `clamp(0px, calc(${controversyPct}% - 7px), calc(100% - 14px))`,
            }}
          >
            <span className="sr-only">{`Balance ${balance} of 100, weight ${weight} of 100`}</span>
          </div>
        </div>

        {/* Scale labels */}
        <div className="flex justify-between mt-2">
          {/* The fill is weight × evenness: empty when one side clearly
              leads or the evidence is thin, full when heavy evidence splits
              evenly. The end labels say that, not "settled/speculative". */}
          <span className="text-xs text-muted">Little in dispute</span>
          <span className="text-xs text-muted">Heavy evidence, evenly split</span>
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute z-20 top-full left-1/2 -translate-x-1/2 mt-2 w-72 sm:w-80 p-4 rounded-lg bg-white dark:bg-[var(--bg-card)] border border-stone-200 dark:border-[var(--border-default)] shadow-lw text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            <p className="font-medium text-primary dark:text-stone-200 mb-1">{displayLabel}</p>
            <p>{config.description}</p>
            <p className="mt-2 text-xs text-muted dark:text-stone-400">
              Based on the balance of evidence ({balance}/100 — which way it tips) and its
              weight ({weight}/100 — how much bears on the question), computed from source
              quality and crux verifiability.
            </p>
            {/* Arrow */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white dark:bg-[var(--bg-card)] border-l border-t border-stone-200 dark:border-[var(--border-default)]" />
          </div>
        )}
      </div>
    </div>
  );
}
