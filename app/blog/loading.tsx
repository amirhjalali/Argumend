import {
  Skeleton,
  SkeletonBadge,
  SkeletonParagraph,
} from "@/components/Skeleton";

function BlogCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={`bg-[#faf8f5] rounded-xl border border-stone-200/60 ${
        featured ? "p-6 md:p-10 mb-6 md:mb-8" : "p-6 md:p-8"
      }`}
    >
      {/* Category + date row */}
      <div className="flex items-center gap-3 mb-4">
        <SkeletonBadge width={featured ? "w-24" : "w-20"} />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Title */}
      <Skeleton className={`${featured ? "h-8 w-3/4" : "h-6 w-5/6"} mb-3`} />

      {/* Description */}
      <div className="space-y-2 mb-5">
        <Skeleton className="h-4 w-full max-w-2xl" />
        <Skeleton className="h-4 w-2/3 max-w-2xl" />
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-5 w-16"
            radius="rounded-md"
          />
        ))}
      </div>

      {/* Read more */}
      <Skeleton className="h-4 w-24" />
    </div>
  );
}

export default function BlogListingLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#faf8f5]/60 border-b border-[#e8e0d4]">
        <div className="mx-auto max-w-4xl px-4 md:px-8 py-10 md:py-16">
          <Skeleton className="h-3 w-28 mb-4" />
          <Skeleton className="h-10 w-72 mb-4" />
          <SkeletonParagraph lines={2} className="max-w-xl" />
        </div>
      </div>

      {/* Article Grid */}
      <div className="mx-auto max-w-4xl px-4 md:px-8 py-8 md:py-12">
        {/* Featured Article */}
        <BlogCardSkeleton featured />

        {/* Remaining Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
