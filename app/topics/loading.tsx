import { Skeleton, SkeletonText } from "@/components/Skeleton";
import { SkeletonTopicCard } from "@/components/SkeletonTopicCard";

const CATEGORY_TAB_WIDTHS = [60, 95, 110, 85, 105, 90];

export default function TopicsListLoading() {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <Skeleton className="h-10 w-56 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORY_TAB_WIDTHS.map((width, i) => (
            <Skeleton
              key={i}
              className="h-8"
              radius="rounded-full"
              style={{ width }}
            />
          ))}
        </div>

        {/* Search + Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Skeleton className="w-full h-10" radius="rounded-lg" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-10 w-40" radius="rounded-lg" />
          </div>
        </div>

        {/* Results info */}
        <div className="flex items-center justify-between mb-5">
          <SkeletonText width="w-40" />
        </div>

        {/* Topic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <SkeletonTopicCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
