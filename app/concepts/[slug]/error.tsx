"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function ConceptError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="This concept could not load"
      message="This concept could not be loaded. Please try again or return to the concepts index."
      reset={reset}
      backHref="/concepts"
      backLabel="Back to Concepts"
    />
  );
}
