import { AppShell } from "@/components/AppShell";
import { WorkedCrux } from "@/components/FeaturedTopicHero";
import { PROSE, STORY_SECTION } from "@/components/story/StoryParts";
import { PageContainer, PageHeader, Section, TextAction } from "@/components/ui";
import {
  HOME_EVIDENCE_HREF,
  HOME_FLAGSHIP_HREF,
  loadHomeCrux,
  numberWord,
} from "@/components/home/homeModel";
import { ANALYZE_HREF, GITHUB_URL } from "@/lib/nav";

/**
 * /about is the site's only story page. It absorbed /how-it-works
 * (#read-a-map) and /community (#contribute); both redirect here, and other
 * pages link to both anchors (app/storyPages.test.tsx keeps every linked
 * anchor present).
 *
 * Scannable, in this order (r3 review #12): what Argumend does, one real crux
 * card, how maps are made (a pointer to /methodology, not a copy of it), the
 * rules, why it exists, and how to help.
 *
 * The crux card is the flagship map's crux #1, drawn by the component home
 * uses (WorkedCrux in components/FeaturedTopicHero.tsx) from the map's own
 * graph, engine ranking and public ledger. Both findings under #why are real,
 * linked broadcasts from the 2026-09-17 write-up. Nothing here describes a
 * feature that does not run by default.
 */

/** One rule: a run-in lead, as in a book, then a sentence or two. */
const RULES: { lead: string; text: string }[] = [
  {
    lead: "What would settle it, not who won.",
    text: "A record of which cruxes moved, and what moved them, is more honest than a ruling that can rest on one judgment call.",
  },
  {
    lead: "Never a winner.",
    text: "No map and no tool here names a winner or shows an agreement percentage. Every position is written so its own holders would recognise it.",
  },
  {
    lead: "Sources shown.",
    text: "Every card of evidence names its source and is filed by what it shows, not by who cites it.",
  },
  {
    lead: "Voluntary before imposed.",
    text: "Argumend works on the arguments people bring to it: the maps here, or a thread you paste because you are in it. It does not reach into other people’s conversations.",
  },
];

export default function AboutPage() {
  const crux = loadHomeCrux();

  return (
    <AppShell layout="reading">
      <PageContainer width="reading" as="article">
        <PageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
          eyebrow="About Argumend"
          title="Disagree better."
          lede="Argumend maps hard questions around their cruxes: the questions a fight turns on, and what would settle each one. Read a map, or paste an argument you are in to find the map it belongs to. No map names a winner."
        />

        <Section
          className={STORY_SECTION}
          id="read-a-map"
          title="How to read a map"
          lede={
            crux ? (
              <>
                A crux is the question a fight turns on, and what would settle
                it. This is the first of {numberWord(crux.cruxCount)} on{" "}
                <em>{crux.topicTitle}</em>, exactly as the map shows it.
              </>
            ) : (
              "A crux is the question a fight turns on, and what would settle it."
            )
          }
        >
          {crux ? <WorkedCrux crux={crux} /> : null}

          <div className={`${PROSE} mt-6`}>
            <p>
              The dated line under it shows how the crux has moved. It records
              movement, not a winner. On the map, each crux opens to the
              evidence on each side, with its sources. The two-sided maps, which
              set a skeptic&rsquo;s case against the best reply, also have a
              diagram: a canvas on a larger screen, an outline on a phone.
            </p>
          </div>
          <p className="mt-4 flex flex-wrap gap-x-6">
            <TextAction href={HOME_FLAGSHIP_HREF}>Read the whole map</TextAction>
            <TextAction href={ANALYZE_HREF}>Paste an argument</TextAction>
          </p>
        </Section>

        <Section className={STORY_SECTION} id="how-maps-are-made" title="How maps are made">
          <div className={PROSE}>
            <p>
              A language model drafts each four-position map from research reports, and
              every draft is audited before it is published: links checked,
              headline facts checked against the primary source, positions read
              for fairness. An engine ranks the cruxes by which claims, if
              settled, would move the positions furthest apart.
            </p>
          </div>
          <p className="mt-4">
            <TextAction href="/methodology">How maps are made, step by step</TextAction>
          </p>
        </Section>

        <Section className={STORY_SECTION} id="principles" title="The rules it keeps">
          <div className={PROSE}>
            {RULES.map((rule) => (
              <p key={rule.lead}>
                <strong className="font-semibold text-primary dark:text-stone-200">{rule.lead}</strong>{" "}
                {rule.text}
              </p>
            ))}
          </div>
        </Section>

        <Section className={STORY_SECTION} id="why" title="Why it exists">
          <div className={PROSE}>
            <p>
              Most arguments are not about what they seem. When we ran real
              broadcasts through our tools, a four-minute TV panel on
              immigration turned on one word, &ldquo;culture&rdquo;, that each
              guest used differently, and 88 of 114 turns in a 36-minute TV
              debate on trans athletes were not about the question in its
              title.
            </p>
            <p>
              Argumend exists to close that gap, between how much people think
              they disagree and how much they actually do. The name reads both
              ways: argum-end, ending the counterfeit argument, and argu-mend,
              mending how we talk to each other.
            </p>
          </div>
          <p className="mt-4">
            <TextAction href={HOME_EVIDENCE_HREF}>The full write-up, with its caveats</TextAction>
          </p>
        </Section>

        <Section className={STORY_SECTION} id="contribute" title="Contribute">
          <div className={PROSE}>
            <p>
              Argumend is open source, and any map can be wrong. Open an issue
              with the map&rsquo;s address and your source: a card on the wrong
              side, a source that does not say what its card says, a position
              its holders would not recognise, a crux that has moved, or a
              question that deserves a map.
            </p>
          </div>
          <p className="mt-4 flex flex-wrap gap-x-6">
            <TextAction href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              Open Argumend on GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </TextAction>
            <TextAction href="/faq">Common questions</TextAction>
          </p>
        </Section>
      </PageContainer>
    </AppShell>
  );
}
