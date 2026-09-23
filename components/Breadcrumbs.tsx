import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb trail with Schema.org BreadcrumbList JSON-LD structured data.
 * The last item is rendered as plain text (current page); all others are links.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://argumend.org${item.href}` } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-x-1.5 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              // The separator trails its item instead of leading the next,
              // so when a long last label wraps onto its own line the "/"
              // stays at the end of the line above rather than dangling at
              // the start of the new one.
              <li key={index} className="flex min-h-11 min-w-0 items-center gap-1.5">
                {isLast || !item.href ? (
                  <span className="min-w-0 text-stone-600 dark:text-[var(--text-secondary)]">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-md text-muted transition-colors hover:text-stone-600 dark:text-stone-400 dark:hover:text-stone-300"
                  >
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <span aria-hidden="true" className="text-stone-300 dark:text-[#3d3a36] select-none">/</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
