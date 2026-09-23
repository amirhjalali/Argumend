import { MAP_REPLY_PATTERNS, type MapReplyPatternId } from "@/lib/mapReply/constants";
import type { MapReplyPattern, MapReplySignals } from "@/lib/mapReply/types";
import { DISPLAY_CONFIDENCE_HEDGE, isHedged } from "./confidence";
import { LabelledMeter, Meter, percentLabel } from "./meters";
import { ResultSection } from "./ResultSection";
import type { MeterTone } from "./meters";

/**
 * The shape of the disagreement, and the four probes underneath it.
 *
 * Each signal is drawn with the threshold as a tick on its own track. A
 * signal at 49% against a 50% bar is the single most useful thing on this
 * panel — it is the difference between "they are not talking past each other"
 * and "we could not tell" — and a UI that only listed the signals that fired
 * would throw that away and read as more certain than the pipeline is.
 *
 * The two signals that decide whether this is a fact fight or a values fight
 * come first, side by side, because that is the distinction the reply exists
 * to draw.
 */

interface SignalRow {
  key: keyof Omit<MapReplySignals, "threshold">;
  label: string;
  tone: MeterTone;
  /** True when a line in the composed reply is gated on this signal. */
  gatesReplyLine: boolean;
}

const SIGNAL_ROWS: SignalRow[] = [
  {
    key: "empiricalLever",
    label: "A factual question someone would change position on",
    tone: "teal",
    gatesReplyLine: false,
  },
  {
    key: "valueResidual",
    label: "A values position no evidence would move",
    tone: "brown",
    gatesReplyLine: false,
  },
  {
    key: "talkingPast",
    label: "Arguing about different questions while believing they share one",
    tone: "rust",
    gatesReplyLine: true,
  },
  {
    key: "definitional",
    label: "A key term being used to mean two things",
    tone: "rust",
    gatesReplyLine: true,
  },
];

function patternDescription(pattern: string): string | null {
  return pattern in MAP_REPLY_PATTERNS
    ? MAP_REPLY_PATTERNS[pattern as MapReplyPatternId].description
    : null;
}

export function PatternSignals({
  pattern,
  signals,
}: {
  pattern: MapReplyPattern;
  signals: MapReplySignals;
}) {
  const description = patternDescription(pattern.pattern);
  const hedged = isHedged(pattern.confidence);

  return (
    <ResultSection title="What kind of disagreement it is">
      <div className="max-w-[36rem]">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h4 className="font-serif text-[1.375rem] leading-snug text-[var(--text-heading)]">
            {pattern.label}
          </h4>
          <span className="font-sans text-sm font-medium tabular-nums text-deep dark:text-accent-text">
            {percentLabel(pattern.confidence)}
          </span>
        </div>
        {description ? (
          <p className="mt-1 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
            {description}
          </p>
        ) : null}
        <Meter className="mt-3" value={pattern.confidence} tone="teal" />
        {hedged ? (
          <p className="mt-2 font-sans text-[0.8125rem] leading-relaxed text-[var(--text-muted)]">
            Below {percentLabel(DISPLAY_CONFIDENCE_HEDGE)}: the pattern is the most likely of
            eight, not a settled reading. The pipeline applies no threshold here.
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-5 border-t border-[var(--border-divider)] pt-6 sm:grid-cols-2">
        {SIGNAL_ROWS.map((row) => {
          const value = signals[row.key];
          const cleared = value >= signals.threshold;
          return (
            <LabelledMeter
              key={row.key}
              label={row.label}
              value={value}
              tone={row.tone}
              threshold={signals.threshold}
              note={
                row.gatesReplyLine
                  ? cleared
                    ? "Above the line, so the reply says so."
                    : "Below the line, so the reply stays quiet about it."
                  : undefined
              }
            />
          );
        })}
      </div>

      <p className="max-w-[36rem] font-sans text-[0.8125rem] text-[var(--text-muted)]">
        The tick on each track is the {percentLabel(signals.threshold)} threshold. All four
        signals are shown whether or not they cleared it.
      </p>
    </ResultSection>
  );
}
