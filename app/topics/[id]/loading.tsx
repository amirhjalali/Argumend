export default function TopicDetailLoading() {
  return (
    <div className="min-h-screen bg-[#f4f1eb]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-6">
          <div className="h-4 w-14 bg-stone-200 animate-pulse rounded" />
          <div className="h-3.5 w-3.5 bg-stone-200 animate-pulse rounded" />
          <div className="h-4 w-20 bg-stone-200 animate-pulse rounded" />
          <div className="h-3.5 w-3.5 bg-stone-200 animate-pulse rounded" />
          <div className="h-4 w-32 bg-stone-200 animate-pulse rounded" />
        </div>

        {/* Hero card */}
        <div className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
          {/* Pills row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="h-6 w-20 bg-stone-200 animate-pulse rounded-full" />
            <div className="h-6 w-24 bg-stone-200 animate-pulse rounded-full" />
            <div className="h-6 w-28 bg-stone-200 animate-pulse rounded-full" />
          </div>

          {/* Title */}
          <div className="h-9 w-3/4 bg-stone-200 animate-pulse rounded mb-4" />

          {/* Meta claim */}
          <div className="space-y-2 max-w-3xl mb-6">
            <div className="h-5 w-full bg-stone-200 animate-pulse rounded" />
            <div className="h-5 w-5/6 bg-stone-200 animate-pulse rounded" />
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 pt-5 border-t border-stone-200/60">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-6 w-8 bg-stone-200 animate-pulse rounded mx-auto mb-1" />
                <div className="h-3 w-16 bg-stone-200 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Scan View / 30-Second Summary */}
        <div className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
          <div className="h-3 w-32 bg-stone-200 animate-pulse rounded mb-5" />

          {/* Verdict banner */}
          <div className="rounded-xl border border-stone-200/50 px-6 py-8 mb-8 flex justify-center">
            <div className="flex items-center gap-5">
              <div className="h-14 w-20 bg-stone-200 animate-pulse rounded" />
              <div className="space-y-2">
                <div className="h-5 w-20 bg-stone-200 animate-pulse rounded-full" />
                <div className="h-4 w-28 bg-stone-200 animate-pulse rounded" />
              </div>
            </div>
          </div>

          {/* Pillar overview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-stone-200/60 bg-white/60 p-4"
              >
                <div className="flex items-start gap-2.5 mb-2.5">
                  <div className="w-7 h-7 bg-stone-200 animate-pulse rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 w-3/4 bg-stone-200 animate-pulse rounded" />
                  </div>
                </div>
                <div className="h-3 w-full bg-stone-200 animate-pulse rounded mb-1" />
                <div className="h-3 w-2/3 bg-stone-200 animate-pulse rounded mb-3" />
                <div className="flex items-center justify-between">
                  <div className="h-4 w-16 bg-stone-200 animate-pulse rounded-full" />
                  <div className="h-3.5 w-3.5 bg-stone-200 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Evidence balance bar */}
          <div className="mb-8">
            <div className="h-3 w-28 bg-stone-200 animate-pulse rounded mb-3" />
            <div className="h-5 w-full bg-stone-200 animate-pulse rounded-full" />
          </div>
        </div>

        {/* Stance prompt section */}
        <div className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
          <div className="h-6 w-48 bg-stone-200 animate-pulse rounded mb-2.5 mx-auto" />
          <div className="h-4 w-72 bg-stone-200 animate-pulse rounded mb-7 mx-auto" />
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 h-12 bg-stone-200 animate-pulse rounded-lg" />
            <div className="flex-1 h-12 bg-stone-200 animate-pulse rounded-lg" />
            <div className="flex-1 h-12 bg-stone-200 animate-pulse rounded-lg" />
          </div>
        </div>

        {/* The Claim section */}
        <div className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
          <div className="h-7 w-28 bg-stone-200 animate-pulse rounded mb-3" />
          <div className="border-l-2 border-stone-200 pl-4 sm:pl-5 space-y-2">
            <div className="h-5 w-full bg-stone-200 animate-pulse rounded" />
            <div className="h-5 w-4/5 bg-stone-200 animate-pulse rounded" />
          </div>
        </div>

        {/* Pillars section */}
        <div className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-6 sm:p-8 mb-8">
          <div className="h-7 w-40 bg-stone-200 animate-pulse rounded mb-6" />
          <div className="h-4 w-3/4 bg-stone-200 animate-pulse rounded mb-8" />

          {/* Two pillar skeletons */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="mb-10">
              {/* Pillar header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-stone-200 animate-pulse rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-1/2 bg-stone-200 animate-pulse rounded" />
                  <div className="h-3 w-3/4 bg-stone-200 animate-pulse rounded" />
                </div>
              </div>

              {/* Skeptic vs Proponent */}
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <div className="rounded-lg border border-stone-200/50 p-4 space-y-2">
                  <div className="h-3 w-28 bg-stone-200 animate-pulse rounded" />
                  <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
                  <div className="h-4 w-2/3 bg-stone-200 animate-pulse rounded" />
                </div>
                <div className="rounded-lg border border-stone-200/50 p-4 space-y-2">
                  <div className="h-3 w-32 bg-stone-200 animate-pulse rounded" />
                  <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
                  <div className="h-4 w-3/4 bg-stone-200 animate-pulse rounded" />
                </div>
              </div>

              {/* Evidence items */}
              <div className="space-y-3 mb-5">
                <div className="h-3 w-24 bg-stone-200 animate-pulse rounded" />
                {Array.from({ length: 2 }).map((_, j) => (
                  <div
                    key={j}
                    className="rounded-lg border border-stone-200/50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-stone-200 animate-pulse rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/3 bg-stone-200 animate-pulse rounded" />
                        <div className="h-3 w-full bg-stone-200 animate-pulse rounded" />
                        <div className="h-3 w-2/3 bg-stone-200 animate-pulse rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Crux */}
              <div className="rounded-lg border border-stone-200/60 p-5 space-y-3">
                <div className="h-4 w-40 bg-stone-200 animate-pulse rounded" />
                <div className="h-3 w-full bg-stone-200 animate-pulse rounded" />
                <div className="h-3 w-3/4 bg-stone-200 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
