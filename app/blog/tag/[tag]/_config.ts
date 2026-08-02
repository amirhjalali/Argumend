import {
  blogTagToSlug,
  getArticleSummaryTags,
} from "@/data/blogIndex";

export const TAG_PAGE_SIZE = 12;

export function getTagsForSlug(slug: string): string[] {
  return getArticleSummaryTags().filter((tag) => blogTagToSlug(tag) === slug);
}
