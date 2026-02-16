export default function BlogArticleLoading() {
  return (
    <div className="min-h-screen bg-[#f4f1eb]">
      {/* Header area */}
      <div className="bg-[#faf8f5] border-b border-[#e8e0d4]">
        <div className="mx-auto max-w-3xl px-4 md:px-8 pt-6 md:pt-10 pb-8 md:pb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-4 w-12 bg-stone-200 animate-pulse rounded" />
            <div className="h-4 w-2 bg-stone-200 animate-pulse rounded" />
            <div className="h-4 w-40 bg-stone-200 animate-pulse rounded" />
          </div>

          {/* Category pill */}
          <div className="h-6 w-24 bg-stone-200 animate-pulse rounded-full mb-4" />

          {/* Title */}
          <div className="space-y-3 mb-5">
            <div className="h-10 w-full bg-stone-200 animate-pulse rounded" />
            <div className="h-10 w-3/4 bg-stone-200 animate-pulse rounded" />
          </div>

          {/* Meta row: author, date, reading time */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-3.5 w-3.5 bg-stone-200 animate-pulse rounded" />
              <div className="h-4 w-24 bg-stone-200 animate-pulse rounded" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3.5 w-3.5 bg-stone-200 animate-pulse rounded" />
              <div className="h-4 w-28 bg-stone-200 animate-pulse rounded" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3.5 w-3.5 bg-stone-200 animate-pulse rounded" />
              <div className="h-4 w-16 bg-stone-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-8 md:py-12">
        {/* Paragraphs */}
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
              <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
              <div className="h-4 w-5/6 bg-stone-200 animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-stone-200 animate-pulse rounded" />
            </div>
          ))}

          {/* Subheading */}
          <div className="h-7 w-1/3 bg-stone-200 animate-pulse rounded mt-10" />

          {/* More paragraphs */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`p2-${i}`} className="space-y-2">
              <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
              <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
              <div className="h-4 w-4/5 bg-stone-200 animate-pulse rounded" />
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-3 w-10 bg-stone-200 animate-pulse rounded mr-1" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-20 bg-stone-200 animate-pulse rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Related articles */}
        <div className="mt-14">
          <div className="h-6 w-36 bg-stone-200 animate-pulse rounded mb-6" />
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#faf8f5] rounded-lg p-5 border border-[#e8e0d4]"
              >
                <div className="h-2.5 w-16 bg-stone-200 animate-pulse rounded mb-2" />
                <div className="h-4 w-full bg-stone-200 animate-pulse rounded mb-1" />
                <div className="h-4 w-2/3 bg-stone-200 animate-pulse rounded mb-2" />
                <div className="h-3 w-12 bg-stone-200 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
