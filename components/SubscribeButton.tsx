"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";
import { Eye, LoaderCircle, RefreshCw } from "lucide-react";
import {
  TopicSubscriptionErrorSchema,
  TopicSubscriptionStatusSchema,
  type TopicSubscriptionStatus,
} from "@/lib/subscriptions/contracts";

interface SubscribeButtonProps {
  topicId: string;
}

export function SubscribeButton({ topicId }: SubscribeButtonProps) {
  const [status, setStatus] = useState<TopicSubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);
  const statusId = useId();
  const featureEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";

  useEffect(() => {
    if (!featureEnabled) return;

    const controller = new AbortController();
    queueMicrotask(() => {
      if (!controller.signal.aborted) {
        setLoading(true);
        setError(null);
      }
    });

    void (async () => {
      try {
        const response = await fetch(
          `/api/topic-subscriptions?topicId=${encodeURIComponent(topicId)}`,
          { signal: controller.signal },
        );
        const payload: unknown = await response.json();
        const parsed = TopicSubscriptionStatusSchema.safeParse(payload);
        if (!response.ok || !parsed.success) {
          throw new Error("Could not load follow status");
        }
        setStatus(parsed.data);
      } catch (requestError) {
        if (
          requestError instanceof Error &&
          requestError.name === "AbortError"
        ) {
          return;
        }
        setError("Follow status is temporarily unavailable.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [featureEnabled, requestVersion, topicId]);

  const toggle = useCallback(async () => {
    if (!status?.authenticated || updating) return;

    setUpdating(true);
    setError(null);
    try {
      const response = await fetch("/api/topic-subscriptions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ topicId, subscribe: !status.subscribed }),
      });
      const payload: unknown = await response.json();
      const parsed = TopicSubscriptionStatusSchema.safeParse(payload);

      if (response.status === 401) {
        setStatus({ ...status, authenticated: false, subscribed: false });
        return;
      }
      if (!response.ok || !parsed.success) {
        const apiError = TopicSubscriptionErrorSchema.safeParse(payload);
        throw new Error(
          apiError.success ? apiError.data.error : "Could not update follow status",
        );
      }
      setStatus(parsed.data);
    } catch {
      setError("Your follow status was not changed. Please try again.");
    } finally {
      setUpdating(false);
    }
  }, [status, topicId, updating]);

  if (!featureEnabled) return null;

  if (loading) {
    return (
      <button
        type="button"
        disabled
        aria-busy="true"
        aria-label="Loading follow status"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-stone-200/60 bg-white/60 px-3 py-2 text-sm font-medium text-stone-400 dark:border-[var(--border-default)] dark:bg-[#252420]/60 dark:text-stone-500"
      >
        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
        <span>Loading…</span>
      </button>
    );
  }

  if (error && !status) {
    return (
      <span className="inline-flex items-center">
        <button
          type="button"
          onClick={() => setRequestVersion((version) => version + 1)}
          aria-describedby={statusId}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Retry follow status
        </button>
        <span id={statusId} role="alert" className="sr-only">
          {error}
        </span>
      </span>
    );
  }

  if (!status?.authenticated) {
    return (
      <Link
        href="/auth/signin"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-stone-200/60 bg-white/80 px-3 py-2 text-sm font-medium text-secondary dark:text-stone-400 transition-colors hover:border-stone-300/80 hover:text-primary dark:hover:text-stone-200 dark:border-[var(--border-default)] dark:bg-[#252420]/80"
      >
        <Eye className="h-4 w-4" aria-hidden="true" />
        <span>Sign in to follow</span>
        {status && status.subscriberCount > 0 && (
          <span className="font-mono text-xs tabular-nums text-muted">
            {status.subscriberCount}
          </span>
        )}
      </Link>
    );
  }

  return (
    <span className="inline-flex items-center">
      <button
        type="button"
        onClick={toggle}
        disabled={updating}
        aria-busy={updating || undefined}
        aria-pressed={status.subscribed}
        aria-describedby={error ? statusId : undefined}
        className={`inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-wait disabled:opacity-70 ${
          status.subscribed
            ? "border-deep bg-deep text-white hover:bg-deep-dark"
            : "border-stone-200/60 bg-white/80 text-secondary dark:text-stone-400 hover:border-stone-300/80 hover:text-primary dark:hover:text-stone-200 dark:border-[var(--border-default)] dark:bg-[#252420]/80"
        }`}
      >
        {updating ? (
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Eye className="h-4 w-4" aria-hidden="true" />
        )}
        <span>{updating ? "Updating…" : status.subscribed ? "Following" : "Follow"}</span>
        <span
          className={`font-mono text-xs tabular-nums ${
            status.subscribed ? "text-white/80" : "text-muted"
          }`}
        >
          {status.subscriberCount}
        </span>
      </button>
      {error && (
        <span id={statusId} role="alert" className="sr-only">
          {error}
        </span>
      )}
    </span>
  );
}
