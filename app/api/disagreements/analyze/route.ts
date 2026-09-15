import { createDisagreementAnalyzeHandler } from "@/lib/disagreement/analyzeHandler";

export const runtime = "nodejs";

/**
 * Handler body lives in lib/disagreement/analyzeHandler.ts so tests can inject
 * a RateLimiter. Production uses the default per-process limiter (spec §11.3).
 */
export const POST = createDisagreementAnalyzeHandler();
