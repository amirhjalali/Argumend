import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import { WorkedCrux } from "@/components/FeaturedTopicHero";
import { HeroAnalyze } from "@/components/HeroAnalyze";
import {
  FilmReplayButton,
  FilmSkipLink,
} from "@/components/home/film/FilmControls";
import { FilmStep, HomeFilm } from "@/components/home/film/HomeFilm";
import { InteractiveCruxShowcase } from "@/components/home/InteractiveCruxShowcase";
import {
  loadGalleryMaps,
  loadInteractiveExamples,
  type GalleryMapCard,
} from "@/components/home/homeExamples";
import {
  HOME_EVIDENCE_HREF,
  HOME_FLAGSHIP_HREF,
  loadHomeCrux,
  loadHomeCruxLinks,
  loadHomeMaps,
  loadHomeStory,
  numberWord,
  type HomeCruxLink,
  type HomeMap,
  type HomeStory,
} from "@/components/home/homeModel";
import {
  Button,
  PAGE_GUTTER,
  PageHeader,
  Section,
  TextAction,
} from "@/components/ui";
import { MAP_COUNT } from "@/data/topicIndex";
import { ANALYZE_HREF } from "@/lib/nav";

/**
 * Home: one argument pulled apart on film, then the proof, the breadth and
 * the paste box.
 *
 *  1. The film (components/home/film): a full-bleed, pre-rendered 3D sequence
 *     of the flagship map as thread, scrubbed by scroll. Six steps of text
 *     ride over it: the claim and the two doors, the tangle, the knot pulled
 *     tight (with the one pilot result), the claims nobody disputes laid
 *     flat, the contested ones gathered through their cruxes, and the map
 *     seen from above. The picture is decoration: every number and sentence
 *     is text, counted from the map's own graph at build time.
 *     A visitor who has scrolled it once gets the hero alone next time, with
 *     a "Replay the intro" control.
 *  2. The proof: crux #1 of that same map worked through, with tabs to three
 *     more maps.
 *  3. The breadth: the three flagship maps as the questions they turn on,
 *     then six illustrated maps from the wider library.
 *  4. Your own argument: the paste box.
 *
 * Frame: each beat is a `max-w-5xl` column with `PAGE_GUTTER` inside it, the
 * frame `PageContainer` draws on every hub page, so every beat shares the
 * site's left edge.
 */
export function HomeLanding() {
  const crux = loadHomeCrux();
  const story = loadHomeStory();
  const cruxLinks = loadHomeCruxLinks();
  const maps = loadHomeMaps(new Set(crux ? [crux.claimId] : []));
  const interactiveExamples = loadInteractiveExamples();
  const galleryMaps = loadGalleryMaps();

  return (
    <>
      {story ? (
        <HomeFilm labelledBy="home-heading">
          <FilmStep hero>
            <HomeHero film />
          </FilmStep>
          <HomeStorySteps story={story} cruxLinks={cruxLinks} />
        </HomeFilm>
      ) : (
        <HomeHero />
      )}

      {crux ? (
        <HomeBeat>
          <Section
            id="home-crux"
            title="What would change your mind?"
            lede={
              <>
                Every map narrows a heated question to the few cruxes that move
                the positions. Start with crux #1 of <em>{crux.topicTitle}</em>,
                or switch to another map below.
              </>
            }
            className={BEAT_SPACING}
          >
            <InteractiveCruxShowcase
              flagshipLabel="AI & Jobs"
              flagshipHref={HOME_FLAGSHIP_HREF}
              flagshipPanel={<WorkedCrux crux={crux} />}
              examples={interactiveExamples}
            />
          </Section>
        </HomeBeat>
      ) : null}

      <HomeBeat>
        <HomeMaps maps={maps} />
      </HomeBeat>

      {galleryMaps.length > 0 ? (
        <HomeBeat>
          <HomeGallery maps={galleryMaps} />
        </HomeBeat>
      ) : null}

      <HeroAnalyze />
    </>
  );
}

