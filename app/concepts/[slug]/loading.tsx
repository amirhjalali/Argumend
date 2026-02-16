export default function ConceptDetailLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-10 bg-stone-200 animate-pulse rounded" />
          <div className="h-3.5 w-3.5 bg-stone-200 animate-pulse rounded" />
          <div className="h-4 w-16 bg-stone-200 animate-pulse rounded" />
          <div className="h-3.5 w-3.5 bg-stone-200 animate-pulse rounded" />
          <div className="h-4 w-28 bg-stone-200 animate-pulse rounded" />
        </div>
      </nav>

      {/* Hero */}
      <header className="mb-12 md:mb-16">
        <div className="flex items-start gap-5 mb-6">
          <div className="p-4 bg-gradient-to-br from-[#f5f1ea] to-[#ebe6de] rounded-xl border border-[#e8e0d4] flex-shrink-0">
            <div className="h-7 w-7 bg-stone-200 animate-pulse rounded" />
          </div>
          <div>
            <div className="h-3 w-20 bg-stone-200 animate-pulse rounded mb-2" />
            <div className="h-9 w-64 bg-stone-200 animate-pulse rounded" />
          </div>
        </div>
      </header>

      {/* Full Description */}
      <section className="mb-12 md:mb-16">
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
              <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
              <div className="h-4 w-5/6 bg-stone-200 animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-stone-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </section>

      {/* Key Points */}
      <section className="mb-12 md:mb-16">
        <div className="h-7 w-28 bg-stone-200 animate-pulse rounded mb-6" />
        <div className="bg-[#faf8f5] rounded-xl border border-[#e8e0d4] p-6 md:p-8">
          <ul className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="h-5 w-5 bg-stone-200 animate-pulse rounded flex-shrink-0 mt-0.5" />
                <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* See It In Action */}
      <section className="mb-12 md:mb-16">
        <div className="h-7 w-36 bg-stone-200 animate-pulse rounded mb-3" />
        <div className="h-4 w-72 bg-stone-200 animate-pulse rounded mb-6" />
        <div className="grid gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg bg-[#faf8f5] border border-[#e8e0d4]"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-stone-200 rounded-full" />
                <div className="h-4 w-48 bg-stone-200 animate-pulse rounded" />
              </div>
              <div className="h-4 w-4 bg-stone-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </section>

      {/* Related Concepts */}
      <section className="mb-12 md:mb-16">
        <div className="h-7 w-40 bg-stone-200 animate-pulse rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/80 rounded-xl p-5 border border-[#e8e0d4]"
            >
              <div className="p-2.5 bg-gradient-to-br from-[#f5f1ea] to-[#ebe6de] rounded-lg border border-[#e8e0d4] w-fit mb-3">
                <div className="h-4 w-4 bg-stone-200 animate-pulse rounded" />
              </div>
              <div className="h-5 w-3/4 bg-stone-200 animate-pulse rounded mb-1" />
              <div className="h-3 w-full bg-stone-200 animate-pulse rounded" />
              <div className="h-3 w-2/3 bg-stone-200 animate-pulse rounded mt-1" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
