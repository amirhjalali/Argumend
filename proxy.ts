import { type NextRequest, NextResponse } from "next/server";
import { legacyHomeTopicPath, shouldServeNamedNotFound } from "@/lib/dynamicRoutePolicy";
import { apiJson } from "@/app/api/v1/_shared/http";
import { ogErrorResponse } from "@/lib/og";

const INTERNAL_NOT_FOUND_PATH = "/__argumend-dynamic-not-found__";
const PUBLIC_TOPIC_API_PATH = /^\/api\/(v1\/topics|og|verdict-card)\/[^/]+\/?$/;

export function proxy(request: NextRequest) {
  const publicApi = request.nextUrl.pathname.match(PUBLIC_TOPIC_API_PATH);
  if (publicApi) {
    // Next decodes dynamic route params before calling the handler. Reject
    // malformed encoding here so a bad topic id cannot become a framework 500.
    try {
      decodeURIComponent(request.nextUrl.pathname);
    } catch {
      if (publicApi[1] === "v1/topics") {
        return apiJson(
          { error: "Invalid topic id.", code: "INVALID_TOPIC_ID" },
          { status: 400, cache: false },
        );
      }
      if (publicApi[1] === "og") return ogErrorResponse(400, "INVALID_TOPIC_ID");
      return new Response("Invalid topic ID encoding", {
        status: 400,
        headers: { "Cache-Control": "no-store" },
      });
    }
    return NextResponse.next();
  }

  // Old home-canvas links, `/?topic=<id>[&view=…]`: one 308 to the map's
  // page or diagram, without the stale `topic`/`view` parameters.
  if (request.nextUrl.pathname === "/") {
    const destination = legacyHomeTopicPath(request.nextUrl.searchParams);
    if (destination) {
      return NextResponse.redirect(new URL(destination, request.url), 308);
    }
    return NextResponse.next();
  }

  if (!shouldServeNamedNotFound(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Keep the public URL and query string while rendering the non-streamed,
  // global not-found page. The early status avoids `loading.tsx` committing a
  // misleading 200 before a dynamic page can call `notFound()`.
  const destination = request.nextUrl.clone();
  destination.pathname = INTERNAL_NOT_FOUND_PATH;
  return NextResponse.rewrite(destination, { status: 404 });
}

export const config = {
  matcher: [
    // Only home requests that carry `?topic=` reach the proxy.
    { source: "/", has: [{ type: "query", key: "topic" }] },
    "/api/v1/topics/:id",
    "/api/og/:id",
    "/api/verdict-card/:topicId",
    "/topics/:id",
    "/topics/:id/map",
    "/blog/:slug",
    "/blog/category/:category",
    "/blog/tag/:tag",
    "/guides/:id",
    "/concepts/:slug",
    "/fallacies/:slug",
    "/questions/:slug",
    "/is/:slug",
    "/for-educators/worksheets/:id",
    "/embed/:topicId",
    "/analysis/:id",
    "/d/:slug",
  ],
};
