import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  postgres: vi.fn(),
  drizzle: vi.fn(),
}));

vi.mock("postgres", () => ({ default: mocks.postgres }));
vi.mock("drizzle-orm/postgres-js", () => ({ drizzle: mocks.drizzle }));

describe("database initialization guard", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    mocks.postgres.mockReset();
    mocks.drizzle.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it.each([undefined, "", "   "])(
    "keeps database features disabled for %s",
    async (databaseUrl) => {
      if (databaseUrl === undefined) {
        vi.stubEnv("DATABASE_URL", "");
        delete process.env.DATABASE_URL;
      } else {
        vi.stubEnv("DATABASE_URL", databaseUrl);
      }

      const { isDatabaseConfigured } = await import("./index");

      expect(isDatabaseConfigured()).toBe(false);
      expect(mocks.postgres).not.toHaveBeenCalled();
    },
  );

  it("reports a configured database without eagerly creating a client", async () => {
    vi.stubEnv("DATABASE_URL", " postgres://example.test/argumend ");

    const { isDatabaseConfigured } = await import("./index");

    expect(isDatabaseConfigured()).toBe(true);
    expect(mocks.postgres).not.toHaveBeenCalled();
    expect(mocks.drizzle).not.toHaveBeenCalled();
  });

  it("throws a stable availability error offline and warns only on first access", async () => {
    delete process.env.DATABASE_URL;
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const { getDb } = await import("./index");

    expect(() => getDb()).toThrow("Database is not available");
    expect(() => getDb()).toThrow("Database is not available");
    expect(mocks.postgres).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      "[db] DATABASE_URL not set — running without database",
    );
  });

  it("trims configuration and lazily reuses one initialized database", async () => {
    vi.stubEnv("DATABASE_URL", "  postgres://example.test/argumend  ");
    const client = { kind: "postgres-client" };
    const database = { kind: "drizzle-database" };
    mocks.postgres.mockReturnValue(client);
    mocks.drizzle.mockReturnValue(database);
    const { getDb } = await import("./index");

    expect(getDb()).toBe(database);
    expect(getDb()).toBe(database);
    expect(mocks.postgres).toHaveBeenCalledOnce();
    expect(mocks.postgres).toHaveBeenCalledWith("postgres://example.test/argumend", {
      max: 5,
      idle_timeout: 20,
      connect_timeout: 5,
    });
    expect(mocks.drizzle).toHaveBeenCalledOnce();
    expect(mocks.drizzle).toHaveBeenCalledWith(client, {
      schema: expect.any(Object),
    });
  });

  it("degrades to unavailable when client construction fails and does not retry forever", async () => {
    vi.stubEnv("DATABASE_URL", "postgres://invalid.test/argumend");
    mocks.postgres.mockImplementation(() => {
      throw new Error("invalid connection options");
    });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const { getDb } = await import("./index");

    expect(() => getDb()).toThrow("Database is not available");
    expect(() => getDb()).toThrow("Database is not available");
    expect(mocks.postgres).toHaveBeenCalledOnce();
    expect(warn).toHaveBeenCalledWith(
      "[db] Failed to initialize: invalid connection options",
    );
  });
});
