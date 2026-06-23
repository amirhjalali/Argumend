"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Network, CheckCircle, AlertCircle, HelpCircle, List, X } from "lucide-react";
import type { Topic, TopicCategory, TopicStatus, Evidence } from "@/lib/schemas/topic";
import { calculateEvidenceScore, getVerdictSentence, confidenceTier } from "@/lib/schemas/topic";
import { CATEGORY_LABELS } from "@/data/topicIndex";
import { ReadGraphToggle } from "@/components/ReadGraphToggle";
import { SynopticTable } from "@/components/SynopticTable";
import { ControversyMeter } from "@/components/ControversyMeter";
import { ConfidenceBar } from "@/components/ConfidenceBar";
import { VerdictVoting } from "@/components/VerdictVoting";
import { CitationCard } from "@/components/CitationCard";
import { SaveTopicButton } from "@/components/SaveTopicButton";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { GlossaryTerm } from "@/components/GlossaryTerm";
import { FalsificationCrux } from "@/components/FalsificationCrux";
import { FlagshipIntro } from "@/components/FlagshipIntro";
import { topics, getCrossCategoryRelated } from "@/data/topics";

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

/** Count distinct cited sources across references + all evidence items. */
function countSources(topic: Topic): number {
  const seen = new Set<string>();
  for (const ref of topic.references ?? []) {
    seen.add((ref.url ?? ref.title).toLowerCase());
  }
  for (const pillar of topic.pillars) {
    for (const ev of pillar.evidence ?? []) {
      const key = ev.sourceUrl ?? ev.source;
      if (key) seen.add(key.toLowerCase());
    }
  }
  for (const ev of topic.evidence ?? []) {
    const key = ev.sourceUrl ?? ev.source;
    if (key) seen.add(key.toLowerCase());
  }
  return seen.size;
}

/** A short verdict-synthesis sentence derived from the score + strongest evidence. */
function bottomLine(topic: Topic): string {
  const score = topic.confidence_score;
  const allEvidence = topic.pillars.flatMap((p) => p.evidence ?? []);
  const topFor = strongest(allEvidence, "for");
  const lean =
    score >= 75
      ? "The weight of evidence supports this claim"
      : score >= 50
        ? "Evidence leans toward this claim, but it remains genuinely contested"
        : "The evidence is too thin to settle this claim";
  const anchor = topFor?.title
    ? `, anchored most strongly by ${topFor.title.replace(/\.$/, "")}`
    : "";
  return `${lean} at ${score}% confidence${anchor}.`;
}

