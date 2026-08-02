"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function LessonsFromTheDeepError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="Lessons from the Deep could not load"
      message="Lessons from the Deep could not be loaded. Please try again or return to the home page."
      reset={reset}
    />
  );
}
