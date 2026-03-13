import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  saveDebate,
  saveDebateRound,
  updateDebateStatus,
} from "@/lib/db/queries";

interface CreateRequest {
  action: "create";
  topicId?: string;
  topicTitle: string;
  forModel: string;
  againstModel: string;
  totalRounds: number;
}

interface SaveRoundRequest {
  action: "saveRound";
  debateId: string;
  roundNumber: number;
  forContent: string;
  againstContent: string;
}

interface UpdateStatusRequest {
  action: "updateStatus";
  debateId: string;
  status: string;
  winner?: string;
}

type PersistRequest = CreateRequest | SaveRoundRequest | UpdateStatusRequest;

export async function POST(req: NextRequest) {
  // Require authentication for persisting debate data
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: PersistRequest = await req.json();

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
