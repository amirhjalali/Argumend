import {
  Skeleton,
  SkeletonBadge,
  SkeletonParagraph,
  SkeletonIcon,
} from "@/components/Skeleton";

export default function ConceptDetailLoading() {
  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-8 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-3.5 w-3.5" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3.5 w-3.5" />
            <Skeleton className="h-4 w-28" />
          </div>
        </nav>

        {/* Hero */}
        <header className="mb-12 md:mb-16">
          <div className="flex items-start gap-5 mb-6">
            <div className="p-4 bg-gradient-to-br from-[#faf8f5] to-canvas rounded-xl border border-stone-200/60 flex-shrink-0">
              <Skeleton className="h-7 w-7" />
            </div>
            <div>
              <SkeletonBadge width="w-24" className="h-5 mb-3" />
              <Skeleton className="h-9 w-64" />
            </div>
          </div>
        </header>

        {/* Full Description */}
        <section className="mb-12 md:mb-16">
          <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonParagraph key={i} lines={4} />
            ))}
          </div>
        </section>

        {/* Key Points */}
        <section className="mb-12 md:mb-16">
          <Skeleton className="h-7 w-28 mb-6" />
          <div className="bg-white/80 rounded-xl border border-stone-200/60 p-6 md:p-8">
            <ul className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="flex items-start gap-3">
                  <SkeletonIcon size="h-5 w-5" className="flex-shrink-0 mt-0.5" />
                  <Skeleton className="h-4 w-full" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* See It In Action */}
        <section className="mb-12 md:mb-16">
          <Skeleton className="h-7 w-36 mb-3" />
          <Skeleton className="h-4 w-72 mb-6" />
          <div className="grid gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-white/80 border border-stone-200/60"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-stone-200/60 rounded-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-4 w-4" />
              </div>
            ))}
          </div>
        </section>

        {/* Related Concepts */}
        <section className="mb-12 md:mb-16">
          <Skeleton className="h-7 w-40 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/80 rounded-xl p-5 border border-stone-200/60"
              >
                <div className="p-2.5 bg-gradient-to-br from-[#faf8f5] to-canvas rounded-xl border border-stone-200/60 w-fit mb-3">
                  <Skeleton className="h-4 w-4" />
                </div>
                <Skeleton className="h-5 w-3/4 mb-1" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3 mt-1" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
