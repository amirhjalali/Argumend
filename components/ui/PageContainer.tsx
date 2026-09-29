import type { ReactNode } from "react";
import { cx } from "./cx";

export type PageWidth = "reading" | "default";

/**
 * The two page widths. Everything on the site is one or the other, so the
 * left edge of the h1 only moves when the kind of page changes.
 *
 *   reading  44rem   one column read top to bottom: flagship maps, /ai,
 *                    legal, FAQ, detail pages, blog posts, the paste tools
 *   default  64rem   hubs and lists: home, /topics, Learn hubs, results
 */
export const PAGE_WIDTHS: Record<PageWidth, string> = {
  reading: "max-w-[44rem]",
  default: "max-w-5xl",
};

/** One gutter for every page. */
export const PAGE_GUTTER = "px-4 sm:px-6 lg:px-8";

/** One vertical rhythm for every page: the shell's header sits above it. */
export const PAGE_RHYTHM = "pt-8 sm:pt-12 pb-16";

interface PageContainerProps {
  width?: PageWidth;
  as?: "div" | "article" | "section";
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * The outer wrapper of a page's content, inside AppShell. It owns width,
 * gutter and vertical rhythm; it never owns a background (the shell does).
 */
export function PageContainer({
  width = "default",
  as: Tag = "div",
  id,
  className,
  children,
}: PageContainerProps) {
  return (
    <Tag
      id={id}
      className={cx("mx-auto w-full", PAGE_WIDTHS[width], PAGE_GUTTER, PAGE_RHYTHM, className)}
    >
      {children}
    </Tag>
  );
}