function EvidenceItem({ ev }: { ev: Evidence }) {
  const score = calculateEvidenceScore(ev.weight); // 0–40
  const pct = Math.round((score / 40) * 100);
  const tier = confidenceTier(pct);
  const accent =
    ev.side === "for"
      ? "border-l-rust-400 bg-rust-50/30 dark:bg-rust-900/10"
      : "border-l-stone-500 bg-stone-100/30 dark:bg-stone-900/10";
  const label = ev.side === "for" ? "Supports" : "Against";
  const labelColor = ev.side === "for" ? "text-rust-700" : "text-stone-700 dark:text-stone-300";
  return (
    <li className={`rounded-md border-l-4 ${accent} pl-4 pr-4 py-3`}>
      <div className="flex items-baseline gap-2 mb-1 flex-wrap">
        <span className={`text-[10px] font-sans font-semibold uppercase tracking-[0.15em] ${labelColor}`}>
          {label}
        </span>
        <span
          className="text-[10px] font-sans font-semibold uppercase tracking-[0.1em] text-deep"
          title="Confidence tier from source reliability, independence, replicability, and directness"
        >
          {tier}
        </span>
        <span className="text-[10px] font-mono text-secondary">{pct}% confidence</span>
      </div>
      <p className="font-serif text-[16px] leading-snug text-primary mb-1">
        <span className="font-semibold">{ev.title}.</span>{" "}
        <span className="text-primary/90">{ev.description}</span>
      </p>
      <div className="mt-1.5 flex items-center gap-3 text-xs text-secondary">
        <div className="w-24 flex-shrink-0">
          <ConfidenceBar value={score} max={40} tone={ev.side} />
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

// ---------------------------------------------------------------------------
// Scroll progress + sticky pillar TOC
// ---------------------------------------------------------------------------

interface TocItem {
  id: string; // anchor id (without #)
  label: string;
}

function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return progress;
}

function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  const idsKey = ids.join("|");
  useEffect(() => {
    const items = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);
  return active;
}

export function ReadModeView({ topic }: { topic: Topic }) {
  const StatusIcon = statusMeta[topic.status].icon;
  const verdict = getVerdictSentence(topic.confidence_score);
  const categoryLabel = CATEGORY_LABELS[topic.category];

  const sourceCount = useMemo(() => countSources(topic), [topic]);
  const synthesis = useMemo(() => bottomLine(topic), [topic]);

  const tocItems: TocItem[] = useMemo(
    () =>
      topic.pillars.map((p, idx) => ({
        id: `pillar-${p.id}`,
        label: p.title || `Pillar ${idx + 1}`,
      })),
    [topic.pillars]
  );

  const relatedTopics = useMemo(() => {
    const sameCategory = topics
      .filter((t) => t.category === topic.category && t.id !== topic.id)
      .slice(0, 3);
    if (sameCategory.length >= 3) return sameCategory;
    const cross = getCrossCategoryRelated(topic.id, topic.category, 3 - sameCategory.length);
    return [...sameCategory, ...cross];
  }, [topic.id, topic.category]);

  const progress = useScrollProgress();
  const activeId = useActiveSection(tocItems.map((t) => t.id));
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const tocRef = useRef<HTMLElement>(null);

  return (
    <>
      {/* ─── Scroll-progress bar ─── */}
      <div className="fixed top-0 inset-x-0 z-40 h-0.5 bg-transparent pointer-events-none">
        <div
          className="h-full bg-deep transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="relative mx-auto max-w-[88rem] lg:flex lg:gap-8 lg:px-8">
        <article className="mx-auto w-full max-w-[72ch] px-5 sm:px-8 pt-6 pb-32 lg:mx-0 lg:px-0">
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

            {/* ─── Provenance strip ─── */}
            <p className="mt-3 font-sans text-[11px] text-muted dark:text-[#8a8279]">
              {topic.last_updated ? (
                <>Analyzed {formatDate(topic.last_updated)}</>
              ) : (
                <>Continuously reviewed</>
              )}
              {" · "}
              {sourceCount} {sourceCount === 1 ? "source" : "sources"}
              {topic.methodology_version ? <> · methodology {topic.methodology_version}</> : null}
            </p>
          </header>

          {/* ─── Flagship intro: keystone fact + simple case (gated on data) ─── */}
          <FlagshipIntro topic={topic} />

          {/* ─── The Claim ─── */}
          <section aria-label="The claim">
            <p className="font-serif text-[22px] leading-[1.55] text-primary first-letter:font-serif first-letter:text-[64px] first-letter:font-semibold first-letter:float-left first-letter:leading-[0.85] first-letter:mr-2 first-letter:mt-1 first-letter:text-deep">
              {topic.meta_claim}
            </p>

            {/* ─── Bottom line ─── */}
            <p className="mt-5 font-serif text-[17px] leading-relaxed text-secondary border-l-2 border-deep/40 pl-4 italic">
              <span className="not-italic font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-deep block mb-1">
                Bottom line
              </span>
              {synthesis}
            </p>
          </section>

          {/* ─── Controversy meter ─── */}
          <div className="mt-7">
            <ControversyMeter confidenceScore={topic.confidence_score} status={topic.status} />
          </div>

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
                className="mt-12 scroll-mt-24"
              >
                <div className="mb-4">
                  <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-secondary mb-1">
                    <GlossaryTerm term="pillar">Pillar</GlossaryTerm> {idx + 1} of{" "}
                    {topic.pillars.length}
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

                {/* Crux — falsification framing when available, else the settle-test */}
                <FalsificationCrux crux={pillar.crux} />
              </section>
            );
          })}

          {/* ─── Sources ─── */}
          {topic.references?.length ? (
            <section aria-label="Further reading" className="mt-14">
              <h2 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-secondary mb-3">
                Further reading
              </h2>
              <ul className="space-y-2.5 list-none p-0">
                {topic.references.map((ref, i) => (
                  <li key={ref.url}>
                    <CitationCard reference={ref} index={i + 1} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* ─── Engagement: community verdict ─── */}
          <div className="mt-16">
            <VerdictVoting
              topicId={topic.id}
              topicTitle={topic.title}
              confidenceScore={topic.confidence_score}
            />
          </div>

          {/* ─── Related topics ─── */}
          {relatedTopics.length > 0 && (
            <section aria-label="Related topics" className="mt-4">
              <h2 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-secondary mb-3">
                Related topics
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 list-none p-0">
                {relatedTopics.map((rt) => (
                  <li key={rt.id}>
                    <Link
                      href={`/topics/${rt.id}`}
                      className="surface-card card-hover block rounded-lg border border-stone-200/70 dark:border-[#3d3a36] px-4 py-3 transition-colors"
                    >
                      <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-secondary mb-1">
                        {CATEGORY_LABELS[rt.category]}
                      </div>
                      <div className="font-serif text-[17px] leading-snug text-primary">
                        {rt.title}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ─── Save / track ─── */}
          <section aria-label="Save this topic" className="mt-10 flex flex-col items-start gap-2">
            <SaveTopicButton topicId={topic.id} />
            <p className="font-sans text-xs text-secondary">
              Save this topic to get pinged if its confidence score shifts.
            </p>
          </section>

          {/* ─── Newsletter: capture at peak intent (reader finished the topic) ─── */}
          <section aria-label="Stay updated" className="mt-10">
            <NewsletterSignup variant="compact" source="topic-read" />
          </section>
        </article>

        {/* ─── Sticky pillar TOC (desktop rail) ─── */}
        {tocItems.length > 0 && (
          <nav
            aria-label="Table of contents"
            className="hidden lg:block w-56 flex-shrink-0"
          >
            <div className="sticky top-24 pt-6">
              <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-secondary mb-3">
                On this page
              </div>
              <ul className="space-y-1.5 list-none p-0 border-l border-stone-200/70 dark:border-[#3d3a36]">
                {tocItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id} className="-ml-px">
                      <a
                        href={`#${item.id}`}
                        className={`block border-l-2 pl-3 py-1 text-[13px] leading-snug font-sans transition-colors ${
                          isActive
                            ? "border-l-deep text-primary font-medium"
                            : "border-l-transparent text-secondary hover:text-primary"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        )}
      </div>

      {/* ─── Mobile TOC (collapsible) ─── */}
      {tocItems.length > 0 && (
        <div className="lg:hidden fixed bottom-5 left-5 z-30">
          <button
            type="button"
            onClick={() => setMobileTocOpen((v) => !v)}
            aria-expanded={mobileTocOpen}
            className="inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-[#252420]/90 backdrop-blur border border-stone-200/70 dark:border-[#3d3a36] px-3.5 py-2.5 text-sm font-sans font-medium text-primary shadow-lg"
          >
            {mobileTocOpen ? <X className="h-4 w-4" aria-hidden /> : <List className="h-4 w-4" aria-hidden />}
            Contents
          </button>
          {mobileTocOpen && (
            <nav
              ref={tocRef}
              aria-label="Table of contents"
              className="absolute bottom-full mb-2 left-0 w-64 max-h-[60vh] overflow-y-auto rounded-xl bg-white dark:bg-[#252420] border border-stone-200/70 dark:border-[#3d3a36] shadow-xl p-3"
            >
              <ul className="space-y-1 list-none p-0">
                {tocItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => setMobileTocOpen(false)}
                        className={`block rounded-md px-3 py-2 text-[13px] leading-snug font-sans transition-colors ${
                          isActive
                            ? "bg-deep/10 text-primary font-medium"
                            : "text-secondary hover:bg-stone-100 dark:hover:bg-[#302e2a]"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      )}

      {/* ─── Sticky open-the-map CTA ─── */}
      <div className="fixed bottom-5 right-5 z-30">
        <Link
          href="?view=graph"
          replace
          scroll={false}
          className="inline-flex items-center gap-2 rounded-full bg-deep text-white px-4 py-2.5 text-sm font-sans font-medium shadow-lg hover:bg-deep/90 transition-colors"
        >
          <Network className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Open the map</span>
          <span className="sm:hidden">Map</span>
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </>
  );
}

/** Format an ISO date string for the provenance strip. Falls back to the raw string. */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
