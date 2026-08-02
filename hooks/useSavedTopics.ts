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
const STORAGE_ERROR = "Could not update saved topics on this device.";
const STORAGE_READ_ERROR = "Saved topics could not be read in this browser.";

interface SavedReadResult {
  ids: string[];
  error: string | null;
}

function normalizeSaved(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const ids = value.flatMap((id) => {
    if (typeof id !== "string") return [];
    const normalized = id.trim();
    return normalized ? [normalized] : [];
  });
  return Array.from(new Set(ids));
}

function readSaved(): SavedReadResult {
  if (typeof window === "undefined") return { ids: [], error: null };
  try {
    const raw = window.localStorage.getItem(SAVED_TOPICS_KEY);
    if (!raw) return { ids: [], error: null };
    return { ids: normalizeSaved(JSON.parse(raw)), error: null };
  } catch {
    return { ids: [], error: STORAGE_READ_ERROR };
  }
}

function writeSaved(ids: string[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(SAVED_TOPICS_KEY, JSON.stringify(normalizeSaved(ids)));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT));
    return true;
  } catch {
    // Private browsing policies and exhausted quotas can reject local writes.
    return false;
  }
}

/**
 * Returns whether `topicId` is saved and a stable toggle function.
 * `saved` is `false` on first render (SSR + hydration) and resolves from
 * localStorage after mount to avoid hydration mismatches.
 */
export function useSavedTopics(topicId: string): {
  saved: boolean;
  hydrated: boolean;
  error: string | null;
  toggle: () => boolean | null;
} {
  const normalizedTopicId = topicId.trim();
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const result = readSaved();
      setSaved(
        normalizedTopicId.length > 0 && result.ids.includes(normalizedTopicId),
      );
      setHydrated(true);
      setError(result.error);
    };
    const syncStorage = (event: StorageEvent) => {
      if (event.key === SAVED_TOPICS_KEY || event.key === null) sync();
    };
    sync();
    window.addEventListener(SYNC_EVENT, sync);
    window.addEventListener("storage", syncStorage);
    return () => {
      window.removeEventListener(SYNC_EVENT, sync);
      window.removeEventListener("storage", syncStorage);
    };
  }, [normalizedTopicId]);

  const toggle = useCallback(() => {
    if (!normalizedTopicId) {
      setSaved(false);
      setError(null);
      return false;
    }
    const result = readSaved();
    if (result.error) {
      setError(result.error);
      return null;
    }
    const current = result.ids;
    const next = current.includes(normalizedTopicId)
      ? current.filter((id) => id !== normalizedTopicId)
      : [...current, normalizedTopicId];
    if (writeSaved(next)) {
      const nextSaved = next.includes(normalizedTopicId);
      setSaved(nextSaved);
      setError(null);
      return nextSaved;
    } else {
      setError(STORAGE_ERROR);
      return null;
    }
  }, [normalizedTopicId]);

  return { saved, hydrated, error, toggle };
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
  error: string | null;
  remove: (topicId: string) => void;
} {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const result = readSaved();
      setIds(result.ids);
      setHydrated(true);
      setError(result.error);
    };
    const syncStorage = (event: StorageEvent) => {
      if (event.key === SAVED_TOPICS_KEY || event.key === null) sync();
    };
    sync();
    window.addEventListener(SYNC_EVENT, sync);
    window.addEventListener("storage", syncStorage);
    return () => {
      window.removeEventListener(SYNC_EVENT, sync);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  const remove = useCallback((topicId: string) => {
    const normalizedTopicId = topicId.trim();
    if (!normalizedTopicId) return;
    const result = readSaved();
    if (result.error) {
      setError(result.error);
      return;
    }
    const next = result.ids.filter((id) => id !== normalizedTopicId);
    if (writeSaved(next)) {
      setIds(next);
      setError(null);
    } else {
      setError(STORAGE_ERROR);
    }
  }, []);

  return { ids, hydrated, error, remove };
}
