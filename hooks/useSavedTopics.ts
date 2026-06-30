"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * localStorage-backed "saved topics" — works fully offline, no auth required.
 *
 * Stores an array of topic IDs under a single key. SSR-safe: localStorage is
 * only touched inside effects / event handlers, never during render. Multiple
 * mounted instances stay in sync via a custom window event plus the native
 * cross-tab `storage` event.
 */

export const SAVED_TOPICS_KEY = "argumend.savedTopics";
const SYNC_EVENT = "argumend:savedTopicsChanged";

function readSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_TOPICS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeSaved(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SAVED_TOPICS_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT));
  } catch {
    // ignore (private mode / quota)
  }
}

/**
 * Returns whether `topicId` is saved and a stable toggle function.
 * `saved` is `false` on first render (SSR + hydration) and resolves from
 * localStorage after mount to avoid hydration mismatches.
 */
export function useSavedTopics(topicId: string): {
  saved: boolean;
  toggle: () => void;
} {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(readSaved().includes(topicId));
    sync();
    window.addEventListener(SYNC_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SYNC_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [topicId]);

  const toggle = useCallback(() => {
    const current = readSaved();
    const next = current.includes(topicId)
      ? current.filter((id) => id !== topicId)
      : [...current, topicId];
    writeSaved(next);
    setSaved(next.includes(topicId));
  }, [topicId]);

  return { saved, toggle };
}

/**
 * Reactive list of ALL saved topic IDs, in the order they were saved.
 *
 * `hydrated` is `false` until the first post-mount read resolves, so callers can
 * avoid rendering localStorage-derived content during SSR/hydration (the server
 * has no access to localStorage). Stays in sync via the same custom + native
 * `storage` events used by `useSavedTopics`.
 */
export function useSavedTopicIds(): {
  ids: string[];
  hydrated: boolean;
  remove: (topicId: string) => void;
} {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const sync = () => {
      setIds(readSaved());
      setHydrated(true);
    };
    sync();
    window.addEventListener(SYNC_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SYNC_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const remove = useCallback((topicId: string) => {
    const next = readSaved().filter((id) => id !== topicId);
    writeSaved(next);
    setIds(next);
  }, []);

  return { ids, hydrated, remove };
}
