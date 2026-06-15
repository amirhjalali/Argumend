import { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, BookOpen } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { fallacies } from "@/data/fallacies";

const TITLE = "Logical Fallacies: A Field Guide to Bad Arguments";
const DESCRIPTION =
  "A clear, balanced guide to the most common logical fallacies — ad hominem, straw man, false dilemma, slippery slope, and more. Learn how each one misleads and how to counter it.";
const URL = "https://argumend.org/fallacies";
const OG_IMAGE = `https://argumend.org/api/og?title=${encodeURIComponent("Logical Fallacies")}&subtitle=${encodeURIComponent("A Field Guide to Bad Arguments")}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
    siteName: "Argumend",
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

  return (
    <AppShell>
      <JsonLd data={jsonLd} />
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Fallacies" },
          ]}
        />

        <p className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-4">
          Field Guide
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
          Logical Fallacies
        </h1>
        <p className="text-lg text-secondary leading-relaxed max-w-2xl mb-4">
          A logical fallacy is a flaw in reasoning that makes an argument
          unsound — even when it sounds persuasive. The conclusion might still
          be true, but the path used to reach it doesn&apos;t hold up.
        </p>
        <p className="text-base text-secondary leading-relaxed max-w-2xl mb-10">
          Below are {fallacies.length} of the most common fallacies you&apos;ll
          encounter in public debate. Each entry explains what the fallacy is,
          gives a concrete example, shows why it misleads, and offers a way to
          respond. For the broader methodology, see our{" "}
          <Link href="/concepts/fallacies" className="text-deep link-underline font-medium">
            concept overview
          </Link>{" "}
          and the{" "}
          <Link href="/guides/argument-audit" className="text-deep link-underline font-medium">
            argument audit guide
          </Link>
          .
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fallacies.map((fallacy, index) => (
            <Link
              key={fallacy.slug}
              href={`/fallacies/${fallacy.slug}`}
              className="group bg-white/80 dark:bg-[#252420]/80 rounded-xl p-6 border border-stone-200/60 dark:border-[var(--border-default)] shadow-card hover:border-[#4f7b77]/30 hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200 animate-card-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-gradient-to-br from-[#f5f1ea] to-[#ebe6de] dark:from-[#302e2a] dark:to-[#252420] rounded-xl border border-[#e8e0d4] dark:border-[#3d3a36] shadow-sm">
                  <AlertTriangle className="h-6 w-6 text-deep" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-serif text-xl text-primary mb-1 group-hover:text-deep transition-colors">
                    {fallacy.name}
                  </h2>
                  <p className="text-primary leading-relaxed text-sm mb-3">
                    {fallacy.shortDefinition}
                  </p>
                  <span className="inline-flex items-center gap-1 text-deep text-sm font-medium">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-white/80 dark:bg-[#252420]/80 rounded-xl p-6 border border-[#e8e0d4] dark:border-[#3d3a36]">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-5 w-5 text-deep" strokeWidth={1.8} />
            <h2 className="font-serif text-xl text-primary">
              A note on spotting fallacies
            </h2>
          </div>
          <p className="text-primary leading-relaxed mb-3">
            Identifying a fallacy doesn&apos;t prove a conclusion is false — a
            sloppy argument can still land on a true claim. The point is to
            separate genuine evidence from rhetorical decoration, so you can
            judge a position on its strongest version rather than its weakest.
          </p>
          <p className="text-primary leading-relaxed">
            That is why the most reliable antidote to most fallacies is{" "}
            <Link href="/concepts/steel-manning" className="text-deep link-underline font-medium">
              steel-manning
            </Link>
            : stating the opposing argument in its strongest form before
            responding to it.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200/60 dark:border-[var(--border-default)]">
          <p className="text-sm text-secondary">
            Recognizing bad reasoning — in others and in yourself — is the first
            step toward productive disagreement.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
