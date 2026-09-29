import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  redirect: vi.fn(),
  signIn: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  auth: mocks.auth,
  signIn: mocks.signIn,
}));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));

import SignInPage from "./page";

describe("SignInPage offline behavior", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.NEXT_PUBLIC_ENABLE_AUTH;
    mocks.redirect.mockImplementation((path: string) => {
      throw new Error(`redirect:${path}`);
    });
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_ENABLE_AUTH;
  });

  it("routes direct sign-in visits to on-device bookmarks when accounts are disabled", async () => {
    await expect(SignInPage()).rejects.toThrow("redirect:/saved");

    expect(mocks.redirect).toHaveBeenCalledWith("/saved");
    expect(mocks.auth).not.toHaveBeenCalled();
  });

  it("checks the session only when account-backed features are enabled", async () => {
    process.env.NEXT_PUBLIC_ENABLE_AUTH = "true";
    mocks.auth.mockResolvedValue({ user: { id: "user-1" } });

    await expect(SignInPage()).rejects.toThrow("redirect:/");

    expect(mocks.auth).toHaveBeenCalledOnce();
    expect(mocks.redirect).toHaveBeenCalledWith("/");
  });
});

describe("SignInPage copy (account-backed builds)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_ENABLE_AUTH = "true";
    mocks.auth.mockResolvedValue(null);
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_ENABLE_AUTH;
  });

  it("says what an account is for, in the product's own terms", async () => {
    const { renderToStaticMarkup } = await import("react-dom/server");
    const html = renderToStaticMarkup(await SignInPage());

    expect(html).toContain("Sign in to keep your saved maps across devices.");
    expect(html).not.toMatch(/welcome back/i);
    expect(html).not.toMatch(/debate/i);
    expect(html).not.toMatch(/analyses/i);
    // The only filled action is signing in; the guest path is a quiet link.
    expect(html).not.toContain("from-rust-600");
    // Terms go to the terms page, not to /about.
    expect(html).toContain('href="/terms"');
    expect(html).not.toContain('href="/about"');
  });
});
