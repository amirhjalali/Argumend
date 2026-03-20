import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Worksheet Data
// ---------------------------------------------------------------------------

interface Worksheet {
  id: string;
  title: string;
  subtitle: string;
  instructions: string;
  sections: {
    heading: string;
    description?: string;
    type: "lines" | "table" | "grid" | "numbered-list" | "two-column";
    lines?: number;
    rows?: { label: string; subLabel?: string }[];
    columns?: string[];
    items?: string[];
  }[];
}

const worksheets: Record<string, Worksheet> = {
  "argument-map-template": {
    id: "argument-map-template",
    title: "Argument Map Template",
    subtitle: "Map any debate with structured reasoning",
    instructions:
      "Use this template to map the structure of any argument or debate. Start with the main claim, then identify the key pillars of the argument, the evidence for and against each pillar, and the crux question that would resolve the debate.",
    sections: [
      {
        heading: "1. The Main Claim (Meta-Claim)",
        description: "What is the central claim being debated? Write it as a clear, testable statement.",
        type: "lines",
        lines: 3,
      },
      {
        heading: "2. Argument Pillars",
        description: "What are the 3-4 key lines of argument? Each pillar is a distinct reason for or against the claim.",
        type: "numbered-list",
        items: [
          "Pillar 1: _______________________________________________",
          "Pillar 2: _______________________________________________",
          "Pillar 3: _______________________________________________",
          "Pillar 4: _______________________________________________",
        ],
      },
      {
        heading: "3. For Each Pillar: Skeptic vs. Proponent",
        description: "Pick one pillar and write the strongest version of each side's argument.",
        type: "two-column",
        columns: ["What a Skeptic Would Say", "What a Proponent Would Say"],
      },
      {
        heading: "4. Evidence For the Claim",
        description: "List the strongest evidence supporting the main claim.",
        type: "numbered-list",
        items: [
          "Evidence 1: _____________________________________________ (Source: _____________)",
          "Evidence 2: _____________________________________________ (Source: _____________)",
          "Evidence 3: _____________________________________________ (Source: _____________)",
        ],
      },
      {
        heading: "5. Evidence Against the Claim",
        description: "List the strongest evidence opposing the main claim.",
        type: "numbered-list",
        items: [
          "Evidence 1: _____________________________________________ (Source: _____________)",
          "Evidence 2: _____________________________________________ (Source: _____________)",
          "Evidence 3: _____________________________________________ (Source: _____________)",
        ],
      },
      {
        heading: "6. The Crux Question",
        description: "What single question, if answered, would resolve this debate for most people?",
        type: "lines",
        lines: 3,
      },
      {
        heading: "7. Your Confidence Score",
        description: "After reviewing all evidence, how confident are you in the main claim? (0-100%)",
        type: "lines",
        lines: 2,
      },
    ],
  },

  "steel-man-challenge": {
    id: "steel-man-challenge",
    title: "Steel-Man Challenge Worksheet",
    subtitle: "Argue the strongest version of the other side",
    instructions:
      "A steel-man is the opposite of a straw-man: instead of weakening the opposing argument, you strengthen it. This worksheet guides you through constructing the most compelling version of a view you disagree with.",
    sections: [
      {
        heading: "1. Your Position",
        description: "State the topic and your current position on it clearly.",
        type: "lines",
        lines: 3,
      },
      {
        heading: "2. The Opposing Position",
        description: "State the opposing view in your own words. Be fair and accurate.",
        type: "lines",
        lines: 3,
      },
      {
        heading: "3. Why Someone Might Hold This View",
        description: "List at least 3 reasons why a reasonable, intelligent person would hold the opposing view.",
        type: "numbered-list",
        items: [
          "Reason 1: _______________________________________________",
          "Reason 2: _______________________________________________",
          "Reason 3: _______________________________________________",
        ],
      },
      {
        heading: "4. The Strongest Evidence for the Other Side",
        description: "What is the single most compelling piece of evidence or argument for the opposing view?",
        type: "lines",
        lines: 4,
      },
      {
        heading: "5. Steel-Manned Argument",
        description: "Now write the strongest possible argument for the opposing view. Imagine you are a skilled advocate for that position. Make it as persuasive as you can.",
        type: "lines",
        lines: 8,
      },
      {
        heading: "6. Reflection",
        description: "Answer honestly:",
        type: "numbered-list",
        items: [
          "Did this exercise change your confidence in your original position? How?",
          "_______________________________________________",
          "What is the strongest point the other side makes that you find genuinely difficult to counter?",
          "_______________________________________________",
          "On a scale of 0-100%, how confident are you now in your original position? (Before: ___% / After: ___%)",
        ],
      },
    ],
  },

  "evidence-evaluation-rubric": {
    id: "evidence-evaluation-rubric",
    title: "Evidence Evaluation Rubric",
    subtitle: "Score evidence across four dimensions",
    instructions:
      "For each piece of evidence, score it on four dimensions from 0 (lowest) to 10 (highest). The total score out of 40 tells you how much weight to give this evidence. Use this rubric to evaluate evidence from any source: news articles, research papers, personal testimony, or expert opinion.",
    sections: [
      {
        heading: "Scoring Guide",
        description: "Rate each dimension from 0 to 10.",
        type: "table",
        columns: ["Dimension", "What It Measures", "0 (Low)", "10 (High)"],
        rows: [
          { label: "Source Reliability", subLabel: "Track record, peer review, expertise of the source" },
          { label: "Independence", subLabel: "Free from conflicts of interest, corroborated by independent sources" },
          { label: "Replicability", subLabel: "Can others verify this? Has it been reproduced?" },
          { label: "Directness", subLabel: "How directly does this evidence address the specific claim?" },
        ],
      },
      {
        heading: "Evidence Item 1",
        description: "Title / Description: _______________________________________________",
        type: "grid",
        columns: ["Dimension", "Score (0-10)", "Reasoning"],
        rows: [
          { label: "Source Reliability" },
          { label: "Independence" },
          { label: "Replicability" },
          { label: "Directness" },
          { label: "TOTAL", subLabel: "/40" },
        ],
      },
      {
        heading: "Evidence Item 2",
        description: "Title / Description: _______________________________________________",
        type: "grid",
        columns: ["Dimension", "Score (0-10)", "Reasoning"],
        rows: [
          { label: "Source Reliability" },
          { label: "Independence" },
          { label: "Replicability" },
          { label: "Directness" },
          { label: "TOTAL", subLabel: "/40" },
        ],
      },
      {
        heading: "Evidence Item 3",
        description: "Title / Description: _______________________________________________",
        type: "grid",
        columns: ["Dimension", "Score (0-10)", "Reasoning"],
        rows: [
          { label: "Source Reliability" },
          { label: "Independence" },
          { label: "Replicability" },
          { label: "Directness" },
          { label: "TOTAL", subLabel: "/40" },
        ],
      },
      {
        heading: "Comparison & Reflection",
        description: "Which evidence item scored highest? Does the strongest evidence support or oppose the main claim?",
        type: "lines",
        lines: 4,
      },
    ],
  },

  "crux-finder": {
    id: "crux-finder",
    title: "Crux Finder Worksheet",
    subtitle: "Identify the question that would resolve the debate",
    instructions:
      "A 'crux' is the single question or piece of evidence that, if answered, would cause one or both sides of a debate to change their mind. Finding the crux transforms an endless argument into a focused investigation. Use these guided questions to find the crux of any disagreement.",
    sections: [
      {
        heading: "1. Define the Disagreement",
        description: "What are the two sides arguing about? State each position clearly.",
        type: "two-column",
        columns: ["Side A believes:", "Side B believes:"],
      },
      {
        heading: "2. Find Where They Agree",
        description: "List facts or principles that BOTH sides accept as true.",
        type: "numbered-list",
        items: [
          "Both agree that: _________________________________________",
          "Both agree that: _________________________________________",
          "Both agree that: _________________________________________",
        ],
      },
      {
        heading: "3. Find Where They Diverge",
        description: "What specific factual or value disagreement separates the two sides?",
        type: "lines",
        lines: 4,
      },
      {
        heading: "4. The Crux Test",
        description: "For each candidate crux below, ask: 'If we knew the answer to this question, would it change at least one side's mind?'",
        type: "numbered-list",
        items: [
          "Candidate 1: _____________________________________________ (Would it change minds? Yes / No)",
          "Candidate 2: _____________________________________________ (Would it change minds? Yes / No)",
          "Candidate 3: _____________________________________________ (Would it change minds? Yes / No)",
        ],
      },
      {
        heading: "5. The Crux",
        description: "Write the single most important crux question for this debate.",
        type: "lines",
        lines: 3,
      },
      {
        heading: "6. How Could We Resolve It?",
        description: "What evidence, experiment, or investigation would answer the crux question?",
        type: "numbered-list",
        items: [
          "Method: ________________________________________________",
          "Estimated difficulty: Easy / Medium / Hard / Impossible",
          "What would a definitive answer look like?",
          "_______________________________________________",
        ],
      },
      {
        heading: "7. Reflection",
        description: "Why is this crux more important than the other disagreements between the two sides?",
        type: "lines",
        lines: 4,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return Object.keys(worksheets).map((id) => ({ id }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const ws = worksheets[id];
  if (!ws) return { title: "Worksheet Not Found" };

  return {
    title: `${ws.title} — Argumend for Educators`,
    description: ws.instructions,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://argumend.org/for-educators/worksheets/${ws.id}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Render Helpers
// ---------------------------------------------------------------------------

function RenderLines({ count }: { count: number }) {
  return (
    <div className="space-y-4 mt-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border-b border-stone-300 dark:border-stone-600 h-8"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function RenderNumberedList({ items }: { items: string[] }) {
  return (
    <div className="space-y-3 mt-3">
      {items.map((item, i) => (
        <p key={i} className="text-base leading-relaxed pl-2">
          {item}
        </p>
      ))}
    </div>
  );
}

function RenderTwoColumn({ columns }: { columns: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 mt-3">
      {columns.map((col) => (
        <div key={col}>
          <p className="font-semibold text-sm mb-2">{col}</p>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border-b border-stone-300 dark:border-stone-600 h-8"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RenderGrid({
  columns,
  rows,
}: {
  columns: string[];
  rows: { label: string; subLabel?: string }[];
}) {
  return (
    <table className="w-full border-collapse mt-3">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="border border-stone-400 dark:border-stone-600 px-3 py-2 text-left text-sm font-semibold bg-stone-100 dark:bg-[#302e2a]"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <td className="border border-stone-400 dark:border-stone-600 px-3 py-2 text-sm font-medium">
              {row.label}
              {row.subLabel && (
                <span className="text-stone-500 ml-1">{row.subLabel}</span>
              )}
            </td>
            {columns.slice(1).map((col) => (
              <td
                key={col}
                className="border border-stone-400 dark:border-stone-600 px-3 py-3 min-h-[40px]"
              >
                &nbsp;
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function RenderTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: { label: string; subLabel?: string }[];
}) {
  return (
    <table className="w-full border-collapse mt-3">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="border border-stone-400 dark:border-stone-600 px-3 py-2 text-left text-sm font-semibold bg-stone-100 dark:bg-[#302e2a]"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <td className="border border-stone-400 dark:border-stone-600 px-3 py-2 text-sm font-medium">
              {row.label}
            </td>
            <td className="border border-stone-400 dark:border-stone-600 px-3 py-2 text-xs text-stone-600 dark:text-stone-400">
              {row.subLabel}
            </td>
            <td className="border border-stone-400 dark:border-stone-600 px-3 py-2 text-xs text-stone-500">
              Unreliable, no track record
            </td>
            <td className="border border-stone-400 dark:border-stone-600 px-3 py-2 text-xs text-stone-500">
              Peer-reviewed, expert consensus
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function WorksheetPage({ params }: PageProps) {
  const { id } = await params;
  const ws = worksheets[id];

  if (!ws) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1916]">
      {/* Print-optimized styles */}
      <style>{`
        @media print {
          body, html { background: white !important; }
          .worksheet-nav { display: none !important; }
          .worksheet-content { padding: 0 !important; max-width: 100% !important; }
          .worksheet-header { margin-bottom: 1rem !important; }
          h2 { font-size: 14pt !important; margin-top: 1rem !important; }
          table { font-size: 10pt !important; }
          .page-break { break-before: page; }
        }
        @media screen {
          .worksheet-content { max-width: 800px; margin: 0 auto; padding: 2rem 1.5rem; }
        }
      `}</style>

      {/* Navigation bar (hidden when printing) */}
      <nav className="worksheet-nav bg-[#f4f1eb] dark:bg-[#121210] border-b border-stone-200 dark:border-[#3d3a36] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/for-educators"
            className="text-sm text-deep hover:text-deep-dark transition-colors"
          >
            &larr; Back to Educator Resources
          </Link>
          <button
            type="button"
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm"
            data-print-button
          >
            Print Worksheet
          </button>
        </div>
      </nav>

      {/* Client-side print script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.querySelector('[data-print-button]')?.addEventListener('click',function(){window.print()})`,
        }}
      />

      {/* Worksheet content */}
      <div className="worksheet-content">
        {/* Header */}
        <header className="worksheet-header mb-8 pb-4 border-b-2 border-stone-800 dark:border-stone-400">
          <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-1">
            ARGUMEND &mdash; Educator Worksheet
          </p>
          <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
            {ws.title}
          </h1>
          <p className="text-base text-stone-600 dark:text-stone-400 italic">{ws.subtitle}</p>
        </header>

        {/* Student info */}
        <div className="grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-stone-300 dark:border-stone-600">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              Name
            </p>
            <div className="border-b border-stone-400 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              Date
            </p>
            <div className="border-b border-stone-400 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              Topic
            </p>
            <div className="border-b border-stone-400 h-6" />
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8 bg-stone-50 dark:bg-[#252420] border border-stone-200 dark:border-[#3d3a36] rounded-lg p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Instructions
          </p>
          <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            {ws.instructions}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {ws.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
                {section.heading}
              </h2>
              {section.description && (
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-2">
                  {section.description}
                </p>
              )}

              {section.type === "lines" && (
                <RenderLines count={section.lines ?? 3} />
              )}
              {section.type === "numbered-list" && section.items && (
                <RenderNumberedList items={section.items} />
              )}
              {section.type === "two-column" && section.columns && (
                <RenderTwoColumn columns={section.columns} />
              )}
              {section.type === "grid" && section.columns && section.rows && (
                <RenderGrid columns={section.columns} rows={section.rows} />
              )}
              {section.type === "table" && section.columns && section.rows && (
                <RenderTable columns={section.columns} rows={section.rows} />
              )}
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-10 pt-4 border-t border-stone-300 dark:border-stone-600 text-center">
          <p className="text-xs text-stone-400">
            argumend.org/for-educators &mdash; Free for classroom use
          </p>
        </footer>
      </div>
    </div>
  );
}
