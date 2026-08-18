import { describe, expect, it } from "vitest";
import {
  createPublicationToken,
  digestReportBundle,
  hashOpaque,
  tokensMatch,
  verifyPublicationToken,
} from "./publication";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "./prompts/v1/examples";
import { FakeDisagreementProvider } from "./model/fake";
import { analyzeDisagreement } from "./analyze";

describe("publication tokens", () => {
  it("verifies a signed digest and rejects a mutated one", () => {
    const token = createPublicationToken({
      digest: "abc",
      secret: "secret",
      now: 1_000,
    });
    expect(
      verifyPublicationToken({ token: token.token, digest: "abc", secret: "secret", now: 1_000 }),
    ).toBe(true);
    expect(
      verifyPublicationToken({ token: token.token, digest: "nope", secret: "secret", now: 1_000 }),
    ).toBe(false);
  });

  it("compares manage tokens in constant time", () => {
    const raw = "manage-token";
    expect(tokensMatch(raw, hashOpaque(raw))).toBe(true);
    expect(tokensMatch("other", hashOpaque(raw))).toBe(false);
  });

  it("does not include source text in the digest payload", async () => {
    const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[1];
    const source = `${example.source}\n\n${"Context for length. ".repeat(8)}`;
    const result = await analyzeDisagreement({
      content: source,
      contentType: "conversation",
      requestId: "11111111-1111-1111-1111-111111111111",
      provider: new FakeDisagreementProvider(example.extraction),
    });
    const digestInput = JSON.stringify({ report: result.report, graph: result.graph });
    expect(digestInput.includes(source.slice(0, 40))).toBe(false);
    expect(digestReportBundle(result.report, result.graph)).toHaveLength(64);
  });
});
