/**
 * The one topic page. Every map on /topics/[id] renders through this
 * template, in this order, whatever its data shape:
 *
 *   0. the map's illustration, when it has one, as the opening plate
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
import Image from "next/image";
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
import { OpenCruxFromHash } from "./OpenCruxFromHash";
import { TopicActions } from "./TopicActions";
import {
  cruxSheetHeading,
  HIDDEN_ASSUMPTION_NOTE,
  type CruxEntryData,
  type PositionCardData,
  type TopicHero,
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
  /** Where "How this map was made" goes; the methodology page by default. */
  madeByHref?: string;
}

const SITE = "https://argumend.org";

export function TopicPage({
  page,
  cruxes,
  afterCruxes,
  afterPositions,
  folds,
  madeBy,
  madeByHref = "/methodology",
}: TopicPageProps) {
  const url = `${SITE}/topics/${page.id}`;
  const reflectionOptions = cruxes.map((crux) => ({
    id: crux.anchor,
    label: crux.question,
    settle: crux.settle,
    strongest: crux.strongest,
  }));

  return (
    // The route wraps this in AppShell, which owns <main id="main-content">
    // and the site navigation.
    // The reading column is the site's reading width (PageContainer
    // "reading"); desktop adds the rail beside it inside the default width.
    <div
      className={`mx-auto w-full ${PAGE_WIDTHS.default} ${PAGE_GUTTER} pb-16 pt-4 sm:pt-6 lg:grid lg:grid-cols-[minmax(0,44rem)_13rem] lg:justify-center lg:gap-x-12`}
      data-topic-kind={page.kind}
    >
      {page.hero && <TopicPlate hero={page.hero} />}
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
        <OpenCruxFromHash />
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
        <TopicFooter
          related={page.related}
          questionPage={page.questionPage}
          title={page.title}
          madeBy={madeBy}
          madeByHref={madeByHref}
        />
      </article>

      <TopicRail page={page} cruxes={cruxes} url={url} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// 0. The opening plate
// ---------------------------------------------------------------------------

/**
 * The map's illustration as a wide, shallow band the page opens on: edge to
 * edge on a phone, across the reading column and the rail on a desktop. Its
 * edges dissolve into the page (.topic-plate), so it reads as painted on the
 * same paper as the text rather than pasted above it. Shallow on purpose: a
 * phone still reaches the question and the first crux early.
 *
 * The art carries no claim; its alt text is the one registered with it.
 * Dark mode dims it so the paper-toned art does not glare on the dark page.
 */
export function TopicPlate({ hero }: { hero: TopicHero }) {
  return (
    <figure
      data-testid="topic-plate"
      className="topic-plate relative -mx-4 -mt-4 aspect-[7/2] overflow-hidden sm:mx-0 sm:-mb-3 sm:-mt-2 lg:col-span-2 lg:aspect-[4/1]"
    >
      <Image
        src={hero.src}
        alt={hero.alt}
        width={hero.width}
        height={hero.height}
        priority
        sizes="(min-width: 1024px) 960px, (min-width: 640px) calc(100vw - 3rem), 100vw"
        style={hero.focus ? { objectPosition: hero.focus } : undefined}
        className="h-full w-full object-cover object-center dark:brightness-[0.6] dark:saturate-[0.8]"
      />
    </figure>
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
      <p className="label-caps -mt-1.5" data-testid="topic-kicker">
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
        <div className="mt-3 sm:mt-4">
          <p className="font-serif text-[1.125rem] leading-[1.5] text-stone-800 dark:text-stone-200 sm:text-[1.25rem]">
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
      className="mt-4 surface-paper rounded-lg border-l-[3px] border-l-deep/70 px-4 py-3.5 dark:border-l-[#8bb5b1]/60 sm:mt-6 sm:px-5 sm:py-4"
    >
      <h2
        id="agreement-heading"
        className="font-serif text-[1.1875rem] leading-snug text-stone-900 dark:text-stone-100 sm:text-[1.25rem]"
      >
        {heading}
      </h2>
      <ul className="mt-2 space-y-1.5 sm:mt-2.5 sm:space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 font-serif text-[1rem] leading-[1.45] text-stone-800 dark:text-stone-200 sm:leading-[1.5]"
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
  // One intro, not two. A map's own lede leads, with the tally of how the
  // questions could close after it; the generic "Settle one…" line is only
  // for a map that has no lede of its own.
  const lede = page.cruxLede
    ? [page.cruxLede, page.cruxTally].filter(Boolean).join(" ")
    : undefined;
  // The generic hidden-assumption line says the same thing for every crux, so
  // it appears once a page: under the first implicit crux with no authored
  // line. Later ones keep the tag alone rather than repeat it verbatim.
  const firstGenericImplicit = cruxes.find((crux) => crux.implicit && !crux.implicitNote);
  return (
    <Section
      id="cruxes"
      title={cruxSheetHeading(cruxes.length)}
      lede={!lede && page.cruxTally ? `Settle one and whole positions move. ${page.cruxTally}` : undefined}
      className="mt-6 sm:mt-8"
    >
      {lede && (
        <p
          data-crux-lede=""
          className="-mt-2 text-pretty font-serif text-[1rem] leading-[1.55] text-secondary dark:text-stone-300 sm:text-[1.0625rem] sm:leading-relaxed"
        >
          {lede}
        </p>
      )}
      <ol data-crux-sheet="" className={`${lede ? "mt-5" : ""} ${CRUX_SHEET}`}>
        {cruxes.map((crux, index) => (
          <CruxEntry
            key={crux.anchor}
            crux={crux}
            index={index}
            genericNote={crux === firstGenericImplicit}
          />
        ))}
      </ol>
    </Section>
  );
}

/** Long legacy crux statements drop a size so they don't dominate the sheet. */
const LONG_QUESTION = 150;

function CruxEntry({
  crux,
  index,
  genericNote,
}: {
  crux: CruxEntryView;
  index: number;
  genericNote: boolean;
}) {
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
              className={`text-pretty font-serif font-medium ${
                long
                  ? "text-[1.125rem] leading-[1.32] sm:text-[1.3125rem]"
                  : "text-[1.25rem] leading-[1.28] sm:text-[1.5rem]"
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
          {/* The question above is the assumption; the line says so without
              claiming nobody ever states it (see commit ba28380). A map's own
              line leads; the generic one shows once a page (see CruxSheet). */}
          {crux.implicit && (
            <span
              className={`${ENTRY_COLUMN} mb-2 mt-1.5 block font-serif text-[0.9375rem] italic leading-snug text-muted dark:text-stone-400`}
            >
              {crux.implicitNote || genericNote ? (
                <>
                  <span className="label-caps !text-[0.75rem] not-italic">Hidden assumption:</span>{" "}
                  {crux.implicitNote ?? HIDDEN_ASSUMPTION_NOTE}
                </>
              ) : (
                <span className="label-caps !text-[0.75rem] not-italic">Hidden assumption</span>
              )}
            </span>
          )}
          <span className={ENTRY_COLUMN}>
            <SettleAnswer
              mode={settle.mode}
              kind={settle.kind}
              condition={settle.condition}
              resolved={settle.resolved}
              label={settle.label}
              quiet
              // Closed on a phone, the answer shows three lines so the
              // questions stay scannable; opening the entry shows it whole.
              conditionClassName="max-sm:line-clamp-3 max-sm:group-open/crux:line-clamp-none"
            />
            {settle.note && (
              <span className="mt-1.5 block text-xs leading-snug text-muted dark:text-stone-400">
                {settle.note}
              </span>
            )}
          </span>
          {crux.track && <span className={`${ENTRY_COLUMN} mt-3.5 flex`}>{crux.track}</span>}
        </summary>
        {hasBody && (
          <div className={`${ENTRY_GRID} pb-6 pr-4`}>
            <span aria-hidden="true" />
            <div className="min-w-0 space-y-4 pl-4 sm:pl-5">
              {crux.flips && (
                <div className="space-y-3">
                  <MindChange
                    label={crux.flips.supporterLead}
                    tone="supporter"
                    text={crux.flips.supporter}
                  />
                  <MindChange
                    label={crux.flips.skepticLead}
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

/** "What would change the mind of someone who says yes / no…" — rust names the proponent side, brown the skeptic. */
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
  // Facing pages: the sides share one ruled spread, a hairline down the
  // middle, instead of sitting in two boxed cards. Each side's colour is a
  // short bar over its name; the name and the case are set in the text face,
  // because the sides are the argument's main characters, not its metadata.
  const spread = cards.length % 2 === 0;
  return (
    <Section id="positions" title={heading} lede={note} className="mt-10">
      <ul
        data-position-spread=""
        className={`grid border-y border-divider sm:grid-cols-2 ${
          spread
            ? "sm:relative sm:before:pointer-events-none sm:before:absolute sm:before:inset-y-6 sm:before:left-1/2 sm:before:border-l sm:before:border-divider sm:before:content-['']"
            : ""
        }`}
      >
        {cards.map((card, index) => (
          <li
            key={card.id}
            className={`min-w-0 py-5 sm:py-6 sm:odd:pr-7 sm:even:pl-7 ${
              index > 0 ? "border-t border-divider" : ""
            } ${index === 1 ? "sm:border-t-0" : ""}`}
          >
            <span
              aria-hidden="true"
              className="block h-[3px] w-10 rounded-full"
              style={{ backgroundColor: card.accent }}
            />
            <h3 className="mt-3 text-balance font-serif text-[1.3125rem] font-medium leading-snug text-stone-900 dark:text-stone-100">
              {card.label}
            </h3>
            <p className="mt-1.5 text-pretty font-serif text-[1.0625rem] leading-[1.55] text-stone-700 dark:text-stone-300">
              {card.summary}
            </p>
            {(card.full.length > 0 || card.heldBy || card.voice) && (
              <details className="group/position mt-1">
                <summary className={INLINE_SUMMARY}>
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
                      className="font-serif text-[1rem] leading-[1.6] text-secondary dark:text-stone-300"
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
 * a "Common questions" fold. Those whose context is more than the question
 * restated are also the page's FAQPage structured data (answer = the context
 * before its closing question; lib/topicPage/faqStructuredData.ts), which
 * Google only accepts when the questions are visible on the page.
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
  questionPage,
  title,
  madeBy,
  madeByHref,
}: {
  related: TopicPageData["related"];
  questionPage: TopicPageData["questionPage"];
  title: string;
  madeBy: string;
  madeByHref: string;
}) {
  // A question page worded exactly as the H1 is still linked, just not
  // announced as another phrasing.
  const sameWords =
    questionPage && questionPage.question.trim().toLowerCase() === title.trim().toLowerCase();
  return (
    <footer className="mt-12">
      {questionPage && (
        <p className="mb-6 text-sm leading-relaxed text-muted dark:text-stone-400" data-testid="question-page-link">
          {sameWords ? (
            <TextAction href={questionPage.href}>This question on one page →</TextAction>
          ) : (
            <>
              Also asked as{" "}
              <TextAction href={questionPage.href}>{questionPage.question} →</TextAction>
            </>
          )}
        </p>
      )}
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
        <TextAction href={madeByHref} className="!text-xs">
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
