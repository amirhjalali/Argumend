/**
 * Reusable JSON-LD structured data component.
 *
 * Renders a <script type="application/ld+json"> tag with the provided data
 * serialized as JSON. Keeps the pattern DRY across layout and page files.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
