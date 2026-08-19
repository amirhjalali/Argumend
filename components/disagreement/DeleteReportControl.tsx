"use client";

import { useEffect, useState } from "react";

function manageTokenKey(slug: string) {
  return `argumend-manage:${slug}`;
}

/**
 * Renders "Delete public report" only when the visitor's browser holds a
 * management token for this slug in localStorage — i.e. only for the person
 * who published it. A random visitor never sees this control.
 */
export function DeleteReportControl({
  slug,
  onDeleted,
}: {
  slug: string;
  onDeleted?: () => void;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setToken(window.localStorage.getItem(manageTokenKey(slug)));
  }, [slug]);

  if (deleted) {
    return (
      <p className="text-sm text-[var(--text-muted)]" role="status">
        This public report has been deleted.
      </p>
    );
  }

  if (!token) return null;

  async function handleDelete() {
    if (
      !confirm(
        "Delete this public report? This cannot be undone and the shared link will stop working.",
      )
    ) {
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/disagreements/${slug}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error || "Could not delete this report. Please try again.");
        return;
      }
      window.localStorage.removeItem(manageTokenKey(slug));
      setDeleted(true);
      onDeleted?.();
    } catch {
      setError("Could not delete this report. Please check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={busy}
        onClick={handleDelete}
        className="min-h-11 rounded-full border border-[#a23b3b] px-4 text-sm text-[#a23b3b] disabled:opacity-60"
      >
        {busy ? "Deleting…" : "Delete public report"}
      </button>
      {error ? (
        <p className="text-sm text-[#a23b3b]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
