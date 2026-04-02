/**
 * Analyze Module
 *
 * Content analysis and argument extraction.
 */

export { extractArguments, toDebateMessages } from "./extractor";
export { extractArgumentsOffline } from "./offline";
export type {
  ExtractedArgument,
  ExtractedPosition,
  IdentifiedCrux,
  PotentialFallacy,
  ExtractedArguments,
} from "./extractor";
