/**
 * The one topic page. Every map on /topics/[id] renders through this
 * template, in this order, whatever its data shape:
 *
 *   1. breadcrumb + kicker ("Map · reviewed … · N sources")
 *   2. H1 = the question
 *   3. the hook
 *   4. what both sides already agree on
 *   5. the crux sheet: what the argument turns on, and what would settle it
 *   6. the positions, compact, full case folded
 *   7. a one-tap reflection (local only, never graded)
 *   8. Save · Share · Embed
 *   9. folds: the numbers, how the evidence weighs, researcher mode,
 *      common questions
 *  10. related maps and how the map was made
 *
 * Desktop keeps the same order in one reading column, with a sticky rail that
 * lists the crux questions and the actions. Server-safe: the only client code
 * is the reflection and the action buttons.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PAGE_GUTTER, PAGE_TITLE_SIZES, PAGE_WIDTHS, Section, TextAction } from "@/components/ui";
import {
  CRUX_SHEET,
  ENTRY_COLUMN,
  ENTRY_GRID,
  INLINE_SUMMARY,
  MARGIN_NUMERAL,
  MARGIN_RULE,
  RunIn,
  SettleAnswer,
} from "./cruxPrimitives";
import { CruxReflection } from "./CruxReflection";
import { TopicActions } from "./TopicActions";
import {
  cruxSheetHeading,
  type CruxEntryData,
  type PositionCardData,
  type TopicPageData,
} from "@/lib/topicPage/model";

/** A crux entry plus the view-specific slots a data shape can add. */
export interface CruxEntryView extends CruxEntryData {
  /** The movement strip, shown in the closed entry. */
  track?: ReactNode;
  /** Shown after the run-ins inside the open entry (the movement ledger). */
  afterRunIns?: ReactNode;
  /** Content of the entry's evidence disclosure. */
  evidence?: ReactNode;
  /** Label of that disclosure. */
  evidenceLabel?: string;
}

export interface TopicFold {
  id: string;
  title: string;
  /** One muted line under the title, visible while folded. */
  hint?: string;
  content: ReactNode;
}

export interface TopicPageProps {
  page: TopicPageData;
  cruxes: CruxEntryView[];
  /** Quiet links under the crux sheet (the living AI map, the diagram). */
  afterCruxes?: ReactNode;
  /** Shown after the positions (the flagship illustration). */
  afterPositions?: ReactNode;
  folds: TopicFold[];
  /** The provenance sentence before "How this map was made". */
  madeBy: string;
}

const SITE = "https://argumend.org";

