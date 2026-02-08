export { auth as middleware } from "@/lib/auth";

export const config = {
  // Run auth middleware on all routes except static files and API auth routes
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
