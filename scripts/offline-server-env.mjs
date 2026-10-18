/**
 * Shared runtime overrides for the standalone smoke and Playwright servers.
 * Empty values also prevent Next.js from loading these settings from .env files.
 * Public settings baked into a prior build still require an offline build.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const OFFLINE_SERVER_ENV = Object.freeze({
  NODE_ENV: "production",
  NEXT_TELEMETRY_DISABLED: "1",
  DATABASE_URL: "",
  ANTHROPIC_API_KEY: "",
  OPENAI_API_KEY: "",
  GOOGLE_AI_API_KEY: "",
  GEMINI_API_KEY: "",
  XAI_API_KEY: "",
  GROK_API_KEY: "",
  TYPESAFE_API_KEY: "",
  REPLICATE_API_TOKEN: "",
  MOLTBOOK_API_KEY: "",
  AUTH_SECRET: "",
  NEXTAUTH_SECRET: "",
  AUTH_GOOGLE_ID: "",
  AUTH_GOOGLE_SECRET: "",
  REPORT_PUBLICATION_SECRET: "",
  NEXT_PUBLIC_GA_MEASUREMENT_ID: "",
  ENABLE_LIVE_ANALYZE_API: "false",
  ENABLE_LIVE_DEBATE_API: "false",
  ENABLE_LIVE_JUDGING_API: "false",
  NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API: "false",
  NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API: "false",
  NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API: "false",
  ENABLE_DISAGREEMENT_V2: "false",
  ENABLE_DISAGREEMENT_PUBLISHING: "false",
  ARGUMEND_DISAGREEMENT_PROVIDER: "",
  ARGUMEND_DISAGREEMENT_MODEL: "",
  ENABLE_JEV_MAP_REPLY: "false",
  NEXT_PUBLIC_ENABLE_JEV_MAP_REPLY: "false",
  ARGUMEND_JEV_PROVIDER: "",
  ENABLE_GAP_METRIC_LOGGING: "false",
  NEXT_PUBLIC_ENABLE_AUTH: "false",
});
