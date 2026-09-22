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
});
