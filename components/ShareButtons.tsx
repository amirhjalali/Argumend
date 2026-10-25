"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { copyTextToClipboard } from "@/lib/copyToClipboard";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ShareButtonsProps {
  title: string;
  url: string;
}

/** Map-sharing controls, with confirmed copy success and a manual fallback. */
export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copyResult, setCopyResult] = useState<{ url: string; status: "copied" | "failed" } | null>(null);
  const requestId = useRef(0);
  const copied = copyResult?.url === url && copyResult.status === "copied";
  const copyFailed = copyResult?.url === url && copyResult.status === "failed";

  useEffect(() => () => { requestId.current += 1; }, [url]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopyResult(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    const currentRequest = ++requestId.current;
    setCopyResult(null);
    try {
      await copyTextToClipboard(url);
      if (requestId.current === currentRequest) setCopyResult({ url, status: "copied" });
    } catch {
      if (requestId.current === currentRequest) setCopyResult({ url, status: "failed" });
    }
  };

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  // ---- shared styles ----

  const btnClass =
    "inline-flex items-center justify-center h-11 w-11 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 dark:hover:text-stone-300 dark:hover:bg-[var(--bg-muted)] transition-colors";

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

      <span role="status" className={copied ? "ml-1 text-xs font-medium text-deep" : "sr-only"}>
        {copied ? "Link copied!" : ""}
      </span>
      {copyFailed ? (
        <div className="w-40 space-y-2 p-2">
          <p role="alert" className="font-sans text-sm text-error-text">
            The link could not be copied. Select and copy it below.
          </p>
          <input
            type="text"
            readOnly
            aria-label="Link to copy"
            value={url}
            onFocus={(event) => event.currentTarget.select()}
            className="w-full rounded border border-[var(--border-default)] bg-[var(--bg-input)] p-2 font-sans text-sm text-[var(--text-primary)]"
          />
        </div>
      ) : null}
    </div>
  );
}
