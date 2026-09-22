import type { MapReplySectionCount, MapReplyThreadStats } from "@/lib/mapReply/types";
import { ResultSection } from "./ResultSection";

/**
 * Where the thread's turns actually landed on the map.
 *
 * One stacked bar rather than a chart: the only quantity is a count of turns,
 * and the thing worth seeing at a glance is the proportion — whether the
 * argument is concentrated in one section or scattered across three, how much
 * of it was not an argument at all, and how much the model could not place.
 *
 * The pipeline hands over three kinds of row and the bar keeps them distinct:
 * a pillar's `count` is confident placements only, `unplaced` is every turn
 * that fell below the section floor, and `none` is the turns that were not
 * arguments. A pillar's `tentative` count is annotated on its legend row
 * rather than added to the bar, because those turns are already inside the
 * unplaced segment and drawing them twice would inflate the thread.
 */

/** Static strings so Tailwind's scanner emits every swatch. */
const SECTION_TONES = [
  "bg-deep dark:bg-deep-light",
  "bg-rust-500 dark:bg-rust-400",
  "bg-skeptic dark:bg-skeptic-light",
  "bg-deep-dark dark:bg-deep",
  "bg-rust-700 dark:bg-rust-600",
  "bg-skeptic-dark dark:bg-skeptic",
] as const;

const UNPLACED_ID = "unplaced";
const NOISE_ID = "none";
const UNPLACED_TONE = "bg-stone-400 dark:bg-stone-500";
const NOISE_TONE = "bg-stone-300 dark:bg-stone-600";

function toneFor(section: MapReplySectionCount, pillarIndex: number): string {
  if (section.id === UNPLACED_ID) return UNPLACED_TONE;
  if (section.id === NOISE_ID) return NOISE_TONE;
  return SECTION_TONES[pillarIndex % SECTION_TONES.length];
}

/** What was left unchecked, said plainly rather than left to be inferred. */
export function coverageSentence(thread: MapReplyThreadStats): string | null {
  if (thread.unprobedCount <= 0) return null;
  if (thread.truncated) {
    return `Only the first ${thread.substantiveCount} of ${thread.turnCount} turns were checked.`;
  }
  const unit = thread.unprobedCount === 1 ? "turn was" : "turns were";
  return `${thread.unprobedCount} shorter ${unit} too brief to check.`;
}

export function SectionBar({
  sectionCounts,
  dominantSectionId,
  dominantIsTentative,
  unplacedCount,
  thread,
}: {
  sectionCounts: MapReplySectionCount[];
  dominantSectionId: string | null;
  /** True when nothing cleared the floor and the leader is a weak guess. */
  dominantIsTentative: boolean;
  unplacedCount: number;
  thread: MapReplyThreadStats;
}) {
  const total = sectionCounts.reduce((sum, section) => sum + section.count, 0);
  const present = sectionCounts.filter((section) => section.count > 0);
  const coverage = coverageSentence(thread);

  // Pillar order drives the palette, so a section keeps its colour whether or
  // not the sections before it received any turns.
  const pillarIndexById = new Map(
    sectionCounts
      .filter((section) => section.id !== NOISE_ID && section.id !== UNPLACED_ID)
      .map((section, index) => [section.id, index] as const),
  );

  const unit = thread.substantiveCount === 1 ? "turn" : "turns";

  return (
    <ResultSection
      title="What this thread is about"
      aside={`${thread.substantiveCount} ${unit} checked`}
    >
      {total === 0 ? (
        <p className="text-[var(--text-secondary)]">
          No turn in this thread was long enough to route to a section.
        </p>
      ) : (
        <>
          <div
            className="flex h-4 w-full overflow-hidden rounded-full bg-[var(--bg-overlay)]"
            aria-hidden="true"
          >
            {present.map((section) => {
              const dominant = section.id === dominantSectionId;
              return (
                <div
                  key={section.id}
                  className={`${toneFor(section, pillarIndexById.get(section.id) ?? 0)} ${
                    dominant && !dominantIsTentative ? "" : "opacity-50"
                  }`}
                  style={{ width: `${(section.count / total) * 100}%` }}
                />
              );
            })}
          </div>

          <ul className="space-y-2.5">
            {present.map((section) => {
              const dominant = section.id === dominantSectionId;
              return (
                <li key={section.id} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm ${toneFor(
                      section,
                      pillarIndexById.get(section.id) ?? 0,
                    )} ${dominant && !dominantIsTentative ? "" : "opacity-50"}`}
                  />
                  <span className="min-w-0 flex-1 font-sans text-sm">
                    <span
                      className={
                        dominant
                          ? "font-medium text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)]"
                      }
                    >
                      {section.title}
                    </span>
                    {dominant ? (
                      <span className="ml-2 whitespace-nowrap text-xs uppercase tracking-wide text-deep dark:text-deep-light">
                        {dominantIsTentative ? "best guess only" : "largest share"}
                      </span>
                    ) : null}
                    {section.tentative > 0 ? (
                      <span className="ml-2 whitespace-nowrap text-xs text-[var(--text-muted)]">
                        + {section.tentative} too weak to count
                      </span>
                    ) : null}
                  </span>
                  <span className="shrink-0 font-sans text-sm tabular-nums text-[var(--text-muted)]">
                    {section.count}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {dominantIsTentative ? (
        <p className="max-w-prose font-sans text-sm text-[var(--text-muted)]">
          No turn was placed on the map with confidence, so the leading section above is
          offered as a guess and nothing else on this page rests on it.
        </p>
      ) : null}

      {unplacedCount > 0 ? (
        <p className="max-w-prose font-sans text-sm text-[var(--text-muted)]">
          {unplacedCount} {unplacedCount === 1 ? "turn" : "turns"} the model placed too
          weakly to count. Each one still shows its best guess below.
        </p>
      ) : null}

      {coverage ? (
        <p className="max-w-prose font-sans text-sm text-[var(--text-muted)]">{coverage}</p>
      ) : null}
    </ResultSection>
  );
}
