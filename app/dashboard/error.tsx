"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function DashboardError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="Your dashboard could not load"
      message="Your saved items have not been changed. Try again or continue with your on-device bookmarks."
      reset={reset}
      backHref="/saved"
      backLabel="View On-Device Bookmarks"
    />
  );
}
