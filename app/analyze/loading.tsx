import {
  Skeleton,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
} from "@/components/Skeleton";

export default function AnalyzePageLoading() {
  return (
    <div className="min-h-full">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <SkeletonBadge width="w-36" />
          </div>
          <Skeleton className="h-8 w-56 mx-auto" />
          <div className="space-y-2 max-w-lg mx-auto">
            <SkeletonText width="w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
        </div>

        {/* Content Type Selector */}
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20" radius="rounded-md" />
          ))}
        </div>

        {/* Text Input Card */}
        <div className="bg-white rounded-2xl border border-stone-200/60 p-4 md:p-5 shadow-sm">
          {/* Label row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <SkeletonText width="w-32" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-24" radius="rounded-md" />
              <Skeleton className="h-7 w-16" radius="rounded-md" />
            </div>
          </div>

          {/* Textarea skeleton */}
          <Skeleton className="w-full h-48 md:h-56 bg-stone-100/80 border border-stone-200/60" radius="rounded-xl" />

          {/* Privacy note */}
          <Skeleton className="h-3 w-64 mt-1.5" />

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-3">
            <Skeleton className="h-3 w-20" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center">
          <SkeletonButton width="w-44" className="h-12" />
        </div>
      </div>
    </div>
  );
}
