"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function ReplyError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The map reply tool could not load"
      message="The map reply page could not be loaded. Nothing you pasted was stored. Please try again."
      reset={reset}
    />
  );
}
