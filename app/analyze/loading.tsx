export default function AnalyzePageLoading() {
  return (
    <div className="bg-[#faf8f5] min-h-full">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="h-6 w-36 bg-stone-200 animate-pulse rounded-full" />
          </div>
          <div className="h-8 w-56 bg-stone-200 animate-pulse rounded mx-auto" />
          <div className="space-y-2 max-w-lg mx-auto">
            <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-stone-200 animate-pulse rounded mx-auto" />
          </div>
        </div>

        {/* Content Type Selector */}
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 bg-stone-200 animate-pulse rounded-md"
            />
          ))}
        </div>

        {/* Text Input Card */}
        <div className="bg-white rounded-2xl border border-stone-200/60 p-4 md:p-5 shadow-sm">
          {/* Label row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="h-4 w-32 bg-stone-200 animate-pulse rounded" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-24 bg-stone-200 animate-pulse rounded-md" />
              <div className="h-7 w-16 bg-stone-200 animate-pulse rounded-md" />
            </div>
          </div>

          {/* Textarea skeleton */}
          <div className="w-full h-48 md:h-56 bg-stone-100/80 border border-stone-200/60 rounded-xl" />

          {/* Privacy note */}
          <div className="h-3 w-64 bg-stone-200 animate-pulse rounded mt-1.5" />

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-3">
            <div className="h-3 w-20 bg-stone-200 animate-pulse rounded" />
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-stone-200 animate-pulse rounded" />
              <div className="h-3 w-28 bg-stone-200 animate-pulse rounded" />
            </div>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center">
          <div className="h-12 w-44 bg-stone-200 animate-pulse rounded-xl" />
        </div>
      </div>
    </div>
  );
}
