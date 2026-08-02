import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { SAVED_TOPICS_KEY } from "@/hooks/useSavedTopics";
import { SaveTopicButton } from "./SaveTopicButton";

describe("SaveTopicButton", () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        get length() {
          return values.size;
        },
        clear: () => values.clear(),
        getItem: (key: string) => values.get(key) ?? null,
        key: (index: number) => Array.from(values.keys())[index] ?? null,
        removeItem: (key: string) => values.delete(key),
        setItem: (key: string, value: string) => values.set(key, value),
      } satisfies Storage,
    });
    vi.stubGlobal("fetch", vi.fn());
    delete process.env.NEXT_PUBLIC_ENABLE_AUTH;
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("saves entirely on-device without network work in offline mode", async () => {
    const view = render(<SaveTopicButton topicId="ai-risk" />);
    fireEvent.click(await view.findByRole("button", { name: /save topic on this device/i }));

    expect(fetch).not.toHaveBeenCalled();
    expect(JSON.parse(window.localStorage.getItem(SAVED_TOPICS_KEY) ?? "[]"))
      .toEqual(["ai-risk"]);
    const button = view.getByRole("button");
    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(button.className).toContain("min-h-11");
    expect(button.className).toContain("min-w-11");
    expect(button.className).toContain("focus-visible:ring-2");
  });

  it("syncs a local bookmark to the account API when enabled", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "true");
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 200 }));
    const view = render(<SaveTopicButton topicId="ai-risk" />);

    fireEvent.click(await view.findByRole("button", { name: /save topic on this device/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
    expect(fetch).toHaveBeenCalledWith(
      "/api/saved-topics",
      expect.objectContaining({ method: "POST" }),
    );
    expect(view.getByRole("button").getAttribute("aria-pressed")).toBe("true");
  });

  it("keeps the local save and reports an account-sync failure truthfully", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "true");
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 503 }));
    const view = render(<SaveTopicButton topicId="ai-risk" />);

    fireEvent.click(await view.findByRole("button", { name: /save topic on this device/i }));

    await waitFor(() => {
      expect(view.getByRole("alert").textContent).toMatch(/saved on this device/i);
    });
    expect(JSON.parse(window.localStorage.getItem(SAVED_TOPICS_KEY) ?? "[]"))
      .toEqual(["ai-risk"]);
    expect(view.getByRole("button").getAttribute("aria-pressed")).toBe("true");
  });
});
