import { type NextRequest, NextResponse } from "next/server";
import { shouldServeNamedNotFound } from "@/lib/dynamicRoutePolicy";

const INTERNAL_NOT_FOUND_PATH = "/__argumend-dynamic-not-found__";

export function proxy(request: NextRequest) {
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
    "/topics/:id",
    "/topics/category/:slug",
    "/topics/tag/:slug",
    "/topics/compare/:id1/vs/:id2",
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
