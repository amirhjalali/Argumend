import type { CollectionChip, CollectionItem } from "@/components/learn/CollectionIndex";
import type { ArticleSummary } from "@/data/blogIndex";
import { getArticleSummaryCategoryFacets } from "@/data/blogIndex";
import { getGeneratedMedia } from "@/data/generatedMedia";
import { BLOG_CATEGORY_CHIPS } from "./_config";

/**
 * One essay as a Learn index row: title, one line, "Category · N min read",
 * and the hero thumbnail where there is one. /blog and its category and tag
 * pages all list essays this way, so moving between them changes the list,
 * not the look.
 */
export function essayRow(article: ArticleSummary): CollectionItem {
  const hero = getGeneratedMedia("blog", article.slug)?.hero;
  return {
    href: `/blog/${article.slug}`,
    title: article.title,
    description: article.description,
    meta: `${article.category} · ${article.readingTime}`,
    image: hero ? { src: hero.src, alt: hero.alt, width: hero.width, height: hero.height } : undefined,
  };
}

/** The largest categories as chips, the current one (if any) marked. */
export function essayCategoryChips(currentSlug?: string): CollectionChip[] {
  return getArticleSummaryCategoryFacets()
    .slice(0, BLOG_CATEGORY_CHIPS)
    .map((category) => ({
      href: `/blog/category/${category.slug}`,
      label: category.label,
      count: category.count,
      current: category.slug === currentSlug,
    }));
}
