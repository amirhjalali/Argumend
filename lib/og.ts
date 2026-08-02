export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
export const OG_TITLE_MAX_CHARACTERS = 96;
export const OG_SUBTITLE_MAX_CHARACTERS = 180;
export const OG_IMAGE_CACHE_CONTROL =
  "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";
export const OG_NOT_FOUND_CACHE_CONTROL =
  "public, max-age=0, s-maxage=300, stale-while-revalidate=3600";
export const DEFAULT_SOCIAL_IMAGE_URL = "https://argumend.org/og.png";
export const DEFAULT_SOCIAL_IMAGE = {
  url: DEFAULT_SOCIAL_IMAGE_URL,
  width: OG_WIDTH,
  height: OG_HEIGHT,
  alt: "ARGUMEND — See both sides. Find the crux.",
} as const;

export function truncateOgText(value: string, maxCharacters: number): string {
  const characters = Array.from(value);
  if (characters.length <= maxCharacters) return value;
  return `${characters.slice(0, Math.max(1, maxCharacters - 1)).join("")}…`;
}

export function buildGenericOgUrl(params: {
  title: string;
  subtitle?: string;
  verdict?: "for" | "against" | "draw";
  score?: number;
}): string {
  const title = truncateOgText(
    params.title.replace(/[\u0000-\u001f\u007f-\u009f]/g, " ").replace(/\s+/g, " ").trim(),
    OG_TITLE_MAX_CHARACTERS,
  );
  const subtitle = params.subtitle
    ? truncateOgText(
        params.subtitle.replace(/[\u0000-\u001f\u007f-\u009f]/g, " ").replace(/\s+/g, " ").trim(),
        OG_SUBTITLE_MAX_CHARACTERS,
      )
    : undefined;
  if (params.score !== undefined && (!Number.isFinite(params.score) || params.score < 0 || params.score > 100)) {
    throw new RangeError("score must be between 0 and 100");
  }

  const query = new URLSearchParams({ title });
  if (subtitle) query.set("subtitle", subtitle);
  if (params.verdict) query.set("verdict", params.verdict);
  if (params.score !== undefined) query.set("score", String(params.score));
  return `https://argumend.org/api/og?${query.toString()}`;
}

export function ogErrorResponse(
  status: 400 | 404 | 414 | 500,
  code: string,
  cacheControl = "no-store",
): Response {
  return Response.json(
    { error: "Unable to generate social image.", code },
    {
      status,
      headers: {
        "Cache-Control": cacheControl,
        "Content-Type": "application/json; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

export function isValidTopicOgId(id: string): boolean {
  return id.length <= 100 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id);
}

export function buildTopicOgUrl(topicId: string): string {
  if (!isValidTopicOgId(topicId)) {
    throw new RangeError("topicId must be a lowercase slug");
  }
  return `https://argumend.org/api/og/${topicId}`;
}
