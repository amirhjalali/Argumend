import type { Metadata } from "next";
import { concepts } from "@/data/concepts";
import { guides } from "@/data/guides";
import { fallacies } from "@/data/fallacies";
import { articleSummaries } from "@/data/blogIndex";
import { glossaryPageTerms } from "@/data/glossaryPageTerms";
import { leadSentences } from "@/lib/learn/summary";
import { readTime } from "@/lib/learn/readTime";
import { LEARN_HUB_SECTIONS, type LearnHubSectionId } from "@/lib/learn/sections";
import { buildGenericOgUrl } from "@/lib/og";
import { ORGANIZATION_ID, SITE_NAME, SITE_URL, WEBSITE_ID } from "@/lib/site";
import {
  CollectionIndex,
  type CollectionGroup,
  type CollectionItem,
} from "@/components/learn/CollectionIndex";
import { JsonLd } from "@/components/JsonLd";

const TITLE = "How to disagree better";
const LEDE =
  "People who disagree usually share more facts than they think, and the fight turns on a question or two. Learn to find it, starting with the question that matters most: what would change your mind?";
const DESCRIPTION =
  "Argumend's library on disagreeing well: cruxes, steel-manning, evidence, fallacies and a glossary, with guides, essays and lesson plans. Start with what would change your mind.";
const URL = `${SITE_URL}/learn`;
const OG_IMAGE = buildGenericOgUrl({ title: TITLE, subtitle: "Learn" });

export const metadata: Metadata = {
  title: `Learn — ${TITLE}`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: `Learn — ${TITLE}`,
    description: DESCRIPTION,
    url: URL,
    type: "website",
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Learn — ${TITLE}`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/** The essay the hub opens with: the reader's own crux test. */
const START_ESSAY = "what-would-change-your-mind";
const FEATURED_FALLACIES = [
  "ad-hominem",
  "straw-man",
  "false-dilemma",
  "motte-and-bailey",
  "whataboutism",
  "gish-gallop",
];

function essayItem(slug: string): CollectionItem {
  const post = articleSummaries.find((article) => article.slug === slug)!;
  return {
    href: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    meta: `Essay · ${post.readingTime}`,
  };
}

function conceptItem(id: string): CollectionItem {
  const concept = concepts.find((c) => c.id === id)!;
  return {
    href: `/concepts/${concept.id}`,
    title: concept.title,
    description: leadSentences(concept.description),
    meta: `Idea · ${readTime(concept.description, ...concept.keyPoints)}`,
  };
}

function buildGroups(): Record<LearnHubSectionId, Omit<CollectionGroup, "id" | "title">> {
  const recentEssays = [...articleSummaries]
    .filter((post) => post.slug !== START_ESSAY)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 4);

  return {
    start: {
      lede: "Four short pieces. Read them in any order.",
      items: [
        conceptItem("cruxes"),
        {
          href: "/perspectives",
          title: "Perspectives",
          description:
            "A short scroll story about one street fight told five ways: why you are not your ideas, and why that is a relief.",
          meta: "Essay · a scroll story",
        },
        essayItem(START_ESSAY),
        {
          href: "/about#read-a-map",
          title: "How to read a map",
          description:
            "Pick a map, read its cruxes and what would settle each one, and see how it has moved.",
          meta: "About Argumend",
        },
      ],
    },
    ideas: {
      lede: "The ideas every map is built from.",
      items: [
        ...concepts.map((concept) => conceptItem(concept.id)),
        {
          href: "/questions#fact-or-value",
          title: "Fact or value?",
          description:
            "Every contested question asks about a fact, a value, the future or a cause, and each kind is settled by different things.",
          meta: "Questions",
        },
      ],
    },
    guides: {
      lede: "Step-by-step practice, from reading a map to spotting manufactured doubt.",
      items: guides.map((guide) => ({
        href: `/guides/${guide.id}`,
        title: guide.title,
        description: guide.subtitle,
        meta: `Guide · ${guide.readTime}`,
      })),
    },
    fallacies: {
      lede: `${fallacies.length} common ways an argument goes wrong, each with an example and a way to answer it.`,
      items: FEATURED_FALLACIES.map((slug) => {
        const fallacy = fallacies.find((f) => f.slug === slug)!;
        return {
          href: `/fallacies/${fallacy.slug}`,
          title: fallacy.name,
          description: fallacy.shortDefinition,
        };
      }),
      more: { href: "/fallacies", label: `All ${fallacies.length} fallacies` },
    },
    glossary: {
      items: [
        {
          href: "/glossary",
          title: "Glossary",
          description: `${glossaryPageTerms.length} terms from argument mapping and reasoning, from A to Z, each in a sentence or two.`,
          meta: "Reference",
        },
      ],
    },
    why: {
      lede: "The research behind the project, and how the maps are made.",
      items: [
        {
          href: "/research",
          title: "The research behind Argumend",
          description:
            "Why the gap between how much people think they disagree and how much they actually do is the thing to close.",
          meta: "Research · with a reading list",
        },
        {
          href: "/methodology",
          title: "How maps are made",
          description: "How a map weighs its sources and says what the evidence shows, without naming a winner.",
          meta: "Methodology",
        },
      ],
    },
    teachers: {
      items: [
        {
          href: "/for-educators",
          title: "Lesson plans for the classroom",
          description:
            "Seven lessons that teach students to find the crux, steel-man the other side and say what would change their mind.",
          meta: "For teachers",
        },
        {
          href: "/for-educators#printable-worksheets",
          title: "Printable worksheets",
          description: "An argument-map template, a steel-man challenge, an evidence rubric and a crux finder.",
          meta: "For teachers · print-ready",
        },
      ],
    },
    essays: {
      lede: "Longer pieces: case studies, how-tos and notes on how Argumend works.",
      items: recentEssays.map((post) => essayItem(post.slug)),
      more: { href: "/blog", label: "All essays" },
    },
  };
}

export default function LearnPage() {
  const content = buildGroups();
  const groups: CollectionGroup[] = LEARN_HUB_SECTIONS.map((section) => ({
    id: section.id,
    title: section.title,
    ...content[section.id],
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
    isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID, name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME, url: SITE_URL },
    hasPart: groups.map((group) => ({
      "@type": "ItemList",
      name: group.title,
      url: `${URL}#${group.id}`,
      numberOfItems: group.items.length,
      itemListElement: group.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `${SITE_URL}${item.href}`,
      })),
    })),
  };

  return (
    <CollectionIndex
      crumbs={[{ label: "Home", href: "/" }, { label: "Learn" }]}
      eyebrow="Learn"
      title={TITLE}
      lede={LEDE}
      chips={LEARN_HUB_SECTIONS.filter((section) => section.chip).map((section) => ({
        href: `#${section.id}`,
        label: section.title,
      }))}
      chipsLabel="Learn sections"
      chrome={<JsonLd data={jsonLd} />}
      groups={groups}
    />
  );
}
