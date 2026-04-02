"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  FlaskConical,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  ArrowLeftRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ConfidenceGauge } from "@/components/ConfidenceGauge";
import { CATEGORY_LABELS } from "@/data/topicIndex";
import type {
  Topic,
  TopicCategory,
  TopicStatus,
  Crux,
} from "@/lib/schemas/topic";
import { getVerdictLabel } from "@/lib/schemas/topic";

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
  policy: "bg-deep/10 text-deep border-deep/20",
  technology: "bg-stone-100 text-stone-600 border-stone-200/60",
  science: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  economics: "bg-rust-50 text-rust-700 border-rust-200/60",
  philosophy: "bg-stone-100 text-stone-600 border-stone-200/60",
};

const verificationColors: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  verified: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    label: "Verified",
  },
  theoretical: {
    bg: "bg-deep/10",
    text: "text-deep",
    label: "Theoretical",
  },
  impossible: {
    bg: "bg-stone-100",
    text: "text-stone-600",
    label: "Impossible to Verify",
  },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TopicStats {
  totalEvidence: number;
  totalFor: number;
  totalAgainst: number;
  avgForWeight: number;
  avgAgainstWeight: number;
  cruxes: Crux[];
}

interface ComparisonViewProps {
  topic1: Topic;
  topic2: Topic;
  stats1: TopicStats;
  stats2: TopicStats;
}

// ---------------------------------------------------------------------------
// Confidence color helper
// ---------------------------------------------------------------------------

function confidenceColor(score: number): string {
  if (score >= 85) return "text-emerald-700";
  if (score >= 60) return "text-deep";
  if (score >= 40) return "text-rust-700";
  return "text-stone-600";
}

// ---------------------------------------------------------------------------
// Stat comparison row
// ---------------------------------------------------------------------------

