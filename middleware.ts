import { NextResponse } from "next/server";

export function middleware() {
  // Auth middleware disabled — no login feature yet.
  // Re-enable when Google OAuth is configured.
  return NextResponse.next();
}

export const config = {
  // Run auth middleware on all routes except static files and API auth routes
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
