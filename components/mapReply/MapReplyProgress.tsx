"use client";

/**
 * The five stages of `lib/mapReply/pipeline.ts`, shown while the request is
 * out.
 *
 * A real run is 0.5-1 s and a dev run on the fake lane is instant, so this is
 * not a progress bar pretending to measure anything. It is a list of the work
 * the pipeline actually does, lit up in order, which is the honest version of
 * a spinner: a reader who sees "choosing map" and then "checking cruxes" has
 * learned what the tool did, and a reader who sees it flash past has lost
 * nothing.
 */
const STAGES = [
  "Parsing the turns",
  "Choosing a map",
  "Routing each turn to a section",
  "Probing the shape of the thread",
  "Checking which cruxes it touched",
] as const;

export function MapReplyProgress({ step }: { step: number }) {
  const active = Math.min(step, STAGES.length - 1);

  return (
    <div className="surface-card p-5">
      <p className="sr-only" aria-live="polite">
        {STAGES[active]}
      </p>
      <ol className="space-y-2.5">
        {STAGES.map((stage, index) => {
          const done = index < active;
          const current = index === active;
          return (
            <li key={stage} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full ${
                  done
                    ? "bg-deep dark:bg-deep-light"
                    : current
                      ? "animate-pulse bg-rust-500 dark:bg-rust-400"
                      : "bg-[var(--bg-overlay)]"
                }`}
              />
              <span
                className={`font-sans text-sm ${
                  current
                    ? "text-[var(--text-primary)]"
                    : done
                      ? "text-[var(--text-secondary)]"
                      : "text-[var(--text-muted)]"
                }`}
              >
                {stage}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
