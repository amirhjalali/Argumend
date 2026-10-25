"use client";

import { useState } from "react";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";
import { copyTextToClipboard } from "@/lib/copyToClipboard";
import type { ArgumentGraph } from "@/types/argument";
import type { DisagreementReportV1 } from "@/types/disagreement";
import { DeleteReportControl } from "./DeleteReportControl";

const PublicationReceiptSchema = z.object({
  url: z.string().regex(/^\/d\/[A-Za-z0-9_-]+$/),
  manageToken: z.string().min(1),
});
const PublicationErrorSchema = z.object({ error: z.string().min(1) });

/** Deterministic share copy anchored on the primary crux (spec 12). */
export function shareIntentCopy(report: DisagreementReportV1): string {
  const primaryCrux = report.cruxes[0]?.question ?? report.diagnosis.headline;
  return [
    "This argument appears to turn on one question:",
    "",
    primaryCrux,
    "",
    "Argumend mapped the positions, shared ground, and what changes if the major claims fail:",
  ].join("\n");
}

export function xIntentUrl(report: DisagreementReportV1, url: string): string {
  const text = `${shareIntentCopy(report)}\n${url}`;
  return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export function ShareReport({
  report,
  graph,
  publicationToken,
  unavailableReason,
  surface,
}: {
  report: DisagreementReportV1;
  graph?: ArgumentGraph;
  publicationToken?: string;
  unavailableReason?: string;
  surface: "session" | "public";
  publicUrl?: string;
}) {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [manageToken, setManageToken] = useState("");
  const [storageWarning, setStorageWarning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  async function publish() {
    if (busy) return;
    if (!publicationToken || !graph) {
      setError(unavailableReason || "This report is not ready to share.");
      setConfirming(false);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/disagreements/publish", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ report, graph, publicationToken }),
      });
      const data: unknown = await response.json();
      if (!response.ok) {
        const failure = PublicationErrorSchema.safeParse(data);
        setError(failure.success ? failure.data.error : "Could not publish. Please try again.");
        return;
      }
      const receipt = PublicationReceiptSchema.parse(data);
      const publishedSlug = receipt.url.slice("/d/".length);
      const absolute = new URL(receipt.url, window.location.origin).toString();
      setUrl(absolute);
      setSlug(publishedSlug);
      setManageToken(receipt.manageToken);
      setConfirming(false);
      try {
        window.localStorage.setItem(`argumend-manage:${publishedSlug}`, receipt.manageToken);
      } catch {
        // The report already exists. Retain delete access for this visit.
        setStorageWarning(true);
      }
      trackEvent({
        action: "disagreement_public_link_created",
        diagnosisPattern: report.diagnosis.pattern,
      });
    } catch {
      setError("Could not create a link. Please check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function copy(target: string) {
    setCopied(false);
    setCopyError(false);
    try {
      await copyTextToClipboard(target);
      setCopied(true);
      trackEvent({ action: "disagreement_share_clicked", platform: "copy", surface });
    } catch {
      setCopyError(true);
    }
  }

  const shareUrl = url;
  const tweet = shareUrl ? xIntentUrl(report, shareUrl) : "";

  return (
    <section className="space-y-4 border-t border-[var(--border-divider)] pt-8">
      <h2 className="font-serif text-[1.75rem] leading-tight text-[var(--text-heading)]">Share</h2>
      {surface === "session" && !shareUrl ? (
        confirming ? (
          // Publication is one of the report's few bordered panels: it is an
          // action with a consequence, so it earns a container.
          <div className="border border-[var(--border-divider)] bg-[var(--bg-paper)] p-5">
            <p className="text-sm leading-relaxed text-[var(--text-primary)]">
              The full submitted source is not saved. Short excerpts used to ground the analysis
              will appear on the public page, which anyone with the link can read.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={busy}
                onClick={publish}
                className="min-h-11 rounded-full bg-rust-600 px-5 font-sans font-medium text-white transition-colors hover:bg-rust-700 disabled:opacity-60"
              >
                Create unlisted link
              </button>
              <button
                type="button"
                disabled={busy}
                className="min-h-11 rounded-full border border-[var(--border-default)] px-5"
                onClick={() => setConfirming(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            disabled={busy}
            onClick={() => setConfirming(true)}
            className="min-h-11 rounded-full bg-rust-600 px-5 font-sans font-medium text-white transition-colors hover:bg-rust-700 disabled:opacity-60"
          >
            Create shareable link
          </button>
        )
      ) : null}
      {shareUrl && !deleted ? (
        <div className="flex flex-wrap gap-2">
          <button type="button" className="min-h-11 rounded-full border px-4" onClick={() => copy(shareUrl)}>
            Copy link
          </button>
          <a className="min-h-11 rounded-full border px-4 py-2" href={tweet} target="_blank" rel="noopener noreferrer">
            Share to X
          </a>
        </div>
      ) : null}
      {shareUrl && !deleted && storageWarning ? (
        <p className="text-sm text-error-text" role="alert">
          Your link was created, but this browser could not save your delete access.
          Keep this page open to delete the report.
        </p>
      ) : null}
      {shareUrl && !deleted ? (
        <>
          <p className="text-sm text-[var(--text-muted)]" role="status">{copied ? "Link copied." : ""}</p>
          {copyError ? (
            <div className="space-y-2">
              <p className="text-sm text-error-text" role="alert">Could not copy the link. Select and copy it below.</p>
              <input
                aria-label="Link to copy"
                readOnly
                value={shareUrl}
                onFocus={(event) => event.currentTarget.select()}
                className="min-h-11 w-full rounded border border-[var(--border-default)] bg-transparent px-3 text-sm"
              />
            </div>
          ) : null}
        </>
      ) : null}
      {shareUrl && slug ? (
        <DeleteReportControl slug={slug} manageToken={manageToken} onDeleted={() => setDeleted(true)} />
      ) : null}
      {error ? <p className="text-sm text-error-text" role="alert">{error}</p> : null}
    </section>
  );
}
