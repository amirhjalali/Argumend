"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { topicSummaries } from "@/data/topicIndex";

interface TrendingTopic {
  topicId: string;
  viewCount: number;
}

export function TrendingTopics() {
  const [trending, setTrending] = useState<TrendingTopic[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchTrending() {
      try {
        const res = await fetch("/api/topic-views?limit=10");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && Array.isArray(data.trending)) {
          setTrending(data.trending);
        }
      } catch {
        // Silently fail — trending is non-critical
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTrending();
    return () => {
      cancelled = true;
    };
  }, []);

  // Build a lookup from topicId -> title
  const titleMap = new Map(
    topicSummaries.map((t) => [t.id, t.title])
  );

  // Filter to only topics that exist in our topics data
  const validTrending = trending.filter((t) => titleMap.has(t.topicId));

  // Don't render section if no trending data
  if (!loading && validTrending.length === 0) return null;

  return (
    <div className="pb-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="label-caps flex w-full items-center gap-2 rounded-md px-3 py-2.5 min-h-11 text-[0.9375rem] hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
        )}
        <span>Most read this week</span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          {loading ? (
            <div className="space-y-2 px-3 py-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 rounded-md bg-stone-100 dark:bg-[var(--bg-muted)] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <ul className="mt-0.5 space-y-0.5 pl-3">
              {validTrending.slice(0, 10).map((item, idx) => {
                const title = titleMap.get(item.topicId) ?? item.topicId;

                // A reading list, not a leaderboard: no flames, no rust on the
                // top three, and no raw view counts. Heat is the thing the
                // site is trying to cool (docs/plans/2026-09-22-north-star.md).
                return (
                  <li key={item.topicId}>
                    <Link
                      href={`/topics/${item.topicId}`}
                      prefetch={false}
                      tabIndex={isOpen ? 0 : -1}
                      className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 min-h-11 text-[13px] text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50/50 dark:hover:bg-subtle/50 transition-colors"
                    >
                      <span className="flex-shrink-0 w-4 text-right text-[11px] tabular-nums text-muted dark:text-stone-400">
                        {idx + 1}
                      </span>

                      <span className="font-serif flex-1 truncate">
                        {title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
