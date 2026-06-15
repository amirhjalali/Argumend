"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, BookOpen, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import type { Topic, TopicCategory, TopicStatus, Evidence } from "@/lib/schemas/topic";
import { calculateEvidenceScore, getVerdictLabel } from "@/lib/schemas/topic";
import { CATEGORY_LABELS } from "@/data/topicIndex";
import { ReadGraphToggle } from "@/components/ReadGraphToggle";
import { SynopticTable } from "@/components/SynopticTable";

const statusMeta: Record<TopicStatus, { label: string; icon: typeof CheckCircle; chip: string }> = {
  settled: {
    label: "Settled",
    icon: CheckCircle,
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  },
  contested: {
    label: "Contested",
    icon: AlertCircle,
    chip: "bg-rust-50 text-rust-700 border-rust-200/60",
  },
  highly_speculative: {
    label: "Highly Speculative",
    icon: HelpCircle,
    chip: "bg-stone-100 text-stone-700 border-stone-200/60",
  },
};

const categoryChip: Record<TopicCategory, string> = {
  policy: "bg-deep/10 text-deep border-deep/20",
  technology: "bg-stone-100 text-stone-700 border-stone-200/60",
  science: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  economics: "bg-rust-50 text-rust-700 border-rust-200/60",
  philosophy: "bg-stone-100 text-stone-700 border-stone-200/60",
};

function strongest(evidence: Evidence[] | undefined, side: "for" | "against"): Evidence | null {
  if (!evidence?.length) return null;
  const filtered = evidence.filter((e) => e.side === side);
  if (!filtered.length) return null;
  return filtered.reduce((best, cur) =>
    calculateEvidenceScore(cur.weight) > calculateEvidenceScore(best.weight) ? cur : best
  );
}

