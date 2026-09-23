import { Fragment, type ReactNode } from "react";

/**
 * The opening paragraph of the composed reply, lifted out of `markdown` so the
 * page can lead with it.
 *
 * The page writes no sentence of its own here. `lib/mapReply/render.ts` builds
 * the markdown as: title and claim, a blank line, then the opening paragraph —
 * where the thread is arguing, what could not be placed, who made no
 * argument, and whether people are talking past each other. That paragraph is
 * the part a reader in the argument most needs, so it is shown first, exactly
 * as it will be copied. If the markdown ever stops having that shape, this
 * returns null and the page simply starts with the numbers.
 */
export function replyLede(markdown: string): string | null {
  const paragraphs = markdown.split(/\n{2,}/).map((part) => part.trim());
  const opening = paragraphs[1];
  if (!opening || opening.startsWith("**") || opening.startsWith("- ")) return null;
  return opening;
}

/** Renders `**bold**` spans; everything else is plain text. */
export function renderInlineBold(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index} className="font-semibold text-[var(--text-heading)]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
