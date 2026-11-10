import Link from "next/link";
import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import { FeaturedTopicHero } from "@/components/FeaturedTopicHero";
import { HeroAnalyze } from "@/components/HeroAnalyze";
import { Button, PAGE_GUTTER, PageHeader, Section, TextAction } from "@/components/ui";
import { MAP_COUNT } from "@/data/topicIndex";
import { ANALYZE_HREF } from "@/lib/nav";
import {
  HOME_EVIDENCE_HREF,
  HOME_FLAGSHIP_HREF,
  loadHomeCrux,
  loadHomeMaps,
  loadHomeStory,
  numberWord,
  type HomeMap,
  type HomeStory,
} from "@/components/home/homeModel";
import { ThreadStage } from "@/components/home/ThreadStage";

/**
 * Home: one argument in five beats, on one left edge.
 *
 *  1. The claim: most arguments are not about what they seem. One line of
 *     public evidence, one rust button to a flagship map, one quiet link to
 *     the paste tool.
 *  2. The story: that flagship map pulled apart as you scroll. A tangle of
 *     its claims, the ones nobody disputes laid flat, the contested ones
 *     gathered through the questions they turn on, then the seam mended.
 *     The thread figure (ThreadStage) is pinned behind beats 1 and 2 and is
 *     decoration: every number and sentence of the story is text.
 *  3. The proof: crux #1 of that same map, worked through.
 *  4. The breadth: the three flagship maps as the questions they turn on.
 *  5. Your own argument: the paste box.
 *
 * A server component: the story's counts, the crux and the map rows are
 * computed from the maps' own graphs at build time. The thread figure and
 * the paste box are the only client JS.
 *
 * Frame: each beat is a `max-w-5xl` column with `PAGE_GUTTER` inside it, the
 * frame the paste box (components/HeroAnalyze.tsx) draws too and the one
 * `PageContainer` draws on every hub page, so every beat shares the site's
 * left edge.
 */
export function HomeLanding() {
  const crux = loadHomeCrux();
  const story = loadHomeStory();
  const maps = loadHomeMaps(new Set(crux ? [crux.claimId] : []));

  return (
    <>
      {story ? (
        <section data-thread-section="" aria-labelledby="home-heading" className="relative">
          <ThreadStage
            counts={{
              agreed: story.acceptedCount,
              contested: story.openCount,
              cruxes: story.cruxCount,
            }}
            openLabel={openWord(story)}
          />
          <div className="relative z-10">
            <div
              data-thread-step=""
              className="flex flex-col md:min-h-[calc(100svh-3.5rem)] md:justify-center"
            >
              <HomeHero pinned />
            </div>
            <HomeStorySteps story={story} />
          </div>
        </section>
      ) : (
        <HomeHero />
      )}
      {crux ? (
        <HomeBeat>
          <FeaturedTopicHero crux={crux} href={HOME_FLAGSHIP_HREF} className={BEAT_SPACING} />
        </HomeBeat>
      ) : null}
      <HomeBeat>
        <HomeMaps maps={maps} />
      </HomeBeat>
      <HeroAnalyze />
    </>
  );
}

/**
 * The home frame: the default page width with the page gutter inside it,
 * as PageContainer draws it (without its vertical rhythm), so home's h1
 * starts where /topics' and /learn's do.
 */
