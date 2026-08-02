"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function ConceptsListingError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The concepts page could not load"
      message="The concepts page could not be loaded. Please try again or return to the home page."
      reset={reset}
    />
  );
}
