"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { DeleteReportControl } from "./DeleteReportControl";

/**
 * Share + delete controls for the public /d/[slug] page (spec 13.3, 5.3).
 * A small client island so the surrounding page stays server-rendered:
 * the "Share to X" link is a plain anchor with a href computed from props,
 * so it works even before hydration / without JavaScript. Only "Copy link"
 * and "Delete public report" need JS, and degrade to simply not appearing
 * interactive without it.
 */
export function PublicShareControls({
  slug,
  publicUrl,
  headline,
}: {
  slug: string;
  publicUrl: string;
  headline: string;
}) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(headline)}&url=${encodeURIComponent(publicUrl)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
    trackEvent({ action: "disagreement_share_clicked", platform: "copy", surface: "public" });
  }

  return (
    <section className="space-y-3">
      <h2 className="font-serif text-2xl">Share</h2>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="min-h-11 rounded-full border px-4" onClick={copy}>
          Copy link
        </button>
        <a
          className="min-h-11 rounded-full border px-4 py-2"
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent({ action: "disagreement_share_clicked", platform: "x", surface: "public" })
          }
        >
          Share to X
        </a>
      </div>
      {copied ? (
        <p className="text-sm text-[var(--text-muted)]" role="status">
          Link copied.
        </p>
      ) : null}
      {copyError ? (
        <p className="text-sm text-[#a23b3b]" role="alert">
          Could not copy the link. You can select and copy it manually: {publicUrl}
        </p>
      ) : null}
      <DeleteReportControl slug={slug} />
    </section>
  );
}
