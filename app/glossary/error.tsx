"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function GlossaryError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The glossary could not load"
      message="The glossary could not be loaded. Please try again or return to the home page."
      reset={reset}
    />
  );
}
