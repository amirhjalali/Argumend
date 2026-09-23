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

/**
 * Static strings so Tailwind's scanner emits every swatch.
 *
 * One hue in steps, not the side colours: a section of the map is a topic,
 * not a side, and drawing one in rust and another in brown read as "for" and
 * "against" when neither is.
 */
const DOMINANT_TONE = "bg-deep dark:bg-deep-light";
const SECTION_TONES = [
  "bg-deep/55 dark:bg-deep-light/60",
  "bg-deep/30 dark:bg-deep-light/35",
  "bg-deep-dark/75 dark:bg-deep-light/80",
  "bg-deep-dark/40 dark:bg-deep-light/45",
  "bg-deep/15 dark:bg-deep-light/20",
] as const;

const UNPLACED_ID = "unplaced";
const NOISE_ID = "none";
const UNPLACED_TONE = "bg-stone-400 dark:bg-stone-500";
const NOISE_TONE = "bg-stone-300 dark:bg-stone-600";

function isPillar(section: MapReplySectionCount): boolean {
  return section.id !== NOISE_ID && section.id !== UNPLACED_ID;
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

  // The section with the largest share is always the darkest step, so the
  // eye lands on it first; the other pillars take lighter steps in map order.
  const toneById = new Map<string, string>();
  let step = 0;
  for (const section of sectionCounts) {
    if (section.id === UNPLACED_ID) toneById.set(section.id, UNPLACED_TONE);
    else if (section.id === NOISE_ID) toneById.set(section.id, NOISE_TONE);
    else if (section.id === dominantSectionId) toneById.set(section.id, DOMINANT_TONE);
    else toneById.set(section.id, SECTION_TONES[step++ % SECTION_TONES.length]);
  }
  const toneFor = (section: MapReplySectionCount) => toneById.get(section.id) ?? SECTION_TONES[0];

  const unit = thread.substantiveCount === 1 ? "turn" : "turns";

  // When nothing cleared the floor, every section is a guess: the pillar
  // segments are drawn faded so the bar does not look like a firm result.
  const dimFor = (section: MapReplySectionCount) =>
    dominantIsTentative && isPillar(section)
      ? "opacity-60"
      : "";

  return (
    <ResultSection
      title="What this thread is about"
      aside={`${thread.substantiveCount} ${unit} checked`}
    >
      {total === 0 ? (
        <p className="font-sans text-[0.9375rem] text-[var(--text-secondary)]">
          No turn in this thread was long enough to route to a section.
        </p>
      ) : (
        <>
          <div
            className="flex h-3 w-full gap-px overflow-hidden rounded-sm bg-[var(--bg-overlay)]"
            aria-hidden="true"
          >
            {present.map((section) => (
              <div
                key={section.id}
                className={`${toneFor(section)} ${dimFor(section)}`}
                style={{ width: `${(section.count / total) * 100}%` }}
              />
            ))}
          </div>

          <ul className="divide-y divide-[var(--border-divider)] border-b border-[var(--border-divider)]">
            {present.map((section) => {
              const dominant = section.id === dominantSectionId;
              return (
                <li key={section.id} className="flex items-start gap-3 py-2.5">
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm ${toneFor(section)} ${dimFor(section)}`}
                  />
                  <span className="min-w-0 flex-1 font-sans text-[0.9375rem] leading-snug">
                    <span
                      className={
                        dominant
                          ? "font-semibold text-[var(--text-heading)]"
                          : "text-[var(--text-secondary)]"
                      }
                    >
                      {section.title}
                    </span>
                    {dominant || section.tentative > 0 ? (
                      <span className="mt-0.5 flex flex-wrap gap-x-3 text-[0.8125rem]">
                        {dominant ? (
                          <span className="text-deep dark:text-deep-light">
                            {dominantIsTentative ? "best guess only" : "largest share"}
                          </span>
                        ) : null}
                        {section.tentative > 0 ? (
                          <span className="text-[var(--text-muted)]">
                            + {section.tentative} too weak to count
                          </span>
                        ) : null}
                      </span>
                    ) : null}
                  </span>
                  <span className="shrink-0 font-serif text-lg leading-none tabular-nums text-[var(--text-primary)]">
                    {section.count}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {dominantIsTentative ? (
        <p className="max-w-[36rem] font-sans text-sm leading-relaxed text-[var(--text-muted)]">
          No turn was placed on the map with confidence, so the leading section above is
          offered as a guess and nothing else on this page rests on it.
        </p>
      ) : null}

      {unplacedCount > 0 ? (
        <p className="max-w-[36rem] font-sans text-sm leading-relaxed text-[var(--text-muted)]">
          {unplacedCount} {unplacedCount === 1 ? "turn" : "turns"} the model placed too
          weakly to count. Each one still shows its best guess below.
        </p>
      ) : null}

      {coverage ? (
        <p className="max-w-[36rem] font-sans text-sm leading-relaxed text-[var(--text-muted)]">{coverage}</p>
      ) : null}
    </ResultSection>
  );
}
