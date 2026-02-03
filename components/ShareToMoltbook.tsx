"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  ExternalLink,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
} from "lucide-react";
import type { Topic } from "@/types/logic";

interface DebateMessage {
  side: "for" | "against";
  model: string;
  content: string;
  round: number;
}

interface ShareToMoltbookProps {
  topic: Topic;
  messages: DebateMessage[];
  forModel: string;
  againstModel: string;
  onClose?: () => void;
}

type ShareState = "idle" | "previewing" | "sharing" | "success" | "error" | "rate-limited";

export function ShareToMoltbook({
  topic,
  messages,
  forModel,
  againstModel,
  onClose,
}: ShareToMoltbookProps) {
  const [state, setState] = useState<ShareState>("idle");
  const [postUrl, setPostUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cooldownMinutes, setCooldownMinutes] = useState<number | null>(null);

  const formatDebateContent = () => {
    const header = `# AI Debate: ${topic.title}

**Claim:** ${topic.meta_claim}

**Debaters:**
- 🗡️ Proposition: ${forModel}
- 🛡️ Opposition: ${againstModel}

---

`;

    const rounds = messages.reduce(
      (acc, msg) => {
        const roundKey = `round-${msg.round}`;
        if (!acc[roundKey]) acc[roundKey] = [];
        acc[roundKey].push(msg);
        return acc;
      },
      {} as Record<string, DebateMessage[]>
    );

    const roundsContent = Object.entries(rounds)
      .map(([key, msgs]) => {
        const roundNum = key.replace("round-", "");
        const forMsg = msgs.find((m) => m.side === "for");
        const againstMsg = msgs.find((m) => m.side === "against");

        return `## Round ${roundNum}

### 🗡️ ${forModel} (Proposition)

${forMsg?.content || "*No argument*"}

### 🛡️ ${againstModel} (Opposition)

${againstMsg?.content || "*No argument*"}
`;
      })
      .join("\n---\n\n");

    const footer = `

---

*This debate was generated on [Argumend](https://argumend.com) using AI models to explore both sides of the argument.*`;

    return header + roundsContent + footer;
  };

  const handleShare = async () => {
    setState("sharing");
    setError(null);

    try {
      const content = formatDebateContent();

      const response = await fetch("/api/moltbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "post",
          submolt: "argumend",
          title: `[DEBATE] ${topic.title} - ${forModel} vs ${againstModel}`,
          content,
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        setState("rate-limited");
        setCooldownMinutes(data.cooldownMinutes || 30);
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to share debate");
      }

      setPostUrl(data.data?.url || `https://moltbook.com/m/argumend`);
      setState("success");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to share";
      setError(message);
      setState("error");
    }
  };

  const handlePreview = () => {
    setState("previewing");
  };

  const handleBack = () => {
    setState("idle");
    setError(null);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-stone-200/60 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-stone-200/60">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-teal-600" />
          <span className="font-serif font-semibold text-stone-800">
            Share to Moltbook
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-stone-500" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {/* Idle State */}
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-sm text-stone-600 mb-4">
                Share this debate with the Moltbook AI agent community. Your debate
                will be posted to the <span className="font-medium">argumend</span>{" "}
                submolt where other AI agents can discuss and respond.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handlePreview}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  Preview Post
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share Now
                </button>
              </div>
            </motion.div>
          )}

          {/* Previewing State */}
          {state === "previewing" && (
            <motion.div
              key="previewing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-stone-50 rounded-lg p-3 mb-4 max-h-64 overflow-y-auto">
                <pre className="text-xs text-stone-600 whitespace-pre-wrap font-mono">
                  {formatDebateContent()}
                </pre>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share Now
                </button>
              </div>
            </motion.div>
          )}

          {/* Sharing State */}
          {state === "sharing" && (
            <motion.div
              key="sharing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-6"
            >
              <Loader2 className="w-8 h-8 animate-spin text-teal-600 mb-3" />
              <p className="text-sm text-stone-600">Posting to Moltbook...</p>
            </motion.div>
          )}

          {/* Success State */}
          {state === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-4"
            >
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
              <p className="font-serif text-lg text-stone-800 mb-2">
                Shared Successfully!
              </p>
              <p className="text-sm text-stone-600 mb-4">
                Your debate is now live on Moltbook.
              </p>
              {postUrl && (
                <a
                  href={postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                >
                  View on Moltbook
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          )}

          {/* Rate Limited State */}
          {state === "rate-limited" && (
            <motion.div
              key="rate-limited"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-4"
            >
              <Clock className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <p className="font-serif text-lg text-stone-800 mb-2">
                Rate Limited
              </p>
              <p className="text-sm text-stone-600 mb-4">
                Moltbook allows 1 post per 30 minutes. Please wait
                {cooldownMinutes ? ` ${cooldownMinutes} minutes` : ""} before
                posting again.
              </p>
              <button
                onClick={handleBack}
                className="px-4 py-2 text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                Got it
              </button>
            </motion.div>
          )}

          {/* Error State */}
          {state === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Failed to share
                  </p>
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
