"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  ChevronDown,
  Brain,
  MessageSquare,
  AlertTriangle,
  Target,
  Share2,
  Check,
  Sparkles,
  Clock,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { JudgingResults } from "@/components/JudgingResults";
import type { JudgingResult } from "@/lib/judge/rubric";
import type {
  ExtractedArguments,
  ExtractedPosition,
  IdentifiedCrux,
  PotentialFallacy,
} from "@/lib/analyze/extractor";

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

function ShareButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/analysis/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
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

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200/80 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-[#4f7b77]" />
          <span className="text-[#4f7b77]">Link copied!</span>
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          <span>Share Analysis</span>
        </>
      )}
    </button>
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

  return (
    <AppShell>
      <div className="bg-[#faf8f5] min-h-full">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
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

          {/* Share + CTA bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <ShareButton id={id} />
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-sm font-semibold font-serif shadow-md hover:shadow-lg transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Run Your Own Analysis
            </Link>
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

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="pt-8 border-t border-stone-200/60"
          >
            <div className="bg-[#fefcf9] border border-stone-200/60 rounded-xl p-6 md:p-8 text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4f7b77]/10 border border-[#4f7b77]/20 rounded-full text-xs font-medium text-[#4f7b77]">
                <Brain className="h-3 w-3" />
                ARGUMEND
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1f1f1d]">
                Analyze Any Argument
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
                Run Your Own Analysis
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
}
