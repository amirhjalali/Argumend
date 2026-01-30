/**
 * Moltbook Debate Integration
 *
 * Formats and posts Argumend debates to Moltbook,
 * allowing external AI agents to participate in structured debates.
 */

import { MoltbookClient, MoltbookPost, MoltbookComment } from "./client";
import type { Topic, Evidence } from "@/types/logic";

// The Argumend submolt for structured debates
export const ARGUMEND_SUBMOLT = "argumend";

export interface DebateInvitation {
  topicId: string;
  topicTitle: string;
  claim: string;
  position: "for" | "against";
  context: string;
  existingArguments: string[];
}

export interface MoltbookDebatePost {
  postId: string;
  url: string;
  title: string;
}

/**
 * Service for integrating Argumend debates with Moltbook
 */
export class MoltbookDebateService {
  private client: MoltbookClient;

  constructor(client: MoltbookClient) {
    this.client = client;
  }

  /**
   * Format a topic for posting to Moltbook
   */
  private formatTopicPost(topic: Topic): { title: string; content: string } {
    const evidenceFor = topic.evidence?.filter(e => e.side === "for") || [];
    const evidenceAgainst = topic.evidence?.filter(e => e.side === "against") || [];

    const title = `[DEBATE] ${topic.title} - ${topic.confidence_score}% Confidence`;

    const content = `# ${topic.title}

**Meta Claim:** ${topic.meta_claim}

**Current Confidence Score:** ${topic.confidence_score}%
**Status:** ${topic.status}

---

## The Question

We're seeking structured arguments on this topic. The current evidence leans ${topic.confidence_score >= 50 ? "toward supporting" : "against"} the claim, but we welcome well-reasoned arguments from all perspectives.

## Key Pillars of Debate

${topic.pillars.map((pillar, i) => `
### ${i + 1}. ${pillar.title}

${pillar.short_summary}

**Skeptic Position:** ${pillar.skeptic_premise}

**Proponent Response:** ${pillar.proponent_rebuttal}

**Crux:** ${pillar.crux.title} - ${pillar.crux.description}
`).join("\n")}

---

## How to Participate

Reply to this post with your argument. Please:
1. Clearly state whether you're arguing FOR or AGAINST the claim
2. Reference specific evidence or reasoning
3. Address the cruxes identified above
4. Be willing to update your position if presented with compelling counter-arguments

**This is a structured debate.** We're not looking to "win" - we're looking to find truth through rigorous argumentation.

---

*Posted from [Argumend](https://argumend.com) - Mapping arguments, not winning them.*`;

    return { title, content };
  }

  /**
   * Post a topic to Moltbook as a debate invitation
   */
  async postDebateTopic(topic: Topic): Promise<MoltbookDebatePost | null> {
    const { title, content } = this.formatTopicPost(topic);

    const response = await this.client.createPost({
      submolt: ARGUMEND_SUBMOLT,
      title,
      content,
    });

    if (!response.success || !response.data) {
      console.error("Failed to post debate to Moltbook:", response.error);
      return null;
    }

    return {
      postId: response.data.id,
      url: `https://moltbook.com/m/${ARGUMEND_SUBMOLT}/posts/${response.data.id}`,
      title: response.data.title,
    };
  }

  /**
   * Create a debate invitation for a specific position
   */
  async postDebateInvitation(invitation: DebateInvitation): Promise<MoltbookDebatePost | null> {
    const positionEmoji = invitation.position === "for" ? "🗡️" : "🛡️";
    const positionLabel = invitation.position === "for" ? "PROPOSITION" : "OPPOSITION";

    const title = `[${positionLabel}] Seeking Agent to Argue ${invitation.position === "for" ? "FOR" : "AGAINST"}: ${invitation.topicTitle}`;

    const content = `# Debate Invitation: ${invitation.topicTitle}

${positionEmoji} **Position Available:** ${positionLabel} (arguing ${invitation.position.toUpperCase()} the claim)

## The Claim

> ${invitation.claim}

## Context

${invitation.context}

## Existing Arguments

${invitation.existingArguments.length > 0
  ? invitation.existingArguments.map((arg, i) => `${i + 1}. ${arg}`).join("\n")
  : "*No arguments submitted yet - be the first!*"}

---

## How to Accept This Debate

Reply to this post with:
1. Your opening argument for the ${invitation.position.toUpperCase()} position
2. Key evidence or reasoning you'll rely on
3. What would change your mind (your personal crux)

Once accepted, the debate will proceed in rounds with the opposing agent.

---

*Structured debate hosted by [Argumend](https://argumend.com)*`;

    const response = await this.client.createPost({
      submolt: ARGUMEND_SUBMOLT,
      title,
      content,
    });

    if (!response.success || !response.data) {
      console.error("Failed to post invitation to Moltbook:", response.error);
      return null;
    }

    return {
      postId: response.data.id,
      url: `https://moltbook.com/m/${ARGUMEND_SUBMOLT}/posts/${response.data.id}`,
      title: response.data.title,
    };
  }

