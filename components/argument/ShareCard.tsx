/**
 * ShareCard — the one screenshot-native object on the page.
 *
 * Two numbers, one line under them. Sized and styled to survive being
 * screenshotted and dropped into a group chat with no surrounding context,
 * which is how this page actually travels. Palette validated with the dataviz
 * six-checks script (#0f9284 / #a23b3b on parchment; #17a091 / #e66767 on the
 * dark surface). Identity never rests on color alone — each figure carries its
 * own label.
 */

export interface ShareCardProps {
  left: { value: string; label: string };
  right: { value: string; label: string };
  line: string;
  attribution: string;
}

export function ShareCard({ left, right, line, attribution }: ShareCardProps) {
  return (
    <aside
      aria-label="Key comparison"
      className="mt-5 overflow-hidden rounded-lg border border-stone-300 dark:border-[var(--border-divider)] surface-paper"
    >
      <dl className="grid grid-cols-2 divide-x divide-stone-300 dark:divide-[var(--border-divider)]">
        <div className="flex min-w-0 flex-col p-4 sm:p-5">
          <dt className="order-2 mt-2 text-xs leading-snug text-secondary dark:text-stone-300">
            {left.label}
          </dt>
          <dd className="order-1 break-words font-serif text-4xl leading-none text-[#3a6965] sm:text-5xl dark:text-[#6fa39e]">
            {left.value}
          </dd>
        </div>
        <div className="flex min-w-0 flex-col p-4 sm:p-5">
          <dt className="order-2 mt-2 text-xs leading-snug text-secondary dark:text-stone-300">
            {right.label}
          </dt>
          <dd className="order-1 break-words font-serif text-4xl leading-none text-[#3a6965] sm:text-5xl dark:text-[#6fa39e]">
            {right.value}
          </dd>
        </div>
      </dl>
      <div className="border-t border-stone-300 dark:border-[var(--border-divider)] px-4 py-3 sm:px-5">
        <p className="font-serif text-lg leading-snug text-stone-900 dark:text-stone-100">
          {line}
        </p>
        <p className="mt-1 text-[11px] text-muted dark:text-stone-400">
          {attribution}
        </p>
      </div>
    </aside>
  );
}
