"use client";

/**
 * Save · Share · Embed, labelled, in one row (phone) or one column (the
 * desktop rail). Embed only appears for maps /embed can serve.
 */
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Share2 } from "lucide-react";
import { SaveTopicButton } from "@/components/SaveTopicButton";
import { EmbedButton } from "@/components/EmbedButton";
import { ShareButtons } from "@/components/ShareButtons";
import { Button } from "@/components/ui";

function subscribeNothing() {
  return () => {};
}

export function TopicActions({
  topicId,
  title,
  url,
  embeddable,
  stacked = false,
}: {
  topicId: string;
  title: string;
  url: string;
  embeddable: boolean;
  stacked?: boolean;
}) {
  return (
    <div
      role="group"
      aria-label="Save, share or embed this map"
      className={stacked ? "flex flex-col items-start gap-2" : "flex flex-wrap items-center gap-2"}
    >
      <SaveTopicButton topicId={topicId} labelled />
      <ShareTopicButton title={title} url={url} align={stacked ? "right" : "left"} />
      {embeddable && <EmbedButton topicId={topicId} labelled align={stacked ? "right" : "left"} />}
    </div>
  );
}

/**
 * "Share": the phone's own share sheet where there is one, otherwise a small
 * panel with copy-link and the post links (ShareButtons, without any verdict
 * text in the post).
 */
export function ShareTopicButton({
  title,
  url,
  align = "left",
}: {
  title: string;
  url: string;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const canShare = useSyncExternalStore(
    subscribeNothing,
    () => typeof navigator !== "undefined" && typeof navigator.share === "function",
    () => false,
  );

  const onClick = useCallback(async () => {
    if (canShare) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Cancelled or refused: fall through to the panel.
      }
    }
    setOpen((value) => !value);
  }, [canShare, title, url]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      <Button
        variant="secondary"
        onClick={onClick}
        aria-expanded={canShare ? undefined : open}
        className="!px-4"
      >
        <Share2 className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
        Share
      </Button>
      {open && (
        <div
          role="group"
          aria-label="Share this map"
          className={`absolute top-full z-40 mt-2 rounded-lg border border-stone-200 bg-white p-1.5 shadow-lg dark:border-[var(--border-default)] dark:bg-[var(--bg-card)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <ShareButtons title={title} url={url} />
        </div>
      )}
    </div>
  );
}
