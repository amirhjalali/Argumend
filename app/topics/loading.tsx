export default function TopicsListLoading() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="h-10 w-56 bg-stone-200 animate-pulse rounded mb-2" />
          <div className="h-5 w-96 bg-stone-200 animate-pulse rounded" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 bg-stone-200 animate-pulse rounded-full"
              style={{ width: i === 0 ? 60 : 80 + Math.random() * 40 }}
            />
          ))}
        </div>

        {/* Search + Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <div className="w-full h-10 bg-stone-200 animate-pulse rounded-lg" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 bg-stone-200 animate-pulse rounded" />
            <div className="h-10 w-40 bg-stone-200 animate-pulse rounded-lg" />
          </div>
        </div>

        {/* Results info */}
        <div className="flex items-center justify-between mb-5">
          <div className="h-4 w-40 bg-stone-200 animate-pulse rounded" />
        </div>

        {/* Topic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-white border border-stone-200/60 rounded-xl p-5"
            >
              {/* Title */}
              <div className="h-5 w-3/4 bg-stone-200 animate-pulse rounded mb-2" />

              {/* Meta claim */}
              <div className="space-y-1.5 mb-4 flex-1">
                <div className="h-3.5 w-full bg-stone-200 animate-pulse rounded" />
                <div className="h-3.5 w-5/6 bg-stone-200 animate-pulse rounded" />
              </div>

              {/* Bottom row: pills + confidence */}
              <div className="flex items-center justify-between gap-2 mt-auto">
                <div className="flex flex-wrap items-center gap-1.5">
                  <div className="h-5 w-16 bg-stone-200 animate-pulse rounded-full" />
                  <div className="h-5 w-20 bg-stone-200 animate-pulse rounded-full" />
                </div>
                <div className="h-4 w-8 bg-stone-200 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
