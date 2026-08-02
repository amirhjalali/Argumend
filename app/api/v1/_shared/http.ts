/**
 * Shared helpers for the public read-only API (`/api/v1/*`).
 *
 * The underscore-prefixed folder is a Next.js private directory, so nothing in
 * here is ever served as a route handler — these are plain modules consumed by
 * the sibling `route.ts` files.
 */

import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

/** Canonical site origin. Topic `url`s point back here. */
export { SITE_URL };

/**
 * Permissive CORS so any website or client-side app can consume the API
 * directly from the browser. The data is public topic analysis — there is
 * nothing origin-sensitive to protect.
 */
export const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

/**
 * CDN/edge caching: serve the cached copy for an hour, then keep serving the
 * stale copy while revalidating in the background. Keyed on the full URL
 * (including query string), so filtered list pages cache independently.
 */
export const CACHE_HEADERS: Record<string, string> = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

/**
 * Build a JSON response with CORS applied and caching on by default.
 * Pass `cache: false` for error responses that should not be cached.
 */
export function apiJson(
  body: unknown,
  init?: { status?: number; cache?: boolean }
): NextResponse {
  return NextResponse.json(body, {
    status: init?.status ?? 200,
    headers: {
      ...CORS_HEADERS,
      ...(init?.cache === false
        ? { "Cache-Control": "no-store" }
        : CACHE_HEADERS),
    },
  });
}

/** Standard preflight response shared by every route's OPTIONS handler. */
export function corsPreflight(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      ...CORS_HEADERS,
      "Cache-Control": "public, max-age=86400",
    },
  });
}

/** Stable, CORS-enabled response for the read-only API's unsupported methods. */
export function methodNotAllowed(): NextResponse {
  return NextResponse.json(
    { error: "Method not allowed.", code: "METHOD_NOT_ALLOWED" },
    {
      status: 405,
      headers: {
        ...CORS_HEADERS,
        Allow: "GET, HEAD, OPTIONS",
        "Cache-Control": "no-store",
      },
    },
  );
}
