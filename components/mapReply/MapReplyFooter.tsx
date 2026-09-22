"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyTextToClipboard } from "@/lib/copyToClipboard";
import type { MapReplyExecution } from "@/lib/mapReply/types";

/**
 * The reply as a thing you can take away, and the receipt for how it was made.
 *
 * The execution line is not developer trivia: it prints the number of direct
 * identifiers stripped before anything left the browser, which is the only
 * evidence a reader has that the consent line above the paste box meant what
 * it said. It also names the lane, so a fixture answer can never be mistaken
 * for a model's judgement.
 */

export function executionSummary(execution: MapReplyExecution): string {
  const { emails, phones, handles } = execution.redactions;
  const removed = emails + phones + handles;
  const requests = `${execution.requests} request${execution.requests === 1 ? "" : "s"}`;
  const identifiers = `${removed} identifier${removed === 1 ? "" : "s"} removed`;
  return `${requests}, ${execution.timings.totalMs} ms, model ${execution.model}, ${identifiers}`;
}

export function MapReplyFooter({
  markdown,
  execution,
  onReset,
}: {
  markdown: string;
  execution: MapReplyExecution;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    setCopyFailed(false);
    try {
      await copyTextToClipboard(markdown);
      setCopied(true);
    } catch {
      setCopyFailed(true);
    }
  }

  return (
    <div className="space-y-3 border-t border-[var(--border-divider)] pt-8">
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={copy}
          className="btn-lift inline-flex min-h-11 items-center gap-2 rounded-full bg-rust-500 px-5 font-sans text-sm font-medium text-white transition-colors hover:bg-rust-600"
        >
          {copied ? (
            <Check aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Copy aria-hidden="true" className="h-4 w-4" />
          )}
          {copied ? "Copied" : "Copy reply"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-11 items-center rounded-md font-sans text-sm text-deep underline underline-offset-2 hover:text-deep-dark dark:text-deep-light dark:hover:text-stone-200"
        >
          Map another thread
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {copied ? "Reply copied to the clipboard" : ""}
      </p>
      {copyFailed ? (
        <p className="font-sans text-sm text-crux dark:text-crux-light" role="status">
          The clipboard was not available. Select the reply and copy it manually.
        </p>
      ) : null}

      <p className="font-sans text-xs text-[var(--text-muted)]">
        {executionSummary(execution)}{" "}
        {execution.lane === "fake" ? (
          <span className="whitespace-nowrap rounded-full border border-[var(--border-default)] px-2 py-0.5">
            fixtures, not a live model
          </span>
        ) : null}
      </p>
    </div>
  );
}
