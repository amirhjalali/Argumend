import Link from "next/link";
import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { Button, TextAction } from "@/components/ui/Button";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ANALYZE_HREF } from "@/lib/nav";
import { LEARN_HUB_HREF } from "@/lib/learn/sections";
import { mapLinkFor, type MapLink } from "@/lib/learn/nextStep";

/** What students practise. Each is something the maps are built around. */
const benefits = [
  {
    title: "Reading both sides",
    description:
      "Students see the strongest case on each side of a question laid out together, with every claim tied to evidence. No more “I feel that…” without a reason.",
  },
  {
    title: "Steel-manning",
    description:
      "Students learn to state the strongest version of a view they disagree with, well enough that someone who holds it would agree.",
  },
  {
    title: "Finding the crux",
    description:
      "Instead of talking past each other, students look for the specific question that would change minds. It is the skill that travels beyond the classroom.",
  },
  {
    title: "Saying what would change their mind",
    description:
      "Students name the evidence that would move them before they argue. A belief you can name a test for is a belief; one you cannot is a loyalty.",
  },
];

interface LessonPlan {
  title: string;
  duration: string;
  steps: readonly ReactNode[];
}

// `py-3` on an inline link: a 44px hit area that takes no space in the line.
const INLINE_LINK = "py-3 text-deep underline decoration-deep/30 underline-offset-2 dark:text-accent-text";

/** Seven lessons. None ends with a winner: each ends with what would settle it. */
const lessonPlans: readonly LessonPlan[] = [
  {
    title: "Introduction to argument maps",
    duration: "1 class period",
    steps: [
      "Read the nuclear energy map together as a class",
      "Identify the claim, the strongest case on each side, and the crux",
      "Students discuss: what evidence would change your mind?",
    ],
  },
  {
    title: "The steel-man challenge",
    duration: "2 class periods",
    steps: [
      "Students pick a topic they have strong opinions about",
      "Write the strongest argument for the other side",
      "Compare it with the steel-manned case on the Argumend map",
      "Reflection: did this change how you see the issue?",
    ],
  },
  {
    title: "Map your own disagreement",
    duration: "2–3 class periods",
    steps: [
      "Students bring in an article, podcast transcript or thread they disagree with",
      <>
        Paste it into the{" "}
        <Link href={ANALYZE_HREF} className={INLINE_LINK}>
          paste tool
        </Link>{" "}
        to see the positions and what they turn on
      </>,
      "Draw their own argument map from what they find",
      "Present the crux they found to the class",
    ],
  },
  {
    title: "Evidence weighting workshop",
    duration: "1–2 class periods",
    steps: [
      "Introduce the four evidence questions: reliability, independence, replicability, directness",
      "Students pick three evidence cards from any map and rate each question low, medium or high, writing down why",
      "Compare ratings across the class and discuss where and why they diverge",
      "Reflection: does weighting the evidence change which question matters most?",
    ],
  },
  {
    title: "Arguing only the crux",
    duration: "2 class periods",
    steps: [
      "Two teams take opposite sides of a contested question from an Argumend map",
      "Each team writes down what it believes is the crux: the single question that would settle the disagreement",
      "Teams argue only the crux, not the side arguments",
      "Each team states what evidence would move it; the class checks whether both teams named the same crux",
    ],
  },
  {
    title: "Media literacy through argument maps",
    duration: "2–3 class periods",
    steps: [
      "Students bring a news article, opinion piece or social media thread on a contested question",
      "Map its argument: what is the main claim, and what evidence supports it?",
      "Identify missing perspectives, logical gaps and unstated assumptions",
      "Compare it with the Argumend map on the same question",
    ],
  },
  {
    title: "What would change your mind?",
    duration: "1–2 class periods",
    steps: [
      "Before reading any evidence, students write where they stand on five contested questions and what would change their mind on each",
      "Read the map for each question, noting which cruxes and evidence cards bear on what they wrote",
      "Students revisit each answer: did the evidence they named turn up, and did their view move?",
      "Class discussion: which questions turned on facts and which on values, and what would settle each?",
    ],
  },
];

const worksheets = [
  {
    id: "argument-map-template",
    title: "Argument map template",
    description:
      "A blank template with space for the claim, the main lines of argument, the evidence on each side and the crux. Students can map any argument from scratch.",
  },
  {
    id: "steel-man-challenge",
    title: "Steel-man challenge",
    description:
      "Prompts that walk students through stating the strongest version of a view they disagree with.",
  },
  {
    id: "evidence-evaluation-rubric",
    title: "Evidence evaluation rubric",
    description:
      "A table of the four evidence questions (reliability, independence, replicability, directness) for rating evidence low, medium or high, with a line on why.",
  },
  {
    id: "crux-finder",
    title: "Crux finder",
    description:
      "Guided questions for finding the crux of any disagreement: the question the fight turns on, and what would settle it.",
  },
];

const mapsFor = (ids: readonly string[]): MapLink[] =>
  ids.flatMap((id) => {
    const link = mapLinkFor(id);
    return link ? [link] : [];
  });

const gradeLevels = [
  {
    label: "Middle school (grades 6–8)",
    description:
      "Questions that touch students’ own lives. A good way to introduce structured thinking and evidence.",
    maps: mapsFor(["school-phone-bans", "social-media-age-limits", "space-exploration-value"]),
  },
  {
    label: "High school (grades 9–12)",
    description: "Policy questions with real stakes, for government, economics and science courses.",
    maps: mapsFor(["ai-mass-unemployment", "nuclear-energy-safety", "climate-change", "gun-control-effectiveness"]),
  },
  {
    label: "Advanced and AP",
    description:
      "Deep philosophical and empirical questions for IB TOK, AP Seminar and advanced critical thinking courses.",
    maps: mapsFor(["free-will", "simulation-hypothesis", "consciousness-hard-problem", "reparations-slavery"]),
  },
];

