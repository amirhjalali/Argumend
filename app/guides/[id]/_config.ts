import { buildGenericOgUrl } from "@/lib/og";

export function getGuideFallbackOgUrl(title: string): string {
  return buildGenericOgUrl({
    title,
    subtitle: "Critical Thinking Guide",
  });
}
