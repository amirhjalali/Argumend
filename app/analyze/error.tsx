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
      title="The paste page could not load"
      message="This is usually temporary. Try loading it again or return home to keep browsing."
      reset={reset}
    />
  );
}
