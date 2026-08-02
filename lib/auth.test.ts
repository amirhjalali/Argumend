import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  nextAuth: vi.fn(),
  drizzleAdapter: vi.fn(),
  getDb: vi.fn(),
  isDatabaseConfigured: vi.fn(),
}));

vi.mock("next-auth", () => ({
  default: mocks.nextAuth,
}));
vi.mock("next-auth/providers/google", () => ({ default: "google-provider" }));
vi.mock("@auth/drizzle-adapter", () => ({
  DrizzleAdapter: mocks.drizzleAdapter,
}));
vi.mock("@/lib/db", () => ({
  getDb: mocks.getDb,
  isDatabaseConfigured: mocks.isDatabaseConfigured,
}));

const originalDatabaseUrl = process.env.DATABASE_URL;

async function loadAuth() {
  mocks.nextAuth.mockImplementation((config) => ({
    handlers: {},
    auth: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
    config,
  }));
  return import("./auth");
}

describe("auth database mode", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.spyOn(console, "warn").mockImplementation(() => {});
    mocks.isDatabaseConfigured.mockReturnValue(false);
    mocks.getDb.mockReturnValue({ kind: "database" });
    mocks.drizzleAdapter.mockReturnValue({ kind: "adapter" });
    vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "false");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    if (originalDatabaseUrl === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = originalDatabaseUrl;
  });

  it("does not initialize a database when DATABASE_URL is absent", async () => {
    await loadAuth();

    expect(mocks.getDb).not.toHaveBeenCalled();
    expect(mocks.drizzleAdapter).not.toHaveBeenCalled();
    expect(mocks.nextAuth).toHaveBeenCalledWith(
      expect.objectContaining({ session: { strategy: "jwt" } })
    );
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("uses the Drizzle adapter when the database is explicitly configured", async () => {
    mocks.isDatabaseConfigured.mockReturnValue(true);

    await loadAuth();

    expect(mocks.getDb).toHaveBeenCalledTimes(1);
    expect(mocks.drizzleAdapter).toHaveBeenCalledWith(
      { kind: "database" },
      expect.objectContaining({
        usersTable: expect.anything(),
        accountsTable: expect.anything(),
        sessionsTable: expect.anything(),
      })
    );
    expect(mocks.nextAuth).toHaveBeenCalledWith(
      expect.objectContaining({ adapter: { kind: "adapter" } })
    );
  });

  it("falls back to degraded JWT mode if configured initialization throws", async () => {
    mocks.isDatabaseConfigured.mockReturnValue(true);
    mocks.getDb.mockImplementation(() => {
      throw new Error("bad database configuration");
    });

    await loadAuth();

    expect(mocks.nextAuth).toHaveBeenCalledWith(
      expect.objectContaining({ session: { strategy: "jwt" } })
    );
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("bad database configuration")
    );
  });
});
