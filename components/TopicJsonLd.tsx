import type { Topic } from "@/lib/schemas/topic";

interface TopicJsonLdProps {
  topic: Topic;
}

/**
 * Outputs Schema.org DiscussionForumPosting JSON-LD for a topic page.
 *
 * Maps the topic's confidence_score (0-100) to a 1-5 aggregate rating scale:
 *   0-20 -> 1, 21-40 -> 2, 41-60 -> 3, 61-80 -> 4, 81-100 -> 5
 */
export function TopicJsonLd({ topic }: TopicJsonLdProps) {
  // Map 0-100 confidence score to a 1-5 rating
  const ratingValue = Math.max(
    1,
    Math.min(5, Math.ceil(topic.confidence_score / 20))
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    headline: topic.title,
    description: topic.meta_claim,
    url: `https://argumend.org/topics/${topic.id}`,
    author: {
      "@type": "Organization",
      name: "Argumend",
      url: "https://argumend.org",
    },
    publisher: {
      "@type": "Organization",
      name: "Argumend",
      url: "https://argumend.org",
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    about: {
      "@type": "Claim",
      text: topic.meta_claim,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      bestRating: 5,
      worstRating: 1,
      ratingCount: topic.pillars.length,
      reviewAspect: "Evidence confidence",
    },
    ...(topic.imageUrl ? { image: topic.imageUrl } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://argumend.org/topics/${topic.id}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
