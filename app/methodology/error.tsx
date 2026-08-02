"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function MethodologyError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The methodology page could not load"
      message="The methodology page could not be loaded. Please try again or return to the home page."
      reset={reset}
    />
  );
}
