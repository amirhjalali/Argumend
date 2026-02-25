"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ConceptError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Concept detail error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f4f1eb] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-[#faf8f5] rounded-xl border border-stone-200/60 p-8 sm:p-10 shadow-sm">
          <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-red-50 flex items-center justify-center">
            <svg
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>

          <h1 className="font-serif text-2xl text-primary mb-2">
            Something went wrong
          </h1>
          <p className="text-stone-500 font-sans text-sm mb-6 leading-relaxed">
            This concept could not be loaded. Please try again or return to the
            concepts index.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm"
            >
              Try again
            </button>
            <Link
              href="/concepts"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-stone-300 text-primary text-sm font-medium hover:bg-stone-50 transition-colors"
            >
              Back to Concepts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
