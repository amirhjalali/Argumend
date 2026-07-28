import type { Metadata } from "next";
import { topics, CATEGORY_LABELS } from "@/data/topics";
import type { Verdict } from "@/lib/schemas/topic";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { COMPARISON_PAIRS } from "./comparisonPairs";
import CompareIndexView from "./CompareIndexView";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Compare Topics Side by Side — Argument Comparison",
  description:
    "Compare controversial debates side by side. See the balance and weight of evidence and argument pillars for two topics at once. Pick any two of 109+ analyzed issues.",
  keywords: [
    "compare arguments",
    "debate comparison",
    "side by side analysis",
    "argument mapping",
    "controversial topics",
  ],
  alternates: {
    canonical: "https://argumend.org/topics/compare",
  },
  openGraph: {
    title: "Compare Topics Side by Side — Argumend",
    description:
      "Compare controversial debates side by side. See the balance and weight of evidence and argument pillars for two topics at once.",
    url: "https://argumend.org/topics/compare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Topics Side by Side — Argumend",
    description:
      "Pick any two controversial topics and compare the balance and weight of evidence and argument pillars.",
  },
};

// ---------------------------------------------------------------------------
// Build featured pairs with full data
// ---------------------------------------------------------------------------

function buildFeaturedPairs() {
  return COMPARISON_PAIRS.map(([id1, id2]) => {
    const t1 = topics.find((t) => t.id === id1);
    const t2 = topics.find((t) => t.id === id2);
    if (!t1 || !t2) return null;
    return {
      id1,
      id2,
      title1: t1.title,
      title2: t2.title,
      balance1: t1.balance,
      weight1: t1.weight,
      verdict1: t1.verdict,
      balance2: t2.balance,
      weight2: t2.weight,
      verdict2: t2.verdict,
      status1: t1.status,
      status2: t2.status,
      category1: t1.category,
      category2: t2.category,
      categoryLabel1: CATEGORY_LABELS[t1.category],
      categoryLabel2: CATEGORY_LABELS[t2.category],
    };
  }).filter(Boolean) as Array<{
    id1: string;
    id2: string;
    title1: string;
    title2: string;
    balance1: number;
    weight1: number;
    verdict1: Verdict;
    balance2: number;
    weight2: number;
    verdict2: Verdict;
    status1: string;
    status2: string;
    category1: string;
    category2: string;
    categoryLabel1: string;
    categoryLabel2: string;
  }>;
}

// ---------------------------------------------------------------------------
// Build topic list for the picker
// ---------------------------------------------------------------------------

function buildTopicList() {
  return topics.map((t) => ({
    id: t.id,
    title: t.title,
    balance: t.balance,
    weight: t.weight,
    verdict: t.verdict,
    category: t.category,
    categoryLabel: CATEGORY_LABELS[t.category],
  }));
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function CompareIndexPage() {
  const featuredPairs = buildFeaturedPairs();
  const allTopics = buildTopicList();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Compare Topics Side by Side",
    description:
      "Compare controversial debates side by side with evidence and argument analysis.",
    url: "https://argumend.org/topics/compare",
    isPartOf: {
      "@type": "WebSite",
      name: "ARGUMEND",
      url: "https://argumend.org",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Topics", href: "/topics" },
          { label: "Compare" },
        ]}
      />
      <CompareIndexView featuredPairs={featuredPairs} allTopics={allTopics} />
    </>
  );
}
