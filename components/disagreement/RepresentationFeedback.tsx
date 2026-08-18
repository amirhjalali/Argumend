"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

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
  const isAbuse = section === "abuse";

  if (!slug) return null;

  async function submit(nextVote: "accurate" | "mostly" | "inaccurate") {
    setVote(nextVote);
    const sessionId = sessionStorage.getItem("argumend-session") ?? crypto.randomUUID();
    sessionStorage.setItem("argumend-session", sessionId);
    await fetch(`/api/disagreements/${slug}/feedback`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        section,
        targetId,
        vote: nextVote,
        correction: nextVote === "accurate" ? undefined : correction,
        anonymousSessionId: sessionId,
      }),
    });
    trackEvent({
      action: "disagreement_feedback_submitted",
      section,
      vote: nextVote,
    });
    setStatus("Saved privately. Thank you.");
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
            className={`min-h-11 rounded-full border px-4 text-sm ${
              vote === value ? "border-[#3a6965] bg-[#3a6965] text-white" : "border-[var(--border-default)]"
            }`}
            onClick={() => submit(value as "accurate" | "mostly" | "inaccurate")}
          >
            {label}
          </button>
        ))}
      </div>
      {vote && vote !== "accurate" ? (
        <textarea
          value={correction}
          maxLength={2000}
          onChange={(event) => setCorrection(event.target.value)}
          className="w-full rounded-lg border border-[var(--border-default)] p-3 text-sm"
          placeholder="Optional correction"
        />
      ) : null}
      {status ? <p className="text-sm text-[var(--text-muted)]">{status}</p> : null}
    </div>
  );
}
