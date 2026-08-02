import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  nextAuth: vi.fn(),
  drizzleAdapter: vi.fn(),
  getDb: vi.fn(),
  isDatabaseConfigured: vi.fn(),
}));

vi.mock("next-auth", () => ({ default: mocks.nextAuth }));
vi.mock("next-auth/providers/google", () => ({ default: "google-provider" }));
vi.mock("@auth/drizzle-adapter", () => ({ DrizzleAdapter: mocks.drizzleAdapter }));
vi.mock("@/lib/db", () => ({
  getDb: mocks.getDb,
  isDatabaseConfigured: mocks.isDatabaseConfigured,
}));

const loadAuth = async () => {
  mocks.nextAuth.mockImplementation(() => ({
    handlers: { GET: "get-handler" },
    auth: "auth-function",
    signIn: "sign-in-function",
    signOut: "sign-out-function",
  }));
  return import("./auth");
};

describe("auth mode and callback boundary", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    mocks.isDatabaseConfigured.mockReturnValue(false);
    mocks.getDb.mockReturnValue({ kind: "database" });
    mocks.drizzleAdapter.mockReturnValue({ kind: "adapter" });
    vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "false");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it.each([undefined, "", "   "])("keeps %s configuration in lazy JWT mode", async (value) => {
    if (value === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      vi.stubEnv("DATABASE_URL", value);
    }
    mocks.isDatabaseConfigured.mockImplementation(() =>
      Boolean(process.env.DATABASE_URL?.trim()),
    );

    const exports = await loadAuth();
    const config = mocks.nextAuth.mock.calls[0][0];

    expect(mocks.getDb).not.toHaveBeenCalled();
    expect(config).toMatchObject({
      providers: ["google-provider"],
      pages: { signIn: "/auth/signin" },
      session: { strategy: "jwt" },
    });
    expect(exports).toMatchObject({
      handlers: { GET: "get-handler" },
      auth: "auth-function",
      signIn: "sign-in-function",
      signOut: "sign-out-function",
    });
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("warns about degraded sessions when auth is enabled without a database", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_AUTH", "true");

    await loadAuth();

    expect(mocks.getDb).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(
      "[auth] DATABASE_URL not configured — auth running in degraded JWT mode",
    );
  });

  it("does not emit degraded-auth noise when auth configuration is blank", async () => {
    delete process.env.NEXT_PUBLIC_ENABLE_AUTH;
    delete process.env.DATABASE_URL;

    await loadAuth();

    expect(mocks.getDb).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("projects the JWT subject into the public session user id", async () => {
    await loadAuth();
    const config = mocks.nextAuth.mock.calls[0][0];
    const session = { user: { name: "Reader", id: "old-id" } };

    expect(
      config.callbacks.session({ session, token: { sub: "user-123" } }),
    ).toBe(session);
    expect(session.user.id).toBe("user-123");
  });

  it("does not erase an existing session id when a JWT has no subject", async () => {
    await loadAuth();
    const config = mocks.nextAuth.mock.calls[0][0];
    const session = { user: { id: "existing-id" } };

    expect(config.callbacks.session({ session, token: {} })).toBe(session);
    expect(session.user.id).toBe("existing-id");
  });

  it("uses the database user id for adapter-backed sessions", async () => {
    mocks.isDatabaseConfigured.mockReturnValue(true);
    await loadAuth();
    const config = mocks.nextAuth.mock.calls[0][0];
    const session = { user: { id: "old-id" } };

    expect(config.callbacks.session({ session, user: { id: "database-user" } })).toBe(session);
    expect(session.user.id).toBe("database-user");
    expect(config).not.toHaveProperty("session.strategy");
  });

  it("degrades malformed non-empty configuration to JWT mode", async () => {
    vi.stubEnv("DATABASE_URL", "not-a-postgres-url");
    mocks.isDatabaseConfigured.mockReturnValue(true);
    mocks.getDb.mockImplementation(() => {
      throw new TypeError("Invalid connection string");
    });

    await loadAuth();

    expect(mocks.nextAuth).toHaveBeenCalledOnce();
    expect(mocks.nextAuth.mock.calls[0][0]).toMatchObject({
      session: { strategy: "jwt" },
    });
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("Invalid connection string"),
    );
  });

  it("redacts database credentials from degraded-mode logs", async () => {
    mocks.isDatabaseConfigured.mockReturnValue(true);
    mocks.getDb.mockImplementation(() => {
      throw new Error(
        "connect failed for postgresql://admin:super-secret@db.internal:5432/argumend",
      );
    });

    await loadAuth();

    const warning = vi.mocked(console.warn).mock.calls.flat().join(" ");
    expect(warning).toContain("[redacted database URL]");
    expect(warning).not.toMatch(/admin|super-secret|db\.internal|5432/);
  });

  it("also degrades safely when adapter construction throws a non-Error value", async () => {
    mocks.isDatabaseConfigured.mockReturnValue(true);
    mocks.drizzleAdapter.mockImplementation(() => {
      throw "adapter unavailable";
    });

    await loadAuth();

    expect(mocks.nextAuth.mock.calls[0][0]).toMatchObject({
      session: { strategy: "jwt" },
    });
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("adapter unavailable"),
    );
  });
});
