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
