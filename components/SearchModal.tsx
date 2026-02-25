"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  MessageSquare,
  FileText,
  Lightbulb,
  File,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { topicSummaries } from "@/data/topicIndex";
import { articles } from "@/data/blog";
import { concepts } from "@/data/concepts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ResultType = "topic" | "blog" | "concept" | "page";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: ResultType;
  href: string;
}

interface SearchGroup {
  label: string;
  type: ResultType;
  results: SearchResult[];
}

// ---------------------------------------------------------------------------
// Static pages available in search
// ---------------------------------------------------------------------------

const STATIC_PAGES: SearchResult[] = [
  {
    id: "page-how-it-works",
    title: "How It Works",
    subtitle: "Learn about Argumend's methodology and approach",
    type: "page",
    href: "/how-it-works",
  },
  {
    id: "page-about",
    title: "About",
    subtitle: "Our mission to map the truth",
    type: "page",
    href: "/about",
  },
  {
    id: "page-methodology",
    title: "Methodology",
    subtitle: "Evidence weighting, scoring, and verification",
    type: "page",
    href: "/methodology",
  },
  {
    id: "page-faq",
    title: "FAQ",
    subtitle: "Frequently asked questions",
    type: "page",
    href: "/faq",
  },
  {
    id: "page-analyze",
    title: "Analyze",
    subtitle: "Paste text and extract positions, cruxes, and fallacies",
    type: "page",
    href: "/analyze",
  },
  {
    id: "page-library",
    title: "Library",
    subtitle: "Browse all topics and arguments",
    type: "page",
    href: "/library",
  },
  {
    id: "page-concepts",
    title: "Concepts",
    subtitle: "Core critical thinking concepts and definitions",
    type: "page",
    href: "/concepts",
  },
  {
    id: "page-blog",
    title: "Blog",
    subtitle: "Articles on critical thinking and epistemology",
    type: "page",
    href: "/blog",
  },
  {
    id: "page-community",
    title: "Community",
    subtitle: "Join the Argumend community",
    type: "page",
    href: "/community",
  },
  {
    id: "page-for-educators",
    title: "For Educators",
    subtitle: "Teaching critical thinking with Argumend",
    type: "page",
    href: "/for-educators",
  },
];

// ---------------------------------------------------------------------------
// Featured suggestions (shown when input is empty)
// ---------------------------------------------------------------------------

