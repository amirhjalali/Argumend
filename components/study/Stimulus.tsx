"use client";

/**
 * The three reading screens. The participant is never told which kind of text
 * they have; the frame does that work: arm (a) is the real topic page as the
 * site renders it (server-rendered, passed in), arm (b) a chat exchange, arm
 * (c) an article. Arms (b) and (c) render data/study/stimuli.ts verbatim.
 *
 * In arm (a), links open in a new tab so that following one does not leave
 * the study, and every disclosure the participant opens is counted
 * (`onOpened`): the page folds most of its content, so how much of it was
 * read is part of what the study measures.
 */
import { useEffect, useRef, type ReactNode } from "react";
import type { ArticleStimulus, ChatbotStimulus, StudyBlock, StudyListItem } from "@/data/study/stimuli";

function ListItem({ item }: { item: StudyListItem }) {
  if (typeof item === "string") return <li>{item}</li>;
  return (
    <li>
      <strong className="font-semibold">{item.lead}</strong> {item.text}
    </li>
  );
}

function Blocks({ blocks, variant }: { blocks: StudyBlock[]; variant: "chat" | "article" }) {
  const heading =
    variant === "chat"
      ? "mt-5 font-sans text-base font-semibold text-primary dark:text-stone-200"
      : "mt-8 font-serif text-2xl leading-snug text-primary dark:text-stone-200";
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "heading":
            return variant === "chat" ? (
              <p key={index} className={heading}>
                {block.text}
              </p>
            ) : (
              <h3 key={index} className={heading}>
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={index} className="mt-3">
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul key={index} className="mt-3 list-disc space-y-2 pl-5">
                {block.items.map((item, i) => (
                  <ListItem key={i} item={item} />
                ))}
              </ul>
            );
          case "numbered":
            return (
              <ol key={index} className="mt-3 list-decimal space-y-2 pl-5">
                {block.items.map((item, i) => (
                  <ListItem key={i} item={item} />
                ))}
              </ol>
            );
        }
      })}
    </>
  );
}

export function ChatbotView({ stimulus }: { stimulus: ChatbotStimulus }) {
  return (
    <div data-study-stimulus="chatbot" className="mx-auto w-full max-w-[44rem] px-4 sm:px-6">
      <div className="rounded-2xl border border-stone-200/70 bg-card p-3 shadow-card sm:p-5 dark:border-divider">
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-md bg-subtle px-4 py-3 font-sans text-[0.9375rem] leading-relaxed text-primary dark:text-stone-200">
            {stimulus.prompt}
          </p>
        </div>
        <div className="mt-4 flex gap-3">
          <span
            aria-hidden="true"
            className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-stone-200 font-sans text-xs font-semibold text-secondary dark:text-stone-400 dark:bg-stone-700"
          >
            AI
          </span>
          <div className="min-w-0 font-sans text-[0.9375rem] leading-relaxed text-primary dark:text-stone-200">
            <Blocks blocks={stimulus.blocks} variant="chat" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArticleView({ stimulus }: { stimulus: ArticleStimulus }) {
  return (
    <article data-study-stimulus="article" className="mx-auto w-full max-w-[44rem] px-4 sm:px-6">
      <p className="label-caps">Explainer</p>
      <h2 className="mt-2 font-serif text-[2rem] leading-[1.15] text-primary dark:text-stone-200 sm:text-[2.5rem]">
        {stimulus.headline}
      </h2>
      <p className="mt-3 font-serif text-xl leading-snug text-secondary dark:text-stone-400">{stimulus.dek}</p>
      <div className="mt-6 border-t border-stone-200/70 pt-2 font-serif text-[1.1875rem] leading-[1.6] text-primary dark:text-stone-200 dark:border-divider">
        <Blocks blocks={stimulus.blocks} variant="article" />
      </div>
    </article>
  );
}

/**
 * The topic page, inside the study. Links open in a new tab; opened
 * disclosures are counted.
 */
export function MapFrame({ children, onOpened }: { children: ReactNode; onOpened: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const onOpenedRef = useRef(onOpened);
  useEffect(() => {
    onOpenedRef.current = onOpened;
  }, [onOpened]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // `toggle` does not bubble; a capturing listener still sees every <details>.
    const onToggle = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLDetailsElement && target.open) onOpenedRef.current();
    };
    node.addEventListener("toggle", onToggle, true);
    return () => node.removeEventListener("toggle", onToggle, true);
  }, []);

  return (
    <div
      ref={ref}
      data-study-stimulus="map"
      onClickCapture={(event) => {
        const anchor = (event.target as HTMLElement).closest("a[href]");
        if (!(anchor instanceof HTMLAnchorElement)) return;
        // In-page anchors (a crux's #hash) stay in place.
        const href = anchor.getAttribute("href") ?? "";
        if (href.startsWith("#")) return;
        event.preventDefault();
        window.open(anchor.href, "_blank", "noopener,noreferrer");
      }}
    >
      {children}
    </div>
  );
}
