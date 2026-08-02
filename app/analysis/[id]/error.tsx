"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function AnalysisDetailError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The analysis could not load"
      message="We could not retrieve this analysis right now. Try again or return to the analyzer."
      reset={reset}
      backHref="/analyze"
      backLabel="Back to Analyze"
    />
  );
}
