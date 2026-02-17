"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ChevronDown,
  ChevronRight,
  Brain,
  MessageSquare,
  AlertTriangle,
  Target,
  Sparkles,
  Clock,
  ArrowRight,
  Shield,
  ShieldCheck,
  Info,
  ExternalLink,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ShareButtons } from "@/components/ShareButtons";
import { ConfidenceGauge } from "@/components/ConfidenceGauge";
import { JudgingResults } from "@/components/JudgingResults";
import { topics } from "@/data/topics";
import type { Topic } from "@/lib/schemas/topic";
import type { JudgingResult } from "@/lib/judge/rubric";
import type {
  ExtractedArguments,
  ExtractedPosition,
  IdentifiedCrux,
  PotentialFallacy,
  DetectedBias,
} from "@/lib/analyze/extractor";
import {
  getArgumentStrength,
  getConfidenceInfo,
} from "@/lib/analyze/extractor";

// ---------- Helpers ----------

/**
 * Find related topics by simple keyword matching on the analysis topic string.
 */
function findRelatedTopics(analysisTopic: string, count: number = 4): Topic[] {
  const stopWords = new Set([
    "the", "a", "an", "is", "are", "was", "were", "of", "in", "on", "for",
    "to", "and", "or", "but", "with", "by", "at", "from", "as", "it", "its",
    "this", "that", "be", "has", "have", "had", "do", "does", "did", "will",
    "would", "should", "can", "could", "not", "no", "so", "if", "about",
  ]);

  const tokens = analysisTopic
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !stopWords.has(t));

  const scored = topics.map((topic) => {
    const haystack = `${topic.title} ${topic.meta_claim}`.toLowerCase();
    let score = 0;
    for (const token of tokens) {
      if (haystack.includes(token)) score++;
    }
    return { topic, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const matched = scored.filter((s) => s.score > 0).slice(0, count);
  if (matched.length < count) {
    const usedIds = new Set(matched.map((m) => m.topic.id));
    for (const s of scored) {
      if (matched.length >= count) break;
      if (!usedIds.has(s.topic.id)) {
        matched.push(s);
        usedIds.add(s.topic.id);
      }
    }
  }

  return matched.slice(0, count).map((m) => m.topic);
}

/** Compute aggregate strength for a position (average of argument scores) */
function computePositionStrength(position: ExtractedPosition): number | null {
  const scores = position.arguments
    .map((a) => a.strengthScore)
    .filter((s): s is number => s != null);
  if (scores.length === 0) return null;
  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}

// ---------- Section Divider ----------

function SectionDivider({ label, icon: Icon }: { label: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <div className="flex items-center gap-2 flex-shrink-0">
        <Icon className="h-4 w-4 text-deep" />
        <h3 className="font-serif text-lg font-semibold text-primary">{label}</h3>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-stone-200/80 to-transparent" />
    </div>
  );
}

// ---------- Sub-components ----------

function StrengthBadge({ score }: { score: number }) {
  const strength = getArgumentStrength(score);
  const styles = {
    strong: "bg-emerald-100 text-emerald-700 border-emerald-200",
    moderate: "bg-deep/10 text-deep border-deep/20",
    weak: "bg-stone-100 text-stone-500 border-stone-200",
    unsupported: "bg-red-50 text-red-500 border-red-100",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${styles[strength]}`}>
      <span className="tabular-nums">{score}/10</span>
      <span className="hidden sm:inline">{strength}</span>
    </span>
  );
}

/** Visual bar showing aggregate strength of a position's arguments */
function PositionStrengthBar({ score, side }: { score: number; side: "for" | "against" }) {
  const pct = (score / 10) * 100;
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1.5 rounded-full bg-stone-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className={`h-full rounded-full ${side === "for" ? "bg-rust-400" : "bg-stone-400"}`}
        />
      </div>
      <span className={`text-[10px] font-mono font-semibold tabular-nums ${side === "for" ? "text-rust-600" : "text-stone-500"}`}>
        {score.toFixed(1)}
      </span>
    </div>
  );
}

/** Split bar showing For vs Against strength side by side */
function SplitStrengthBar({ forScore, againstScore }: { forScore: number; againstScore: number }) {
  const total = forScore + againstScore;
  const forPct = total > 0 ? (forScore / total) * 100 : 50;
  const againstPct = total > 0 ? (againstScore / total) * 100 : 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="surface-card p-5 md:p-6"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rust-500" />
          <span className="text-sm font-semibold text-rust-700">For</span>
          <span className="text-lg font-mono font-bold text-rust-600">{forScore}/10</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-mono font-bold text-stone-600">{againstScore}/10</span>
          <span className="text-sm font-semibold text-stone-600">Against</span>
          <div className="w-3 h-3 rounded-full bg-stone-500" />
        </div>
      </div>

      {/* The split bar */}
      <div className="h-3 rounded-full overflow-hidden bg-stone-100 flex">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${forPct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-rust-400 to-rust-500 rounded-l-full"
        />
        <div className="w-px bg-white" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${againstPct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-l from-stone-400 to-stone-500 rounded-r-full"
        />
      </div>

      {/* Percentage labels */}
      <div className="flex justify-between mt-2">
        <span className="text-[10px] font-medium text-rust-500">
          {Math.round(forPct)}%
          {forScore >= 7 ? " — Strong" : forScore >= 4 ? " — Moderate" : " — Weak"}
        </span>
        <span className="text-[10px] font-medium text-stone-500">
          {againstScore >= 7 ? "Strong — " : againstScore >= 4 ? "Moderate — " : "Weak — "}
          {Math.round(againstPct)}%
        </span>
      </div>
    </motion.div>
  );
}

function ConfidenceExplainer({ score }: { score: number }) {
  const info = getConfidenceInfo(score);
  const colorMap = {
    "very-high": "border-emerald-200 bg-emerald-50 text-emerald-800",
    "high": "border-emerald-200/60 bg-emerald-50/50 text-emerald-700",
    "moderate": "border-stone-200 bg-stone-50 text-stone-700",
    "low": "border-red-200/60 bg-red-50/50 text-red-700",
    "very-low": "border-red-200 bg-red-50 text-red-800",
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs ${colorMap[info.level]}`}>
      <span className="font-semibold">{info.label}</span>
      <span className="hidden sm:inline opacity-75">-- {info.description}</span>
    </div>
  );
}

function BiasCard({ bias }: { bias: DetectedBias }) {
  const impactColor = bias.impact >= 7 ? "text-red-600 bg-red-50 border-red-200" : bias.impact >= 4 ? "text-stone-600 bg-stone-50 border-stone-200" : "text-stone-500 bg-stone-50/50 border-stone-100";
  const sideLabel = bias.affectedSide === "for" ? "FOR side" : bias.affectedSide === "against" ? "AGAINST side" : "Both sides";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-5 bg-rust-50/40 border border-rust-200/50 rounded-xl"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-rust-100/80 flex items-center justify-center mt-0.5">
          <Brain className="h-4 w-4 text-rust-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-800 font-medium">{bias.type}</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${impactColor}`}>
              Impact: {bias.impact}/10
            </span>
            <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
              {sideLabel}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-stone-600 leading-relaxed">{bias.explanation}</p>
        </div>
      </div>
    </motion.div>
  );
}

function PositionCard({ position }: { position: ExtractedPosition }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFor = position.side === "for";
  const aggregateStrength = computePositionStrength(position);

  const cardStyles = isFor
    ? "border-l-rust-500 bg-gradient-to-r from-rust-50/40 to-white"
    : "border-l-stone-500 bg-gradient-to-r from-stone-50/40 to-white";

  return (
    <motion.div
      initial={{ opacity: 0, x: isFor ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`rounded-xl border border-stone-200/80 border-l-[4px] ${cardStyles} overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 md:p-5 text-left hover:bg-white/40 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                isFor
                  ? "bg-rust-100 text-rust-700"
                  : "bg-stone-100 text-stone-600"
              }`}
            >
              {isFor ? "FOR" : "AGAINST"}
            </div>
            {position.speaker && (
              <span className="text-sm text-stone-600 font-medium">
                {position.speaker}
              </span>
            )}
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isFor ? "bg-rust-50 text-rust-500" : "bg-stone-50 text-stone-400"}`}>
              {position.arguments.length} argument
              {position.arguments.length !== 1 ? "s" : ""}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className={`h-5 w-5 ${isFor ? "text-rust-400" : "text-stone-400"}`} />
          </motion.div>
        </div>

        {/* Aggregate strength bar */}
        {aggregateStrength != null && (
          <PositionStrengthBar score={aggregateStrength} side={position.side} />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-stone-100">
              <div className="pt-4 space-y-5">
                {position.arguments.map((arg, idx) => {
                  const borderAccent = isFor ? "border-rust-200" : "border-stone-300";
                  return (
                    <div key={idx} className={`pl-4 border-l-2 ${borderAccent}`}>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-stone-800 font-medium leading-snug">{arg.claim}</p>
                        {arg.strengthScore != null && (
                          <StrengthBadge score={arg.strengthScore} />
                        )}
                      </div>
                      {arg.strengthRationale && (
                        <p className="mt-1.5 text-xs text-deep italic leading-relaxed">
                          {arg.strengthRationale}
                        </p>
                      )}
                      {arg.evidence && arg.evidence.length > 0 && (
                        <div className="mt-3 space-y-1.5">
                          <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                            Evidence
                          </span>
                          <ul className="space-y-1.5">
                            {arg.evidence.map((e, i) => (
                              <li key={i} className={`text-sm text-stone-600 leading-relaxed pl-3 border-l-2 ${isFor ? "border-rust-100" : "border-stone-200/60"}`}>
                                {e}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {arg.source && (
                        <p className="mt-2 text-xs text-stone-500 flex items-center gap-1.5 bg-stone-50/80 rounded-md px-2.5 py-1.5 w-fit">
                          <ExternalLink className="h-3 w-3 text-deep flex-shrink-0" />
                          <span className="text-deep font-medium">{arg.source}</span>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CruxCard({ crux, index }: { crux: IdentifiedCrux; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="p-4 md:p-5 bg-gradient-to-br from-deep/[0.06] to-deep/[0.02] border border-deep/15 rounded-xl"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-deep/10 border border-deep/15 flex items-center justify-center mt-0.5">
          <Target className="h-4.5 w-4.5 text-deep" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-stone-800 font-medium leading-snug">{crux.description}</p>
          <div className="mt-2 flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-deep/40 mt-2 flex-shrink-0" />
            <p className="text-sm text-stone-600 leading-relaxed italic">{crux.significance}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FallacyCard({ fallacy }: { fallacy: PotentialFallacy }) {
  const severity = fallacy.severity ?? "possible";

  const severityStyles = {
    confirmed: "bg-red-100 text-red-700 border-red-200",
    likely: "bg-rust-100 text-rust-700 border-rust-200",
    possible: "bg-stone-100 text-stone-500 border-stone-200",
  };

  const cardStyles = {
    confirmed: "bg-red-50/60 border-red-200/60",
    likely: "bg-rust-50/40 border-rust-200/50",
    possible: "bg-stone-50/50 border-stone-200/60",
  };

  const SeverityIcon = severity === "confirmed" ? AlertTriangle : severity === "likely" ? AlertTriangle : Info;
  const iconColor = severity === "confirmed" ? "text-red-600" : severity === "likely" ? "text-rust-600" : "text-stone-400";
  const iconBg = severity === "confirmed" ? "bg-red-100" : severity === "likely" ? "bg-rust-100/80" : "bg-stone-100";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 md:p-5 ${cardStyles[severity]} border rounded-xl`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center mt-0.5`}>
          <SeverityIcon className={`h-4 w-4 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-800 font-medium">{fallacy.type}</span>
            <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${severityStyles[severity]}`}>
              {severity}
            </span>
            {fallacy.impact != null && (
              <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200/60">
                Impact: {fallacy.impact}/10
              </span>
            )}
            {fallacy.attributedTo && (
              <span className="text-[10px] bg-rust-50 text-rust-600 px-2 py-0.5 rounded-full border border-rust-100">
                {fallacy.attributedTo}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-stone-600 leading-relaxed">{fallacy.explanation}</p>
          {fallacy.quote && (
            <p className="mt-2.5 text-sm text-stone-500 italic border-l-2 border-stone-300 pl-3 bg-white/60 py-1.5 rounded-r-md">
              &ldquo;{fallacy.quote}&rdquo;
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}


function ConfidenceBadge({ score }: { score: number }) {
  let color: string;
  if (score >= 80) {
    color = "bg-emerald-100 text-emerald-700";
  } else if (score >= 50) {
    color = "bg-stone-100 text-stone-600";
  } else {
    color = "bg-red-100 text-red-700";
  }

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {score}% confidence
    </span>
  );
}

function RelatedTopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={`/topics/${topic.id}`}
      className="group block bg-white border border-stone-200/80 rounded-xl p-4 hover:border-deep/40 hover:shadow-md transition-all"
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-serif font-semibold text-primary text-sm group-hover:text-deep transition-colors leading-snug">
            {topic.title}
          </h4>
          <ArrowRight className="h-4 w-4 text-stone-300 group-hover:text-deep transition-colors flex-shrink-0 mt-0.5" />
        </div>
        <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
          {topic.meta_claim}
        </p>
        <ConfidenceBadge score={topic.confidence_score} />
      </div>
    </Link>
  );
}

/** Positive empty-state for no fallacies/biases */
function EmptyPositiveState({ label, icon: Icon }: { label: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-emerald-50/50 border border-emerald-200/40 rounded-xl">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100/80 flex items-center justify-center">
        <Icon className="h-4 w-4 text-emerald-600" />
      </div>
      <p className="text-sm text-emerald-700 font-medium">{label}</p>
    </div>
  );
}

// ---------- Main View Component ----------

interface AnalysisViewProps {
  id: string;
  extracted: ExtractedArguments;
  judgingResult: JudgingResult | null;
  createdAt: string;
}

export function AnalysisView({
  id,
  extracted,
  judgingResult,
  createdAt,
}: AnalysisViewProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(createdAt).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const relatedTopics = useMemo(
    () => findRelatedTopics(extracted.topic, 4),
    [extracted.topic],
  );

  const hasFallacies = extracted.potentialFallacies.length > 0;
  const hasBiases = extracted.detectedBiases && extracted.detectedBiases.length > 0;

  return (
    <AppShell>
      <div className="min-h-full">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-secondary">
            <Link
              href="/analyze"
              className="hover:text-deep transition-colors"
            >
              Analyses
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
            <span className="text-primary font-medium truncate max-w-[280px] sm:max-w-none">
              {extracted.topic}
            </span>
          </nav>

          {/* ── Header / Report Card ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl border border-stone-200/70 bg-gradient-to-br from-white via-[#fdfbf8] to-deep/[0.04] shadow-card"
          >
            {/* Subtle decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-rust-500/[0.03] via-transparent to-deep/[0.03] pointer-events-none" />

            <div className="relative p-6 md:p-8">
              {/* Tag + Date row */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-deep/10 border border-deep/20 rounded-full text-xs font-medium text-deep tracking-wide">
                  <Brain className="h-3 w-3" />
                  Analysis Report
                </div>
                <span className="flex items-center gap-1.5 text-xs text-stone-400">
                  <Clock className="h-3 w-3" />
                  Generated {formattedDate} at {formattedTime}
                </span>
              </div>

              {/* Title + Summary + Gauge */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="flex-1 min-w-0 space-y-3">
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
                    {extracted.topic}
                  </h1>
                  <p className="text-secondary text-sm leading-relaxed max-w-xl">
                    {extracted.summary}
                  </p>
                  <div className="pt-1">
                    <ConfidenceExplainer score={extracted.confidence} />
                  </div>
                </div>

                {/* Circular confidence gauge */}
                <div className="flex-shrink-0 self-center md:self-start">
                  <ConfidenceGauge score={Math.round(extracted.confidence * 100)} size={110} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Strength Overview (Split Bar) ── */}
          {(extracted.forStrength != null && extracted.againstStrength != null) && (
            <SplitStrengthBar
              forScore={extracted.forStrength}
              againstScore={extracted.againstStrength}
            />
          )}

          {/* Social Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center"
          >
            <ShareButtons
              title={extracted.topic}
              url={typeof window !== "undefined" ? `${window.location.origin}/analysis/${id}` : `https://argumend.org/analysis/${id}`}
              description={extracted.summary}
            />
          </motion.div>

          {/* ── Positions ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-4"
          >
            <SectionDivider label="Extracted Positions" icon={FileText} />
            {extracted.positions.length > 0 ? (
              <div className="space-y-3">
                {extracted.positions.map((pos, idx) => (
                  <PositionCard key={idx} position={pos} />
                ))}
              </div>
            ) : (
              <p className="text-secondary text-center py-4">
                No clear positions identified
              </p>
            )}
          </motion.div>

          {/* ── Key Cruxes ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <SectionDivider label="Key Cruxes" icon={Target} />
            {extracted.identifiedCruxes.length > 0 ? (
              <div className="space-y-3">
                {extracted.identifiedCruxes.map((crux, idx) => (
                  <CruxCard key={idx} crux={crux} index={idx} />
                ))}
              </div>
            ) : (
              <p className="text-secondary text-sm text-center py-3 italic">
                No key cruxes identified in this content
              </p>
            )}
          </motion.div>

          {/* ── Fallacies ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-4"
          >
            <SectionDivider label="Detected Fallacies" icon={AlertTriangle} />
            {hasFallacies ? (
              <div className="space-y-3">
                {extracted.potentialFallacies.map((fallacy, idx) => (
                  <FallacyCard key={idx} fallacy={fallacy} />
                ))}
              </div>
            ) : (
              <EmptyPositiveState
                label="No logical fallacies detected in this analysis"
                icon={ShieldCheck}
              />
            )}
          </motion.div>

          {/* ── Detected Biases ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="space-y-4"
          >
            <SectionDivider label="Detected Biases" icon={Brain} />
            {hasBiases ? (
              <div className="space-y-3">
                {extracted.detectedBiases!.map((bias, idx) => (
                  <BiasCard key={idx} bias={bias} />
                ))}
              </div>
            ) : (
              <EmptyPositiveState
                label="No significant biases detected in this analysis"
                icon={Shield}
              />
            )}
          </motion.div>

          {/* ── Judging Results ── */}
          {judgingResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-2"
            >
              <JudgingResults result={judgingResult} />
            </motion.div>
          )}

          {/* ── Related Topics ── */}
          {relatedTopics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <SectionDivider label="Related Topics" icon={MessageSquare} />
                <Link
                  href="/topics"
                  className="text-sm text-deep hover:underline flex-shrink-0 ml-4"
                >
                  View all topics
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedTopics.map((topic) => (
                  <RelatedTopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-4"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-[#fefcf9] to-deep/[0.03] border border-stone-200/60 rounded-2xl p-6 md:p-8 text-center space-y-4">
              <div className="absolute inset-0 bg-gradient-to-r from-rust-500/[0.02] via-transparent to-deep/[0.02] pointer-events-none" />
              <div className="relative">
                <h3 className="font-serif text-xl font-bold text-primary">
                  Have your own text to analyze?
                </h3>
                <p className="text-secondary text-sm max-w-md mx-auto mt-2">
                  Paste a debate, article, or discussion and get AI-powered
                  argument extraction, fallacy detection, and multi-model judging.
                </p>
                <Link
                  href="/analyze"
                  className="inline-flex items-center gap-2 px-6 py-3 mt-4 bg-gradient-to-r from-rust-500 to-rust-600 text-white rounded-xl text-sm font-semibold font-serif shadow-md hover:shadow-lg hover:from-rust-600 hover:to-rust-700 transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  Run Another Analysis
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
}
