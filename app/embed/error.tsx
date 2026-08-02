"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function EmbedError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="This argument preview could not load"
      message="Try the embedded view again or open Argumend directly."
      reset={reset}
      backLabel="Open Argumend"
    />
  );
}
