/**
 * API helper functions for Moltbook integration.
 *
 * Issue #5: Consolidates repetitive error handling from debate-integration.ts
 */

import type { MoltbookPost, MoltbookComment } from "./client";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  hint?: string;
}

type ApiResult<T> = T | null;

/**
 * Generic API error handler that logs errors and returns null on failure.
 *
 * @param response - The API response to handle
 * @param context - Description of the operation for error logging
 * @returns The data on success, or null on failure
 */
export function handleApiResponse<T>(
  response: ApiResponse<T>,
  context: string
): ApiResult<T> {
  if (!response.success || !response.data) {
    console.error(`${context}:`, response.error);
    return null;
  }
  return response.data;
}

/**
 * Type-specific handler for post responses.
 */
export function handlePostResponse(
  response: ApiResponse<MoltbookPost>,
  context: string
): MoltbookPost | null {
  return handleApiResponse(response, context);
}

/**
 * Type-specific handler for comment responses.
 */
export function handleCommentResponse(
  response: ApiResponse<MoltbookComment>,
  context: string
): MoltbookComment | null {
  return handleApiResponse(response, context);
}

/**
 * Type-specific handler for post with comments responses.
 */
export function handlePostWithCommentsResponse(
  response: ApiResponse<MoltbookPost & { comments: MoltbookComment[] }>,
  context: string
): (MoltbookPost & { comments: MoltbookComment[] }) | null {
  return handleApiResponse(response, context);
}

/**
 * Extract comments from a post response, returning empty array on failure.
 */
export function extractCommentsOrEmpty(
  response: ApiResponse<MoltbookPost & { comments?: MoltbookComment[] }>,
  context: string
): MoltbookComment[] {
  const post = handleApiResponse(response, context);
  return post?.comments ?? [];
}

/**
 * Safe agent name extraction from search results.
 */
export function extractAgentNames<T extends { name: string }>(
  agents: T[] | undefined
): string[] {
  return agents?.map((agent) => agent.name) ?? [];
}
