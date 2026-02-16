"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Loader2,
  AlertCircle,
  Sparkles,
  ChevronDown,
  Brain,
  MessageSquare,
  AlertTriangle,
  Target,
  Shield,
  Check,
  Link as LinkIcon,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Sidebar } from "@/components/Sidebar";
import { useSidebarState } from "@/hooks/useSidebarState";
import { useLogicGraph } from "@/hooks/useLogicGraph";
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
  id: string;
  extracted: ExtractedArguments;
  judgingResult: JudgingResult | null;
  judgmentId?: string;
}

function PositionCard({ position }: { position: ExtractedPosition }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFor = position.side === "for";

  const cardStyles = isFor
    ? "border-l-rust-500 bg-gradient-to-r from-rust-50/50 to-white"
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
                  ? "bg-rust-100 text-rust-700"
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

function ShareLink({ analysisId }: { analysisId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/analysis/${analysisId}`;
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

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200/80 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-deep" />
          <span className="text-deep">Copied!</span>
        </>
      ) : (
        <>
          <LinkIcon className="h-3.5 w-3.5" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}

export default function AnalyzePage() {
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState<ContentType>("freeform");
  const [includeJudging, setIncludeJudging] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const sidebar = useSidebarState();
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const setTopic = useLogicGraph((state) => state.setTopic);

  // Check for prefilled content from the homepage hero
  useEffect(() => {
    try {
      const prefill = sessionStorage.getItem("argumend-analyze-prefill");
      if (prefill) {
        const { content: prefillContent, contentType: prefillType } = JSON.parse(prefill);
        if (prefillContent) setContent(prefillContent);
        if (prefillType) setContentType(prefillType);
        sessionStorage.removeItem("argumend-analyze-prefill");
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

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

      const analysisResult = await response.json();
      setResult(analysisResult as AnalysisResult);
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
    <div className="flex min-h-screen w-full flex-col bg-transparent font-sans text-primary">
      <TopBar onMenuClick={sidebar.toggle} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Mobile overlay */}
        <div
          className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity duration-300 ${
            sidebar.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={sidebar.close}
        />

        {/* Sidebar */}
        <div
          className={`
            fixed md:relative top-0 md:top-auto bottom-0 left-0 z-40 md:z-auto
            flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${sidebar.isOpen ? "w-[260px]" : "w-0 md:w-0"}
          `}
        >
          <div
            className={`absolute top-0 bottom-0 left-0 w-[260px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              sidebar.isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar
              isOpen={sidebar.isOpen}
              onClose={sidebar.close}
              currentTopicId={currentTopicId}
              onTopicSelect={setTopic}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="relative flex-1 min-w-0 overflow-y-auto bg-[#faf8f5]">
          <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rust-50/80 border border-rust-200/50 rounded-full text-xs font-medium text-rust-700 tracking-wide">
                <Brain className="h-3 w-3" />
                Content Analysis
              </div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                Analyze Arguments
              </h1>
              <p className="text-stone-500 text-sm max-w-lg mx-auto">
                Paste a debate transcript, article, or any argumentative content.
                We&apos;ll extract positions, find cruxes, and score quality.
              </p>
            </motion.div>

            {/* Input Section */}
            {!result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                {/* Content Type Selector */}
                <div className="flex justify-center gap-1.5">
                  {(["freeform", "article", "transcript"] as ContentType[]).map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() => setContentType(type)}
                        className={`px-3 py-2 min-h-[44px] rounded-md text-xs font-medium transition-all ${
                          contentType === type
                            ? "bg-stone-800 text-white"
                            : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    )
                  )}
                </div>

                {/* Text Input */}
                <div className="bg-white rounded-2xl border border-stone-200/60 p-4 md:p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <label className="text-sm font-medium text-stone-700">
                      Content to Analyze
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setContent(`The debate over nuclear energy has intensified. Proponents argue it's essential for meeting climate goals — nuclear produces minimal carbon emissions and provides reliable baseload power that renewables can't match. France generates 70% of its electricity from nuclear and has among the lowest carbon emissions in Europe.

Critics counter that nuclear is too expensive and too slow to build. The Vogtle plant in Georgia came in at $35 billion, more than double its original estimate. Meanwhile, solar and wind costs have plummeted 90% in a decade. There are also unresolved questions about waste storage — the US still has no permanent repository despite decades of trying.

Supporters respond that newer reactor designs like SMRs could dramatically cut costs and construction times, and that the waste problem is more political than technical — Finland's Onkalo facility proves deep geological storage works. The real question may be whether we can afford to exclude any zero-carbon source while facing a climate emergency.`);
                          setContentType("freeform");
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-rust-50 hover:bg-rust-100 rounded-md cursor-pointer transition-colors"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-rust-500" />
                        <span className="text-xs text-rust-600">Try an Example</span>
                      </button>
                      <label className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-50 hover:bg-stone-100 rounded-md cursor-pointer transition-colors">
                        <Upload className="h-3.5 w-3.5 text-stone-400" />
                        <span className="text-xs text-stone-500">Upload</span>
                        <input
                          type="file"
                          accept=".txt,.md"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && content.trim()) {
                        handleAnalyze();
                      }
                    }}
                    placeholder="Paste your debate transcript, article, or discussion here..."
                    className="w-full h-48 md:h-56 p-4 bg-stone-50/50 border border-stone-200/60 rounded-xl text-stone-700 text-sm placeholder-stone-400 resize-none focus:outline-none focus:ring-2 focus:ring-rust-500/30 focus:border-rust-500/50"
                  />
                  <p className="text-[11px] text-stone-400 mt-1.5 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Your text is analyzed by AI and is not stored after processing.
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-stone-400">
                      {content.length > 0 ? `${content.length.toLocaleString()} chars` : ""}
                      {content.trim() && (
                        <span className="ml-2 text-stone-300">{"\u2318"}Enter to analyze</span>
                      )}
                    </span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeJudging}
                        onChange={(e) => setIncludeJudging(e.target.checked)}
                        className="rounded border-stone-300 text-rust-600 focus:ring-rust-500"
                      />
                      <span className="text-xs text-stone-500">
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
                    <p className="text-red-700 text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Analyze Button */}
                <div className="flex justify-center">
                  <motion.button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !content.trim()}
                    whileHover={!isAnalyzing ? { scale: 1.02 } : {}}
                    whileTap={!isAnalyzing ? { scale: 0.98 } : {}}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-serif font-semibold transition-all ${
                      isAnalyzing || !content.trim()
                        ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-rust-500 to-rust-600 text-white shadow-md hover:shadow-lg"
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
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
                aria-live="polite"
                aria-label="Analysis results"
              >
                {/* Action Bar */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={clearResults}
                    className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
                  >
                    &larr; Analyze another
                  </button>
                  {result.id && <ShareLink analysisId={result.id} />}
                </div>

                {/* Topic */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-rust-50 border border-rust-200/60 rounded-full text-xs font-medium text-rust-700 tracking-wide">
                    <MessageSquare className="h-3 w-3" />
                    Identified Topic
                  </div>
                  <h2 className="mt-3 font-serif text-xl md:text-2xl font-bold text-primary">
                    {result.extracted.topic}
                  </h2>
                  <p className="mt-2 text-stone-500 text-sm max-w-xl mx-auto">
                    {result.extracted.summary}
                  </p>
                  <div className="mt-2 text-xs text-stone-400">
                    Confidence: {Math.round(result.extracted.confidence * 100)}%
                  </div>
                </div>

                {/* Positions */}
                <div className="space-y-4">
                  <h3 className="font-serif font-semibold text-primary flex items-center gap-2">
                    <FileText className="h-4 w-4 text-stone-500" />
                    Extracted Positions
                  </h3>
                  {result.extracted.positions.length > 0 ? (
                    <div className="space-y-3">
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
                  <div className="pt-8 border-t border-stone-200/60">
                    <JudgingResults result={result.judgingResult} />
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