/**
 * The home frame: the default page width with the page gutter inside it,
 * as PageContainer draws it (without its vertical rhythm), so home's h1
 * starts where /topics' and /learn's do.
 */
function HomeBeat({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-5xl ${PAGE_GUTTER} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/** Pads a home Section like the paste box below it. */
const BEAT_SPACING = "pb-12 pt-10 md:pb-20 md:pt-16";

/**
 * "contested" is the map's own status. If a map also carries unresolved
 * claims, the open ones are not all contested, so they are called open.
 */
const openWord = (story: HomeStory) =>
  story.unresolvedCount > 0 ? "still open" : "contested";

/**
 * `film`: the hero is the first step of the film. Its copy keeps to the left
 * from lg, where the frames leave the paper clear; on a phone or an upright
 * tablet it sits at the foot of the first screen, over the paper below the
 * thread.
 */
function HomeHero({ film = false }: { film?: boolean }) {
  const lede =
    "Argumend maps the questions behind a disagreement, the evidence on each side, and what would change each side’s mind. It never names a winner.";
  return (
    // On an upright phone or tablet the film's thread has the top of the
    // frame (80vw of it), so the hero's copy starts below it, on the paper.
    <HomeBeat className={film ? "max-lg:portrait:pt-[80vw]" : undefined}>
      <PageHeader
        size="display"
        titleId="home-heading"
        title="Find what the argument actually turns on."
        // In the film the lede is set below, so a phone can put the two doors first.
        lede={film ? undefined : lede}
        className={
          film
            ? "!mb-0 pb-6 pt-4 lg:max-w-[25rem] lg:pb-10 lg:pt-10"
            : "!mb-0 pb-10 pt-7 md:pb-16 md:pt-14"
        }
      >
        <div className={film ? "flex flex-col" : undefined}>
          {film ? (
            <p className="order-2 mt-6 max-w-[36rem] font-serif text-xl leading-[1.5] text-secondary dark:text-stone-400 lg:order-none lg:-mt-1 lg:mb-6">
              {lede}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {/* The e2e suite (e2e/maps.spec.ts) follows this button by its test id. */}
            <Button
              href={HOME_FLAGSHIP_HREF}
              size="lg"
              data-testid="home-primary-cta"
            >
              See it on AI and jobs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <TextAction href={ANALYZE_HREF}>
              Paste an argument you&rsquo;re in
            </TextAction>
          </div>

          {film ? (
            <>
              {/* First visit: the cue to scroll, and a way past. */}
              <div className="order-3 mt-6 flex flex-wrap items-center gap-x-6 group-data-[seen]/film:hidden md:mt-9">
                <p className="inline-flex min-h-11 items-center gap-2 font-sans text-sm text-muted dark:text-stone-400">
                  <ArrowDown
                    className="h-4 w-4 text-crux-text motion-safe:animate-bounce"
                    aria-hidden="true"
                  />
                  Scroll to pull one argument apart
                </p>
                <FilmSkipLink href="#home-crux" />
              </div>
              {/* Every visit after it. */}
              <div className="order-3 mt-6 hidden group-data-[seen]/film:block md:mt-9">
                <FilmReplayButton />
              </div>
            </>
          ) : null}
        </div>
      </PageHeader>
    </HomeBeat>
  );
}

/**
 * The film's five steps after the hero. Each is a screen of scroll with one
 * block of copy; the frames behind it arrive at that step's arrangement as
 * the block reaches the middle of the screen (components/home/filmManifest.ts
 * `beats`). From lg the copy keeps to the left and the thread to the right.
 * Below that the thread has the upper screen and the copy the paper below it.
 */
function HomeStorySteps({
  story,
  cruxLinks,
}: {
  story: HomeStory;
  cruxLinks: HomeCruxLink[];
}) {
  const cruxes = numberWord(story.cruxCount);
  const oneCrux = story.cruxCount === 1;
  const open = openWord(story);

  const steps: {
    label: string;
    /** The step's number, set large above its title; decoration, the title says it too. */
    figure?: { value: string; unit: string; tone: string };
    title: string;
    body: React.ReactNode;
  }[] = [
    {
      label: "One argument",
      figure: {
        value: String(story.claimCount),
        unit: "claims",
        tone: "text-primary dark:text-stone-200",
      },
      title: `One argument, ${story.claimCount} claims.`,
      body: (
        <p>
          Take a live one: {story.question} Our map of it holds{" "}
          {story.claimCount} separate claims. In a thread they reach you like
          this: all at once, knotted together.
        </p>
      ),
    },
    {
      label: "The knot",
      title: "The harder each side pulls, the tighter it gets.",
      body: (
        <>
          <p>
            Pull on the strand you are holding and the rest close around it.
            Volume does not loosen a knot.
          </p>
          <aside
            aria-label="One pilot test"
            className="mt-5 border-l-2 border-crux/60 pl-4 font-sans"
          >
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
        </>
      ),
    },
    {
      label: "Common ground",
      figure: {
        value: String(story.acceptedCount),
        unit: "not in dispute",
        tone: "text-deep dark:text-accent-text",
      },
      title: `${story.acceptedCount} of them ${story.acceptedCount === 1 ? "is" : "are"} not in dispute.`,
      body: (
        <>
          <p>
            Stop pulling and look. These claims are broadly accepted, or nobody
            on any side challenges them. They were never the fight.
          </p>
          {story.acceptedExample ? (
            <p className="mt-4 border-l-2 border-deep/50 pl-4 text-[1.0625rem] italic dark:border-accent-text/50">
              {story.acceptedExample}
            </p>
          ) : null}
        </>
      ),
    },
    {
      label: "The cruxes",
      figure: {
        value: String(story.cruxCount),
        unit: oneCrux ? "question" : "questions",
        tone: "text-crux-text",
      },
      title: `${story.openCount} ${story.openCount === 1 ? "is" : "are"} ${open}. They turn on ${cruxes} ${oneCrux ? "question" : "questions"}.`,
      body: oneCrux ? (
        <p>
          Answer it differently and the positions built on it move. We call a
          question like this a crux. Every map opens with its cruxes, and with
          what would settle each one.
        </p>
      ) : (
        <p>
          Answer one of the {cruxes} differently and the positions built on it
          move. We call these questions cruxes. Every map opens with them, and
          with what would settle each one.
        </p>
      ),
    },
    {
      label: "The map",
      title: "No winner. Only where to look.",
      body: (
        <>
          <p>
            Seen from above, the knot was a map all along. Argumend never says
            who is right. It shows which part of a disagreement is real, so that
            is the part you argue about.
          </p>
          {cruxLinks.length > 0 ? (
            // The knots in the picture, named: the map's own cruxes, in its order.
            <ol
              aria-label={`The ${cruxes} questions`}
              className="mt-5 border-t border-divider"
            >
              {cruxLinks.map((crux) => (
                <li key={crux.href} className="border-b border-divider">
                  <Link
                    href={crux.href}
                    className="group/crux flex min-h-11 items-baseline gap-3 py-2 text-[1rem] leading-snug text-primary dark:text-stone-200 transition-colors hover:text-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus dark:hover:text-accent-text"
                  >
                    <span className="w-4 shrink-0 font-sans text-xs font-semibold tabular-nums text-crux-text">
                      {crux.rank}
                    </span>
                    <span className="line-clamp-2 italic">{crux.question}</span>
                  </Link>
                </li>
              ))}
            </ol>
          ) : null}
          <p className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 font-sans">
            <TextAction href={HOME_FLAGSHIP_HREF} className="gap-1">
              Open this map
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TextAction>
            <TextAction href="#home-crux">Start with its first crux</TextAction>
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      {steps.map((step, index) => (
        <FilmStep key={step.label}>
          <HomeBeat>
            {/* Below `lg` the copy is a sheet of the page's paper that slides up
                over the pinned picture; from `lg` it sits beside it. */}
            <div
              data-film-copy=""
              className="max-lg:-mx-4 max-lg:border-t max-lg:border-divider max-lg:bg-canvas/95 max-lg:px-4 max-lg:pb-[6svh] max-lg:pt-5 max-lg:backdrop-blur-sm sm:max-lg:-mx-6 sm:max-lg:px-6 lg:max-w-[24rem] xl:max-w-[26rem]"
            >
              <p
                data-film-rise=""
                className="label-caps flex items-center gap-2"
              >
                <span className="font-semibold text-crux-text">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true">/</span>
                <span>{step.label}</span>
              </p>
              {step.figure ? (
                <p
                  aria-hidden="true"
                  data-film-rise=""
                  style={rise(1)}
                  // Wide screens only: on a phone the title says it and the sheet stays short.
                  className="mt-5 hidden items-baseline gap-3 lg:flex"
                >
                  <span
                    // The stage counts this up from zero as the step arrives.
                    data-film-count={step.figure.value}
                    // Held to its final width, so the unit beside it does not jump.
                    style={{ minWidth: `${step.figure.value.length}ch` }}
                    className={`inline-block font-serif text-[4.5rem] font-normal tabular-nums leading-[0.85] tracking-[-0.04em] sm:text-[6rem] lg:text-[8.5rem] ${step.figure.tone}`}
                  >
                    {step.figure.value}
                  </span>
                  <span className="label-caps">{step.figure.unit}</span>
                </p>
              ) : null}
              <h2 className="mt-3 text-balance font-serif text-[2.125rem] font-normal leading-[1.06] tracking-[-0.018em] text-primary dark:text-stone-200 sm:text-[2.75rem] lg:text-[3.25rem]">
                <RisingWords text={step.title} from={2} />
              </h2>
              <div
                data-film-rise=""
                style={rise(4 + step.title.split(" ").length)}
                className="mt-4 font-serif text-[1.1875rem] leading-[1.55] text-secondary dark:text-stone-400"
              >
                {step.body}
              </div>
            </div>
          </HomeBeat>
        </FilmStep>
      ))}
    </>
  );
}

/** The `--i` a rising element waits on: its place in the step's entrance (app/globals.css). */
const rise = (index: number) => ({ "--i": index }) as React.CSSProperties;

/**
 * A title whose words rise in one after another as its step arrives. The
 * words stay ordinary text, a space apart, so the heading reads and copies
 * as the sentence it is.
 */
function RisingWords({ text, from }: { text: string; from: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <span key={index}>
          <span
            data-film-rise=""
            style={rise(from + index)}
            className="inline-block"
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

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
              <span className="mt-auto inline-flex items-center gap-1 pt-2.5 font-sans text-sm font-medium text-deep dark:text-accent-text md:min-h-11 md:pt-3">
                Read the map
                <ChevronRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
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

function HomeGallery({ maps }: { maps: readonly GalleryMapCard[] }) {
  return (
    <Section
      id="home-gallery"
      title="Across the library"
      lede="More contested questions from the wider library, each opening on the first question it turns on."
      className={BEAT_SPACING}
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {maps.map((map) => (
          <li key={map.id}>
            <Link
              href={map.href}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-divider bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-400/80 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:hover:border-stone-600"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-divider bg-canvas">
                {map.heroSrc ? (
                  <Image
                    src={map.heroSrc}
                    alt={map.heroAlt}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] dark:brightness-[0.88] dark:contrast-[1.04]"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="label-caps">{map.category}</span>
                <h3 className="mt-1 font-serif text-[1.25rem] leading-snug text-primary dark:text-stone-100 transition-colors group-hover:text-deep dark:group-hover:text-accent-text">
                  {map.title}
                </h3>
                <p className="mt-2 line-clamp-3 font-serif text-[0.9375rem] italic leading-relaxed text-secondary dark:text-stone-400">
                  {map.firstCrux}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 font-sans text-xs font-medium text-deep dark:text-accent-text">
                  Explore map
                  <ChevronRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
