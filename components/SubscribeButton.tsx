"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
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
  return <TopicSubscriptionControl key={topicId} topicId={topicId} />;
}

function TopicSubscriptionControl({ topicId }: SubscribeButtonProps) {
  const [status, setStatus] = useState<TopicSubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);
  const statusId = useId();
  const pendingMutation = useRef<AbortController | null>(null);
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
        if (controller.signal.aborted) return;
        const payload: unknown = await response.json();
        if (controller.signal.aborted) return;
        const parsed = TopicSubscriptionStatusSchema.safeParse(payload);
        if (!response.ok || !parsed.success) {
          throw new Error("Could not load follow status");
        }
        setStatus(parsed.data);
      } catch {
        if (controller.signal.aborted) return;
        setError("Follow status is temporarily unavailable.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => {
      controller.abort();
      pendingMutation.current?.abort();
      pendingMutation.current = null;
    };
  }, [featureEnabled, requestVersion, topicId]);

  const toggle = useCallback(async () => {
    if (!status?.authenticated || pendingMutation.current) return;

    const controller = new AbortController();
    pendingMutation.current = controller;
    setUpdating(true);
    setError(null);
    try {
      const response = await fetch("/api/topic-subscriptions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ topicId, subscribe: !status.subscribed }),
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;

      if (response.status === 401) {
        setStatus({ ...status, authenticated: false, subscribed: false });
        return;
      }
      const payload: unknown = await response.json();
      if (controller.signal.aborted) return;
      const parsed = TopicSubscriptionStatusSchema.safeParse(payload);
      if (!response.ok || !parsed.success) {
        const apiError = TopicSubscriptionErrorSchema.safeParse(payload);
        throw new Error(
          apiError.success ? apiError.data.error : "Could not update follow status",
        );
      }
      setStatus(parsed.data);
    } catch {
      if (!controller.signal.aborted) {
        // The write may have committed before a connection or count read failed.
        setError("Could not confirm your follow status. Please try again.");
      }
    } finally {
      if (pendingMutation.current === controller) {
        pendingMutation.current = null;
        setUpdating(false);
      }
    }
  }, [status, topicId]);

  if (!featureEnabled) return null;

  if (loading) {
    return (
      <button
        type="button"
        disabled
        aria-busy="true"
        aria-label="Loading follow status"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-stone-200/60 bg-white/60 px-3 py-2 text-sm font-medium text-stone-400 dark:border-[var(--border-default)] dark:bg-card/60 dark:text-stone-500"
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
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-error/30 bg-error/[0.06] px-3 py-2 text-sm font-medium text-error-text transition-colors hover:bg-error/10 dark:border-error/40 dark:bg-error/10"
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
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-stone-200/60 bg-white/80 px-3 py-2 text-sm font-medium text-secondary dark:text-stone-400 transition-colors hover:border-stone-300/80 hover:text-primary dark:hover:text-stone-200 dark:border-[var(--border-default)] dark:bg-card/80"
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
            : "border-stone-200/60 bg-white/80 text-secondary dark:text-stone-400 hover:border-stone-300/80 hover:text-primary dark:hover:text-stone-200 dark:border-[var(--border-default)] dark:bg-card/80"
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
