export default function AnalysesListingLoading() {
  return (
    <div className="min-h-full">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-14 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-6 w-36 bg-stone-200 animate-pulse rounded-full" />
          </div>
          <div className="h-10 w-64 bg-stone-200 animate-pulse rounded mx-auto" />
          <div className="space-y-2 max-w-lg mx-auto">
            <div className="h-5 w-full bg-stone-200 animate-pulse rounded" />
            <div className="h-5 w-3/4 bg-stone-200 animate-pulse rounded mx-auto" />
          </div>
        </div>

        {/* CTA button */}
        <div className="flex justify-center">
          <div className="h-12 w-44 bg-stone-200 animate-pulse rounded-xl" />
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
                  <div className="h-5 w-3/4 bg-stone-200 animate-pulse rounded mb-2" />
                  {/* Summary */}
                  <div className="space-y-1.5 mb-3">
                    <div className="h-3.5 w-full bg-stone-200 animate-pulse rounded" />
                    <div className="h-3.5 w-5/6 bg-stone-200 animate-pulse rounded" />
                  </div>
                  {/* Confidence bar */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-1.5 w-[120px] bg-stone-200 animate-pulse rounded-full" />
                    <div className="h-3 w-8 bg-stone-200 animate-pulse rounded" />
                  </div>
                  {/* Meta row */}
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-24 bg-stone-200 animate-pulse rounded" />
                    <div className="h-4 w-16 bg-stone-200 animate-pulse rounded-full" />
                  </div>
                </div>
                <div className="h-5 w-5 bg-stone-200 animate-pulse rounded mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