function HomeBeat({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-5xl ${PAGE_GUTTER} ${className ?? ""}`}>{children}</div>;
}

/** Pads a home Section like the paste box below it. */
const BEAT_SPACING = "pb-10 md:pb-20 md:pt-16";

/**
 * `pinned`: the hero is the first step of the scroll story. Its copy keeps
 * to the left half from md so the thread figure has the right half, and on
 * a phone it sits on the page colour so the figure waits below it instead
 * of running behind the text.
 */
function HomeHero({ pinned = false }: { pinned?: boolean }) {
  return (
    <HomeBeat className={pinned ? "bg-canvas md:bg-transparent" : undefined}>
      <PageHeader
        size="display"
        titleId="home-heading"
        title="Find what the argument actually turns on."
        lede="Argumend maps the questions behind a disagreement, the evidence on each side, and what would change each side’s mind. It never names a winner."
        className={
          pinned
            ? "!mb-0 pb-8 pt-7 md:max-w-[52%] md:pb-10 md:pt-10 lg:max-w-[31rem]"
            : "!mb-0 pb-10 pt-7 md:pb-16 md:pt-14"
        }
      >
        {/* The two doors, then the evidence, so the rust button sits high on
            a phone's first screen. */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          {/* The e2e suite (e2e/maps.spec.ts) follows this button by its test id. */}
          <Button href={HOME_FLAGSHIP_HREF} size="lg" data-testid="home-primary-cta">
            See it on AI and jobs
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <TextAction href={ANALYZE_HREF}>Paste an argument you&rsquo;re in</TextAction>
        </div>

        <aside aria-label="One pilot test" className="mt-8 max-w-[26rem] border-t border-divider pt-3">
          <p className="label-caps">One pilot test</p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
            In a televised debate on trans athletes, our model-based analysis
            classified 88 of 114 analyzed turns as not arguing the mapped
            question, including host questions.{" "}
            <Link
              href={HOME_EVIDENCE_HREF}
              className="py-3 text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40"
            >
              Method and limits
            </Link>
          </p>
        </aside>

        {pinned ? (
          <p className="mt-8 hidden items-center gap-2 font-sans text-sm text-muted md:flex">
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
            Scroll to pull one argument apart
          </p>
        ) : null}
      </PageHeader>
    </HomeBeat>
  );
}

/**
 * The story's four steps. Each is a screen of scroll with one short block of
 * copy; the thread figure behind it changes arrangement as the block
 * reaches the reading line. From md the copy keeps to the left half and the
 * figure to the right. On a phone the figure has the upper stage and each
 * block passes beneath it on the page colour.
 */
/**
 * "contested" is the map's own status. If a map also carries unresolved
 * claims, the open ones are not all contested, so they are called open.
 */
const openWord = (story: HomeStory) => (story.unresolvedCount > 0 ? "still open" : "contested");

function HomeStorySteps({ story }: { story: HomeStory }) {
  const cruxes = numberWord(story.cruxCount);
  const oneCrux = story.cruxCount === 1;
  const open = openWord(story);
  const steps: { title: string; body: React.ReactNode }[] = [
    {
      title: `One argument, ${story.claimCount} claims.`,
      body: (
        <>
          Take a live one: {story.question} Our map of it holds {story.claimCount} separate
          claims. In a thread they reach you all at once, like this.
        </>
      ),
    },
    {
      title: `${story.acceptedCount} of them ${story.acceptedCount === 1 ? "is" : "are"} not in dispute.`,
      body: (
        <>
          They are broadly accepted, or nobody on any side challenges them.
          {story.acceptedExample ? (
            <span className="mt-3 block border-l-2 border-deep/50 pl-4 text-[1.0625rem] italic dark:border-accent-text/50">
              {story.acceptedExample}
            </span>
          ) : null}
        </>
      ),
    },
    {
      title: `${story.openCount} ${story.openCount === 1 ? "is" : "are"} ${open}. They turn on ${cruxes} ${oneCrux ? "question" : "questions"}.`,
      body: oneCrux ? (
        <>
          Answer it differently and the positions built on it move. We call a question like
          this a crux. Every map opens with its cruxes, and with what would settle each one.
        </>
      ) : (
        <>
          Answer one of the {cruxes} differently and the positions built on it move. We call
          these questions cruxes. Every map opens with them, and with what would settle each
          one.
        </>
      ),
    },
    {
      title: "No winner. Only where to look.",
      body: (
        <>
          Argumend never says who is right. It shows which part of a disagreement is real, so
          that is the part you argue about. It starts with one question.
        </>
      ),
    },
  ];

  return (
    <>
      {steps.map((step) => (
        <div
          key={step.title}
          data-thread-step=""
          className="flex min-h-[92svh] items-end pb-[9svh] md:min-h-[100svh] md:items-center md:pb-0"
        >
          <HomeBeat>
            <div
              data-thread-copy=""
              className="-mx-4 border-y border-divider bg-canvas/95 px-4 py-6 sm:-mx-6 sm:px-6 md:mx-0 md:max-w-[46%] md:border-0 md:bg-transparent md:p-0 lg:max-w-[27rem]"
            >
              <h2 className="text-balance font-serif text-[2rem] font-normal leading-[1.08] tracking-[-0.015em] text-primary dark:text-stone-200 sm:text-[2.5rem] lg:text-[2.875rem]">
                {step.title}
              </h2>
              <p className="mt-4 font-serif text-[1.1875rem] leading-[1.55] text-secondary dark:text-stone-400">
                {step.body}
              </p>
            </div>
          </HomeBeat>
        </div>
      ))}
    </>
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
