/**
 * DebateView — the progressive-disclosure experience for ArgumentGraph topics.
 *
 * Redesigned 2026-08-11 after a four-model product critique
 * (docs/reviews/2026-08-11-product-critique/): lead with insight, not
 * inventory. The page is a vertical read — hook → what the fight is really
 * about → the four camps in one line each → the five questions the fight
 * turns on → steal-able numbers → payoff — with the full apparatus (steelmen,
 * status bases, every claim) one tap deeper, never gone. Zero client JS for
 * the core (native <details>); no canvas bundle; designed at 390px.
 */
import Image from "next/image";
import Link from "next/link";
import type {
  ArgumentGraph,
  ArgumentEdge,
  ArgumentNode,
  Claim,
  Position,
  ResolutionKind,
} from "@/types/argument";
import type { CruxResult } from "@/lib/crux";
import type { CruxLedgerEntry, CruxLedgerStatus } from "@/types/cruxLedger";
import { claimMovement } from "@/lib/argument/ledger";
import type { ArgumentTopicMeta } from "@/lib/argument/draftTopics";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { ARGUMENT_TOPICS_LAST_UPDATED } from "@/lib/site";
import { DivergenceChart } from "./DivergenceChart";
import { ShareCard } from "./ShareCard";
import {
  CruxMovementLedger,
  CruxMovementTrack,
  standingLineFor,
} from "./CruxMovement";

// Position accent colors from the design system: teal, rust, brown, crimson.
const POSITION_ACCENTS = ["#3a6965", "#C4613C", "#8B5A3C", "#a23b3b"];

const EPISTEMIC_LABELS: Record<Claim["epistemicType"], string> = {
  empirical: "Empirical",
  predictive: "Predictive",
  normative: "Values",
  definitional: "Definitional",
  procedural: "Who decides",
};

const STATUS_LABELS: Record<Claim["status"], string> = {
  uncontested: "Uncontested",
  broadly_accepted: "Broadly accepted",
  contested: "Contested",
  unresolved: "Unresolved",
  superseded: "Superseded",
};

interface DebateViewProps {
  meta: ArgumentTopicMeta;
  graph: ArgumentGraph;
  cruxes: CruxResult[];
  /**
   * Crux-ledger entries for this topic. Only the public projection is ever
   * rendered (unreviewed model proposals are filtered out here as well as
   * upstream). Omitted or empty: the crux cards render exactly as before.
   */
  ledger?: CruxLedgerEntry[];
}

