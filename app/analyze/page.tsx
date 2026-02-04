"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Loader2,
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Brain,
  MessageSquare,
  AlertTriangle,
  Target,
  Gavel,
} from "lucide-react";
import { JudgingResults } from "@/components/JudgingResults";
import type { JudgingResult } from "@/lib/judge/rubric";
import type {
  ExtractedArguments,
  ExtractedPosition,
  IdentifiedCrux,
  PotentialFallacy,
} from "@/lib/analyze/extractor";

type ContentType = "transcript" | "article" | "freeform";

interface AnalysisResult {
  extracted: ExtractedArguments;
  judgingResult: JudgingResult | null;
}

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
        className="w-full p-4 text-left hover:bg-white/50 transition-colors"
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
              <span className="text-sm text-stone-600">{position.speaker}</span>
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
          className="px-4 pb-4 border-t border-stone-100"
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
      className="p-4 bg-purple-50/50 border border-purple-200/60 rounded-xl"
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
      className="p-4 bg-yellow-50/50 border border-yellow-200/60 rounded-xl"
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
              "{fallacy.quote}"
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AnalyzePage() {
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState<ContentType>("freeform");
  const [includeJudging, setIncludeJudging] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!content.trim()) {
      setError("Please enter some content to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          contentType,
          includeJudging,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.details || data.error || "Analysis failed");
      }

      const analysisResult: AnalysisResult = await response.json();
      setResult(analysisResult);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Analysis failed";
      setError(errorMsg);
    } finally {
      setIsAnalyzing(false);
    }
  }, [content, contentType, includeJudging]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          setContent(text);
        };
        reader.readAsText(file);
      }
    },
    []
  );

  const clearResults = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100/80 rounded-full text-xs font-medium text-stone-600 uppercase tracking-wider border border-stone-200/50">
            <Brain className="h-3.5 w-3.5" />
            Content Analysis
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">
            Analyze Arguments
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto">
            Upload a debate transcript, article, or any argumentative content.
            We'll extract the positions, identify cruxes, and score the quality
            of argumentation.
          </p>
        </motion.div>

        {/* Input Section */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Content Type Selector */}
            <div className="flex justify-center gap-2">
              {(["transcript", "article", "freeform"] as ContentType[]).map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => setContentType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      contentType === type
                        ? "bg-stone-800 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                )
              )}
            </div>

            {/* Text Input */}
            <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-stone-700">
                  Content to Analyze
                </label>
                <label className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 hover:bg-stone-100 rounded-lg cursor-pointer transition-colors">
                  <Upload className="h-4 w-4 text-stone-500" />
                  <span className="text-sm text-stone-600">Upload File</span>
                  <input
                    type="file"
                    accept=".txt,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your debate transcript, article, or discussion here..."
                className="w-full h-64 p-4 bg-stone-50/50 border border-stone-200/60 rounded-xl text-stone-700 placeholder-stone-400 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50"
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-stone-400">
                  {content.length.toLocaleString()} characters
                </span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeJudging}
                    onChange={(e) => setIncludeJudging(e.target.checked)}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-stone-600">
                    Include AI Judgment
                  </span>
                </label>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50/80 border border-red-200/60 rounded-xl flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Analyze Button */}
            <div className="flex justify-center">
              <motion.button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !content.trim()}
                whileHover={!isAnalyzing ? { scale: 1.02 } : {}}
                whileTap={!isAnalyzing ? { scale: 0.98 } : {}}
                className={`flex items-center gap-3 px-8 py-3.5 rounded-xl font-serif font-semibold text-lg transition-all ${
                  isAnalyzing || !content.trim()
                    ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Analyze Content
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Results Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Back Button */}
            <button
              onClick={clearResults}
              className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
            >
              ← Analyze another
            </button>

            {/* Topic */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200/60 rounded-full text-xs font-medium text-amber-700 uppercase tracking-wider">
                <MessageSquare className="h-3.5 w-3.5" />
                Identified Topic
              </div>
              <h2 className="mt-4 font-serif text-2xl font-bold text-primary">
                {result.extracted.topic}
              </h2>
              <p className="mt-2 text-stone-500 max-w-xl mx-auto">
                {result.extracted.summary}
              </p>
              <div className="mt-3 text-sm text-stone-400">
                Confidence: {Math.round(result.extracted.confidence * 100)}%
              </div>
            </div>

            {/* Positions */}
            <div className="space-y-4">
              <h3 className="font-serif font-semibold text-primary flex items-center gap-2">
                <FileText className="h-4 w-4 text-deep" />
                Extracted Positions
              </h3>
              {result.extracted.positions.length > 0 ? (
                <div className="space-y-4">
                  {result.extracted.positions.map((pos, idx) => (
                    <PositionCard key={idx} position={pos} />
                  ))}
                </div>
              ) : (
                <p className="text-stone-500 text-center py-4">
                  No clear positions identified
                </p>
              )}
            </div>

            {/* Cruxes */}
            {result.extracted.identifiedCruxes.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif font-semibold text-primary flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  Key Cruxes (Points of Disagreement)
                </h3>
                <div className="space-y-3">
                  {result.extracted.identifiedCruxes.map((crux, idx) => (
                    <CruxCard key={idx} crux={crux} />
                  ))}
                </div>
              </div>
            )}

            {/* Fallacies */}
            {result.extracted.potentialFallacies.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif font-semibold text-primary flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  Potential Fallacies Detected
                </h3>
                <div className="space-y-3">
                  {result.extracted.potentialFallacies.map((fallacy, idx) => (
                    <FallacyCard key={idx} fallacy={fallacy} />
                  ))}
                </div>
              </div>
            )}

            {/* Judging Results */}
            {result.judgingResult && (
              <div className="pt-8 border-t border-stone-200">
                <JudgingResults result={result.judgingResult} />
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
