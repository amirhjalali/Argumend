"use client";

import { Bookmark } from "lucide-react";

import { useSavedTopics } from "@/hooks/useSavedTopics";

interface SaveTopicButtonProps {
  topicId: string;
}

export function SaveTopicButton({ topicId }: SaveTopicButtonProps) {
  const { saved, toggle } = useSavedTopics(topicId);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? "Remove topic from saved" : "Save topic"}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
        saved
          ? "bg-[#C4613C] text-white border-[#C4613C] hover:bg-[#b05434] hover:border-[#b05434]"
          : "bg-white/80 dark:bg-[#252420]/80 text-secondary border-stone-200/60 dark:border-[var(--border-default)] hover:text-primary hover:border-stone-300/80"
      }`}
    >
      <Bookmark
        className="h-4 w-4"
        strokeWidth={1.8}
        fill={saved ? "currentColor" : "none"}
      />
      <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
    </button>
  );
}
