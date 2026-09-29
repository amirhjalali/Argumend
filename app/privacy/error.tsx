"use client";

import { RouteErrorState } from "@/components/RouteErrorState";

export default function PrivacyError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="The privacy policy could not load"
      message="The privacy policy could not be loaded. Please try again or return to the home page."
      reset={reset}
    />
  );
}
