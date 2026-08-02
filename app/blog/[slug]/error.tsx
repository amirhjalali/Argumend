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
      title="This article could not load"
      message="This article could not be loaded. Please try again or return to the blog."
      reset={reset}
      backHref="/blog"
      backLabel="Back to Blog"
    />
  );
}
