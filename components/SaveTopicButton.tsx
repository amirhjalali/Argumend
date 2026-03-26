"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import { Bookmark, LogIn } from "lucide-react";

interface SaveTopicButtonProps {
  topicId: string;
}

export function SaveTopicButton({ topicId }: SaveTopicButtonProps) {
  const { data: session, status } = useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const isGuest = status !== "authenticated" && status !== "loading";

  // Fetch saved state on mount when authenticated
  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;

    fetch("/api/saved-topics")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data.topicIds)) {
          setSaved(data.topicIds.includes(topicId));
        }
      })
      .catch(() => {
        // Silently fail — user can still interact
      });

    return () => {
      cancelled = true;
    };
  }, [status, topicId]);

  const handleToggle = useCallback(async () => {
    if (status !== "authenticated") {
      signIn("google");
      return;
    }

    // Optimistic update
    const wasSaved = saved;
    setSaved(!wasSaved);
    setLoading(true);

    try {
      const method = wasSaved ? "DELETE" : "POST";
      const res = await fetch("/api/saved-topics", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId }),
      });

      if (!res.ok) {
        // Revert on failure
        setSaved(wasSaved);
      }
    } catch {
      // Revert on error
      setSaved(wasSaved);
    } finally {
      setLoading(false);
    }
  }, [status, saved, topicId]);

  if (status === "loading") {
    return (
      <div className="h-9 w-9 animate-pulse rounded-lg bg-stone-200/60" />
    );
  }

  return (
    <div className="relative group">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
          isGuest
            ? "bg-white/80 text-rust-600 border-rust-200/60 hover:bg-rust-50 hover:border-rust-300"
            : saved
              ? "bg-rust-50 text-rust-700 border-rust-200/60 hover:bg-rust-100"
              : "bg-white/80 text-stone-500 border-stone-200/60 hover:text-stone-700 hover:border-stone-300"
        } ${loading ? "opacity-60 cursor-wait" : "hover:-translate-y-0.5 hover:shadow-sm"}`}
        aria-label={
          isGuest
            ? "Sign in to save topics"
            : saved
              ? "Remove from saved topics"
              : "Save this topic"
        }
        aria-pressed={isGuest ? undefined : saved}
      >
        {isGuest ? (
          <LogIn className="h-4 w-4 text-rust-500" strokeWidth={1.8} />
        ) : (
          <Bookmark
            className={`h-4 w-4 transition-colors ${saved ? "fill-rust-500 text-rust-500" : ""}`}
            strokeWidth={1.8}
          />
        )}
        <span className="hidden sm:inline">
          {isGuest ? "Sign in to save" : saved ? "Saved" : "Save"}
        </span>
      </button>

      {/* Tooltip for guest users on hover */}
      {isGuest && (
        <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
          <div className="whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs text-white shadow-lg">
            Sign in to save topics
          </div>
          <div className="mx-auto h-0 w-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-primary" />
        </div>
      )}
    </div>
  );
}
