"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { EXAMPLE_ANALYSIS_TEXT } from "@/lib/constants";
import { ANALYZE_HREF } from "@/lib/nav";
import { PASTE_PREFILL_KEY } from "@/lib/paste/handoff";
import { PAGE_GUTTER } from "@/components/ui/PageContainer";

interface HeroAnalyzeProps {
  onTopicSelect: (id: string) => void;
}

export function HeroAnalyze({ onTopicSelect: _onTopicSelect }: HeroAnalyzeProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [contentType] = useState("freeform");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAnalyze = useCallback(() => {
    if (!content.trim()) return;
    // /analyze reads this once and, when nothing leaves the server, submits
    // it straight away (lib/paste/handoff.ts): one press, not two.
    sessionStorage.setItem(PASTE_PREFILL_KEY, JSON.stringify({ content, contentType }));
    // The canonical paste tool is chosen in one place: lib/nav.ts.
    router.push(ANALYZE_HREF);
  }, [content, contentType, router]);

  const handleTryExample = useCallback(() => {
    setContent(EXAMPLE_ANALYSIS_TEXT);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && content.trim()) {
        handleAnalyze();
      }
    },
    [content, handleAnalyze]
  );

  const ready = content.trim().length > 0;

  // Same left edge, rule and heading scale as the other home sections. The
  // submit button is ink rather than rust: the page keeps rust for its one
  // primary action (opening the featured map), and a second rust button this
  // far down competed with it.
  return (
    <section aria-labelledby="home-paste-heading" className={`mx-auto max-w-5xl ${PAGE_GUTTER}`}>
      <div className="grid gap-8 border-t border-stone-300/70 py-14 dark:border-divider md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-12 md:py-20">
        <div>
          <h2
            id="home-paste-heading"
            className="text-balance font-serif text-[2rem] leading-[1.08] tracking-[-0.01em] text-primary dark:text-stone-200 md:text-[2.5rem]"
          >
            Bring your own argument
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-secondary dark:text-stone-400">
            Paste an article, a thread, or your own draft. See which map it is already on,
            the question it turns on, and the strongest evidence on each side.
          </p>
        </div>

        <div>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste text here"
            aria-label="Text to analyze"
            rows={6}
            className="block min-h-[9rem] w-full resize-y rounded-lg border border-stone-300/80 bg-card px-4 py-3 text-base leading-relaxed text-primary dark:text-stone-200 placeholder:text-muted/80 transition-colors focus:border-deep/50 sm:text-[0.9375rem] focus:outline-none focus:ring-2 focus:ring-deep/20 dark:border-divider dark:placeholder:text-stone-500"
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleTryExample}
              className="inline-flex min-h-11 items-center rounded-lg text-sm font-medium text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-[#8bb5b1] dark:decoration-[#8bb5b1]/40"
            >
              Try an example
            </button>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!ready}
              className={`inline-flex min-h-11 items-center rounded-lg px-5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                ready
                  ? "bg-primary text-canvas hover:bg-primary/90"
                  : "cursor-not-allowed border border-stone-300/80 text-muted dark:border-divider dark:text-stone-500"
              }`}
            >
              Find what it turns on
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
