/**
 * Judge Module
 *
 * AI judge council for evaluating debates and content.
 */

export { JudgeCouncil, createJudgeCouncil } from "./council";
export type { JudgeCouncilConfig, DebateMessage } from "./council";

export {
  DEFAULT_RUBRIC,
  calculateTotalScore,
  hasSignificantDisagreement,
  determineWinner,
} from "./rubric";
export type {
  RubricDimension,
  DimensionScore,
  JudgeScore,
  JudgeVerdict,
  JudgingResult,
} from "./rubric";

export {
  buildJudgeSystemPrompt,
  buildJudgeDebatePrompt,
  buildJudgeContentPrompt,
  parseJudgeResponse,
} from "./prompts";
export type { ParsedJudgeResponse } from "./prompts";
