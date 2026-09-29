/**
 * DebateView — new-model (ArgumentGraph) maps on the one topic-page template.
 *
 * Since 2026-09-29 every map on /topics/[id] renders through
 * components/topic/TopicPage.tsx; this file only turns an ArgumentGraph, its
 * ranked cruxes and its ledger into that page's model and slots. Legacy
 * pillar maps arrive at the same template through components/ReadModeView.tsx,
 * so the two cannot drift apart again.
 *
 * Crux-first: question → hook → what every camp already accepts → the crux
 * sheet → the camps → reflection → folds. Zero client JS for the core (native
 * <details>); no canvas bundle; designed at 390px.
 */
import Image from "next/image";
import type {
  ArgumentGraph,
  ArgumentEdge,
  ArgumentNode,
  Claim,
  Position,
  ResolutionKind,
} from "@/types/argument";
import type { CruxResult } from "@/lib/crux";
import type { CruxLedgerEntry } from "@/types/cruxLedger";
import { claimMovement } from "@/lib/argument/ledger";
import type { ArgumentTopicMeta } from "@/lib/argument/draftTopics";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { ARGUMENT_TOPICS_LAST_UPDATED } from "@/lib/site";
import { numberWord, type PositionCardData, type TopicPageData } from "@/lib/topicPage/model";
import { TopicPage, formatIsoDate, type CruxEntryView, type TopicFold } from "@/components/topic/TopicPage";
import {
  DetailBlock,
  SOURCE_LINK,
  asSentence,
  settleMode,
  settleTally,
} from "@/components/topic/cruxPrimitives";
import { Chip, TextAction } from "@/components/ui";
import { DivergenceChart } from "./DivergenceChart";
import { ShareCard } from "./ShareCard";
import { CruxMovementLedger, CruxMovementTrack } from "./CruxMovement";

// The crux primitives moved to components/topic/cruxPrimitives.tsx; re-exported
// so existing imports keep working.
export {
  CRUX_SHEET,
  ENTRY_COLUMN,
  ENTRY_GRID,
  MARGIN_RULE,
  SettleAnswer,
  settleMode,
  settleTally,
  type SettleMode,
} from "@/components/topic/cruxPrimitives";

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

/** Maps covered by the living AI page at /ai, which links back from here. */
const AI_MAP_IDS: ReadonlySet<string> = new Set(["ai-mass-unemployment", "capitalism-after-ai"]);

/** Lead for the authored condition when the card already answers "nothing does". */
const STANDING_CONDITION_LEAD: Record<ResolutionKind, string> = {
  "value-difference": "What it turns on.",
  "definitional-choice": "What could close it instead.",
  "authority-allocation": "What could close it instead.",
  "existing-evidence": "The condition the map records.",
  "future-observable": "The condition the map records.",
};

