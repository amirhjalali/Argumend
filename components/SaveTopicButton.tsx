"use client";

import { Bookmark } from "lucide-react";

interface SaveTopicButtonProps {
  topicId: string;
}

export function SaveTopicButton({ topicId: _topicId }: SaveTopicButtonProps) {
  // Auth disabled — no SessionProvider, no login yet.
  return (
    <button
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border bg-white/80 dark:bg-[#252420]/80 text-stone-400 border-stone-200/60 dark:border-[var(--border-default)] opacity-50 cursor-default"
      aria-label="Save topic (sign in required)"
      disabled
    >
      <Bookmark className="h-4 w-4" strokeWidth={1.8} />
      <span className="hidden sm:inline">Save</span>
    </button>
  );
}
