"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BookOpen, Library } from "lucide-react";
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
  Target,
  Zap,
  Atom,
  Telescope,
  Microscope,
  Scale,
  Gavel,
  FileText,
  Users,
  AlertTriangle,
  UserX,
  UserCheck,
  BarChart3,
  GraduationCap,
  Swords,
  Sword,
  Quote,
} from "lucide-react";
import dynamic from "next/dynamic";
import { AppShell } from "@/components/AppShell";
import { ShareButtons } from "@/components/ShareButtons";
import { EmbedButton } from "@/components/EmbedButton";
import { SaveTopicButton } from "@/components/SaveTopicButton";
import { SubscribeButton } from "@/components/SubscribeButton";
import type {
  Topic,
  TopicCategory,
  TopicStatus,
  Pillar,
  Evidence,
  Crux,
} from "@/lib/schemas/topic";
import { calculateEvidenceScore, getVerdictLabel } from "@/lib/schemas/topic";
import { CATEGORY_LABELS } from "@/data/topicIndex";
import { hasMockDebate, getMockDebate } from "@/data/mockDebates";
import { getMockVerdict } from "@/data/mockVerdicts";
import type { DebateMessage } from "@/types/debate";
import { getLLMOption, ClaudeIcon } from "@/components/icons/LLMIcons";
import { trackEvent } from "@/lib/analytics";
import { DebateHighlight } from "@/components/DebateHighlight";
import { ControversyMeter } from "@/components/ControversyMeter";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { hasTimeline, getTimeline } from "@/lib/topicTimelines";
import { ConfidenceTimeline } from "@/components/ConfidenceTimeline";

// Heavy component — only rendered when a verdict exists
const JudgingResults = dynamic(
  () => import("@/components/JudgingResults").then((m) => ({ default: m.JudgingResults })),
  { loading: () => <div className="animate-pulse h-40 bg-stone-200/60 rounded-lg" /> }
);

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

const categoryTopBorder: Record<TopicCategory, string> = {
  policy: "border-t-deep",
  technology: "border-t-stone-400",
  science: "border-t-emerald-400",
  economics: "border-t-rust-400",
  philosophy: "border-t-stone-400",
};

const verificationColors: Record<string, { bg: string; text: string; label: string }> = {
  verified: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Verified" },
  theoretical: { bg: "bg-deep/10", text: "text-deep", label: "Theoretical" },
  impossible: { bg: "bg-stone-100", text: "text-stone-600", label: "Impossible to Verify" },
};

const ICON_MAP: Record<string, typeof Shield> = {
  Target,
  Zap,
  HelpCircle,
  Shield,
  Atom,
  Telescope,
  Microscope,
  Scale,
  Gavel,
  FileText,
  Users,
  AlertTriangle,
};

// ---------------------------------------------------------------------------
// Confidence badge color
// ---------------------------------------------------------------------------

function confidenceColor(score: number): string {
  if (score >= 85) return "text-emerald-700 bg-emerald-50 border-emerald-200/60";
  if (score >= 60) return "text-deep bg-deep/10 border-deep/20";
  if (score >= 40) return "text-rust-700 bg-rust-50 border-rust-200/60";
  return "text-stone-600 bg-stone-100 border-stone-200/60";
}

// ---------------------------------------------------------------------------
// Evidence weight bar
// ---------------------------------------------------------------------------

