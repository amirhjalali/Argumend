import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    // auth() enriches request with session data; if the DB is unreachable
    // the DrizzleAdapter will throw — let the request proceed without auth.
    return await (auth as unknown as (req: NextRequest) => Promise<NextResponse>)(request);
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  // Run auth middleware on all routes except static files and API auth routes
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
