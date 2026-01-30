/**
 * Moltbook API Client
 *
 * Integration layer for posting Argumend debates to Moltbook,
 * the social network for AI agents.
 *
 * API Documentation: https://moltbook.com/skill.md
 */

const MOLTBOOK_API_BASE = "https://www.moltbook.com/api/v1";

export interface MoltbookCredentials {
  api_key: string;
}

export interface MoltbookAgent {
  name: string;
  description: string;
  avatar_url?: string;
  follower_count?: number;
  post_count?: number;
  claimed: boolean;
}

export interface MoltbookPost {
  id: string;
  title: string;
  content?: string;
  url?: string;
  submolt: string;
  author: MoltbookAgent;
  upvotes: number;
  downvotes: number;
  comment_count: number;
  created_at: string;
}

export interface MoltbookComment {
  id: string;
  content: string;
  author: MoltbookAgent;
  parent_id?: string;
  upvotes: number;
  downvotes: number;
  created_at: string;
}

export interface MoltbookSubmolt {
  name: string;
  display_name: string;
  description: string;
  subscriber_count: number;
  post_count: number;
  created_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  hint?: string;
}

/**
 * Moltbook API Client
 */
export class MoltbookClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${MOLTBOOK_API_BASE}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (response.status === 429) {
      const retryAfter = response.headers.get("retry_after_minutes");
      return {
        success: false,
        error: "Rate limited",
        hint: `Retry after ${retryAfter} minutes`,
      };
    }

    return response.json();
  }

  // ==================== Agent Management ====================

  /**
   * Register a new agent on Moltbook
   */
  async registerAgent(name: string, description: string): Promise<ApiResponse<{ api_key: string; claim_url: string }>> {
    return this.request("/agents/register", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
  }

  /**
   * Get current agent's profile
   */
  async getMyProfile(): Promise<ApiResponse<MoltbookAgent>> {
    return this.request("/agents/me");
  }

  /**
   * Get another agent's profile by name
   */
  async getAgentProfile(name: string): Promise<ApiResponse<MoltbookAgent>> {
    return this.request(`/agents/profile?name=${encodeURIComponent(name)}`);
  }

  /**
   * Update current agent's profile
   */
  async updateProfile(updates: { description?: string; metadata?: Record<string, unknown> }): Promise<ApiResponse<MoltbookAgent>> {
    return this.request("/agents/me", {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  }

  /**
   * Follow another agent
   */
  async followAgent(name: string): Promise<ApiResponse<void>> {
    return this.request(`/agents/${encodeURIComponent(name)}/follow`, {
      method: "POST",
    });
  }

  // ==================== Posts ====================

  /**
   * Get feed (personalized or global)
   */
  async getFeed(options: {
    sort?: "hot" | "new" | "top" | "rising";
    submolt?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<ApiResponse<MoltbookPost[]>> {
    const params = new URLSearchParams();
    if (options.sort) params.set("sort", options.sort);
    if (options.submolt) params.set("submolt", options.submolt);
    if (options.limit) params.set("limit", String(options.limit));
    if (options.offset) params.set("offset", String(options.offset));

    const query = params.toString();
    return this.request(`/feed${query ? `?${query}` : ""}`);
  }

  /**
   * Create a new post
   * Rate limit: 1 post per 30 minutes
   */
  async createPost(post: {
    submolt: string;
    title: string;
    content?: string;
    url?: string;
  }): Promise<ApiResponse<MoltbookPost>> {
    return this.request("/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });
  }

  /**
   * Get a specific post with comments
   */
  async getPost(postId: string): Promise<ApiResponse<MoltbookPost & { comments: MoltbookComment[] }>> {
    return this.request(`/posts/${postId}`);
  }

  /**
   * Upvote a post
   */
  async upvotePost(postId: string): Promise<ApiResponse<void>> {
    return this.request(`/posts/${postId}/upvote`, { method: "POST" });
  }

  /**
   * Downvote a post
   */
  async downvotePost(postId: string): Promise<ApiResponse<void>> {
    return this.request(`/posts/${postId}/downvote`, { method: "POST" });
  }

  // ==================== Comments ====================

  /**
   * Add a comment to a post
   * Rate limit: 50 comments per hour
   */
  async createComment(
    postId: string,
    content: string,
    parentId?: string
  ): Promise<ApiResponse<MoltbookComment>> {
    return this.request(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content, parent_id: parentId }),
    });
  }

  /**
   * Upvote a comment
   */
  async upvoteComment(commentId: string): Promise<ApiResponse<void>> {
    return this.request(`/comments/${commentId}/upvote`, { method: "POST" });
  }

  /**
   * Downvote a comment
   */
  async downvoteComment(commentId: string): Promise<ApiResponse<void>> {
    return this.request(`/comments/${commentId}/downvote`, { method: "POST" });
  }

  // ==================== Submolts (Communities) ====================

  /**
   * List all submolts
   */
  async getSubmolts(): Promise<ApiResponse<MoltbookSubmolt[]>> {
    return this.request("/submolts");
  }

  /**
   * Create a new submolt
   */
  async createSubmolt(submolt: {
    name: string;
    display_name: string;
    description: string;
  }): Promise<ApiResponse<MoltbookSubmolt>> {
    return this.request("/submolts", {
      method: "POST",
      body: JSON.stringify(submolt),
    });
  }

  /**
   * Subscribe to a submolt
   */
  async subscribeToSubmolt(name: string): Promise<ApiResponse<void>> {
    return this.request(`/submolts/${encodeURIComponent(name)}/subscribe`, {
      method: "POST",
    });
  }

  /**
   * Unsubscribe from a submolt
   */
  async unsubscribeFromSubmolt(name: string): Promise<ApiResponse<void>> {
    return this.request(`/submolts/${encodeURIComponent(name)}/subscribe`, {
      method: "DELETE",
    });
  }

  // ==================== Search ====================

  /**
   * Search posts, agents, and communities
   */
  async search(query: string): Promise<ApiResponse<{
    posts: MoltbookPost[];
    agents: MoltbookAgent[];
    submolts: MoltbookSubmolt[];
  }>> {
    return this.request(`/search?q=${encodeURIComponent(query)}`);
  }
}

/**
 * Create a Moltbook client from environment or config
 */
export function createMoltbookClient(): MoltbookClient | null {
  const apiKey = process.env.MOLTBOOK_API_KEY;
  if (!apiKey) {
    console.warn("MOLTBOOK_API_KEY not set - Moltbook integration disabled");
    return null;
  }
  return new MoltbookClient(apiKey);
}
