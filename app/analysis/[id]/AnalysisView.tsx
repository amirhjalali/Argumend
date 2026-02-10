"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  ChevronDown,
  ChevronRight,
  Brain,
  MessageSquare,
  AlertTriangle,
  Target,
  Share2,
  Check,
  Sparkles,
  Clock,
  Link2,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { JudgingResults } from "@/components/JudgingResults";
import { topics } from "@/data/topics";
import type { Topic } from "@/lib/schemas/topic";
import type { JudgingResult } from "@/lib/judge/rubric";
import type {
  ExtractedArguments,
  ExtractedPosition,
  IdentifiedCrux,
  PotentialFallacy,
} from "@/lib/analyze/extractor";

// ---------- Helpers ----------

/**
 * Find related topics by simple keyword matching on the analysis topic string.
 * Tokenizes the analysis topic, then scores each curated topic by how many
 * tokens appear in its title or meta_claim. Returns the top N matches,
 * falling back to a deterministic slice if nothing matches.
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

  // Take top matches with score > 0; if fewer than count, pad with next topics
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

// ---------- Sub-components ----------

function PositionCard({ position }: { position: ExtractedPosition }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFor = position.side === "for";

  const cardStyles = isFor
    ? "border-l-amber-500 bg-gradient-to-r from-amber-50/50 to-white"
    : "border-l-stone-500 bg-gradient-to-r from-stone-50/50 to-white";

  return (
    <motion.div
      initial={{ opacity: 0, x: isFor ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`rounded-xl border border-stone-200/80 border-l-4 ${cardStyles} overflow-hidden shadow-sm`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 md:p-4 text-left hover:bg-white/50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isFor
                  ? "bg-amber-100 text-amber-700"
                  : "bg-stone-100 text-stone-600"
              }`}
            >
              {isFor ? "FOR" : "AGAINST"}
            </div>
            {position.speaker && (
              <span className="text-sm text-stone-600">
                {position.speaker}
              </span>
            )}
            <span className="text-sm text-stone-400">
              {position.arguments.length} argument
              {position.arguments.length !== 1 ? "s" : ""}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-stone-400" />
          </motion.div>
        </div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-3 md:px-4 pb-3 md:pb-4 border-t border-stone-100"
        >
          <div className="pt-4 space-y-4">
            {position.arguments.map((arg, idx) => (
              <div key={idx} className="pl-4 border-l-2 border-stone-200">
                <p className="text-stone-700 font-medium">{arg.claim}</p>
                {arg.evidence && arg.evidence.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <span className="text-xs text-stone-500 uppercase tracking-wide">
                      Evidence:
                    </span>
                    <ul className="list-disc list-inside text-sm text-stone-600 space-y-1">
                      {arg.evidence.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {arg.source && (
                  <p className="mt-1 text-xs text-stone-500">
                    Source: {arg.source}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function CruxCard({ crux }: { crux: IdentifiedCrux }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 md:p-4 bg-purple-50/50 border border-purple-200/60 rounded-xl"
    >
      <div className="flex items-start gap-3">
        <Target className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-stone-800 font-medium">{crux.description}</p>
          <p className="mt-1 text-sm text-stone-600">{crux.significance}</p>
        </div>
      </div>
    </motion.div>
  );
}

function FallacyCard({ fallacy }: { fallacy: PotentialFallacy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 md:p-4 bg-yellow-50/50 border border-yellow-200/60 rounded-xl"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-stone-800 font-medium">{fallacy.type}</span>
            {fallacy.attributedTo && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                {fallacy.attributedTo}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-stone-600">{fallacy.explanation}</p>
          {fallacy.quote && (
            <p className="mt-2 text-sm text-stone-500 italic border-l-2 border-yellow-300 pl-3">
              &ldquo;{fallacy.quote}&rdquo;
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SocialShareButtons({ id, topic }: { id: string; topic: string }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () =>
    typeof window !== "undefined"
      ? `${window.location.origin}/analysis/${id}`
      : `https://argumend.com/analysis/${id}`;

  const handleCopy = async () => {
    const url = getUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const twitterUrl = () => {
    const url = getUrl();
    const text = `Check out this argument analysis on "${topic}" via @argumend`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  };

  const linkedInUrl = () => {
    const url = getUrl();
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  };

  const btnBase =
    "inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200/80 rounded-lg text-sm font-medium text-[#3d3a36] hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {/* Twitter / X */}
      <a
        href={twitterUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={btnBase}
        aria-label="Share on Twitter"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="hidden sm:inline">Twitter</span>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedInUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={btnBase}
        aria-label="Share on LinkedIn"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        <span className="hidden sm:inline">LinkedIn</span>
      </a>

      {/* Copy Link */}
      <button onClick={handleCopy} className={btnBase} aria-label="Copy link">
        {copied ? (
          <>
            <Check className="h-4 w-4 text-[#4f7b77]" />
            <span className="text-[#4f7b77]">Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4" />
            <span className="hidden sm:inline">Copy Link</span>
          </>
        )}
      </button>
    </div>
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
      className="group block bg-white border border-stone-200/80 rounded-xl p-4 hover:border-[#4f7b77]/40 hover:shadow-md transition-all"
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-serif font-semibold text-[#3d3a36] text-sm group-hover:text-[#4f7b77] transition-colors leading-snug">
            {topic.title}
          </h4>
          <ArrowRight className="h-4 w-4 text-stone-300 group-hover:text-[#4f7b77] transition-colors flex-shrink-0 mt-0.5" />
        </div>
        <p className="text-xs text-[#6d645c] line-clamp-2 leading-relaxed">
          {topic.meta_claim}
        </p>
        <ConfidenceBadge score={topic.confidence_score} />
      </div>
    </Link>
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

  const relatedTopics = useMemo(
    () => findRelatedTopics(extracted.topic, 4),
    [extracted.topic],
  );

  return (
    <AppShell>
      <div className="bg-[#faf8f5] min-h-full">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-[#6d645c]">
            <Link
              href="/analyze"
              className="hover:text-[#4f7b77] transition-colors"
            >
              Analyses
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
            <span className="text-[#3d3a36] font-medium truncate max-w-[280px] sm:max-w-none">
              {extracted.topic}
            </span>
          </nav>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4f7b77]/10 border border-[#4f7b77]/20 rounded-full text-xs font-medium text-[#4f7b77] tracking-wide">
              <Brain className="h-3 w-3" />
              Shared Analysis
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1f1f1d]">
              {extracted.topic}
            </h1>
            <p className="text-[#6d645c] text-sm max-w-xl mx-auto">
              {extracted.summary}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formattedDate}
              </span>
              <span>
                Confidence: {Math.round(extracted.confidence * 100)}%
              </span>
            </div>
          </motion.div>

          {/* Social Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SocialShareButtons id={id} topic={extracted.topic} />
          </motion.div>

          {/* Positions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-4"
          >
            <h3 className="font-serif font-semibold text-[#1f1f1d] flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#6d645c]" />
              Extracted Positions
            </h3>
            {extracted.positions.length > 0 ? (
              <div className="space-y-3">
                {extracted.positions.map((pos, idx) => (
                  <PositionCard key={idx} position={pos} />
                ))}
              </div>
            ) : (
              <p className="text-[#6d645c] text-center py-4">
                No clear positions identified
              </p>
            )}
          </motion.div>

          {/* Cruxes */}
          {extracted.identifiedCruxes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="font-serif font-semibold text-[#1f1f1d] flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-600" />
                Key Cruxes (Points of Disagreement)
              </h3>
              <div className="space-y-3">
                {extracted.identifiedCruxes.map((crux, idx) => (
                  <CruxCard key={idx} crux={crux} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Fallacies */}
          {extracted.potentialFallacies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="space-y-4"
            >
              <h3 className="font-serif font-semibold text-[#1f1f1d] flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                Potential Fallacies Detected
              </h3>
              <div className="space-y-3">
                {extracted.potentialFallacies.map((fallacy, idx) => (
                  <FallacyCard key={idx} fallacy={fallacy} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Judging Results */}
          {judgingResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-8 border-t border-stone-200/60"
            >
              <JudgingResults result={judgingResult} />
            </motion.div>
          )}

          {/* Related Topics */}
          {relatedTopics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="pt-8 border-t border-stone-200/60 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-semibold text-[#1f1f1d] flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-[#4f7b77]" />
                  Related Topics
                </h3>
                <Link
                  href="/topics"
                  className="text-sm text-[#4f7b77] hover:underline"
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

          {/* Bottom CTA — Run Another Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-8 border-t border-stone-200/60"
          >
            <div className="bg-[#fefcf9] border border-stone-200/60 rounded-xl p-6 md:p-8 text-center space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#1f1f1d]">
                Have your own text to analyze?
              </h3>
              <p className="text-[#6d645c] text-sm max-w-md mx-auto">
                Paste a debate, article, or discussion and get AI-powered
                argument extraction, fallacy detection, and multi-model judging.
              </p>
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-sm font-semibold font-serif shadow-md hover:shadow-lg transition-all"
              >
                <Sparkles className="h-4 w-4" />
                Run Another Analysis
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
}
