"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { EXAMPLE_ANALYSIS_TEXT } from "@/lib/constants";

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
    sessionStorage.setItem(
      "argumend-analyze-prefill",
      JSON.stringify({ content, contentType })
    );
    router.push("/analyze");
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

  return (
    <div className="px-4 md:px-8 py-10 bg-stone-50/50 dark:bg-[#1a1917]/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-xl font-semibold text-primary mb-1">
          Have your own argument?
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
          Paste any text and we&apos;ll map it
        </p>

        <div className="bg-white dark:bg-[#252420] rounded-xl border border-stone-200/60 dark:border-[#3d3a36] p-4 shadow-sm">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste an article, argument, or any text you'd like analyzed..."
            aria-label="Text to analyze"
            className="w-full min-h-[80px] p-3 bg-[#faf8f5] dark:bg-[#1a1917] border border-stone-200/60 dark:border-[#3d3a36] rounded-lg text-stone-700 dark:text-stone-200 text-sm leading-relaxed placeholder-stone-500/70 dark:placeholder-stone-500 resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-deep/20 focus:border-deep/40"
          />

          <div className="flex items-center justify-end mt-3 gap-2">
            <button
              onClick={handleTryExample}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-deep hover:bg-deep/5 transition-all"
            >
              Try an Example
            </button>
            <button
              onClick={handleAnalyze}
              disabled={!content.trim()}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif font-semibold text-sm transition-all duration-200 ${
                content.trim()
                  ? "bg-gradient-to-r from-rust-500 to-rust-600 text-white shadow-md hover:shadow-lg hover:from-rust-600 hover:to-rust-700"
                  : "bg-stone-100 dark:bg-[#302e2a] text-stone-400 cursor-not-allowed"
              }`}
            >
              Analyze
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
