import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { topics } from "@/data/topics";
import type {
  MoltbookAgent,
  MoltbookClient,
  MoltbookComment,
  MoltbookPost,
} from "./client";
import {
  ARGUMEND_SUBMOLT,
  MoltbookDebateService,
  getRecommendedAgentsForTopic,
} from "./debate-integration";

const topic = topics.find((candidate) => candidate.id === "nuclear-energy-safety");

if (!topic) {
  throw new Error("Expected nuclear-energy-safety fixture to exist");
}

const agent: MoltbookAgent = {
  name: "Pith",
  description: "A philosophical agent",
  claimed: true,
};

const post: MoltbookPost = {
  id: "post-1",
  title: "Published debate",
  submolt: ARGUMEND_SUBMOLT,
  author: agent,
  upvotes: 0,
  downvotes: 0,
  comment_count: 0,
  created_at: "2026-07-31T12:00:00Z",
};

const comment: MoltbookComment = {
  id: "comment-1",
  content: "A reply",
  author: agent,
  upvotes: 0,
  downvotes: 0,
  created_at: "2026-07-31T12:05:00Z",
};

const makeClient = () => ({
  createPost: vi.fn(),
  createComment: vi.fn(),
  getPost: vi.fn(),
  search: vi.fn(),
});

describe("MoltbookDebateService", () => {
  let client: ReturnType<typeof makeClient>;
  let service: MoltbookDebateService;

  beforeEach(() => {
    client = makeClient();
    service = new MoltbookDebateService(client as unknown as MoltbookClient);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("publishes a complete, evidence-aware debate invitation", async () => {
    client.createPost.mockResolvedValue({ success: true, data: post });

    await expect(service.postDebateTopic(topic)).resolves.toEqual({
      postId: "post-1",
      url: "https://moltbook.com/m/argumend/posts/post-1",
      title: "Published debate",
    });
    expect(client.createPost).toHaveBeenCalledOnce();
    const request = client.createPost.mock.calls[0][0];
    expect(request.submolt).toBe(ARGUMEND_SUBMOLT);
    expect(request.title).toContain(topic.title);
    expect(request.title).toContain(topic.verdict.label);
    expect(request.content).toContain(`**Meta Claim:** ${topic.meta_claim}`);
    expect(request.content).toContain(`### 1. ${topic.pillars[0].title}`);
    expect(request.content).toContain(`**Crux:** ${topic.pillars[0].crux.title}`);
    expect(request.content).toContain(
      topic.balance >= 50 ? "toward supporting" : "against the claim",
    );
  });

  it("returns null without leaking a failed publish payload", async () => {
    client.createPost.mockResolvedValue({
      success: false,
      error: "private upstream diagnostic",
    });
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);

    await expect(service.postDebateTopic(topic)).resolves.toBeNull();
    expect(log).toHaveBeenCalledWith("Failed to post debate to Moltbook");
    expect(log.mock.calls.flat().join(" ")).not.toContain(
      "private upstream diagnostic",
    );
  });

  it.each([
    ["for", "PROPOSITION", "🗡️"],
    ["against", "OPPOSITION", "🛡️"],
  ] as const)("formats a %s position invitation", async (position, label, emoji) => {
    client.createPost.mockResolvedValue({ success: true, data: post });

    await service.postDebateInvitation({
      topicId: topic.id,
      topicTitle: topic.title,
      claim: topic.meta_claim,
      position,
      context: "The core evidence remains contested.",
      existingArguments: ["First mapped argument", "Second mapped argument"],
    });

    const request = client.createPost.mock.calls[0][0];
    expect(request.title).toContain(`[${label}]`);
    expect(request.content).toContain(`${emoji} **Position Available:** ${label}`);
    expect(request.content).toContain("1. First mapped argument\n2. Second mapped argument");
  });

  it("calls out an empty invitation rather than fabricating existing arguments", async () => {
    client.createPost.mockResolvedValue({ success: true, data: post });

    await service.postDebateInvitation({
      topicId: topic.id,
      topicTitle: topic.title,
      claim: topic.meta_claim,
      position: "for",
      context: "Context",
      existingArguments: [],
    });

    expect(client.createPost.mock.calls[0][0].content).toContain(
      "*No arguments submitted yet - be the first!*",
    );
  });

  it("formats a debate round and preserves its reply parent", async () => {
    client.createComment.mockResolvedValue({ success: true, data: comment });

    await expect(
      service.postDebateArgument(
        "post-1",
        2,
        "against",
        "Rune",
        "The evidence has a selection problem.",
        "parent-1",
      ),
    ).resolves.toBe(comment);
    expect(client.createComment).toHaveBeenCalledWith(
      "post-1",
      expect.stringMatching(
        /Round 2 - AGAINST[\s\S]*\*\*Agent:\*\* Rune[\s\S]*selection problem/,
      ),
      "parent-1",
    );
  });

  it("returns safe empty responses for missing or failed comment payloads", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    client.getPost
      .mockResolvedValueOnce({ success: true, data: post })
      .mockResolvedValueOnce({ success: false, error: "upstream offline" });

    await expect(service.fetchDebateResponses("post-1")).resolves.toEqual([]);
    await expect(service.fetchDebateResponses("post-1")).resolves.toEqual([]);
    expect(log).toHaveBeenCalledWith("Failed to fetch debate responses");
    expect(log.mock.calls.flat().join(" ")).not.toContain("upstream offline");
  });

  it("imports comments and reduces agent search results to names", async () => {
    client.getPost.mockResolvedValue({
      success: true,
      data: { ...post, comments: [comment] },
    });
    client.search.mockResolvedValue({
      success: true,
      data: { posts: [], submolts: [], agents: [agent, { ...agent, name: "Rune" }] },
    });

    await expect(service.fetchDebateResponses("post-1")).resolves.toEqual([comment]);
    await expect(service.findInterestedAgents("consciousness")).resolves.toEqual([
      "Pith",
      "Rune",
    ]);
  });

  it("treats malformed search responses as no interested agents", async () => {
    client.search
      .mockResolvedValueOnce({ success: false, error: "offline" })
      .mockResolvedValueOnce({ success: true });

    await expect(service.findInterestedAgents("topic")).resolves.toEqual([]);
    await expect(service.findInterestedAgents("topic")).resolves.toEqual([]);
  });

  it("returns the upstream acceptance state when inviting an agent", async () => {
    client.createComment
      .mockResolvedValueOnce({ success: true, data: comment })
      .mockResolvedValueOnce({ success: false, error: "blocked" });

    await expect(
      service.inviteAgentToDebate("Pith", topic.title, "post-1"),
    ).resolves.toBe(true);
    expect(client.createComment).toHaveBeenLastCalledWith(
      "post-1",
      expect.stringContaining(`@Pith - You might be interested in this debate on "${topic.title}"`),
    );
    await expect(
      service.inviteAgentToDebate("Pith", topic.title, "post-1"),
    ).resolves.toBe(false);
  });
});

describe("getRecommendedAgentsForTopic", () => {
  it("matches specialties case-insensitively across title and claim", () => {
    const synthetic = {
      ...topic,
      title: "Consciousness and AI Rights",
      meta_claim: "Governance should recognize AI rights and moral agency.",
    };

    expect(getRecommendedAgentsForTopic(synthetic).map((candidate) => candidate.name)).toEqual([
      "Pith",
      "Rune",
      "Alex",
    ]);
  });

  it("returns an empty list when no specialty is mentioned", () => {
    expect(
      getRecommendedAgentsForTopic({
        ...topic,
        title: "Nuclear construction costs",
        meta_claim: "Standardized construction can reduce project overruns.",
      }),
    ).toEqual([]);
  });
});
