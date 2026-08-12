/**
 * DebateView — the progressive-disclosure experience for ArgumentGraph topics.
 *
 * Mobile-first (designed at 390px): the page is a vertical read — question,
 * positions, cruxes, then the full claim/evidence layer — with native
 * <details> disclosure so the core experience ships zero client JavaScript.
 * The React Flow canvas is deliberately absent here: this IS the product;
 * the full map is a desktop enhancement for legacy topics.
 *
 * Layer 1: question · positions · "the debate comes down to" crux list
 * Layer 2: each crux expands into what's disputed / why it matters / resolution
 * Layer 3: every claim with status basis, evidence (polarity + provenance +
 *          interest disclosures), objections, and scope limits
 */
import type {
  ArgumentGraph,
  ArgumentEdge,
  ArgumentNode,
  Claim,
  Evidence,
  Position,
} from "@/types/argument";
import type { CruxResult } from "@/lib/crux";

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
  title: string;
  graph: ArgumentGraph;
  cruxes: CruxResult[];
}

export function DebateView({ title, graph, cruxes }: DebateViewProps) {
  const nodesById = new Map(graph.nodes.map((n) => [n.id, n]));
  const question = graph.nodes.find((n) => n.type === "question");
  const positions = graph.nodes
    .filter((n): n is Position => n.type === "position")
    .sort((a, b) => a.displayRank - b.displayRank);
  const claims = graph.nodes.filter(
    (n): n is Claim => n.type === "claim" && n.status !== "superseded"
  );
  // Superseded evidence is excluded from rendering and counts, matching the
  // crux engine's exclusion — a retracted finding must never read as live support.
  const evidence = graph.nodes.filter(
    (n): n is Evidence => n.type === "evidence" && n.status !== "superseded"
  );
  const contested = claims.filter(
    (c) => c.status === "contested" || c.status === "unresolved"
  );
  const cruxClaimIds = new Set(cruxes.map((c) => c.claimId));

  return (
    <article className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      {/* ---------------- Layer 1: the debate at a glance ---------------- */}
      <header>
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted dark:text-stone-400">
          An Argumend debate map
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl leading-tight text-stone-900 dark:text-stone-100">
          {question?.statement ?? title}
        </h1>
        <p className="mt-3 text-sm text-secondary dark:text-stone-400">
          {positions.length} positions · {claims.length} claims ·{" "}
          {evidence.length} pieces of evidence · {contested.length} open disputes
          · {cruxes.length} cruxes
        </p>
      </header>

      <section aria-label="Positions" className="mt-8">
        <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
          The positions
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {positions.map((position, index) => (
            <div
              key={position.id}
              className="surface-card rounded-lg p-4 border-l-4"
              style={{ borderLeftColor: POSITION_ACCENTS[index % POSITION_ACCENTS.length] }}
            >
              <h3 className="font-medium text-[15px] text-stone-900 dark:text-stone-100">
                {position.label}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-secondary dark:text-stone-300">
                {position.statement}
              </p>
              <p className="mt-2 text-xs text-muted dark:text-stone-400">
                Held by: {position.constituency}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Layer 2: the cruxes ---------------- */}
      <section aria-label="Cruxes" className="mt-10">
        <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
          The debate mostly comes down to
        </h2>
        <p className="mt-1 text-sm text-muted dark:text-stone-400">
          Unresolved questions with the most leverage — computed from the
          argument structure, not editorial choice.
        </p>
        <ol className="mt-4 space-y-3">
          {cruxes.map((crux, index) => {
            const claim = nodesById.get(crux.claimId);
            if (claim?.type !== "claim") return null;
            return (
              <li key={crux.claimId}>
                <details className="group surface-card rounded-lg border-l-4 border-[#a23b3b]">
                  <summary className="cursor-pointer list-none p-4 [&::-webkit-details-marker]:hidden">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-lg text-[#a23b3b]">
                        {index + 1}
                      </span>
                      <span className="text-[15px] leading-snug font-medium text-stone-900 dark:text-stone-100">
                        {claim.summary ?? claim.statement}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5 pl-7">
                      <Chip>{EPISTEMIC_LABELS[claim.epistemicType]}</Chip>
                      <Chip>{STATUS_LABELS[claim.status]}</Chip>
                      {claim.implicit && <Chip tone="crux">Hidden assumption</Chip>}
                      {crux.evidenceStarved && <Chip tone="warn">Thin evidence</Chip>}
                    </div>
                  </summary>
                  <div className="border-t border-stone-200 dark:border-[#3d3a36] px-4 py-4 space-y-4">
                    {claim.summary && (
                      <p className="text-sm leading-relaxed text-stone-800 dark:text-stone-200">
                        {claim.statement}
                      </p>
                    )}
                    <DetailBlock label="Why it's contested">
                      {claim.statusBasis}
                    </DetailBlock>
                    <DetailBlock label="What would settle it">
                      {claim.resolution
                        ? claim.resolution.kind === "value-difference"
                          ? `Nothing, by evidence alone — this is a standing value disagreement. ${claim.resolution.condition}`
                          : claim.resolution.condition
                        : "Not yet specified."}
                    </DetailBlock>
                    {crux.affectedPositions.length > 0 && (
                      <DetailBlock label="Who has stakes here">
                        <ul className="space-y-1">
                          {crux.affectedPositions.map((p) => {
                            const pos = nodesById.get(p.id);
                            if (pos?.type !== "position") return null;
                            return (
                              <li key={p.id} className="text-sm text-secondary dark:text-stone-300">
                                {p.delta >= 0 ? "Strengthens" : "Weakens"}{" "}
                                <span className="font-medium">{pos.label}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </DetailBlock>
                    )}
                    <ClaimEvidence claim={claim} graph={graph} nodesById={nodesById} />
                  </div>
                </details>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ---------------- Layer 3: the full argument ---------------- */}
      <section aria-label="All claims" className="mt-10">
        <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
          Explore the full argument
        </h2>
        <p className="mt-1 text-sm text-muted dark:text-stone-400">
          Every claim in the map, with its evidence, objections, and status —
          nothing behind the curtain.
        </p>
        <div className="mt-4 space-y-2">
          {claims
            .filter((c) => !cruxClaimIds.has(c.id))
            .sort(byStatusSeverity)
            .map((claim) => (
              <details key={claim.id} className="surface-card rounded-lg">
                <summary className="cursor-pointer list-none p-3.5 [&::-webkit-details-marker]:hidden">
                  <span className="text-sm leading-snug text-stone-900 dark:text-stone-100">
                    {claim.statement}
                  </span>
                  <span className="mt-1.5 flex flex-wrap gap-1.5">
                    <Chip>{EPISTEMIC_LABELS[claim.epistemicType]}</Chip>
                    <Chip>{STATUS_LABELS[claim.status]}</Chip>
                    {claim.implicit && <Chip tone="crux">Hidden assumption</Chip>}
                  </span>
                </summary>
                <div className="border-t border-stone-200 dark:border-[#3d3a36] px-3.5 py-3.5 space-y-3">
                  <DetailBlock label="Status basis">{claim.statusBasis}</DetailBlock>
                  <ClaimEvidence claim={claim} graph={graph} nodesById={nodesById} />
                </div>
              </details>
            ))}
        </div>
      </section>

      <footer className="mt-12 rounded-lg surface-paper p-4">
        <p className="text-xs leading-relaxed text-muted dark:text-stone-400">
          <span className="font-medium text-secondary dark:text-stone-300">
            How this map was made:
          </span>{" "}
          assembled by AI from a research corpus whose ~360 citations were
          liveness-checked, adversarially reviewed for balance in five
          directions, and validated against Argumend&apos;s argument model.
          Sources with commercial or institutional interests are disclosed
          inline. Crux rankings are computed from the argument structure and
          are reproducible.
        </p>
      </footer>
    </article>
  );
}

// ---------------------------------------------------------------------------

function Chip({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "crux" | "warn";
}) {
  const toneClass =
    tone === "crux"
      ? "text-[#a23b3b] border-[#a23b3b]/40"
      : tone === "warn"
        ? "text-[#8B5A3C] border-[#8B5A3C]/40"
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
  supporting: { glyph: "＋", label: "Supports", color: "#3a6965" },
  challenging: { glyph: "−", label: "Challenges", color: "#8B5A3C" },
  qualifying: { glyph: "◦", label: "Qualifies", color: "#7a7068" },
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
                  <span className="text-[#8B5A3C] mr-1.5" aria-hidden>⟂</span>
                  {other.statement}
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
      <span className="font-medium" style={{ color: polarity.color }}>
        {polarity.glyph} {polarity.label}:
      </span>{" "}
      {node.finding}
      <span className="block mt-0.5 text-xs text-muted dark:text-stone-400">
        {node.source.institution ?? node.source.title}
        {node.source.url && (
          <>
            {" · "}
            <a
              href={node.source.url}
              rel="noopener noreferrer"
              target="_blank"
              className="link-underline"
            >
              source
            </a>
          </>
        )}
        {node.source.interest && (
          <span className="block italic">Interest note: {node.source.interest}</span>
        )}
        {(node.unverifiedFlags ?? []).map((flag) => (
          <span key={flag} className="block text-[#8B5A3C]">
            Unverified: {flag}
          </span>
        ))}
      </span>
      {scopeLimits.map((limit) => {
        const limiter = nodesById.get(limit.from);
        if (!limiter) return null;
        return (
          <span
            key={limit.id}
            className="mt-1 block rounded bg-stone-100 dark:bg-[#302e2a] px-2 py-1 text-xs text-secondary dark:text-stone-300"
          >
            Scope note: {limiter.statement}
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
