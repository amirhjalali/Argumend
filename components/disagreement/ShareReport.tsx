"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { ArgumentGraph } from "@/types/argument";
import type { DisagreementReportV1 } from "@/types/disagreement";
import { DeleteReportControl } from "./DeleteReportControl";

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

  async function publish() {
    if (!publicationToken || !graph) {
      setError(unavailableReason || "This report is not ready to share.");
      setConfirming(false);
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/disagreements/publish", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ report, graph, publicationToken }),
      });
      const data = (await response.json()) as { url?: string; manageToken?: string; error?: string };
      if (!response.ok || !data.url) {
        setError(data.error || "Could not publish.");
        return;
      }
      const absolute = new URL(data.url, window.location.origin).toString();
      setUrl(absolute);
      setSlug(data.url.replace("/d/", ""));
      setConfirming(false);
      if (data.manageToken) {
        localStorage.setItem(`argumend-manage:${data.url.replace("/d/", "")}`, data.manageToken);
      }
      trackEvent({
        action: "disagreement_public_link_created",
        diagnosisPattern: report.diagnosis.pattern,
      });
    } finally {
      setBusy(false);
    }
  }

  async function copy(target: string) {
    await navigator.clipboard.writeText(target);
    trackEvent({ action: "disagreement_share_clicked", platform: "copy", surface });
  }

  const shareUrl = url;
  const tweet = shareUrl ? xIntentUrl(report, shareUrl) : "";

  return (
    <section className="space-y-4 border-t border-[var(--border-divider)] pt-8">
      <h2 className="font-serif text-2xl">Share</h2>
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
                className="min-h-11 rounded-full bg-[#C4613C] px-5 text-white disabled:opacity-60"
              >
                Create unlisted link
              </button>
              <button
                type="button"
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
            className="min-h-11 rounded-full bg-[#C4613C] px-5 text-white disabled:opacity-60"
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
      {shareUrl && slug ? (
        <DeleteReportControl slug={slug} onDeleted={() => setDeleted(true)} />
      ) : null}
      {error ? <p className="text-sm text-[#a23b3b]">{error}</p> : null}
    </section>
  );
}
