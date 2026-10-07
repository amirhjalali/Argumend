/**
 * Runs once when a server process starts (Next.js instrumentation hook).
 *
 * Builds the paste lane's map index in the background, so the first paste
 * after a deploy does not wait for every map to be read and indexed (2.1s on
 * 2026-10-06, r9 live review). Not awaited: the server starts serving at
 * once, and a paste that arrives first shares the same build
 * (lib/paste/maps.ts `getMapIndex`). A failure here is left to the first
 * paste to retry.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { getMapIndex } = await import("@/lib/paste/maps");
  getMapIndex().catch(() => {});
}
