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
      title="This topic could not load"
      message="We could not load this topic. The page may have encountered an unexpected error."
      reset={reset}
      backHref="/topics"
      backLabel="Back to Topics"
    />
  );
}
