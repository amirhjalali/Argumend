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
      "TYPESAFE_API_KEY",
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
    expect(example.ENABLE_DISAGREEMENT_V2).toBe("false");
    expect(example.NEXT_PUBLIC_ENABLE_DISAGREEMENT_V2).toBe("false");
    expect(example.ENABLE_DISAGREEMENT_PUBLISHING).toBe("false");
    expect(example.ARGUMEND_DISAGREEMENT_MODEL).toBe("");
    expect(example.REPORT_PUBLICATION_SECRET).toBe("");
    expect(example.NEXT_PUBLIC_ENABLE_AUTH).toBe("false");
  });

  it("keeps the Jev map reply off and its model pinned", () => {
    expect(example.ENABLE_JEV_MAP_REPLY).toBe("false");
    expect(example.JEV_MODEL).toBe("jev-1.13.0");
    expect(example.JEV_DAILY_TOKEN_CEILING).toBe("5000000");
    expect(example.ARGUMEND_JEV_PROVIDER).toBe("");
    expect(example.MAP_REPLY_TOPIC_CONFIDENCE).toBe("0.5");
    expect(example.TRUSTED_PROXY_HOPS).toBe("1");
  });

  it("warns, in the file itself, that the Jev lane sends pasted text to a third party", () => {
    const raw = readFileSync(resolve(process.cwd(), ".env.example"), "utf8");
    expect(raw).toContain("POSTS THE TEXT THE USER PASTED");
    expect(raw).toContain("docs/MAP_REPLY.md");
  });
});
