"use client";

import { Bell } from "lucide-react";

interface SubscribeButtonProps {
  topicId: string;
}

export function SubscribeButton({ topicId: _topicId }: SubscribeButtonProps) {
  // Auth disabled — no SessionProvider, no login yet.
  return (
    <button
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-stone-100 text-stone-400 border border-stone-200/60 opacity-50 cursor-default"
      aria-label="Subscribe (sign in required)"
      disabled
    >
      <Bell className="h-4 w-4" strokeWidth={1.8} />
      <span className="text-xs font-mono tabular-nums">0</span>
    </button>
  );
}
