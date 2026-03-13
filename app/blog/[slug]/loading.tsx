import {
  Skeleton,
  SkeletonBadge,
  SkeletonParagraph,
} from "@/components/Skeleton";

export default function BlogArticleLoading() {
  return (
    <div className="min-h-screen">
      {/* Header area */}
      <div className="bg-[#faf8f5]/60 border-b border-[#e8e0d4]">
        <div className="mx-auto max-w-3xl px-4 md:px-8 pt-6 md:pt-10 pb-8 md:pb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-2" />
            <Skeleton className="h-4 w-40" />
          </div>

          {/* Category pill */}
          <SkeletonBadge width="w-24" className="mb-4" />

          {/* Title */}
          <div className="space-y-3 mb-5">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-3/4" />
          </div>

          {/* Meta row: author, date, reading time */}
          <div className="flex flex-wrap items-center gap-4">
            {(["w-24", "w-28", "w-16"] as const).map((w, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className={`h-4 ${w}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-8 md:py-12">
        {/* Paragraphs */}
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonParagraph key={i} lines={4} />
          ))}

          {/* Subheading */}
          <Skeleton className="h-7 w-1/3 mt-10" />

          {/* More paragraphs */}
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonParagraph key={`p2-${i}`} lines={3} />
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-stone-200/60">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-3 w-10 mr-1" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-6 w-20"
                radius="rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Related articles */}
        <div className="mt-14">
          <Skeleton className="h-6 w-36 mb-6" />
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#faf8f5] rounded-lg p-5 border border-[#e8e0d4]"
              >
                <Skeleton className="h-2.5 w-16 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
