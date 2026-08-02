"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function AnalyzePageError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The analyzer could not load"
      message="This is usually temporary. Try loading the analyzer again or return home to keep browsing."
      reset={reset}
    />
  );
}