const MADE_BY =
  "Assembled by AI. Every source linked and checked, interests disclosed inline, balance adversarially reviewed, crux rankings reproducible.";

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
  const scopedQuestion = question?.statement.trim();

  const page: TopicPageData = {
    id: meta.id,
    kind: "flagship",
    title: meta.title,
    crumb: meta.title,
    subtitle:
      scopedQuestion && scopedQuestion !== meta.title
        ? { lead: "Scope", text: scopedQuestion }
        : undefined,
    reviewedOn: ARGUMENT_TOPICS_LAST_UPDATED,
    sourceCount: countGraphSources(graph),
    hook: { text: meta.hook, note: meta.contextNote },
    agreementHeading:
      positions.length === 2
        ? "What both sides already agree on"
        : `What all ${numberWord(positions.length).toLowerCase()} camps already accept`,
    agreement: agreedStatements(meta, nodesById),
    cruxLede: meta.tldr,
    cruxTally: settleTally(cruxes, nodesById, ledger) || undefined,
    positionsHeading: `The ${numberWord(positions.length).toLowerCase()} camps`,
    positionsNote: meta.advocates
      ? "Related voices illustrate an argument or evidence stream; inclusion does not mean they endorse every claim in that camp."
      : undefined,
    positions: positionCards(meta, positions),
    related: argumentTopicIndex
      .filter((topic) => topic.id !== meta.id)
      .slice(0, 3)
      .map((topic) => ({ id: topic.id, title: topic.title })),
    // /embed/:id serves new-model maps too (app/embed/[topicId]/_model.ts).
    embeddable: true,
  };

  const cruxEntries: CruxEntryView[] = cruxes.flatMap((crux) => {
    const claim = nodesById.get(crux.claimId);
    if (claim?.type !== "claim") return [];
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
    const questionText = note?.question ?? claim.summary ?? claim.statement;
    const runIns = [
      { lead: leads.stakes, text: note?.soWhat ?? renderStakes(crux, nodesById), emphasis: true },
      { lead: leads.fight, text: note?.fight ?? claim.statusBasis },
    ];
    if (mode === "standing" && condition && claim.resolution) {
      runIns.push({
        lead: STANDING_CONDITION_LEAD[claim.resolution.kind],
        text: asSentence(condition),
        emphasis: false,
      });
    }
    return [
      {
        anchor: `crux-${crux.claimId}`,
        question: questionText,
        shortLabel: questionText,
        settle: { mode, kind, condition, resolved: isResolved },
        implicit: claim.implicit,
        runIns,
        track: movement.length > 0 ? <CruxMovementTrack movement={movement} /> : undefined,
        afterRunIns: (
          <CruxMovementLedger
            movement={movement}
            claimId={crux.claimId}
            nodesById={nodesById}
            standingLineShown={mode === "standing"}
          />
        ),
        evidenceLabel: "Show the evidence and the exact claim",
        evidence: (
          <>
            <DetailBlock label="The claim, precisely">{claim.statement}</DetailBlock>
            <DetailBlock label="Status basis">{claim.statusBasis}</DetailBlock>
            <ClaimEvidence claim={claim} graph={graph} nodesById={nodesById} />
          </>
        ),
      },
    ];
  });

  const folds: TopicFold[] = [];
  if (meta.shareCard || meta.highlights.length > 0 || meta.id === "ai-mass-unemployment") {
    folds.push({
      id: "numbers",
      title: meta.highlightsHeading ?? "The numbers",
      hint: "The figures the argument keeps returning to, with their sources.",
      content: <FlagshipNumbers meta={meta} />,
    });
  }
  if (meta.takeaways.length > 0 || meta.closer) {
    folds.push({
      id: "takeaways",
      title: "What you can honestly say after five minutes",
      content: <Takeaways meta={meta} />,
    });
  }
  const researcherClaims = claims
    .filter((c) => !cruxClaimIds.has(c.id))
    .sort(byStatusSeverity);
  folds.push({
    id: "researcher",
    title: "Researcher mode",
    hint: `All ${claims.length} claims with their evidence, objections, status, and source-interest disclosures.`,
    content: (
      <div className="space-y-2">
        {researcherClaims.map((claim) => (
          <ResearcherClaim key={claim.id} claim={claim} graph={graph} nodesById={nodesById} />
        ))}
      </div>
    ),
  });

  return (
    <TopicPage
      page={page}
      cruxes={cruxEntries}
      afterCruxes={
        AI_MAP_IDS.has(meta.id) ? (
          <p className="mt-2">
            <TextAction href="/ai">What has moved across the AI maps →</TextAction>
          </p>
        ) : undefined
      }
      afterPositions={
        meta.hero ? (
          // The illustration used to fill 60% of the first desktop screen. It
          // now closes the positions, and phones skip it.
          <figure className="mt-8 hidden sm:block">
            <Image
              src={meta.hero.src}
              alt={meta.hero.alt}
              width={1600}
              height={1066}
              sizes="(max-width: 1024px) calc(100vw - 3rem), 672px"
              className="max-h-[320px] w-full rounded-lg object-cover ring-1 ring-stone-900/5 dark:brightness-[0.85] dark:ring-white/5"
            />
          </figure>
        ) : undefined
      }
      folds={folds}
      madeBy={MADE_BY}
    />
  );
}

