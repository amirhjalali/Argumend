"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function FaqError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The FAQ page could not load"
      message="The FAQ page could not be loaded. Please try again or return to the home page."
      reset={reset}
    />
  );
}
