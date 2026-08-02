import { describe, expect, it } from "vitest";
import { determineConsensusWinner } from "./consensus";

type RuntimeVerdict = Parameters<typeof determineConsensusWinner>[0][number];

function asRuntimeVerdicts(values: unknown[]) {
  return values as RuntimeVerdict[];
}

describe("determineConsensusWinner runtime boundaries", () => {
  it("treats unknown winner strings as abstentions", () => {
    expect(
      determineConsensusWinner(
        asRuntimeVerdicts([
          { winner: "for" },
          { winner: "for" },
          { winner: "unexpected-provider-value" },
        ]),
      ),
    ).toEqual({ winner: "for", hasConsensus: false });
  });

  it("does not turn one valid vote among malformed payloads into a majority", () => {
    expect(
      determineConsensusWinner(
        asRuntimeVerdicts([{ winner: "against" }, null, {}, { winner: 1 }]),
      ),
    ).toEqual({ winner: null, hasConsensus: false });
  });

  it("does not let inherited object keys corrupt the tally", () => {
    expect(
      determineConsensusWinner(
        asRuntimeVerdicts([
          { winner: "draw" },
          { winner: "draw" },
          { winner: "__proto__" },
        ]),
      ),
    ).toEqual({ winner: "draw", hasConsensus: false });
  });
});
