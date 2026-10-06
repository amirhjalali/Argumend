import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { FeaturedTopicHero } from "@/components/FeaturedTopicHero";
import { HomePasteBox } from "@/components/home/HomePasteBox";
import { Button, PAGE_GUTTER, PageHeader, Section, TextAction } from "@/components/ui";
import { MAP_COUNT } from "@/data/topicIndex";
import { ANALYZE_HREF } from "@/lib/nav";
import {
  HOME_EVIDENCE_HREF,
  HOME_FLAGSHIP_HREF,
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
 *
 * Frame: each beat is a `max-w-5xl` column with `PAGE_GUTTER` inside it, the
 * frame the paste box (components/HeroAnalyze.tsx) draws too and the one
 * `PageContainer` draws on every hub page, so all four beats share the site's
 * left edge.
 */
export function HomeLanding() {
  const crux = loadHomeCrux();
  const maps = loadHomeMaps(new Set(crux ? [crux.claimId] : []));

  return (
    <>
      <HomeHero />
      {crux ? (
        <HomeBeat>
          <FeaturedTopicHero crux={crux} href={HOME_FLAGSHIP_HREF} className={BEAT_SPACING} />
        </HomeBeat>
      ) : null}
      <HomeBeat>
        <HomeMaps maps={maps} />
      </HomeBeat>
      <HomePasteBox />
    </>
  );
}

/**
 * The home frame: the default page width with the page gutter inside it,
 * as PageContainer draws it (without its vertical rhythm), so home's h1
 * starts where /topics' and /learn's do.
 */
function HomeBeat({ children }: { children: React.ReactNode }) {
  return <div className={`mx-auto max-w-5xl ${PAGE_GUTTER}`}>{children}</div>;
}

/** Pads a home Section like the paste box below it. */
const BEAT_SPACING = "pb-10 md:pb-20 md:pt-16";

function HomeHero() {
  return (
    <HomeBeat>
      <PageHeader
        size="display"
        titleId="home-heading"
        title="Find what the argument actually turns on."
        lede="Most arguments are not about what they seem. Argumend maps the few questions a fight really turns on, and what would change each side’s mind. It never names a winner."
        className="!mb-0 pb-10 pt-7 md:pb-16 md:pt-14"
      >
        {/* Phone order: the two doors, then the evidence, so the rust
            button sits high on the first screen. From md the evidence moves
            to a right-hand column beside the doors (placed by grid
            position, so the desktop layout does not depend on this order). */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(15rem,0.7fr)] md:items-start md:gap-x-14">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 md:col-start-1 md:row-start-1">
            {/* The e2e suite (e2e/maps.spec.ts) follows this button by its test id. */}
            <Button href={HOME_FLAGSHIP_HREF} size="lg" data-testid="home-primary-cta">
              See it on AI and jobs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <TextAction href={ANALYZE_HREF}>Paste an argument you&rsquo;re in</TextAction>
          </div>

          <aside
            aria-label="What we measured"
            className="border-t border-divider pt-3 md:col-start-2 md:row-start-1"
          >
            <p className="label-caps">What we measured</p>
            <p className="mt-1 text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
              In a 36-minute televised debate on trans athletes, 88 of 114 turns
              were not about the question in its title.{" "}
              <Link
                href={HOME_EVIDENCE_HREF}
                className="py-3 text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40"
              >
                How we measured it
              </Link>
            </p>
          </aside>
        </div>
      </PageHeader>
    </HomeBeat>
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
    <Section
      id="home-maps"
      title={`${capitalize(numberWord(maps.length))} live arguments, mapped`}
      lede={`Each sets out ${positions}, the questions they turn on, and the strongest evidence each side reads.`}
      className={BEAT_SPACING}
    >
      <ul className="grid gap-x-8 md:grid-cols-3">
        {maps.map((map) => (
          <li key={map.id} className="border-t border-divider">
            <Link
              href={map.href}
              className="group flex h-full flex-col py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus md:pb-2"
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
        <TextAction href="/topics" className="gap-1">
          All {MAP_COUNT} maps
          <span aria-hidden="true">&rarr;</span>
        </TextAction>
      </p>
    </Section>
  );
}
