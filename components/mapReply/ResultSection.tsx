import type { ReactNode } from "react";

/**
 * One block of the reply. Every block gets the same heading treatment so the
 * reply reads as a single document rather than a stack of widgets, and so the
 * heading order stays a usable outline for a screen reader. It matches the
 * section shell of the /analyze-v2 report on purpose: the two paste lanes are
 * one kind of document.
 */
export function ResultSection({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[var(--border-divider)] pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-serif text-[1.75rem] leading-tight text-[var(--text-heading)] sm:text-[2rem]">
          {title}
        </h3>
        {aside ? (
          <div className="font-sans text-sm text-[var(--text-muted)]">{aside}</div>
        ) : null}
      </div>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}
