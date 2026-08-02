"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Code, Copy, Check, X } from "lucide-react";
import { copyTextToClipboard } from "@/lib/copyToClipboard";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";

interface EmbedButtonProps {
  topicId: string;
}

export function EmbedButton({ topicId }: EmbedButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const embedCode = `<iframe src="https://argumend.org/embed/${encodeURIComponent(topicId)}" width="100%" height="400" frameborder="0" style="border:none;border-radius:8px;" loading="lazy" title="ARGUMEND argument summary"></iframe>`;

  const close = useCallback(() => {
    setOpen(false);
    setCopied(false);
    setCopyError(null);
  }, []);

  const dialogRef = useModalAccessibility<HTMLDivElement>({
    isOpen: open,
    onClose: close,
  });

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, close]);

  const handleCopy = async () => {
    try {
      await copyTextToClipboard(embedCode);
      setCopyError(null);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError("The embed code could not be copied. Select and copy it manually.");
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button
        type="button"
        onClick={() => {
          setCopyError(null);
          setOpen((value) => !value);
        }}
        className="inline-flex items-center justify-center h-11 w-11 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-[var(--bg-overlay)] transition-colors"
        aria-label="Embed this topic"
        aria-expanded={open}
        aria-controls="topic-embed-dialog"
        title="Embed"
      >
        <Code className="h-4 w-4" />
      </button>

      {open && (
        <div
          ref={dialogRef}
          id="topic-embed-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="topic-embed-title"
          tabIndex={-1}
          className="fixed inset-x-4 top-20 z-50 mx-auto max-h-[calc(100svh-6rem)] w-auto max-w-[400px] overflow-y-auto rounded-lg border border-stone-200 dark:border-[var(--border-default)] bg-white dark:bg-[var(--bg-card)] shadow-lw p-4 animate-in fade-in slide-in-from-top-1 sm:absolute sm:inset-x-auto sm:left-0 sm:top-full sm:mt-2 sm:w-[400px] sm:max-w-[calc(100vw-2rem)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 id="topic-embed-title" className="text-sm font-semibold text-primary dark:text-stone-200">
              Embed this topic
            </h3>
            <button
              type="button"
              onClick={close}
              data-modal-initial-focus
              className="inline-flex items-center justify-center h-6 w-6 rounded text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-[var(--bg-overlay)] transition-colors"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
            Copy the code below to embed this argument summary on your website or blog.
          </p>

          {/* Code block */}
          <div className="relative rounded-md bg-stone-50 dark:bg-[var(--bg-muted)] border border-stone-200 dark:border-[var(--border-default)] p-3">
            <pre className="text-[11px] leading-relaxed text-stone-600 dark:text-[#b0a99f] font-mono whitespace-pre-wrap break-all select-all">
              {embedCode}
            </pre>
          </div>

          {/* Copy button */}
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Embed code copied" : "Copy embed code"}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 h-9 rounded-md bg-deep text-white text-xs font-medium hover:bg-deep-dark transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy embed code
              </>
            )}
          </button>

          {copyError && (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"
            >
              {copyError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
