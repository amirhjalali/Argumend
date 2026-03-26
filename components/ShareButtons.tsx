"use client";

import { useState } from "react";
import { Share2, Copy, Check, Lightbulb } from "lucide-react";
import type { TopicStatus } from "@/lib/schemas/topic";

// ---------------------------------------------------------------------------
// Status display labels
// ---------------------------------------------------------------------------

const STATUS_LABELS: Record<TopicStatus, string> = {
  settled: "Settled",
  contested: "Contested",
  highly_speculative: "Highly Speculative",
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
  /** Topic-specific fields for richer share text */
  topicMeta?: {
    metaClaim: string;
    confidenceScore: number;
    status: TopicStatus;
    /** The first crux question title from pillars[0].crux.title */
    cruxQuestion?: string;
    topicTitle: string;
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function copyToClipboard(text: string) {
  try {
    navigator.clipboard.writeText(text);
  } catch {
    // Fallback for older browsers / non-HTTPS contexts
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}

/**
 * Build the pre-filled tweet text for a topic analysis.
 *
 * Template:
 *   "[meta_claim question form]? The evidence says: [status] ([confidence]% confidence).
 *
 *    The crux: [first crux question]
 *
 *    See the full argument map →"
 */
function buildTweetText(meta: NonNullable<ShareButtonsProps["topicMeta"]>): string {
  const statusLabel = STATUS_LABELS[meta.status];
  let text = `${meta.metaClaim} The evidence says: ${statusLabel} (${meta.confidenceScore}% confidence).`;

  if (meta.cruxQuestion) {
    text += `\n\nThe crux: ${meta.cruxQuestion}`;
  }

  text += "\n\nSee the full argument map \u2192";
  return text;
}

/**
 * Build the "Share the Crux" tweet text.
 *
 * Template:
 *   "What's the ONE question that would resolve the [topic] debate?
 *
 *    → [crux question]
 *
 *    Map the full argument: [url]"
 */
function buildCruxTweetText(topicTitle: string, cruxQuestion: string): string {
  return `What\u2019s the ONE question that would resolve the ${topicTitle} debate?\n\n\u2192 ${cruxQuestion}\n\nMap the full argument:`;
}

// ---------------------------------------------------------------------------
// ShareButtons — reusable horizontal share row
// ---------------------------------------------------------------------------

export function ShareButtons({ title, url, description, topicMeta }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [cruxCopied, setCruxCopied] = useState(false);
  const [canShare] = useState(
    () => typeof navigator !== "undefined" && !!navigator.share,
  );

  // ---- handlers ----

  const handleCopy = async () => {
    copyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    const shareText = topicMeta
      ? buildTweetText(topicMeta)
      : (description ?? title);
    try {
      await navigator.share({
        title,
        text: shareText,
        url,
      });
    } catch {
      // User cancelled or API unavailable — nothing to do
    }
  };

  // Build Twitter href — use rich text for topics, fallback for generic
  const tweetText = topicMeta
    ? buildTweetText(topicMeta)
    : title;

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}`;

  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  // "Share the Crux" — only available when topic has a crux question
  const cruxTweetText = topicMeta?.cruxQuestion
    ? buildCruxTweetText(topicMeta.topicTitle, topicMeta.cruxQuestion)
    : null;

  const cruxTwitterHref = cruxTweetText
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(cruxTweetText)}&url=${encodeURIComponent(url)}`
    : null;

  const handleCopyCrux = () => {
    if (!topicMeta?.cruxQuestion) return;
    const text = `${buildCruxTweetText(topicMeta.topicTitle, topicMeta.cruxQuestion)} ${url}`;
    copyToClipboard(text);
    setCruxCopied(true);
    setTimeout(() => setCruxCopied(false), 2500);
  };

  // ---- shared styles ----

  const btnClass =
    "inline-flex items-center justify-center h-11 w-11 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 dark:hover:text-stone-300 dark:hover:bg-[#302e2a] transition-colors";

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopy}
        className={btnClass}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Copied!" : "Copy link"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-deep" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>

      {/* Twitter / X */}
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label="Share on X (Twitter)"
        title="Share on X"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      {/* Native Web Share API (mobile) */}
      {canShare && (
        <button
          type="button"
          onClick={handleNativeShare}
          className={btnClass}
          aria-label="Share"
          title="Share"
        >
          <Share2 className="h-4 w-4" />
        </button>
      )}

      {/* Share the Crux — prominent CTA when crux data is available */}
      {cruxTwitterHref && (
        <div className="flex items-center gap-1 ml-1 pl-2 border-l border-stone-200/60 dark:border-[#3d3a36]">
          <a
            href={cruxTwitterHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-rust-500 to-rust-600 text-white hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm"
            aria-label="Share the crux question on X"
            title="Share the crux question"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            Share the Crux
          </a>
          <button
            type="button"
            onClick={handleCopyCrux}
            className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 dark:hover:text-stone-300 dark:hover:bg-[#302e2a] transition-colors"
            aria-label={cruxCopied ? "Crux copied" : "Copy crux text"}
            title={cruxCopied ? "Copied!" : "Copy crux text"}
          >
            {cruxCopied ? (
              <Check className="h-3.5 w-3.5 text-deep" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      )}

      {/* Copied toast */}
      {(copied || cruxCopied) && (
        <span className="ml-1 text-xs font-medium text-deep animate-fade-in">
          {cruxCopied ? "Crux copied!" : "Link copied!"}
        </span>
      )}
    </div>
  );
}