const subjects = [
  {
    label: "IB Theory of Knowledge",
    description:
      "For TOK exhibitions and essays: students examine knowledge claims, explore real examples, and tell evidence from opinion.",
    maps: mapsFor(["simulation-hypothesis", "free-will"]),
  },
  {
    label: "AP Government and civics",
    description: "Real policy questions with structured evidence: students map the competing claims.",
    maps: mapsFor(["gun-control-effectiveness", "universal-basic-income"]),
  },
  {
    label: "A-Level critical thinking and science",
    description:
      "Contested empirical claims: students weigh evidence quality, spot fallacies and name what would change their mind.",
    maps: mapsFor(["nuclear-energy-safety", "lab-leak-theory"]),
  },
  {
    label: "English and media literacy",
    description:
      "Students identify rhetorical moves, spot straw men, and practise steel-manning in written analysis.",
    maps: mapsFor(["social-media-mental-health", "cancel-culture"]),
  },
];

const MAP_LINK =
  "inline-flex min-h-11 items-center rounded-sm font-sans text-sm text-deep underline decoration-deep/30 underline-offset-2 transition-colors hover:text-deep-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:text-accent-text";

function MapLinks({ maps }: { maps: readonly MapLink[] }) {
  return (
    <ul className="mt-1 flex flex-wrap gap-x-5">
      {maps.map((map) => (
        <li key={map.href}>
          <Link href={map.href} className={MAP_LINK}>
            {map.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ForEducatorsPage() {
  return (
    <AppShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Argumend for teachers",
          description:
            "Teach students how to disagree without destroying the conversation. Lesson plans, printable worksheets and maps for IB TOK, AP Government and more.",
          url: "https://argumend.org/for-educators",
          audience: { "@type": "EducationalAudience", educationalRole: "teacher" },
          isPartOf: { "@type": "WebSite", name: "ARGUMEND", url: "https://argumend.org" },
        }}
      />
      <PageContainer>
        <PageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Learn", href: LEARN_HUB_HREF },
            { label: "For teachers" },
          ]}
          eyebrow="Learn"
          title="For teachers"
          lede="Teach students how to disagree without destroying the conversation. Lesson plans and printable worksheets take them from “I feel that…” to the crux: the question that would change their mind."
          meta="Free, for any class that argues about contested questions."
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Button href="#printable-worksheets">Get printable worksheets</Button>
            <TextAction href="/topics">Browse classroom maps</TextAction>
          </div>
        </PageHeader>

        <div className="max-w-[44rem] space-y-14">
          <Section id="what-students-practise" title="What students practise">
            <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit.title}>
                  <dt className="font-serif text-xl text-primary">{benefit.title}</dt>
                  <dd className="mt-1 font-sans text-[0.9375rem] leading-relaxed text-secondary">
                    {benefit.description}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section
            id="lesson-plans"
            title="Lesson plans"
            lede="Seven lessons, ready to use with little preparation. Each ends with what would settle the question, never with a winner."
          >
            <ol className="border-b border-divider">
              {lessonPlans.map((plan, index) => (
                <li key={plan.title} className="border-t border-divider py-5 first:border-t-0 first:pt-0">
                  <h3 className="font-serif text-xl text-primary">
                    <span className="mr-2 text-muted">{index + 1}.</span>
                    {plan.title}
                  </h3>
                  <p className="mt-0.5 font-sans text-xs text-muted">{plan.duration}</p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 font-sans text-[0.9375rem] leading-relaxed text-secondary marker:text-muted">
                    {plan.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Section>

          <Section
            id="printable-worksheets"
            title="Printable worksheets"
            lede="Open one and print it: each is laid out for clean, ink-friendly printing."
          >
            <ul className="border-y border-divider">
              {worksheets.map((ws, index) => (
                <li key={ws.id} className={index > 0 ? "border-t border-divider" : undefined}>
                  <Link
                    href={`/for-educators/worksheets/${ws.id}`}
                    className="group block min-h-11 rounded-sm py-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  >
                    <span className="block font-serif text-lg leading-snug text-primary transition-colors group-hover:text-accent-text">
                      {ws.title}
                    </span>
                    <span className="mt-1 block font-sans text-sm leading-relaxed text-secondary">
                      {ws.description}
                    </span>
                    <span className="mt-1 block font-sans text-xs text-muted">Printable worksheet</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="maps-by-level" title="Maps by grade level" lede="Where to start, from accessible questions to advanced ones.">
            <div className="space-y-6">
              {gradeLevels.map((level) => (
                <div key={level.label}>
                  <h3 className="font-serif text-xl text-primary">{level.label}</h3>
                  <p className="mt-1 font-sans text-[0.9375rem] leading-relaxed text-secondary">{level.description}</p>
                  <MapLinks maps={level.maps} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="subjects" title="Fits the subjects you teach">
            <div className="space-y-6">
              {subjects.map((subject) => (
                <div key={subject.label}>
                  <h3 className="font-serif text-xl text-primary">{subject.label}</h3>
                  <p className="mt-1 font-sans text-[0.9375rem] leading-relaxed text-secondary">{subject.description}</p>
                  <MapLinks maps={subject.maps} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="next" title="Next step">
            <p className="font-sans text-[0.9375rem] leading-relaxed text-secondary">
              Every map is free and needs no account.
            </p>
            <div className="mt-2 flex flex-wrap gap-x-6">
              <TextAction href="/about#read-a-map">How to read a map</TextAction>
              <TextAction href={ANALYZE_HREF}>Try the paste tool on an argument</TextAction>
            </div>
          </Section>
        </div>
      </PageContainer>
    </AppShell>
  );
}
