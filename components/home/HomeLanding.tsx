import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import { WorkedCrux } from "@/components/FeaturedTopicHero";
import { HeroAnalyze } from "@/components/HeroAnalyze";
import { ArgumentHistoryStory, type StoryChapter } from "@/components/home/ArgumentHistoryStory";
import { HeroSpecimen } from "@/components/home/HeroSpecimen";
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
  loadHomeMaps,
  loadHomeStory,
  numberWord,
  type HomeMap,
  type HomeStory,
} from "@/components/home/homeModel";
import { Button, PAGE_GUTTER, PageHeader, Section, TextAction } from "@/components/ui";
import { MAP_COUNT } from "@/data/topicIndex";
import { ANALYZE_HREF } from "@/lib/nav";

/**
 * Home: an illustrated, scroll-driven introduction to why Argumend exists,
 * followed by an interactive live-crux preview, the flagship & illustrated
 * library showcase, and the paste box.
 *
 *  0. The opening hero: the claim, two doors, and a live interactive specimen
 *     that untangles an argument above the fold.
 *  1. A brief history of disagreement (5 chapters): from the Athenian Agora
 *     and the Royal Society to modern outrage feeds, a live strand-untangling
 *     stage built from the flagship graph's counts, and Argumend's no-winner
 *     method.
 *  2. Try one live: crux #1 of the flagship map worked through, with tabs to
 *     inspect freshly audited maps (Four-Day Week, Digital Privacy, Congestion
 *     Pricing) without leaving the page.
 *  3. The breadth: the three flagship maps as crux questions, plus an
 *     illustrated gallery drawn from the broader library.
 *  4. Bring your own argument: the offline-safe paste box.
 */
