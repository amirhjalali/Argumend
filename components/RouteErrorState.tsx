"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface RouteErrorStateProps {
  title?: string;
  message: string;
  reset: () => void;
  backHref?: string;
  backLabel?: string;
}

/** Consistent, non-sensitive recovery UI for App Router error boundaries. */
export function RouteErrorState({
  title = "Something went wrong",
  message,
  reset,
  backHref = "/",
  backLabel = "Back to Home",
}: RouteErrorStateProps) {
  const titleId = useId();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <main
      id="main-content"
      className="flex min-h-[100svh] items-center justify-center bg-[#f4f1eb] px-4 py-10 dark:bg-[var(--bg-canvas)]"
    >
      <section
        aria-labelledby={titleId}
        aria-live="assertive"
        className="w-full max-w-md rounded-2xl border border-stone-200/70 bg-[#faf8f5] p-6 text-center shadow-sm sm:p-10 dark:border-[var(--border-default)] dark:bg-[var(--bg-card)]"
      >
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300">
          <AlertTriangle className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
        </div>

        <h1
          ref={titleRef}
          id={titleId}
          tabIndex={-1}
          className="font-serif text-2xl text-primary dark:text-stone-200 outline-none"
        >
          {title}
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-secondary dark:text-stone-400">
          {message}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rust-500 to-rust-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-rust-600 hover:to-rust-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5] sm:w-auto dark:focus-visible:ring-offset-[var(--bg-card)]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try again
          </button>
          <Link
            href={backHref}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-primary dark:text-stone-200 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5] sm:w-auto dark:border-[var(--border-default)] dark:bg-[var(--bg-overlay)] dark:hover:bg-[#34312d] dark:focus-visible:ring-offset-[var(--bg-card)]"
          >
            {backLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
