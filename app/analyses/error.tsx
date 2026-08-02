"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function AnalysesListingError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="Recent analyses could not load"
      message="Recent analyses could not be loaded. This is likely a temporary issue with the database connection."
      reset={reset}
      backHref="/analyze"
      backLabel="Run an Analysis"
    />
  );
}
