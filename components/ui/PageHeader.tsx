import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/Breadcrumbs";
import { cx } from "./cx";

export type PageHeaderSize = "display" | "page";

/**
 * The type scale for page titles. Two sizes, one each, nothing in between:
 *
 *   display  2.5rem → 3.25rem (sm) → 3.75rem (lg), leading 1.05
 *            home, flagship maps, /ai: pages that open an argument
 *   page     2.375rem → 3rem (sm), leading 1.1
 *            everything else: hubs, tools, Learn, About, legal, 404
 *
 * Both: EB Garamond, weight 400, tracking -0.018em, `text-primary`, balanced.
 */
export const PAGE_TITLE_SIZES: Record<PageHeaderSize, string> = {
  display: "text-[2.5rem] leading-[1.05] sm:text-[3.25rem] lg:text-[3.75rem]",
  page: "text-[2.375rem] leading-[1.1] sm:text-5xl",
};

interface PageHeaderProps {
  /** Rendered first, above the eyebrow. */
  breadcrumbs?: BreadcrumbItem[];
  /** Always `.label-caps`: never a pill, badge or icon tile. */
  eyebrow?: ReactNode;
  /** The page's h1, in sentence case. One colour: no two-tone titles. */
  title: ReactNode;
  size?: PageHeaderSize;
  /** One serif paragraph under the title, held to 36rem. */
  lede?: ReactNode;
  /** Dates, counts, "Last updated": small sans, muted. */
  meta?: ReactNode;
  /** An id for the h1, for `aria-labelledby`. */
  titleId?: string;
  className?: string;
  /** Actions or chips under the lede. */
  children?: ReactNode;
}

/**
 * The one page header. Always left-aligned, on the page's own background:
 * no gradient band, tinted strip, pill, icon tile or centred hero.
 * Model: the /ai header (components/ai/AiLivingMap.tsx), with its numbers
 * normalised to the scale above.
 */
export function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  size = "page",
  lede,
  meta,
  titleId,
  className,
  children,
}: PageHeaderProps) {
  return (
    <header className={cx("mb-10 sm:mb-12", className)}>
      {breadcrumbs && breadcrumbs.length > 0 ? <Breadcrumbs items={breadcrumbs} /> : null}
      {eyebrow ? <p className="label-caps">{eyebrow}</p> : null}
      <h1
        id={titleId}
        className={cx(
          eyebrow ? "mt-3" : null,
          "text-balance font-serif font-normal tracking-[-0.018em] text-primary",
          PAGE_TITLE_SIZES[size],
        )}
      >
        {title}
      </h1>
      {lede ? (
        <p className="mt-5 max-w-[36rem] font-serif text-xl leading-[1.5] text-secondary">
          {lede}
        </p>
      ) : null}
      {meta ? <p className="mt-4 font-sans text-sm text-muted">{meta}</p> : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </header>
  );
}
