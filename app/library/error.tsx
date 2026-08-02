"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function LibraryError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The library could not load"
      message="The library could not be loaded. Please try again or return to the home page."
      reset={reset}
    />
  );
}
