import {
  Skeleton,
  SkeletonBadge,
  SkeletonIcon,
} from "@/components/Skeleton";

export default function AnalysisDetailLoading() {
  return (
    <div className="min-h-full">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3.5 w-3.5" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <SkeletonBadge width="w-32" />
          </div>
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <div className="space-y-2 max-w-xl mx-auto">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5 mx-auto" />
          </div>
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-7 w-40" radius="rounded-lg" />
          </div>
        </div>

        {/* Side Strength Meters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 p-3 rounded-xl border border-stone-200/60 bg-stone-50"
            >
              <div className="flex items-center justify-between mb-1.5">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-6 w-10" />
              </div>
              <Skeleton className="h-2 w-full" radius="rounded-full" />
              <Skeleton className="h-2.5 w-20 mt-1" />
            </div>
          ))}
        </div>

        {/* Share buttons */}
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24" radius="rounded-lg" />
          ))}
        </div>

        {/* Positions */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-40" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-200/80 border-l-4 border-l-stone-300 p-3 md:p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SkeletonBadge width="w-16" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <SkeletonIcon />
              </div>
            </div>
          ))}
        </div>

        {/* Cruxes */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-64" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="p-3 md:p-4 rounded-xl border border-stone-200/60"
            >
              <div className="flex items-start gap-3">
                <SkeletonIcon className="flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fallacies */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-52" />
          <div className="p-3 md:p-4 rounded-xl border border-stone-200/60">
            <div className="flex items-start gap-3">
              <SkeletonIcon className="flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Related Topics */}
        <div className="pt-8 border-t border-stone-200/60 space-y-4">
          <Skeleton className="h-5 w-32" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-stone-200/80 rounded-xl p-4 space-y-2"
              >
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <SkeletonBadge width="w-24" className="h-5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
