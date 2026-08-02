import { Skeleton, SkeletonBadge, SkeletonCard, SkeletonHeading, SkeletonText } from "./Skeleton";

interface RouteLoadingStateProps {
  label: string;
  compact?: boolean;
}

/** Accessible route-transition placeholder with no dependency on live data. */
export function RouteLoadingState({ label, compact = false }: RouteLoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={
        compact
          ? "mx-auto w-full max-w-[600px] px-4 py-5"
          : "min-h-[70svh] bg-[#f4f1eb] px-4 py-10 dark:bg-[var(--bg-canvas)] sm:px-6 sm:py-12"
      }
    >
      <span className="sr-only">{label}</span>
      <div
        aria-hidden="true"
        className={`mx-auto w-full ${compact ? "max-w-[600px]" : "max-w-5xl"}`}
      >
        <SkeletonBadge width="w-28" className="mb-4 motion-reduce:animate-none" />
        <SkeletonHeading width={compact ? "w-4/5" : "w-2/3"} className="motion-reduce:animate-none" />
        <div className="mt-4 max-w-2xl space-y-2">
          <SkeletonText className="motion-reduce:animate-none" />
          <SkeletonText width="w-4/5" className="motion-reduce:animate-none" />
        </div>

        <div className={`mt-8 grid gap-4 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {Array.from({ length: compact ? 2 : 3 }).map((_, index) => (
            <SkeletonCard key={index} className="motion-reduce:animate-none" />
          ))}
        </div>
        {!compact && (
          <Skeleton className="mt-8 h-28 w-full motion-reduce:animate-none" radius="rounded-xl" />
        )}
      </div>
    </div>
  );
}
