import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getAnalysis } from "@/lib/db/queries";
import { db } from "@/lib/db";
import { judgments } from "@/lib/db/schema";

/**
 * GET /api/analysis/[id]
 *
 * Fetch a single analysis by ID along with its associated judgment.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const judgment = await db.query.judgments.findFirst({
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
