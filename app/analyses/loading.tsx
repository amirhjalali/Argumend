import {
  Skeleton,
  SkeletonBadge,
  SkeletonButton,
  SkeletonIcon,
} from "@/components/Skeleton";

export default function AnalysesListingLoading() {
  return (
    <div className="min-h-full">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-14 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <SkeletonBadge width="w-36" />
          </div>
          <Skeleton className="h-10 w-64 mx-auto" />
          <div className="space-y-2 max-w-lg mx-auto">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4 mx-auto" />
          </div>
        </div>

        {/* CTA button */}
        <div className="flex justify-center">
          <SkeletonButton width="w-44" className="h-12" />
        </div>

        {/* Analysis items */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/80 border border-stone-200/60 rounded-xl p-5 md:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  {/* Summary */}
                  <div className="space-y-1.5 mb-3">
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-5/6" />
                  </div>
                  {/* Confidence bar */}
                  <div className="flex items-center gap-3 mb-3">
                    <Skeleton className="h-1.5 w-[120px]" radius="rounded-full" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  {/* Meta row */}
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-3 w-24" />
                    <SkeletonBadge width="w-16" className="h-4" />
                  </div>
                </div>
                <SkeletonIcon className="mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
