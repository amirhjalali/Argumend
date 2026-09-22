import Link from "next/link";
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
    <article className="space-y-6">
      <header className="space-y-3">
        <p className="font-sans text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
          No map
        </p>
        <h2 className="font-serif text-3xl leading-tight text-[var(--text-heading)]">
          {HEADLINE[result.reason]}
        </h2>
        <p className="max-w-prose text-lg leading-relaxed text-[var(--text-secondary)]">
          {result.message}
        </p>
      </header>

      {topicChoice ? (
        <div className="max-w-md space-y-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-sans text-xs uppercase tracking-wide text-[var(--text-muted)]">
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

      {candidates.length > 0 ? (
        <section className="space-y-3 border-t border-[var(--border-divider)] pt-6">
          <h3 className="font-serif text-2xl text-[var(--text-heading)]">Closest maps</h3>
          <p className="max-w-prose text-sm text-[var(--text-secondary)]">
            These are the maps the shortlist put in front of the model. None of them cleared the
            bar; one of them may still be what you are arguing about.
          </p>
          <ul className="space-y-3">
            {candidates.map((candidate) => (
              <li key={candidate.id}>
                <Link
                  href={`/topics/${candidate.id}`}
                  className="card-hover block rounded-xl bg-[var(--bg-paper)] p-4"
                >
                  <span className="font-serif text-lg leading-snug text-[var(--text-heading)]">
                    {candidate.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-[var(--text-secondary)]">
                    {candidate.metaClaim}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="space-y-3 border-t border-[var(--border-divider)] pt-6">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-11 items-center rounded-md font-sans text-sm text-deep underline underline-offset-2 hover:text-deep-dark dark:text-deep-light dark:hover:text-stone-200"
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
