import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("live debate configuration", () => {
  it.each([
    ["true", "false", true],
    ["false", "true", false],
    ["false", "false", false],
    ["TRUE", "false", false],
    ["1", "false", false],
  ])(
    "authorizes from server=%s, not UI flag=%s, as %s",
    async (serverFlag, publicFlag, expected) => {
      vi.stubEnv("ENABLE_LIVE_DEBATE_API", serverFlag);
      vi.stubEnv("NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API", publicFlag);
      const { isLiveDebateEnabled } = await import("./shared");

      expect(isLiveDebateEnabled()).toBe(expected);
    },
  );
});

describe("debate prompt contracts", () => {
  it("builds distinct side instructions and includes mapped pillar context", async () => {
    const { buildSystemPrompt } = await import("./shared");
    const pillars = [
      {
        title: "Build speed",
        skepticPremise: "Projects often overrun.",
        proponentRebuttal: "Standardized builds can be faster.",
      },
    ];

    const forPrompt = buildSystemPrompt("for", "Nuclear should expand", pillars);
    const againstPrompt = buildSystemPrompt("against", "Nuclear should expand", pillars);

    expect(forPrompt).toContain('"Nuclear should expand"');
    expect(forPrompt).toContain("arguing IN FAVOR");
    expect(againstPrompt).toContain("arguing AGAINST");
    for (const prompt of [forPrompt, againstPrompt]) {
      expect(prompt).toContain("1. Build speed");
      expect(prompt).toContain("Skeptic view: Projects often overrun.");
      expect(prompt).toContain("Proponent view: Standardized builds can be faster.");
      expect(prompt).toContain("no meta-commentary");
    }
  });

  it("omits the pillar section when no mapped context is available", async () => {
    const { buildSystemPrompt } = await import("./shared");

    expect(buildSystemPrompt("for", "A claim")).not.toContain("Key points to consider");
    expect(buildSystemPrompt("for", "A claim", [])).not.toContain("Key points to consider");
  });

  it("builds opening instructions for both sides", async () => {
    const { buildUserPrompt } = await import("./shared");

    expect(buildUserPrompt(1, [], "for")).toBe(
      "Present your opening argument in favor of the claim.",
    );
    expect(buildUserPrompt(1, [], "against")).toBe(
      "Present your opening argument against the claim.",
    );
  });

  it("rebuts the latest opponent message rather than an older turn", async () => {
    const { buildUserPrompt } = await import("./shared");
    const prompt = buildUserPrompt(
      3,
      [
        { side: "against", round: 1, content: "Older objection" },
        { side: "for", round: 2, content: "Our own turn" },
        { side: "against", round: 2, content: "Latest objection" },
      ],
      "for",
    );

    expect(prompt).toContain('"Latest objection"');
    expect(prompt).not.toContain("Older objection");
  });

  it("continues the requested side when no opponent turn exists", async () => {
    const { buildUserPrompt } = await import("./shared");

    expect(
      buildUserPrompt(2, [{ side: "for", round: 1, content: "Own turn" }], "for"),
    ).toBe("Continue making your case in favor of the claim.");
    expect(buildUserPrompt(2, [], "against")).toBe(
      "Continue making your case against the claim.",
    );
  });
});

describe("Gemini client configuration", () => {
  it("fails with a stable configuration error when neither API key exists", async () => {
    vi.stubEnv("GOOGLE_AI_API_KEY", "");
    vi.stubEnv("GEMINI_API_KEY", "");
    const { getGemini } = await import("./shared");

    await expect(getGemini()).rejects.toThrow(
      "GOOGLE_AI_API_KEY or GEMINI_API_KEY environment variable is required",
    );
  });
});
