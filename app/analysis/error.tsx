"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function AnalysisListingError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The analysis could not load"
      message="The saved analysis is temporarily unavailable. Try again or start a new analysis."
      reset={reset}
      backHref="/analyze"
      backLabel="Start a New Analysis"
    />
  );
}
