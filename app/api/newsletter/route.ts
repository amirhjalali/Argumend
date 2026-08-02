import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db/index";
import { newsletters } from "@/lib/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";

const NewsletterRequestSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address.")
    .max(254),
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
    email = parseResult.data.email;
    source = parseResult.data.source;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Newsletter subscriptions require durable storage. Offline mode keeps the
  // rest of the product usable, but must not claim a signup succeeded when no
  // database accepted it or leak a visitor's email address into application logs.
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
    console.warn("Newsletter persistence unavailable:", sanitizeServerLog(error));
    return NextResponse.json(
      { error: "Newsletter signup is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  return NextResponse.json({ success: true });
}
