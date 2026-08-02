"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function HowItWorksError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="This page could not load"
      message="This page could not be loaded. Please try again or return to the home page."
      reset={reset}
    />
  );
}
