import type { ReactNode } from "react";

/**
 * One block of the reply. Every block gets the same heading treatment so the
 * reply reads as a single document rather than a stack of widgets, and so the
 * heading order stays a usable outline for a screen reader.
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
    <section className="space-y-4 border-t border-[var(--border-divider)] pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-serif text-2xl text-[var(--text-heading)]">{title}</h3>
        {aside ? <div className="font-sans text-sm text-[var(--text-muted)]">{aside}</div> : null}
      </div>
      {children}
    </section>
  );
}
