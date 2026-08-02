import { afterEach, describe, expect, it, vi } from "vitest";
import { isAuthConfigured } from "./auth-config";

describe("isAuthConfigured", () => {
  afterEach(() => vi.unstubAllEnvs());

  it.each([
    ["AUTH_SECRET", "server-secret"],
    ["NEXTAUTH_SECRET", "legacy-server-secret"],
  ])("accepts the supported %s alias", (name, value) => {
    vi.stubEnv("AUTH_SECRET", "");
    vi.stubEnv("NEXTAUTH_SECRET", "");
    vi.stubEnv(name, value);

    expect(isAuthConfigured()).toBe(true);
  });

  it("rejects absent or whitespace-only secrets", () => {
    vi.stubEnv("AUTH_SECRET", "   ");
    vi.stubEnv("NEXTAUTH_SECRET", "");

    expect(isAuthConfigured()).toBe(false);
  });
});
