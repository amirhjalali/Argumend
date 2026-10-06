"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  FileText,
  Lightbulb,
  File,
  Network,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORY_LABELS } from "@/data/topicIndex";
import type { TopicCategory } from "@/data/topicIndex";
import { toneStyles } from "@/lib/categoryColors";
import { createSiteSearch, noMapLine } from "@/lib/siteSearch";
import { ANALYZE_HREF } from "@/lib/nav";
import { articleSummaries } from "@/data/blogIndex";
import { concepts } from "@/data/concepts";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { MAP_SEARCH_ITEMS } from "@/lib/mapSearchItems";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ResultType = "map" | "topic" | "blog" | "concept" | "page";

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: ResultType;
  href: string;
  // Topic-specific fields
  category?: TopicCategory;
  // Extra searchable text (not rendered) — indexed by lib/siteSearch.ts.
  /** Other names for a map: its old short title and "Also asked as" phrasings. */
  altNames?: string;
  meta_claim?: string;
  categoryText?: string;
  tags?: string;
  aliases?: string;
  /** A flagship map: a small lift in ranking (lib/siteSearch.ts). */
  flagship?: boolean;
}

interface SearchGroup {
  label: string;
  type: ResultType;
  results: SearchResult[];
}

// ---------------------------------------------------------------------------
// Static pages available in search
// ---------------------------------------------------------------------------

/** The two shortcuts shown on an empty query, and findable by name. */
const PASTE_PAGE: SearchResult = {
  id: "page-paste",
  title: "Paste an argument",
  subtitle: "Find what a disagreement actually turns on",
  type: "page",
  href: ANALYZE_HREF,
};

const ALL_MAPS_PAGE: SearchResult = {
  id: "page-all-maps",
  title: "All maps",
  subtitle: "Every question Argumend has mapped",
  type: "page",
  href: "/topics",
};

/** Where a reader suggests a map: also the "no map yet" empty state's second way forward. */
const CONTRIBUTE_PAGE: SearchResult = {
  id: "page-contribute",
  title: "Contribute",
  subtitle: "Suggest a correction or a new map on GitHub",
  type: "page",
  href: "/about#contribute",
};

const STATIC_PAGES: SearchResult[] = [
  PASTE_PAGE,
  ALL_MAPS_PAGE,
  // Sections that used to be pages link to their section, not to the old
  // path: a redirect drops the #anchor on client navigation.
  {
    id: "page-about",
    title: "About",
    subtitle: "Why Argumend exists and the principles behind it",
    type: "page",
    href: "/about",
  },
  {
    id: "page-read-a-map",
    title: "How to read a map",
    subtitle: "How it works: the question, the cruxes, and what would settle each",
    type: "page",
    href: "/about#read-a-map",
  },
  CONTRIBUTE_PAGE,
  {
    id: "page-methodology",
    title: "How maps are made",
    subtitle: "The methodology: positions, evidence, and what would settle each crux",
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
    id: "page-learn",
    title: "Learn",
    subtitle: "Core ideas, guides, fallacies, the glossary and essays",
    type: "page",
    href: "/learn",
  },
  {
    id: "page-core-ideas",
    title: "Core ideas",
    subtitle: "Cruxes, steel-manning, evidence weighting and other concepts",
    type: "page",
    href: "/learn#ideas",
  },
  {
    id: "page-guides",
    title: "Guides",
    subtitle: "Step-by-step guides to reading and weighing an argument",
    type: "page",
    href: "/learn#guides",
  },
  {
    id: "page-research",
    title: "Research",
    subtitle: "The research behind Argumend: the perception gap and what helps",
    type: "page",
    href: "/research",
  },
  {
    id: "page-reading-list",
    title: "Reading list",
    subtitle: "Books and papers on disagreement and reasoning (the old library)",
    type: "page",
    href: "/research#reading",
  },
  {
    id: "page-blog",
    title: "Essays",
    subtitle: "The blog: essays on disagreement, evidence and reasoning",
    type: "page",
    href: "/blog",
  },
  {
    id: "page-for-educators",
    title: "For teachers",
    subtitle: "Teaching critical thinking with argument maps",
    type: "page",
    href: "/for-educators",
  },
];

// ---------------------------------------------------------------------------
// Empty-query suggestions: the two flagship maps, then the two ways in.
// Hand-picked, not "popular": nothing here measures popularity.
// ---------------------------------------------------------------------------

