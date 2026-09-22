import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";
import { MapReplyClient } from "@/components/mapReply/MapReplyClient";

/**
 * The map reply tool.
 *
 * Gated on the public half of the map-reply flag, the same way `/analyze-v2`
 * is gated on `NEXT_PUBLIC_ENABLE_DISAGREEMENT_V2`: the page 404s while the
 * feature is off rather than advertising a tool whose route would refuse it.
 * The server half, `ENABLE_JEV_MAP_REPLY`, gates `POST /api/map-reply`
 * separately, because turning the live lane on is a data-sharing decision and
 * should not be made by rendering a page. If the page is on and the route is
 * off, a submit comes back with the "switched off on this deployment" copy.
 *
 * Deliberately out of the sitemap and marked noindex while it is flagged.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reply with the map",
  description:
    "Paste an argument and get the Argumend map it belongs to: which section the thread is arguing in, which cruxes it reached, and the strongest evidence on each side.",
  robots: { index: false, follow: false },
};

export default function ReplyPage() {
  if (process.env.NEXT_PUBLIC_ENABLE_JEV_MAP_REPLY !== "true") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)]">
      <TopBar />
      <main id="main-content">
        <div className="mx-auto w-full max-w-4xl space-y-10 px-4 py-10 sm:px-6">
          <header className="space-y-4">
            <h1 className="font-serif text-4xl leading-tight text-[var(--text-heading)] sm:text-5xl">
              Reply with the map
            </h1>
            <p className="max-w-prose text-lg leading-relaxed text-[var(--text-secondary)]">
              Paste an argument. Argumend finds the map it belongs to and tells you what you are
              actually arguing about, what each turn was doing, which of that map&rsquo;s cruxes
              the thread touched and which it never reached, and the strongest evidence on each
              side.
            </p>
            <p className="max-w-prose text-lg leading-relaxed text-[var(--text-secondary)]">
              It never says who is right. Every line it produces is either a number from the
              model or a sentence that already exists on the map.
            </p>
          </header>

          <MapReplyClient />
        </div>
      </main>
      <Footer />
    </div>
  );
}
