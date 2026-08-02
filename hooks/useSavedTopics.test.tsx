import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import {
  SAVED_TOPICS_KEY,
  useSavedTopicIds,
  useSavedTopics,
} from "./useSavedTopics";

describe("saved topic storage", () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    const storage: Storage = {
      get length() {
        return values.size;
      },
      clear: () => values.clear(),
      getItem: (key) => values.get(key) ?? null,
      key: (index) => Array.from(values.keys())[index] ?? null,
      removeItem: (key) => {
        values.delete(key);
      },
      setItem: (key, value) => {
        values.set(key, value);
      },
    };
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: storage,
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("hydrates a saved button from device-local storage", () => {
    window.localStorage.setItem(
      SAVED_TOPICS_KEY,
      JSON.stringify(["climate-change"]),
    );

    const { result } = renderHook(() => useSavedTopics("climate-change"));

    expect(result.current.hydrated).toBe(true);
    expect(result.current.saved).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("normalizes corrupt, duplicate, and non-string stored values", () => {
    window.localStorage.setItem(
      SAVED_TOPICS_KEY,
      JSON.stringify(["ai-risk", " ai-risk ", null, 42, ""]),
    );

    const { result } = renderHook(useSavedTopicIds);

    expect(result.current.ids).toEqual(["ai-risk"]);
    expect(result.current.hydrated).toBe(true);
  });

  it("keeps mounted consumers in sync without requiring a server", () => {
    const first = renderHook(() => useSavedTopics("ai-risk"));
    const second = renderHook(() => useSavedTopics("ai-risk"));

    act(() => {
      first.result.current.toggle();
    });

    expect(first.result.current.saved).toBe(true);
    expect(second.result.current.saved).toBe(true);
    expect(JSON.parse(window.localStorage.getItem(SAVED_TOPICS_KEY) ?? "[]"))
      .toEqual(["ai-risk"]);
  });

  it("does not claim a save succeeded when localStorage rejects the write", () => {
    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new Error("quota exceeded");
    });
    const { result } = renderHook(() => useSavedTopics("ai-risk"));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.saved).toBe(false);
    expect(result.current.error).toMatch(/could not update/i);
  });

  it("distinguishes blocked storage from a genuinely empty saved list", () => {
    const setItem = vi.spyOn(window.localStorage, "setItem");
    vi.spyOn(window.localStorage, "getItem").mockImplementation(() => {
      throw new Error("storage access denied");
    });

    const topic = renderHook(() => useSavedTopics("ai-risk"));
    const list = renderHook(useSavedTopicIds);

    expect(topic.result.current.hydrated).toBe(true);
    expect(topic.result.current.saved).toBe(false);
    expect(topic.result.current.error).toMatch(/could not be read/i);
    expect(list.result.current.hydrated).toBe(true);
    expect(list.result.current.ids).toEqual([]);
    expect(list.result.current.error).toMatch(/could not be read/i);

    act(() => {
      topic.result.current.toggle();
    });
    expect(setItem).not.toHaveBeenCalled();
  });

  it("canonicalizes topic ids and never reports a discarded blank id as saved", () => {
    const canonical = renderHook(() => useSavedTopics("  ai-risk  "));
    const blank = renderHook(() => useSavedTopics("   "));

    act(() => {
      expect(canonical.result.current.toggle()).toBe(true);
      expect(blank.result.current.toggle()).toBe(false);
    });

    expect(canonical.result.current.saved).toBe(true);
    expect(blank.result.current.saved).toBe(false);
    expect(JSON.parse(window.localStorage.getItem(SAVED_TOPICS_KEY) ?? "[]"))
      .toEqual(["ai-risk"]);
  });

  it("reacts only to relevant native storage events", () => {
    const { result } = renderHook(useSavedTopicIds);
    window.localStorage.setItem(SAVED_TOPICS_KEY, JSON.stringify(["ai-risk"]));

    act(() => {
      window.dispatchEvent(new StorageEvent("storage", { key: "unrelated" }));
    });
    expect(result.current.ids).toEqual([]);

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", { key: SAVED_TOPICS_KEY }),
      );
    });
    expect(result.current.ids).toEqual(["ai-risk"]);

    window.localStorage.setItem(SAVED_TOPICS_KEY, JSON.stringify(["moon-landing"]));
    act(() => {
      window.dispatchEvent(new StorageEvent("storage", { key: null }));
    });
    expect(result.current.ids).toEqual(["moon-landing"]);
  });

  it("removes canonical ids and reports read and write failures", () => {
    window.localStorage.setItem(
      SAVED_TOPICS_KEY,
      JSON.stringify(["ai-risk", "moon-landing"]),
    );
    const { result } = renderHook(useSavedTopicIds);

    act(() => result.current.remove(" ai-risk "));
    expect(result.current.ids).toEqual(["moon-landing"]);

    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new Error("quota exceeded");
    });
    act(() => result.current.remove("moon-landing"));
    expect(result.current.ids).toEqual(["moon-landing"]);
    expect(result.current.error).toMatch(/could not update/i);

    vi.restoreAllMocks();
    vi.spyOn(window.localStorage, "getItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });
    act(() => result.current.remove("moon-landing"));
    expect(result.current.ids).toEqual(["moon-landing"]);
    expect(result.current.error).toMatch(/could not be read/i);
  });
});
