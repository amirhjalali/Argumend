import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { clientIp } from "@/lib/clientIp";
import { findMaps } from "@/lib/paste/maps";
import { PASTE_LIMITS } from "@/lib/paste/limits";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";

/**
 * POST /api/analyze — the map lane of the paste flow at /analyze.
 *
 * Finds which of the site's maps the pasted argument is already on. Offline:
 * a keyword index over the maps held in memory, no network, no model. Nothing
 * is stored and nothing is logged about the text: the only record is the
 * in-memory rate-limit counter, keyed by client address, not by content.
 *
 * This route used to run the legacy offline extractor, score both sides with
 * a rule-based "judge council", and save the result to a public list. All
 * three are retired from the paste flow: Argumend never names a winner, and a
 * paste is never published without a deliberate step (see ShareReport).
 */

export const runtime = "nodejs";

const AnalyzeRequestSchema = z.object({
  content: z
    .string()
    .trim()
    .min(PASTE_LIMITS.minMapCharacters, "Add a little more text.")
    .max(PASTE_LIMITS.maxCharacters, `Keep it under ${PASTE_LIMITS.maxCharacters.toLocaleString("en-US")} characters.`),
  contentType: z.enum(["conversation", "article", "freeform"]).optional(),
});

export async function POST(request: NextRequest) {
  // Generous: the lane costs a few milliseconds and no money, but it is still
  // CPU on our server.
  const ip = clientIp(request);
  const limit = rateLimit(`analyze:${ip}`, { maxRequests: 60, windowMs: 60 * 60 * 1000 });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Rate limited. Please try again later.", code: "RATE_LIMITED" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
          "Cache-Control": "no-store",
        },
      },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { error: "The request could not be understood.", code: "INVALID_JSON" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const parsed = AnalyzeRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Invalid request.",
        code: "INVALID_REQUEST",
      },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const maps = await findMaps(parsed.data.content);
    return NextResponse.json({ maps }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    // The error never carries the paste: findMaps reads only the topic data.
    console.error("Map lane failed:", sanitizeServerLog(error));
    return NextResponse.json(
      { error: "The maps could not be searched just now.", code: "MAPS_UNAVAILABLE" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
