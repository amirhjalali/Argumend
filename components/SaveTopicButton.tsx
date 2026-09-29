"use client";

import { useCallback, useId, useState } from "react";
import { Bookmark } from "lucide-react";

import { useSavedTopics } from "@/hooks/useSavedTopics";
import { buttonClasses } from "@/components/ui";

interface SaveTopicButtonProps {
  topicId: string;
  /** Show the text label at every width (topic-page action row). */
  labelled?: boolean;
}

export function SaveTopicButton({ topicId, labelled = false }: SaveTopicButtonProps) {
  const { saved, hydrated, error, toggle } = useSavedTopics(topicId);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const statusId = useId();
  const accountSavingEnabled =
    process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";
  const message = error ?? syncError;
  const label = !hydrated
    ? "Loading saved state"
    : error
      ? "Retry saving this map"
      : saved
        ? "Remove this map from saved"
        : "Save this map on this device";

  const handleToggle = useCallback(async () => {
    const nextSaved = toggle();
    if (nextSaved === null || !accountSavingEnabled) return;

    setSyncing(true);
    setSyncError(null);
    const unavailableMessage = nextSaved
      ? "Saved on this device, but account sync is temporarily unavailable."
      : "Removed on this device, but account sync is temporarily unavailable.";
    try {
      const response = await fetch("/api/saved-topics", {
        method: nextSaved ? "POST" : "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ topicId }),
      });

      // Signed-out visitors still keep the successful device-local bookmark.
      if (response.status === 401) return;
      if (!response.ok) {
        setSyncError(unavailableMessage);
      }
    } catch {
      setSyncError(unavailableMessage);
    } finally {
      setSyncing(false);
    }
  }, [accountSavingEnabled, toggle, topicId]);

  return (
    <span className="inline-flex items-center">
      <button
        type="button"
        onClick={handleToggle}
        disabled={!hydrated || syncing}
        aria-busy={!hydrated || syncing || undefined}
        aria-pressed={hydrated ? saved : undefined}
        aria-label={label}
        aria-describedby={message ? statusId : undefined}
        className={labelled
          ? buttonClasses({
              variant: "secondary",
              className: `!px-4 disabled:cursor-wait ${saved ? "!border-deep/50 text-deep dark:text-accent-text" : ""}`,
            })
          : `inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[var(--bg-card)] disabled:cursor-wait disabled:opacity-60 ${
          saved
            ? "bg-[#b05434] text-white border-[#b05434] hover:bg-[#8b3f27] hover:border-[#8b3f27]"
            : error
              ? "border-error/30 bg-error/[0.06] text-error-text hover:bg-error/10 dark:border-error/40 dark:bg-error/10"
              : "bg-white/80 dark:bg-card/80 text-secondary dark:text-stone-400 border-stone-200/60 dark:border-[var(--border-default)] hover:text-primary dark:hover:text-stone-200 hover:border-stone-300/80"
        }`}
      >
        <Bookmark
          className="h-4 w-4"
          strokeWidth={1.8}
          fill={saved ? "currentColor" : "none"}
          aria-hidden="true"
        />
        <span className={labelled ? undefined : "hidden sm:inline"}>
          {!hydrated
            ? "Loading…"
            : syncing
              ? "Syncing…"
              : error
                ? "Retry save"
                : saved
                  ? "Saved"
                  : "Save"}
        </span>
      </button>
      {message && (
        <span id={statusId} role="alert" className="sr-only">
          {message}
        </span>
      )}
    </span>
  );
}
