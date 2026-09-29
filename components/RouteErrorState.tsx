"use client";

import { useEffect, useId, useRef } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PAGE_GUTTER, PAGE_RHYTHM, PAGE_WIDTHS } from "@/components/ui/PageContainer";
import { PAGE_TITLE_SIZES } from "@/components/ui/PageHeader";
import { cx } from "@/components/ui/cx";

interface RouteErrorStateProps {
  title?: string;
  message: string;
  reset: () => void;
  backHref?: string;
  backLabel?: string;
}

/**
 * Consistent, non-sensitive recovery UI for App Router error boundaries.
 *
 * It reads like the not-found page (components/RouteNotFound.tsx): the
 * reading width, a left-aligned header at the page title size, one rust
 * action and one outlined way out. It stays outside the shell on purpose:
 * if the header or footer is what failed, drawing them again would fail
 * again. Focus moves to the title so a screen reader announces the failure.
 */
export function RouteErrorState({
  title = "Something went wrong",
  message,
  reset,
  backHref = "/",
  backLabel = "Back to home",
}: RouteErrorStateProps) {
  const titleId = useId();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <main id="main-content" className="min-h-[100svh] bg-canvas">
      <section
        aria-labelledby={titleId}
        aria-live="assertive"
        className={cx("mx-auto w-full sm:pt-16", PAGE_WIDTHS.reading, PAGE_GUTTER, PAGE_RHYTHM)}
      >
        <p className="label-caps">Error</p>
        <h1
          ref={titleRef}
          id={titleId}
          tabIndex={-1}
          className={cx(
            "mt-3 text-balance font-serif font-normal tracking-[-0.018em] text-primary dark:text-stone-200 outline-none focus-visible:outline-none",
            PAGE_TITLE_SIZES.page,
          )}
        >
          {title}
        </h1>
        <p className="mt-5 max-w-[36rem] font-serif text-xl leading-[1.5] text-secondary dark:text-stone-400">
          {message}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button onClick={reset}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try again
          </Button>
          <Button href={backHref} variant="secondary">
            {backLabel}
          </Button>
        </div>
      </section>
    </main>
  );
}
