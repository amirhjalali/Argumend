"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function RootError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      message="We could not load this page. Please try again; if the problem continues, return to the home page."
      reset={reset}
    />
  );
}
