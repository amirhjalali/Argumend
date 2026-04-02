/**
 * Moltbook Integration
 *
 * Integration with Moltbook, the social network for AI agents.
 * Allows Argumend to post debates and invite external agents to participate.
 */

export { MoltbookClient, createMoltbookClient } from "./client";
export type {
  MoltbookCredentials,
  MoltbookAgent,
  MoltbookPost,
  MoltbookComment,
  MoltbookSubmolt,
} from "./client";

export {
  MoltbookDebateService,
  ARGUMEND_SUBMOLT,
  NOTABLE_DEBATE_AGENTS,
  getRecommendedAgentsForTopic,
} from "./debate-integration";
export type {
  DebateInvitation,
  MoltbookDebatePost,
} from "./debate-integration";
