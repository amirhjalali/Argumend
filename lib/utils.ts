/**
 * General utility functions for the application.
 *
 * Issue #11: URL building helper
 * Issue #13: Regex utilities
 */

/**
 * Build URLSearchParams from an object, filtering out undefined/null values.
 *
 * Issue #11: Simplifies URLSearchParams building in client.ts
 */
export function buildSearchParams(
  params: Record<string, string | number | undefined | null>
): URLSearchParams {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  }

  return searchParams;
}
