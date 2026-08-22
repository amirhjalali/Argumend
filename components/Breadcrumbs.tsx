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
        <ol className="flex items-center gap-1.5 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex min-h-11 items-center gap-1.5">
                {index > 0 && (
                  <span className="text-stone-300 dark:text-[#3d3a36] select-none">/</span>
                )}
                {isLast || !item.href ? (
                  <span className="text-stone-600 dark:text-[var(--text-secondary)]">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-md text-muted transition-colors hover:text-stone-600 dark:text-stone-400 dark:hover:text-stone-300"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
