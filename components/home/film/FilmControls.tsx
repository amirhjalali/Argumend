"use client";

import { RotateCcw } from "lucide-react";
import {
  FILM_REPLAY_EVENT,
  FILM_SKIP_EVENT,
} from "@/components/home/film/filmPaths";

const QUIET =
  "inline-flex min-h-11 items-center gap-2 font-sans text-sm text-muted underline decoration-divider underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:text-stone-400 dark:hover:text-stone-200";

/** Shown to a returning visitor in place of the scroll cue. */
export function FilmReplayButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(FILM_REPLAY_EVENT))}
      className={`${QUIET} ${className ?? ""}`}
    >
      <RotateCcw className="h-4 w-4" aria-hidden="true" />
      Replay the intro
    </button>
  );
}

/** Jumps past the film and remembers that this visitor has had it. */
export function FilmSkipLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={() => window.dispatchEvent(new Event(FILM_SKIP_EVENT))}
      className={`${QUIET} ${className ?? ""}`}
    >
      Skip the intro
    </a>
  );
}
