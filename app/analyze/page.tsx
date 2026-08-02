"use client";

import { useState, useCallback, useEffect, useId, useRef } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Loader2,
  AlertCircle,
  ChevronDown,
  Brain,
  MessageSquare,
  AlertTriangle,
  Target,
  Check,
  Link as LinkIcon,
  Lock,
  Beaker,
  Mic,
  Newspaper,
  PenLine,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { useSidebarState } from "@/hooks/useSidebarState";
import { useMobileSidebarA11y } from "@/hooks/useMobileSidebarA11y";
import dynamic from "next/dynamic";
import { EXAMPLE_ANALYSIS_TEXT } from "@/lib/constants";
import { AnalyzeExecutionNotice } from "@/components/AnalyzeExecutionNotice";
import {
  parseAnalyzeSuccessResponse,
  type AnalyzeSuccessResponse,
} from "@/lib/analyze/contracts";

// Heavy component — only rendered after analysis completes
const JudgingResults = dynamic(
  () => import("@/components/JudgingResults").then((m) => ({ default: m.JudgingResults })),
  { loading: () => <div className="animate-pulse h-40 bg-stone-200/60 dark:bg-[#302e2a] rounded-lg" /> }
);
import type {
  ExtractedPosition,
  IdentifiedCrux,
  PotentialFallacy,
} from "@/lib/analyze/extractor";
import { trackEvent } from "@/lib/analytics";

type ContentType = "transcript" | "article" | "freeform";

const MAX_ANALYSIS_CHARACTERS = 50_000;
const MAX_UPLOAD_BYTES = 100_000;
const ANALYZE_SIDEBAR_ID = "analyze-sidebar-navigation";
const ANALYZE_INPUT_ID = "analyze-content";
const ANALYZE_INPUT_HELP_ID = "analyze-content-help";
const ANALYZE_ERROR_ID = "analyze-error";

const liveAnalyzeEnabled =
  process.env.NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API === "true";
const liveJudgingEnabled =
  process.env.NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API === "true";

