/**
 * Skeleton that mirrors the topic card layout on /topics.
 *
 * Matches: serif title, meta-claim text, confidence bar, category/status
 * pills, and pillar count. Uses the same border-t-[3px] + rounded-xl card
 * structure for minimal CLS.
 */

import {
  Skeleton,
  SkeletonText,
  SkeletonBadge,
} from "@/components/Skeleton";

export function SkeletonTopicCard() {
  return (
    <div className="flex flex-col bg-white dark:bg-[var(--bg-card)] border border-stone-200/60 dark:border-[var(--border-default)] border-t-[3px] border-t-stone-200 dark:border-t-stone-700 rounded-xl p-5 pb-4">
      {/* Title (serif placeholder) */}
      <Skeleton className="h-5 w-3/4 mb-3" />

      {/* Meta claim — 2 lines */}
      <div className="space-y-1.5 mb-4 flex-1">
        <SkeletonText width="w-full" />
        <SkeletonText width="w-5/6" />
      </div>

      {/* Confidence bar */}
      <div className="flex items-center gap-2.5 mb-3">
        <Skeleton className="h-1.5 flex-1" radius="rounded-full" />
        <Skeleton className="h-4 w-10" />
      </div>

      {/* Footer: pills + pillar count */}
      <div className="flex items-center justify-between gap-2 pt-3 mt-auto border-t border-stone-100 dark:border-stone-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <SkeletonBadge width="w-16" className="h-5" />
          <SkeletonBadge width="w-20" className="h-5" />
        </div>
        <Skeleton className="h-3 w-14" />
      </div>
    </div>
  );
}
