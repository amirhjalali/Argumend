import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { fallacies } from "@/data/fallacies";
import { fallacyFamilyOrder, fallacyFamilies, getFallacyIcon, groupFallaciesByFamily } from "@/lib/fallacyMeta";
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

  // Catalog numbers reflect canonical order, independent of family grouping,
  // so "No. 14" always means the same fallacy regardless of layout.
  const numberBySlug = new Map(fallacies.map((f, i) => [f.slug, i + 1]));
  const groups = groupFallaciesByFamily(fallacies);

  return (
    <AppShell>
      <JsonLd data={jsonLd} />
      <div className="mx-auto max-w-4xl px-4 md:px-8 py-6 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Fallacies" },
          ]}
        />

        <p className="text-xs font-medium uppercase tracking-widest text-muted dark:text-stone-400 mb-4">
          Field Guide
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary dark:text-stone-200 mb-6 leading-[1.08]">
          Logical Fallacies
        </h1>
        <p className="text-lg text-secondary dark:text-stone-400 leading-relaxed max-w-2xl mb-4">
          A logical fallacy is a flaw in reasoning that makes an argument
          unsound — even when it sounds persuasive. The conclusion might still
          be true, but the path used to reach it doesn&apos;t hold up.
        </p>
        <p className="text-base text-secondary dark:text-stone-400 leading-relaxed max-w-2xl mb-8">
          Below are {fallacies.length} of the most common fallacies you&apos;ll
          encounter in public debate, sorted into {groups.length} families by
          the kind of error they make. Each entry explains what the fallacy
          is, gives a concrete example, shows why it misleads, and offers a
          way to respond. For the broader methodology, see our{" "}
          <Link href="/concepts/fallacies" className="text-deep dark:text-[#9bc7c3] link-underline font-medium">
            concept overview
          </Link>{" "}
          and the{" "}
          <Link href="/guides/argument-audit" className="text-deep dark:text-[#9bc7c3] link-underline font-medium">
            argument audit guide
          </Link>
          .
        </p>

        {/* At-a-glance family index — doubles as a jump-to-section nav */}
        <nav aria-label="Fallacy families" className="flex flex-wrap gap-2 mb-14">
          {fallacyFamilyOrder.map((id) => {
            const family = fallacyFamilies[id];
            const count = groups.find((g) => g.family.id === id)?.items.length ?? 0;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`inline-flex min-h-10 items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${family.chip}`}
              >
                <span className="font-serif text-[13px] opacity-70">{family.numeral}</span>
                {family.label}
                <span className="opacity-60 tabular-nums">{count}</span>
              </a>
            );
          })}
        </nav>

        {groups.map(({ family, items }) => (
          <section key={family.id} id={family.id} className="mb-14 scroll-mt-20">
            <div className="flex items-baseline gap-3 mb-2">
              <span className={`font-serif text-2xl ${family.iconText}`}>{family.numeral}.</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-primary dark:text-stone-200">{family.label}</h2>
            </div>
            <p className="text-secondary dark:text-stone-400 leading-relaxed max-w-2xl mb-6">{family.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {items.map((fallacy) => {
                const Icon = getFallacyIcon(fallacy.slug);
                const num = numberBySlug.get(fallacy.slug) ?? 0;
                return (
                  <Link
                    key={fallacy.slug}
                    href={`/fallacies/${fallacy.slug}`}
                    className={`group relative bg-white/80 dark:bg-[var(--bg-card)]/80 rounded-xl p-6 border border-stone-200/60 dark:border-[var(--border-default)] shadow-card hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200 animate-card-fade-in ${family.hoverBorder}`}
                    style={{ animationDelay: `${((num - 1) % 10) * 50}ms` }}
                  >
                    <span className="absolute top-4 right-5 text-[11px] font-mono tabular-nums text-muted/70 dark:text-stone-500/70">
                      No. {String(num).padStart(2, "0")}
                    </span>
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full ${family.iconBg}`}
                      >
                        <Icon className={`h-5 w-5 ${family.iconText}`} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 min-w-0 pr-8">
                        <h3 className="font-serif text-xl text-primary dark:text-stone-200 mb-1 group-hover:text-deep dark:group-hover:text-[#9bc7c3] transition-colors">
                          {fallacy.name}
                        </h3>
                        <p className="text-primary dark:text-stone-200 leading-relaxed text-sm mb-3">
                          {fallacy.shortDefinition}
                        </p>
                        <span className="inline-flex items-center gap-1 text-deep dark:text-[#9bc7c3] text-sm font-medium">
                          Learn more
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <div className="mt-10 bg-white/80 dark:bg-[var(--bg-card)]/80 rounded-xl p-6 border border-[#e8e0d4] dark:border-[var(--border-divider)]">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-5 w-5 text-deep dark:text-[#9bc7c3]" strokeWidth={1.8} />
            <h2 className="font-serif text-xl text-primary dark:text-stone-200">
              A note on spotting fallacies
            </h2>
          </div>
          <p className="text-primary dark:text-stone-200 leading-relaxed mb-3">
            Identifying a fallacy doesn&apos;t prove a conclusion is false — a
            sloppy argument can still land on a true claim. The point is to
            separate genuine evidence from rhetorical decoration, so you can
            judge a position on its strongest version rather than its weakest.
          </p>
          <p className="text-primary dark:text-stone-200 leading-relaxed">
            That is why the most reliable antidote to most fallacies is{" "}
            <Link href="/concepts/steel-manning" className="text-deep dark:text-[#9bc7c3] link-underline font-medium">
              steel-manning
            </Link>
            : stating the opposing argument in its strongest form before
            responding to it.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200/60 dark:border-[var(--border-default)]">
          <p className="text-sm text-secondary dark:text-stone-400">
            Recognizing bad reasoning — in others and in yourself — is the first
            step toward productive disagreement.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
