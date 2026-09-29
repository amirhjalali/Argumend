"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function TopicsListingError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The maps could not load"
      message="The maps could not be loaded. Please try again or return to the home page."
      reset={reset}
    />
  );
}
