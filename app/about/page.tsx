import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import {
  OnThisPage,
  PROSE,
  PROSE_LINK,
  RuledList,
  STORY_CONTAINER,
  StoryHeader,
  StorySection,
  TEXT_ACTION,
} from "@/components/story/StoryParts";
import {
  HOME_EVIDENCE_HREF,
  HOME_FLAGSHIP_HREF,
} from "@/components/home/homeModel";
import { argumentTopicIndex } from "@/lib/argument/topicIds";

/**
 * /about is the site's only story page. It absorbed /how-it-works
 * (#read-a-map) and /community (#contribute); both redirect here.
 *
 * Every number on this page is one Argumend has already published (the
 * 2026-09-17 blog post linked from #why). Nothing here describes a feature
 * that does not run by default.
 */

const GITHUB_URL = "https://github.com/amirhjalali/Argumend";

const flagshipTitle =
  argumentTopicIndex.find((topic) => `/topics/${topic.id}` === HOME_FLAGSHIP_HREF)?.title ??
  "the AI jobs map";

const SECTIONS = [
  { id: "why", label: "Why it exists" },
  { id: "principles", label: "Principles" },
  { id: "read-a-map", label: "Reading a map" },
  { id: "how-maps-are-made", label: "How maps are made" },
  { id: "faq", label: "Questions" },
  { id: "contribute", label: "Contribute" },
];

const MEASURED = [
  {
    key: "rent",
    title: "A rent-control thread",
    body: (
      <p>
        Written to mirror a real city-forum fight before a vote. The people in
        it agreed on every fact in the thread, and disagreed on one value and
        one policy detail.
      </p>
    ),
  },
  {
    key: "panel",
    title: "A four-minute TV panel on immigration",
    body: (
      <p>
        A calibrated model put the chance that the two guests meant different
        things by one word, &ldquo;culture&rdquo;, at 89%. Almost everything
        else they said was common ground neither of them noticed.
      </p>
    ),
  },
  {
    key: "debate",
    title: "A 36-minute TV debate on trans athletes",
    body: (
      <p>
        88 of 114 turns were not about the question in the title. The claim
        the evidence actually turns on was never argued.
      </p>
    ),
  },
  {
    key: "library",
    title: "Our own library",
    body: (
      <p>
        Three maps had their evidence labelled for and against the wrong
        framing of the claim. The team frame was in our own data too. We fixed
        them, and built a check for every card we add.
      </p>
    ),
  },
];

const PRINCIPLES = [
  {
    key: "crux",
    title: "Crux over verdict.",
    body: (
      <p>
        Wisdom is knowing what would change your mind. The spine of every map
        is the crux, a question that would move one side or the other once it
        is answered, and what would settle it. A ruling on a hard question can
        rest on one judgment call about one piece of evidence. A record of
        which cruxes moved, and what moved them, is more honest and more
        useful.
      </p>
    ),
  },
  {
    key: "winner",
    title: "Never a winner, always the other side’s best card.",
    body: (
      <p>
        No map and no tool on this site names a winner. Each map sets the
        strongest evidence one side reads beside the strongest the other side
        reads, and writes every position so that the people who hold it would
        say: yes, that is what we believe. This is a rule, not a setting. The
        pull toward naming a winner is strongest exactly when a tool feels
        most sure.
      </p>
    ),
  },
  {
    key: "voluntary",
    title: "Voluntary before imposed.",
    body: (
      <p>
        Argumend works on the arguments people bring to it: the maps here, or a
        thread you paste because you are in it. It does not reach into other
        people&rsquo;s conversations to tell them what they are really fighting
        about.
      </p>
    ),
  },
];

// The four steps /how-it-works carried, in its own words (steps 1–3), with
// "topic" read as "map" and step 4 pointed at the diagram as it now exists.
const STEPS = [
  {
    key: "pick",
    title: "Pick a map",
    body: (
      <p>
        Browse the <Link href="/topics" className={PROSE_LINK}>maps</Link> and
        choose a question. Each one opens as a page you can read top to bottom.
      </p>
    ),
  },
  {
    key: "cruxes",
    title: "Read the cruxes",
    body: (
      <p>
        Each map lists its cruxes: the specific questions the sides actually
        disagree about. Under each one, &ldquo;What would settle it&rdquo;
        names the evidence or test that could move it.
      </p>
    ),
  },
  {
    key: "moved",
    title: "See how it has moved",
    body: (
      <p>
        Where a crux has a history, &ldquo;How this has moved&rdquo; is a dated
        record of it: open, narrowed, resolved, or unresolvable by evidence,
        and what changed each time. It records movement, not a winner.
      </p>
    ),
  },
  {
    key: "diagram",
    title: "Open the diagram if you want more",
    body: (
      <p>
        Most maps also have an interactive diagram. Pan and zoom through
        positions, objections, and evidence, and trace each claim to its
        source.
      </p>
    ),
  },
];

