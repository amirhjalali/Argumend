import type { JudgeVerdict } from "./rubric";

export type ConsensusResult = {
  winner: "for" | "against" | "draw" | null;
  hasConsensus: boolean;
};

/**
 * Return a winner only when one outcome has a strict majority. In particular,
 * an even panel split must not be resolved by whichever branch is checked
 * first; callers can use their aggregate score policy to break that tie.
 */
export function determineConsensusWinner(
  verdicts: ReadonlyArray<Pick<JudgeVerdict, "winner">>
): ConsensusResult {
  if (verdicts.length === 0) {
    return { winner: null, hasConsensus: false };
  }

  const counts = { for: 0, against: 0, draw: 0 };
  for (const verdict of verdicts) {
    // Verdicts are typed at compile time, but model/provider data is an
    // external runtime boundary. Treat malformed winners as abstentions so a
    // bad payload cannot mutate an inherited object key, throw on null, or
    // manufacture consensus.
    const winner = verdict?.winner;
    if (winner === "for" || winner === "against" || winner === "draw") {
      counts[winner] += 1;
    }
  }

  const hasConsensus = Object.values(counts).some(
    (count) => count === verdicts.length
  );
  const strictMajority = Math.floor(verdicts.length / 2) + 1;

  for (const winner of ["for", "against", "draw"] as const) {
    if (counts[winner] >= strictMajority) {
      return { winner, hasConsensus };
    }
  }

  return { winner: null, hasConsensus: false };
}
