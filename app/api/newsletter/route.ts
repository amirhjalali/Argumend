import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { newsletters } from "@/lib/db/schema";
import { rateLimit } from "@/lib/rate-limit";

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
    const body = await request.json();
    const { email, source } = body as { email?: string; source?: string };

    // Validate email presence
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Validate email format
    const trimmed = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Insert into DB — on conflict (already subscribed), do nothing
    await db
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