export function HomeLanding() {
  const crux = loadHomeCrux();
  const story = loadHomeStory();
  const maps = loadHomeMaps(new Set(crux ? [crux.claimId] : []));
  const interactiveExamples = loadInteractiveExamples();
  const galleryMaps = loadGalleryMaps();

  return (
    <>
      <HomeBeat>
        <HomeHero story={story} />
      </HomeBeat>

      {story ? (
        <HomeBeat>
          <HomeHistorySection story={story} />
        </HomeBeat>
      ) : null}

      {crux ? (
        <HomeBeat>
          <Section
            id="home-crux"
            title="What would change your mind?"
            lede={
              <>
                Every map narrows a heated question to the few cruxes that actually move the
                positions. Start with crux #1 of <em>{crux.topicTitle}</em>, or switch to another
                audited map below.
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

function HomeBeat({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-5xl ${PAGE_GUTTER} ${className ?? ""}`}>{children}</div>;
}

const BEAT_SPACING = "pb-12 pt-10 md:pb-20 md:pt-16";

const openWord = (story: HomeStory) => (story.unresolvedCount > 0 ? "still open" : "contested");

function HomeHero({ story }: { story: HomeStory | null }) {
  return (
    <section
      aria-labelledby="home-heading"
      className="grid items-center gap-8 pb-12 pt-7 md:pb-16 md:pt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12"
    >
      <div>
        <PageHeader
          size="display"
          eyebrow="Argumend · Disagree better"
          titleId="home-heading"
          title="Find what the argument actually turns on."
          lede="Argumend maps the questions behind a disagreement, the evidence on each side, and what would change each side’s mind. It never names a winner."
          className="!mb-0"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* The e2e suite (e2e/maps.spec.ts) follows this button by its test id. */}
            <Button href={HOME_FLAGSHIP_HREF} size="lg" data-testid="home-primary-cta">
              See it on AI and jobs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <TextAction href={ANALYZE_HREF}>Paste an argument you&rsquo;re in</TextAction>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-sm text-muted dark:text-stone-400">
            <a
              href="#story"
              className="inline-flex items-center gap-2 transition-colors hover:text-primary dark:hover:text-stone-200"
            >
              <ArrowDown className="h-4 w-4 text-crux-text" aria-hidden="true" />
              Scroll the 2-minute visual intro
            </a>
            <a
              href="#home-crux"
              className="underline decoration-divider underline-offset-4 transition-colors hover:text-primary dark:hover:text-stone-200"
            >
              Jump to live maps
            </a>
          </div>
        </PageHeader>
      </div>

      {story ? (
        <HeroSpecimen
          claimCount={story.claimCount}
          acceptedCount={story.acceptedCount}
          openCount={story.openCount}
          cruxCount={story.cruxCount}
        />
      ) : null}
    </section>
  );
}

function HomeHistorySection({ story }: { story: HomeStory }) {
  const cruxes = numberWord(story.cruxCount);
  const oneCrux = story.cruxCount === 1;
  const open = openWord(story);

  const chapters: StoryChapter[] = [
    {
      id: "agora",
      number: "01",
      era: "400 BCE · Athens",
      plateTitle: "The Agora",
      plateCaption: "Two opposing paths meeting quietly around a shared question.",
      title: "Arguments began as a way to find things out.",
      imageSrc: "/images/generated/home/chapter-1-agora.jpg",
      imageAlt:
        "Two classical Greek columns and curved marble amphitheater steps with slender teal and rust ink paths meeting quietly around an olive sprig and a crimson dot.",
      marginNote: "The original premise: disagreement only works when both sides are answering the same question.",
    },
    {
      id: "evidence",
      number: "02",
      era: "1660 · The Evidence Table",
      plateTitle: "Nullius in Verba",
      plateCaption: "Primary records, instruments, and the rule that observations outrank status.",
      title: "Then science added a rule: show what would prove you wrong.",
      imageSrc: "/images/generated/home/chapter-2-evidence.jpg",
      imageAlt:
        "An Enlightenment workbench with a patinated brass astrolabe, magnifying glass over a pressed botanical leaf, stitched folios, and calipers measuring teal and brick-rust mineral specimens.",
      marginNote: "The shift: moving disputes from who is speaking to what checkable observation would move each side.",
    },
    {
      id: "feed",
      number: "03",
      era: "Today · The Outrage Feed",
      plateTitle: "Counterfeit Disagreement",
      plateCaption: "Megaphones tangling heat and identity over agreed ground buried below.",
      title: "Modern feeds broke the mechanism by rewarding counterfeit fights.",
      imageSrc: "/images/generated/home/chapter-3-feed.jpg",
      imageAlt:
        "Two opposing antique megaphones blasting a chaotic knot of brick-rust and stone-grey threads directly over two quiet deep-teal pebbles nestled untouched below.",
      marginNote: "Engagement incentives profit from widening the gap between how much people think they disagree and how much they actually do.",
    },
    {
      id: "untangle",
      number: "04",
      era: "Live Map · AI & Jobs",
      plateTitle: `${story.claimCount} Claims, Untangled`,
      plateCaption: `${story.acceptedCount} claims not in dispute laid flat in teal; ${story.openCount} ${open} claims gathered into ${cruxes} crimson ${oneCrux ? "crux" : "cruxes"}.`,
      title: `Pull one real fight apart: ${story.claimCount} claims, ${story.acceptedCount} not in dispute.`,
      liveGraph: {
        agreed: story.acceptedCount,
        contested: story.openCount,
        cruxes: story.cruxCount,
        claimCount: story.claimCount,
        openLabel: open,
      },
      marginNote: `Computed directly from the live ${story.question} graph on Argumend.`,
    },
    {
      id: "crux",
      number: "05",
      era: "Argumend · The Method",
      plateTitle: "No Winner. Only Where to Look.",
      plateCaption: "Agreed ground laid flat, contested claims pinned to their cruxes, and a level scale with no winner.",
      title: "No winner. Only where to look.",
      imageSrc: "/images/generated/home/chapter-5-crux.jpg",
      imageAlt:
        "Tangled threads on the left combing cleanly into straight parallel deep-teal threads below, brick-rust threads passing through three crimson-topped brass pins, and a level antique balance scale on the right.",
      marginNote: "Every map follows our five-stage formula: primary-source dossier first, steelmanned camps, symmetric mind-change flips, and automated fairness checks.",
    },
  ];

  const bodies: React.ReactNode[] = [
    <p key="agora">
      In the Athenian Agora, questioning an opponent was not a spectator sport designed to humiliate
      another tribe. Socrates asked what premise a claim depended on, because two people cannot reason
      together until they find the exact joint where their assumptions diverge.
    </p>,
    <p key="evidence">
      When the Royal Society adopted <em>Nullius in verba</em>—take nobody&rsquo;s word for it—public
      argument gained a second discipline: separate the claim from the speaker, attach primary
      evidence, and name the observation that could falsify your own side.
    </p>,
    <div key="feed" className="space-y-3">
      <p>
        Algorithms inverted both habits. Facts, values, definitions, and team loyalty arrive knotted
        into one loud thread, so people argue past each other for hours without noticing how much
        ground they already share.
      </p>
      <aside
        aria-label="One pilot test"
        className="rounded-lg border border-divider bg-card/80 px-4 py-3 font-sans"
      >
        <p className="label-caps">One pilot test</p>
        <p className="mt-1 text-[0.875rem] leading-relaxed text-secondary dark:text-stone-400">
          In a televised debate on trans athletes, our model-based analysis classified 88 of 114
          analyzed turns as not arguing the mapped question, including host questions.{" "}
          <Link
            href={HOME_EVIDENCE_HREF}
            className="font-medium text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40"
          >
            Method and limits
          </Link>
        </p>
      </aside>
    </div>,
    <div key="untangle" className="space-y-3">
      <p>
        Take a live question: <em>{story.question}</em> Our map holds {story.claimCount} separate
        claims. {story.acceptedCount} of them {story.acceptedCount === 1 ? "is" : "are"} broadly
        accepted or undisputed—and the {story.openCount} {open} claims turn on just {cruxes}{" "}
        load-bearing {oneCrux ? "question" : "questions"} we call <strong>cruxes</strong>.
      </p>
      {story.acceptedExample ? (
        <blockquote className="border-l-2 border-deep/50 pl-4 text-[1.03125rem] italic text-secondary dark:text-stone-300 dark:border-accent-text/50">
          {story.acceptedExample}
        </blockquote>
      ) : null}
    </div>,
    <div key="crux" className="space-y-3">
      <p>
        Argumend never declares who is right. Every map opens with what both sides accept, lays out
        the few cruxes that actually move the positions, pairs claims with primary sources, and shows
        what would change each side&rsquo;s mind.
      </p>
      <p className="font-sans text-sm">
        <Link
          href="/blog/how-argumend-evolved-and-how-we-map-a-topic"
          className="inline-flex items-center gap-1.5 font-medium text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40"
        >
          Read how Argumend evolved and our five-stage formula
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </p>
    </div>,
  ];

  return <ArgumentHistoryStory chapters={chapters} bodies={bodies} />;
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
      lede={`Our flagship graphs set out ${positions}, the questions they turn on, and the strongest evidence each side reads.`}
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

function HomeGallery({ maps }: { maps: readonly GalleryMapCard[] }) {
  return (
    <Section
      id="home-gallery"
      title="Across the library"
      lede="Six more contested questions—from work weeks and digital privacy to nuclear power and housing—each stripped down to its lead crux."
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
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
