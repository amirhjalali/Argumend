import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import {
  saveDebate,
  saveDebateRound,
  updateDebateStatus,
} from "@/lib/db/queries";

const CreateRequestSchema = z.object({
  action: z.literal("create"),
  topicId: z.string().min(1).optional(),
  topicTitle: z.string().min(1).max(500),
  forModel: z.string().min(1).max(50),
  againstModel: z.string().min(1).max(50),
  totalRounds: z.number().int().min(1).max(20),
});

const SaveRoundRequestSchema = z.object({
  action: z.literal("saveRound"),
  debateId: z.string().min(1),
  roundNumber: z.number().int().min(1).max(20),
  forContent: z.string().min(1).max(50000),
  againstContent: z.string().min(1).max(50000),
});

const UpdateStatusRequestSchema = z.object({
  action: z.literal("updateStatus"),
  debateId: z.string().min(1),
  status: z.string().min(1).max(50),
  winner: z.string().max(50).optional(),
});

const PersistRequestSchema = z.discriminatedUnion("action", [
  CreateRequestSchema,
  SaveRoundRequestSchema,
  UpdateStatusRequestSchema,
]);

export async function POST(req: NextRequest) {
  // Require authentication for persisting debate data
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit: 30 requests per hour per IP
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`debate-persist:${ip}`, { maxRequests: 30, windowMs: 60 * 60 * 1000 });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Rate limited. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const raw = await req.json();
    const parseResult = PersistRequestSchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }
    const body = parseResult.data;

    switch (body.action) {
      case "create": {
        const debate = await saveDebate({
          topicId: body.topicId,
          topicTitle: body.topicTitle,
          forModel: body.forModel,
          againstModel: body.againstModel,
          totalRounds: body.totalRounds,
        });
        return NextResponse.json({ id: debate.id });
      }

      case "saveRound": {
        await saveDebateRound({
          debateId: body.debateId,
          roundNumber: body.roundNumber,
          forContent: body.forContent,
          againstContent: body.againstContent,
        });
        return NextResponse.json({ ok: true });
      }

      case "updateStatus": {
        await updateDebateStatus(body.debateId, body.status, body.winner);
        return NextResponse.json({ ok: true });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (e) {
    console.error("Debate persist error:", e);
    return NextResponse.json(
      { error: "Failed to persist debate" },
      { status: 500 }
    );
  }
}
