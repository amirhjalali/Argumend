"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ExchangeCard({
  topic,
  insight,
  lesson,
  children,
}: {
  topic: string;
  insight: string;
  lesson: string;
  children: ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = useId();

  return (
    <div className="bg-white/80 dark:bg-[#252420]/80 rounded-xl border border-[#e8e0d4] dark:border-[#3d3a36] overflow-hidden hover:shadow-md transition-all duration-200">
      <button
        type="button"
        onClick={() => setIsExpanded((expanded) => !expanded)}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className="w-full p-5 text-left hover:bg-[#faf8f5] dark:hover:bg-[#302e2a] transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-deep bg-[#4f7b77]/10 px-2 py-0.5 rounded-full">
                {topic}
              </span>
            </div>
            <h3 className="font-serif text-lg text-primary dark:text-stone-200 mb-1">
              {insight}
            </h3>
            <p className="text-sm text-secondary dark:text-stone-400 line-clamp-2">
              {lesson}
            </p>
          </div>
          <div className="flex-shrink-0 p-2 rounded-lg bg-[#f5f1ea] dark:bg-[#302e2a] border border-[#e8e0d4] dark:border-[#3d3a36]">
            {isExpanded ? (
              <ChevronUp aria-hidden="true" className="h-4 w-4 text-secondary dark:text-stone-400" />
            ) : (
              <ChevronDown aria-hidden="true" className="h-4 w-4 text-secondary dark:text-stone-400" />
            )}
          </div>
        </div>
      </button>

      <div
        id={contentId}
        hidden={!isExpanded}
        className="border-t border-[#e8e0d4] dark:border-[#3d3a36]"
      >
        {children}
      </div>
    </div>
  );
}
