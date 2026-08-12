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
} from "@/types/argument";
import type { CruxResult } from "@/lib/crux";
import type { ArgumentTopicMeta } from "@/lib/argument/draftTopics";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { ARGUMENT_TOPICS_LAST_UPDATED } from "@/lib/site";
import { DivergenceChart } from "./DivergenceChart";
import { ShareCard } from "./ShareCard";

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
}

export function DebateView({ meta, graph, cruxes }: DebateViewProps) {
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
    <main id="main-content" className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <nav
        aria-label="Debate map navigation"
        className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted dark:text-stone-400"
      >
        <Link href="/" className="link-underline">
          Argumend home
        </Link>
        <span aria-hidden="true">·</span>
        <Link href="/topics" className="link-underline">
          Explore topics
        </Link>
      </nav>

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
            className="mb-6 w-full rounded-lg"
          />
        )}
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted dark:text-stone-400">
          Argumend · debate map ·{" "}
          <time dateTime={ARGUMENT_TOPICS_LAST_UPDATED}>
            Reviewed {formatIsoDate(ARGUMENT_TOPICS_LAST_UPDATED)}
          </time>
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl leading-tight text-stone-900 dark:text-stone-100">
          {meta.title}
        </h1>
        {scopedQuestion && scopedQuestion !== meta.title && (
          <p className="mt-2 text-xs leading-relaxed text-muted dark:text-stone-400">
            <span className="font-medium text-stone-700 dark:text-stone-300">
              Scope:
            </span>{" "}
            {scopedQuestion}
          </p>
        )}
        <p className="mt-4 text-[15px] leading-relaxed text-stone-800 dark:text-stone-200">
          {meta.hook}
        </p>
        {meta.contextNote && (
          <p className="mt-1.5 text-xs text-muted dark:text-stone-400">
            {meta.contextNote}
          </p>
        )}
        <div className="mt-5 surface-paper rounded-lg border-l-4 border-[#C4613C] p-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-rust-700 dark:text-rust-300">
            What this map shows
          </p>
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

      {/* ---------------- Layer 2: the cruxes ---------------- */}
      <section id="cruxes" aria-label="Cruxes" className="mt-10 scroll-mt-4">
        <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
          The whole fight turns on {cruxes.length === 5 ? "five" : cruxes.length} questions
        </h2>
        <p className="mt-1 text-sm text-muted dark:text-stone-400">
          Settle one of these and whole positions move.
        </p>
        <ol className="mt-4 space-y-3">
          {cruxes.map((crux, index) => {
            const claim = nodesById.get(crux.claimId);
            if (claim?.type !== "claim") return null;
            const isValueCrux = claim.resolution?.kind === "value-difference";
            const note = meta.cruxNotes?.[crux.claimId];
            return (
              <li key={crux.claimId}>
                <details className="group/crux surface-card rounded-lg border-l-4 border-[#a23b3b]">
                  <summary className="cursor-pointer list-none rounded-lg p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep dark:focus-visible:ring-[#6fa39e] [&::-webkit-details-marker]:hidden">
                    <h3>
                      <span className="flex items-baseline gap-3">
                        <span className="font-serif text-lg text-[#a23b3b] dark:text-[#e66767]">
                          {index + 1}
                        </span>
                        <span className="text-[15px] leading-snug font-medium text-stone-900 dark:text-stone-100">
                          {note?.question ?? claim.summary ?? claim.statement}
                        </span>
                        <span
                          aria-hidden="true"
                          className="ml-auto shrink-0 text-xl text-muted transition-transform group-open/crux:rotate-90 motion-reduce:transition-none dark:text-stone-400"
                        >
                          ›
                        </span>
                      </span>
                      <span className="mt-2 flex flex-wrap gap-1.5 pl-7">
                        {claim.implicit && (
                          <Chip tone="crux">Hidden assumption — nobody says this out loud</Chip>
                        )}
                        {isValueCrux && <Chip tone="warn">Values, not facts</Chip>}
                      </span>
                    </h3>
                  </summary>
                  <div className="border-t border-stone-200 dark:border-[#3d3a36] px-4 py-4 space-y-3">
                    <p className="text-sm leading-relaxed text-stone-800 dark:text-stone-200">
                      {note?.fight ?? claim.statusBasis}
                    </p>
                    <p className="text-sm leading-relaxed text-secondary dark:text-stone-300">
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        So what:
                      </span>{" "}
                      {note?.soWhat ?? renderStakes(crux, nodesById)}
                    </p>
                    <p className="text-sm leading-relaxed text-secondary dark:text-stone-300">
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        What would settle it:
                      </span>{" "}
                      {claim.resolution?.condition ?? "not yet specified."}
                    </p>
                    <details className="group/evidence pt-1">
                      <summary className="-mx-1 inline-flex min-h-11 w-[calc(100%+0.5rem)] cursor-pointer list-none items-center justify-between gap-2 rounded px-1 text-xs font-medium text-muted hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep dark:text-stone-400 dark:hover:text-stone-200 dark:focus-visible:ring-[#6fa39e] [&::-webkit-details-marker]:hidden">
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
                </details>
              </li>
            );
          })}
        </ol>
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
          <blockquote className="mt-5 border-l-4 border-[#C4613C] surface-paper rounded-r-lg p-4">
            <p className="text-[15px] leading-relaxed text-stone-900 dark:text-stone-100">
              {meta.closer.take}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-wider text-muted dark:text-stone-400">
              The take, if you only remember one thing
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
          <div className="border-t border-stone-200 dark:border-[#3d3a36] p-3.5 space-y-2">
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
                        {claim.implicit && <Chip tone="crux">Hidden assumption</Chip>}
                      </span>
                    </h3>
                  </summary>
                  <div className="border-t border-stone-200 dark:border-[#3d3a36] px-3.5 py-3.5 space-y-3">
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
    </main>
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

function Chip({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "crux" | "warn";
}) {
  const toneClass =
    tone === "crux"
      ? "text-[#a23b3b] border-[#a23b3b]/40 dark:text-[#e66767] dark:border-[#e66767]/50"
      : tone === "warn"
        ? "text-[#8B5A3C] border-[#8B5A3C]/40 dark:text-[#d4805f] dark:border-[#d4805f]/50"
        : "text-muted dark:text-stone-400 border-stone-300 dark:border-[#3d3a36]";
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${toneClass}`}
    >
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
            className="mt-1 block rounded bg-stone-100 dark:bg-[#302e2a] px-2 py-1 text-xs text-secondary dark:text-stone-300"
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