// ---------------------------------------------------------------------------
// Model pieces
// ---------------------------------------------------------------------------

/** Distinct current sources behind the map's evidence. */
function countGraphSources(graph: ArgumentGraph): number {
  const seen = new Set<string>();
  for (const node of graph.nodes) {
    if (node.type !== "evidence" || node.status === "superseded") continue;
    seen.add((node.source.url ?? node.source.title).toLowerCase());
  }
  return seen.size;
}

/** The declared agreed claims, in the graph's own words. Never a contested one. */
function agreedStatements(
  meta: ArgumentTopicMeta,
  nodesById: Map<string, ArgumentNode>,
): string[] {
  return (meta.agreementClaims ?? []).flatMap((id) => {
    const node = nodesById.get(id);
    if (node?.type !== "claim") return [];
    if (node.status !== "uncontested" && node.status !== "broadly_accepted") return [];
    return [node.statement];
  });
}

function positionCards(meta: ArgumentTopicMeta, positions: Position[]): PositionCardData[] {
  // The closer's per-camp readings are authored in position order.
  const splits =
    meta.closer && meta.closer.splits.length === positions.length ? meta.closer.splits : [];
  return positions.map((position, index) => {
    const full = [];
    if (position.summary) full.push({ lead: "", text: position.statement });
    const reading = splits[index]?.reading;
    if (reading) full.push({ lead: "How this camp reads the shared facts:", text: reading });
    return {
      id: position.id,
      label: position.label,
      summary: position.summary ?? position.statement,
      accent: POSITION_ACCENTS[index % POSITION_ACCENTS.length],
      full,
      heldBy: position.constituency,
      voice: meta.advocates?.[position.id],
    };
  });
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
// Folds
// ---------------------------------------------------------------------------

function FlagshipNumbers({ meta }: { meta: ArgumentTopicMeta }) {
  return (
    <div className="space-y-5">
      {meta.shareCard && <ShareCard {...meta.shareCard} />}
      {meta.id === "ai-mass-unemployment" && <DivergenceChart />}
      {meta.highlights.length > 0 && (
        <section aria-label="Key numbers">
          <ul className="grid gap-3 sm:grid-cols-2">
            {meta.highlights.map((highlight) => (
              <li key={highlight.fact} className="surface-paper rounded-lg p-4">
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
    </div>
  );
}

function Takeaways({ meta }: { meta: ArgumentTopicMeta }) {
  return (
    <div className="space-y-5">
      {meta.takeaways.length > 0 && (
        <section aria-label="Takeaways">
          <ul className="space-y-2.5">
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
      {meta.closer && (
        <blockquote className="border-l-[3px] border-l-deep/70 surface-paper rounded-r-lg p-4 sm:p-5 dark:border-l-[#8bb5b1]/60">
          <p className="label-caps">If you only remember one thing</p>
          <p className="mt-1.5 font-serif text-[1.1875rem] leading-[1.55] text-stone-900 dark:text-stone-100">
            {meta.closer.take}
          </p>
        </blockquote>
      )}
    </div>
  );
}

function ResearcherClaim({
  claim,
  graph,
  nodesById,
}: {
  claim: Claim;
  graph: ArgumentGraph;
  nodesById: Map<string, ArgumentNode>;
}) {
  return (
    <details className="group/claim surface-paper rounded-lg">
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
  );
}

// ---------------------------------------------------------------------------
// Evidence
// ---------------------------------------------------------------------------

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
      <div className="text-xs text-muted dark:text-stone-400">
        {/* Sources are what a sceptical reader taps: a 44px hit area each. */}
        {node.source.url ? (
          <a
            href={node.source.url}
            rel="noopener noreferrer"
            target="_blank"
            aria-label={`Open source from ${node.source.title} (opens in a new tab)`}
            className={SOURCE_LINK}
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
          <details className="group/interest">
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
