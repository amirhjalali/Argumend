import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { FakeDisagreementProvider } from "./fake";

function loadFixture(name: string): { source: string; extraction: RawDisagreementExtractionV1 } {
  return JSON.parse(
    readFileSync(join(process.cwd(), "data/evals/disagreement", `${name}.json`), "utf8"),
  );
}

describe("fake provider fixture selection", () => {
  it("returns the eval fixture's canned extraction when the source matches exactly", async () => {
    const fixture = loadFixture("trust-split-traffic-study");
    const result = await new FakeDisagreementProvider().extract(
      { content: fixture.source, contentType: "conversation" },
      {},
    );
    expect(result.data.positions.length).toBeGreaterThan(0);
    expect(result.data).toEqual(fixture.extraction);
  });

  it("matches after the pipeline's source normalisation (CRLF, surrounding whitespace)", async () => {
    const fixture = loadFixture("trust-split-traffic-study");
    const result = await new FakeDisagreementProvider().extract(
      { content: `\n${fixture.source.replace(/\n/g, "\r\n")}\n`, contentType: "conversation" },
      {},
    );
    expect(result.data).toEqual(fixture.extraction);
  });

  it("still falls back to the keyword fixtures for an unknown source", async () => {
    const result = await new FakeDisagreementProvider().extract(
      {
        content: `${"Nobody here has said a word about any known fixture topic at all. ".repeat(4)}`,
        contentType: "freeform",
      },
      {},
    );
    expect(result.data.positions).toHaveLength(0);
  });
});
