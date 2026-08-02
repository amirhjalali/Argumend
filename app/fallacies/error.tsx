"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function FallaciesError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The fallacies page could not load"
      message="This fallacies page could not be loaded. Please try again or return to the home page."
      reset={reset}
    />
  );
}
