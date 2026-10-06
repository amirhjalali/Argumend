"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { searchQuestions, type QuestionSearchItem } from "@/lib/questionSearch";

type QuestionItem = QuestionSearchItem;

export function QuestionsSearch({
  questions,
}: {
  questions: QuestionItem[];
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    const restoreQueryFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get("q") ?? "");
    };
    restoreQueryFromUrl();
    window.addEventListener("popstate", restoreQueryFromUrl);
    return () => window.removeEventListener("popstate", restoreQueryFromUrl);
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const params = new URLSearchParams(window.location.search);
    if (query.trim()) params.set("q", query.trim());
    else params.delete("q");
    const search = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`,
    );
  }, [query]);

  const filtered = useMemo(() => searchQuestions(questions, query), [query, questions]);

  const clearSearch = () => {
    setQuery("");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div className="mb-8 max-w-xl">
      <div className="relative">
        <input
          ref={inputRef}
          type="search"
          placeholder="Search questions by keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-stone-200 bg-panel py-3 pl-10 pr-12 font-sans text-sm text-primary dark:text-stone-200 placeholder:text-muted dark:placeholder:text-stone-500 focus:border-deep/40 focus:outline-none focus:ring-2 focus:ring-focus dark:border-[var(--border-default)] dark:focus:border-accent-text/60"
          aria-label="Search questions"
          // Only while the results region exists: an id that points at
          // nothing is an invalid ARIA reference (axe, critical).
          aria-controls={query.trim() ? "question-search-results" : undefined}
          aria-describedby={query.trim() ? "question-search-status" : undefined}
        />
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted dark:text-stone-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:bg-stone-100 hover:text-primary dark:text-stone-400 dark:hover:bg-[var(--bg-muted)] dark:hover:text-stone-200"
            aria-label="Clear question search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* One live region that is always in the page, so the first result
          count is announced too: a region mounted together with its text is
          often missed, and the visible line below remounts whenever the
          results flip between none and some. */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {query.trim()
          ? filtered.length === 0
            ? `No questions found for “${query.trim()}”`
            : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for “${query.trim()}”`
          : ""}
      </div>

      {/* Search results */}
      {query.trim() && (
        <div id="question-search-results" className="mt-4">
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-stone-200 bg-panel px-4 py-5 dark:border-[var(--border-default)]">
              <p
                id="question-search-status"
                className="font-sans text-sm text-muted dark:text-stone-400"
              >
                No questions found for &ldquo;{query.trim()}&rdquo;
              </p>
              <button
                type="button"
                onClick={clearSearch}
                className="mt-3 inline-flex min-h-11 items-center rounded-lg border border-deep/30 px-4 py-2 text-sm font-medium text-deep transition-colors hover:bg-deep/5 dark:border-accent-text/40 dark:text-accent-text"
              >
                Clear search
              </button>
            </div>
          ) : (
            <>
              <p
                id="question-search-status"
                className="mb-3 font-sans text-sm text-muted dark:text-stone-400"
              >
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}{" "}
                for &ldquo;{query.trim()}&rdquo;
              </p>
              <ul className="space-y-2 rounded-lg border border-stone-200 bg-panel p-4 dark:border-[var(--border-default)]">
                {filtered.slice(0, 20).map((q) => (
                  <li key={q.slug}>
                    <Link
                      href={`/questions/${q.slug}`}
                      className="block min-h-11 rounded-md px-3 py-2 font-sans text-stone-900 transition-colors hover:bg-stone-100/70 hover:text-deep dark:text-stone-200 dark:hover:bg-[var(--bg-muted)] dark:hover:text-accent-text"
                    >
                      <span className="block">{q.question}</span>
                      <span className="block font-sans text-xs text-muted dark:text-stone-400">
                        {q.topicTitle}
                      </span>
                    </Link>
                  </li>
                ))}
                {filtered.length > 20 && (
                  <li className="border-t border-stone-100 pt-2 font-sans text-xs text-muted dark:border-[var(--border-subtle)] dark:text-stone-400">
                    Showing 20 of {filtered.length} results. Refine your search to see more.
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
