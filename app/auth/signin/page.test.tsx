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
