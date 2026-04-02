import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getAnalysis } from "@/lib/db/queries";
import { getDb } from "@/lib/db";
import { judgments } from "@/lib/db/schema";
import { rateLimit } from "@/lib/rate-limit";

/**
 * GET /api/analysis/[id]
 *
 * Fetch a single analysis by ID along with its associated judgment.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Rate limit: 30 requests per minute per IP
  const ip = _request.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`analysis:${ip}`, { maxRequests: 30, windowMs: 60 * 1000 });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Rate limited. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const { id } = await params;

    // Validate UUID format
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: "Invalid analysis ID format" },
        { status: 400 }
      );
    }

    const analysis = await getAnalysis(id);

    if (!analysis) {
      return NextResponse.json(
        { error: "Analysis not found" },
        { status: 404 }
      );
    }

    // Fetch associated judgment with verdicts
    const judgment = await getDb().query.judgments.findFirst({
      where: eq(judgments.analysisId, id),
      with: { verdicts: true },
    });

    return NextResponse.json({ analysis, judgment });
  } catch (error) {
    console.error("Failed to fetch analysis:", error);
    return NextResponse.json(
      { error: "Failed to fetch analysis" },
      { status: 500 }
    );
  }
}
