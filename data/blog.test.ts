import { describe, it, expect } from "vitest";
import {
  articles,
  getArticleBySlug,
  getUniqueCategories,
  getUniqueTags,
  getArticlesByCategory,
  getArticlesByTag,
  getRelatedArticles,
  categoryToSlug,
  tagToSlug,
} from "./blog";

describe("blog data integrity", () => {
  it("has at least one article", () => {
    expect(articles.length).toBeGreaterThan(0);
  });

  it("all articles have unique slugs", () => {
    const slugs = articles.map((a) => a.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("all articles have non-empty title", () => {
    articles.forEach((a) => {
      expect(a.title.trim().length).toBeGreaterThan(0);
    });
  });

  it("all articles have non-empty description", () => {
    articles.forEach((a) => {
      expect(a.description.trim().length).toBeGreaterThan(0);
    });
  });

  it("all articles have non-empty content", () => {
    articles.forEach((a) => {
      expect(a.content.trim().length).toBeGreaterThan(0);
    });
  });

  it("all articles have valid publishedAt dates", () => {
    articles.forEach((a) => {
      const date = new Date(a.publishedAt);
      expect(date.toString()).not.toBe("Invalid Date");
    });
  });

  it("all articles have at least 2 tags", () => {
    articles.forEach((a) => {
      expect(a.tags.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("all articles have a non-empty category", () => {
    articles.forEach((a) => {
      expect(a.category.trim().length).toBeGreaterThan(0);
    });
  });

  it("readingTime follows 'X min read' format", () => {
    const pattern = /^\d+ min read$/;
    articles.forEach((a) => {
      expect(a.readingTime).toMatch(pattern);
    });
  });

  it("content is at least 500 characters (real articles, not stubs)", () => {
    articles.forEach((a) => {
      expect(a.content.length).toBeGreaterThanOrEqual(500);
    });
  });

  it("all articles have a non-empty author", () => {
    articles.forEach((a) => {
      expect(a.author.trim().length).toBeGreaterThan(0);
    });
  });

  it("all article slugs follow slug format (lowercase, hyphens, no spaces)", () => {
    const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    articles.forEach((a) => {
      expect(a.slug).toMatch(slugPattern);
    });
  });
});

describe("getArticleBySlug", () => {
  it("returns correct article for existing slug", () => {
    const firstArticle = articles[0];
    const found = getArticleBySlug(firstArticle.slug);
    expect(found).toBeDefined();
    expect(found!.slug).toBe(firstArticle.slug);
    expect(found!.title).toBe(firstArticle.title);
  });

  it("returns undefined for non-existent slug", () => {
    const found = getArticleBySlug("this-slug-does-not-exist-xyz");
    expect(found).toBeUndefined();
  });
});

describe("getUniqueCategories", () => {
  it("returns an array of unique categories", () => {
    const categories = getUniqueCategories();
    expect(categories.length).toBeGreaterThan(0);
    const uniqueCategories = new Set(categories);
    expect(uniqueCategories.size).toBe(categories.length);
  });

  it("every returned category exists in at least one article", () => {
    const categories = getUniqueCategories();
    categories.forEach((cat) => {
      const matching = articles.filter((a) => a.category === cat);
      expect(matching.length).toBeGreaterThan(0);
    });
  });
});

describe("getUniqueTags", () => {
  it("returns an array of unique tags", () => {
    const tags = getUniqueTags();
    expect(tags.length).toBeGreaterThan(0);
    const uniqueTags = new Set(tags);
    expect(uniqueTags.size).toBe(tags.length);
  });
});

describe("getArticlesByCategory", () => {
  it("returns articles matching the given category", () => {
    const categories = getUniqueCategories();
    const cat = categories[0];
    const results = getArticlesByCategory(cat);
    expect(results.length).toBeGreaterThan(0);
    results.forEach((a) => {
      expect(a.category).toBe(cat);
    });
  });

  it("returns empty array for non-existent category", () => {
    const results = getArticlesByCategory("Nonexistent Category XYZ");
    expect(results).toEqual([]);
  });
});

describe("getArticlesByTag", () => {
  it("returns articles matching the given tag", () => {
    const tags = getUniqueTags();
    const tag = tags[0];
    const results = getArticlesByTag(tag);
    expect(results.length).toBeGreaterThan(0);
    results.forEach((a) => {
      expect(a.tags).toContain(tag);
    });
  });

  it("returns empty array for non-existent tag", () => {
    const results = getArticlesByTag("nonexistent-tag-xyz-999");
    expect(results).toEqual([]);
  });
});

describe("getRelatedArticles", () => {
  it("returns related articles for a valid slug", () => {
    const firstArticle = articles[0];
    const related = getRelatedArticles(firstArticle.slug);
    expect(related.length).toBeGreaterThan(0);
  });

  it("does not include the current article in results", () => {
    const firstArticle = articles[0];
    const related = getRelatedArticles(firstArticle.slug);
    const slugs = related.map((a) => a.slug);
    expect(slugs).not.toContain(firstArticle.slug);
  });

  it("respects the count parameter", () => {
    const firstArticle = articles[0];
    const related = getRelatedArticles(firstArticle.slug, 2);
    expect(related.length).toBeLessThanOrEqual(2);
  });

  it("returns fallback articles for non-existent slug", () => {
    const related = getRelatedArticles("nonexistent-slug-xyz");
    expect(related.length).toBeGreaterThan(0);
  });
});

describe("categoryToSlug", () => {
  it("converts category name to slug format", () => {
    expect(categoryToSlug("Critical Thinking")).toBe("critical-thinking");
  });

  it("handles ampersands", () => {
    expect(categoryToSlug("Logic & Reasoning")).toBe("logic-reasoning");
  });
});

describe("tagToSlug", () => {
  it("converts tag to slug format", () => {
    expect(tagToSlug("critical thinking")).toBe("critical-thinking");
  });

  it("lowercases the tag", () => {
    expect(tagToSlug("Steel Man Argument")).toBe("steel-man-argument");
  });
});
