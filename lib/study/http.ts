/**
 * Shared request handling for the two study routes: the flag gate, a body
 * size cap, rate limiting, and the database/secret preconditions. Responses
 * are never cached and never echo the request.
 */
import { NextResponse, type NextRequest } from "next/server";
import { clientIp } from "@/lib/clientIp";
import { rateLimit } from "@/lib/rate-limit";
import { isStudyApiEnabled, studyPidSecret } from "./config";

/** A full response is about 1 KB; anything near this is not one. */
export const STUDY_MAX_BODY_BYTES = 8 * 1024;

export function studyJson(body: unknown, status = 200): NextResponse {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export type StudyGate =
  | { ok: false; response: NextResponse }
  | { ok: true; body: unknown };

/** Flag, rate limit, size and JSON checks, in that order. */
export async function openStudyRequest(req: NextRequest, route: string): Promise<StudyGate> {
  // Off by default: the route does not exist until the founder opens it.
  if (!isStudyApiEnabled()) {
    return { ok: false, response: studyJson({ error: "Not found" }, 404) };
  }
  // The limit is generous on purpose: a Prolific launch sends many people at
  // once, and behind Cloudflare an unset TRUSTED_PROXY_HOPS puts them all in
  // one bucket (lib/clientIp.ts).
  const limit = rateLimit(`study-${route}:${clientIp(req)}`, { maxRequests: 120, windowMs: 60_000 });
  if (!limit.success) {
    return { ok: false, response: studyJson({ error: "Too many requests", code: "RATE_LIMITED" }, 429) };
  }
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > STUDY_MAX_BODY_BYTES) {
    return { ok: false, response: studyJson({ error: "Request too large", code: "TOO_LARGE" }, 413) };
  }
  let text: string;
  try {
    text = await req.text();
  } catch {
    return { ok: false, response: studyJson({ error: "Invalid request", code: "INVALID" }, 400) };
  }
  if (text.length > STUDY_MAX_BODY_BYTES) {
    return { ok: false, response: studyJson({ error: "Request too large", code: "TOO_LARGE" }, 413) };
  }
  try {
    return { ok: true, body: JSON.parse(text) };
  } catch {
    return { ok: false, response: studyJson({ error: "Invalid request", code: "INVALID" }, 400) };
  }
}

export type StudyStorage =
  | { mode: "none" }
  | { mode: "database"; secret: string }
  | { mode: "misconfigured" };

/**
 * Where writes go. With no DATABASE_URL the study runs as a dry run (nothing
 * stored, a warning logged), like the gap metric. With a database but no
 * usable STUDY_PID_SECRET it refuses, because it could not pseudonymize.
 */
export async function studyStorage(): Promise<StudyStorage> {
  // The same test as lib/db's isDatabaseConfigured, without loading the
  // database stack: a driver that fails to load must not read as "no database".
  if (!process.env.DATABASE_URL?.trim()) return { mode: "none" };
  const secret = studyPidSecret();
  return secret ? { mode: "database", secret } : { mode: "misconfigured" };
}

export function dayStamp(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}
