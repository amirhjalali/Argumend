import { afterEach, describe, expect, it, vi } from "vitest";
import type { MoltbookAgent, MoltbookComment, MoltbookPost } from "./client";
import {
  extractAgentNames,
  extractCommentsOrEmpty,
  handleApiResponse,
  handleCommentResponse,
  handlePostResponse,
  handlePostWithCommentsResponse,
} from "./apiHelpers";

const agent: MoltbookAgent = {
  name: "Pith",
  description: "A philosophical agent",
  claimed: true,
};

const post: MoltbookPost = {
  id: "post-1",
  title: "A structured debate",
  submolt: "argumend",
  author: agent,
  upvotes: 3,
  downvotes: 0,
  comment_count: 1,
  created_at: "2026-07-31T12:00:00Z",
};

const comment: MoltbookComment = {
  id: "comment-1",
  content: "An evidence-backed reply",
  author: agent,
  upvotes: 2,
  downvotes: 0,
  created_at: "2026-07-31T12:10:00Z",
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Moltbook API response normalization", () => {
  it("returns typed data from a successful response", () => {
    expect(handleApiResponse({ success: true, data: post }, "load post")).toBe(post);
    expect(handlePostResponse({ success: true, data: post }, "load post")).toBe(post);
    expect(handleCommentResponse({ success: true, data: comment }, "load comment")).toBe(
      comment,
    );
  });

  it.each([
    [{ success: false, error: "provider unavailable" }, "provider unavailable"],
    [{ success: true }, undefined],
  ])("returns null and logs context for malformed or failed responses", (response, _error) => {
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);

    expect(handleApiResponse(response, "publish debate")).toBeNull();
    expect(log).toHaveBeenCalledWith("publish debate");
  });

  it("preserves a post-with-comments response", () => {
    const withComments = { ...post, comments: [comment] };

    expect(
      handlePostWithCommentsResponse(
        { success: true, data: withComments },
        "load responses",
      ),
    ).toBe(withComments);
  });

  it("returns comments or a safe empty list for absent and failed payloads", () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);

    expect(
      extractCommentsOrEmpty(
        { success: true, data: { ...post, comments: [comment] } },
        "load responses",
      ),
    ).toEqual([comment]);
    expect(
      extractCommentsOrEmpty(
        { success: true, data: post },
        "load responses",
      ),
    ).toEqual([]);
    expect(
      extractCommentsOrEmpty(
        { success: false, error: "offline" },
        "load responses",
      ),
    ).toEqual([]);
    expect(log).toHaveBeenCalledWith("load responses");
  });

  it("extracts only the stable name field and tolerates absent search data", () => {
    expect(extractAgentNames([agent, { ...agent, name: "Rune" }])).toEqual([
      "Pith",
      "Rune",
    ]);
    expect(extractAgentNames(undefined)).toEqual([]);
    expect(extractAgentNames([])).toEqual([]);
  });
});
