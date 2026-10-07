import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { OnThisPage, PROSE, PROSE_LINK, RuledList, STORY_SECTION } from "@/components/story/StoryParts";
import { PageContainer, PageHeader, Section, TextAction } from "@/components/ui";
import { HOME_EVIDENCE_HREF, HOME_FLAGSHIP_HREF, numberWord } from "@/components/home/homeModel";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { evidenceCitationStats } from "@/data/corpusStats";
import { TOPIC_COUNT } from "@/data/topicIndex";

/**
 * /methodology: "How maps are made". Every sentence describes something the
 * code or the data does today. Where to check each one:
 *
 *  - positions, claims, evidence, provenance, weight basis:
 *    docs/ARGUMENT_MODEL.md, data/topics/drafts/*.draft.json
 *  - the four evidence measures: lib/evidenceMetrics.ts
 *  - side = for or against the map's claim; the audit:
 *    docs/reviews/2026-09-21-evidence-side-adjudication.md, scripts/jev-probe/expF-side-audit.ts
 *  - crux ranking and "what would settle it": docs/CRUX_ENGINE.md, lib/crux,
 *    components/argument/DebateView.tsx (SettleAnswer)
 *  - the crux ledger and its review gate: lib/argument/ledger.ts (isPublicEntry)
 *  - the one-line reading the two-sided maps no longer print:
 *    lib/schemas/topic.ts (computeBalance, computeWeight)
 *
 * The four-judge council, score aggregation and the verdict matrix this page
 * used to describe are not how any map is made (the judging API is off by
 * default), so they are gone.
 */

const newerMapCount = argumentTopicIndex.length;
const flagshipTitle =
  argumentTopicIndex.find((topic) => `/topics/${topic.id}` === HOME_FLAGSHIP_HREF)?.title ??
  "Will AI cause mass unemployment?";

const SECTIONS = [
  { id: "positions-and-evidence", label: "Positions and evidence" },
  { id: "weighing", label: "Weighing a card" },
  { id: "side-audit", label: "Filing a card" },
  { id: "cruxes", label: "Finding the cruxes" },
  { id: "ledger", label: "The crux ledger" },
  { id: "older-maps", label: "The reading we removed" },
  { id: "limits", label: "What this cannot do" },
];

const MEASURES = [
  {
    key: "reliability",
    title: "Source reliability",
    body: <p>Track record, peer review, and recognised expertise in the field.</p>,
  },
  {
    key: "independence",
    title: "Independence",
    body: (
      <p>
        Free of conflicts of interest, and corroborated by people with no stake
        in the result.
      </p>
    ),
  },
  {
    key: "replicability",
    title: "Replicability",
    body: <p>Whether others can check the result, and whether anyone has reproduced it.</p>,
  },
  {
    key: "directness",
    title: "Directness",
    body: <p>How directly the finding bears on the specific claim it is filed under.</p>,
  },
];

const SETTLE_KINDS = [
  {
    key: "evidence",
    title: "Evidence that exists, or will",
    body: (
      <p>
        A study, a dataset or an observation that would move the claim, named
        as concretely as the map can name it.
      </p>
    ),
  },
  {
    key: "terms",
    title: "Agreement on terms, or on who decides",
    body: (
      <p>
        Some cruxes close only when the sides agree what a word means, or who
        gets to decide. The map says which.
      </p>
    ),
  },
  {
    key: "values",
    title: "Nothing does",
    body: (
      <p>
        A difference in values is not settled by evidence, and the map says so
        plainly and keeps both sides of it.
      </p>
    ),
  },
];

