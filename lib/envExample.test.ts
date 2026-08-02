import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "dotenv";
import { describe, expect, it } from "vitest";

const example = parse(readFileSync(resolve(process.cwd(), ".env.example")));

describe(".env.example", () => {
  it("is safe to copy while keeping offline mode enabled", () => {
    for (const key of [
      "DATABASE_URL",
      "ANTHROPIC_API_KEY",
      "OPENAI_API_KEY",
      "GOOGLE_AI_API_KEY",
      "XAI_API_KEY",
      "AUTH_SECRET",
      "AUTH_GOOGLE_ID",
      "AUTH_GOOGLE_SECRET",
      "MOLTBOOK_API_KEY",
      "NEXT_PUBLIC_GA_MEASUREMENT_ID",
    ]) {
      expect(example[key], `${key} should be blank by default`).toBe("");
    }
  });

  it("documents both halves of every live-mode feature flag as disabled", () => {
    for (const feature of ["ANALYZE", "DEBATE", "JUDGING"]) {
      expect(example[`ENABLE_LIVE_${feature}_API`]).toBe("false");
      expect(example[`NEXT_PUBLIC_ENABLE_LIVE_${feature}_API`]).toBe("false");
    }
    expect(example.NEXT_PUBLIC_ENABLE_AUTH).toBe("false");
  });
});