const CONTRIBUTE = [
  {
    key: "correction",
    title: "Suggest a correction",
    body: (
      <p>
        A card filed on the wrong side, a source that does not say what its
        card says, a position its own holders would not recognise, or a crux
        that has moved. Open an issue with the map&rsquo;s address and your
        source.
      </p>
    ),
  },
  {
    key: "weighting",
    title: "Challenge a weighting",
    body: (
      <p>
        Think a card carries too much weight, or too little? Say which of the
        four measures is off and why, with citations.
      </p>
    ),
  },
  {
    key: "map",
    title: "Suggest a map",
    body: (
      <p>
        A contested question with serious arguments on more than one side, and
        a crux you could actually test.
      </p>
    ),
  },
];

export default function AboutPage() {
  return (
    <AppShell layout="reading">
      <article className={STORY_CONTAINER}>
        <StoryHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
          eyebrow="About Argumend"
          title="Disagree better."
          lede="Argumend maps hard questions around what would change a mind, never around who won. This page is the whole story: why it exists, the rules it keeps, how to read a map, how maps are made, and how to help."
        >
          <OnThisPage items={SECTIONS} />
        </StoryHeader>

        <StorySection id="why" title="Why it exists">
          <div className={PROSE}>
            <p>
              Most arguments are not about what they seem. Two people who sound
              as if they disagree about the world often agree on nearly every
              fact in front of them. What splits them is one value, one word
              used two ways, or one question neither has said out loud.
            </p>
            <p>
              Argumend exists to close that gap: between how much people think
              they disagree and how much they actually do. It is the gap outrage
              feeds on, and it can be measured.
            </p>
          </div>

          <h3 className="label-caps mt-8">What we found when we measured it</h3>
          <div className="mt-2">
            <RuledList items={MEASURED} />
          </div>
          <p className="mt-2">
            <Link href={HOME_EVIDENCE_HREF} className={TEXT_ACTION}>
              The full write-up, with its caveats
            </Link>
          </p>

          <div className={`${PROSE} mt-6`}>
            <p>
              The goal is not to end argument. Arguments are how a society finds
              things out. The goal is to end the counterfeit one: the argument
              that feels like a disagreement about the world and is not.
            </p>
            <p>
              That is what the name means. It reads both ways, argum-end and
              argu-mend: end the counterfeit argument, and mend how we talk to
              each other, so that people can look for wisdom rather than a side.
            </p>
          </div>
        </StorySection>

        <StorySection id="principles" title="Three principles">
          <RuledList items={PRINCIPLES} numbered />
        </StorySection>

        <StorySection id="read-a-map" title="How to read a map" lede="No account needed.">
          <RuledList items={STEPS} numbered />
          <p className="mt-4">
            <Link href={HOME_FLAGSHIP_HREF} className={TEXT_ACTION}>
              Try it on {flagshipTitle}
            </Link>
          </p>
        </StorySection>

        <StorySection id="how-maps-are-made" title="How maps are made">
          <div className={PROSE}>
            <p>
              Every card of evidence is weighed on four things: how reliable its
              source is, how independent it is, whether it has been replicated,
              and how directly it bears on the claim. It is filed by what it
              shows, not by who cites it. On the newer maps, a deterministic
              engine ranks the cruxes by asking which claims, if settled, would
              move the positions furthest apart. Each crux says what would
              settle it, or says plainly that no evidence can.
            </p>
          </div>
          <p className="mt-4">
            <Link href="/methodology" className={TEXT_ACTION}>
              How maps are made, step by step
            </Link>
          </p>
        </StorySection>

        <StorySection id="faq" title="Questions">
          <div className={PROSE}>
            <p>Short answers to the questions people ask most.</p>
          </div>
          <p className="mt-2">
            <Link href="/faq" className={TEXT_ACTION}>
              Read the questions
            </Link>
          </p>
        </StorySection>

        <StorySection id="contribute" title="Contribute">
          <div className={PROSE}>
            <p>
              Argumend is open source, and any map can be wrong. Contributions
              happen on GitHub.
            </p>
          </div>
          <div className="mt-6">
            <RuledList items={CONTRIBUTE} />
          </div>
          <p className="mt-4">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={TEXT_ACTION}>
              Open Argumend on GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </StorySection>
      </article>
    </AppShell>
  );
}
