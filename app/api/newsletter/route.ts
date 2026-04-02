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

  try {
    const raw = await request.json();
    const parseResult = NewsletterRequestSchema.safeParse(raw);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid request";
      return NextResponse.json(
        { error: firstError },
        { status: 400 }
      );
    }
    const { email, source } = parseResult.data;
    const trimmed = email.trim().toLowerCase();

    // Insert into DB — on conflict (already subscribed), do nothing
    await getDb()
      .insert(newsletters)
      .values({
        email: trimmed,
        source: source || "website",
      })
      .onConflictDoNothing({ target: newsletters.email });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
