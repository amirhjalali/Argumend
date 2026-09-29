"use client";

import { useId, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface NewsletterSignupProps {
  variant?: "default" | "compact";
  /** Overrides the variant-derived analytics source (e.g. "footer"). */
  source?: string;
}

export function NewsletterSignup({ variant = "default", source }: NewsletterSignupProps) {
  const errorId = useId();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: source ?? (variant === "compact" ? "blog-post" : "blog-index"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      trackEvent({ action: "newsletter_signup", source: source ?? (variant === "compact" ? "blog-post" : "blog-index") });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const isCompact = variant === "compact";
  const placement = source ?? (isCompact ? "blog-post" : "blog-index");
  const formLabel =
    placement === "footer"
      ? "Footer newsletter signup"
      : placement === "topic-read"
        ? "Topic newsletter signup"
        : placement === "blog-post"
          ? "Article newsletter signup"
          : "Newsletter signup";

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`rounded-xl bg-[var(--bg-surface)] border border-[var(--border-divider)] ${
          isCompact ? "p-5" : "p-8"
        }`}
      >
        <div className={`flex items-center gap-3 ${isCompact ? "" : "justify-center"}`}>
          <CheckCircle className="h-5 w-5 text-deep flex-shrink-0" />
          <p className="text-deep font-medium text-sm">
            You&apos;re subscribed. New arguments will land here weekly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl bg-[var(--bg-surface)] border border-[var(--border-divider)] ${
        isCompact ? "p-5" : "p-8"
      }`}
    >
      {/* An h2: the card sits in the footer, beside the page's own sections,
          and an h3 skipped a level on pages whose last heading is the h1. */}
      <h2
        className={`font-serif text-primary leading-snug ${
          isCompact ? "text-base mb-1" : "text-xl mb-2"
        }`}
      >
        {isCompact ? "Stay curious" : "Get new arguments in your inbox"}
      </h2>

      {/* Subtitle */}
      <p
        className={`text-secondary leading-relaxed ${
          isCompact ? "text-xs mb-3" : "text-sm mb-5"
        }`}
      >
        New maps, and cruxes that moved. No spam.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-2" aria-label={formLabel}>
        <div className="flex-1 min-w-0">
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            enterKeyHint="send"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="you@example.com"
            aria-label="Email address"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            disabled={loading}
            className={`min-h-11 w-full bg-white dark:bg-[var(--bg-card)] border border-stone-300 dark:border-[var(--border-default)] rounded-lg text-primary dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-focus focus:border-rust-500/50 transition-colors ${
              isCompact ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-sm"
            } ${error ? "border-error focus:ring-error focus:border-error/50" : ""} ${loading ? "opacity-60" : ""}`}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          aria-label={loading ? "Subscribing…" : "Subscribe"}
          // Ink, like the home paste box's Analyze button: a page keeps rust
          // for its one primary action, and a signup is never that.
          className={`min-h-11 flex-shrink-0 bg-primary text-canvas hover:bg-primary/90 font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-60 disabled:cursor-not-allowed ${
            isCompact ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-sm"
          }`}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            "Subscribe"
          )}
        </button>
      </form>

      {/* Error message */}
      {error && (
        <p id={errorId} className="mt-2 text-xs text-error-text" role="alert">{error}</p>
      )}
    </div>
  );
}
