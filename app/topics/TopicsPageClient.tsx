"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { CATEGORY_LABELS, CATEGORY_ORDER } from "@/data/topicIndex";
import type { TopicCategory } from "@/data/topicIndex";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { CollectionPagination } from "@/components/CollectionPagination";
import { Chip, PageContainer, PageHeader, TextAction } from "@/components/ui";
import { useSavedTopicIds } from "@/hooks/useSavedTopics";
import { paginate, TOPICS_PAGE_SIZE } from "@/lib/collectionPagination";
import {
  DEBATE_MAP_ENTRIES,
  LIBRARY_ENTRIES,
  SORT_OPTIONS,
  STATUS_LABELS,
  filterLibrary,
  queryForTopicsState,
  showsStartHere,
  type LibraryEntry,
  type SortOption,
  type TopicsQueryState,
} from "./_query";

export type { SortOption, TopicsQueryState } from "./_query";

const LIBRARY_IDS = new Set(LIBRARY_ENTRIES.map((entry) => entry.id));

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TopicsPageClient({
  initialState,
}: {
  initialState: TopicsQueryState;
}) {
  const [activeCategory, setActiveCategory] = useState<TopicCategory | "all">(initialState.category);
  const [search, setSearch] = useState(initialState.search);
  const [sortBy, setSortBy] = useState<SortOption>(initialState.sort);
  const [page, setPage] = useState(initialState.page);
  const [savedOnly, setSavedOnly] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Saves live in this browser only, so the filter appears after mount and
  // only when there is something saved that the library can list.
  const { ids: savedIdList, hydrated: savedHydrated } = useSavedTopicIds();
  const savedIds = useMemo(
    () => new Set(savedIdList.filter((id) => LIBRARY_IDS.has(id))),
    [savedIdList],
  );
  const savedCount = savedHydrated ? savedIds.size : 0;
  const savedFilterOn = savedOnly && savedCount > 0;

  const state = useMemo(
    () => ({ category: activeCategory, search, sort: sortBy }),
    [activeCategory, search, sortBy],
  );

  const filteredTopics = useMemo(
    () => filterLibrary(state, savedFilterOn ? { savedIds } : {}),
    [state, savedFilterOn, savedIds],
  );

  const pagination = useMemo(
    () => paginate(filteredTopics, page, TOPICS_PAGE_SIZE),
    [filteredTopics, page],
  );
  const visiblePage = pagination.isOutOfRange ? 1 : pagination.page;
  const visiblePagination = pagination.isOutOfRange
    ? paginate(filteredTopics, 1, TOPICS_PAGE_SIZE)
    : pagination;
  const paginationParams = useMemo(() => queryForTopicsState(state), [state]);
  // Start here leads every page of the unfiltered library; the list below
  // it then holds the other maps, and the count says so.
  const startHere = showsStartHere(state, savedFilterOn);

  // Count per category, new-model maps included on their shelf.
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: LIBRARY_ENTRIES.length };
    for (const cat of CATEGORY_ORDER) {
      counts[cat] = LIBRARY_ENTRIES.filter((entry) => entry.category === cat).length;
    }
    return counts;
  }, []);

  const chooseCategory = (category: TopicCategory | "all") => {
    setPage(1);
    setActiveCategory(category);
  };

  const updateSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const clearFilters = () => {
    setPage(1);
    setActiveCategory("all");
    setSearch("");
    setSavedOnly(false);
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const clearSearch = () => {
    updateSearch("");
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const hasFilters =
    activeCategory !== "all" || search.trim().length > 0 || savedFilterOn;

  // The server seeds state from the query string, so page/filter URLs render
  // useful no-JS HTML. Interactive changes remain shallow and shareable. The
  // saved filter stays out of the URL: saves belong to this device.
  useEffect(() => {
    const params = queryForTopicsState(state);
    if (visiblePage > 1) params.set("page", String(visiblePage));

    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    );
  }, [state, visiblePage]);

  const topicsJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Maps",
      description: `${LIBRARY_ENTRIES.length} contested questions mapped across ${CATEGORY_ORDER.length} categories: the strongest case on every side, and the questions that would settle it.`,
      url: "https://argumend.org/topics",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: filteredTopics.length,
        itemListElement: visiblePagination.items.map((topic, index) => ({
          "@type": "ListItem",
          position: visiblePagination.startIndex + index + 1,
          name: topic.title,
          url: `https://argumend.org${topic.href}`,
          description: topic.summary,
        })),
      },
    }),
    [filteredTopics.length, visiblePagination]
  );

  // Group the visible page by category when the list is sorted that way, so a
  // reader scanning 24 rows sees where Policy ends and Technology begins
  // instead of a category repeated on every row. Pinned debate maps lead
  // the page ungrouped.
  const grouped = sortBy === "category" && activeCategory === "all";
  const groups = useMemo(() => {
    if (!grouped) return [{ category: null as TopicCategory | null, topics: visiblePagination.items }];
    const out: { category: TopicCategory | null; topics: LibraryEntry[] }[] = [];
    for (const topic of visiblePagination.items) {
      const category = topic.kind === "debate-map" ? null : topic.category;
      const last = out[out.length - 1];
      if (last && last.category === category) last.topics.push(topic);
      else out.push({ category, topics: [topic] });
    }
    return out;
  }, [grouped, visiblePagination]);

  const tabClass = (active: boolean) =>
    `relative inline-flex min-h-11 shrink-0 items-center gap-1 whitespace-nowrap px-1 text-sm transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full ${
      active
        ? "font-medium text-primary dark:text-stone-200 after:bg-deep dark:after:bg-accent-text"
        : "text-secondary dark:text-stone-400 after:bg-transparent hover:text-primary dark:hover:text-stone-200"
    }`;

  return (
    <AppShell>
      <JsonLd data={topicsJsonLd} />
      <PageContainer>
        <PageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Maps" },
          ]}
          title="Maps"
          lede={`${LIBRARY_ENTRIES.length} contested questions. Each map sets out the strongest case on every side and the questions that would settle it.`}
          className="!mb-8 sm:!mb-10"
        />

        {startHere && <StartHere />}

        {/* Category tabs: one quiet row at every width. On phones it scrolls
            sideways inside its own strip instead of wrapping into a wall of
            pills. */}
        <nav aria-label="Map categories" className="-mx-4 border-b border-stone-300/70 px-4 dark:border-divider sm:mx-0 sm:px-0">
          <div className="flex gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Link
              href="/topics"
              onClick={(event) => { event.preventDefault(); chooseCategory("all"); }}
              aria-current={activeCategory === "all" ? "page" : undefined}
              className={tabClass(activeCategory === "all")}
            >
              All <span className="tabular-nums text-muted">({categoryCounts.all})</span>
            </Link>
            {CATEGORY_ORDER.map((cat) => (
              <Link
                key={cat}
                href={`/topics?category=${cat}`}
                onClick={(event) => { event.preventDefault(); chooseCategory(cat); }}
                aria-current={activeCategory === cat ? "page" : undefined}
                className={tabClass(activeCategory === cat)}
              >
                {CATEGORY_LABELS[cat]} <span className="tabular-nums text-muted">({categoryCounts[cat]})</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Search + order */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted dark:text-stone-400" aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="search"
              value={search}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="Search the maps"
              aria-label="Search maps"
              className="min-h-11 w-full rounded-lg border border-stone-300/80 bg-card py-2.5 pl-9 pr-12 text-base text-primary dark:text-stone-200 placeholder:text-muted/80 focus:border-deep/50 focus:outline-none focus:ring-2 focus:ring-deep/20 dark:border-divider dark:placeholder:text-stone-500 sm:text-sm [&::-webkit-search-cancel-button]:hidden"
            />
            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:text-primary dark:text-stone-400 dark:hover:text-stone-200"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="topics-sort-select" className="whitespace-nowrap text-sm text-secondary dark:text-stone-400">Order:</label>
            <select
              id="topics-sort-select"
              value={sortBy}
              onChange={(e) => { setPage(1); setSortBy(e.target.value as SortOption); }}
              className="min-h-11 flex-1 rounded-lg border border-stone-300/80 bg-card px-3 py-2.5 text-sm text-primary dark:text-stone-200 focus:border-deep/50 focus:outline-none focus:ring-2 focus:ring-deep/20 dark:border-divider sm:flex-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results info, and the device's saves when there are any */}
        <div className="mt-2 flex min-h-11 flex-wrap items-center justify-between gap-x-4">
          <p className="text-sm text-secondary dark:text-stone-400" role="status" aria-live="polite" aria-atomic="true">
            Showing{" "}
            <span className="font-medium text-primary dark:text-stone-200">
              {visiblePagination.items.length > 0
                ? `${visiblePagination.startIndex + 1}–${visiblePagination.endIndex}`
                : "0"}
            </span>{" "}
            {startHere
              ? `of ${filteredTopics.length} maps, plus the ${DEBATE_MAP_ENTRIES.length} above`
              : `of ${filteredTopics.length} matching maps (${LIBRARY_ENTRIES.length} total)`}
          </p>
          <div className="flex items-center gap-4">
            {savedCount > 0 && (
              <button
                type="button"
                onClick={() => { setPage(1); setSavedOnly((on) => !on); }}
                aria-pressed={savedFilterOn}
                className={`inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-lg px-1 text-sm underline-offset-2 transition-colors ${
                  savedFilterOn
                    ? "font-medium text-primary dark:text-stone-200 underline decoration-deep decoration-2 dark:decoration-accent-text"
                    : "text-secondary dark:text-stone-400 hover:text-primary dark:hover:text-stone-200"
                }`}
              >
                Saved on this device ({savedCount})
              </button>
            )}
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-1 text-sm text-secondary dark:text-stone-400 transition-colors hover:text-primary dark:hover:text-stone-200"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Map list */}
        {filteredTopics.length === 0 ? (
          <div className="mt-6 border-t border-stone-300/70 py-16 text-center dark:border-divider">
            <p className="font-serif text-2xl text-primary dark:text-stone-200">No maps match</p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-secondary dark:text-stone-400">
              Try other words or another category, or clear the filters to
              see all {LIBRARY_ENTRIES.length} maps.
            </p>
            <TextAction onClick={clearFilters} className="mt-3">
              Clear all filters
            </TextAction>
          </div>
        ) : (
          <div className="mt-4">
            {groups.map((group, groupIndex) => {
              const TitleTag = group.category ? "h3" : "h2";
              return (
                <section
                  key={group.category ?? `ungrouped-${groupIndex}`}
                  aria-labelledby={group.category ? `topics-group-${group.category}` : undefined}
                  className={group.category ? "mt-8 first:mt-4" : undefined}
                >
                  {group.category && (
                    <div className="flex items-baseline justify-between gap-4 pb-1">
                      <h2
                        id={`topics-group-${group.category}`}
                        className="font-serif text-2xl text-primary dark:text-stone-200"
                      >
                        {CATEGORY_LABELS[group.category]}
                      </h2>
                      <span className="text-xs tabular-nums text-muted">
                        {categoryCounts[group.category]} maps
                      </span>
                    </div>
                  )}
                  <ul className="grid gap-x-12 lg:grid-cols-2">
                    {group.topics.map((topic) => (
                      <li key={topic.id} className="border-t border-stone-300/70 dark:border-divider">
                        <Link
                          href={topic.href}
                          className="group block py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep/50"
                        >
                          <TitleTag className="font-serif text-[1.3125rem] leading-snug text-primary dark:text-stone-200 transition-colors group-hover:text-deep dark:group-hover:text-accent-text">
                            {topic.title}
                          </TitleTag>
                          <p className="mt-1.5 line-clamp-2 text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
                            {topic.summary}
                          </p>
                          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8125rem] text-muted">
                            {topic.kind === "debate-map" && <Chip tone="teal">Debate map</Chip>}
                            {!group.category && <span>{CATEGORY_LABELS[topic.category]}</span>}
                            {topic.status && <span>{STATUS_LABELS[topic.status]}</span>}
                            {topic.pillarCount !== undefined && topic.evidenceCount !== undefined && (
                              <span>
                                {topic.pillarCount} {topic.pillarCount === 1 ? "pillar" : "pillars"},{" "}
                                {topic.evidenceCount} evidence {topic.evidenceCount === 1 ? "card" : "cards"}
                              </span>
                            )}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}

        <CollectionPagination
          basePath="/topics"
          currentPage={visiblePage}
          pageCount={visiblePagination.pageCount}
          params={paginationParams}
          label="Maps"
        />
      </PageContainer>
    </AppShell>
  );
}

// ---------------------------------------------------------------------------
// Start here: the new-model maps, pinned as questions
// ---------------------------------------------------------------------------

/**
 * The full debate maps (the ArgumentGraph ones), pinned above the library as
 * the questions they are, from the same lightweight registry search uses.
 * Ruled columns, the same treatment as the home page's flagship maps, so the
 * two entry points read as one set.
 */
function StartHere() {
  if (DEBATE_MAP_ENTRIES.length === 0) return null;
  return (
    <section aria-labelledby="start-here-heading" className="mb-10 md:mb-12">
      <h2 id="start-here-heading" className="label-caps">
        Start here
      </h2>
      <ul className="mt-3 grid gap-x-8 md:grid-cols-3">
        {DEBATE_MAP_ENTRIES.map((map) => (
          <li key={map.id} className="border-t border-stone-300/80 dark:border-divider">
            <Link
              href={map.href}
              className="group flex h-full flex-col py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep/50 md:py-5"
            >
              <h3 className="font-serif text-[1.375rem] leading-snug text-primary dark:text-stone-200 transition-colors group-hover:text-deep dark:group-hover:text-accent-text">
                {map.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-secondary dark:text-stone-400 md:line-clamp-3">
                {map.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="border-t border-stone-300/80 pt-1 dark:border-divider md:border-t-0 md:pt-0">
        <TextAction href="/ai">The AI argument, on one page: what it turns on now →</TextAction>
      </p>
    </section>
  );
}
