"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Download,
  Link2,
  X,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import type { JudgingResult } from "@/lib/judge/rubric";
import { DEFAULT_RUBRIC } from "@/lib/judge/rubric";
import { trackEvent } from "@/lib/analytics";
import { copyTextToClipboard } from "@/lib/copyToClipboard";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { downloadVerdictCardImage } from "@/lib/verdictCardImage";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CardFormat = "twitter" | "instagram";

interface ShareVerdictCardProps {
  result: JudgingResult;
  topicTitle: string;
  topicId: string;
  mode?: "live" | "programmatic";
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getWinnerLabel(winner: "for" | "against" | "draw" | null): string {
  switch (winner) {
    case "for":
      return "FOR WINS";
    case "against":
      return "AGAINST WINS";
    case "draw":
      return "DRAW";
    default:
      return "NO VERDICT";
  }
}

function getWinnerBgClass(winner: "for" | "against" | "draw" | null): string {
  switch (winner) {
    case "for":
      return "bg-rust-500 text-white";
    case "against":
      return "bg-deep text-white";
    case "draw":
      return "bg-stone-500 text-white";
    default:
      return "bg-stone-400 text-white";
  }
}

/**
 * Find the dimension with the largest score gap (the "driving" dimension).
 */
function getDrivingDimension(result: JudgingResult): {
  name: string;
  forScore: number;
  againstScore: number;
} | null {
  const rubric = DEFAULT_RUBRIC;
  let best: { name: string; forScore: number; againstScore: number } | null =
    null;
  let bestGap = 0;

  for (const dim of rubric) {
    const f = result.aggregatedScores.for.byDimension[dim.id] ?? 0;
    const a = result.aggregatedScores.against.byDimension[dim.id] ?? 0;
    const gap = Math.abs(f - a) * dim.weight;
    if (gap > bestGap) {
      bestGap = gap;
      best = { name: dim.name, forScore: f, againstScore: a };
    }
  }
  return best;
}

export function getConsensusLabel(
  result: JudgingResult,
  mode: "live" | "programmatic",
): string {
  const total = result.verdicts.length;
  const group = mode === "live" ? "judges" : "evaluators";
  const agree = result.verdicts.filter(
    (v) => v.winner === result.winner
  ).length;
  return `${agree}/${total} ${group} agree`;
}

function getShareUrl(topicId: string): string {
  const base =
    typeof window !== "undefined" ? window.location.origin : "https://argumend.org";
  // Verdict state is session-local, so link to the durable canonical topic
  // instead of promising a verdict anchor that disappears on a fresh visit.
  return `${base}/topics/${encodeURIComponent(topicId)}`;
}

function getShareText(
  topicTitle: string,
  result: JudgingResult,
  mode: "live" | "programmatic",
): string {
  const winner = getWinnerLabel(result.winner);
  const forScore = result.aggregatedScores.for.average.toFixed(1);
  const againstScore = result.aggregatedScores.against.average.toFixed(1);
  const source = mode === "live" ? "AI judge council" : "programmatic rubric";
  return `${topicTitle} — ${winner} (${forScore} vs ${againstScore}), scored by Argumend’s ${source}.`;
}

// ---------------------------------------------------------------------------
// Card Preview (rendered in the dialog for visual reference)
// ---------------------------------------------------------------------------

function VerdictCardPreview({
  result,
  topicTitle,
  format,
  mode,
}: {
  result: JudgingResult;
  topicTitle: string;
  format: CardFormat;
  mode: "live" | "programmatic";
}) {
  const forScore = result.aggregatedScores.for.average;
  const againstScore = result.aggregatedScores.against.average;
  const driving = getDrivingDimension(result);
  const consensus = getConsensusLabel(result, mode);
  const isTwitter = format === "twitter";
  const aspect = isTwitter ? "aspect-[1200/675]" : "aspect-square";

  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden rounded-lg border border-stone-200 bg-[#f4f1eb]`}
    >
      {/* Top accent stripe */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-rust-500" />

      <div
        className={`flex flex-col justify-between h-full ${
          isTwitter ? "px-6 pt-6 pb-4" : "px-6 pt-7 pb-5"
        }`}
      >
        {/* Winner badge */}
        <div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${getWinnerBgClass(
              result.winner
            )}`}
          >
            {getWinnerLabel(result.winner)}
          </span>

          {/* Topic title. Always-light: this card is rasterized to a PNG on the
              fixed #f4f1eb canvas, so no dark: pairing here. */}
          <h2
            className={`font-serif font-bold text-primary leading-tight mt-3 ${
              isTwitter ? "text-lg" : "text-xl"
            }`}
          >
            {topicTitle.length > 80
              ? topicTitle.slice(0, 77) + "..."
              : topicTitle}
          </h2>
        </div>

        {/* Score comparison */}
        <div className="space-y-2">
          {/* Score bars */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-rust-600 w-14 text-right shrink-0">
                For
              </span>
              <div className="flex-1 h-3 bg-stone-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rust-500 to-rust-400 rounded-full"
                  style={{ width: `${(forScore / 10) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-rust-600 w-8">
                {forScore.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500 w-14 text-right shrink-0">
                Against
              </span>
              <div className="flex-1 h-3 bg-stone-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4f7b77] to-[#6a9e99] rounded-full"
                  style={{ width: `${(againstScore / 10) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-stone-600 w-8">
                {againstScore.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Driving dimension + consensus */}
          <div className="flex items-center justify-between pt-1">
            {driving && (
              <p className="text-[9px] text-stone-400">
                Decisive factor:{" "}
                <span className="font-medium text-stone-600">{driving.name}</span>
              </p>
            )}
            <p className="text-[9px] text-stone-400">
              {mode === "live" ? "Judges" : "Programmatic rubric"}:{" "}
              <span className="font-medium text-stone-600">{consensus}</span>
            </p>
          </div>
        </div>

        {/* Branding footer */}
        <div className="flex items-center justify-between border-t border-stone-200/60 pt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-0.5 h-4 bg-rust-500 rounded-full" />
            <span className="text-[10px] font-bold text-deep tracking-[0.2em]">
              ARGUMEND
            </span>
          </div>
          <span className="text-[9px] text-stone-400">argumend.org</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Share Dialog
// ---------------------------------------------------------------------------

export function ShareVerdictCard({
  result,
  topicTitle,
  topicId,
  mode = "live",
}: ShareVerdictCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState<CardFormat>("twitter");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const shareUrl = getShareUrl(topicId);
  const shareText = getShareText(topicTitle, result, mode);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setDownloadError(null);
    setCopyError(null);
    trackEvent({ action: "share_click", platform: "verdict_card", topicId });
  }, [topicId]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setCopied(false);
    setDownloadError(null);
    setCopyError(null);
  }, []);

  const modalRef = useModalAccessibility<HTMLDivElement>({
    isOpen,
    onClose: handleClose,
  });

  const handleCopyLink = useCallback(async () => {
    try {
      await copyTextToClipboard(shareUrl);
      setCopyError(null);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError("The link could not be copied. Select and copy it manually below.");
    }
  }, [shareUrl]);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    setDownloadError(null);
    try {
      const driving = getDrivingDimension(result);
      await downloadVerdictCardImage(
        {
          topicTitle,
          winnerLabel: getWinnerLabel(result.winner),
          forScore: result.aggregatedScores.for.average,
          againstScore: result.aggregatedScores.against.average,
          drivingDimension: driving?.name ?? null,
          consensus: getConsensusLabel(result, mode),
          mode,
          format,
        },
        `argumend-verdict-${topicId}-${format}.png`,
      );
    } catch (err) {
      console.error("Download failed:", err);
      setDownloadError(
        "The image could not be generated. Check your connection and try again.",
      );
    } finally {
      setDownloading(false);
    }
  }, [format, mode, result, topicId, topicTitle]);

  const handleShareNative = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Argumend Verdict: ${topicTitle}`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or API unavailable — do nothing
      }
    }
  }, [topicTitle, shareText, shareUrl]);

  const handleShareTwitter = useCallback(() => {
    const tweetText = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.open(
      `https://x.com/intent/tweet?text=${tweetText}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, [shareText, shareUrl]);

  const supportsNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        onClick={handleOpen}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-deep dark:text-[var(--text-primary)] bg-white dark:bg-[var(--bg-card)] border border-stone-200 dark:border-[var(--border-default)] rounded-xl hover:bg-stone-50 dark:hover:bg-[var(--bg-overlay)] transition-colors shadow-sm"
        aria-label="Share verdict"
      >
        <Share2 className="h-4 w-4" />
        Share Verdict
      </button>

      {/* Modal overlay */}
      <AnimatePresence onExitComplete={() => triggerRef.current?.focus()}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[calc(100svh-2rem)] overflow-y-auto bg-white dark:bg-[var(--bg-card)] rounded-2xl shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="share-verdict-title"
              tabIndex={-1}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-deep" />
                  <h3 id="share-verdict-title" className="font-serif font-semibold text-primary dark:text-stone-200">
                    Share Verdict
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  data-modal-initial-focus
                  className="p-1.5 hover:bg-stone-100 dark:hover:bg-[var(--bg-overlay)] rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-stone-500" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Format toggle */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-stone-500 uppercase tracking-wider font-medium">
                    Format
                  </span>
                  <div className="flex gap-1 bg-stone-100 dark:bg-stone-800 rounded-lg p-0.5">
                    <button
                      onClick={() => setFormat("twitter")}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        format === "twitter"
                          ? "bg-white dark:bg-[var(--bg-card)] text-primary dark:text-stone-200 shadow-sm"
                          : "text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                      }`}
                    >
                      Twitter / X
                    </button>
                    <button
                      onClick={() => setFormat("instagram")}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        format === "instagram"
                          ? "bg-white dark:bg-[var(--bg-card)] text-primary dark:text-stone-200 shadow-sm"
                          : "text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                      }`}
                    >
                      Instagram
                    </button>
                  </div>
                </div>

                {/* Card Preview */}
                <VerdictCardPreview
                  result={result}
                  topicTitle={topicTitle}
                  format={format}
                  mode={mode}
                />

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    aria-busy={downloading || undefined}
                    aria-describedby={downloadError ? "verdict-download-error" : undefined}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-rust-500 to-rust-600 rounded-xl hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm disabled:opacity-60"
                  >
                    {downloading ? (
                      <span className="animate-pulse">Generating...</span>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Download Image
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCopyLink}
                    aria-describedby={copyError ? "verdict-copy-error" : undefined}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="h-4 w-4" />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>

                {copyError && (
                  <div
                    id="verdict-copy-error"
                    role="alert"
                    className="space-y-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"
                  >
                    <p>{copyError}</p>
                    <input
                      readOnly
                      value={shareUrl}
                      onFocus={(event) => event.currentTarget.select()}
                      aria-label="Verdict share link"
                      className="w-full rounded-lg border border-red-200 bg-white px-3 py-2 font-mono text-xs text-stone-700 outline-none focus:ring-2 focus:ring-red-400 dark:border-red-900 dark:bg-stone-900 dark:text-stone-200"
                    />
                  </div>
                )}

                {downloadError && (
                  <div
                    id="verdict-download-error"
                    role="alert"
                    className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span>{downloadError}</span>
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={downloading}
                      className="min-h-10 flex-shrink-0 rounded-lg border border-red-300 bg-white px-3 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-60 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200 dark:hover:bg-red-900/40"
                    >
                      Try download again
                    </button>
                  </div>
                )}

                {/* Share buttons row */}
                <div className="flex gap-3">
                  <button
                    onClick={handleShareTwitter}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#0f1419] rounded-xl hover:bg-[#272c30] transition-colors"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Post on X
                  </button>

                  {supportsNativeShare && (
                    <button
                      onClick={handleShareNative}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-deep dark:text-[var(--text-primary)] border border-stone-200 dark:border-[var(--border-default)] rounded-xl hover:bg-stone-50 dark:hover:bg-[var(--bg-overlay)] transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                      More...
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
