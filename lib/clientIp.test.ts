import { afterEach, describe, expect, it, vi } from "vitest";
import { clientIp, trustedProxyHops } from "./clientIp";

function request(headers: Record<string, string>) {
  return { headers: new Headers(headers) };
}

describe("clientIp", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses the entry the trusted proxy appended, not the one the client wrote", () => {
    // The attack: a caller sets x-forwarded-for themselves and the proxy
    // appends its view to the end. Reading the first entry hands the caller a
    // fresh rate-limit bucket on every request.
    expect(clientIp(request({ "x-forwarded-for": "1.1.1.1, 203.0.113.9" }))).toBe("203.0.113.9");
    expect(clientIp(request({ "x-forwarded-for": "spoof-a, spoof-b, 203.0.113.9" }))).toBe(
      "203.0.113.9",
    );
  });

  it("gives a rotating spoofed prefix the same key every time", () => {
    const keys = new Set(
      ["a", "b", "c", "d", "e"].map((spoof) =>
        clientIp(request({ "x-forwarded-for": `${spoof}, 203.0.113.9` })),
      ),
    );
    expect(keys).toEqual(new Set(["203.0.113.9"]));
  });

  it("handles a single entry, whitespace and empty segments", () => {
    expect(clientIp(request({ "x-forwarded-for": "203.0.113.9" }))).toBe("203.0.113.9");
    expect(clientIp(request({ "x-forwarded-for": "  203.0.113.9  " }))).toBe("203.0.113.9");
    expect(clientIp(request({ "x-forwarded-for": "1.1.1.1, , 203.0.113.9" }))).toBe("203.0.113.9");
  });

  it("falls back to x-real-ip and then to a constant", () => {
    expect(clientIp(request({ "x-real-ip": "203.0.113.9" }))).toBe("203.0.113.9");
    expect(clientIp(request({ "x-forwarded-for": "  ,  ", "x-real-ip": "203.0.113.9" }))).toBe(
      "203.0.113.9",
    );
    expect(clientIp(request({}))).toBe("unknown");
    expect(clientIp(request({ "x-real-ip": "   " }))).toBe("unknown");
  });

  it("counts back further when more proxies append a value", () => {
    vi.stubEnv("TRUSTED_PROXY_HOPS", "2");
    expect(trustedProxyHops()).toBe(2);
    expect(clientIp(request({ "x-forwarded-for": "spoof, 203.0.113.9, 10.0.0.1" }))).toBe(
      "203.0.113.9",
    );
  });

  it("clamps to the oldest entry when the chain is shorter than configured", () => {
    expect(clientIp(request({ "x-forwarded-for": "203.0.113.9" }), 3)).toBe("203.0.113.9");
  });

  it("ignores a nonsense hop count", () => {
    for (const value of ["", "0", "-2", "two", "1.5"]) {
      vi.stubEnv("TRUSTED_PROXY_HOPS", value);
      expect(trustedProxyHops()).toBe(1);
    }
  });

  it("never reads cf-connecting-ip, which is spoofable straight at the origin", () => {
    // Cloudflare sets it, but Traefik does not strip it, so a request that
    // skips Cloudflare can carry any value. hops=2 reads the same address out
    // of x-forwarded-for, where Cloudflare's own entry vouches for it.
    expect(
      clientIp(
        request({ "cf-connecting-ip": "1.2.3.4", "x-forwarded-for": "spoof, 203.0.113.9" }),
      ),
    ).toBe("203.0.113.9");
    expect(clientIp(request({ "cf-connecting-ip": "1.2.3.4" }))).toBe("unknown");
  });
});

describe("the production hop-count warning", () => {
  // A fresh module per case: the warning is once-per-process by design.
  async function load() {
    vi.resetModules();
    return import("./clientIp");
  }

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("warns once when production never set a hop count", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("TRUSTED_PROXY_HOPS", "");
    const { clientIp: derive } = await load();

    derive(request({ "x-forwarded-for": "203.0.113.9" }));
    derive(request({ "x-forwarded-for": "203.0.113.9" }));
    derive(request({ "x-forwarded-for": "203.0.113.9" }));

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain("TRUSTED_PROXY_HOPS is unset");
    expect(warn.mock.calls[0][0]).toContain("Cloudflare");
  });

  it("stays quiet once production configures the hop count", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("TRUSTED_PROXY_HOPS", "2");
    const { clientIp: derive } = await load();

    derive(request({ "x-forwarded-for": "spoof, 203.0.113.9, 10.0.0.1" }));

    expect(warn).not.toHaveBeenCalled();
  });

  it("stays quiet outside production", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("TRUSTED_PROXY_HOPS", "");
    const { clientIp: derive } = await load();

    derive(request({ "x-forwarded-for": "203.0.113.9" }));

    expect(warn).not.toHaveBeenCalled();
  });

  it("warns but still serves — it never throws", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("TRUSTED_PROXY_HOPS", "");
    const { clientIp: derive, trustedProxyHops: hops } = await load();

    expect(hops()).toBe(1);
    expect(derive(request({ "x-forwarded-for": "spoof, 203.0.113.9" }))).toBe("203.0.113.9");
  });
});
