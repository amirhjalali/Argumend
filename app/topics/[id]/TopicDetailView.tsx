"use client";

import Link from "next/link";
import {
  ChevronRight,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Shield,
  Beaker,
  Ban,
  ThumbsUp,
  ThumbsDown,
  FlaskConical,
  ExternalLink,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import type {
  Topic,
  TopicCategory,
  TopicStatus,
  Pillar,
  Evidence,
  Crux,
} from "@/lib/schemas/topic";
import { calculateEvidenceScore } from "@/lib/schemas/topic";
import { CATEGORY_LABELS } from "@/data/topics";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const statusIcons: Record<TopicStatus, typeof CheckCircle> = {
  settled: CheckCircle,
  contested: AlertCircle,
  highly_speculative: HelpCircle,
};

const statusColors: Record<TopicStatus, string> = {
  settled: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  contested: "bg-rust-50 text-rust-700 border-rust-200/60",
  highly_speculative: "bg-stone-100 text-stone-600 border-stone-200/60",
};

const statusLabels: Record<TopicStatus, string> = {
  settled: "Settled",
  contested: "Contested",
  highly_speculative: "Highly Speculative",
};

const categoryColors: Record<TopicCategory, string> = {
  policy: "bg-blue-50 text-blue-600 border-blue-200/60",
  technology: "bg-violet-50 text-violet-600 border-violet-200/60",
  science: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  economics: "bg-rust-50 text-rust-700 border-rust-200/60",
  philosophy: "bg-stone-100 text-stone-600 border-stone-200/60",
};

const verificationColors: Record<string, { bg: string; text: string; label: string }> = {
  verified: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Verified" },
  theoretical: { bg: "bg-blue-50", text: "text-blue-700", label: "Theoretical" },
  impossible: { bg: "bg-stone-100", text: "text-stone-600", label: "Impossible to Verify" },
};

// ---------------------------------------------------------------------------
// Confidence badge color
// ---------------------------------------------------------------------------

function confidenceColor(score: number): string {
  if (score >= 85) return "text-emerald-700 bg-emerald-50 border-emerald-200/60";
  if (score >= 60) return "text-blue-700 bg-blue-50 border-blue-200/60";
  if (score >= 40) return "text-rust-700 bg-rust-50 border-rust-200/60";
  return "text-stone-600 bg-stone-100 border-stone-200/60";
}

// ---------------------------------------------------------------------------
// Evidence weight bar
// ---------------------------------------------------------------------------

function WeightBar({ value, max = 10 }: { value: number; max?: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 rounded-full bg-stone-200/80 overflow-hidden">
        <div
          className="h-full rounded-full bg-[#4f7b77]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-mono text-stone-500 w-5 text-right tabular-nums">
        {value}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Evidence Card
// ---------------------------------------------------------------------------

function EvidenceCard({ evidence }: { evidence: Evidence }) {
  const totalScore = calculateEvidenceScore(evidence.weight);
  const isFor = evidence.side === "for";

  return (
    <div
      className={`rounded-lg border p-4 ${
        isFor
          ? "bg-emerald-50/40 border-emerald-200/50"
          : "bg-red-50/30 border-red-200/50"
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
            isFor ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"
          }`}
        >
          {isFor ? (
            <ThumbsUp className="h-3.5 w-3.5" />
          ) : (
            <ThumbsDown className="h-3.5 w-3.5" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm text-[#3d3a36]">
              {evidence.title}
            </h4>
            <span className="text-xs font-mono text-stone-400 tabular-nums flex-shrink-0">
              {totalScore}/40
            </span>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            {evidence.description}
          </p>
        </div>
      </div>

      {/* Weight breakdown */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pl-9">
        <div>
          <span className="text-[11px] text-stone-400">Source Reliability</span>
          <WeightBar value={evidence.weight.sourceReliability} />
        </div>
        <div>
          <span className="text-[11px] text-stone-400">Independence</span>
          <WeightBar value={evidence.weight.independence} />
        </div>
        <div>
          <span className="text-[11px] text-stone-400">Replicability</span>
          <WeightBar value={evidence.weight.replicability} />
        </div>
        <div>
          <span className="text-[11px] text-stone-400">Directness</span>
          <WeightBar value={evidence.weight.directness} />
        </div>
      </div>

      {evidence.reasoning && (
        <p className="text-xs text-stone-500 italic mt-3 pl-9">
          {evidence.reasoning}
        </p>
      )}

      {evidence.source && (
        <div className="mt-2 pl-9">
          {evidence.sourceUrl ? (
            <a
              href={evidence.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#4f7b77] hover:underline"
            >
              {evidence.source}
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span className="text-xs text-stone-400">Source: {evidence.source}</span>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Crux Card
// ---------------------------------------------------------------------------

function CruxCard({ crux }: { crux: Crux }) {
  const verification = verificationColors[crux.verification_status] ?? verificationColors.theoretical;

  return (
    <div className="rounded-lg border border-[#4f7b77]/20 bg-[#4f7b77]/[0.03] p-5">
      <div className="flex items-center gap-2 mb-3">
        <FlaskConical className="h-4 w-4 text-[#4f7b77]" strokeWidth={1.5} />
        <h4 className="font-serif text-base font-semibold text-[#3d3a36]">
          Crux: {crux.title}
        </h4>
        <span
          className={`ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full border ${verification.bg} ${verification.text}`}
        >
          {verification.label}
        </span>
      </div>

      <p className="text-sm text-stone-600 leading-relaxed mb-4">
        {crux.description}
      </p>

      <div className="space-y-3">
        <div>
          <span className="text-xs font-medium text-stone-400 uppercase tracking-wide">
            Methodology
          </span>
          <p className="text-sm text-stone-700 leading-relaxed mt-1 bg-white/60 rounded p-3 border border-stone-200/50 font-mono text-[13px]">
            {crux.methodology}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <span className="text-xs font-medium text-stone-400 uppercase tracking-wide">
              Cost to Verify
            </span>
            <p className="text-sm text-stone-700 mt-0.5">{crux.cost_to_verify}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pillar Section
// ---------------------------------------------------------------------------

function PillarSection({
  pillar,
  index,
}: {
  pillar: Pillar;
  index: number;
}) {
  const forEvidence = (pillar.evidence ?? []).filter((e) => e.side === "for");
  const againstEvidence = (pillar.evidence ?? []).filter((e) => e.side === "against");

  return (
    <section className="mb-10">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#4f7b77]/10 flex items-center justify-center text-sm font-mono font-semibold text-[#4f7b77]">
          {index + 1}
        </span>
        <div>
          <h3 className="font-serif text-xl text-[#3d3a36] leading-tight">
            {pillar.title}
          </h3>
          <p className="text-sm text-stone-500 mt-1 leading-relaxed">
            {pillar.short_summary}
          </p>
        </div>
      </div>

      {/* Skeptic vs Proponent */}
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="rounded-lg border border-red-200/50 bg-red-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-red-400" strokeWidth={1.5} />
            <span className="text-xs font-medium text-red-500 uppercase tracking-wide">
              Skeptic Premise
            </span>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed italic">
            &ldquo;{pillar.skeptic_premise}&rdquo;
          </p>
        </div>

        <div className="rounded-lg border border-emerald-200/50 bg-emerald-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-emerald-500" strokeWidth={1.5} />
            <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
              Proponent Rebuttal
            </span>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            {pillar.proponent_rebuttal}
          </p>
        </div>
      </div>

      {/* Evidence */}
      {(forEvidence.length > 0 || againstEvidence.length > 0) && (
        <div className="mb-5">
          <h4 className="text-sm font-medium text-stone-400 uppercase tracking-wide mb-3">
            Evidence ({(pillar.evidence ?? []).length} items)
          </h4>
          <div className="space-y-3">
            {forEvidence.map((ev) => (
              <EvidenceCard key={ev.id} evidence={ev} />
            ))}
            {againstEvidence.map((ev) => (
              <EvidenceCard key={ev.id} evidence={ev} />
            ))}
          </div>
        </div>
      )}

      {/* Crux */}
      <CruxCard crux={pillar.crux} />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Related Topic Card
// ---------------------------------------------------------------------------

function RelatedTopicCard({ topic }: { topic: Topic }) {
  const StatusIcon = statusIcons[topic.status];

  return (
    <Link
      href={`/topics/${topic.id}`}
      className="group flex flex-col bg-white border border-stone-200/60 rounded-xl p-4 hover:border-[#4f7b77]/30 hover:shadow-sm transition-all"
    >
      <h3 className="font-serif text-base text-[#3d3a36] group-hover:text-[#4f7b77] transition-colors leading-snug mb-1.5">
        {topic.title}
      </h3>
      <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-3 flex-1">
        {topic.meta_claim}
      </p>
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColors[topic.status]}`}
        >
          <StatusIcon className="h-3 w-3" />
          {statusLabels[topic.status]}
        </span>
        <span className="font-mono text-xs tabular-nums text-stone-500">
          {topic.confidence_score}%
        </span>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

interface TopicDetailViewProps {
  topic: Topic;
  relatedTopics: Topic[];
}

export default function TopicDetailView({
  topic,
  relatedTopics,
}: TopicDetailViewProps) {
  const StatusIcon = statusIcons[topic.status];
  const totalEvidence = topic.pillars.reduce(
    (sum, p) => sum + (p.evidence?.length ?? 0),
    0
  );

  return (
    <AppShell>
      <div className="min-h-screen bg-[#f4f1eb]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
            <Link
              href="/topics"
              className="hover:text-[#4f7b77] transition-colors"
            >
              Topics
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="capitalize">
              {CATEGORY_LABELS[topic.category]}
            </span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-stone-600 truncate max-w-[200px]">
              {topic.title}
            </span>
          </nav>

          {/* Hero */}
          <header className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {/* Category pill */}
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${categoryColors[topic.category]}`}
              >
                {CATEGORY_LABELS[topic.category]}
              </span>

              {/* Status pill */}
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[topic.status]}`}
              >
                <StatusIcon className="h-3.5 w-3.5" />
                {statusLabels[topic.status]}
              </span>

              {/* Confidence badge */}
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border tabular-nums ${confidenceColor(topic.confidence_score)}`}
              >
                {topic.confidence_score}% confidence
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#3d3a36] mb-4 leading-[1.1]">
              {topic.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-[1.7] max-w-3xl">
              {topic.meta_claim}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-6 pt-5 border-t border-stone-200/60">
              <div className="text-center">
                <span className="block text-lg font-mono font-semibold text-[#3d3a36] tabular-nums">
                  {topic.pillars.length}
                </span>
                <span className="text-xs text-stone-400">Pillars</span>
              </div>
              <div className="text-center">
                <span className="block text-lg font-mono font-semibold text-[#3d3a36] tabular-nums">
                  {totalEvidence}
                </span>
                <span className="text-xs text-stone-400">Evidence Items</span>
              </div>
              <div className="text-center">
                <span className="block text-lg font-mono font-semibold text-[#3d3a36] tabular-nums">
                  {topic.pillars.length}
                </span>
                <span className="text-xs text-stone-400">Crux Questions</span>
              </div>
              {topic.references && (
                <div className="text-center">
                  <span className="block text-lg font-mono font-semibold text-[#3d3a36] tabular-nums">
                    {topic.references.length}
                  </span>
                  <span className="text-xs text-stone-400">References</span>
                </div>
              )}
            </div>
          </header>

          {/* Meta Claim Expanded */}
          <section className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
            <h2 className="font-serif text-xl sm:text-2xl text-[#3d3a36] mb-3">
              The Claim
            </h2>
            <blockquote className="border-l-2 border-[#4f7b77] pl-4 sm:pl-5">
              <p className="text-base sm:text-lg text-stone-700 leading-[1.7] italic">
                &ldquo;{topic.meta_claim}&rdquo;
              </p>
            </blockquote>
            <p className="text-sm text-stone-500 mt-4 leading-relaxed">
              This topic is currently classified as{" "}
              <strong className="text-[#3d3a36]">
                {statusLabels[topic.status].toLowerCase()}
              </strong>{" "}
              with a computed confidence score of{" "}
              <strong className="text-[#3d3a36]">{topic.confidence_score}%</strong>,
              based on {totalEvidence} weighted evidence items across{" "}
              {topic.pillars.length} analytical pillars.
            </p>
          </section>

          {/* Pillars */}
          <section className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
            <h2 className="font-serif text-xl sm:text-2xl text-[#3d3a36] mb-6">
              Argument Pillars
            </h2>
            <p className="text-sm text-stone-500 mb-8 leading-relaxed">
              Each pillar represents a distinct line of argumentation. For every
              pillar, we present the strongest skeptic challenge, the best
              proponent rebuttal, the weighted evidence, and the crux question
              that would resolve the debate.
            </p>

            <div className="space-y-8">
              {topic.pillars.map((pillar, i) => (
                <PillarSection key={pillar.id} pillar={pillar} index={i} />
              ))}
            </div>
          </section>

          {/* References */}
          {topic.references && topic.references.length > 0 && (
            <section className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
              <h2 className="font-serif text-xl sm:text-2xl text-[#3d3a36] mb-4">
                References
              </h2>
              <ul className="space-y-2">
                {topic.references.map((ref, i) => (
                  <li key={i}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-[#4f7b77] hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                      {ref.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* CTA */}
          <section className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8 text-center">
            <h2 className="font-serif text-xl sm:text-2xl text-[#3d3a36] mb-2">
              Explore interactively
            </h2>
            <p className="text-sm text-stone-500 mb-5">
              Dive into the visual argument map with interactive scales, logic
              trees, and crux identification.
            </p>
            <Link
              href={`/?topic=${topic.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm"
            >
              Explore this topic interactively
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* Related Topics */}
          {relatedTopics.length > 0 && (
            <section className="mb-8">
              <h2 className="font-serif text-xl sm:text-2xl text-[#3d3a36] mb-4">
                Related Topics
              </h2>
              <p className="text-sm text-stone-500 mb-5">
                More from the{" "}
                <span className="capitalize font-medium text-stone-600">
                  {CATEGORY_LABELS[topic.category]}
                </span>{" "}
                category.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedTopics.map((rt) => (
                  <RelatedTopicCard key={rt.id} topic={rt} />
                ))}
              </div>
            </section>
          )}

          {/* Footer */}
          <div className="pt-6 border-t border-stone-200/60">
            <div className="flex items-center justify-between">
              <Link
                href="/topics"
                className="text-sm text-[#4f7b77] hover:underline"
              >
                &larr; Back to all topics
              </Link>
              <p className="text-xs text-stone-400 italic">
                Data-driven analysis. Question everything.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
