import "@/test/setup-dom";
import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import { PublicShareControls } from "./PublicShareControls";

const SLUG = "test-slug";
const PUBLIC_URL = "https://argumend.org/d/test-slug";
const HEADLINE = "They agree on the goal, not the mechanism";

function installFakeLocalStorage() {
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
}

describe("PublicShareControls", () => {
  beforeEach(() => {
    installFakeLocalStorage();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("renders Copy link and a plain, user-initiated Share to X anchor", () => {
    const view = render(
      <PublicShareControls slug={SLUG} publicUrl={PUBLIC_URL} headline={HEADLINE} />,
    );

    expect(view.getByRole("button", { name: "Copy link" })).toBeTruthy();

    const xLink = view.getByRole("link", { name: "Share to X" }) as HTMLAnchorElement;
    expect(xLink.tagName).toBe("A");
    expect(xLink.getAttribute("href")).toBe(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(HEADLINE)}&url=${encodeURIComponent(PUBLIC_URL)}`,
    );
    expect(xLink.target).toBe("_blank");
  });

  it("never renders a percentage, score, or winner language", () => {
    const view = render(
      <PublicShareControls slug={SLUG} publicUrl={PUBLIC_URL} headline={HEADLINE} />,
    );
    expect(view.queryByText(/%/)).toBeNull();
    expect(view.queryByText(/winner/i)).toBeNull();
  });

  it("hides the delete control for a random visitor with no stored token", async () => {
    const view = render(
      <PublicShareControls slug={SLUG} publicUrl={PUBLIC_URL} headline={HEADLINE} />,
    );
    await waitFor(() => {
      expect(view.queryByRole("button", { name: /delete public report/i })).toBeNull();
    });
  });

  it("shows the delete control when this browser holds the management token for this slug", async () => {
    window.localStorage.setItem(`argumend-manage:${SLUG}`, "token-abc");
    const view = render(
      <PublicShareControls slug={SLUG} publicUrl={PUBLIC_URL} headline={HEADLINE} />,
    );
    await waitFor(() => {
      expect(view.getByRole("button", { name: /delete public report/i })).toBeTruthy();
    });
  });
});
