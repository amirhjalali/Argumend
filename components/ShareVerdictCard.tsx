"use client";

import { useState, useCallback } from "react";
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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CardFormat = "twitter" | "instagram";

interface ShareVerdictCardProps {
  result: JudgingResult;
  topicTitle: string;
  topicId: string;
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

function getConsensusLabel(result: JudgingResult): string {
  const total = result.verdicts.length;
  if (result.hasConsensus) return `${total}/${total} unanimous`;
  const agree = result.verdicts.filter(
    (v) => v.winner === result.winner
  ).length;
  return `${agree}/${total} split`;
}

function getShareUrl(topicId: string): string {
  const base =
    typeof window !== "undefined" ? window.location.origin : "https://argumend.org";
  return `${base}/topics/${topicId}#verdict`;
}

function getShareText(
  topicTitle: string,
  result: JudgingResult
): string {
  const winner = getWinnerLabel(result.winner);
  const forScore = result.aggregatedScores.for.average.toFixed(1);
  const againstScore = result.aggregatedScores.against.average.toFixed(1);
  return `${topicTitle} — ${winner} (${forScore} vs ${againstScore}). AI judges have spoken.`;
}

// ---------------------------------------------------------------------------
// Card Preview (rendered in the dialog for visual reference)
// ---------------------------------------------------------------------------

function VerdictCardPreview({
  result,
  topicTitle,
  format,
}: {
  result: JudgingResult;
  topicTitle: string;
  format: CardFormat;
}) {
  const forScore = result.aggregatedScores.for.average;
  const againstScore = result.aggregatedScores.against.average;
  const driving = getDrivingDimension(result);
  const consensus = getConsensusLabel(result);
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

          {/* Topic title */}
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
              Judges:{" "}
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
}: ShareVerdictCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState<CardFormat>("twitter");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const shareUrl = getShareUrl(topicId);
  const shareText = getShareText(topicTitle, result);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    trackEvent({ action: "share_click", platform: "verdict_card", topicId });
  }, [topicId]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setCopied(false);
  }, []);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      const params = new URLSearchParams({ format });
      const res = await fetch(`/api/verdict-card/${topicId}?${params}`);
      if (!res.ok) throw new Error("Failed to generate image");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `argumend-verdict-${topicId}-${format}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  }, [topicId, format]);

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
        onClick={handleOpen}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-deep dark:text-[var(--text-primary)] bg-white dark:bg-[var(--bg-card)] border border-stone-200 dark:border-[var(--border-default)] rounded-xl hover:bg-stone-50 dark:hover:bg-[var(--bg-overlay)] transition-colors shadow-sm"
        aria-label="Share verdict"
      >
        <Share2 className="h-4 w-4" />
        Share Verdict
      </button>

      {/* Modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white dark:bg-[var(--bg-card)] rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-deep" />
                  <h3 className="font-serif font-semibold text-primary">
                    Share Verdict
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 hover:bg-stone-100 dark:hover:bg-[var(--bg-overlay)] rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-stone-500" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Format toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500 uppercase tracking-wider font-medium">
                    Format
                  </span>
                  <div className="flex gap-1 bg-stone-100 dark:bg-stone-800 rounded-lg p-0.5">
                    <button
                      onClick={() => setFormat("twitter")}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        format === "twitter"
                          ? "bg-white dark:bg-[var(--bg-card)] text-primary shadow-sm"
                          : "text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                      }`}
                    >
                      Twitter / X
                    </button>
                    <button
                      onClick={() => setFormat("instagram")}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        format === "instagram"
                          ? "bg-white dark:bg-[var(--bg-card)] text-primary shadow-sm"
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
                />

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
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
