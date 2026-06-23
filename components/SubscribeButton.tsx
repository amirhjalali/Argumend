"use client";

import { Bell } from "lucide-react";

interface SubscribeButtonProps {
  topicId: string;
}

export function SubscribeButton({ topicId: _topicId }: SubscribeButtonProps) {
  // Auth disabled — no SessionProvider, no login yet.
  return (
    <button
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-stone-100 dark:bg-[#302e2a] text-stone-400 border border-stone-200/60 dark:border-[#3d3a36] opacity-50 cursor-default"
      aria-label="Subscribe (sign in required)"
      disabled
    >
      <Bell className="h-4 w-4" strokeWidth={1.8} />
      {/* Fake "0" subscriber count removed (it implied nobody cares about the
          topic). Whether to remove this disabled control entirely is a founder
          call tied to the auth roadmap — flagged in the UX roadmap, not done here. */}
    </button>
  );
}
