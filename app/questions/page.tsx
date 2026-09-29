import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  topicSummaries as topics,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
} from "@/data/topicIndex";
import type { TopicCategory } from "@/lib/schemas/topic";
import { getAllQuestionVariations, getPrimaryQuestionVariations } from "@/lib/questions";
import { classifyQuestion, questionKinds, questionKindOrder } from "@/lib/questionMeta";
import { buildPageHref, paginate, parsePageParam, type SearchParamValue } from "@/lib/collectionPagination";
import { indexCrumbs } from "@/lib/learn/sections";
import { buildGenericOgUrl } from "@/lib/og";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  COLLECTION_PAGE_SIZE,
  CollectionIndex,
  type CollectionChip,
  type CollectionItem,
} from "@/components/learn/CollectionIndex";
import { CollectionPagination } from "@/components/CollectionPagination";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui/Section";
import { QuestionsSearch } from "./QuestionsSearch";
import { mapDisplayTitle } from "@/lib/mapNaming";

// ---------------------------------------------------------------------------
// One row per map: its primary question. The other phrasings are listed on
// that question's page ("Also asked as") and are found by search.
// ---------------------------------------------------------------------------

const primaries = getPrimaryQuestionVariations(topics);
const topicById = new Map(topics.map((topic) => [topic.id, topic]));

const TITLE = "Questions, and what would settle them";
const DESCRIPTION = `${primaries.length} contested questions, one per map. Each page says whether it is a question of fact or of value, what both sides already agree on, and what the disagreement turns on.`;
const SOCIAL_IMAGE = buildGenericOgUrl({ title: "Questions", subtitle: "Fact or value? And what would settle it" });

function parseCategory(value: SearchParamValue): TopicCategory | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  return CATEGORY_ORDER.find((category) => category === candidate);
}

function filterParams(category?: TopicCategory): URLSearchParams {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  return params;
}

type PageProps = {
  searchParams: Promise<Record<string, SearchParamValue>>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const query = await searchParams;
  const category = parseCategory(query.category);
  const page = parsePageParam(query.page);
  const canonical = `${SITE_URL}${buildPageHref("/questions", page, filterParams(category))}`;
  const title = category ? `${CATEGORY_LABELS[category]} questions` : TITLE;
  return {
    title: page > 1 ? `${title} — Page ${page}` : title,
    description: DESCRIPTION,
    alternates: { canonical },
    openGraph: {
      title,
      description: DESCRIPTION,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Questions on Argumend" }],
    },
    twitter: { card: "summary_large_image", title, description: DESCRIPTION, images: [SOCIAL_IMAGE] },
  };
}

export default async function QuestionsIndexPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const category = parseCategory(query.category);
  const requestedPage = parsePageParam(query.page);

  const ordered = CATEGORY_ORDER.flatMap((cat) =>
    primaries.filter((v) => topicById.get(v.topicId)?.category === cat),
  );
  const filtered = category
    ? ordered.filter((v) => topicById.get(v.topicId)?.category === category)
    : ordered;
  const pagination = paginate(filtered, requestedPage, COLLECTION_PAGE_SIZE);
  if (pagination.isOutOfRange) notFound();

  const chips: CollectionChip[] = [
    { href: "/questions", label: "All", count: primaries.length, current: !category },
    ...CATEGORY_ORDER.map((cat) => ({
      href: `/questions?category=${cat}`,
      label: CATEGORY_LABELS[cat],
      count: primaries.filter((v) => topicById.get(v.topicId)?.category === cat).length,
      current: category === cat,
    })),
  ];

  const items: CollectionItem[] = pagination.items.map((v) => {
    const topic = topicById.get(v.topicId);
    return {
      href: `/questions/${v.slug}`,
      title: v.question,
      meta: [classifyQuestion(v.question).label, topic && mapDisplayTitle(topic)].filter(Boolean).join(" · "),
    };
  });

  const searchable = getAllQuestionVariations(topics).map((v) => ({
    slug: v.slug,
    question: v.question,
    topicTitle: (() => {
      const topic = topicById.get(v.topicId);
      return topic ? mapDisplayTitle(topic) : "";
    })(),
    topicId: v.topicId,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${buildPageHref("/questions", pagination.page, filterParams(category))}`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: pagination.items.length,
      itemListElement: pagination.items.map((v, index) => ({
        "@type": "ListItem",
        position: pagination.startIndex + index + 1,
        name: v.question,
        url: `${SITE_URL}/questions/${v.slug}`,
      })),
    },
  };

  return (
    <CollectionIndex
      crumbs={indexCrumbs("Questions")}
      eyebrow="Learn"
      title="Questions"
      lede="One page per map, in the words people search with. Each says whether it is a question of fact or of value, and what would settle it."
      chips={chips}
      chipsLabel="Question categories"
      chrome={<JsonLd data={jsonLd} />}
      intro={<QuestionsSearch questions={searchable} />}
      groups={[
        { id: "questions", items },
      ]}
    >
      <p className="mt-6 font-sans text-sm text-muted" role="status">
        Showing {pagination.startIndex + 1}&ndash;{pagination.endIndex} of {pagination.total} questions
      </p>
      <CollectionPagination
        basePath="/questions"
        currentPage={pagination.page}
        pageCount={pagination.pageCount}
        params={filterParams(category)}
        label="Questions"
      />

      <Section
        id="fact-or-value"
        title="Fact or value?"
        lede="Every question is marked by the kind of answer it can have. Knowing which kind you are arguing about is half of finding the crux."
        className="mt-14"
      >
        <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {questionKindOrder.map((id) => {
            const kind = questionKinds[id];
            return (
              <div key={id}>
                <dt className="font-serif text-lg text-primary">
                  {kind.label} <span className="text-muted">&middot; {kind.plain.replace(/\.$/, "").toLowerCase()}</span>
                </dt>
                <dd className="mt-1 font-sans text-sm leading-relaxed text-secondary">{kind.description}</dd>
              </div>
            );
          })}
        </dl>
      </Section>
    </CollectionIndex>
  );
}