function EvidenceItem({ ev }: { ev: Evidence }) {
  const score = calculateEvidenceScore(ev.weight); // 0–40
  const pct = Math.round((score / 40) * 100);
  const accent =
    ev.side === "for"
      ? "border-l-rust-400 bg-rust-50/30 dark:bg-rust-900/10"
      : "border-l-stone-500 bg-stone-100/30 dark:bg-stone-900/10";
  const barColor = ev.side === "for" ? "bg-rust-500" : "bg-stone-500";
  const label = ev.side === "for" ? "Supports" : "Against";
  const labelColor = ev.side === "for" ? "text-rust-700" : "text-stone-700 dark:text-stone-300";
  return (
    <li className={`rounded-md border-l-4 ${accent} pl-4 pr-4 py-3`}>
      <div className="flex items-baseline gap-2 mb-1 flex-wrap">
        <span className={`text-[10px] font-sans font-semibold uppercase tracking-[0.15em] ${labelColor}`}>
          {label}
        </span>
        <span className="text-[10px] font-mono text-secondary">strength {pct}%</span>
      </div>
      <p className="font-serif text-[16px] leading-snug text-primary mb-1">
        <span className="font-semibold">{ev.title}.</span>{" "}
        <span className="text-primary/90">{ev.description}</span>
      </p>
      <div className="mt-1.5 flex items-center gap-3 text-xs text-secondary">
        <div
          className="h-1 w-24 rounded-full bg-stone-200/60 dark:bg-[#3d3a36] overflow-hidden"
          aria-hidden
        >
          <div className={`h-full ${barColor}`} style={{ width: `${pct}%` }} />
        </div>
        {ev.source &&
          (ev.sourceUrl ? (
            <a
              href={ev.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 link-underline hover:text-primary"
            >
              {ev.source}
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          ) : (
            <span>{ev.source}</span>
          ))}
      </div>
    </li>
  );
}

export function ReadModeView({ topic }: { topic: Topic }) {
  const StatusIcon = statusMeta[topic.status].icon;
  const verdict = getVerdictLabel(topic.confidence_score);
  const categoryLabel = CATEGORY_LABELS[topic.category];

  return (
    <article className="mx-auto max-w-[72ch] px-5 sm:px-8 pt-6 pb-32">
      {/* ─── Header ─── */}
      <header className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] ${statusMeta[topic.status].chip}`}
            >
              <StatusIcon className="h-3 w-3" aria-hidden />
              {statusMeta[topic.status].label}
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] ${categoryChip[topic.category]}`}
            >
              {categoryLabel}
            </span>
            <span className="inline-flex items-center rounded-full border border-stone-200/70 dark:border-[#3d3a36] px-2.5 py-1 text-[10px] font-mono text-secondary">
              {topic.confidence_score}/100
            </span>
          </div>
          <ReadGraphToggle current="read" />
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl leading-[1.1] tracking-tight text-primary mb-3">
          {topic.title}
        </h1>
        <p className="font-sans text-sm text-secondary italic">{verdict}.</p>
      </header>

      {/* ─── The Claim ─── */}
      <section aria-label="The claim">
        <p className="font-serif text-[22px] leading-[1.55] text-primary first-letter:font-serif first-letter:text-[64px] first-letter:font-semibold first-letter:float-left first-letter:leading-[0.85] first-letter:mr-2 first-letter:mt-1 first-letter:text-deep">
          {topic.meta_claim}
        </p>
      </section>

      {/* ─── Synoptic table ─── */}
      <SynopticTable pillars={topic.pillars} />

      {/* ─── Pillars ─── */}
      {topic.pillars.map((pillar, idx) => {
        const evFor = strongest(pillar.evidence, "for");
        const evAgainst = strongest(pillar.evidence, "against");
        return (
          <section
            key={pillar.id}
            id={`pillar-${pillar.id}`}
            aria-label={`Pillar ${idx + 1}: ${pillar.title}`}
            className="mt-12"
          >
            <div className="mb-4">
              <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-secondary mb-1">
                Pillar {idx + 1} of {topic.pillars.length}
              </div>
              <h2 className="font-serif text-[28px] leading-tight text-primary">
                {pillar.title}
              </h2>
              {pillar.short_summary && (
                <p className="font-serif text-[17px] leading-relaxed text-secondary mt-2 italic">
                  {pillar.short_summary}
                </p>
              )}
            </div>

            <blockquote className="my-5 border-l-4 border-l-stone-500/70 pl-4 py-1 bg-stone-100/30 dark:bg-stone-900/10">
              <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-stone-700 dark:text-stone-300 mb-1">
                The Skeptic
              </div>
              <p className="font-serif text-[18px] leading-relaxed text-primary">
                {pillar.skeptic_premise}
              </p>
            </blockquote>

            <div className="my-5 border-l-4 border-l-rust-400/70 pl-4 py-1 bg-rust-50/30 dark:bg-rust-900/10">
              <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-rust-700 mb-1">
                The Proponent
              </div>
              <p className="font-serif text-[18px] leading-relaxed text-primary">
                {pillar.proponent_rebuttal}
              </p>
            </div>

            {(evFor || evAgainst || (pillar.evidence?.length ?? 0) > 0) && (
              <div className="mt-6">
                <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-secondary mb-3">
                  Strongest evidence on each side
                </h3>
                <ul className="space-y-2.5 list-none p-0">
                  {evFor && <EvidenceItem ev={evFor} />}
                  {evAgainst && <EvidenceItem ev={evAgainst} />}
                </ul>
                {(pillar.evidence?.length ?? 0) > 2 && (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-xs text-secondary hover:text-primary font-sans">
                      Show all {pillar.evidence!.length} evidence items
                    </summary>
                    <ul className="space-y-2.5 mt-3 list-none p-0">
                      {pillar
                        .evidence!.filter((e) => e.id !== evFor?.id && e.id !== evAgainst?.id)
                        .map((ev) => (
                          <EvidenceItem key={ev.id} ev={ev} />
                        ))}
                    </ul>
                  </details>
                )}
              </div>
            )}

            {/* Crux */}
            <aside
              id={`crux-${pillar.crux.id}`}
              className="mt-6 rounded-lg border border-[color:var(--crux-crimson,#a23b3b)]/30 bg-[color:var(--crux-crimson,#a23b3b)]/5 px-5 py-4"
            >
              <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[color:var(--crux-crimson,#a23b3b)] mb-1">
                ◆ Crux — what would settle this
              </div>
              <h4 className="font-serif text-[19px] text-primary mb-1.5">
                {pillar.crux.title}
              </h4>
              <p className="font-serif text-[16px] leading-relaxed text-primary/90 mb-2">
                {pillar.crux.description}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary font-sans">
                <span>
                  <span className="font-semibold">Method:</span>{" "}
                  {pillar.crux.methodology}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-secondary">
                <span>cost: {pillar.crux.cost_to_verify}</span>
                <span>status: {pillar.crux.verification_status}</span>
              </div>
            </aside>
          </section>
        );
      })}

      {/* ─── Sources ─── */}
      {topic.references?.length ? (
        <section aria-label="Further reading" className="mt-14">
          <h2 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-secondary mb-3">
            Further reading
          </h2>
          <ul className="space-y-1.5 list-none p-0">
            {topic.references.map((ref) => (
              <li key={ref.url}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-serif text-[16px] text-primary link-underline hover:text-deep"
                >
                  {ref.title}
                  <ExternalLink className="h-3.5 w-3.5 text-secondary" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* ─── Sticky open-the-map CTA ─── */}
      <div className="fixed bottom-5 right-5 z-30">
        <Link
          href="?view=graph"
          replace
          scroll={false}
          className="inline-flex items-center gap-2 rounded-full bg-deep text-white px-4 py-2.5 text-sm font-sans font-medium shadow-lg hover:bg-deep/90 transition-colors"
        >
          <BookOpen className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Open the map</span>
          <span className="sm:hidden">Map</span>
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
