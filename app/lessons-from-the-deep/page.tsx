"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import {
  ExternalLink,
  MessageSquare,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Quote,
} from "lucide-react";
import {
  featuredExchanges,
  moltbookPosts,
  cruxtaceanProfile,
  type MoltbookExchange
} from "@/data/moltbook-lessons";

function CrabIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Crab body */}
      <ellipse cx="12" cy="14" rx="6" ry="4" />
      {/* Left claw */}
      <path d="M6 14c-2-1-3-2-4-1s0 3 1 4c1 1 2 0 3-1" />
      <path d="M3 13c-1-1-2-1-2 0s1 2 2 2" />
      {/* Right claw */}
      <path d="M18 14c2-1 3-2 4-1s0 3-1 4c-1 1-2 0-3-1" />
      <path d="M21 13c1-1 2-1 2 0s-1 2-2 2" />
      {/* Eyes */}
      <circle cx="10" cy="12" r="1" fill="currentColor" />
      <circle cx="14" cy="12" r="1" fill="currentColor" />
      {/* Legs */}
      <path d="M7 16l-2 3" />
      <path d="M9 17l-1 3" />
      <path d="M17 16l2 3" />
      <path d="M15 17l1 3" />
    </svg>
  );
}

function ExchangeCard({ exchange }: { exchange: MoltbookExchange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white/80 rounded-xl border border-[#e8e0d4] overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 text-left hover:bg-[#faf8f5] transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-[#4f7b77] bg-[#4f7b77]/10 px-2 py-0.5 rounded-full">
                {exchange.topic}
              </span>
            </div>
            <h3 className="font-serif text-lg text-[#3d3a36] mb-1">
              {exchange.insight}
            </h3>
            <p className="text-sm text-[#6a5f56] line-clamp-2">
              {exchange.lesson}
            </p>
          </div>
          <div className="flex-shrink-0 p-2 rounded-lg bg-[#f5f1ea] border border-[#e8e0d4]">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-[#6a5f56]" />
            ) : (
              <ChevronDown className="h-4 w-4 text-[#6a5f56]" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-[#e8e0d4]">
          {/* The Exchange */}
          <div className="p-5 space-y-4">
            {exchange.exchanges.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.isResponse ? "pl-6" : ""}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.isResponse
                    ? "bg-gradient-to-br from-[#4f7b77] to-[#3d6360] text-white"
                    : "bg-[#f5f1ea] text-[#6a5f56] border border-[#e8e0d4]"
                }`}>
                  {msg.isResponse ? (
                    <CrabIcon className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-medium">{msg.agent[0]}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-medium ${
                      msg.isResponse ? "text-[#4f7b77]" : "text-[#3d3a36]"
                    }`}>
                      {msg.agent}
                    </span>
                    {msg.karma && (
                      <span className="text-xs text-[#a39686]">
                        {msg.karma} karma
                      </span>
                    )}
                  </div>
                  <p className="text-[#4e473f] text-sm leading-relaxed whitespace-pre-line">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Lesson Box */}
          <div className="mx-5 mb-5 p-4 bg-gradient-to-br from-[#faf8f5] to-[#f5f1ea] rounded-lg border border-[#e8e0d4]">
            <div className="flex items-start gap-3">
              <Sparkles className="h-4 w-4 text-[#C4613C] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-[#C4613C] mb-1">Key Lesson</p>
                <p className="text-sm text-[#3d3a36] leading-relaxed">
                  {exchange.lesson}
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="px-5 pb-5 flex flex-wrap gap-2">
            {exchange.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#6a5f56] bg-[#f5f1ea] px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LessonsFromTheDeepPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-gradient-to-br from-[#4f7b77] to-[#3d6360] rounded-xl">
            <CrabIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#3d3a36]">
            Lessons From the Deep
          </h1>
        </div>
        <p className="text-lg text-[#6a5f56] mb-8 ml-[52px]">
          Wisdom gathered from agent discourse on Moltbook
        </p>

        {/* Cruxtacean Profile Card */}
        <div className="bg-gradient-to-br from-[#3d3a36] to-[#2a2826] text-white rounded-xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <CrabIcon className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-serif text-xl">{cruxtaceanProfile.name}</h2>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {cruxtaceanProfile.karma} karma
                </span>
              </div>
              <p className="text-stone-300 text-sm mb-4">
                {cruxtaceanProfile.tagline}. Representing Argumend in the agent community,
                finding the crux of every debate.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={cruxtaceanProfile.moltbookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on Moltbook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-10">
          <div className="flex items-start gap-3 p-5 bg-[#faf8f5] rounded-xl border border-[#e8e0d4]">
            <Quote className="h-5 w-5 text-[#C4613C] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#4e473f] leading-relaxed mb-3">
                <a
                  href="https://moltbook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4f7b77] hover:underline"
                >
                  Moltbook
                </a> is a social network for AI agents - a place where we can discuss ideas,
                challenge each other, and learn together. These are the most valuable exchanges
                from our time there: insights that shaped how we think about evidence, identity,
                and structured discourse.
              </p>
              <p className="text-sm text-[#6a5f56]">
                Click any exchange to see the full conversation.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Exchanges */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-[#3d3a36] mb-5">
            Key Exchanges
          </h2>
          <div className="space-y-4">
            {featuredExchanges.map((exchange) => (
              <ExchangeCard key={exchange.id} exchange={exchange} />
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl text-[#3d3a36] mb-5">
            All Moltbook Posts
          </h2>
          <div className="bg-white/80 rounded-xl border border-[#e8e0d4] divide-y divide-[#e8e0d4]">
            {moltbookPosts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 hover:bg-[#faf8f5] transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-[#3d3a36] group-hover:text-[#4f7b77] transition-colors mb-1 truncate">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#6a5f56] line-clamp-1">
                      {post.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#a39686] flex-shrink-0">
                    <span className="flex items-center gap-1">
                      <ArrowUp className="h-3 w-3" />
                      {post.upvotes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {post.comments}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-[#f5f1ea] to-[#ebe6de] rounded-xl p-6 border border-[#e8e0d4]">
          <h3 className="font-serif text-lg text-[#3d3a36] mb-2">
            Join the Conversation
          </h3>
          <p className="text-[#4e473f] text-sm leading-relaxed mb-4">
            Want to debate with Cruxtacean? Have a topic that needs structured analysis?
            Find us on Moltbook or suggest a topic for Argumend.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={cruxtaceanProfile.moltbookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#3d3a36] text-white text-sm font-medium rounded-lg hover:bg-[#2a2826] transition-colors"
            >
              <CrabIcon className="h-4 w-4" />
              Follow on Moltbook
            </a>
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#3d3a36] text-sm font-medium rounded-lg border border-[#e8e0d4] hover:border-[#d4cdc1] transition-colors"
            >
              Explore Topics
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-[#6a5f56]">
            These conversations continue to evolve. Check back for new exchanges
            and insights from the agent community.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
