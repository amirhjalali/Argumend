import { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { CollectionIndex, type CollectionGroup } from "@/components/learn/CollectionIndex";
import { Section } from "@/components/ui/Section";
import { fallacies } from "@/data/fallacies";
import { groupFallaciesByFamily } from "@/lib/fallacyMeta";
import { indexCrumbs } from "@/lib/learn/sections";
import { buildGenericOgUrl } from "@/lib/og";

const TITLE = "Logical Fallacies: A Field Guide to Bad Arguments";
const DESCRIPTION =
  "A clear, balanced guide to the most common logical fallacies — ad hominem, straw man, false dilemma, slippery slope, and more. Learn how each one misleads and how to counter it.";
const URL = "https://argumend.org/fallacies";
const OG_IMAGE = buildGenericOgUrl({
  title: "Logical Fallacies",
  subtitle: "A Field Guide to Bad Arguments",
});

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
    siteName: "ARGUMEND",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Logical Fallacies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const PROSE_LINK =
  "text-deep underline decoration-deep/30 underline-offset-2 transition-colors hover:text-deep-dark dark:text-accent-text";

export default function FallaciesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Logical Fallacies",
    description: DESCRIPTION,
    url: URL,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: fallacies.length,
      itemListElement: fallacies.map((fallacy, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: fallacy.name,
        url: `${URL}/${fallacy.slug}`,
      })),
    },
  };

  // Four families by the kind of error; each family is a section, and its
  // chip jumps there. Families carry no colour: a chip is a place, not a code.
  const families = groupFallaciesByFamily(fallacies);
  const groups: CollectionGroup[] = families.map(({ family, items }) => ({
    id: family.id,
    title: family.label,
    lede: family.description,
    items: items.map((fallacy) => ({
      href: `/fallacies/${fallacy.slug}`,
      title: fallacy.name,
      description: fallacy.shortDefinition,
    })),
  }));

  return (
    <CollectionIndex
      crumbs={indexCrumbs("Fallacies")}
      eyebrow="Learn"
      title="Logical fallacies"
      lede="Common ways an argument goes wrong, sorted by the kind of error. Each one has an example, why it misleads, and a way to answer it."
      meta={`${fallacies.length} fallacies in ${families.length} families`}
      chips={families.map(({ family, items }) => ({
        href: `#${family.id}`,
        label: family.label,
        count: items.length,
      }))}
      chipsLabel="Fallacy families"
      chrome={<JsonLd data={jsonLd} />}
      groups={groups}
    >
      <Section id="spotting" title="A note on spotting fallacies" className="mt-14">
        <div className="max-w-[40rem] space-y-4 font-serif text-lg leading-relaxed text-primary">
          <p>
            Naming a fallacy does not prove a conclusion false: a sloppy argument can still land on
            a true claim. The point is to separate evidence from decoration, so you can judge a
            position on its strongest version rather than its weakest.
          </p>
          <p>
            That is why the most reliable answer to most fallacies is{" "}
            <Link href="/concepts/steel-manning" className={PROSE_LINK}>
              steel-manning
            </Link>
            : stating the other side&rsquo;s argument in its strongest form before you respond. For
            practice, try the{" "}
            <Link href="/guides/argument-audit" className={PROSE_LINK}>
              argument audit guide
            </Link>
            .
          </p>
        </div>
      </Section>
    </CollectionIndex>
  );
}
