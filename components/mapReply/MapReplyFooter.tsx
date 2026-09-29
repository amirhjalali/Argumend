"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button, TextAction } from "@/components/ui";
import { copyTextToClipboard } from "@/lib/copyToClipboard";
import type { MapReplyExecution } from "@/lib/mapReply/types";

/**
 * The reply as a thing you can take away. The copied text names nobody and
 * carries no score (lib/mapReply/render.ts).
 *
 * The receipt for how it was made, `ExecutionNote`, sits under "How this was
 * read". It is not developer trivia: it prints the number of direct
 * identifiers stripped before anything left the browser, which is the only
 * evidence a reader has that the consent line above the paste box meant what
 * it said, and it names the lane, so a fixture answer can never be mistaken
 * for a model's reading.
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
  onReset,
}: {
  markdown: string;
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
        <Button onClick={copy}>
          {copied ? (
            <Check aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Copy aria-hidden="true" className="h-4 w-4" />
          )}
          {copied ? "Copied" : "Copy reply"}
        </Button>
        <TextAction onClick={onReset}>Map another thread</TextAction>
      </div>

      <p aria-live="polite" className="sr-only">
        {copied ? "Reply copied to the clipboard" : ""}
      </p>
      {copyFailed ? (
        <p className="font-sans text-sm text-error-text" role="status">
          The clipboard was not available. Select the reply and copy it manually.
        </p>
      ) : null}
    </div>
  );
}

/** The execution receipt, for "How this was read". */
export function ExecutionNote({ execution }: { execution: MapReplyExecution }) {
  return (
    <p>
      {executionSummary(execution)}
      {execution.lane === "fake" ? ". Fixtures, not a live model." : "."}
    </p>
  );
}
