import { ClosestMaps } from "./ClosestMaps";
import type { MapReplyNoMatch as MapReplyNoMatchResult, MapReplyNoMatchReason } from "@/lib/mapReply/types";
import { executionSummary } from "./MapReplyFooter";
import { Meter, percentLabel } from "./meters";

/**
 * A "no map" answer, which is a result rather than a failure.
 *
 * The pipeline is built to refuse rather than to guess: below the confidence
 * bar it returns no map at all, because a reply built off the wrong map would
 * be confidently, specifically wrong. So this view has to read as an answer,
 * not an error — it shows the bar that was missed, and the maps that came
 * closest, so a reader can see whether their argument is one Argumend has
 * simply never mapped.
 */

const HEADLINE: Record<MapReplyNoMatchReason, string> = {
  no_turns: "There was no argument in there to route",
  no_candidates: "No map on the site came close",
  low_confidence: "No map, rather than the wrong map",
  map_unavailable: "That map could not be loaded",
};

export function MapReplyNoMatch({
  result,
  onReset,
}: {
  result: MapReplyNoMatchResult;
  onReset: () => void;
}) {
  const { topicChoice, candidates } = result;

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="label-caps">
          No map
        </p>
        <h2 className="font-serif text-[2.125rem] leading-[1.1] text-[var(--text-heading)] sm:text-[2.75rem]">
          {HEADLINE[result.reason]}
        </h2>
        <p className="max-w-[36rem] font-serif text-xl leading-[1.5] text-[var(--text-secondary)]">
          {result.message}
        </p>
      </header>

      {topicChoice ? (
        <div className="max-w-md space-y-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-sans text-sm text-[var(--text-secondary)]">
              Best fit against the {percentLabel(topicChoice.threshold)} bar
            </span>
            <span className="font-sans text-sm tabular-nums text-[var(--text-muted)]">
              {percentLabel(topicChoice.confidence)}
            </span>
          </div>
          <Meter
            value={topicChoice.confidence}
            tone="stone"
            threshold={topicChoice.threshold}
          />
        </div>
      ) : null}

      <ClosestMaps
        title="Closest maps"
        lede="These are the maps the shortlist put in front of the model. None of them cleared the bar; one of them may still be what you are arguing about."
        maps={candidates.map((candidate) => ({
          id: candidate.id,
          title: candidate.title,
          claim: candidate.metaClaim,
        }))}
      />

      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-11 items-center rounded-md font-sans text-sm text-deep underline underline-offset-2 hover:text-deep-dark dark:text-accent-text dark:hover:text-stone-200"
        >
          Map another thread
        </button>
        <p className="font-sans text-xs text-[var(--text-muted)]">
          {executionSummary(result.execution)}{" "}
          {result.execution.lane === "fake" ? (
            <span className="whitespace-nowrap rounded-full border border-[var(--border-default)] px-2 py-0.5">
              fixtures, not a live model
            </span>
          ) : null}
        </p>
      </div>
    </article>
  );
}
