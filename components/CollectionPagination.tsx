import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { buildPageHref } from "@/lib/collectionPagination";

interface CollectionPaginationProps {
  basePath: string;
  currentPage: number;
  pageCount: number;
  params?: URLSearchParams;
  label: string;
}

export function CollectionPagination({
  basePath,
  currentPage,
  pageCount,
  params,
  label,
}: CollectionPaginationProps) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200/60 pt-6 dark:border-[var(--border-default)]"
      aria-label={`${label} pagination`}
    >
      {currentPage > 1 ? (
        <Link
          href={buildPageHref(basePath, currentPage - 1, params)}
          rel="prev"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-stone-200/80 px-3.5 py-2 text-sm font-medium text-deep transition-colors hover:border-deep/40 hover:bg-deep/5 dark:border-[var(--border-default)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Previous
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {pages.map((page) => (
          <Link
            key={page}
            href={buildPageHref(basePath, page, params)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            className={`inline-flex h-11 min-w-11 items-center justify-center rounded-lg px-2 font-mono text-sm transition-colors ${
              page === currentPage
                ? "bg-deep text-white"
                : "text-stone-500 hover:bg-deep/5 hover:text-deep dark:text-stone-400"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < pageCount ? (
        <Link
          href={buildPageHref(basePath, currentPage + 1, params)}
          rel="next"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-stone-200/80 px-3.5 py-2 text-sm font-medium text-deep transition-colors hover:border-deep/40 hover:bg-deep/5 dark:border-[var(--border-default)]"
        >
          Next
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
