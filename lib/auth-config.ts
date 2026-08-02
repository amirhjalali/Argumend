/**
 * Session verification requires a server-side Auth.js secret. Avoid invoking
 * Auth.js when neither supported environment variable is configured: Auth.js
 * otherwise emits an internal stack trace before the route can fall back.
 */
export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.AUTH_SECRET?.trim() || process.env.NEXTAUTH_SECRET?.trim(),
  );
}