const FLAGSHIP_MAP_IDS = ["ai-mass-unemployment", "capitalism-after-ai"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TYPE_CONFIG: Record<
  ResultType,
  { icon: typeof Search; label: string; badge: string }
> = {
  map: {
    icon: Network,
    label: "Maps",
    badge: "Map",
  },
  // Pillar-model maps. Same kind of thing as `map` to a reader, so the same
  // label and badge, and they share the "Maps" group (see the grouping below).
  topic: {
    icon: Network,
    label: "Maps",
    badge: "Map",
  },
  // The Learn library's words (lib/learn/sections.ts): essays and ideas.
  blog: {
    icon: FileText,
    label: "Essays",
    badge: "Essay",
  },
  concept: {
    icon: Lightbulb,
    label: "Core ideas",
    badge: "Idea",
  },
  page: {
    icon: File,
    label: "Pages",
    badge: "Page",
  },
};

const MAX_PER_GROUP = 5;

/**
 * Everything the header search can find, in one list: maps first, then
 * essays, core ideas and pages. Exported for the site-search eval
 * (lib/siteSearchEval.test.ts), which ranks the same list.
 */
export function buildSearchItems(): SearchResult[] {
  // One name per map: the question its page asks (lib/mapNaming.ts); the
  // old short title and "Also asked as" phrasings still find it.
  const mapResults: SearchResult[] = MAP_SEARCH_ITEMS.map((item) => ({
    ...item,
    type: item.kind === "debate-map" ? ("map" as const) : ("topic" as const),
  }));

  const blogResults: SearchResult[] = articleSummaries.map((a) => ({
    id: `blog-${a.slug}`,
    title: a.title,
    subtitle: a.description,
    type: "blog" as const,
    href: `/blog/${a.slug}`,
    meta_claim: a.description,
    tags: (a.tags ?? []).join(" "),
  }));

  const conceptResults: SearchResult[] = concepts.map((c) => ({
    id: `concept-${c.id}`,
    title: c.title,
    subtitle: c.description.slice(0, 160) + (c.description.length > 160 ? "..." : ""),
    type: "concept" as const,
    href: `/concepts/${c.id}`,
    meta_claim: c.description,
  }));

  const pageResults: SearchResult[] = STATIC_PAGES.map((p) => ({
    ...p,
    meta_claim: p.subtitle,
  }));

  return [
    ...mapResults,
    ...blogResults,
    ...conceptResults,
    ...pageResults,
  ];
}

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
  const modalRef = useModalAccessibility<HTMLDivElement>({ isOpen, onClose });

  // -----------------------------------------------------------------------
  // Build search index once
  // -----------------------------------------------------------------------

  const allItems = useMemo<SearchResult[]>(() => buildSearchItems(), []);

  // -----------------------------------------------------------------------
  // Build the search index from allItems (memoized — built once on the
  // client). Ranking lives in lib/siteSearch.ts: names (question, old title,
  // "Also asked as") over body text, question words ignored.
  // -----------------------------------------------------------------------

  const search = useMemo(() => createSiteSearch(allItems), [allItems]);

  // Fast lookup from result id back to the full SearchResult for rendering.
  const itemsById = useMemo(() => {
    const map = new Map<string, SearchResult>();
    for (const item of allItems) map.set(item.id, item);
    return map;
  }, [allItems]);

  // -----------------------------------------------------------------------
  // Search logic
  // -----------------------------------------------------------------------

  const groups = useMemo<SearchGroup[]>(() => {
    const trimmed = query.trim();

    // Empty query: the two flagship maps, then the two ways in (paste an
    // argument, browse every map). Taken from `allItems` so the result shape
    // matches searched results and `flatResults` stays the one keyboard order.
    if (!trimmed) {
      const flagships = FLAGSHIP_MAP_IDS.map((id) => itemsById.get(`map-${id}`)).filter(
        (item): item is SearchResult => item != null,
      );

      return [
        { label: "Maps", type: "map", results: flagships },
        { label: "Go to", type: "page", results: [PASTE_PAGE, ALL_MAPS_PAGE] },
      ];
    }

    // Ranked search — results come back best first.
    const matched = search(trimmed);

    // Group by type; both map models share one "Maps" group, in score order.
    const typeOrder: ResultType[] = ["map", "blog", "concept", "page"];
    const grouped: SearchGroup[] = [];

    for (const type of typeOrder) {
      const results = matched
        .filter((r) => (r.type === "topic" ? "map" : r.type) === type)
        .slice(0, MAX_PER_GROUP);
      if (results.length > 0) {
        grouped.push({
          label: TYPE_CONFIG[type].label,
          type,
          results,
        });
      }
    }

    return grouped;
  }, [query, search, itemsById]);

  // Flat list of all visible results for keyboard navigation
  const flatResults = useMemo(
    () => groups.flatMap((g) => g.results),
    [groups]
  );
  const hasMaps = groups.some((group) => group.type === "map");

  const updateQuery = useCallback((nextQuery: string) => {
    setQuery(nextQuery);
    setActiveIndex(0);
  }, []);

  // -----------------------------------------------------------------------
  // Reset query state on open. The shared modal hook owns focus containment,
  // Escape, body scroll lock, and focus restoration (including animated exits).
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!isOpen) return;
    queueMicrotask(() => updateQuery(""));
  }, [isOpen, updateQuery]);

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
      if (flatResults.length === 0) return;

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
      }
    },
    [flatResults, activeIndex, navigate]
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

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {isOpen && (
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
          ref={modalRef}
          id="argumend-search-dialog"
          className="relative w-full max-w-2xl bg-[#faf8f5] dark:bg-[var(--bg-card)] rounded-2xl shadow-2xl border border-stone-200/40 dark:border-[var(--border-divider)] overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Search Argumend"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-200/60 dark:border-[var(--border-divider)]">
            <Search className="h-5 w-5 text-deep dark:text-accent-text flex-shrink-0" strokeWidth={1.8} />
            <input
              ref={inputRef}
              data-modal-initial-focus
              type="text"
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              placeholder="Search maps, articles, concepts…"
              className="flex-1 bg-transparent text-lg text-primary dark:text-stone-200 placeholder:text-stone-500 outline-none font-sans"
              autoComplete="off"
              spellCheck={false}
              aria-label="Search Argumend"
              role="combobox"
              aria-expanded={groups.length > 0}
              aria-controls="search-results"
              aria-autocomplete="list"
              aria-describedby="search-result-status"
              aria-activedescendant={flatResults[activeIndex] ? `search-result-${flatResults[activeIndex].id}` : undefined}
              onKeyDown={handleKeyDown}
            />
            {query && (
              <button
                onClick={() => updateQuery("")}
                className="flex items-center justify-center h-11 w-11 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-[var(--bg-muted)] transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-shrink-0 px-3 py-2 min-h-[44px] rounded-md border border-stone-200 dark:border-[var(--border-divider)] text-xs text-stone-600 dark:text-stone-400 font-mono hover:bg-stone-100 dark:hover:bg-[var(--bg-muted)] transition-colors"
              aria-label="Close search (Esc)"
            >
              ESC
            </button>
          </div>

          {/* Screen-reader-only live region announcing result count */}
          <div
            id="search-result-status"
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {query.trim()
              ? flatResults.length > 0
                ? `${flatResults.length} result${flatResults.length !== 1 ? "s" : ""} for “${query.trim()}”`
                : `No results for “${query.trim()}”`
              : `${groups[0]?.results.length ?? 0} maps and ${groups[1]?.results.length ?? 0} shortcuts`}
          </div>

          {/* Results */}
          <div
            ref={listRef}
            id="search-results"
            className="max-h-[60vh] overflow-y-auto overscroll-contain py-2"
            role="listbox"
          >
            {/* No map for the query: say so by name, and offer the two ways
                forward (paste the argument itself; suggest a map). Above any
                essays or pages that did match, alone when nothing did. */}
            {query.trim() !== "" && !hasMaps && (
              <div className={groups.length === 0 ? "px-5 py-12 text-center" : "px-5 pb-3 pt-2"}>
                {groups.length === 0 && (
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-[var(--bg-muted)] flex items-center justify-center mx-auto mb-4">
                    <Search className="h-5 w-5 text-stone-400" />
                  </div>
                )}
                <p className="text-sm font-medium text-primary dark:text-stone-200">{noMapLine(query)}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-secondary dark:text-stone-400">
                  <button
                    type="button"
                    onClick={() => navigate(PASTE_PAGE)}
                    className="text-deep underline underline-offset-2 hover:text-deep-dark transition-colors dark:text-accent-text"
                  >
                    Paste the argument you&rsquo;re in
                  </button>{" "}
                  to find what it turns on, or{" "}
                  <button
                    type="button"
                    onClick={() => navigate(CONTRIBUTE_PAGE)}
                    className="text-deep underline underline-offset-2 hover:text-deep-dark transition-colors dark:text-accent-text"
                  >
                    suggest a map
                  </button>
                  .
                </p>
              </div>
            )}

            {groups.map((group) => (
              <div key={group.label} className="mb-1">
                {/* Group header */}
                <div className="px-5 py-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-stone-400">
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
                  const isTopic = result.type === "topic";
                  // The "Maps" group header already says what these are.
                  const isMap = result.type === "topic" || result.type === "map";

                  return (
                    <button
                      key={result.id}
                      data-index={idx}
                      id={`search-result-${result.id}`}
                      onClick={() => navigate(result)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`
                        w-full flex items-center gap-3 px-5 py-3 text-left transition-colors duration-100
                        ${isActive ? "bg-rust-50/60 dark:bg-rust-900/30 border-l-2 border-l-rust-500 ring-2 ring-inset ring-focus" : "bg-transparent hover:bg-stone-50/60 dark:hover:bg-subtle/60 border-l-2 border-l-transparent"}
                      `}
                      role="option"
                      aria-selected={isActive}
                    >
                      {/* Icon */}
                      <div
                        className={`
                          flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                          ${isActive ? "bg-rust-100/80 dark:bg-rust-900/40" : "bg-stone-100 dark:bg-[var(--bg-muted)]"}
                        `}
                      >
                        <Icon
                          className={`h-4 w-4 ${isActive ? "text-rust-600 dark:text-rust-300" : "text-stone-400"}`}
                          strokeWidth={1.8}
                        />
                      </div>

                      {/* Text. Titles wrap: a map's name is a whole question. */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <span
                            className={`text-sm font-medium break-words ${
                              isActive ? "text-rust-700 dark:text-rust-300" : "text-primary dark:text-stone-200"
                            }`}
                          >
                            {result.title}
                          </span>
                          {/* One neutral chip for every category: colour
                              would read as a ranking or a side. */}
                          {isTopic && result.category && (
                            <span
                              className={`
                                flex-shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full border
                                ${toneStyles.neutral.chip}
                              `}
                            >
                              {CATEGORY_LABELS[result.category]}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted dark:text-stone-400 truncate mt-0.5">
                          {result.subtitle}
                        </div>
                      </div>

                      {/* Type badge. No lean or score: search is a way in,
                          not a scoreboard (2026-09-29 overhaul). None on
                          maps: the group header names them, and at 390 the
                          pill only squeezed the question. */}
                      {!isMap && (
                        <span
                          className={`
                            flex-shrink-0 whitespace-nowrap text-center min-w-[3.25rem] text-[10px] font-medium px-2 py-0.5 rounded-full border
                            ${toneStyles.neutral.chip}
                          `}
                        >
                          {config.badge}
                        </span>
                      )}

                      {/* Arrow for active */}
                      {isActive && (
                        <ArrowRight
                          className="flex-shrink-0 h-3.5 w-3.5 text-rust-600 dark:text-rust-300"
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
          <div className="flex items-center justify-between px-5 py-2.5 border-t border-stone-200/60 dark:border-[var(--border-divider)] bg-[#f4f1eb]/50 dark:bg-canvas/50">
            <div className="flex items-center gap-4 text-[11px] text-muted dark:text-stone-400">
              <span className="flex items-center gap-1">
                <kbd className="inline-flex h-4 items-center rounded border border-stone-200 dark:border-[var(--border-divider)] bg-white dark:bg-[var(--bg-muted)] px-1 font-mono text-[10px]">
                  &uarr;
                </kbd>
                <kbd className="inline-flex h-4 items-center rounded border border-stone-200 dark:border-[var(--border-divider)] bg-white dark:bg-[var(--bg-muted)] px-1 font-mono text-[10px]">
                  &darr;
                </kbd>
                <span className="ml-0.5">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" />
                <span>Select</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="inline-flex h-4 items-center rounded border border-stone-200 dark:border-[var(--border-divider)] bg-white dark:bg-[var(--bg-muted)] px-1 font-mono text-[10px]">
                  esc
                </kbd>
                <span>Close</span>
              </span>
            </div>
            <div className="text-[11px] text-muted dark:text-stone-400">
              {flatResults.length} result{flatResults.length !== 1 ? "s" : ""}
            </div>
          </div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
