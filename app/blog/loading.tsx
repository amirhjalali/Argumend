export default function BlogListingLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#faf8f5]/60 border-b border-[#e8e0d4]">
        <div className="mx-auto max-w-4xl px-4 md:px-8 py-10 md:py-16">
          <div className="h-3 w-28 bg-stone-200 animate-pulse rounded mb-4" />
          <div className="h-10 w-72 bg-stone-200 animate-pulse rounded mb-4" />
          <div className="space-y-2">
            <div className="h-5 w-full max-w-xl bg-stone-200 animate-pulse rounded" />
            <div className="h-5 w-3/4 max-w-xl bg-stone-200 animate-pulse rounded" />
          </div>
        </div>
      </div>

      {/* Article Grid */}
      <div className="mx-auto max-w-4xl px-4 md:px-8 py-8 md:py-12">
        {/* Featured Article */}
        <div className="bg-[#faf8f5] rounded-xl p-6 md:p-10 border border-stone-200/60 mb-6 md:mb-8">
          {/* Category + date row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-6 w-24 bg-stone-200 animate-pulse rounded-full" />
            <div className="h-4 w-28 bg-stone-200 animate-pulse rounded" />
            <div className="h-4 w-16 bg-stone-200 animate-pulse rounded" />
          </div>
          {/* Title */}
          <div className="h-8 w-3/4 bg-stone-200 animate-pulse rounded mb-3" />
          {/* Description */}
          <div className="space-y-2 mb-5">
            <div className="h-4 w-full max-w-2xl bg-stone-200 animate-pulse rounded" />
            <div className="h-4 w-2/3 max-w-2xl bg-stone-200 animate-pulse rounded" />
          </div>
          {/* Tags */}
          <div className="flex gap-2 mb-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-5 w-16 bg-stone-200 animate-pulse rounded-md" />
            ))}
          </div>
          {/* Read more */}
          <div className="h-4 w-24 bg-stone-200 animate-pulse rounded" />
        </div>

        {/* Remaining Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#faf8f5] rounded-xl p-6 md:p-8 border border-stone-200/60"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-6 w-20 bg-stone-200 animate-pulse rounded-full" />
                <div className="h-4 w-24 bg-stone-200 animate-pulse rounded" />
                <div className="h-4 w-14 bg-stone-200 animate-pulse rounded" />
              </div>
              <div className="h-6 w-5/6 bg-stone-200 animate-pulse rounded mb-3" />
              <div className="space-y-2 mb-5">
                <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-stone-200 animate-pulse rounded" />
              </div>
              <div className="flex gap-2 mb-5">
                <div className="h-5 w-14 bg-stone-200 animate-pulse rounded-md" />
                <div className="h-5 w-18 bg-stone-200 animate-pulse rounded-md" />
              </div>
              <div className="h-4 w-24 bg-stone-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
