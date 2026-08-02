import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { JsonLd } from "@/components/JsonLd";
import { GAPageView } from "@/components/GAPageView";
import { TOPIC_COUNT_LABEL as L } from "@/data/topicIndex";
import {
  ORGANIZATION_ID,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WEB_APPLICATION_ID,
  WEBSITE_ID,
} from "@/lib/site";
import "./globals.css";

const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1917" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://argumend.org"),
  title: {
    default: "ARGUMEND — Map Arguments, Not Win Them",
    template: "%s | ARGUMEND",
  },
  description:
    `Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters. ${L} topics analyzed.`,
  keywords: [
    "argument mapping",
    "argument map tool",
    "critical thinking",
    "debate analysis",
    "evidence-based reasoning",
    "controversial topics",
    "steel man arguments",
    "logical fallacies",
    "both sides of the argument",
    "fact check",
    "pros and cons",
    "structured reasoning",
  ],
  authors: [{ name: "ARGUMEND" }],
  creator: "ARGUMEND",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://argumend.org",
    siteName: "ARGUMEND",
    title: "ARGUMEND — Map Arguments, Not Win Them",
    description:
      "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters.",
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
  // Keep rich preview allowances without emitting a generic `robots` meta.
  // Next injects the latter automatically for 404s; defining it here would
  // produce a contradictory duplicate alongside the required `noindex`.
  other: {
    googlebot:
      "max-video-preview:-1, max-image-preview:large, max-snippet:-1",
  },
  alternates: {
    canonical: SITE_URL,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="ARGUMEND: Arguments and Analysis"
          href="/feed.xml"
        />
      </head>
      <body className={`${serif.variable} ${sans.variable} antialiased`}>
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
              `}
            </Script>
          </>
        ) : null}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:flex focus:min-h-11 focus:items-center focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-primary focus:shadow-lg"
        >
          Skip to content
        </a>
        {GA_MEASUREMENT_ID ? (
          <Suspense fallback={null}>
            <GAPageView measurementId={GA_MEASUREMENT_ID} />
          </Suspense>
        ) : null}
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "@id": WEB_APPLICATION_ID,
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            isPartOf: { "@id": WEBSITE_ID },
            provider: { "@id": ORGANIZATION_ID },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: SITE_NAME,
            url: SITE_URL,
            description:
              "Structured argument mapping platform for controversial topics. See both sides, weigh the evidence, find what actually matters.",
            sameAs: [
              "https://github.com/amirhjalali/Argumend",
            ],
            logo: `${SITE_URL}/icon.png`,
            foundingDate: "2024",
            knowsAbout: [
              "argument mapping",
              "critical thinking",
              "evidence-based reasoning",
              "debate analysis",
            ],
          }}
        />
      </body>
    </html>
  );
}
