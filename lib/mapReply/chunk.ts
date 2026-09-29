import { MAP_REPLY_LIMITS } from "./constants";
import type { ThreadTurn } from "./parse";

/**
 * Split probed turns into request-sized groups.
 *
 * The size matters more than it looks. Putting a whole 114-turn debate into one
 * state made every answer drift to the transcript mean (fallacy 74% ± 2 for
 * every speaker); chunking to eight turns, with only those turns in the state,
 * spread the same scores from 14% to 95%. Keep state small.
 */
export function chunkTurns(
  turns: readonly ThreadTurn[],
  size: number = MAP_REPLY_LIMITS.turnsPerRequest,
): ThreadTurn[][] {
  const step = Math.max(1, Math.floor(size));
  const chunks: ThreadTurn[][] = [];
  for (let start = 0; start < turns.length; start += step) {
    chunks.push(turns.slice(start, start + step));
  }
  return chunks;
}
