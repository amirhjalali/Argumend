import { type NextRequest, NextResponse } from "next/server";
import { legacyHomeTopicPath, shouldServeNamedNotFound } from "@/lib/dynamicRoutePolicy";

const INTERNAL_NOT_FOUND_PATH = "/__argumend-dynamic-not-found__";

export function proxy(request: NextRequest) {
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
  ],
};
