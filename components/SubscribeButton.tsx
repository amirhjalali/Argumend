"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, BellRing } from "lucide-react";
import { useSession } from "next-auth/react";

interface SubscribeButtonProps {
  topicId: string;
}

export function SubscribeButton({ topicId }: SubscribeButtonProps) {
  const { data: session, status } = useSession();
  const [subscribed, setSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch current subscription status
  useEffect(() => {
    let cancelled = false;

    async function fetchStatus() {
      try {
        const res = await fetch(
          `/api/topic-subscriptions?topicId=${encodeURIComponent(topicId)}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setSubscribed(data.subscribed);
          setSubscriberCount(data.subscriberCount);
        }
      } catch {
        // Non-critical — fail silently
      } finally {
        if (!cancelled) setInitialLoading(false);
      }
    }

    fetchStatus();
    return () => {
      cancelled = true;
    };
  }, [topicId]);

  const handleToggle = useCallback(async () => {
    if (status !== "authenticated" || !session?.user?.id) {
      // Redirect to sign in
      window.location.href = `/auth/signin?callbackUrl=${encodeURIComponent(
        window.location.href
      )}`;
      return;
    }

    setLoading(true);
    const newState = !subscribed;

    // Optimistic update
    setSubscribed(newState);
    setSubscriberCount((prev) => prev + (newState ? 1 : -1));

    try {
      const res = await fetch("/api/topic-subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId, subscribe: newState }),
      });

      if (!res.ok) {
        // Revert on failure
        setSubscribed(!newState);
        setSubscriberCount((prev) => prev + (newState ? -1 : 1));
        return;
      }

      const data = await res.json();
      setSubscribed(data.subscribed);
      setSubscriberCount(data.subscriberCount);
    } catch {
      // Revert on error
      setSubscribed(!newState);
      setSubscriberCount((prev) => prev + (newState ? -1 : 1));
    } finally {
      setLoading(false);
    }
  }, [subscribed, topicId, session, status]);

  if (initialLoading) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 animate-pulse">
        <Bell className="h-4 w-4 text-stone-300" />
        <span className="text-xs text-stone-300">---</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
        subscribed
          ? "bg-rust-50 text-rust-700 border border-rust-200/60 hover:bg-rust-100"
          : "bg-stone-100 text-stone-600 border border-stone-200/60 hover:bg-stone-200/60 hover:text-stone-800"
      } ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      aria-label={subscribed ? "Unsubscribe from topic updates" : "Subscribe to topic updates"}
      aria-pressed={subscribed}
      title={
        status !== "authenticated"
          ? "Sign in to subscribe"
          : subscribed
          ? "Unsubscribe from updates"
          : "Subscribe for updates"
      }
    >
      {subscribed ? (
        <BellRing className="h-4 w-4 text-rust-500" strokeWidth={1.8} />
      ) : (
        <Bell className="h-4 w-4" strokeWidth={1.8} />
      )}
      <span className="text-xs font-mono tabular-nums">
        {subscriberCount}
      </span>
    </button>
  );
}
