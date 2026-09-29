import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { HomeLanding } from "@/components/home/HomeLanding";
import {
  ORGANIZATION_ID,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/site";

// ---------------------------------------------------------------------------
// Static metadata. The title and description say what the page's h1 and lede
// say, in the same voice.
// ---------------------------------------------------------------------------

const TITLE = "ARGUMEND — Find what the argument actually turns on";
const DESCRIPTION =
  "Most arguments are not about what they seem. Argumend maps the few questions a fight really turns on, and what would change each side's mind. It never names a winner.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://argumend.org",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ARGUMEND — Disagree better.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  alternates: {
    canonical: "https://argumend.org",
  },
};

/**
 * Home is a server component inside the site shell, like every other page.
 * The React Flow canvas that used to live here (`/?topic=…`) is gone: that
 * URL now redirects to the map's page or diagram (proxy.ts, legacyHomeTopicPath).
 */
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
      <AppShell layout="reading">
        <HomeLanding />
      </AppShell>
    </>
  );
}
