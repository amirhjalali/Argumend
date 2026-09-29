import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { FeaturedTopicHero } from "@/components/FeaturedTopicHero";
import { HomePasteBox } from "@/components/home/HomePasteBox";
import { TOPIC_COUNT } from "@/data/topicIndex";
import {
  HOME_EVIDENCE_HREF,
  HOME_FLAGSHIP_HREF,
  HOME_PASTE_HREF,
  loadHomeCrux,
  loadHomeMaps,
  numberWord,
  type HomeMap,
} from "@/components/home/homeModel";

/**
 * Home: one argument in four beats, on one left edge, separated by the same
 * hairline.
 *
 *  1. The claim: most arguments are not about what they seem. One line of
 *     public evidence, one rust button to a flagship map, one quiet link to
 *     the paste tool.
 *  2. The proof: crux #1 of that same map, worked through.
 *  3. The breadth: the three flagship maps as the questions they turn on.
 *  4. Your own argument: the paste box.
 *
 * A server component: the crux and the map rows are computed from the maps'
 * own graphs at build time. Only the paste box ships client JS.
 */
export function HomeLanding() {
  const crux = loadHomeCrux();
  const maps = loadHomeMaps(new Set(crux ? [crux.claimId] : []));

  return (
    <>
      <HomeHero />
      {crux ? <FeaturedTopicHero crux={crux} href={HOME_FLAGSHIP_HREF} /> : null}
      <HomeMaps maps={maps} />
      <HomePasteBox />
    </>
  );
}

const PRIMARY_BUTTON =
  "inline-flex min-h-12 items-center gap-2 rounded-lg bg-gradient-to-r from-rust-600 to-rust-700 px-6 py-3 font-sans text-[0.9375rem] font-semibold text-white shadow-sm transition-colors duration-200 hover:from-rust-700 hover:to-rust-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const TEXT_ACTION =
  "inline-flex min-h-11 items-center font-sans text-sm font-medium text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40";

function HomeHero() {
  return (
    <section aria-labelledby="home-heading" className="px-4 md:px-8">
      <div className="mx-auto max-w-5xl pb-10 pt-7 md:pb-20 md:pt-16">
        {/* The tagline. The header carries it from 421px up; a phone header
            has no room, so it opens the page instead. */}
        <p className="label-caps mb-2 sm:hidden">Disagree better.</p>
        <h1
          id="home-heading"
          className="max-w-[16ch] text-balance font-serif text-[2.5rem] lg:max-w-[22ch] font-normal leading-[1.04] tracking-[-0.02em] text-primary dark:text-stone-200 sm:text-[3.25rem] lg:text-[3.75rem]"
        >
          Find what the argument actually turns on.
        </h1>

        {/* Phone order: claim, evidence, doors. From md the evidence moves
            to a right-hand column beside the claim and the doors. */}
        <div className="mt-5 grid gap-6 md:mt-8 md:grid-cols-[minmax(0,1.3fr)_minmax(15rem,0.7fr)] md:gap-x-14 md:gap-y-8">
          <p className="max-w-[36rem] font-serif text-[1.25rem] leading-[1.5] text-secondary dark:text-stone-400 sm:text-[1.375rem] md:col-start-1 md:row-start-1">
            Most arguments are not about what they seem. Argumend maps the few
            questions a fight really turns on, and what would change each
            side&rsquo;s mind. It never names a winner.
          </p>

          <aside
            aria-label="What we measured"
            className="border-t border-stone-300/70 pt-3 dark:border-divider md:col-start-2 md:row-span-2 md:row-start-1 md:mt-1.5"
          >
            <p className="label-caps">What we measured</p>
            <p className="mt-1 text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
              In a 36-minute televised debate, 88 of 114 turns were not about
              the question in its title.{" "}
              <Link
                href={HOME_EVIDENCE_HREF}
                className="text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40"
              >
                How we measured it
              </Link>
            </p>
          </aside>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 md:col-start-1 md:row-start-2">
            <Link href={HOME_FLAGSHIP_HREF} className={PRIMARY_BUTTON}>
              See it on AI and jobs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={HOME_PASTE_HREF} className={TEXT_ACTION}>
              Paste an argument you&rsquo;re in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

function HomeMaps({ maps }: { maps: HomeMap[] }) {
  const positionCounts = new Set(maps.map((map) => map.positionCount));
  const positions =
    positionCounts.size === 1
      ? `${numberWord(maps[0]?.positionCount ?? 0)} serious positions`
      : "every serious position";

  return (
    <section aria-labelledby="home-maps-heading" className="px-4 md:px-8">
      <div className="mx-auto max-w-5xl border-t border-stone-300/70 py-10 dark:border-divider md:py-20">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
          <h2
            id="home-maps-heading"
            className="text-balance font-serif text-[2rem] leading-[1.08] tracking-[-0.01em] text-primary dark:text-stone-200 md:text-[2.5rem]"
          >
            {capitalize(numberWord(maps.length))} live arguments, mapped
          </h2>
          {/* The rows say this on a phone; the lede is for wider screens. */}
          <p className="hidden max-w-md font-serif text-[1.1875rem] leading-[1.5] text-secondary dark:text-stone-400 sm:block md:pt-2">
            Each sets out {positions}, the questions they turn on, and the
            strongest evidence each side reads.
          </p>
        </div>

        <ul className="mt-8 grid gap-x-8 md:mt-10 md:grid-cols-3">
          {maps.map((map) => (
            <li key={map.id} className="border-t border-stone-300/80 dark:border-divider">
              <Link
                href={map.href}
                className="group flex h-full flex-col py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep/50 md:pb-2"
              >
                <h3 className="font-serif text-[1.375rem] leading-snug text-primary dark:text-stone-200 transition-colors group-hover:text-deep dark:group-hover:text-accent-text">
                  {map.title}
                </h3>
                {map.crux ? (
                  <>
                    <span className="label-caps mt-3 block">
                      Turns on {numberWord(map.cruxCount)} questions, including
                    </span>
                    <span className="mt-1 block font-serif text-[1.0625rem] italic leading-snug text-secondary dark:text-stone-400">
                      {map.crux.question}
                    </span>
                  </>
                ) : null}
                {/* The whole row is the link (and the tap target), so this
                    affordance needs no 44px box of its own. */}
                <span className="mt-auto inline-flex items-center gap-1 pt-2.5 font-sans text-sm font-medium text-deep dark:text-accent-text md:min-h-11 md:pt-3">
                  Read the map
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-4 md:mt-8">
          <Link href="/topics" className={`${TEXT_ACTION} gap-1 no-underline`}>
            All {TOPIC_COUNT} maps
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
