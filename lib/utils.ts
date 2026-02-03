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

/**
 * Append search params to a URL path, only if params exist.
 */
export function appendSearchParams(
  path: string,
  params: Record<string, string | number | undefined | null>
): string {
  const searchParams = buildSearchParams(params);
  const query = searchParams.toString();
  return query ? `${path}?${query}` : path;
}

/**
 * Regex pattern for matching bracketed keywords in content.
 * Used for interactive concept linking.
 *
 * Issue #13: Centralized regex pattern from InteractiveContent.tsx
 */
export const BRACKETED_KEYWORD_PATTERN = /(\{.*?\})/g;

/**
 * Extract keyword from bracketed text (e.g., "{Keyword}" -> "Keyword").
 */
export function extractBracketedKeyword(text: string): string | null {
  if (text.startsWith("{") && text.endsWith("}")) {
    return text.slice(1, -1);
  }
  return null;
}

/**
 * Split content by bracketed keywords.
 */
export function splitByBracketedKeywords(content: string): string[] {
  return content.split(BRACKETED_KEYWORD_PATTERN);
}

/**
 * Check if a string is a bracketed keyword.
 */
export function isBracketedKeyword(part: string): boolean {
  return part.startsWith("{") && part.endsWith("}");
}

/**
 * Generate a unique ID with optional prefix.
 */
export function generateId(prefix = ""): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
}

/**
 * Clamp a number between min and max values.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