function StatRow({
  label,
  value1,
  value2,
  suffix,
  highlight,
}: {
  label: string;
  value1: number;
  value2: number;
  suffix?: string;
  highlight?: "higher" | "lower";
}) {
  const v1Wins = highlight === "higher" ? value1 > value2 : value1 < value2;
  const v2Wins = highlight === "higher" ? value2 > value1 : value2 < value1;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-stone-200/40 dark:border-[#3d3a36]/60 last:border-b-0">
      <span
        className={`flex-1 text-right font-mono text-sm tabular-nums ${
          v1Wins ? "font-semibold text-deep" : "text-stone-600"
        }`}
      >
        {value1}
        {suffix}
      </span>
      <span className="w-32 text-center text-xs font-medium text-stone-500 uppercase tracking-widest shrink-0">
        {label}
      </span>
      <span
        className={`flex-1 text-left font-mono text-sm tabular-nums ${
          v2Wins ? "font-semibold text-deep" : "text-stone-600"
        }`}
      >
        {value2}
        {suffix}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Evidence balance bar
// ---------------------------------------------------------------------------

function EvidenceBalanceBar({
  forCount,
  againstCount,
  side,
}: {
  forCount: number;
  againstCount: number;
  side: "left" | "right";
}) {
  const total = forCount + againstCount;
  const forPct = total > 0 ? Math.round((forCount / total) * 100) : 50;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-stone-500 flex items-center gap-1">
          <ThumbsUp className="h-3 w-3 text-emerald-500" />
          {forCount} for
        </span>
        <span className="text-xs font-medium text-stone-500 flex items-center gap-1">
          {againstCount} against
          <ThumbsDown className="h-3 w-3 text-red-400" />
        </span>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden flex bg-stone-200/60 dark:bg-[#3d3a36]">
        <div
          className={`h-full ${
            side === "left"
              ? "bg-gradient-to-r from-rust-500 to-rust-600"
              : "bg-gradient-to-r from-deep-light to-deep"
          } animate-bar-fill`}
          style={{ width: `${forPct}%` }}
        />
        <div className="h-full flex-1 bg-stone-300/40" />
      </div>
      <div className="text-center mt-1">
        <span className="text-[11px] font-mono text-stone-400 tabular-nums">
          {forPct}% for / {100 - forPct}% against
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Crux list
// ---------------------------------------------------------------------------

function CruxList({ cruxes }: { cruxes: Crux[] }) {
  return (
    <div className="space-y-2.5">
      {cruxes.map((crux) => {
        const verification =
          verificationColors[crux.verification_status] ??
          verificationColors.theoretical;
        return (
          <div
            key={crux.id}
            className="rounded-lg border border-deep/15 bg-[#4f7b77]/[0.03] p-3.5"
          >
            <div className="flex items-start gap-2 mb-1.5">
              <FlaskConical className="h-3.5 w-3.5 text-deep mt-0.5 flex-shrink-0" />
              <h4 className="font-serif text-sm font-semibold text-primary leading-snug flex-1">
                {crux.title}
              </h4>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-2 pl-5.5">
              {crux.description}
            </p>
            <div className="flex items-center gap-2 pl-5.5">
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${verification.bg} ${verification.text}`}
              >
                {verification.label}
              </span>
              <span className="text-[10px] text-stone-400">
                {crux.cost_to_verify}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Topic column header
// ---------------------------------------------------------------------------

function TopicColumnHeader({
  topic,
  side,
}: {
  topic: Topic;
  side: "left" | "right";
}) {
  const StatusIcon = statusIcons[topic.status];

  return (
    <div className="flex flex-col items-center text-center">
      <ConfidenceGauge score={topic.confidence_score} size={100} />
      <h2 className="font-serif text-xl sm:text-2xl text-primary mt-3 mb-2 leading-tight">
        {topic.title}
      </h2>
      <p className="text-sm text-stone-500 leading-relaxed mb-3 line-clamp-3">
        {topic.meta_claim}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize ${
            categoryColors[topic.category]
          }`}
        >
          {CATEGORY_LABELS[topic.category]}
        </span>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${
            statusColors[topic.status]
          }`}
        >
          <StatusIcon className="h-3 w-3" />
          {statusLabels[topic.status]}
        </span>
      </div>
      <p className="text-xs text-stone-400 italic">
        {getVerdictLabel(topic.confidence_score)}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function ComparisonView({
  topic1,
  topic2,
  stats1,
  stats2,
}: ComparisonViewProps) {
  return (
    <AppShell>
      <div className="min-h-screen bg-[#f4f1eb] dark:bg-[#121210] overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100/80 dark:bg-[#302e2a] rounded-full text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider border border-stone-200/50 dark:border-[#3d3a36] mb-4">
              <ArrowLeftRight className="h-3.5 w-3.5" />
              Side-by-Side Comparison
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-4 leading-[1.08]">
              <span className="text-rust-700">{topic1.title}</span>
              <span className="text-stone-400 mx-2 sm:mx-3 font-sans text-2xl sm:text-3xl lg:text-4xl italic">
                vs
              </span>
              <span className="text-deep">{topic2.title}</span>
            </h1>
            <p className="text-sm sm:text-base text-stone-500 max-w-2xl mx-auto leading-relaxed">
              Compare the evidence, arguments, and analytical depth of these two
              debates side by side.
            </p>
          </header>

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Topic 1 Header */}
            <div className="bg-transparent rounded-xl border border-stone-200/60 dark:border-[#3d3a36] p-6">
              <TopicColumnHeader topic={topic1} side="left" />
            </div>

            {/* Topic 2 Header */}
            <div className="bg-transparent rounded-xl border border-stone-200/60 dark:border-[#3d3a36] p-6">
              <TopicColumnHeader topic={topic2} side="right" />
            </div>
          </div>

          {/* ── Stats comparison ── */}
          <section className="bg-transparent rounded-xl border border-stone-200/60 dark:border-[#3d3a36] p-6 sm:p-8 mb-8">
            <h2 className="font-serif text-2xl text-primary mb-6 text-center">
              By the Numbers
            </h2>

            <StatRow
              label="Confidence"
              value1={topic1.confidence_score}
              value2={topic2.confidence_score}
              suffix="%"
              highlight="higher"
            />
            <StatRow
              label="Pillars"
              value1={topic1.pillars.length}
              value2={topic2.pillars.length}
              highlight="higher"
            />
            <StatRow
              label="Evidence"
              value1={stats1.totalEvidence}
              value2={stats2.totalEvidence}
              highlight="higher"
            />
            <StatRow
              label="For"
              value1={stats1.totalFor}
              value2={stats2.totalFor}
              highlight="higher"
            />
            <StatRow
              label="Against"
              value1={stats1.totalAgainst}
              value2={stats2.totalAgainst}
              highlight="higher"
            />
            <StatRow
              label="Avg For Wt"
              value1={stats1.avgForWeight}
              value2={stats2.avgForWeight}
              suffix="/40"
              highlight="higher"
            />
            <StatRow
              label="Avg Against Wt"
              value1={stats1.avgAgainstWeight}
              value2={stats2.avgAgainstWeight}
              suffix="/40"
              highlight="higher"
            />
          </section>

          {/* ── Evidence Balance ── */}
          <section className="bg-transparent rounded-xl border border-stone-200/60 dark:border-[#3d3a36] p-6 sm:p-8 mb-8">
            <h2 className="font-serif text-2xl text-primary mb-6 text-center">
              Evidence Balance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-base text-primary mb-3 text-center">
                  {topic1.title}
                </h3>
                <EvidenceBalanceBar
                  forCount={stats1.totalFor}
                  againstCount={stats1.totalAgainst}
                  side="left"
                />
              </div>
              <div>
                <h3 className="font-serif text-base text-primary mb-3 text-center">
                  {topic2.title}
                </h3>
                <EvidenceBalanceBar
                  forCount={stats2.totalFor}
                  againstCount={stats2.totalAgainst}
                  side="right"
                />
              </div>
            </div>
          </section>

          {/* ── Pillar Summaries ── */}
          <section className="bg-transparent rounded-xl border border-stone-200/60 dark:border-[#3d3a36] p-6 sm:p-8 mb-8">
            <h2 className="font-serif text-2xl text-primary mb-6 text-center">
              Argument Pillars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Topic 1 Pillars */}
              <div>
                <h3 className="font-serif text-base text-primary mb-4 text-center">
                  {topic1.title}
                </h3>
                <div className="space-y-3">
                  {topic1.pillars.map((pillar, i) => (
                    <div
                      key={pillar.id}
                      className="rounded-lg border border-stone-200/60 dark:border-[#3d3a36] bg-[#faf8f5] dark:bg-[#1a1916] p-4"
                    >
                      <div className="flex items-start gap-2.5 mb-1.5">
                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-rust-100 flex items-center justify-center text-xs font-mono font-semibold text-rust-700">
                          {i + 1}
                        </span>
                        <h4 className="font-serif text-sm font-semibold text-primary leading-snug">
                          {pillar.title}
                        </h4>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pl-8.5">
                        {pillar.short_summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topic 2 Pillars */}
              <div>
                <h3 className="font-serif text-base text-primary mb-4 text-center">
                  {topic2.title}
                </h3>
                <div className="space-y-3">
                  {topic2.pillars.map((pillar, i) => (
                    <div
                      key={pillar.id}
                      className="rounded-lg border border-stone-200/60 dark:border-[#3d3a36] bg-[#faf8f5] dark:bg-[#1a1916] p-4"
                    >
                      <div className="flex items-start gap-2.5 mb-1.5">
                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-deep/10 flex items-center justify-center text-xs font-mono font-semibold text-deep">
                          {i + 1}
                        </span>
                        <h4 className="font-serif text-sm font-semibold text-primary leading-snug">
                          {pillar.title}
                        </h4>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pl-8.5">
                        {pillar.short_summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Key Cruxes ── */}
          <section className="bg-transparent rounded-xl border border-stone-200/60 dark:border-[#3d3a36] p-6 sm:p-8 mb-8">
            <h2 className="font-serif text-2xl text-primary mb-2 text-center">
              Key Crux Questions
            </h2>
            <p className="text-sm text-stone-500 mb-6 text-center max-w-xl mx-auto">
              The decisive questions that would resolve each debate. These are
              the tests and experiments that matter most.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-base text-primary mb-4 text-center flex items-center justify-center gap-2">
                  <FlaskConical className="h-4 w-4 text-rust-500" />
                  {topic1.title}
                </h3>
                <CruxList cruxes={stats1.cruxes} />
              </div>
              <div>
                <h3 className="font-serif text-base text-primary mb-4 text-center flex items-center justify-center gap-2">
                  <FlaskConical className="h-4 w-4 text-deep" />
                  {topic2.title}
                </h3>
                <CruxList cruxes={stats2.cruxes} />
              </div>
            </div>
          </section>

          {/* ── CTAs ── */}
          <section className="bg-transparent rounded-xl border border-stone-200/60 dark:border-[#3d3a36] p-6 sm:p-8 mb-8">
            <h2 className="font-serif text-2xl text-primary mb-6 text-center">
              Dive Deeper
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href={`/topics/${topic1.id}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-stone-200/60 dark:border-[#3d3a36] bg-[#faf8f5] dark:bg-[#1a1916] p-6 hover:border-rust-300/50 hover:shadow-md transition-all card-hover"
              >
                <span className="font-serif text-lg text-primary group-hover:text-rust-700 transition-colors text-center">
                  {topic1.title}
                </span>
                <span className={`font-mono text-2xl font-bold tabular-nums ${confidenceColor(topic1.confidence_score)}`}>
                  {topic1.confidence_score}%
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-rust-600 font-medium">
                  Full analysis
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>

              <Link
                href={`/topics/${topic2.id}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-stone-200/60 dark:border-[#3d3a36] bg-[#faf8f5] dark:bg-[#1a1916] p-6 hover:border-deep/30 hover:shadow-md transition-all card-hover"
              >
                <span className="font-serif text-lg text-primary group-hover:text-deep transition-colors text-center">
                  {topic2.title}
                </span>
                <span className={`font-mono text-2xl font-bold tabular-nums ${confidenceColor(topic2.confidence_score)}`}>
                  {topic2.confidence_score}%
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-deep font-medium">
                  Full analysis
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>
          </section>

          {/* ── Explore more comparisons ── */}
          <div className="text-center mb-8">
            <Link
              href="/topics/compare"
              className="inline-flex items-center gap-2 text-sm text-deep hover:text-deep-dark font-medium transition-colors"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              Browse all comparisons
            </Link>
          </div>

          {/* Footer nav */}
          <div className="pt-6 border-t border-stone-200/60 dark:border-[#3d3a36]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <Link
                href="/topics"
                className="text-sm text-deep hover:underline py-2 min-h-[44px] inline-flex items-center"
              >
                &larr; Back to all topics
              </Link>
              <p className="text-xs text-stone-500 italic">
                Data-driven analysis. Question everything.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
