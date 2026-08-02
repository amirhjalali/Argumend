"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function CommunityError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The community page could not load"
      message="The page is temporarily unavailable. Try again or return home."
      reset={reset}
    />
  );
}
