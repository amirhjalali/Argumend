"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "default" | "compact";
}

export function NewsletterSignup({ variant = "default" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // No backend yet — just show success state
    setSubmitted(true);
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
            className={`w-full bg-white border border-stone-300 rounded-lg text-primary placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rust-500/30 focus:border-rust-500/50 transition-colors ${
              isCompact ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-sm"
            } ${error ? "border-red-400 focus:ring-red-400/30 focus:border-red-400/50" : ""}`}
          />
        </div>
        <button
          type="submit"
          className={`flex-shrink-0 bg-gradient-to-r from-rust-500 to-rust-600 hover:from-rust-600 hover:to-rust-700 text-white font-medium rounded-lg transition-all ${
            isCompact ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-sm"
          }`}
        >
          Subscribe
        </button>
      </form>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
