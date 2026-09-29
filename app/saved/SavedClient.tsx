"use client";

import { useMemo } from "react";
import Link from "next/link";
import { AlertCircle, X } from "lucide-react";
import { useSavedTopicIds } from "@/hooks/useSavedTopics";
import { Button, PageContainer, PageHeader, TextAction } from "@/components/ui";
import { LIBRARY_ENTRIES, type LibraryEntry } from "@/app/topics/_query";
import { MapCardText } from "@/app/topics/MapCardText";

const ENTRIES_BY_ID = new Map(LIBRARY_ENTRIES.map((entry) => [entry.id, entry]));

/**
 * The maps saved on this device, as the same hairline rows /topics lists
 * them in: the question, its one line, and at most one muted word on how far
 * the evidence has got. No balance chip, no verdict, no category pill.
 */
export function SavedClient() {
  const { ids, hydrated, error, remove } = useSavedTopicIds();

  // Resolve saved ids through the library's own rows, in save order. Ids that
  // no longer name a map (removed from the dataset) are dropped.
  const savedMaps = useMemo(
    () => ids.flatMap((id) => {
      const entry = ENTRIES_BY_ID.get(id);
      return entry ? [entry] : [];
    }),
    [ids],
  );

  return (
    <PageContainer>
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Maps", href: "/topics" },
          { label: "Saved" },
        ]}
        title="Saved maps"
        lede="Maps you have bookmarked on this device. They live in your browser; no account needed."
        meta={
          hydrated && savedMaps.length > 0
            ? `${savedMaps.length} saved, in the order you saved them`
            : undefined
        }
        className="!mb-8 sm:!mb-10"
      />

      {!hydrated ? (
        // Matches the server render (no localStorage there), so nothing
        // mismatches on hydration.
        <p
          className="border-t border-stone-300/70 py-10 text-sm text-muted dark:border-divider dark:text-stone-400"
          role="status"
          aria-live="polite"
        >
          Loading your saved maps&hellip;
        </p>
      ) : error && ids.length === 0 ? (
        <div role="alert" className="border-t border-stone-300/70 py-10 dark:border-divider">
          <h2 className="flex items-center gap-2 font-serif text-2xl text-error-text">
            <AlertCircle className="h-5 w-5 shrink-0 text-error" aria-hidden="true" />
            Saved maps are unavailable
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-error-text">
            {error} Check this browser&rsquo;s storage or privacy settings, then
            reload the page. No bookmarks were changed.
          </p>
        </div>
      ) : savedMaps.length === 0 ? (
        <div className="border-t border-stone-300/70 py-10 dark:border-divider">
          <h2 className="font-serif text-2xl text-primary dark:text-stone-200">
            Nothing saved yet
          </h2>
          <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
            Open any map and use Save to keep it here for later.
          </p>
          <Button href="/topics" className="mt-6">
            Browse maps
          </Button>
        </div>
      ) : (
        <>
          <ul className="grid gap-x-12 lg:grid-cols-2">
            {savedMaps.map((map) => (
              <SavedRow key={map.id} map={map} onRemove={remove} />
            ))}
          </ul>
          <p className="mt-6 border-t border-stone-300/70 pt-2 dark:border-divider">
            <TextAction href="/topics">Browse all maps</TextAction>
          </p>
        </>
      )}

      {error && ids.length > 0 && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-error/30 bg-error/[0.06] px-4 py-3 text-sm text-error-text dark:border-error/40 dark:bg-error/10"
        >
          {error} Your existing bookmarks have not changed.
        </p>
      )}
    </PageContainer>
  );
}

/** One saved map: a /topics row with a remove button in its corner. */
function SavedRow({ map, onRemove }: { map: LibraryEntry; onRemove: (id: string) => void }) {
  return (
    <li className="relative border-t border-stone-300/70 dark:border-divider">
      <Link
        href={map.href}
        className="group block py-5 pr-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus"
      >
        <h2 className="font-serif text-[1.3125rem] leading-snug text-primary dark:text-stone-200 transition-colors group-hover:text-deep dark:group-hover:text-accent-text">
          {map.title}
        </h2>
        <MapCardText map={map} />
      </Link>
      <button
        type="button"
        onClick={() => onRemove(map.id)}
        aria-label={`Remove "${map.title}" from saved`}
        className="absolute right-0 top-3 flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-subtle hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:text-stone-400 dark:hover:text-stone-200"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </li>
  );
}
