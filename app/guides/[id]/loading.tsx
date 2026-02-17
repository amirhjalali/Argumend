export default function GuideDetailLoading() {
  return (
    <div className="bg-[#faf8f5] min-h-full">
      <article className="mx-auto max-w-3xl px-4 md:px-8 py-8 md:py-14">
        {/* Back link */}
        <div className="h-4 w-24 bg-stone-200 animate-pulse rounded mb-8" />

        {/* Header */}
        <header className="mb-12 pb-8 border-b border-stone-200/60">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-stone-200/60 animate-pulse rounded-xl border border-stone-200/60" />
            <div className="flex items-center gap-3">
              <div className="h-5 w-28 bg-deep/10 animate-pulse rounded-full" />
              <div className="h-4 w-16 bg-stone-200 animate-pulse rounded" />
            </div>
          </div>

          {/* Title */}
          <div className="h-10 w-3/4 bg-stone-200 animate-pulse rounded mb-4" />
          {/* Subtitle */}
          <div className="space-y-2">
            <div className="h-6 w-full bg-stone-200 animate-pulse rounded" />
            <div className="h-6 w-2/3 bg-stone-200 animate-pulse rounded" />
          </div>
        </header>

        {/* Sections */}
        {Array.from({ length: 3 }).map((_, sectionIdx) => (
          <section key={sectionIdx} className="mb-12">
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
                <div key={subIdx} className="pl-5 border-l-2 border-deep/20">
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
        <section className="my-12 bg-gradient-to-br from-[#faf8f5] to-canvas rounded-xl p-6 md:p-8 border border-stone-200/60">
          <div className="h-6 w-36 bg-stone-200 animate-pulse rounded mb-5" />
          <ul className="space-y-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-stone-200 rounded-full mt-2.5 flex-shrink-0" />
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
                className="flex items-center justify-between p-4 rounded-xl bg-white/80 border border-stone-200/60"
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
    </div>
  );
}
