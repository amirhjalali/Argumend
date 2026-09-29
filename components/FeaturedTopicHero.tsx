import Link from "next/link";
import {
  CRUX_SHEET,
  ENTRY_COLUMN,
  ENTRY_GRID,
  MARGIN_RULE,
  SettleAnswer,
} from "@/components/argument/DebateView";
import { CruxMovementTrack } from "@/components/argument/CruxMovement";
import { numberWord, type HomeCrux } from "@/components/home/homeModel";

interface FeaturedTopicHeroProps {
  /** Crux #1 of the map home's primary button opens (see homeModel). */
  crux: HomeCrux;
  /** That map's page. */
  href: string;
}

/**
 * Home, beat 2: one crux worked through. It is crux #1 of the same flagship
 * map the hero's button opens, drawn on the flagship crux sheet
 * (components/argument/DebateView.tsx): ruled paper, one crimson margin rule,
 * the question, what would settle it, how it has moved, and why it is still
 * open. A server component with no client JS; the data comes from the map's
 * own graph, engine ranking and public ledger.
 */
export function FeaturedTopicHero({ crux, href }: FeaturedTopicHeroProps) {
  // The same run-in leads the map page uses for this state of crux.
  const leads =
    crux.mode === "standing"
      ? { stakes: "Why it matters.", fight: "Where the sides part." }
      : crux.resolved
        ? { stakes: "What it changed.", fight: "Why it was open." }
        : { stakes: "What each answer changes.", fight: "Why it is still open." };

  return (
    <section aria-labelledby="home-crux-heading" className="px-4 md:px-8">
      <div className="mx-auto max-w-5xl border-t border-stone-300/70 py-10 dark:border-divider md:py-20">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
          <h2
            id="home-crux-heading"
            className="text-balance font-serif text-[2rem] leading-[1.08] tracking-[-0.01em] text-primary dark:text-stone-200 md:text-[2.5rem]"
          >
            What would change your mind?
          </h2>
          <p className="max-w-md font-serif text-[1.1875rem] leading-[1.5] text-secondary dark:text-stone-400 md:pt-2">
            Every map narrows a fight to a few questions like this one. It is
            the first of {numberWord(crux.cruxCount)} on{" "}
            <em>{crux.topicTitle}</em>
          </p>
        </div>

        <div className={`mt-6 md:mt-12 ${CRUX_SHEET}`}>
          <div className={MARGIN_RULE}>
            <div className={`${ENTRY_GRID} py-5 pr-4 sm:py-6 sm:pr-6`}>
              <span
                aria-hidden="true"
                className="row-span-5 pr-3 text-right font-serif text-[1.875rem] leading-[1.6rem] text-crux-text sm:pr-4 sm:text-[2.125rem] sm:leading-[1.75rem]"
              >
                {crux.rank}
              </span>
              <p className={`${ENTRY_COLUMN} label-caps !text-crux-text`}>The crux</p>
              <h3
                className={`${ENTRY_COLUMN} mt-1 max-w-3xl text-pretty font-serif text-[1.3125rem] font-medium leading-[1.3] text-stone-900 dark:text-stone-100 sm:text-[1.625rem]`}
              >
                {crux.question}
              </h3>
              {crux.implicit ? (
                <p
                  className={`${ENTRY_COLUMN} mt-2 max-w-2xl font-serif text-[1rem] italic leading-snug text-muted dark:text-stone-400`}
                >
                  A hidden assumption: nobody in the debate says it out loud,
                  but the positions lean on it.
                </p>
              ) : null}
              <p className={`${ENTRY_COLUMN} max-w-2xl`}>
                <SettleAnswer
                  mode={crux.mode}
                  kind={crux.kind}
                  condition={crux.condition}
                  resolved={crux.resolved}
                />
              </p>
              {crux.movement.length > 0 ? (
                <div className={`${ENTRY_COLUMN} mt-3.5 flex`}>
                  <CruxMovementTrack movement={crux.movement} />
                </div>
              ) : null}
            </div>
          </div>

          {crux.fight || crux.soWhat ? (
            <div className={MARGIN_RULE}>
              <div className={`${ENTRY_GRID} py-5 pr-4 sm:py-6 sm:pr-6`}>
                <div
                  className={`${ENTRY_COLUMN} grid gap-y-4 lg:grid-cols-2 lg:gap-x-12`}
                >
                  {crux.fight ? <RunIn lead={leads.fight}>{crux.fight}</RunIn> : null}
                  {crux.soWhat ? <RunIn lead={leads.stakes}>{crux.soWhat}</RunIn> : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <p className="mt-4 md:mt-6">
          <Link
            href={href}
            className="inline-flex min-h-11 items-center font-sans text-sm font-medium text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40"
          >
            Read the whole map
          </Link>
        </p>
      </div>
    </section>
  );
}

/** A paragraph with a run-in italic lead, as on the map page. */
function RunIn({ lead, children }: { lead: string; children: React.ReactNode }) {
  return (
    <p className="max-w-2xl font-serif text-[1rem] leading-[1.55] text-stone-800 dark:text-stone-200 sm:text-[1.0625rem]">
      <em className="font-medium text-stone-900 dark:text-stone-100">{lead}</em> {children}
    </p>
  );
}
