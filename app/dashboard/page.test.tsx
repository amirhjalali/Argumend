import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  redirect: vi.fn(),
  getSavedTopicIds: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ auth: mocks.auth }));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));
vi.mock("@/lib/db/queries", () => ({ getSavedTopicIds: mocks.getSavedTopicIds }));
vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
}));

import DashboardPage, { metadata } from "./page";

describe("DashboardPage (account-backed builds)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_ENABLE_AUTH = "true";
    mocks.redirect.mockImplementation((path: string) => {
      throw new Error(`redirect:${path}`);
    });
    mocks.auth.mockResolvedValue({ user: { id: "user-1", name: "Ada Lovelace" } });
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_ENABLE_AUTH;
  });

  it("still redirects to on-device bookmarks while accounts are off", async () => {
    delete process.env.NEXT_PUBLIC_ENABLE_AUTH;
    await expect(DashboardPage()).rejects.toThrow("redirect:/saved");
  });

  it("shows saved maps, flagship maps included, and nothing about debates or winners", async () => {
    mocks.getSavedTopicIds.mockResolvedValue(["ai-mass-unemployment", "no-such-map"]);
    const html = renderToStaticMarkup(await DashboardPage());

    expect(html).toContain("Your saved maps");
    expect(html).toContain('href="/topics/ai-mass-unemployment"');
    expect(html).not.toContain("no-such-map");
    expect(html).not.toMatch(/debate/i);
    expect(html).not.toMatch(/winner/i);
    expect(html).not.toMatch(/balance|weight/i);
    expect(String(metadata.description)).not.toMatch(/debate/i);
  });

  it("has an honest empty state", async () => {
    mocks.getSavedTopicIds.mockResolvedValue([]);
    const html = renderToStaticMarkup(await DashboardPage());
    expect(html).toContain("Nothing saved yet.");
    expect(html).toContain('href="/topics"');
  });
});
