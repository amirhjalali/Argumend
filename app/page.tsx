import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { TOPIC_COUNT_LABEL as L } from "@/data/topicIndex";
import {
  ORGANIZATION_ID,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/site";

// ---------------------------------------------------------------------------
// Static metadata — exported from a Server Component for SEO
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "ARGUMEND — Map Arguments, Not Win Them",
  description:
    `Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters. Explore ${L} topics analyzed with structured reasoning.`,
  openGraph: {
    title: "ARGUMEND — Map Arguments, Not Win Them",
    description:
      "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters.",
    url: "https://argumend.org",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ARGUMEND — See both sides. Find the crux.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARGUMEND — Map Arguments, Not Win Them",
    description:
      "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: "https://argumend.org",
  },
};

// ---------------------------------------------------------------------------
// Client component — wraps ReactFlowProvider + all interactivity.
// Rendered directly (no Suspense) so SSR produces the full initial HTML
// without depending on RSC streaming, which fails on some runtimes.
// ---------------------------------------------------------------------------

import HomeClient from "@/components/HomeClient";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": WEBSITE_ID,
          name: SITE_NAME,
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          publisher: { "@id": ORGANIZATION_ID },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://argumend.org/topics?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <noscript>
        <div className="p-8 text-center bg-[#f4f1eb] min-h-[100svh] flex items-center justify-center">
          <div>
            <p className="font-serif text-2xl text-primary mb-4">ARGUMEND</p>
            <p className="text-secondary mb-4">JavaScript is required for the interactive argument maps.</p>
            <Link href="/topics" className="text-deep underline">Browse all topics</Link>
          </div>
        </div>
      </noscript>
      <HomeClient />
    </>
  );
}
