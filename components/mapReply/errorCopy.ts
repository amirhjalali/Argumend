import type { MapReplyErrorCode } from "@/lib/mapReply/errors";

/**
 * Reader-facing copy for every error the route can return.
 *
 * The API's own messages are correct but terse, because they are also read by
 * scripts. These say the same thing and add the next move, which is the only
 * part a person on the page actually needs. The record is typed against
 * `MapReplyErrorCode`, so a new code cannot ship without copy.
 */
const ERROR_COPY: Record<MapReplyErrorCode, string> = {
  FEATURE_DISABLED:
    "Map replies are switched off on this deployment. The page is here; the model lane behind it is not enabled.",
  PROVIDER_NOT_CONFIGURED:
    "Map replies are enabled but no model is configured, so there is nothing to answer with. Fixture answers are never served in production.",
  INVALID_REQUEST: "That request could not be read. Reload the page and try again.",
  CONTENT_TOO_SHORT:
    "Paste a longer exchange. There has to be an argument in it before it can be routed to a map.",
  CONTENT_TOO_LONG:
    "That paste is over the 12,000-character cap. Trim it to the part people are actually arguing in.",
  RATE_LIMITED:
    "Too many map replies from this network. The limit is 10 an hour and 40 a day; try again later.",
  SPEND_LIMIT_REACHED:
    "The daily model budget for map replies is spent. It resets at midnight UTC.",
  PROVIDER_TIMEOUT:
    "The model did not answer in time. Nothing was stored; try again, a typical run is under a second.",
  PROVIDER_UNAVAILABLE:
    "The model service is not reachable right now. Try again in a few minutes.",
  INTERNAL_ERROR: "Something went wrong building the reply. Nothing was stored; try again.",
};

function isKnownCode(code: string): code is MapReplyErrorCode {
  return code in ERROR_COPY;
}

/**
 * Prefer our copy for a code we know, fall back to whatever the route said,
 * and never leave the reader with an empty panel.
 */
export function mapReplyErrorMessage(code: string | undefined, serverMessage?: string): string {
  if (code && isKnownCode(code)) return ERROR_COPY[code];
  if (serverMessage) return serverMessage;
  return ERROR_COPY.INTERNAL_ERROR;
}