function WeightBar({ value, max = 10 }: { value: number; max?: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div
      className="flex items-center gap-2"
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={`Weight: ${value} out of ${max}`}
    >
      <div className="h-2 flex-1 rounded-full bg-stone-200/80 overflow-hidden">
        <div
          className="h-full rounded-full bg-deep-light transition-all duration-300 animate-bar-fill"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="text-xs font-mono text-stone-500 w-7 text-right tabular-nums">
        {value}/{max}
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
      className={`rounded-lg border p-4 shadow-sm ${
        isFor
          ? "bg-emerald-50/40 border-emerald-200/50"
          : "bg-red-50/30 border-red-200/50"
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`mt-0.5 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
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
            <h4 className="font-semibold text-sm text-primary leading-snug">
              {evidence.title}
            </h4>
            <span
              className={`inline-flex items-center gap-1 text-xs font-mono tabular-nums flex-shrink-0 px-1.5 py-0.5 rounded-md border ${
                isFor
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200/60"
                  : "bg-red-50 text-red-500 border-red-200/60"
              }`}
            >
              <BarChart3 className="h-3 w-3" />
              {totalScore}/40
            </span>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            {evidence.description}
          </p>
        </div>
      </div>

      {/* Weight breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pl-0 sm:pl-10">
        <div>
          <span className="text-xs font-medium text-stone-500">Source Reliability</span>
          <WeightBar value={evidence.weight.sourceReliability} />
        </div>
        <div>
          <span className="text-xs font-medium text-stone-500">Independence</span>
          <WeightBar value={evidence.weight.independence} />
        </div>
        <div>
          <span className="text-xs font-medium text-stone-500">Replicability</span>
          <WeightBar value={evidence.weight.replicability} />
        </div>
        <div>
          <span className="text-xs font-medium text-stone-500">Directness</span>
          <WeightBar value={evidence.weight.directness} />
        </div>
      </div>

      {evidence.reasoning && (
        <p className="text-xs text-stone-500 italic mt-3 pl-0 sm:pl-10">
          {evidence.reasoning}
        </p>
      )}

      {evidence.source && (
        <div className="mt-2.5 pl-0 sm:pl-10">
          {evidence.sourceUrl ? (
            <a
              href={evidence.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-deep hover:underline"
            >
              {evidence.source}
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span className="text-xs text-stone-500">Source: {evidence.source}</span>
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
  const isTestable = crux.verification_status === "verified";

  return (
    <div className="rounded-lg border border-deep/20 bg-[#4f7b77]/[0.03] p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2.5 mb-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-deep/10 flex items-center justify-center">
          <FlaskConical className="h-4.5 w-4.5 text-deep" strokeWidth={1.5} />
        </div>
        <h4 className="font-serif text-base font-semibold text-primary flex-1 min-w-0">
          Crux: {crux.title}
        </h4>
        <span
          className={`ml-auto text-xs font-medium px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1 ${verification.bg} ${verification.text} ${
            isTestable ? "ring-1 ring-emerald-300/50" : ""
          }`}
        >
          {isTestable && <CheckCircle className="h-3 w-3" />}
          {verification.label}
        </span>
      </div>

      <p className="text-sm text-stone-600 leading-relaxed mb-4">
        {crux.description}
      </p>

      <div className="space-y-3">
        <div>
          <span className="text-xs font-medium text-stone-500 uppercase tracking-widest">
            Methodology
          </span>
          <p className="text-sm text-stone-700 leading-relaxed mt-1.5 bg-white/60 rounded-lg p-4 border border-stone-200/50 font-mono text-[13px] break-words">
            {crux.methodology}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <span className="text-xs font-medium text-stone-500 uppercase tracking-widest">
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
    <AnimateOnScroll variant="fade-up" delay={index * 80} as="section" className="mb-10">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-deep/10 flex items-center justify-center text-sm font-mono font-semibold text-deep">
          {index + 1}
        </span>
        <div>
          <h3 className="font-serif text-xl text-primary leading-tight">
            {pillar.title}
          </h3>
          <p className="text-sm text-stone-500 mt-1 leading-relaxed">
            {pillar.short_summary}
          </p>
        </div>
      </div>

      {/* Skeptic vs Proponent */}
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="rounded-lg border border-red-200/50 bg-stone-50/50 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <UserX className="h-3.5 w-3.5 text-red-500" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">
              What a Skeptic Would Say
            </span>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed italic">
            &ldquo;{pillar.skeptic_premise}&rdquo;
          </p>
        </div>

        <div className="rounded-lg border border-emerald-200/50 bg-[#4f7b77]/[0.02] p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <UserCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">
              What a Proponent Would Say
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
          <h4 className="text-sm font-medium text-stone-500 uppercase tracking-widest mb-3">
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
    </AnimateOnScroll>
  );
}

// ---------------------------------------------------------------------------
// Related Topic Card
// ---------------------------------------------------------------------------

function RelatedTopicCard({ topic }: { topic: Topic }) {
  const StatusIcon = statusIcons[topic.status];
  const confPct = Math.min(topic.confidence_score, 100);

  return (
    <Link
      href={`/topics/${topic.id}`}
      className={`group flex flex-col bg-white border border-stone-200/60 border-t-2 ${categoryTopBorder[topic.category]} rounded-xl p-5 hover:border-[#4f7b77]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 card-hover`}
    >
      <h3 className="font-serif text-base text-primary group-hover:text-deep transition-colors leading-snug mb-1.5">
        {topic.title}
      </h3>
      <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-4 flex-1">
        {topic.meta_claim}
      </p>

      {/* Confidence bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-stone-500 uppercase tracking-widest">
            Confidence
          </span>
          <span className="font-mono text-xs tabular-nums text-stone-600 font-semibold">
            {topic.confidence_score}%
          </span>
        </div>
        <div
          className="h-1.5 rounded-full bg-stone-200/80 overflow-hidden"
          role="meter"
          aria-valuenow={topic.confidence_score}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Confidence: ${topic.confidence_score}%`}
        >
          <div
            className="h-full rounded-full bg-deep-light transition-all duration-300 animate-bar-fill"
            style={{ width: `${confPct}%` }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Category pill */}
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize ${categoryColors[topic.category]}`}
          >
            {CATEGORY_LABELS[topic.category]}
          </span>
          {/* Status pill */}
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColors[topic.status]}`}
          >
            <StatusIcon className="h-3 w-3" />
            {statusLabels[topic.status]}
          </span>
        </div>
        <ArrowRight className="h-3.5 w-3.5 text-stone-300 group-hover:text-deep group-hover:translate-x-0.5 transition-all flex-shrink-0" />
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Debate Preview (inline mock debate on topic detail page)
// ---------------------------------------------------------------------------

function DebateMessageBubble({ message }: { message: DebateMessage }) {
  const llm = getLLMOption(message.model);
  const isFor = message.side === "for";
  const Icon = llm?.Icon ?? ClaudeIcon;

  return (
    <div className="relative">
      {message.side === "for" && (
        <div className="flex justify-center mb-4">
          <div className="px-3 py-1 bg-stone-100/80 rounded-full border border-stone-200/50">
            <span className="text-xs font-medium text-stone-500 tracking-wider uppercase">
              Round {message.round}
            </span>
          </div>
        </div>
      )}

      <div className={`flex gap-3 ${isFor ? "" : "flex-row-reverse"}`}>
        <div className="flex flex-col items-center gap-2 pt-1">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shadow-sm border border-stone-200/50"
            style={{ backgroundColor: llm?.bgLight }}
          >
            <Icon className="w-5 h-5" style={{ color: llm?.color }} />
          </div>
          <div
            className={`w-0.5 flex-1 min-h-[16px] ${
              isFor ? "bg-rust-200/60" : "bg-stone-200/60"
            }`}
          />
        </div>

        <div className={`flex-1 ${isFor ? "pr-2 md:pr-6" : "pl-2 md:pl-6"}`}>
          <div
            className={`flex items-center gap-2 mb-1.5 ${
              isFor ? "" : "justify-end"
            }`}
          >
            <span className="font-serif font-semibold text-sm text-primary">
              {llm?.name}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-medium ${
                isFor
                  ? "bg-rust-100/80 text-rust-700 border border-rust-200/50"
                  : "bg-stone-100/80 text-stone-600 border border-stone-200/50"
              }`}
            >
              {isFor ? (
                <Sword className="w-2.5 h-2.5" />
              ) : (
                <Shield className="w-2.5 h-2.5" />
              )}
              {isFor ? "Pro" : "Con"}
            </span>
          </div>

          <div
            className={`rounded-xl p-4 border shadow-sm ${
              isFor
                ? "bg-gradient-to-br from-rust-50/60 to-rust-100/30 border-rust-200/40"
                : "bg-gradient-to-br from-stone-50/60 to-stone-50/30 border-stone-200/40"
            }`}
          >
            <Quote
              className={`w-4 h-4 mb-1.5 opacity-40 ${
                isFor ? "text-rust-400" : "text-stone-400"
              }`}
            />
            <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DebatePreviewSection({ topicId, topicTitle }: { topicId: string; topicTitle?: string }) {
  const [expanded, setExpanded] = useState(false);
  const hasDebate = hasMockDebate(topicId);

  if (!hasDebate) {
    return (
      <section id="ai-debate" className="bg-transparent rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100/80 rounded-full text-xs font-medium text-stone-600 uppercase tracking-wider border border-stone-200/50 mb-4">
          <Swords className="h-3.5 w-3.5" />
          AI Debate
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-3">
          Watch AIs debate this topic
        </h2>
        <p className="text-sm text-stone-500 mb-5 max-w-lg mx-auto">
          See Claude and GPT-5 go head-to-head with structured arguments across multiple rounds.
        </p>
        <Link
          href={`/?topic=${topicId}&view=debate`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm btn-lift"
        >
          <Swords className="h-4 w-4" />
          Start a debate
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  const messages = getMockDebate(topicId);
  const verdict = getMockVerdict(topicId);
  const forMsg = messages.find((m) => m.side === "for");
  const againstMsg = messages.find((m) => m.side === "against");
  const forLlm = getLLMOption(forMsg?.model ?? "claude");
  const againstLlm = getLLMOption(againstMsg?.model ?? "gpt-4");
  const ForIcon = forLlm?.Icon ?? ClaudeIcon;
  const AgainstIcon = againstLlm?.Icon ?? ClaudeIcon;
  const totalRounds = Math.max(...messages.map((m) => m.round));

  // Show first round only when collapsed
  const visibleMessages = expanded ? messages : messages.filter((m) => m.round === 1);

  return (
    <section id="ai-debate" className="bg-transparent rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100/80 rounded-full text-xs font-medium text-stone-600 uppercase tracking-wider border border-stone-200/50 mb-4">
          <Swords className="h-3.5 w-3.5" />
          AI Debate
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-3">
          Watch AIs debate this topic
        </h2>
        <p className="text-sm text-stone-500 mb-4 max-w-lg mx-auto">
          {totalRounds} rounds of structured argument between two AI models.
        </p>

        {/* Debater badges */}
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="flex items-center gap-2">
            <Sword className="w-3.5 h-3.5 text-rust-600" />
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center border border-stone-200/50"
              style={{ backgroundColor: forLlm?.bgLight }}
            >
              <ForIcon className="w-3.5 h-3.5" style={{ color: forLlm?.color }} />
            </div>
            <span className="font-serif text-sm text-rust-700 font-medium">
              {forLlm?.name}
            </span>
          </div>
          <span className="text-stone-400 font-serif italic text-sm">vs</span>
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm text-stone-600 font-medium">
              {againstLlm?.name}
            </span>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center border border-stone-200/50"
              style={{ backgroundColor: againstLlm?.bgLight }}
            >
              <AgainstIcon className="w-3.5 h-3.5" style={{ color: againstLlm?.color }} />
            </div>
            <Shield className="w-3.5 h-3.5 text-stone-500" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-5">
        {visibleMessages.map((message) => (
          <DebateMessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Expand / Collapse */}
      {totalRounds > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-stone-200 bg-white text-sm font-medium text-stone-600 hover:border-stone-300 hover:bg-stone-50 transition-all"
          >
            {expanded ? (
              <>Show Round 1 only</>
            ) : (
              <>
                Read all {totalRounds} rounds
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Judge Council Verdict */}
      {verdict && (
        <div className="mt-8 pt-6 border-t border-stone-200/60">
          <JudgingResults result={verdict} topicTitle={topicTitle} topicId={topicId} />
        </div>
      )}

      {/* Link to interactive debate */}
      <div className="flex justify-center mt-6">
        <Link
          href={`/?topic=${topicId}&view=debate`}
          className="inline-flex items-center gap-2 text-sm text-deep hover:text-deep-dark transition-colors"
        >
          Start your own debate with different models
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Depth Selector (30s / 2m / 5m format ladder)
// ---------------------------------------------------------------------------

type ReadingDepth = "30s" | "2m" | "5m";

const DEPTH_OPTIONS: { id: ReadingDepth; label: string; description: string; icon: typeof Clock }[] = [
  { id: "30s", label: "30s", description: "Quick scan", icon: Clock },
  { id: "2m", label: "2 min", description: "Key arguments", icon: BookOpen },
  { id: "5m", label: "5 min", description: "Full analysis", icon: Library },
];

function DepthSelector({
  depth,
  onChange,
}: {
  depth: ReadingDepth;
  onChange: (d: ReadingDepth) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-stone-500 tracking-wide mr-1">
        Reading depth
      </span>
      <div className="inline-flex bg-stone-100 rounded-xl p-1 gap-0.5">
        {DEPTH_OPTIONS.map(({ id, label, description, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`relative flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium transition-all duration-200 ${
              depth === id
                ? "bg-deep text-white shadow-sm"
                : "bg-transparent text-stone-500 hover:text-stone-700 hover:bg-white/60"
            }`}
            title={description}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

interface TopicDetailViewProps {
  topic: Topic;
  relatedTopics: Topic[];
  crossCategoryTopics?: Topic[];
}

export default function TopicDetailView({
  topic,
  relatedTopics,
  crossCategoryTopics = [],
}: TopicDetailViewProps) {
  const StatusIcon = statusIcons[topic.status];
  const totalEvidence = topic.pillars.reduce(
    (sum, p) => sum + (p.evidence?.length ?? 0),
    0
  );
  const totalFor = topic.pillars.reduce(
    (sum, p) => sum + (p.evidence ?? []).filter((e) => e.side === "for").length,
    0
  );
  const totalAgainst = topic.pillars.reduce(
    (sum, p) => sum + (p.evidence ?? []).filter((e) => e.side === "against").length,
    0
  );
  const forPct = totalEvidence > 0 ? Math.round((totalFor / totalEvidence) * 100) : 50;

  const [stance, setStance] = useState<"agree" | "unsure" | "disagree" | null>(null);
  const [depth, setDepth] = useState<ReadingDepth>("30s");
  const handleDepthChange = useCallback((d: ReadingDepth) => setDepth(d), []);

  // Track topic view on mount
  useEffect(() => {
    trackEvent({ action: "topic_view", topicId: topic.id, topicTitle: topic.title });
  }, [topic.id, topic.title]);

  return (
    <AppShell>
      <div className="min-h-screen bg-[#f4f1eb] overflow-x-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-stone-500 mb-6">
            <Link href="/" className="text-deep hover:text-deep-dark transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/topics" className="text-deep hover:text-deep-dark transition-colors">
              Topics
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-stone-600 truncate max-w-[260px]">
              {topic.title}
            </span>
          </nav>

          {/* Hero */}
          <AnimateOnScroll variant="fade-up" duration={700}>
          <header className="bg-transparent rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
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

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
              {topic.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-[1.7] max-w-3xl">
              {topic.meta_claim}
            </p>

            {/* Share + Depth Selector */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1">
                <ShareButtons
                  title={`${topic.title} — Argument Analysis`}
                  url={`https://argumend.org/topics/${topic.id}`}
                  description={`${topic.meta_claim} — ${getVerdictLabel(topic.confidence_score)}`}
                />
                <EmbedButton topicId={topic.id} />
                <SaveTopicButton topicId={topic.id} />
                <SubscribeButton topicId={topic.id} />
              </div>
              <DepthSelector depth={depth} onChange={handleDepthChange} />
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-6 pt-5 border-t border-stone-200/60">
              <div className="text-center">
                <span className="block text-lg font-mono font-semibold text-primary tabular-nums">
                  {topic.pillars.length}
                </span>
                <span className="text-xs text-stone-500">Pillars</span>
              </div>
              <div className="text-center">
                <span className="block text-lg font-mono font-semibold text-primary tabular-nums">
                  {totalEvidence}
                </span>
                <span className="text-xs text-stone-500">Evidence Items</span>
              </div>
              <div className="text-center">
                <span className="block text-lg font-mono font-semibold text-primary tabular-nums">
                  {topic.pillars.length}
                </span>
                <span className="text-xs text-stone-500">Crux Questions</span>
              </div>
              {topic.references && (
                <div className="text-center">
                  <span className="block text-lg font-mono font-semibold text-primary tabular-nums">
                    {topic.references.length}
                  </span>
                  <span className="text-xs text-stone-500">References</span>
                </div>
              )}

              {/* Watch Debate button — visible in stats row */}
              {hasMockDebate(topic.id) && (
                <a
                  href="#ai-debate"
                  className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm btn-lift self-center"
                >
                  <Swords className="h-3.5 w-3.5" />
                  Watch Debate
                </a>
              )}
            </div>
          </header>
          </AnimateOnScroll>

          {/* ── Controversy Meter ── */}
          <ControversyMeter
            confidenceScore={topic.confidence_score}
            status={topic.status}
          />

          {/* ── Scan View ── */}
          <AnimateOnScroll variant="fade-up" delay={100}>
          <section className="bg-transparent rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
            {/* Section label */}
            <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-5">
              30-Second Summary
            </p>

            {/* Part A: Verdict Banner */}
            <div className="relative rounded-xl bg-gradient-to-br from-stone-50 via-[#faf8f5] to-stone-100/60 border border-stone-200/50 px-6 py-8 mb-8 text-center overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#4f7b77]/20 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#4f7b77]/20 rounded-br-xl" />

              <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
                <span
                  className={`text-5xl sm:text-6xl font-mono font-bold tabular-nums leading-none ${
                    topic.confidence_score >= 85
                      ? "text-emerald-700"
                      : topic.confidence_score >= 60
                        ? "text-deep"
                        : topic.confidence_score >= 40
                          ? "text-rust-700"
                          : "text-stone-600"
                  }`}
                >
                  {topic.confidence_score}%
                </span>
                <div className="flex flex-col items-center sm:items-start gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[topic.status]}`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {statusLabels[topic.status]}
                  </span>
                  <p className="text-sm text-stone-500 font-medium">
                    {getVerdictLabel(topic.confidence_score)}
                  </p>
                </div>
              </div>
            </div>

            {/* Part B: Pillar Overview Cards */}
            <div className={`grid grid-cols-1 gap-4 mb-8 stagger-children ${
              topic.pillars.length <= 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {topic.pillars.map((pillar, i) => {
                const PillarIcon = ICON_MAP[pillar.icon_name] ?? Shield;
                const cruxVerif = verificationColors[pillar.crux.verification_status] ?? verificationColors.theoretical;
                return (
                  <a
                    key={pillar.id}
                    href="#pillars"
                    className="group relative rounded-lg border border-stone-200/60 bg-gradient-to-br from-white/80 to-stone-50/40 p-4 pl-5 hover:border-deep/30 hover:shadow-md transition-all no-underline card-hover"
                  >
                    {/* Left accent border */}
                    <div className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-[#4f7b77]/30 group-hover:bg-[#4f7b77]/60 transition-colors" />

                    <div className="flex items-start gap-2.5 mb-2.5">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-deep/10 flex items-center justify-center">
                        <PillarIcon className="h-4 w-4 text-deep" strokeWidth={1.5} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono text-deep/50 font-semibold">
                            {i + 1}.
                          </span>
                          <h3 className="font-serif text-[15px] font-semibold text-primary leading-snug group-hover:text-deep transition-colors">
                            {pillar.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-3">
                      {pillar.short_summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center text-[11px] font-medium px-1.5 py-0.5 rounded-full border ${cruxVerif.bg} ${cruxVerif.text}`}
                      >
                        {cruxVerif.label}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-300 group-hover:text-deep group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Part C: Evidence Snapshot */}
            <div className="mb-8">
              <h3 className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-3">
                Evidence Balance
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-rust-700 whitespace-nowrap tabular-nums">
                  {totalFor} for
                </span>
                <div className="flex-1 h-5 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-gradient-to-r from-rust-500 to-rust-600 flex items-center justify-end pr-2.5 animate-bar-fill"
                    style={{ width: `${forPct}%` }}
                  >
                    {forPct >= 20 && (
                      <span className="text-[10px] font-bold text-white/90 tabular-nums">
                        {forPct}%
                      </span>
                    )}
                  </div>
                  <div
                    className="h-full bg-stone-300/60 flex items-center justify-start pl-2.5"
                    style={{ width: `${100 - forPct}%` }}
                  >
                    {(100 - forPct) >= 15 && (
                      <span className="text-[10px] font-bold text-stone-500/80 tabular-nums">
                        {100 - forPct}%
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs font-semibold text-stone-500 whitespace-nowrap tabular-nums">
                  {totalAgainst} against
                </span>
              </div>
            </div>

            {/* Part D: Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-5 border-t border-stone-200/60">
              <a
                href="#pillars"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-deep/30 text-deep text-sm font-medium hover:bg-deep/5 transition-colors"
              >
                Read full analysis
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <Link
                href={`/?topic=${topic.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm btn-lift"
              >
                Explore interactively
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>
          </AnimateOnScroll>

          {/* ── Where Do You Stand? ── (2m+) */}
          {depth !== "30s" && <AnimateOnScroll variant="fade-up" delay={50}><section className="bg-transparent rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8 overflow-hidden">
            {/* Part 1: The Prompt */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-300/50 to-transparent" />
              <span className="text-xs font-medium text-stone-500 uppercase tracking-widest">
                Before you dive in&hellip;
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-300/50 to-transparent" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
              Where do you stand?
            </h2>
            <p className="text-sm text-stone-500 leading-relaxed mb-7">
              Pick your initial position. We&rsquo;ll show you the strongest case
              from the other side.
            </p>

            {/* Part 2: Three Choice Buttons */}
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <button
                type="button"
                onClick={() => setStance("agree")}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg text-[15px] font-medium transition-all ${
                  stance === "agree"
                    ? "bg-rust-600 text-white ring-2 ring-offset-2 ring-rust-500/50 shadow-md scale-[1.02]"
                    : "bg-gradient-to-r from-rust-500 to-rust-600 text-white hover:from-rust-600 hover:to-rust-700 shadow-sm"
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                I agree
              </button>
              <button
                type="button"
                onClick={() => setStance("unsure")}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg text-[15px] font-medium transition-all ${
                  stance === "unsure"
                    ? "bg-stone-100 text-primary ring-2 ring-offset-2 ring-stone-400/50 border border-stone-300 shadow-md scale-[1.02]"
                    : "bg-white text-primary border-2 border-stone-300 hover:bg-stone-50 hover:border-stone-400"
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                I&rsquo;m unsure
              </button>
              <button
                type="button"
                onClick={() => setStance("disagree")}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg text-[15px] font-medium transition-all ${
                  stance === "disagree"
                    ? "bg-deep-dark text-white ring-2 ring-offset-2 ring-deep/50 shadow-md scale-[1.02]"
                    : "bg-deep text-white hover:bg-deep-dark shadow-sm"
                }`}
              >
                <Ban className="h-4 w-4" />
                I disagree
              </button>
            </div>

            {/* Part 3: Steel-Man Reveal */}
            <AnimatePresence mode="wait">
              {stance && (
                <motion.div
                  key={stance}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pt-4 border-t border-stone-200/60">
                    {stance === "agree" && (
                      <>
                        <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-2">
                          The strongest challenge to your position:
                        </p>
                        <blockquote className="border-l-2 border-deep pl-4 mb-3">
                          <p className="text-sm text-stone-700 leading-relaxed italic">
                            &ldquo;{topic.pillars[0]?.skeptic_premise}&rdquo;
                          </p>
                        </blockquote>
                        <p className="text-sm text-stone-500">
                          Ready to see how it holds up?
                        </p>
                      </>
                    )}

                    {stance === "disagree" && (
                      <>
                        <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-2">
                          The strongest defense of the claim:
                        </p>
                        <blockquote className="border-l-2 border-rust-500 pl-4 mb-3">
                          <p className="text-sm text-stone-700 leading-relaxed italic">
                            &ldquo;{topic.pillars[0]?.proponent_rebuttal}&rdquo;
                          </p>
                        </blockquote>
                        <p className="text-sm text-stone-500">
                          Can it withstand scrutiny?
                        </p>
                      </>
                    )}

                    {stance === "unsure" && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-2">
                            Against
                          </p>
                          <blockquote className="border-l-2 border-deep pl-4">
                            <p className="text-sm text-stone-700 leading-relaxed italic">
                              &ldquo;{topic.pillars[0]?.skeptic_premise}&rdquo;
                            </p>
                          </blockquote>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-rust-600 uppercase tracking-widest mb-2">
                            For
                          </p>
                          <blockquote className="border-l-2 border-rust-500 pl-4">
                            <p className="text-sm text-stone-700 leading-relaxed italic">
                              &ldquo;{topic.pillars[0]?.proponent_rebuttal}&rdquo;
                            </p>
                          </blockquote>
                        </div>
                      </div>
                    )}

                    {/* Part 4: Post-reveal CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 mt-5">
                      <a
                        href="#pillars"
                        className="text-sm text-deep hover:underline"
                      >
                        Explore the full analysis below &darr;
                      </a>
                      <Link
                        href={`/?topic=${topic.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm btn-lift"
                      >
                        Dive into the interactive map
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section></AnimateOnScroll>}

          {/* Meta Claim Expanded (2m+) */}
          {depth !== "30s" && (
            <AnimateOnScroll variant="fade-up" delay={50}>
            <section className="bg-transparent rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
                The Claim
              </h2>
              <blockquote className="border-l-2 border-[#4f7b77] pl-4 sm:pl-5">
                <p className="text-base sm:text-lg text-stone-700 leading-[1.7] italic">
                  &ldquo;{topic.meta_claim}&rdquo;
                </p>
              </blockquote>
              <p className="text-sm text-stone-500 mt-4 leading-relaxed">
                This topic is currently classified as{" "}
                <strong className="text-primary">
                  {statusLabels[topic.status].toLowerCase()}
                </strong>{" "}
                with a computed confidence score of{" "}
                <strong className="text-primary">{topic.confidence_score}%</strong>,
                based on {totalEvidence} weighted evidence items across{" "}
                {topic.pillars.length} analytical pillars.
              </p>
            </section>
            </AnimateOnScroll>
          )}

          {/* Pillars (2m+) */}
          {depth !== "30s" && (
            <AnimateOnScroll variant="fade-up" delay={50}>
            <section id="pillars" className="bg-transparent rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
                Argument Pillars
              </h2>

              {depth === "2m" ? (
                <>
                  <p className="text-sm text-stone-500 mb-6 leading-relaxed">
                    Key arguments for and against, with the crux question for each pillar.
                  </p>
                  <div className="space-y-6">
                    {topic.pillars.map((pillar, i) => (
                      <div key={pillar.id} className="mb-4">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-deep/10 flex items-center justify-center text-sm font-mono font-semibold text-deep">
                            {i + 1}
                          </span>
                          <div>
                            <h3 className="font-serif text-lg text-primary leading-tight">
                              {pillar.title}
                            </h3>
                            <p className="text-sm text-stone-500 mt-0.5">
                              {pillar.short_summary}
                            </p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 mb-3 pl-10">
                          <blockquote className="border-l-2 border-red-300 pl-3 py-1">
                            <p className="text-xs font-medium text-red-500 uppercase tracking-widest mb-1">Skeptic</p>
                            <p className="text-sm text-stone-600 italic leading-relaxed">
                              &ldquo;{pillar.skeptic_premise}&rdquo;
                            </p>
                          </blockquote>
                          <blockquote className="border-l-2 border-emerald-300 pl-3 py-1">
                            <p className="text-xs font-medium text-emerald-600 uppercase tracking-widest mb-1">Proponent</p>
                            <p className="text-sm text-stone-600 leading-relaxed">
                              {pillar.proponent_rebuttal}
                            </p>
                          </blockquote>
                        </div>
                        <div className="pl-10">
                          <p className="text-xs text-deep font-medium">
                            Crux: {pillar.crux.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-200/60 text-center">
                    <button
                      onClick={() => setDepth("5m")}
                      className="inline-flex items-center gap-2 text-sm text-deep hover:text-deep-dark font-medium transition-colors"
                    >
                      <Library className="h-3.5 w-3.5" />
                      Read full analysis with evidence &amp; methodology
                    </button>
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </section>
            </AnimateOnScroll>
          )}

          {/* References (5m only) */}
          {depth === "5m" && topic.references && topic.references.length > 0 && (
            <AnimateOnScroll variant="fade-up" delay={50}>
            <section className="bg-transparent rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
                References
              </h2>
              <ul className="space-y-2">
                {topic.references.map((ref, i) => (
                  <li key={i}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-deep hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                      {ref.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            </AnimateOnScroll>
          )}

          {/* CTA */}
          <AnimateOnScroll variant="fade-up" delay={50}>
          <section className="bg-transparent rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
              Explore interactively
            </h2>
            <p className="text-sm text-stone-500 mb-5">
              Dive into the visual argument map with interactive scales, logic
              trees, and crux identification.
            </p>
            <Link
              href={`/?topic=${topic.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm btn-lift"
            >
              Explore this topic interactively
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
          </AnimateOnScroll>

          {/* Confidence Timeline — only for topics with historical data */}
          {hasTimeline(topic.id) && (() => {
            const timelineEvents = getTimeline(topic.id);
            if (!timelineEvents) return null;
            return (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-transparent rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8"
              >
                <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-2">
                  Historical Context
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-2">
                  How Confidence Has Evolved
                </h2>
                <p className="text-sm text-stone-500 mb-6 leading-relaxed max-w-2xl">
                  How public and expert confidence in this claim has shifted over time,
                  driven by key events and discoveries.
                </p>
                <ConfidenceTimeline events={timelineEvents} topicTitle={topic.title} />
              </motion.section>
            );
          })()}

          {/* Debate Highlight teaser — only when mock data exists */}
          {hasMockDebate(topic.id) && (
            <DebateHighlight topicId={topic.id} />
          )}

          {/* AI Debate */}
          <DebatePreviewSection topicId={topic.id} topicTitle={topic.title} />

          {/* FAQ Section */}
          {topic.questions && topic.questions.length > 0 && (
            <AnimateOnScroll variant="fade-up" delay={100}>
            <section className="bg-transparent rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-stone-500 mb-6 leading-relaxed">
                Common questions about this topic, answered with evidence-based reasoning.
              </p>
              <div className="space-y-3">
                {topic.questions.map((q) => (
                  <details
                    key={q.id}
                    className="group rounded-lg border border-stone-200/60 bg-[#faf8f5] overflow-hidden transition-colors hover:border-deep/20"
                  >
                    <summary className="flex items-center gap-3 cursor-pointer px-5 py-4 text-sm font-medium text-primary select-none list-none [&::-webkit-details-marker]:hidden">
                      <ChevronRight className="h-4 w-4 text-stone-400 group-open:rotate-90 transition-transform duration-200 flex-shrink-0" />
                      <span className="font-serif text-base leading-snug">{q.title}</span>
                    </summary>
                    <div className="px-5 pb-5 pl-12">
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {q.content}
                      </p>
                      {q.references && q.references.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {q.references.map((ref, i) => (
                            <a
                              key={i}
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-deep hover:text-deep-dark transition-colors"
                            >
                              <ExternalLink className="h-3 w-3" />
                              {ref.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>
            </AnimateOnScroll>
          )}

          {/* Related Topics */}
          {relatedTopics.length > 0 && (
            <AnimateOnScroll variant="fade-up" delay={100}>
            <section className="mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
                Related Topics
              </h2>
              <p className="text-sm text-stone-500 mb-5">
                More from the{" "}
                <span className="capitalize font-medium text-stone-600">
                  {CATEGORY_LABELS[topic.category]}
                </span>{" "}
                category.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-children">
                {relatedTopics.map((rt) => (
                  <RelatedTopicCard key={rt.id} topic={rt} />
                ))}
              </div>
            </section>
            </AnimateOnScroll>
          )}

          {/* Cross-Category Related Topics */}
          {crossCategoryTopics.length > 0 && (
            <AnimateOnScroll variant="fade-up" delay={100}>
            <section className="mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
                You might also find relevant
              </h2>
              <p className="text-sm text-stone-500 mb-5">
                Related debates from other categories that share underlying themes with this topic.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-children">
                {crossCategoryTopics.map((rt) => (
                  <RelatedTopicCard key={rt.id} topic={rt} />
                ))}
              </div>
            </section>
            </AnimateOnScroll>
          )}

          {/* Methodology & Educator Callouts */}
          <section className="mb-8 space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-stone-200/60 bg-stone-50/50 px-5 py-4">
              <Scale className="h-4 w-4 text-deep mt-0.5 flex-shrink-0" />
              <p className="text-sm text-stone-500 leading-relaxed">
                <span className="font-medium text-stone-600">How we analyze:</span>{" "}
                Our{" "}
                <Link href="/methodology" className="text-deep link-underline">
                  methodology
                </Link>{" "}
                explains how arguments are structured and evidence is weighted.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-stone-200/60 bg-stone-50/50 px-5 py-4">
              <GraduationCap className="h-4 w-4 text-deep mt-0.5 flex-shrink-0" />
              <p className="text-sm text-stone-500 leading-relaxed">
                <span className="font-medium text-stone-600">Teaching this topic?</span>{" "}
                See our{" "}
                <Link href="/for-educators" className="text-deep link-underline">
                  resources for educators
                </Link>.
              </p>
            </div>
          </section>

          {/* Share CTA */}
          <div className="mt-12 p-6 rounded-xl bg-[#faf8f5] border border-stone-200/60 text-center mb-8">
            <h3 className="font-serif text-lg text-primary mb-2">Found this analysis useful?</h3>
            <p className="text-secondary text-sm mb-4">Share it with someone who might see things differently.</p>
            <div className="flex items-center justify-center gap-3">
              <ShareButtons
                title={`${topic.title} — Argument Analysis | Argumend`}
                url={`https://argumend.org/topics/${topic.id}`}
                description={topic.meta_claim}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-stone-200/60">
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
