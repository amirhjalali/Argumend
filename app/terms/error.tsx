"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function TermsError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The terms could not load"
      message="The terms of service could not be loaded. Please try again or return to the home page."
      reset={reset}
    />
  );
}
