"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function GuidesListingError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The guides could not load"
      message="The guides could not be loaded. Please try again or return to the home page."
      reset={reset}
    />
  );
}