function PositionCard({ position }: { position: ExtractedPosition }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();
  const isFor = position.side === "for";

  const cardStyles = isFor
    ? "border-l-rust-500 bg-gradient-to-r from-rust-50/50 to-white dark:from-rust-500/10 dark:to-[var(--bg-card)]"
    : "border-l-stone-500 bg-gradient-to-r from-stone-50/50 to-white dark:from-stone-500/10 dark:to-[var(--bg-card)]";

  return (
    <motion.div
      initial={{ opacity: 0, x: isFor ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`rounded-xl border border-stone-200/80 dark:border-[var(--border-default)] border-l-4 ${cardStyles} overflow-hidden shadow-sm`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        className="w-full p-3 md:p-4 text-left hover:bg-white/50 dark:hover:bg-[#302e2a]/50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isFor
                  ? "bg-rust-100 text-rust-700 dark:bg-rust-500/20 dark:text-rust-300"
                  : "bg-stone-100 text-stone-600 dark:bg-stone-700/30 dark:text-stone-400"
              }`}
            >
              {isFor ? "FOR" : "AGAINST"}
            </div>
            {position.speaker && (
              <span className="text-sm text-stone-600 dark:text-stone-400">{position.speaker}</span>
            )}
            <span className="text-sm text-muted dark:text-stone-500">
              {position.arguments.length} argument
              {position.arguments.length !== 1 ? "s" : ""}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown aria-hidden="true" className="h-5 w-5 text-muted dark:text-stone-500" />
          </motion.div>
        </div>
      </button>

      {isExpanded && (
        <motion.div
          id={detailsId}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-3 md:px-4 pb-3 md:pb-4 border-t border-stone-100 dark:border-[var(--border-subtle)]"
        >
          <div className="pt-4 space-y-4">
            {position.arguments.map((arg, idx) => (
              <div key={idx} className="pl-4 border-l-2 border-stone-200 dark:border-stone-600">
                <p className="text-stone-700 dark:text-stone-300 font-medium">{arg.claim}</p>
                {arg.evidence && arg.evidence.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <span className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                      Evidence:
                    </span>
                    <ul className="list-disc list-inside text-sm text-stone-600 dark:text-stone-400 space-y-1">
                      {arg.evidence.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {arg.source && (
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                    Source: {arg.source}
                  </p>
                )}
              </div>
            ))}
            {position.arguments.length === 0 && (
              <p className="text-sm text-stone-500 dark:text-stone-400">
                No individual arguments were identified for this side.
              </p>
            )}
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
      className="p-4 bg-[#f2f7f6] dark:bg-[#1e2a29] border border-deep/15 rounded-xl hover:border-deep/25 transition-colors duration-200"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-deep/10 flex items-center justify-center">
          <Target className="h-4 w-4 text-deep" />
        </div>
        <div>
          <p className="text-stone-800 dark:text-[var(--text-heading)] font-medium leading-snug">{crux.description}</p>
          {crux.significance && (
            <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{crux.significance}</p>
          )}
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
      className="p-4 bg-rust-50/60 dark:bg-rust-500/10 border border-rust-200/50 dark:border-rust-500/20 rounded-xl hover:border-rust-200/80 dark:hover:border-rust-500/30 transition-colors duration-200"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-rust-100 dark:bg-rust-500/20 flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 text-rust-600 dark:text-rust-400" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-stone-800 dark:text-[var(--text-heading)] font-medium">{fallacy.type}</span>
            {fallacy.attributedTo && (
              <span className="text-xs bg-rust-100 dark:bg-rust-500/20 text-rust-700 dark:text-rust-300 px-2 py-0.5 rounded-full font-medium">
                {fallacy.attributedTo}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{fallacy.explanation}</p>
          {fallacy.quote && (
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 italic border-l-2 border-rust-300 dark:border-rust-500/40 pl-3 leading-relaxed">
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
      aria-label={copied ? "Link copied to clipboard" : "Copy share link"}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[var(--bg-card)] border border-stone-200/80 dark:border-[var(--border-default)] rounded-lg text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-[#302e2a] hover:border-stone-300 dark:hover:border-stone-600 transition-all shadow-sm"
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
  const [wasCancelled, setWasCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeSuccessResponse | null>(null);
  const analyzingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const returnFocusToInputRef = useRef(false);

  const sidebar = useSidebarState();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useMobileSidebarA11y({
    isOpen: sidebar.isOpen,
    close: sidebar.close,
    drawerRef: sidebarRef,
    triggerRef: menuButtonRef,
  });

  // Check for prefilled content from the homepage hero
  useEffect(() => {
    let cancelled = false;
    try {
      const prefill = sessionStorage.getItem("argumend-analyze-prefill");
      if (prefill) {
        const parsed: unknown = JSON.parse(prefill);
        if (typeof parsed === "object" && parsed !== null) {
          const { content: prefillContent, contentType: prefillType } = parsed as {
            content?: unknown;
            contentType?: unknown;
          };
          queueMicrotask(() => {
            if (cancelled) return;
            if (typeof prefillContent === "string" && prefillContent) {
              setContent(prefillContent);
            }
            if (
              prefillType === "transcript" ||
              prefillType === "article" ||
              prefillType === "freeform"
            ) {
              setContentType(prefillType);
            }
            sessionStorage.removeItem("argumend-analyze-prefill");
          });
        }
      }
    } catch {
      // Ignore parse errors
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  useEffect(() => {
    if (result) {
      resultHeadingRef.current?.focus();
    } else if (returnFocusToInputRef.current) {
      returnFocusToInputRef.current = false;
      textareaRef.current?.focus();
    }
  }, [result, isAnalyzing]);

  const handleAnalyze = useCallback(async () => {
    if (analyzingRef.current) {
      return;
    }

    if (!content.trim()) {
      setError("Paste something first — an article, a debate, anything with an argument in it.");
      return;
    }

    if (content.length > MAX_ANALYSIS_CHARACTERS) {
      setError(
        `Content is too long. Please keep it under ${MAX_ANALYSIS_CHARACTERS.toLocaleString()} characters.`
      );
      return;
    }

    analyzingRef.current = true;
    const abortController = new AbortController();
    abortRef.current = abortController;
    setIsAnalyzing(true);
    setWasCancelled(false);
    setError(null);
    setResult(null);
    trackEvent({ action: "analysis_submit", contentType });

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          contentType,
          includeJudging,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("You have reached the analysis limit. Please wait a while and try again.");
        }
        if (response.status === 400) {
          throw new Error("That text could not be analyzed. Check the content and try again.");
        }
        throw new Error("The analysis service is temporarily unavailable. Your text is still here — please try again.");
      }

      const analysisResult = parseAnalyzeSuccessResponse(await response.json());
      setResult(analysisResult);
      trackEvent({
        action: "analysis_complete",
        topicCount: analysisResult.extracted.positions.length,
      });
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return;
      const errorMsg = e instanceof Error ? e.message : "Something went wrong with the analysis";
      setError(errorMsg);
    } finally {
      if (abortRef.current === abortController) {
        abortRef.current = null;
        analyzingRef.current = false;
        setIsAnalyzing(false);
      }
    }
  }, [content, contentType, includeJudging]);

  const cancelAnalysis = useCallback(() => {
    if (!abortRef.current) return;
    returnFocusToInputRef.current = true;
    setWasCancelled(true);
    abortRef.current.abort();
  }, []);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > MAX_UPLOAD_BYTES) {
          setError("That file is too large. Please upload a text file under 100 KB.");
          e.target.value = "";
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result;
          if (typeof text !== "string") {
            setError("We could not read that file. Please try another text file.");
            return;
          }
          if (text.length > MAX_ANALYSIS_CHARACTERS) {
            setError(
              `That file contains more than ${MAX_ANALYSIS_CHARACTERS.toLocaleString()} characters. Please shorten it and try again.`
            );
            return;
          }
          setError(null);
          setContent(text);
        };
        reader.onerror = () => {
          setError("We could not read that file. Please try another text file.");
        };
        reader.readAsText(file);
      }
    },
    []
  );

  const clearResults = useCallback(() => {
    returnFocusToInputRef.current = true;
    setWasCancelled(false);
    setResult(null);
    setError(null);
  }, []);

  const dismissError = useCallback(() => {
    setError(null);
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="flex min-h-[100svh] w-full flex-col bg-transparent font-sans text-primary dark:text-stone-200">
      <TopBar
        onMenuClick={sidebar.toggle}
        sidebarId={ANALYZE_SIDEBAR_ID}
        sidebarOpen={sidebar.isOpen}
        menuButtonRef={menuButtonRef}
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Mobile overlay */}
        <div
          className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity duration-300 ${
            sidebar.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          role="button"
          tabIndex={sidebar.isOpen ? 0 : -1}
          aria-label="Close sidebar"
          onClick={sidebar.close}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sidebar.close(); } }}
        />

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          id={ANALYZE_SIDEBAR_ID}
          aria-label="Sidebar navigation"
          aria-hidden={!sidebar.isOpen}
          inert={!sidebar.isOpen}
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
            />
          </div>
        </div>

        {/* Main content */}
        <main id="main-content" className="relative flex-1 min-w-0 overflow-y-auto">
          {/* Subtle top gradient for visual warmth */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#f4f1eb]/60 dark:from-[#1a1917]/60 to-transparent pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-deep/8 border border-deep/15 rounded-full text-xs font-medium text-deep tracking-wide">
                  <Brain className="h-3.5 w-3.5" />
                  Argument Analysis
                </div>
                {!liveAnalyzeEnabled && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full text-xs font-medium text-emerald-700 dark:text-emerald-400 tracking-wide">
                    <Lock className="h-3.5 w-3.5" />
                    Programmatic Mode
                  </div>
                )}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary dark:text-stone-200 mb-6 leading-[1.08]">
                Analyze Any Argument
              </h1>
              <p className="text-lg text-secondary dark:text-stone-400 leading-relaxed max-w-2xl mx-auto">
                Paste a debate, an article, or anything with an argument in it. In seconds,
                we&apos;ll surface every position, pinpoint the crux that divides them, and rate
                how strong the reasoning really is.
              </p>
              {!liveAnalyzeEnabled && (
                <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80 max-w-2xl mx-auto">
                  Running in local/offline mode to keep analysis costs predictable.
                </p>
              )}
            </motion.div>

            {/* Input Section */}
            {!result && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
                aria-label="Argument analysis form"
                aria-busy={isAnalyzing}
                onSubmit={(event) => {
                  event.preventDefault();
                  handleAnalyze();
                }}
              >
                {/* Content Type Selector — segmented control */}
                <div className="flex justify-center">
                  <fieldset className="inline-flex bg-stone-100 dark:bg-[var(--bg-surface)] rounded-xl p-1 gap-0.5">
                    <legend className="sr-only">Content format</legend>
                    {(
                      [
                        { type: "freeform" as ContentType, icon: PenLine, label: "Freeform" },
                        { type: "article" as ContentType, icon: Newspaper, label: "Article" },
                        { type: "transcript" as ContentType, icon: Mic, label: "Transcript" },
                      ] as const
                    ).map(({ type, icon: Icon, label }) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setContentType(type)}
                        disabled={isAnalyzing}
                        aria-pressed={contentType === type}
                        className={`relative flex min-h-11 items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                          contentType === type
                            ? "bg-deep text-white shadow-sm"
                            : "bg-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-white/60 dark:hover:bg-[#302e2a]"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {label}
                      </button>
                    ))}
                  </fieldset>
                </div>

                {/* Text Input */}
                <div className="bg-white dark:bg-[var(--bg-card)] rounded-2xl border border-stone-200/60 dark:border-[var(--border-default)] p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <label htmlFor={ANALYZE_INPUT_ID} className="text-sm font-serif font-semibold text-primary dark:text-stone-200">
                      Content to Analyze
                    </label>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <button
                        type="button"
                        disabled={isAnalyzing}
                        onClick={() => {
                          setContent(EXAMPLE_ANALYSIS_TEXT);
                          setContentType("freeform");
                          setError(null);
                        }}
                        className="flex min-h-11 items-center gap-1.5 px-3 py-2 bg-deep/8 hover:bg-deep/15 border border-deep/15 rounded-lg cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Beaker className="h-3.5 w-3.5 text-deep" />
                        <span className="text-xs font-medium text-deep">Try an Example</span>
                      </button>
                      <label className={`flex min-h-11 items-center gap-1.5 px-3 py-2 bg-stone-50 dark:bg-[var(--bg-surface)] hover:bg-stone-100 dark:hover:bg-[#302e2a] border border-stone-200/60 dark:border-[var(--border-default)] rounded-lg transition-all duration-200 focus-within:ring-2 focus-within:ring-deep/30 ${isAnalyzing ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
                        <Upload className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
                        <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Upload</span>
                        <input
                          type="file"
                          accept=".txt,.md,text/plain,text/markdown"
                          onChange={handleFileUpload}
                          disabled={isAnalyzing}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Textarea with premium styling */}
                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      id={ANALYZE_INPUT_ID}
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                        setWasCancelled(false);
                        if (error) setError(null);
                      }}
                      disabled={isAnalyzing}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          (e.metaKey || e.ctrlKey) &&
                          content.trim() &&
                          !isAnalyzing
                        ) {
                          e.preventDefault();
                          handleAnalyze();
                        }
                      }}
                      placeholder="Paste an article, argument, or any text you'd like analyzed..."
                      aria-label="Text to analyze"
                      aria-describedby={`${ANALYZE_INPUT_HELP_ID}${error ? ` ${ANALYZE_ERROR_ID}` : ""}`}
                      aria-invalid={Boolean(error)}
                      className="w-full min-h-[200px] md:min-h-[240px] p-4 pb-10 bg-[#faf8f5] dark:bg-[var(--bg-input)] border border-stone-200/60 dark:border-[var(--border-default)] rounded-xl text-stone-700 dark:text-[var(--text-primary)] text-sm leading-relaxed placeholder-stone-400/70 dark:placeholder-stone-500/70 resize-y transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-deep/20 focus:border-deep/40 focus:bg-white dark:focus:bg-[var(--bg-surface)] disabled:opacity-70"
                    />
                    {/* Word/char count indicator */}
                    <div className="absolute bottom-3 right-3 pointer-events-none">
                      <span className="text-xs text-stone-400/70 dark:text-stone-500/70 tabular-nums">
                        {content.trim() ? `${content.trim().split(/\s+/).length} words` : "0 words"}
                      </span>
                    </div>
                  </div>

                  {/* Privacy badge */}
                  <div id={ANALYZE_INPUT_HELP_ID} className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-deep/6 border border-deep/10 rounded-full">
                      <Lock className="h-3 w-3 text-deep/70" />
                      <span className="text-[11px] font-medium text-deep/70">
                        {liveAnalyzeEnabled
                          ? "Source text isn’t stored; live mode sends it to the configured AI provider"
                          : "Source text isn’t stored or sent to an AI model"}
                      </span>
                    </div>
                    <span className={`text-xs tabular-nums ${
                      content.length > MAX_ANALYSIS_CHARACTERS
                        ? "font-semibold text-red-600 dark:text-red-400"
                        : content.length > MAX_ANALYSIS_CHARACTERS * 0.9
                          ? "text-rust-600 dark:text-rust-400"
                          : "text-muted dark:text-[var(--text-muted)]"
                    }`}>
                      {content.length.toLocaleString()} / {MAX_ANALYSIS_CHARACTERS.toLocaleString()} characters
                    </span>
                  </div>

                  {/* Bottom bar: keyboard hint + judging toggle */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3 pt-3 border-t border-stone-100 dark:border-[var(--border-subtle)]">
                    <span className="text-xs text-muted dark:text-[var(--text-muted)]">
                      {content.trim() && (
                        <span>Press {"\u2318"}/Ctrl + Enter to analyze</span>
                      )}
                    </span>
                    <label className="flex min-h-11 items-center gap-2 py-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={includeJudging}
                        onChange={(e) => setIncludeJudging(e.target.checked)}
                        disabled={isAnalyzing}
                        className="rounded border-stone-300 text-deep focus:ring-deep/30 transition-colors"
                      />
                      <span className="text-xs text-stone-500 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">
                        {liveJudgingEnabled
                          ? "Include AI Judgment"
                          : "Include Programmatic Judgment"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    ref={errorRef}
                    id={ANALYZE_ERROR_ID}
                    tabIndex={-1}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-50/80 dark:bg-red-500/10 border border-red-200/60 dark:border-red-500/20 rounded-xl flex items-start gap-3"
                    role="alert"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-red-800 dark:text-red-300 text-sm">Analysis wasn&apos;t completed</p>
                      <p className="mt-0.5 text-red-700 dark:text-red-400 text-sm">{error}</p>
                    </div>
                    <button
                      type="button"
                      onClick={dismissError}
                      className="rounded-md px-2 py-1 text-xs font-medium text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-500/20"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                )}

                {/* Empty-state nudge — only before anything has been typed */}
                {!content.trim() && !error && (
                  <p className="text-center text-sm text-muted dark:text-stone-400">
                    Not sure what to paste? Hit{" "}
                    <span className="font-medium text-deep">Try an Example</span> above and
                    watch a real debate get mapped.
                  </p>
                )}

                {/* Analyze Button */}
                <div className="flex flex-wrap justify-center gap-3">
                  <motion.button
                    type="submit"
                    disabled={isAnalyzing || !content.trim()}
                    whileHover={!isAnalyzing && content.trim() ? { scale: 1.03, y: -1 } : {}}
                    whileTap={!isAnalyzing && content.trim() ? { scale: 0.97 } : {}}
                    className={`flex items-center justify-center gap-2.5 px-10 py-3.5 rounded-xl font-serif text-base font-semibold transition-all duration-200 min-w-[220px] ${
                      isAnalyzing
                        ? "bg-gradient-to-r from-rust-400 to-rust-500 text-white/90 shadow-md cursor-wait"
                        : !content.trim()
                        ? "bg-stone-100 dark:bg-[var(--bg-surface)] text-stone-400 dark:text-stone-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-rust-500 to-rust-600 text-white shadow-md hover:shadow-lg hover:from-rust-600 hover:to-rust-700"
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Mapping the arguments&hellip;</span>
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5" />
                        <span>{liveAnalyzeEnabled ? "Analyze" : "Analyze (Local)"}</span>
                      </>
                    )}
                  </motion.button>
                  {isAnalyzing && (
                    <button
                      type="button"
                      onClick={cancelAnalysis}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-stone-300 dark:border-[var(--border-default)] bg-white dark:bg-[var(--bg-card)] px-5 py-3 text-sm font-semibold text-stone-700 dark:text-stone-200 shadow-sm transition-colors hover:bg-stone-50 dark:hover:bg-[var(--bg-overlay)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep/40"
                    >
                      Cancel analysis
                    </button>
                  )}
                </div>

                {/* Loading status — keeps the wait from feeling silent */}
                {isAnalyzing && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-sm text-muted dark:text-stone-400"
                    role="status"
                    aria-live="polite"
                  >
                    Reading the text, separating the sides, and hunting for the crux. This
                    usually takes a few seconds.
                  </motion.p>
                )}
                {!isAnalyzing && wasCancelled && (
                  <p className="text-center text-sm text-stone-600 dark:text-stone-300" role="status">
                    Analysis cancelled. Your text is still here when you&apos;re ready.
                  </p>
                )}
              </motion.form>
            )}

            {/* Results Section */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
                aria-label="Analysis results"
              >
                <p className="sr-only" role="status">Analysis complete. Results are ready.</p>
                {/* Section divider */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-300/60 dark:via-stone-600/60 to-transparent" />
                  <h2
                    ref={resultHeadingRef}
                    tabIndex={-1}
                    className="text-xs font-medium text-muted dark:text-[var(--text-muted)] tracking-wide uppercase focus:outline-none"
                  >
                    Results
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-300/60 dark:via-stone-600/60 to-transparent" />
                </div>

                <AnalyzeExecutionNotice execution={result.execution} />

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={clearResults}
                    aria-label="Edit input or analyze another"
                    className="inline-flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 hover:text-deep transition-colors font-medium"
                  >
                    &larr; Edit input or analyze another
                  </button>
                  {result.id ? (
                    <ShareLink analysisId={result.id} />
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                      Session-only report — not saved
                    </span>
                  )}
                </div>

                {/* Topic — celebration card with scale entrance */}
                <motion.div
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center bg-white dark:bg-[var(--bg-card)] rounded-2xl border border-stone-200/60 dark:border-[var(--border-default)] p-6 md:p-8 shadow-sm"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-deep/8 border border-deep/15 rounded-full text-xs font-medium text-deep tracking-wide">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Identified Topic
                  </div>
                  <h2 className="mt-4 font-serif text-2xl sm:text-3xl text-primary dark:text-stone-200 mb-4">
                    {result.extracted.topic}
                  </h2>
                  <p className="mt-2 text-stone-500 dark:text-stone-400 text-sm max-w-xl mx-auto leading-relaxed">
                    {result.extracted.summary || "No summary was available for this analysis."}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-50 dark:bg-[var(--bg-surface)] rounded-full text-xs text-muted dark:text-[var(--text-muted)] font-mono tabular-nums">
                    Extraction confidence: {Math.round(result.extracted.confidence * 100)}%
                  </div>
                </motion.div>

                {/* Positions */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="space-y-4"
                >
                  <h3 className="font-serif text-lg text-primary dark:text-stone-200 mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-deep" />
                    Extracted Positions
                  </h3>
                  {result.extracted.positions.length > 0 ? (
                    <div className="space-y-3">
                      {result.extracted.positions.map((pos, idx) => (
                        <PositionCard key={idx} position={pos} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-stone-500 dark:text-stone-400 text-center py-4">
                      No clear positions found &mdash; the text might not contain a structured argument.
                    </p>
                  )}
                </motion.div>

                {/* Cruxes */}
                {result.extracted.identifiedCruxes.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                    className="space-y-4"
                  >
                    <h3 className="font-serif text-lg text-primary dark:text-stone-200 mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4 text-deep" />
                      Key Cruxes
                      <span className="text-sm font-sans font-normal text-muted dark:text-[var(--text-muted)]">
                        Points of Disagreement
                      </span>
                    </h3>
                    <div className="space-y-3">
                      {result.extracted.identifiedCruxes.map((crux, idx) => (
                        <CruxCard key={idx} crux={crux} />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="rounded-xl border border-stone-200/70 dark:border-[var(--border-default)] bg-stone-50/70 dark:bg-[var(--bg-surface)] p-4 text-sm text-stone-600 dark:text-stone-400">
                    No clear point of disagreement was found in this text.
                  </div>
                )}

                {/* Fallacies */}
                {result.extracted.potentialFallacies.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.45 }}
                    className="space-y-4"
                  >
                    <h3 className="font-serif text-lg text-primary dark:text-stone-200 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-rust-500" />
                      Potential Fallacies
                      <span className="text-sm font-sans font-normal text-muted dark:text-[var(--text-muted)]">
                        {result.extracted.potentialFallacies.length} detected
                      </span>
                    </h3>
                    <div className="space-y-3">
                      {result.extracted.potentialFallacies.map((fallacy, idx) => (
                        <FallacyCard key={idx} fallacy={fallacy} />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="rounded-xl border border-emerald-200/60 dark:border-emerald-800/40 bg-emerald-50/60 dark:bg-emerald-900/15 p-4 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                    No potential fallacies were identified in this analysis.
                  </div>
                )}

                {/* Judging Results */}
                {result.judgingResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.55 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-300/60 dark:via-stone-600/60 to-transparent" />
                      <span className="text-xs font-medium text-muted dark:text-[var(--text-muted)] tracking-wide uppercase">
                        {result.execution.judging.actual === "live"
                          ? "Live AI Judgment"
                          : "Programmatic Judgment"}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-300/60 dark:via-stone-600/60 to-transparent" />
                    </div>
                    <JudgingResults
                      result={result.judgingResult}
                      mode={result.execution.judging.actual === "live" ? "live" : "programmatic"}
                    />
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
