"use client";

import { useState } from "react";
import type { TopicStatus } from "@/lib/schemas/topic";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ControversyMeterProps {
  confidenceScore: number; // 0-100
  status: TopicStatus;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type HeatTier = "cool" | "warm" | "hot" | "explosive";

function getHeatTier(score: number): HeatTier {
  if (score >= 80) return "cool";
  if (score >= 50) return "warm";
  if (score >= 25) return "hot";
  return "explosive";
}

const tierConfig: Record<
  HeatTier,
  {
    label: string;
    description: string;
    barClass: string;
    markerClass: string;
    glowClass: string;
    animationClass: string;
  }
> = {
  cool: {
    label: "Scientific Consensus",
    description:
      "Overwhelming expert agreement. Remaining debates are at the margins.",
    barClass: "from-[#4f7b77] via-[#6a9f9a] to-emerald-400",
    markerClass: "bg-[#4f7b77] border-[#3a6965]",
    glowClass: "",
    animationClass: "animate-[pulse-subtle_4s_ease-in-out_infinite]",
  },
  warm: {
    label: "Contested",
    description:
      "Meaningful disagreement among researchers. Key evidence is debated.",
    barClass: "from-[#C4613C] via-[#d4805f] to-[#e6a48c]",
    markerClass: "bg-[#C4613C] border-[#b05434]",
    glowClass: "",
    animationClass: "animate-[pulse-medium_2.5s_ease-in-out_infinite]",
  },
  hot: {
    label: "Highly Disputed",
    description:
      "Strong disagreement. Experts are divided and evidence is actively challenged.",
    barClass: "from-[#b05434] via-[#C4613C] to-[#d4805f]",
    markerClass: "bg-[#b05434] border-[#8b3f27]",
    glowClass: "shadow-[0_0_12px_rgba(176,84,52,0.35)]",
    animationClass: "animate-[pulse-hot_1.8s_ease-in-out_infinite]",
  },
  explosive: {
    label: "Speculative",
    description:
      "Little consensus exists. Claims rest on limited or conflicting evidence.",
    barClass: "from-[#8b3f27] via-[#a23b3b] to-[#c45c5c]",
    markerClass: "bg-[#8b3f27] border-[#6b301e]",
    glowClass: "shadow-[0_0_18px_rgba(139,63,39,0.45)]",
    animationClass: "animate-[pulse-explosive_1.2s_ease-in-out_infinite]",
  },
};

/** Map TopicStatus to a fallback label when it differs from the tier label */
const statusOverride: Record<TopicStatus, string | null> = {
  settled: null, // use tier label
  contested: null,
  highly_speculative: "Highly Speculative",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ControversyMeter({ confidenceScore, status }: ControversyMeterProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const tier = getHeatTier(confidenceScore);
  const config = tierConfig[tier];
  const displayLabel = statusOverride[status] ?? config.label;

  // The marker position: 0% confidence = far right (most controversial),
  // 100% confidence = far left (most settled). We invert for the "controversy"
  // axis so higher controversy = further right.
  const controversyPct = 100 - confidenceScore;

  return (
    <div className="w-full mb-8">
      <div
        className="relative bg-transparent rounded-xl border border-stone-200/60 p-5 sm:p-6"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-medium text-stone-500 uppercase tracking-widest">
              Controversy Meter
            </h3>
            {/* Info dot */}
            <button
              type="button"
              className="relative w-4 h-4 rounded-full bg-stone-200 text-stone-500 text-[10px] font-bold leading-none flex items-center justify-center hover:bg-stone-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-deep/40"
              aria-label="What does this meter mean?"
              onClick={() => setShowTooltip((v) => !v)}
            >
              ?
            </button>
          </div>
          <span className="text-sm font-medium text-primary">{displayLabel}</span>
        </div>

        {/* Bar */}
        <div className="relative h-3 sm:h-4 rounded-full bg-stone-200/80 overflow-visible">
          {/* Gradient fill */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.barClass} ${config.animationClass} ${config.glowClass}`}
            style={{ width: `${Math.max(controversyPct, 4)}%` }}
            role="meter"
            aria-valuenow={confidenceScore}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Controversy level: ${displayLabel} (${confidenceScore}% confidence)`}
          />

          {/* Marker */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 ${config.markerClass} ${config.glowClass} transition-all duration-700 ease-out`}
            style={{
              left: `clamp(0px, calc(${controversyPct}% - 10px), calc(100% - 20px))`,
            }}
          >
            <span className="sr-only">{confidenceScore}% confidence</span>
          </div>
        </div>

        {/* Scale labels */}
        <div className="flex justify-between mt-2">
          <span className="text-[10px] sm:text-xs text-stone-400 font-medium">
            Settled
          </span>
          <span className="text-[10px] sm:text-xs text-stone-400 font-medium">
            Speculative
          </span>
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute z-20 top-full left-1/2 -translate-x-1/2 mt-2 w-72 sm:w-80 p-4 rounded-lg bg-white border border-stone-200 shadow-lw text-sm text-stone-600 leading-relaxed">
            <p className="font-medium text-primary mb-1">{displayLabel}</p>
            <p>{config.description}</p>
            <p className="mt-2 text-xs text-stone-400">
              Based on a {confidenceScore}% confidence score computed from
              evidence quality, expert agreement, and verification status.
            </p>
            {/* Arrow */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-stone-200" />
          </div>
        )}
      </div>
    </div>
  );
}
