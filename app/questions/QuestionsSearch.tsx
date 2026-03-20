"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface QuestionItem {
  slug: string;
  question: string;
  topicTitle: string;
  topicId: string;
}

export function QuestionsSearch({
  questions,
}: {
  questions: QuestionItem[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(lower) ||
        q.topicTitle.toLowerCase().includes(lower)
    );
  }, [query, questions]);

  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="search"
          placeholder="Search questions by keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-stone-200 bg-panel px-4 py-3 pl-10 font-sans text-sm text-primary placeholder:text-muted focus:border-deep/40 focus:outline-none focus:ring-2 focus:ring-deep/20"
          aria-label="Search questions"
        />
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
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
      </div>

      {/* Search results */}
      {query.trim() && (
        <div className="mt-4">
          {filtered.length === 0 ? (
            <p className="font-sans text-sm text-muted">
              No questions found for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <>
              <p className="mb-3 font-sans text-sm text-muted">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}{" "}
                for &ldquo;{query}&rdquo;
              </p>
              <ul className="space-y-2 rounded-lg border border-stone-200 bg-panel p-4">
                {filtered.slice(0, 20).map((q) => (
                  <li key={q.slug}>
                    <Link
                      href={`/questions/${q.slug}`}
                      className="block font-sans text-primary transition-colors hover:text-deep"
                    >
                      {q.question}
                    </Link>
                    <span className="font-sans text-xs text-muted">
                      {q.topicTitle}
                    </span>
                  </li>
                ))}
                {filtered.length > 20 && (
                  <li className="font-sans text-xs text-muted pt-2 border-t border-stone-100">
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