export function TopicPage({
  page,
  cruxes,
  afterCruxes,
  afterPositions,
  folds,
  madeBy,
}: TopicPageProps) {
  const url = `${SITE}/topics/${page.id}`;
  const reflectionOptions = cruxes.map((crux) => ({ id: crux.anchor, label: crux.question }));

  return (
    // The route wraps this in AppShell, which owns <main id="main-content">
    // and the site navigation.
    // The reading column is the site's reading width (PageContainer
    // "reading"); desktop adds the rail beside it inside the default width.
    <div
      className={`mx-auto w-full ${PAGE_WIDTHS.default} ${PAGE_GUTTER} pb-16 pt-4 sm:pt-6 lg:grid lg:grid-cols-[minmax(0,44rem)_13rem] lg:justify-center lg:gap-12`}
      data-topic-kind={page.kind}
    >
      <article className={`mx-auto w-full min-w-0 ${PAGE_WIDTHS.reading} lg:mx-0`}>
        <TopicHeader page={page} />
        <AgreementBlock heading={page.agreementHeading} items={page.agreement} />
        <CruxSheet page={page} cruxes={cruxes} />
        {afterCruxes}
        <PositionCards
          heading={page.positionsHeading}
          note={page.positionsNote}
          cards={page.positions}
        />
        {afterPositions}
        {reflectionOptions.length > 0 && (
          <CruxReflection topicId={page.id} options={reflectionOptions} />
        )}
        <div className="mt-8 lg:hidden">
          <TopicActions
            topicId={page.id}
            title={page.title}
            url={url}
            embeddable={page.embeddable}
          />
        </div>
        <TopicFolds folds={folds} />
        <TopicFooter related={page.related} madeBy={madeBy} />
      </article>

      <TopicRail page={page} cruxes={cruxes} url={url} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1–3. Header
// ---------------------------------------------------------------------------

const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Deterministic display for date-only provenance values rendered on the server. */
export function formatIsoDate(value: string): string {
  const parsed = new Date(DATE_ONLY_RE.test(value) ? `${value}T00:00:00Z` : value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export function TopicHeader({ page }: { page: TopicPageData }) {
  const hook = page.hook;
  return (
    <header>
      <Breadcrumbs
        singleLine
        items={[
          { label: "Home", href: "/" },
          { label: "Maps", href: "/topics" },
          { label: page.crumb },
        ]}
      />
      <p className="label-caps" data-testid="topic-kicker">
        Map
        {page.reviewedOn && (
          <>
            {" · "}
            <time dateTime={page.reviewedOn}>reviewed {formatIsoDate(page.reviewedOn)}</time>
          </>
        )}
        {page.sourceCount > 0 && (
          <>
            {" · "}
            {page.sourceCount} {page.sourceCount === 1 ? "source" : "sources"}
          </>
        )}
      </p>
      {/* The site's page-title scale (components/ui PageHeader "page"); the
          display size would push the crux sheet off the first screen. */}
      <h1
        className={`mt-2 text-balance font-serif font-normal tracking-[-0.018em] text-primary ${PAGE_TITLE_SIZES.page}`}
      >
        {page.title}
      </h1>
      {page.subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-muted dark:text-stone-400">
          <span className="font-medium text-stone-700 dark:text-stone-300">
            {page.subtitle.lead}:
          </span>{" "}
          {page.subtitle.text}
        </p>
      )}
      {hook && (
        <div className="mt-4">
          <p className="font-serif text-[1.1875rem] leading-[1.5] text-stone-800 dark:text-stone-200 sm:text-[1.25rem]">
            {hook.text}
          </p>
          {hook.note && (
            <p className="mt-2 text-sm text-muted dark:text-stone-400">{hook.note}</p>
          )}
          {hook.source && (
            <p className="mt-1 text-xs text-muted dark:text-stone-400">
              {hook.source.url ? (
                <a
                  href={hook.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open source from ${hook.source.label} (opens in a new tab)`}
                  className="inline-flex min-h-11 items-center link-underline hover:text-stone-700 dark:hover:text-stone-200"
                >
                  {hook.source.label} ↗
                </a>
              ) : (
                <span>Source: {hook.source.label}</span>
              )}
            </p>
          )}
        </div>
      )}
    </header>
  );
}

// ---------------------------------------------------------------------------
// 4. What both sides already agree on
// ---------------------------------------------------------------------------

export function AgreementBlock({ heading, items }: { heading: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section
      id="agreement"
      aria-labelledby="agreement-heading"
      className="mt-6 surface-paper rounded-lg border-l-[3px] border-l-deep/70 p-4 dark:border-l-[#8bb5b1]/60 sm:px-5 sm:py-4"
    >
      <h2
        id="agreement-heading"
        className="font-serif text-[1.25rem] leading-snug text-stone-900 dark:text-stone-100"
      >
        {heading}
      </h2>
      <ul className="mt-2.5 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 font-serif text-[1.0625rem] leading-[1.5] text-stone-800 dark:text-stone-200 sm:text-[1rem]"
          >
            <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-deep/70 dark:bg-[#8bb5b1]/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 5. The crux sheet
// ---------------------------------------------------------------------------

export function CruxSheet({ page, cruxes }: { page: TopicPageData; cruxes: CruxEntryView[] }) {
  if (cruxes.length === 0) return null;
  return (
    <Section
      id="cruxes"
      title={cruxSheetHeading(cruxes.length)}
      lede={page.cruxTally ? `Settle one and whole positions move. ${page.cruxTally}` : undefined}
      className="mt-8"
    >
      {page.cruxLede && (
        <p className="-mt-2 text-pretty font-serif text-[1.0625rem] leading-relaxed text-secondary dark:text-stone-300">
          {page.cruxLede}
        </p>
      )}
      <ol data-crux-sheet="" className={`${page.cruxLede ? "mt-5" : ""} ${CRUX_SHEET}`}>
        {cruxes.map((crux, index) => (
          <CruxEntry key={crux.anchor} crux={crux} index={index} />
        ))}
      </ol>
    </Section>
  );
}

/** Long legacy crux statements drop a size so they don't dominate the sheet. */
const LONG_QUESTION = 150;

function CruxEntry({ crux, index }: { crux: CruxEntryView; index: number }) {
  const { settle } = crux;
  const long = crux.question.length > LONG_QUESTION;
  const hasBody =
    crux.runIns.length > 0 || crux.flips || crux.afterRunIns || crux.evidence;
  return (
    <li id={crux.anchor} className={MARGIN_RULE}>
      <details className="group/crux">
        <summary
          className={`${ENTRY_GRID} cursor-pointer list-none py-5 pr-4 transition-colors hover:bg-stone-900/[0.018] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus motion-reduce:transition-none dark:hover:bg-white/[0.025] sm:py-6 [&::-webkit-details-marker]:hidden`}
        >
          <span aria-hidden="true" className={MARGIN_NUMERAL}>
            {index + 1}
          </span>
          {crux.kicker && (
            <span
              className={`${ENTRY_COLUMN} mb-1.5 block text-[12.5px] leading-snug text-muted dark:text-stone-400`}
            >
              {crux.kicker}
            </span>
          )}
          {/* The heading is a direct child of <summary>, the one place its
              content model allows one. */}
          <h3 className={`${ENTRY_COLUMN} flex items-start gap-3`}>
            <span
              className={`text-pretty font-serif font-medium leading-[1.35] ${
                long
                  ? "text-[1.0625rem] sm:text-[1.1875rem]"
                  : "text-[1.1875rem] sm:text-[1.3125rem]"
              } ${
                settle.resolved
                  ? "text-stone-600 dark:text-stone-400"
                  : "text-stone-900 dark:text-stone-100"
              }`}
            >
              {crux.question}
            </span>
            {hasBody && (
              <span
                aria-hidden="true"
                className="ml-auto mt-0.5 shrink-0 font-sans text-xl leading-none text-muted transition-transform group-open/crux:rotate-90 motion-reduce:transition-none dark:text-stone-400"
              >
                ›
              </span>
            )}
          </h3>
          <span className={ENTRY_COLUMN}>
            <SettleAnswer
              mode={settle.mode}
              kind={settle.kind}
              condition={settle.condition}
              resolved={settle.resolved}
              label={settle.label}
            />
            {settle.note && (
              <span className="mt-1.5 block text-xs leading-snug text-muted dark:text-stone-400">
                {settle.note}
              </span>
            )}
          </span>
          {crux.track && <span className={`${ENTRY_COLUMN} mt-3.5 flex`}>{crux.track}</span>}
          {crux.implicit && (
            <span
              className={`${ENTRY_COLUMN} mt-3 font-serif text-[0.9375rem] italic leading-snug text-muted dark:text-stone-400`}
            >
              <span className="label-caps !text-[0.9375rem] not-italic">A hidden assumption:</span>{" "}
              nobody in the debate says it out loud, but the positions lean on it.
            </span>
          )}
        </summary>
        {hasBody && (
          <div className={`${ENTRY_GRID} pb-6 pr-4`}>
            <span aria-hidden="true" />
            <div className="min-w-0 space-y-4 pl-4 sm:pl-5">
              {crux.flips && (
                <div className="space-y-3">
                  <MindChange
                    label="A supporter changes their mind if…"
                    tone="supporter"
                    text={crux.flips.supporter}
                  />
                  <MindChange
                    label="A skeptic changes their mind if…"
                    tone="skeptic"
                    text={crux.flips.skeptic}
                  />
                </div>
              )}
              {crux.runIns.map((runIn) => (
                <RunIn key={runIn.lead} lead={runIn.lead} emphasis={runIn.emphasis}>
                  {runIn.text}
                </RunIn>
              ))}
              {crux.afterRunIns}
              {crux.evidence && (
                <details className="group/evidence">
                  <summary className={INLINE_SUMMARY}>
                    <span>{crux.evidenceLabel ?? "Show the evidence on each side"}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-base transition-transform group-open/evidence:rotate-90 motion-reduce:transition-none"
                    >
                      ›
                    </span>
                  </summary>
                  <div className="mt-3 space-y-3">{crux.evidence}</div>
                </details>
              )}
            </div>
          </div>
        )}
      </details>
    </li>
  );
}

/** "A supporter / a skeptic changes their mind if…" — rust names the proponent side, brown the skeptic. */
function MindChange({
  label,
  tone,
  text,
}: {
  label: string;
  tone: "supporter" | "skeptic";
  text: string;
}) {
  return (
    <div>
      <p
        className={`label-caps !text-[0.9375rem] ${
          tone === "supporter"
            ? "!text-rust-700 dark:!text-[#d4805f]"
            : "!text-[#8B5A3C] dark:!text-[#cfa88a]"
        }`}
      >
        {label}
      </p>
      <p className="mt-1 font-serif text-[1.0625rem] leading-[1.55] text-stone-800 dark:text-stone-200">
        {text}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 6. Positions
// ---------------------------------------------------------------------------

export function PositionCards({
  heading,
  note,
  cards,
}: {
  heading: string;
  note?: string;
  cards: PositionCardData[];
}) {
  if (cards.length === 0) return null;
  return (
    <Section id="positions" title={heading} lede={note} className="mt-10">
      <ul className="grid gap-3 sm:grid-cols-2">
        {cards.map((card) => (
          <li
            key={card.id}
            className="surface-card rounded-lg border-l-4 p-4"
            style={{ borderLeftColor: card.accent }}
          >
            <h3 className="text-[15px] font-medium text-stone-900 dark:text-stone-100">
              {card.label}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-secondary dark:text-stone-300">
              {card.summary}
            </p>
            {(card.full.length > 0 || card.heldBy || card.voice) && (
              <details className="group/position mt-1">
                <summary className={`${INLINE_SUMMARY} !text-xs`}>
                  <span>Read the full case</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-base transition-transform group-open/position:rotate-90 motion-reduce:transition-none"
                  >
                    ›
                  </span>
                </summary>
                <div className="mt-2 space-y-2">
                  {card.full.map((paragraph) => (
                    <p
                      key={paragraph.lead + paragraph.text.slice(0, 24)}
                      className="text-sm leading-relaxed text-secondary dark:text-stone-300"
                    >
                      {paragraph.lead && (
                        <em className="font-medium not-italic text-stone-900 dark:text-stone-100">
                          {paragraph.lead}
                        </em>
                      )}{" "}
                      {paragraph.text}
                    </p>
                  ))}
                  {card.voice && (
                    <p className="text-xs leading-relaxed text-secondary dark:text-stone-300">
                      <span className="font-medium text-muted dark:text-stone-400">
                        Related voice:
                      </span>{" "}
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        {card.voice.name}
                      </span>{" "}
                      <span className="text-muted dark:text-stone-400">
                        ({card.voice.affiliation})
                      </span>{" "}
                      {card.voice.line}
                    </p>
                  )}
                  {card.heldBy && (
                    <p className="text-xs text-muted dark:text-stone-400">Held by: {card.heldBy}</p>
                  )}
                </div>
              </details>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// 9. Folds
// ---------------------------------------------------------------------------

export function TopicFolds({ folds }: { folds: TopicFold[] }) {
  if (folds.length === 0) return null;
  return (
    <section aria-label="More about this map" className="mt-12 space-y-3">
      {folds.map((fold) => (
        <details
          key={fold.id}
          id={fold.id}
          className="group/fold surface-card rounded-lg"
        >
          <summary className="cursor-pointer list-none rounded-lg p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus [&::-webkit-details-marker]:hidden">
            {/* An h2, a direct child of <summary> (the one place its content
                model allows a heading), so the fold's own h3/h4s sit under
                it instead of under the reflection's h2 before it. */}
            <h2 className="flex items-start gap-3 font-serif text-lg font-normal leading-snug text-stone-900 dark:text-stone-100">
              <span>{fold.title}</span>
              <span
                aria-hidden="true"
                className="ml-auto shrink-0 font-sans text-xl leading-none text-muted transition-transform group-open/fold:rotate-90 motion-reduce:transition-none dark:text-stone-400"
              >
                ›
              </span>
            </h2>
            {fold.hint && (
              <span className="mt-1 block text-sm text-muted dark:text-stone-400">{fold.hint}</span>
            )}
          </summary>
          <div className="border-t border-stone-200 p-4 dark:border-[var(--border-divider)]">
            {fold.content}
          </div>
        </details>
      ))}
    </section>
  );
}

/**
 * A map's authored questions and the context behind each, as the content of
 * a "Common questions" fold. They are also the page's FAQPage structured
 * data, which Google only accepts when the questions are visible on the page.
 */
export function CommonQuestions({
  questions,
}: {
  questions: ReadonlyArray<{ id: string; title: string; content: string }>;
}) {
  return (
    <ul className="space-y-5">
      {questions.map((question) => (
        <li key={question.id}>
          <h3 className="font-serif text-[1.0625rem] font-medium leading-snug text-stone-900 dark:text-stone-100">
            {question.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-secondary dark:text-stone-300">
            {question.content}
          </p>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// 10. Related maps and provenance
// ---------------------------------------------------------------------------

function TopicFooter({
  related,
  madeBy,
}: {
  related: TopicPageData["related"];
  madeBy: string;
}) {
  return (
    <footer className="mt-12">
      <nav aria-label="Related maps">
        <Section title="Keep exploring" level={2}>
          <ul className="-mt-3 text-sm">
            {related.map((topic) => (
              <li key={topic.id}>
                <Link
                  href={`/topics/${topic.id}`}
                  className="inline-flex min-h-11 items-center link-underline text-stone-800 dark:text-stone-200"
                >
                  {topic.title} →
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/topics"
                className="inline-flex min-h-11 items-center link-underline text-stone-800 dark:text-stone-200"
              >
                Browse all maps →
              </Link>
            </li>
          </ul>
        </Section>
      </nav>
      <p className="mt-5 text-xs leading-relaxed text-muted dark:text-stone-400">
        {madeBy}{" "}
        <TextAction href="/methodology" className="!text-xs">
          How this map was made →
        </TextAction>
      </p>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Desktop rail
// ---------------------------------------------------------------------------

function TopicRail({
  page,
  cruxes,
  url,
}: {
  page: TopicPageData;
  cruxes: CruxEntryView[];
  url: string;
}) {
  return (
    <aside aria-label="On this page" className="hidden lg:block">
      <div className="sticky top-24 pt-24">
        <p className="label-caps mb-2">On this page</p>
        <ul className="list-none border-l border-stone-200/70 p-0 text-[13px] leading-snug dark:border-[var(--border-divider)]">
          {page.agreement.length > 0 && (
            <RailLink href="#agreement">Where they agree</RailLink>
          )}
          {cruxes.map((crux, index) => (
            <RailLink key={crux.anchor} href={`#${crux.anchor}`}>
              <span className="mr-1.5 font-serif text-[#a23b3b] dark:text-[#d27070]">
                {index + 1}
              </span>
              <span className="line-clamp-3">{crux.shortLabel}</span>
            </RailLink>
          ))}
          {page.positions.length > 0 && <RailLink href="#positions">{page.positionsHeading}</RailLink>}
        </ul>
        <div className="mt-8">
          <TopicActions
            topicId={page.id}
            title={page.title}
            url={url}
            embeddable={page.embeddable}
            stacked
          />
        </div>
      </div>
    </aside>
  );
}

function RailLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li className="-ml-px">
      <a
        href={href}
        className="flex min-h-11 items-start border-l-2 border-l-transparent py-2 pl-3 text-secondary dark:text-stone-400 transition-colors hover:border-l-deep hover:text-stone-900 dark:hover:text-stone-200"
      >
        {children}
      </a>
    </li>
  );
}