const FEATURED_TOPIC_IDS = [
  "climate-change",
  "ai-risk",
  "free-will",
  "moon-landing",
  "simulation-hypothesis",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function matchesQuery(text: string, query: string): boolean {
  const lower = text.toLowerCase();
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return terms.every((term) => lower.includes(term));
}

const TYPE_CONFIG: Record<
  ResultType,
  { icon: typeof Search; label: string; badgeClasses: string }
> = {
  topic: {
    icon: MessageSquare,
    label: "Topics",
    badgeClasses: "bg-deep/10 text-deep",
  },
  blog: {
    icon: FileText,
    label: "Blog",
    badgeClasses: "bg-deep/5 text-deep/80",
  },
  concept: {
    icon: Lightbulb,
    label: "Concepts",
    badgeClasses: "bg-rust-50 text-rust-600",
  },
  page: {
    icon: File,
    label: "Pages",
    badgeClasses: "bg-stone-100 text-stone-500",
  },
};

const MAX_PER_GROUP = 5;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // -----------------------------------------------------------------------
  // Build search index once
  // -----------------------------------------------------------------------

  const allItems = useMemo<SearchResult[]>(() => {
    const topicResults: SearchResult[] = topicSummaries.map((t) => ({
      id: `topic-${t.id}`,
      title: t.title,
      subtitle: t.meta_claim,
      type: "topic" as const,
      href: `/topics/${t.id}`,
    }));

    const blogResults: SearchResult[] = articles.map((a) => ({
      id: `blog-${a.slug}`,
      title: a.title,
      subtitle: a.description,
      type: "blog" as const,
      href: `/blog/${a.slug}`,
    }));

    const conceptResults: SearchResult[] = concepts.map((c) => ({
      id: `concept-${c.id}`,
      title: c.title,
      subtitle: c.description.slice(0, 160) + (c.description.length > 160 ? "..." : ""),
      type: "concept" as const,
      href: `/concepts/${c.id}`,
    }));

    return [...topicResults, ...blogResults, ...conceptResults, ...STATIC_PAGES];
  }, []);

  // -----------------------------------------------------------------------
  // Search logic
  // -----------------------------------------------------------------------

  const groups = useMemo<SearchGroup[]>(() => {
    const trimmed = query.trim();

    // Empty query: show featured topics
    if (!trimmed) {
      const featured = topicSummaries
        .filter((t) => FEATURED_TOPIC_IDS.includes(t.id))
        .map((t) => ({
          id: `topic-${t.id}`,
          title: t.title,
          subtitle: t.meta_claim,
          type: "topic" as ResultType,
          href: `/topics/${t.id}`,
        }));

      return [{ label: "Popular Topics", type: "topic", results: featured }];
    }

    // Filter items
    const matched = allItems.filter((item) => {
      const searchable = `${item.title} ${item.subtitle}`;
      if (item.type === "blog") {
        const article = articles.find((a) => `blog-${a.slug}` === item.id);
        if (article) {
          return matchesQuery(`${searchable} ${article.tags.join(" ")}`, trimmed);
        }
      }
      return matchesQuery(searchable, trimmed);
    });

    // Group by type
    const typeOrder: ResultType[] = ["topic", "blog", "concept", "page"];
    const grouped: SearchGroup[] = [];

    for (const type of typeOrder) {
      const results = matched.filter((r) => r.type === type).slice(0, MAX_PER_GROUP);
      if (results.length > 0) {
        grouped.push({
          label: TYPE_CONFIG[type].label,
          type,
          results,
        });
      }
    }

    return grouped;
  }, [query, allItems]);

  // Flat list of all visible results for keyboard navigation
  const flatResults = useMemo(
    () => groups.flatMap((g) => g.results),
    [groups]
  );

  // -----------------------------------------------------------------------
  // Reset state on open/close
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // -----------------------------------------------------------------------
  // Keyboard navigation
  // -----------------------------------------------------------------------

  const navigate = useCallback(
    (result: SearchResult) => {
      router.push(result.href);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < flatResults.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : flatResults.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (flatResults[activeIndex]) {
            navigate(flatResults[activeIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [flatResults, activeIndex, navigate, onClose]
  );

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(
      `[data-index="${activeIndex}"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  let flatIndex = -1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 backdrop-blur-md bg-black/40"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full max-w-2xl bg-[#faf8f5] rounded-2xl shadow-2xl border border-stone-200/40 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Search Argumend"
          onKeyDown={handleKeyDown}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-200/60">
            <Search className="h-5 w-5 text-deep flex-shrink-0" strokeWidth={1.8} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, articles, concepts, pages..."
              className="flex-1 bg-transparent text-lg text-primary placeholder:text-stone-500 outline-none font-sans"
              autoComplete="off"
              spellCheck={false}
              aria-label="Search Argumend"
              role="combobox"
              aria-expanded={groups.length > 0}
              aria-controls="search-results"
              aria-activedescendant={flatResults[activeIndex] ? `search-result-${flatResults[activeIndex].id}` : undefined}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="flex items-center justify-center h-11 w-11 rounded-md text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-shrink-0 px-3 py-2 min-h-[44px] rounded-md border border-stone-200 text-xs text-stone-500 font-mono hover:bg-stone-100 transition-colors"
              aria-label="Close search"
            >
              ESC
            </button>
          </div>

          {/* Results */}
          <div
            ref={listRef}
            id="search-results"
            className="max-h-[60vh] overflow-y-auto overscroll-contain py-2"
            role="listbox"
          >
            {groups.length === 0 && query.trim() !== "" && (
              <div className="px-5 py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-5 w-5 text-stone-400" />
                </div>
                <div className="text-stone-500 text-sm font-medium">
                  Nothing matching{" "}
                  <span className="text-primary">
                    &ldquo;{query}&rdquo;
                  </span>
                </div>
                <div className="mt-2 text-stone-400 text-xs">
                  Try different words, or just browse the topics
                </div>
              </div>
            )}

            {groups.map((group) => (
              <div key={group.label} className="mb-1">
                {/* Group header */}
                <div className="px-5 py-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                    {group.label}
                  </span>
                </div>

                {/* Results */}
                {group.results.map((result) => {
                  flatIndex++;
                  const idx = flatIndex;
                  const isActive = idx === activeIndex;
                  const config = TYPE_CONFIG[result.type];
                  const Icon = config.icon;

                  return (
                    <button
                      key={result.id}
                      data-index={idx}
                      onClick={() => navigate(result)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`
                        w-full flex items-center gap-3 px-5 py-3 text-left transition-colors duration-100
                        ${isActive ? "bg-deep/5" : "bg-transparent hover:bg-stone-50/60"}
                      `}
                      role="option"
                      aria-selected={isActive}
                    >
                      {/* Icon */}
                      <div
                        className={`
                          flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                          ${isActive ? "bg-deep/10" : "bg-stone-100"}
                        `}
                      >
                        <Icon
                          className={`h-4 w-4 ${isActive ? "text-deep" : "text-stone-400"}`}
                          strokeWidth={1.8}
                        />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-sm font-medium truncate ${
                            isActive ? "text-deep" : "text-primary"
                          }`}
                        >
                          {result.title}
                        </div>
                        <div className="text-xs text-stone-400 truncate mt-0.5">
                          {result.subtitle}
                        </div>
                      </div>

                      {/* Badge */}
                      <span
                        className={`
                          flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full
                          ${config.badgeClasses}
                        `}
                      >
                        {config.label.slice(0, -1)}
                      </span>

                      {/* Arrow for active */}
                      {isActive && (
                        <ArrowRight
                          className="flex-shrink-0 h-3.5 w-3.5 text-deep"
                          strokeWidth={2}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-2.5 border-t border-stone-200/60 bg-[#f4f1eb]/50">
            <div className="flex items-center gap-4 text-[11px] text-stone-400">
              <span className="flex items-center gap-1">
                <kbd className="inline-flex h-4 items-center rounded border border-stone-200 bg-white px-1 font-mono text-[10px]">
                  &uarr;
                </kbd>
                <kbd className="inline-flex h-4 items-center rounded border border-stone-200 bg-white px-1 font-mono text-[10px]">
                  &darr;
                </kbd>
                <span className="ml-0.5">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" />
                <span>Select</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="inline-flex h-4 items-center rounded border border-stone-200 bg-white px-1 font-mono text-[10px]">
                  esc
                </kbd>
                <span>Close</span>
              </span>
            </div>
            <div className="text-[11px] text-stone-400">
              {flatResults.length} result{flatResults.length !== 1 ? "s" : ""}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
