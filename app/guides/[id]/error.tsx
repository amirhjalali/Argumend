"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function GuideError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="This guide could not load"
      message="This guide could not be loaded. Please try again or return to the guides."
      reset={reset}
      backHref="/learn#guides"
      backLabel="Back to guides"
    />
  );
}