export function DebateView({ meta, graph, cruxes, ledger = [] }: DebateViewProps) {
  const nodesById = new Map(graph.nodes.map((n) => [n.id, n]));
  const question = graph.nodes.find((n) => n.type === "question");
  const positions = graph.nodes
    .filter((n): n is Position => n.type === "position")
    .sort((a, b) => a.displayRank - b.displayRank);
  const claims = graph.nodes.filter(
    (n): n is Claim => n.type === "claim" && n.status !== "superseded"
  );
  const cruxClaimIds = new Set(cruxes.map((c) => c.claimId));
  const relatedTopics = argumentTopicIndex
    .filter((topic) => topic.id !== meta.id)
    .slice(0, 2);
  const scopedQuestion = question?.statement.trim();

  return (
    // The route wraps this in AppShell, which owns <main id="main-content">
    // and the site navigation; this column only keeps the reading measure.
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">

      <article>
        {/* ---------------- Layer 1: hook and the shape of the fight ---------------- */}
        <header>
        {meta.hero && (
          <Image
            src={meta.hero.src}
            alt={meta.hero.alt}
            width={1600}
            height={1066}
            priority
            sizes="(max-width: 672px) calc(100vw - 2rem), 640px"
            className="mb-6 w-full rounded-lg ring-1 ring-stone-900/5 dark:brightness-[0.85] dark:ring-white/5"
          />
        )}
        <p className="label-caps">
          Debate map,{" "}
          <time dateTime={ARGUMENT_TOPICS_LAST_UPDATED}>
            Reviewed {formatIsoDate(ARGUMENT_TOPICS_LAST_UPDATED)}
          </time>
        </p>
        <h1 className="mt-2 text-balance font-serif text-[2.25rem] sm:text-5xl leading-[1.08] tracking-[-0.02em] text-stone-900 dark:text-stone-100">
          {meta.title}
        </h1>
        {scopedQuestion && scopedQuestion !== meta.title && (
          <p className="mt-3 text-sm leading-relaxed text-muted dark:text-stone-400">
            <span className="font-medium text-stone-700 dark:text-stone-300">
              Scope:
            </span>{" "}
            {scopedQuestion}
          </p>
        )}
        <p className="mt-5 font-serif text-[1.3125rem] leading-[1.5] text-stone-800 dark:text-stone-200">
          {meta.hook}
        </p>
        {meta.contextNote && (
          <p className="mt-2 text-sm text-muted dark:text-stone-400">
            {meta.contextNote}
          </p>
        )}
        <div className="mt-6 surface-paper rounded-lg border-l-[3px] border-l-deep/70 p-4 sm:p-5 dark:border-l-[#8bb5b1]/60">
          <p className="label-caps">What this map shows</p>
          <p className="mt-1.5 text-sm leading-relaxed text-secondary dark:text-stone-300">
            {meta.tldr}
          </p>
          <a
            href="#cruxes"
            className="mt-3 inline-flex min-h-11 items-center font-medium text-sm text-deep link-underline dark:text-[#9bc7c3]"
          >
            Jump to the five crux questions ↓
          </a>
        </div>
        {meta.shareCard && <ShareCard {...meta.shareCard} />}
        {meta.id === "ai-mass-unemployment" && <DivergenceChart />}
        </header>

      <section aria-label="Positions" className="mt-10">
        <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
          The four camps
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-muted dark:text-stone-400">
          Related voices illustrate an argument or evidence stream; inclusion does not
          mean they endorse every claim in that camp.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {positions.map((position, index) => (
            <li
              key={position.id}
              className="surface-card rounded-lg p-4 border-l-4"
              style={{ borderLeftColor: POSITION_ACCENTS[index % POSITION_ACCENTS.length] }}
            >
              <h3 className="font-medium text-[15px] text-stone-900 dark:text-stone-100">
                {position.label}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-secondary dark:text-stone-300">
                {position.summary ?? position.statement}
              </p>
              {meta.advocates?.[position.id] && (
                <p className="mt-2 text-xs leading-relaxed text-secondary dark:text-stone-300">
                  <span className="font-medium text-muted dark:text-stone-400">
                    Related voice:
                  </span>{" "}
                  <span className="font-medium text-stone-800 dark:text-stone-200">
                    {meta.advocates[position.id].name}
                  </span>{" "}
                  <span className="text-muted dark:text-stone-400">
                    ({meta.advocates[position.id].affiliation})
                  </span>{" "}
                  {meta.advocates[position.id].line}
                </p>
              )}
              {position.summary ? (
                <details className="group/position mt-1">
                  <summary className="-mx-1 inline-flex min-h-11 w-[calc(100%+0.5rem)] cursor-pointer list-none items-center justify-between gap-2 rounded px-1 text-xs font-medium text-muted hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep dark:text-stone-400 dark:hover:text-stone-200 dark:focus-visible:ring-[#6fa39e] [&::-webkit-details-marker]:hidden">
                    <span>Read the full case</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-base transition-transform group-open/position:rotate-90 motion-reduce:transition-none"
                    >
                      ›
                    </span>
                  </summary>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm leading-relaxed text-secondary dark:text-stone-300">
                      {position.statement}
                    </p>
                    <p className="text-xs text-muted dark:text-stone-400">
                      Held by: {position.constituency}
                    </p>
                  </div>
                </details>
              ) : (
                <p className="mt-2 text-xs text-muted dark:text-stone-400">
                  Held by: {position.constituency}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- Layer 2: the cruxes ----------------
          One ruled sheet, not five alarm-bordered cards: a ledger page with a
          single crimson margin rule and crimson numerals in the margin. Each
          entry leads with its status in the only form that matters to a
          reader: what would settle it, or that nothing does. */}
      <section id="cruxes" aria-label="Cruxes" className="mt-12 scroll-mt-4">
        <h2 className="font-serif text-[1.625rem] leading-tight text-stone-900 dark:text-stone-100">
          The whole fight turns on {numberWord(cruxes.length).toLowerCase()}{" "}
          {cruxes.length === 1 ? "question" : "questions"}
        </h2>
        <p className="mt-2 text-pretty font-serif text-[1.0625rem] leading-relaxed text-secondary dark:text-stone-300">
          Settle one and whole positions move. {settleTally(cruxes, nodesById, ledger)}
        </p>
        <ol className={`mt-5 ${CRUX_SHEET}`}>
            {cruxes.map((crux, index) => {
              const claim = nodesById.get(crux.claimId);
              if (claim?.type !== "claim") return null;
              const note = meta.cruxNotes?.[crux.claimId];
              const movement = claimMovement(ledger, crux.claimId);
              const latestEntry = movement.at(-1)?.entry;
              const latestStatus = latestEntry?.status;
              const isResolved = latestStatus === "resolved";
              // A ledger that calls the crux unresolvable names the kind of fork.
              const kind =
                latestStatus === "unresolvable"
                  ? (latestEntry?.resolutionKind ?? claim.resolution?.kind)
                  : claim.resolution?.kind;
              const mode = settleMode(claim, latestStatus);
              const condition = claim.resolution?.condition;
              const leads = mode === "standing"
                ? { stakes: "Why it matters.", fight: "Where the sides part." }
                : isResolved
                  ? { stakes: "What it changed.", fight: "Why it was open." }
                  : { stakes: "What each answer changes.", fight: "Why it is still open." };
              return (
                <li key={crux.claimId} className={MARGIN_RULE}>
                  <details className="group/crux">
                    <summary
                      className={`${ENTRY_GRID} cursor-pointer list-none py-5 pr-4 transition-colors hover:bg-stone-900/[0.018] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep motion-reduce:transition-none dark:hover:bg-white/[0.025] dark:focus-visible:ring-[#6fa39e] sm:py-6 [&::-webkit-details-marker]:hidden`}
                    >
                      <span
                        aria-hidden="true"
                        className="row-span-4 pr-3 text-right font-serif text-[1.875rem] leading-[1.6rem] text-[#a23b3b] dark:text-[#d27070] sm:pr-4 sm:text-[2.125rem] sm:leading-[1.75rem]"
                      >
                        {index + 1}
                      </span>
                      {/* The heading is a direct child of <summary>, the one
                          place its content model allows one. */}
                      <h3 className={`${ENTRY_COLUMN} flex items-start gap-3`}>
                        <span
                          className={`text-pretty font-serif text-[1.1875rem] font-medium leading-[1.35] sm:text-[1.3125rem] ${
                            isResolved
                              ? "text-stone-600 dark:text-stone-400"
                              : "text-stone-900 dark:text-stone-100"
                          }`}
                        >
                          {note?.question ?? claim.summary ?? claim.statement}
                        </span>
                        <span
                          aria-hidden="true"
                          className="ml-auto mt-0.5 shrink-0 font-sans text-xl leading-none text-muted transition-transform group-open/crux:rotate-90 motion-reduce:transition-none dark:text-stone-400"
                        >
                          ›
                        </span>
                      </h3>
                      <span className={ENTRY_COLUMN}>
                        <SettleAnswer
                          mode={mode}
                          kind={kind}
                          condition={condition}
                          resolved={isResolved}
                        />
                      </span>
                      {movement.length > 0 && (
                        <span className={`${ENTRY_COLUMN} mt-3.5 flex`}>
                          <CruxMovementTrack movement={movement} />
                        </span>
                      )}
                      {claim.implicit && (
                        <span
                          className={`${ENTRY_COLUMN} mt-3 font-serif text-[0.9375rem] italic leading-snug text-muted dark:text-stone-400`}
                        >
                          <span className="label-caps !text-[0.9375rem] not-italic">
                            A hidden assumption:
                          </span>{" "}
                          nobody in the debate says it out loud, but the positions lean on it.
                        </span>
                      )}
                    </summary>
                    <div className={`${ENTRY_GRID} pb-6 pr-4`}>
                      <span aria-hidden="true" />
                      <div className="min-w-0 space-y-4 pl-4 sm:pl-5">
                        <RunIn lead={leads.stakes} emphasis>
                          {note?.soWhat ?? renderStakes(crux, nodesById)}
                        </RunIn>
                        <RunIn lead={leads.fight}>
                          {note?.fight ?? claim.statusBasis}
                        </RunIn>
                        {mode === "standing" && condition && (
                          <RunIn lead={STANDING_CONDITION_LEAD[claim.resolution!.kind]}>
                            {asSentence(condition)}
                          </RunIn>
                        )}
                        <CruxMovementLedger
                          movement={movement}
                          claimId={crux.claimId}
                          nodesById={nodesById}
                          standingLineShown={mode === "standing"}
                        />
                        <details className="group/evidence">
                          <summary className="-mx-1 inline-flex min-h-11 w-[calc(100%+0.5rem)] cursor-pointer list-none items-center justify-between gap-2 rounded px-1 text-[0.8125rem] font-medium text-muted hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep dark:text-stone-400 dark:hover:text-stone-200 dark:focus-visible:ring-[#6fa39e] [&::-webkit-details-marker]:hidden">
                            <span>Show the evidence and the exact claim</span>
                            <span
                              aria-hidden="true"
                              className="shrink-0 text-base transition-transform group-open/evidence:rotate-90 motion-reduce:transition-none"
                            >
                              ›
                            </span>
                          </summary>
                          <div className="mt-3 space-y-3">
                            <DetailBlock label="The claim, precisely">
                              {claim.statement}
                            </DetailBlock>
                            <DetailBlock label="Status basis">
                              {claim.statusBasis}
                            </DetailBlock>
                            <ClaimEvidence claim={claim} graph={graph} nodesById={nodesById} />
                          </div>
                        </details>
                      </div>
                    </div>
                  </details>
                </li>
              );
            })}
        </ol>
        {AI_MAP_IDS.has(meta.id) && (
          <p className="mt-2">
            <Link
              href="/ai"
              className="inline-flex min-h-11 items-center text-sm text-secondary link-underline hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
            >
              What has moved across the AI maps →
            </Link>
          </p>
        )}
      </section>

      {/* ---------------- Steal-able numbers ---------------- */}
      {meta.highlights.length > 0 && (
        <section aria-label="Key numbers" className="mt-10">
          <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
            {meta.highlightsHeading ?? "Numbers worth stealing"}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {meta.highlights.map((highlight) => (
              <li key={highlight.fact} className="surface-card rounded-lg p-4">
                <p className="font-serif text-3xl text-[#3a6965] dark:text-[#6fa39e]">
                  {highlight.fact}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-secondary dark:text-stone-300">
                  {highlight.context}
                </p>
                <p className="mt-2 text-[11px] text-muted dark:text-stone-400">
                  {highlight.source}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------------- Payoff ---------------- */}
      {meta.takeaways.length > 0 && (
        <section aria-label="Takeaways" className="mt-10 surface-paper rounded-lg p-4 sm:p-5">
          <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
            What you can honestly say after five minutes
          </h2>
          <ul className="mt-3 space-y-2.5">
            {meta.takeaways.map((takeaway) => (
              <li
                key={takeaway.slice(0, 40)}
                className="flex gap-2.5 text-sm leading-relaxed text-secondary dark:text-stone-300"
              >
                <span className="text-[#C4613C]" aria-hidden>
                  →
                </span>
                {takeaway}
              </li>
            ))}
          </ul>
        </section>
      )}


      {/* ---------------- The closer ---------------- */}
      {meta.closer && (
        <section aria-label="Where the camps split" className="mt-10">
          <h2 className="font-serif text-xl leading-snug text-stone-900 dark:text-stone-100">
            {meta.closer.heading}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {meta.closer.splits.map((split) => (
              <li key={split.camp} className="text-sm leading-relaxed">
                <span className="font-medium text-stone-900 dark:text-stone-100">
                  {split.camp}:
                </span>{" "}
                <span className="text-secondary dark:text-stone-300">
                  {split.reading}
                </span>
              </li>
            ))}
          </ul>
          <blockquote className="mt-5 border-l-[3px] border-l-deep/70 surface-paper rounded-r-lg p-4 sm:p-5 dark:border-l-[#8bb5b1]/60">
            <p className="label-caps">If you only remember one thing</p>
            <p className="mt-1.5 font-serif text-[1.1875rem] leading-[1.55] text-stone-900 dark:text-stone-100">
              {meta.closer.take}
            </p>
          </blockquote>
        </section>
      )}

      {/* ---------------- Layer 3: researcher mode ---------------- */}
      <section aria-label="All claims" className="mt-10">
        <h2 className="sr-only">All claims</h2>
        <details className="group/researcher surface-card rounded-lg">
          <summary className="cursor-pointer list-none rounded-lg p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep dark:focus-visible:ring-[#6fa39e] [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-lg text-stone-900 dark:text-stone-100">
              Researcher mode
            </span>
            <span
              aria-hidden="true"
              className="float-right ml-2 text-xl text-muted transition-transform group-open/researcher:rotate-90 motion-reduce:transition-none dark:text-stone-400"
            >
              ›
            </span>
            <span className="block mt-1 text-sm text-muted dark:text-stone-400">
              All {claims.length} claims with their evidence, objections, status,
              and source-interest disclosures.
            </span>
          </summary>
          <div className="border-t border-stone-200 dark:border-[var(--border-divider)] p-3.5 space-y-2">
            {claims
              .filter((c) => !cruxClaimIds.has(c.id))
              .sort(byStatusSeverity)
              .map((claim) => (
                <details key={claim.id} className="group/claim surface-paper rounded-lg">
                  <summary className="cursor-pointer list-none rounded-lg p-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep dark:focus-visible:ring-[#6fa39e] [&::-webkit-details-marker]:hidden">
                    <h3 className="text-sm leading-snug text-stone-900 dark:text-stone-100">
                      <span className="flex items-start gap-2">
                        <span>{claim.summary ?? claim.statement}</span>
                        <span
                          aria-hidden="true"
                          className="ml-auto shrink-0 text-base text-muted transition-transform group-open/claim:rotate-90 motion-reduce:transition-none dark:text-stone-400"
                        >
                          ›
                        </span>
                      </span>
                      <span className="mt-1.5 flex flex-wrap gap-1.5">
                        <Chip>{EPISTEMIC_LABELS[claim.epistemicType]}</Chip>
                        <Chip>{STATUS_LABELS[claim.status]}</Chip>
                        {claim.implicit && <Chip>Hidden assumption</Chip>}
                      </span>
                    </h3>
                  </summary>
                  <div className="border-t border-stone-200 dark:border-[var(--border-divider)] px-3.5 py-3.5 space-y-3">
                    {claim.summary && (
                      <p className="text-sm leading-relaxed text-secondary dark:text-stone-300">
                        {claim.statement}
                      </p>
                    )}
                    <DetailBlock label="Status basis">{claim.statusBasis}</DetailBlock>
                    <ClaimEvidence claim={claim} graph={graph} nodesById={nodesById} />
                  </div>
                </details>
              ))}
          </div>
        </details>
      </section>

      <footer className="mt-10">
        {relatedTopics.length > 0 && (
          <nav aria-label="Related debate maps" className="mb-5">
            <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100">
              Keep exploring
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {relatedTopics.map((topic) => (
                <li key={topic.id}>
                  <Link href={`/topics/${topic.id}`} className="link-underline">
                    {topic.title} →
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/topics" className="link-underline">
                  Browse all topics →
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <p className="text-xs leading-relaxed text-muted dark:text-stone-400">
          Assembled by AI. Every source linked and checked, interests disclosed
          inline, balance adversarially reviewed, crux rankings reproducible.{" "}
          <Link href="/methodology" className="link-underline">
            How this map was made →
          </Link>
        </p>
      </footer>
      </article>
    </div>
  );
}

// ---------------------------------------------------------------------------

const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Deterministic display for date-only provenance values rendered on the server. */
function formatIsoDate(value: string): string {
  const parsed = new Date(DATE_ONLY_RE.test(value) ? `${value}T00:00:00Z` : value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

/** "Settling this strengthens X and weakens Y." — stakes as one plain sentence. */
function renderStakes(
  crux: CruxResult,
  nodesById: Map<string, ArgumentNode>
): string {
  const strengthens: string[] = [];
  const weakens: string[] = [];
  for (const p of crux.affectedPositions) {
    const pos = nodesById.get(p.id);
    if (pos?.type !== "position") continue;
    (p.delta >= 0 ? strengthens : weakens).push(`“${pos.label}”`);
  }
  const parts: string[] = [];
  if (strengthens.length > 0) parts.push(`strengthens ${strengthens.join(" and ")}`);
  if (weakens.length > 0) parts.push(`weakens ${weakens.join(" and ")}`);
  if (parts.length === 0) return "Reshapes the map without picking a side.";
  return `If this turns out true, it ${parts.join(" and ")}.`;
}

// ---------------------------------------------------------------------------
// Crux entry parts
// ---------------------------------------------------------------------------

/** Maps covered by the living AI page at /ai, which links back from here. */
const AI_MAP_IDS: ReadonlySet<string> = new Set(["ai-mass-unemployment", "capitalism-after-ai"]);

/** The crux sheet: one ruled card, hairline rules between entries. Shared with /ai. */
export const CRUX_SHEET =
  "surface-card overflow-hidden !rounded-lg divide-y divide-stone-200/90 dark:divide-[#3d3a36]";
/** Numeral gutter | entry. The margin rule sits on the column boundary. */
export const ENTRY_GRID = "grid grid-cols-[2.5rem_minmax(0,1fr)] sm:grid-cols-[3.75rem_minmax(0,1fr)]";
/** A summary row in the entry column, right of the margin rule. */
export const ENTRY_COLUMN = "col-start-2 min-w-0 pl-4 sm:pl-5";
/**
 * The margin rule, drawn per entry so the list stays `ol > li`. It starts a
 * pixel high to bridge each divider, so the rule reads as one line that the
 * horizontal rules cross, as on ledger paper.
 */
export const MARGIN_RULE =
  "relative before:pointer-events-none before:absolute before:-top-px before:bottom-0 before:left-[2.5rem] before:z-10 before:border-l before:border-[#a23b3b]/45 before:content-[''] dark:before:border-[#c45c5c]/55 sm:before:left-[3.75rem]";

/**
 * How a crux could close, which is the status a reader needs first.
 *  - evidence:  a test exists (now, or once the future arrives)
 *  - agreement: it closes when the sides agree on terms or on who decides
 *  - standing:  nothing closes it; a value fork, or a ledger that says so
 *  - unstated:  the map has not written a condition down yet
 */
export type SettleMode = "evidence" | "agreement" | "standing" | "unstated";

export function settleMode(claim: Claim, latestStatus?: CruxLedgerStatus): SettleMode {
  const kind = claim.resolution?.kind;
  if (latestStatus === "unresolvable") return "standing";
  // A resolved entry outranks the authored kind: "nothing settles it" under a
  // "Resolved" track would contradict the ledger.
  if (kind === "value-difference" && latestStatus !== "resolved") return "standing";
  if (!claim.resolution?.condition) return "unstated";
  if (kind === "definitional-choice" || kind === "authority-allocation") return "agreement";
  return "evidence";
}

/** Lead for the authored condition when the card already answers "nothing does". */
const STANDING_CONDITION_LEAD: Record<ResolutionKind, string> = {
  "value-difference": "What it turns on.",
  "definitional-choice": "What could close it instead.",
  "authority-allocation": "What could close it instead.",
  "existing-evidence": "The condition the map records.",
  "future-observable": "The condition the map records.",
};

const NUMBER_WORDS = ["None", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];
const numberWord = (n: number) => NUMBER_WORDS[n] ?? String(n);

/**
 * One sentence that sorts the list by how each question could close:
 * "Four could be settled by evidence, and one not at all." Counts only;
 * it never says which way any of them will go.
 */
export function settleTally(
  cruxes: CruxResult[],
  nodesById: Map<string, ArgumentNode>,
  ledger: CruxLedgerEntry[],
): string {
  const counts: Record<SettleMode, number> = { evidence: 0, agreement: 0, standing: 0, unstated: 0 };
  for (const crux of cruxes) {
    const claim = nodesById.get(crux.claimId);
    if (claim?.type !== "claim") continue;
    const latest = claimMovement(ledger, crux.claimId).at(-1)?.entry.status;
    counts[settleMode(claim, latest)] += 1;
  }
  // Clauses start lower-case; only the sentence's first word is capitalized.
  // "Standing" says "not by evidence", never "not at all": a definitional
  // fork the ledger calls unresolvable can still close by stipulation.
  const clauses: string[] = [];
  const count = (n: number) => numberWord(n).toLowerCase();
  if (counts.evidence) clauses.push(`${count(counts.evidence)} could be settled by evidence`);
  if (counts.agreement) {
    clauses.push(
      `${count(counts.agreement)}${clauses.length ? "" : " could be settled"} by agreeing on terms`,
    );
  }
  if (counts.standing) {
    clauses.push(
      clauses.length
        ? `${count(counts.standing)} not by evidence at all`
        : `${count(counts.standing)} cannot be settled by evidence`,
    );
  }
  if (counts.unstated) {
    clauses.push(`${count(counts.unstated)} ${counts.unstated === 1 ? "has" : "have"} no stated test yet`);
  }
  if (clauses.length === 0) return "";
  const last = clauses.pop()!;
  const sentence = clauses.length ? `${clauses.join(", ")}, and ${last}` : last;
  return `${sentence[0].toUpperCase()}${sentence.slice(1)}.`;
}

/** Capitalize a lower-case authored fragment and close it with a period. */
function asSentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  const capped = trimmed[0].toUpperCase() + trimmed.slice(1);
  return /[.!?…]$/.test(capped) ? capped : `${capped}.`;
}

/**
 * The card's lead: the status and the test in one read. Teal when something
 * could settle it, brown with the engine's standing line when nothing does.
 * Summary content, so phrasing elements only.
 */
export function SettleAnswer({
  mode,
  kind,
  condition,
  resolved,
}: {
  mode: SettleMode;
  kind?: ResolutionKind;
  condition?: string;
  resolved: boolean;
}) {
  if (mode === "standing") {
    return (
      <span className="mt-3 block" data-settle="standing">
        <span className="label-caps block text-[#8B5A3C] dark:text-[#cfa88a]">
          What would settle it
        </span>
        <span className="mt-1 block font-serif text-[1.0625rem] italic leading-[1.5] text-[#7a4e34] dark:text-[#d9b89d] sm:text-[1.1875rem]">
          {standingLineFor(kind)}
        </span>
      </span>
    );
  }
  const label = resolved
    ? "What settled it"
    : kind === "future-observable"
      ? "What would settle it, in time"
      : "What would settle it";
  return (
    <span className="mt-3 block" data-settle={mode}>
      <span
        className={`label-caps block ${
          resolved ? "text-[#56736f] dark:text-[#7f9c99]" : "text-[#3a6965] dark:text-[#8fc0bb]"
        }`}
      >
        {label}
      </span>
      <span
        className={`mt-1 block font-serif text-[1.0625rem] leading-[1.5] sm:text-[1.1875rem] ${
          mode === "unstated"
            ? "italic text-muted dark:text-stone-400"
            : resolved
              ? "text-stone-600 dark:text-stone-400"
              : "text-stone-800 dark:text-stone-200"
        }`}
      >
        {condition ? asSentence(condition) : "Not yet specified."}
      </span>
    </span>
  );
}

/** A paragraph with a run-in italic lead, as in a book, instead of a label row. */
function RunIn({
  lead,
  emphasis = false,
  children,
}: {
  lead: string;
  emphasis?: boolean;
  children: React.ReactNode;
}) {
  return (
    <p
      className={
        emphasis
          ? "font-serif text-[1.0625rem] leading-[1.55] text-stone-800 dark:text-stone-200 sm:text-[1.125rem]"
          : "font-serif text-[1rem] leading-[1.6] text-secondary dark:text-stone-300"
      }
    >
      <em className="font-medium text-stone-900 dark:text-stone-100">{lead}</em> {children}
    </p>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-stone-300 px-2 py-0.5 text-[11px] font-medium text-muted dark:border-[var(--border-divider)] dark:text-stone-400">
      {children}
    </span>
  );
}

function DetailBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-[11px] font-medium uppercase tracking-wider text-muted dark:text-stone-400">
        {label}
      </h4>
      <div className="mt-1 text-sm leading-relaxed text-secondary dark:text-stone-300">
        {children}
      </div>
    </div>
  );
}

const POLARITY_RENDER = {
  supporting: {
    glyph: "＋",
    label: "Supports",
    className: "text-[#3a6965] dark:text-[#6fa39e]",
  },
  challenging: {
    glyph: "−",
    label: "Challenges",
    className: "text-[#8B5A3C] dark:text-[#d4805f]",
  },
  qualifying: {
    glyph: "◦",
    label: "Qualifies",
    className: "text-muted dark:text-stone-400",
  },
} as const;

/** Evidence, objections, and scope limits attached to one claim. */
function ClaimEvidence({
  claim,
  graph,
  nodesById,
}: {
  claim: Claim;
  graph: ArgumentGraph;
  nodesById: Map<string, ArgumentNode>;
}) {
  const evidenceEdges = graph.edges.filter((e) => {
    if (e.type !== "evidences" || e.to !== claim.id) return false;
    const source = nodesById.get(e.from);
    return source?.type === "evidence" && source.status !== "superseded";
  });
  const objections = graph.edges.filter(
    (e) => (e.type === "opposes" || e.type === "contradicts") &&
      (e.to === claim.id || (e.type === "contradicts" && e.from === claim.id))
  );

  if (evidenceEdges.length === 0 && objections.length === 0) return null;

  return (
    <div className="space-y-3">
      {evidenceEdges.length > 0 && (
        <DetailBlock label="Evidence">
          <ul className="space-y-2.5">
            {evidenceEdges.map((edge) => (
              <EvidenceItem key={edge.id} edge={edge} graph={graph} nodesById={nodesById} />
            ))}
          </ul>
        </DetailBlock>
      )}
      {objections.length > 0 && (
        <DetailBlock label="Pushback">
          <ul className="space-y-1.5">
            {objections.map((edge) => {
              const otherId = edge.to === claim.id ? edge.from : edge.to;
              const other = nodesById.get(otherId);
              if (!other) return null;
              return (
                <li key={edge.id} className="text-sm leading-relaxed">
                  <span className="mr-1.5 text-[#8B5A3C] dark:text-[#d4805f]" aria-hidden>⟂</span>
                  {other.type === "claim" ? (other.summary ?? other.statement) : other.statement}
                </li>
              );
            })}
          </ul>
        </DetailBlock>
      )}
    </div>
  );
}

function EvidenceItem({
  edge,
  graph,
  nodesById,
}: {
  edge: ArgumentEdge;
  graph: ArgumentGraph;
  nodesById: Map<string, ArgumentNode>;
}) {
  const node = nodesById.get(edge.from);
  if (node?.type !== "evidence") return null;
  const polarity = POLARITY_RENDER[edge.polarity ?? "qualifying"];
  const scopeLimits = graph.edges.filter(
    (e) => e.type === "limits_scope" && e.to === node.id
  );

  return (
    <li className="text-sm leading-relaxed">
      <span className={`font-medium ${polarity.className}`}>
        {polarity.glyph} {polarity.label}:
      </span>{" "}
      {node.finding}
      <div className="mt-0.5 text-xs text-muted dark:text-stone-400">
        {node.source.url ? (
          <a
            href={node.source.url}
            rel="noopener noreferrer"
            target="_blank"
            aria-label={`Open source from ${node.source.title} (opens in a new tab)`}
            className="font-medium text-secondary dark:text-stone-300 link-underline"
          >
            {node.source.title} ↗
          </a>
        ) : (
          <span className="font-medium text-secondary dark:text-stone-300">
            {node.source.title}
          </span>
        )}
        {node.source.publishedAt && (
          <>
            {" · "}
            <span>
              Published{" "}
              <time dateTime={node.source.publishedAt}>
                {formatIsoDate(node.source.publishedAt)}
              </time>
            </span>
          </>
        )}
        {node.source.interest && (
          <details className="group/interest mt-1">
            <summary className="-mx-1 inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded px-1 font-medium text-[#8B5A3C] hover:text-[#6B442C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep dark:text-[#d4805f] dark:hover:text-[#e6a48c] dark:focus-visible:ring-[#6fa39e] [&::-webkit-details-marker]:hidden">
              <span aria-hidden="true">⚑</span>
              Source interest
              <span
                aria-hidden="true"
                className="text-sm transition-transform group-open/interest:rotate-90 motion-reduce:transition-none"
              >
                ›
              </span>
            </summary>
            <p className="italic">{node.source.interest}</p>
          </details>
        )}
        {(node.unverifiedFlags ?? []).map((flag) => (
          <span key={flag} className="block text-[#8B5A3C] dark:text-[#d4805f]">
            Unverified: {flag}
          </span>
        ))}
      </div>
      {scopeLimits.map((limit) => {
        const limiter = nodesById.get(limit.from);
        if (!limiter) return null;
        return (
          <span
            key={limit.id}
            className="mt-1 block rounded bg-stone-100 dark:bg-[var(--bg-muted)] px-2 py-1 text-xs text-secondary dark:text-stone-300"
          >
            But note: {limiter.statement}
          </span>
        );
      })}
    </li>
  );
}

function byStatusSeverity(a: Claim, b: Claim): number {
  const order: Record<Claim["status"], number> = {
    contested: 0,
    unresolved: 1,
    broadly_accepted: 2,
    uncontested: 3,
    superseded: 4,
  };
  return order[a.status] - order[b.status] || a.id.localeCompare(b.id);
}
