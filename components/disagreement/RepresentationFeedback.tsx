"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";
import { DISAGREEMENT_LIMITS } from "@/lib/disagreement/constants";

const FeedbackResponseSchema = z.object({ ok: z.literal(true) });

export function RepresentationFeedback({
  slug,
  section,
  targetId,
}: {
  slug?: string;
  section: "overall" | "position" | "common-ground" | "crux" | "abuse";
  targetId?: string;
}) {
  const [vote, setVote] = useState<"accurate" | "mostly" | "inaccurate" | null>(null);
  const [correction, setCorrection] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);
  const anonymousSession = useRef<string | null>(null);
  const isAbuse = section === "abuse";

  if (!slug) return null;

  async function submit(nextVote: "accurate" | "mostly" | "inaccurate") {
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true);
    setVote(nextVote);
    setStatus("");
    setError("");
    try {
      if (!anonymousSession.current) {
        try {
          anonymousSession.current = window.sessionStorage.getItem("argumend-session");
        } catch {
          // Feedback can still use an anonymous identity for this visit.
        }
        anonymousSession.current ??= crypto.randomUUID();
        try {
          window.sessionStorage.setItem("argumend-session", anonymousSession.current);
        } catch {
          // Retain the identity in memory when this browser refuses storage.
        }
      }
      const response = await fetch(`/api/disagreements/${slug}/feedback`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          section,
          targetId,
          vote: nextVote,
          correction: nextVote === "accurate" ? undefined : correction,
          anonymousSessionId: anonymousSession.current,
        }),
      });
      if (!response.ok || !FeedbackResponseSchema.safeParse(await response.json()).success) {
        throw new Error("Feedback was not confirmed");
      }
      trackEvent({
        action: "disagreement_feedback_submitted",
        section,
        vote: nextVote,
      });
      setStatus("Saved privately. Thank you.");
    } catch {
      setError("Could not save your feedback. Please try again.");
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  return (
    <div className="mt-3 space-y-2">
      <p className="text-sm font-medium">
        {isAbuse ? "Report this analysis" : "Is this an accurate representation?"}
      </p>
      <div className="flex flex-wrap gap-2">
        {(isAbuse
          ? ([["inaccurate", "Report"]] as const)
          : ([
              ["accurate", "Yes"],
              ["mostly", "Mostly"],
              ["inaccurate", "No"],
            ] as const)
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            disabled={busy}
            aria-pressed={vote === value}
            className={`min-h-11 rounded-full border px-4 text-sm ${
              vote === value ? "border-[#3a6965] bg-[#3a6965] text-white" : "border-[var(--border-default)]"
            }`}
            onClick={() => submit(value)}
          >
            {label}
          </button>
        ))}
      </div>
      {vote && vote !== "accurate" ? (
        <div className="space-y-2">
          <textarea
            value={correction}
            maxLength={DISAGREEMENT_LIMITS.maxCorrectionCharacters}
            disabled={busy}
            aria-label="Optional correction"
            onChange={(event) => {
              setCorrection(event.target.value);
              setStatus("");
              setError("");
            }}
            className="w-full rounded-lg border border-[var(--border-default)] p-3 text-sm"
            placeholder="Optional correction"
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => submit(vote)}
            className="min-h-11 rounded-full border border-[var(--border-default)] px-4 text-sm disabled:opacity-60"
          >
            Save correction
          </button>
        </div>
      ) : null}
      <p className="text-sm text-[var(--text-muted)]" role="status">
        {busy ? "Saving feedback…" : status}
      </p>
      {error ? <p className="text-sm text-error-text" role="alert">{error}</p> : null}
    </div>
  );
}
