"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface NewsletterSignupProps {
  variant?: "default" | "compact";
}

export function NewsletterSignup({ variant = "default" }: NewsletterSignupProps) {
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
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      trackEvent({ action: "newsletter_signup", source: variant === "compact" ? "blog-post" : "blog-index" });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const isCompact = variant === "compact";

  if (submitted) {
    return (
      <div
        className={`bg-[#faf8f5] border border-[#e8e0d4] rounded-xl ${
          isCompact ? "p-5" : "p-8"
        }`}
      >
        <div className={`flex items-center gap-3 ${isCompact ? "" : "justify-center"}`}>
          <CheckCircle className="h-5 w-5 text-deep flex-shrink-0" />
          <p className="text-deep font-medium text-sm">
            You&apos;re in! Check your inbox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#faf8f5] border border-[#e8e0d4] rounded-xl ${
        isCompact ? "p-5" : "p-8"
      }`}
    >
      {/* Heading */}
      <h3
        className={`font-serif text-primary leading-snug ${
          isCompact ? "text-base mb-1" : "text-xl mb-2"
        }`}
      >
        {isCompact ? "Stay curious" : "Get new arguments in your inbox"}
      </h3>

      {/* Subtitle */}
      <p
        className={`text-secondary leading-relaxed ${
          isCompact ? "text-xs mb-3" : "text-sm mb-5"
        }`}
      >
        Weekly debates, new topics, and critical thinking insights. No spam.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 min-w-0">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="you@example.com"
            disabled={loading}
            className={`w-full bg-white border border-stone-300 rounded-lg text-primary placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rust-500/30 focus:border-rust-500/50 transition-colors ${
              isCompact ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-sm"
            } ${error ? "border-red-400 focus:ring-red-400/30 focus:border-red-400/50" : ""} ${loading ? "opacity-60" : ""}`}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`flex-shrink-0 bg-gradient-to-r from-rust-500 to-rust-600 hover:from-rust-600 hover:to-rust-700 text-white font-medium rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
            isCompact ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-sm"
          }`}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Subscribe"
          )}
        </button>
      </form>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
