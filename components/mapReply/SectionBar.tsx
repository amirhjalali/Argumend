import type { MapReplySectionCount } from "@/lib/mapReply/types";
import { ResultSection } from "./ResultSection";

/**
 * Where the thread's turns actually landed on the map.
 *
 * One stacked bar rather than a chart: the only quantity is a count of turns,
 * and the thing worth seeing at a glance is the proportion — whether the
 * argument is concentrated in one section of the map or scattered across
 * three, and how much of it was not an argument at all. The dominant section
 * is the one at full strength; the rest are dimmed but never hidden, because
 * "you are also arguing about two other things" is part of the finding.
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

const NOISE_TONE = "bg-stone-300 dark:bg-stone-600";
const NOISE_ID = "none";

function toneFor(section: MapReplySectionCount, pillarIndex: number): string {
  if (section.id === NOISE_ID) return NOISE_TONE;
  return SECTION_TONES[pillarIndex % SECTION_TONES.length];
}

export function SectionBar({
  sectionCounts,
  dominantSectionId,
  substantiveCount,
}: {
  sectionCounts: MapReplySectionCount[];
  dominantSectionId: string | null;
  substantiveCount: number;
}) {
  const total = sectionCounts.reduce((sum, section) => sum + section.count, 0);
  const present = sectionCounts.filter((section) => section.count > 0);

  // Pillar order drives the palette, so a section keeps its colour whether or
  // not the sections before it received any turns.
  const pillarIndexById = new Map(
    sectionCounts
      .filter((section) => section.id !== NOISE_ID)
      .map((section, index) => [section.id, index] as const),
  );

  const unit = substantiveCount === 1 ? "turn" : "turns";

  return (
    <ResultSection
      title="What this thread is about"
      aside={`${substantiveCount} ${unit} routed`}
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
                    dominant ? "" : "opacity-50"
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
                    )} ${dominant ? "" : "opacity-50"}`}
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
                        largest share
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
    </ResultSection>
  );
}
