"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function TopicDetailError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="This map could not load"
      message="We could not load this map. Please try again or return to the other maps."
      reset={reset}
      backHref="/topics"
      backLabel="Back to maps"
    />
  );
}
