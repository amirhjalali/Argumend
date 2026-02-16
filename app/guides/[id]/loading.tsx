export default function GuideDetailLoading() {
  return (
    <article className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-14">
      {/* Back link */}
      <div className="h-4 w-24 bg-stone-200 animate-pulse rounded mb-8" />

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-stone-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-stone-200 animate-pulse rounded-xl" />
          <div className="flex items-center gap-3">
            <div className="h-4 w-16 bg-stone-200 animate-pulse rounded" />
            <div className="w-1 h-1 bg-stone-200 rounded-full" />
            <div className="h-4 w-28 bg-stone-200 animate-pulse rounded" />
          </div>
        </div>

        {/* Title */}
        <div className="h-9 w-3/4 bg-stone-200 animate-pulse rounded mb-3" />
        {/* Subtitle */}
        <div className="space-y-2">
          <div className="h-6 w-full bg-stone-200 animate-pulse rounded" />
          <div className="h-6 w-2/3 bg-stone-200 animate-pulse rounded" />
        </div>
      </header>

      {/* Sections */}
      {Array.from({ length: 3 }).map((_, sectionIdx) => (
        <section key={sectionIdx} className="mb-10">
          {/* Section heading */}
          <div className="h-7 w-1/2 bg-stone-200 animate-pulse rounded mb-4" />

          {/* Section content */}
          <div className="space-y-2 mb-6">
            <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
            <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-stone-200 animate-pulse rounded" />
            <div className="h-4 w-4/5 bg-stone-200 animate-pulse rounded" />
          </div>

          {/* Subsections */}
          <div className="space-y-6 ml-0 md:ml-4">
            {Array.from({ length: 2 }).map((_, subIdx) => (
              <div key={subIdx} className="pl-5 border-l-2 border-stone-200">
                <div className="h-5 w-1/3 bg-stone-200 animate-pulse rounded mb-2" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
                  <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
                  <div className="h-4 w-3/4 bg-stone-200 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Key Takeaways */}
      <section className="my-12 bg-gradient-to-br from-[#faf8f3] to-[#f5f2eb] rounded-xl p-6 md:p-8 border border-[#e8e0d4]">
        <div className="h-6 w-36 bg-stone-200 animate-pulse rounded mb-5" />
        <ul className="space-y-3">
          {Array.from({ length: 4 }).map((_, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-stone-200 rounded-full mt-2 flex-shrink-0" />
              <div className="h-4 w-full bg-stone-200 animate-pulse rounded" />
            </li>
          ))}
        </ul>
      </section>

      {/* Further Reading */}
      <section className="my-12">
        <div className="h-6 w-32 bg-stone-200 animate-pulse rounded mb-5" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-white/60 border border-stone-200/60"
            >
              <div className="flex items-center gap-2">
                <div className="h-4 w-40 bg-stone-200 animate-pulse rounded" />
                <div className="h-4 w-6 bg-stone-200 animate-pulse rounded" />
                <div className="h-4 w-24 bg-stone-200 animate-pulse rounded" />
              </div>
              <div className="h-4 w-4 bg-stone-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