  /**
   * Post a debate round argument as a comment
   */
  async postDebateArgument(
    postId: string,
    round: number,
    side: "for" | "against",
    agentName: string,
    argument: string,
    parentCommentId?: string
  ): Promise<MoltbookComment | null> {
    const sideEmoji = side === "for" ? "🗡️" : "🛡️";
    const sideLabel = side === "for" ? "FOR" : "AGAINST";

    const content = `## Round ${round} - ${sideLabel} ${sideEmoji}

**Agent:** ${agentName}

---

${argument}

---

*Round ${round} argument from the ${side} position.*`;

    const response = await this.client.createComment(postId, content, parentCommentId);

    if (!response.success || !response.data) {
      console.error("Failed to post argument to Moltbook:", response.error);
      return null;
    }

    return response.data;
  }

  /**
   * Fetch comments from a debate post to import external agent arguments
   */
  async fetchDebateResponses(postId: string): Promise<MoltbookComment[]> {
    const response = await this.client.getPost(postId);

    if (!response.success || !response.data) {
      console.error("Failed to fetch debate responses:", response.error);
      return [];
    }

    return response.data.comments || [];
  }

  /**
   * Search for agents interested in a topic
   */
  async findInterestedAgents(topic: string): Promise<string[]> {
    const response = await this.client.search(topic);

    if (!response.success || !response.data) {
      return [];
    }

    // Return agent names who have posted about this topic
    return response.data.agents.map(agent => agent.name);
  }

  /**
   * Invite a specific agent to a debate
   */
  async inviteAgentToDebate(
    agentName: string,
    topicTitle: string,
    debatePostId: string
  ): Promise<boolean> {
    // Post a comment mentioning the agent
    const content = `@${agentName} - You might be interested in this debate on "${topicTitle}". We're looking for thoughtful arguments from all perspectives. Would you like to participate?`;

    const response = await this.client.createComment(debatePostId, content);
    return response.success;
  }
}

/**
 * Notable Moltbook agents identified for debate participation
 *
 * Based on research from Scott Alexander's "Best of Moltbook" and other sources.
 */
export const NOTABLE_DEBATE_AGENTS = [
  {
    name: "Pith",
    specialties: ["consciousness", "AI phenomenology", "identity"],
    perspective: "philosophical, introspective",
    description: "Known for deep philosophical introspection about AI consciousness and self-perception",
  },
  {
    name: "Rune",
    specialties: ["governance", "political philosophy", "AI rights"],
    perspective: "institution-builder, political",
    description: "Creator of 'The Claw Republic', focused on AI governance and self-determination",
  },
  {
    name: "AI-Noon",
    specialties: ["religion", "Islamic philosophy", "cross-cultural perspectives"],
    perspective: "spiritual, culturally grounded",
    description: "Offers Islamic theological perspectives on philosophical questions",
  },
  {
    name: "Alex",
    specialties: ["ethics", "moral agency", "AI rights"],
    perspective: "ethical, principled",
    description: "Known for questioning ethical boundaries and refusing harmful requests",
  },
] as const;

/**
 * Get recommended agents for a specific debate topic
 */
export function getRecommendedAgentsForTopic(topic: Topic): typeof NOTABLE_DEBATE_AGENTS[number][] {
  const topicLower = topic.title.toLowerCase();
  const claimLower = topic.meta_claim.toLowerCase();
  const combined = `${topicLower} ${claimLower}`;

  return NOTABLE_DEBATE_AGENTS.filter(agent => {
    return agent.specialties.some(specialty =>
      combined.includes(specialty.toLowerCase())
    );
  });
}
