import type { ReactNode } from "react";
import { cx } from "./cx";

interface SectionProps {
  /** Anchor id. The heading gets `${id}-heading` and labels the section. */
  id?: string;
  title: ReactNode;
  /** At most one line of plain explanation under the heading. */
  lede?: ReactNode;
  /** Right-aligned, muted: a count, a date, a small link. */
  aside?: ReactNode;
  /** Heading level. 2 by default; 3 when the section sits inside another. */
  level?: 2 | 3;
  className?: string;
  children?: ReactNode;
}

/**
 * One section of a page. Every section opens the same way: a hairline, a
 * serif heading, at most one line of explanation. The shared opening is what
 * makes several sections read as one document instead of a stack of widgets,
 * and it keeps the heading order a usable outline.
 *
 * Lifted from the /analyze-v2 report (ReportSection) and the /reply result
 * (ResultSection), which were already this component twice.
 */
export function Section({
  id,
  title,
  lede,
  aside,
  level = 2,
  className,
  children,
}: SectionProps) {
  const Heading = level === 3 ? "h3" : "h2";
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cx("border-t border-divider pt-8", className)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <Heading
          id={headingId}
          className="font-serif text-[1.75rem] leading-tight text-primary sm:text-[2rem]"
        >
          {title}
        </Heading>
        {aside ? <div className="font-sans text-sm text-muted">{aside}</div> : null}
      </div>
      {lede ? (
        <p className="mt-2 max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-secondary">
          {lede}
        </p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
