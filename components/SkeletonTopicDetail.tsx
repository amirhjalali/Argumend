/**
 * Full-page skeleton for the /topics/[id] detail page.
 *
 * Mirrors the actual TopicDetailView layout: breadcrumb, hero card with
 * pills/title/meta/stats, 30-second summary with verdict + pillar overview
 * cards + evidence balance bar, stance prompt, claim section, and pillar
 * deep-dive sections.
 */

import {
  Skeleton,
  SkeletonText,
  SkeletonBadge,
  SkeletonParagraph,
} from "@/components/Skeleton";

// ---------------------------------------------------------------------------
// Sub-components (private to this file)
// ---------------------------------------------------------------------------

function BreadcrumbSkeleton() {
  return (
    <div className="flex items-center gap-1.5 mb-6">
      <Skeleton className="h-4 w-14" />
      <Skeleton className="h-3.5 w-3.5" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-3.5 w-3.5" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

function HeroCardSkeleton() {
  return (
    <div className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
      {/* Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <SkeletonBadge width="w-20" />
        <SkeletonBadge width="w-24" />
        <SkeletonBadge width="w-28" />
      </div>

      {/* Title */}
      <Skeleton className="h-9 w-3/4 mb-4" />

      {/* Meta claim */}
      <div className="space-y-2 max-w-3xl mb-6">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>

      {/* Quick stats */}
      <div className="flex flex-wrap gap-4 pt-5 border-t border-stone-200/60">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="text-center">
            <Skeleton className="h-6 w-8 mx-auto mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ScanViewSkeleton() {
  return (
    <div className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
      <Skeleton className="h-3 w-32 mb-5" />

      {/* Verdict banner */}
      <div className="rounded-xl border border-stone-200/50 px-6 py-8 mb-8 flex justify-center">
        <div className="flex items-center gap-5">
          <Skeleton className="h-14 w-20" />
          <div className="space-y-2">
            <SkeletonBadge width="w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </div>

      {/* Pillar overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-stone-200/60 bg-white/60 p-4"
          >
            <div className="flex items-start gap-2.5 mb-2.5">
              <Skeleton className="w-7 h-7" radius="rounded-lg" />
              <Skeleton className="h-4 w-3/4 flex-1" />
            </div>
            <Skeleton className="h-3 w-full mb-1" />
            <Skeleton className="h-3 w-2/3 mb-3" />
            <div className="flex items-center justify-between">
              <SkeletonBadge width="w-16" className="h-4" />
              <Skeleton className="h-3.5 w-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Evidence balance bar */}
      <div className="mb-8">
        <Skeleton className="h-3 w-28 mb-3" />
        <Skeleton className="h-5 w-full" radius="rounded-full" />
      </div>
    </div>
  );
}

function StancePromptSkeleton() {
  return (
    <div className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
      <Skeleton className="h-6 w-48 mb-2.5 mx-auto" />
      <Skeleton className="h-4 w-72 mb-7 mx-auto" />
      <div className="flex flex-col md:flex-row gap-3">
        <Skeleton className="flex-1 h-12" radius="rounded-lg" />
        <Skeleton className="flex-1 h-12" radius="rounded-lg" />
        <Skeleton className="flex-1 h-12" radius="rounded-lg" />
      </div>
    </div>
  );
}

function ClaimSectionSkeleton() {
  return (
    <div className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
      <Skeleton className="h-7 w-28 mb-3" />
      <div className="border-l-2 border-stone-200 pl-4 sm:pl-5 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>
    </div>
  );
}

function PillarDeepDiveSkeleton() {
  return (
    <div className="mb-10">
      {/* Pillar header */}
      <div className="flex items-start gap-3 mb-4">
        <Skeleton className="w-8 h-8" radius="rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>

      {/* Skeptic vs Proponent */}
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="rounded-lg border border-stone-200/50 p-4 space-y-2">
          <Skeleton className="h-3 w-28" />
          <SkeletonText width="w-full" />
          <SkeletonText width="w-2/3" />
        </div>
        <div className="rounded-lg border border-stone-200/50 p-4 space-y-2">
          <Skeleton className="h-3 w-32" />
          <SkeletonText width="w-full" />
          <SkeletonText width="w-3/4" />
        </div>
      </div>

      {/* Evidence items */}
      <div className="space-y-3 mb-5">
        <Skeleton className="h-3 w-24" />
        {Array.from({ length: 2 }).map((_, j) => (
          <div
            key={j}
            className="rounded-lg border border-stone-200/50 p-4"
          >
            <div className="flex items-start gap-3">
              <Skeleton className="w-6 h-6" radius="rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Crux */}
      <div className="rounded-lg border border-stone-200/60 p-5 space-y-3">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function SkeletonTopicDetail() {
  return (
    <div className="min-h-screen bg-[#f4f1eb]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <BreadcrumbSkeleton />
        <HeroCardSkeleton />
        <ScanViewSkeleton />
        <StancePromptSkeleton />
        <ClaimSectionSkeleton />

        {/* Pillars section */}
        <div className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
          <Skeleton className="h-7 w-40 mb-6" />
          <Skeleton className="h-4 w-3/4 mb-8" />
          <PillarDeepDiveSkeleton />
          <PillarDeepDiveSkeleton />
        </div>
      </div>
    </div>
  );
}
