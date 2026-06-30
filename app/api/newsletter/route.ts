import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db/index";
import { newsletters } from "@/lib/db/schema";
import { rateLimit } from "@/lib/rate-limit";

const NewsletterRequestSchema = z.object({
  email: z.string().email("Please enter a valid email address.").max(254),
  source: z.string().max(100).optional(),
});

/**
 * POST /api/newsletter
 *
 * Subscribe an email to the newsletter. No auth required.
 */
export async function POST(request: NextRequest) {
  // Rate limit: 5 signups per hour per IP
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`newsletter:${ip}`, {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.ceil((limit.resetAt - Date.now()) / 1000)
          ),
        },
      }
    );
  }

  // Parse + validate the body. Malformed JSON or an invalid email is a genuine
  // client error and still returns 400 — validation behavior is unchanged.
  let email: string;
  let source: string | undefined;
  try {
    const raw = await request.json();
    const parseResult = NewsletterRequestSchema.safeParse(raw);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid request";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }
    email = parseResult.data.email.trim().toLowerCase();
    source = parseResult.data.source;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Persist durably. The app runs offline by default, so a missing or unreachable
  // database must NEVER lose a signup or show the visitor an error. If the DB
  // write fails for any reason (getDb throws, connection drops, insert errors),
  // we fall back to a structured, greppable log marker and STILL report success —
  // the address can be recovered from logs and reconciled later.
  try {
    // Insert into DB — on conflict (already subscribed), do nothing
    await getDb()
      .insert(newsletters)
      .values({
        email,
        source: source || "website",
      })
      .onConflictDoNothing({ target: newsletters.email });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    // Strip CR/LF so a crafted `source` (validated only as a <=100-char string)
    // or `reason` can't forge or split log lines / poison a log aggregator.
    const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");
    console.warn(
      `[newsletter-fallback] ${email} ${new Date().toISOString()} source=${oneLine(source || "website")} reason=${oneLine(reason)}`
    );
  }

  return NextResponse.json({ success: true });
}
