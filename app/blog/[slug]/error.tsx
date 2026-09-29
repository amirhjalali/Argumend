"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function BlogArticleError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="This essay could not load"
      message="This essay could not be loaded. Please try again or return to the essays."
      reset={reset}
      backHref="/blog"
      backLabel="Back to essays"
    />
  );
}
