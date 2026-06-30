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
      // Escape `<` so a value containing `</script>` can't break out of the
      // JSON-LD block. Defense-in-depth — all current callers pass static data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
