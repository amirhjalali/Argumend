"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function BlogListingError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The essays could not load"
      message="The essays could not be loaded. Please try again or return to the home page."
      reset={reset}
    />
  );
}
