import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { MapReplyClient } from "@/components/mapReply/MapReplyClient";

/**
 * The map reply tool.
 *
 * Gated on the public half of the map-reply flag: the page 404s while the
 * feature is off rather than advertising a tool whose route would refuse it.
 * The server half, `ENABLE_JEV_MAP_REPLY`, gates `POST /api/map-reply`
 * separately, because turning the live lane on is a data-sharing decision and
 * should not be made by rendering a page. If the page is on and the route is
 * off, a submit comes back with the "switched off on this deployment" copy.
 *
 * Deliberately out of the sitemap and marked noindex while it is flagged.
 * Its thread lane is not yet folded into the one paste flow at /analyze
 * (docs/reviews/2026-09-29-paste-flow.md); until it is, it keeps this page.
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
    <AppShell layout="reading">
      <div className="mx-auto w-full max-w-3xl space-y-8 px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <header>
          <h1 className="font-serif text-[2.375rem] leading-[1.1] text-[var(--text-heading)] sm:text-5xl">
            Reply with the map
          </h1>
          <p className="mt-4 max-w-[36rem] font-serif text-xl leading-[1.5] text-[var(--text-secondary)]">
            Paste an argument you are in. Argumend finds the map it belongs to and shows what
            the thread is actually arguing about, which of the map&rsquo;s cruxes it reached,
            and the strongest evidence on each side.
          </p>
          <p className="mt-3 max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-[var(--text-muted)]">
            It never says who is right, and it describes turns, not the people who took them.
            Every sentence is counted from the thread or copied from the map; the model&rsquo;s
            numbers are under &ldquo;How this was read&rdquo;.
          </p>
        </header>

        <MapReplyClient />
      </div>
    </AppShell>
  );
}
