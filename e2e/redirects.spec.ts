import { expect, test } from "@playwright/test";

/**
 * Retired URLs from the 2026-09-29 overhaul: each is one permanent redirect
 * (next.config.js, or proxy.ts for the old home canvas) straight to a page
 * that answers 200. HTTP only, so the desktop project runs it once.
 */
const REDIRECTS: Array<[from: string, to: string]> = [
  ["/how-it-works", "/about#read-a-map"],
  ["/is/nuclear-energy-safe", "/questions/is-nuclear-energy-safe"],
  ["/analyze-v2", "/analyze"],
  ["/?topic=climate-change&view=logic-map", "/topics/climate-change/map"],
  ["/topics/compare", "/topics"],
];

for (const [from, to] of REDIRECTS) {
  test(`${from} redirects to ${to} in one hop`, async ({ request, baseURL }) => {
    const hop = await request.get(from, { maxRedirects: 0 });
    expect([301, 308]).toContain(hop.status());

    const location = hop.headers()["location"];
    expect(location, "Location header").toBeTruthy();
    const target = new URL(location, baseURL);
    expect(target.origin).toBe(new URL(baseURL ?? "").origin);
    expect(`${target.pathname}${target.search}${target.hash}`).toBe(to);

    const landing = await request.get(`${target.pathname}${target.search}`, { maxRedirects: 0 });
    expect(landing.status()).toBe(200);
  });
}

for (const prefix of ["/api/v1/topics", "/api/og", "/api/verdict-card"]) {
  test(`${prefix} rejects malformed path encoding before route dispatch`, async ({ request }) => {
    for (const id of ["%", "%ZZ", "%C3%28", "%E0%A4"]) {
      const response = await request.get(`${prefix}/${id}`, { maxRedirects: 0 });
      expect(response.status(), `${prefix}/${id}`).toBe(400);
      expect(response.headers()["cache-control"]).toBe("no-store");
      if (prefix === "/api/v1/topics") {
        expect(response.headers()["access-control-allow-origin"]).toBe("*");
        expect(await response.json()).toMatchObject({ code: "INVALID_TOPIC_ID" });
      }
    }

    const unknown = await request.get(`${prefix}/%6eot-a-topic`);
    expect(unknown.status()).toBe(404);
    const valid = await request.get(`${prefix}/nuclear-energy-safety?query=%ZZ`);
    expect(valid.status()).toBe(200);
    expect(valid.headers()["content-type"]).toContain(prefix === "/api/v1/topics" ? "application/json" : "image/");
  });
}