export default function MethodologyPage() {
  const { withUrl, total } = evidenceCitationStats;

  return (
    <AppShell layout="reading">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "How maps are made",
          description:
            "How Argumend maps are made: where positions and evidence come from, how each card is weighed and filed, how cruxes are found, and how their movement is recorded.",
          url: "https://argumend.org/methodology",
          isPartOf: {
            "@type": "WebSite",
            name: "ARGUMEND",
            url: "https://argumend.org",
          },
        }}
      />
      <PageContainer width="reading" as="article">
        <PageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "How maps are made" },
          ]}
          eyebrow="Method"
          title="How maps are made"
          lede="What happens between a hard question and a map of it: where the positions and evidence come from, how each card is weighed and filed, how the cruxes are found, and how their movement is recorded. Every step is a judgment, written down so you can check it."
        >
          <OnThisPage items={SECTIONS} />
        </PageHeader>

        <Section className={STORY_SECTION} id="positions-and-evidence" title="Positions and evidence">
          <div className={PROSE}>
            <p>
              A map starts from the serious positions on a question: stances real
              people hold. Maps come in two shapes. Four-position maps,{" "}
              {numberWord(newerMapCount)} so far, set out four stances side by
              side. Two-sided maps, the other {TOPIC_COUNT}, set a
              skeptic&rsquo;s strongest case against the best reply, section by
              section. Every position is written in the strongest form its
              holders would recognise, and on the four-position maps each
              carries a note on why that version is the strongest.
            </p>
            <p>
              On the four-position maps, under the positions sit the claims
              they rest on, each marked as a question of fact, a prediction, a matter of
              values, a matter of definition, or a question of who decides.
              Evidence is attached to the claims it bears on. Every card names
              its source; on the four-position maps each card also records
              whether its link was checked and, where it matters, the
              source&rsquo;s own stake in the result.{" "}
              {withUrl.toLocaleString("en-US")} of the{" "}
              {total.toLocaleString("en-US")} cards on the two-sided maps link
              to their source.
            </p>
            <p>
              A language model drafts the first version of a four-position map from a
              set of research reports on the question, and every node records
              where it came from. Each draft is then audited before it is
              published: its source links checked, its headline facts
              spot-checked against the primary source, its positions read for
              fairness, and corrected where it was wrong.
            </p>
          </div>
        </Section>

        <Section
          className={STORY_SECTION}
          id="weighing"
          title="Weighing a card"
          lede="Each card is rated on four measures."
        >
          <RuledList items={MEASURES} />
          <div className={`${PROSE} mt-6`}>
            <p>
              These are judgments, not measurements. On the two-sided maps one
              annotator rated every card. On the four-position maps a card is
              weighed only where someone could write down why, and each rating
              carries that written reason.
            </p>
          </div>
        </Section>

        <Section className={STORY_SECTION} id="side-audit" title="Filing a card by what it shows">
          <div className={PROSE}>
            <p>
              Every card is filed for or against the map&rsquo;s central claim by
              what it shows, not by who cites it. A study one side likes to
              quote can still cut against that side&rsquo;s claim, and the card
              goes where the finding points.
            </p>
            <p>
              A calibrated classifier (TypeSafe AI&rsquo;s Jev) checks the filing
              of every card, and a person reads every card it flags before
              anything changes. The classifier is a flag, not a ruling. Its first
              full pass found three maps whose cards had been filed against the
              wrong framing of the claim; they were corrected, and the check now
              sits next to the map data, to run on every card we add.{" "}
              <Link href={HOME_EVIDENCE_HREF} className={PROSE_LINK}>
                The write-up
              </Link>{" "}
              has the details.
            </p>
          </div>
        </Section>

        <Section className={STORY_SECTION} id="cruxes" title="Finding the cruxes">
          <div className={PROSE}>
            <p>
              A crux is the question a fight turns on, and what would settle
              it. On a map, that is a claim that is genuinely contested and
              whose answer would move the positions apart: settle it one way
              and some positions gain while others lose. Hidden assumptions count too,
              the claims nobody says out loud but the positions lean on.
            </p>
            <p>
              On the four-position maps, a model does not pick the cruxes. A
              deterministic engine takes each contested claim, supposes it
              settled true and then false, and measures how far each position
              would move and whether they would move apart or together. The
              ranking comes out the same every time it runs. One input is still
              a judgment: how contested each claim is, which is set when the map
              is drafted and reviewed. Editors can pin or set aside a crux, and
              must write down why.
            </p>
            <p>Every crux then says what would settle it, in one of three ways:</p>
          </div>
          <div className="mt-6">
            <RuledList items={SETTLE_KINDS} />
          </div>
          <div className={`${PROSE} mt-6`}>
            <p>
              On the two-sided maps, each section names its own crux, written by the
              editors: the test that would settle it, whether that test has been
              run, and, on many, what would change each side&rsquo;s mind.
            </p>
          </div>
        </Section>

        <Section className={STORY_SECTION} id="ledger" title="The crux ledger">
          <div className={PROSE}>
            <p>
              On the AI maps, each crux keeps a dated ledger: when it was open,
              when new evidence narrowed it, whether it resolved, or whether it
              turned out that no evidence can settle it, and what moved it each
              time. Editors write the entries. A model may propose one, but
              nothing reaches the page until a person has reviewed it. The
              ledger records movement, not a winner.
            </p>
          </div>
          <p className="mt-4">
            <TextAction href={`${HOME_FLAGSHIP_HREF}#cruxes`}>
              See the ledger on {flagshipTitle}
            </TextAction>
          </p>
        </Section>

        <Section className={STORY_SECTION} id="older-maps" title="The reading we removed">
          <div className={PROSE}>
            <p>
              The two-sided maps once printed a one-line reading of where their
              cards tipped. It read as a verdict, so it was removed.
            </p>
          </div>
        </Section>

        <Section className={STORY_SECTION} id="limits" title="What this cannot do">
          <div className={PROSE}>
            <p>
              A map is not a fact-check, and it does not say which side is
              correct. Card weights are one reader&rsquo;s judgment. The side
              audit is a flag for a person to read, not a ruling. The crux
              engine is only as good as the claims and links it is given. Every
              one of these can be wrong, and each is written down so that you
              can say where.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6">
            <TextAction href={HOME_FLAGSHIP_HREF}>
              Read a map: {flagshipTitle}
            </TextAction>
            <TextAction href="/about#contribute">
              Suggest a correction
            </TextAction>
          </div>
        </Section>
      </PageContainer>
    </AppShell>
  );
}
