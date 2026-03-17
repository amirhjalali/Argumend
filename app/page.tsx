import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

// ---------------------------------------------------------------------------
// Static metadata — exported from a Server Component for SEO
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "ARGUMEND — Map Arguments, Not Win Them",
  description:
    "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters. Explore 52 topics analyzed with structured reasoning.",
  openGraph: {
    title: "ARGUMEND — Map Arguments, Not Win Them",
    description:
      "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters.",
    url: "https://argumend.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARGUMEND — Map Arguments, Not Win Them",
    description:
      "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters.",
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
          name: "ARGUMEND",
          url: "https://argumend.org",
          description:
            "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters.",
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
        <div className="p-8 text-center bg-[#f4f1eb] min-h-screen flex items-center justify-center">
          <div>
            <h1 className="font-serif text-2xl text-primary mb-4">ARGUMEND</h1>
            <p className="text-secondary mb-4">JavaScript is required for the interactive argument maps.</p>
            <a href="/topics" className="text-deep underline">Browse all topics</a>
          </div>
        </div>
      </noscript>
      <HomeClient />
    </>
  );
}
