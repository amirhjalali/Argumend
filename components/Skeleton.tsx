/**
 * Reusable skeleton primitives for loading states.
 *
 * Uses the project parchment palette (stone-200/60 -> stone-300/40)
 * with a subtle pulse animation. All variants accept additional className
 * for width/margin overrides.
 */

import { type HTMLAttributes } from "react";

// ---------------------------------------------------------------------------
// Base skeleton block
// ---------------------------------------------------------------------------

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  /** Override the default border-radius (default: "rounded") */
  radius?: string;
};

/** Base pulsing placeholder block. Apply width/height via className. */
export function Skeleton({ className = "", radius = "rounded", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={`animate-pulse bg-stone-200/60 ${radius} ${className}`}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Semantic variants
// ---------------------------------------------------------------------------

type VariantProps = HTMLAttributes<HTMLDivElement> & {
  /** Tailwind width class, e.g. "w-3/4" or "w-40" */
  width?: string;
};

/** Thin text line placeholder (h-4). */
export function SkeletonText({ width = "w-full", className = "", ...props }: VariantProps) {
  return <Skeleton className={`h-4 ${width} ${className}`} {...props} />;
}

/** Thick title line placeholder (h-7). */
export function SkeletonTitle({ width = "w-3/4", className = "", ...props }: VariantProps) {
  return <Skeleton className={`h-7 ${width} ${className}`} {...props} />;
}

/** Heading placeholder matching serif heading style (h-9). */
export function SkeletonHeading({ width = "w-2/3", className = "", ...props }: VariantProps) {
  return <Skeleton className={`h-9 ${width} ${className}`} {...props} />;
}

/** Small pill/badge placeholder. */
export function SkeletonBadge({ width = "w-20", className = "", ...props }: VariantProps) {
  return <Skeleton radius="rounded-full" className={`h-6 ${width} ${className}`} {...props} />;
}

/** Card-shaped rectangle placeholder. */
export function SkeletonCard({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      radius="rounded-xl"
      className={`w-full h-40 ${className}`}
      {...props}
    />
  );
}

/** Circular avatar placeholder. */
export function SkeletonCircle({ className = "", size = "h-10 w-10", ...props }: HTMLAttributes<HTMLDivElement> & { size?: string }) {
  return <Skeleton radius="rounded-full" className={`${size} ${className}`} {...props} />;
}

/** Large image rectangle placeholder. */
export function SkeletonImage({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      radius="rounded-xl"
      className={`w-full h-48 ${className}`}
      {...props}
    />
  );
}

/** Small icon-sized square placeholder. */
export function SkeletonIcon({ className = "", size = "h-5 w-5", ...props }: HTMLAttributes<HTMLDivElement> & { size?: string }) {
  return <Skeleton radius="rounded" className={`${size} ${className}`} {...props} />;
}

/** Multi-line paragraph placeholder. */
export function SkeletonParagraph({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${
            i === lines - 1 ? "w-3/4" : i === lines - 2 ? "w-5/6" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}

/** Button-shaped placeholder. */
export function SkeletonButton({ width = "w-32", className = "", ...props }: VariantProps) {
  return <Skeleton radius="rounded-xl" className={`h-11 ${width} ${className}`} {...props} />;
}
