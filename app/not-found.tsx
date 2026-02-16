import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Home, BookOpen, Brain, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist. Browse topics, read the blog, or run an analysis on Argumend.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f4f1eb] flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Icon */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#efe9df] border border-stone-200/60">
          <Compass className="w-9 h-9 text-deep" strokeWidth={1.5} />
        </div>
      </div>

      {/* 404 Label */}
      <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-muted mb-4">
        404
      </p>

      {/* Headline */}
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-primary leading-tight mb-4 max-w-xl">
        Insufficient Evidence for This Page
      </h1>

      {/* Subtext */}
      <p className="font-sans text-base sm:text-lg text-secondary max-w-md leading-relaxed mb-10">
        The argument you&rsquo;re looking for hasn&rsquo;t been mapped yet&mdash;or
        it may have moved to stronger ground.
      </p>

      {/* Navigation Links */}
      <nav className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-sm font-medium bg-gradient-to-r from-rust-500 to-rust-600 text-white hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm"
        >
          <Home className="w-4 h-4" strokeWidth={1.8} />
          Back to Home
        </Link>
        <Link
          href="/topics"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-sm font-medium border border-stone-300 text-primary bg-white hover:bg-stone-50 hover:border-stone-400 transition-colors"
        >
          <MessageSquare className="w-4 h-4" strokeWidth={1.8} />
          Browse Topics
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-sm font-medium border border-stone-300 text-primary bg-white hover:bg-stone-50 hover:border-stone-400 transition-colors"
        >
          <BookOpen className="w-4 h-4" strokeWidth={1.8} />
          Read the Blog
        </Link>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-sm font-medium border border-stone-300 text-primary bg-white hover:bg-stone-50 hover:border-stone-400 transition-colors"
        >
          <Brain className="w-4 h-4" strokeWidth={1.8} />
          Run an Analysis
        </Link>
      </nav>

      {/* Helpful note */}
      <div className="pt-6 border-t border-stone-200/60 max-w-sm w-full">
        <p className="font-sans text-sm text-muted">
          Looking for something specific? Try browsing our{" "}
          <Link href="/topics" className="text-deep hover:underline">
            topics
          </Link>{" "}
          or{" "}
          <Link href="/guides" className="text-deep hover:underline">
            guides
          </Link>
          .
        </p>
      </div>

      {/* Branding footer */}
      <div className="mt-16">
        <Link href="/" className="group flex flex-col items-center gap-1">
          <span className="font-serif text-base font-medium tracking-[0.08em] text-muted group-hover:text-primary transition-colors">
            ARGUMEND
          </span>
          <span className="text-[10px] font-sans text-stone-400">
            Map the Truth
          </span>
        </Link>
      </div>
    </div>
  );
}
