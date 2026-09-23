import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { DebateView } from "./DebateView";
import {
  CruxMovementLedger,
  CruxMovementTrack,
  STANDING_DISAGREEMENT_LINE,
  standingLineFor,
} from "./CruxMovement";
import { identifyCruxes } from "@/lib/crux";
import { claimMovement, isPublicEntry } from "@/lib/argument/ledger";
import { workedExampleGraph } from "@/lib/argument/fixtures";
import type { ArgumentTopicMeta } from "@/lib/argument/draftTopics";
import type { CruxLedgerEntry } from "@/types/cruxLedger";

afterEach(() => cleanup());

const graph = workedExampleGraph();
const nodesById = new Map(graph.nodes.map((node) => [node.id, node]));
const editorial = { kind: "editorial" as const, curator: "Argumend editors", basis: "b" };

function entry(
  claimId: string,
  date: string,
  status: CruxLedgerEntry["status"],
  note: string,
  extra: Partial<CruxLedgerEntry> = {},
): CruxLedgerEntry {
  return {
    id: `ai-jobs:${claimId}:${date}:1`,
    topicId: "ai-jobs",
    claimId,
    date,
    status,
    evidenceNodeIds: [],
    note,
    author: editorial,
    createdAt: "2026-09-22",
    ...extra,
  };
}

const opened = entry("c2", "2024-05-01", "open", "Attribution rests on occupation-level declines.", {
  evidenceNodeIds: ["e1"],
});
const narrowed = entry("c2", "2025-04-10", "narrowed", "Half the postings decline predates ChatGPT.", {
  resolutionKind: "existing-evidence",
  evidenceNodeIds: ["e2"],
  noticedAt: "2026-09-01",
});
const resolved = entry("c2", "2026-08-20", "resolved", "A firm panel with adoption dates meets the condition.", {
  resolutionKind: "existing-evidence",
  evidenceNodeIds: ["e1", "e3"],
});
const fork = entry("c3", "2026-09-01", "unresolvable", "Picking a threshold is a decision about which harm counts.", {
  resolutionKind: "definitional-choice",
});

function ledgerFor(entries: CruxLedgerEntry[], claimId: string) {
  return render(
    <CruxMovementLedger movement={claimMovement(entries, claimId)} claimId={claimId} nodesById={nodesById} />,
  );
}

describe("CruxMovementLedger", () => {
  it("renders nothing for a claim with no public entries", () => {
    const { container } = ledgerFor([], "c2");
    expect(container.innerHTML).toBe("");
    const queued = entry("c2", "2026-01-01", "open", "Queued.", {
      author: {
        kind: "judgment",
        modelId: "m",
        promptVersion: "v",
        contentHash: "h",
        validator: "pass",
      },
    });
    expect(ledgerFor([queued], "c2").container.innerHTML).toBe("");
  });

  it("lists entries chronologically with dates, notes, and evidence citations", () => {
    ledgerFor([narrowed, opened], "c2");
    const section = screen.getByRole("region", { name: "How this has moved" });
    const rows = within(section).getAllByRole("listitem").filter((li) => li.dataset.status);
    expect(rows.map((row) => row.dataset.status)).toEqual(["open", "narrowed"]);
    expect(within(rows[0]).getByText("May 1, 2024").getAttribute("datetime")).toBe("2024-05-01");
    expect(within(rows[1]).getByText("Half the postings decline predates ChatGPT.")).toBeTruthy();
    // Evidence nodes the entry names, as expandable citations with the finding.
    expect(within(rows[1]).getByText("Indeed Hiring Lab")).toBeTruthy();
    expect(within(rows[1]).getByText(/half of postings decline pre-ChatGPT/)).toBeTruthy();
    expect(rows[1].id).toBe("ledger-ai-jobs-c2-2025-04-10-1");
    // Source date vs our ingest date, both shown.
    expect(within(rows[1]).getByText(/Added to the map Sep 1, 2026/)).toBeTruthy();
  });

  it("renders an ISO date as that calendar day in any server timezone", () => {
    const previous = process.env.TZ;
    try {
      for (const tz of ["America/Los_Angeles", "Pacific/Honolulu", "Pacific/Kiritimati"]) {
        process.env.TZ = tz;
        const first = entry("c2", "2025-02-01", "open", "Nothing has moved it.");
        ledgerFor([first], "c2");
        expect(screen.getByText("Feb 1, 2025"), tz).toBeTruthy();
        cleanup();
        render(<CruxMovementTrack movement={claimMovement([first], "c2")} />);
        expect(screen.getByText("Feb 2025"), tz).toBeTruthy();
        cleanup();
      }
    } finally {
      if (previous === undefined) delete process.env.TZ;
      else process.env.TZ = previous;
    }
  });

  it("trails an open or narrowed crux with its last movement date", () => {
    ledgerFor([opened, narrowed], "c2");
    expect(screen.getByText("No recorded movement since Apr 10, 2025.")).toBeTruthy();
    expect(screen.queryByText(STANDING_DISAGREEMENT_LINE)).toBeNull();
  });

  it("keeps an unresolvable crux on the page under the standing line for its kind", () => {
    // `fork` is a definitional fork, so its line names a definition, not values.
    ledgerFor([fork], "c3");
    expect(screen.getByText("Unresolvable by evidence")).toBeTruthy();
    expect(screen.getByText(standingLineFor("definitional-choice"))).toBeTruthy();
    expect(screen.queryByText(STANDING_DISAGREEMENT_LINE)).toBeNull();
    expect(screen.getByText("It turns on a choice of definition.")).toBeTruthy();
    expect(screen.getByTestId("crux-movement-tail")).toBeTruthy();
    expect(screen.queryByText(/No recorded movement/)).toBeNull();
  });

  it("keeps the engine's exact line for a value fork", () => {
    const valueFork = { ...fork, resolutionKind: "value-difference" as const };
    ledgerFor([valueFork], "c3");
    expect(screen.getByText(STANDING_DISAGREEMENT_LINE)).toBeTruthy();
  });

  it("dates the fork instead of repeating the line when the card already shows it", () => {
    render(
      <CruxMovementLedger
        movement={claimMovement([fork], "c3")}
        claimId="c3"
        nodesById={nodesById}
        standingLineShown
      />,
    );
    expect(screen.queryByText(standingLineFor("definitional-choice"))).toBeNull();
    expect(screen.getByText("No recorded movement since Sep 1, 2026.")).toBeTruthy();
    expect(screen.getByTestId("crux-movement-tail")).toBeTruthy();
  });

  it("says a shared ingest date once, under the history", () => {
    const a = { ...opened, noticedAt: "2026-09-22" };
    const b = { ...narrowed, noticedAt: "2026-09-22" };
    ledgerFor([a, b], "c2");
    expect(screen.getAllByText(/Added to the map Sep 22, 2026/)).toHaveLength(1);
  });

  it("ends a resolved crux's thread instead of mirroring the unresolvable ending", () => {
    const { container } = ledgerFor([opened, narrowed, resolved], "c2");
    expect(screen.getByText("Resolved")).toBeTruthy();
    expect(screen.getByText("Its stated condition was met.")).toBeTruthy();
    expect(screen.queryByTestId("crux-movement-tail")).toBeNull();
    expect(screen.queryByText(STANDING_DISAGREEMENT_LINE)).toBeNull();
    expect(container.querySelector('[data-mark="resolved"]')).not.toBeNull();
    expect(container.querySelector('[data-mark="unresolvable"]')).toBeNull();
  });

  it("uses no verdict aesthetics", () => {
    const markup = renderToStaticMarkup(
      <>
        <CruxMovementLedger movement={claimMovement([opened, narrowed, resolved], "c2")} claimId="c2" nodesById={nodesById} />
        <CruxMovementLedger movement={claimMovement([fork], "c3")} claimId="c3" nodesById={nodesById} />
      </>,
    );
    expect(markup).not.toMatch(/[✓✔✗✘☑☒✅❌]/);
    const visibleText = markup.replace(/<[^>]+>/g, " ");
    expect(visibleText).not.toMatch(/\b(winner|wins|won|true|false|correct|wrong|proven|debunked)\b/i);
    expect(markup).not.toMatch(/green|red-\d|emerald|amber|orange|yellow/);
  });

  it("names a single author once, and each author when they differ", () => {
    ledgerFor([opened, narrowed], "c2");
    expect(screen.getAllByText(/Recorded by Argumend editors/)).toHaveLength(1);
    cleanup();

    const reviewed = entry("c2", "2026-01-01", "open", "Still open after the new panel.", {
      author: {
        kind: "judgment",
        modelId: "m",
        promptVersion: "v",
        contentHash: "h",
        validator: "pass",
        reviewedBy: "A. Curator",
      },
    });
    ledgerFor([opened, reviewed], "c2");
    expect(screen.getByText(/Recorded by Argumend editors/)).toBeTruthy();
    expect(screen.getByText(/Proposed by a model, reviewed by A. Curator/)).toBeTruthy();
  });

  it("hides superseded entries and marks the correction", () => {
    const retracted = { ...narrowed, supersededBy: "ai-jobs:c2:2025-05-01:1" };
    const correction = entry("c2", "2025-05-01", "open", "The postings figure was revised; nothing moved.");
    ledgerFor([opened, retracted, correction], "c2");
    expect(screen.queryByText(narrowed.note)).toBeNull();
    expect(screen.getByText(/Corrects the entry of Apr 10, 2025/)).toBeTruthy();
  });
});

describe("CruxMovementTrack", () => {
  it("shows one mark per entry and the latest status with its month", () => {
    const { container } = render(<CruxMovementTrack movement={claimMovement([opened, narrowed], "c2")} />);
    expect(container.querySelectorAll("[data-mark]")).toHaveLength(2);
    expect(screen.getByText("Narrowed")).toBeTruthy();
    expect(screen.getByText("Apr 2025").getAttribute("datetime")).toBe("2025-04-10");
    expect(screen.getByText(/Latest movement/).classList.contains("sr-only")).toBe(true);
  });

  it("reads states as ongoing and events as dated", () => {
    render(<CruxMovementTrack movement={claimMovement([fork], "c3")} />);
    expect(screen.getByText("Unresolvable since")).toBeTruthy();
    cleanup();
    render(<CruxMovementTrack movement={claimMovement([opened], "c2")} />);
    expect(screen.getByText("Open since")).toBeTruthy();
  });

  it("renders nothing without entries", () => {
    expect(render(<CruxMovementTrack movement={[]} />).container.innerHTML).toBe("");
  });
});

describe("DebateView crux cards with a ledger", () => {
  const meta: ArgumentTopicMeta = {
    id: "ai-jobs",
    title: "Will AI cause mass unemployment?",
    tagline: "t",
    hook: "h",
    tldr: "tl;dr",
    highlights: [],
    takeaways: [],
  };
  const cruxes = identifyCruxes(graph);

  it("ranks the claims this fixture writes movement for", () => {
    expect(cruxes.map((crux) => crux.claimId)).toEqual(expect.arrayContaining(["c2", "c3"]));
  });

  it("renders byte-identical markup with an empty ledger (no empty-state clutter)", () => {
    const without = renderToStaticMarkup(<DebateView meta={meta} graph={graph} cruxes={cruxes} />);
    const empty = renderToStaticMarkup(<DebateView meta={meta} graph={graph} cruxes={cruxes} ledger={[]} />);
    expect(empty).toBe(without);
    expect(without).not.toContain("How this has moved");
    expect(without).not.toContain("crux-movement");
  });

  it("puts the track in the collapsed card and the ledger in the open card, per claim", () => {
    const { container } = render(
      <DebateView meta={meta} graph={graph} cruxes={cruxes} ledger={[opened, narrowed, fork]} />,
    );
    const cards = [...container.querySelectorAll("#cruxes > ol > li")];
    const byClaim = (claimId: string) =>
      cards.find((card) => card.querySelector(`#movement-${claimId}`)) as HTMLElement;

    const c2 = byClaim("c2");
    expect(within(c2.querySelector("summary")!).getByTestId("crux-movement-track")).toBeTruthy();
    expect(within(c2).getByText("No recorded movement since Apr 10, 2025.")).toBeTruthy();

    // The card leads with the fork's line once; the ledger inside it dates the
    // fork rather than printing the same line again.
    const c3 = byClaim("c3");
    expect(within(c3).getByText(standingLineFor("definitional-choice"))).toBeTruthy();
    expect(
      within(c3.querySelector("summary")!).getByText(standingLineFor("definitional-choice")),
    ).toBeTruthy();

    // Cards without entries stay exactly as they were.
    expect(container.querySelectorAll('[data-testid="crux-movement-ledger"]')).toHaveLength(2);
  });

  it("says what a correction corrects when given the page's input (public entries, superseded kept)", () => {
    const retracted = { ...narrowed, supersededBy: "ai-jobs:c2:2025-05-01:1" };
    const correction = entry("c2", "2025-05-01", "open", "The postings figure was revised; nothing moved.");
    // What app/topics/[id]/page.tsx passes: the loaded ledger minus the review queue.
    const pageInput = [opened, retracted, correction].filter(isPublicEntry);
    render(<DebateView meta={meta} graph={graph} cruxes={cruxes} ledger={pageInput} />);
    expect(screen.queryByText(narrowed.note)).toBeNull();
    expect(screen.getByText(/Corrects the entry of Apr 10, 2025/)).toBeTruthy();
  });

  it("never renders an unreviewed model proposal, even if one is passed in", () => {
    const queued = entry("c2", "2026-09-01", "narrowed", "An unreviewed proposal the page must not show.", {
      resolutionKind: "existing-evidence",
      evidenceNodeIds: ["e1"],
      author: { kind: "judgment", modelId: "m", promptVersion: "v", contentHash: "h", validator: "pass" },
    });
    render(<DebateView meta={meta} graph={graph} cruxes={cruxes} ledger={[opened, queued]} />);
    expect(screen.queryByText(queued.note)).toBeNull();
    expect(screen.getByText(opened.note)).toBeTruthy();
  });
});

describe("standingLineFor", () => {
  it("keeps the engine's exact line for a value fork and when the kind is unknown", () => {
    expect(standingLineFor("value-difference")).toBe(STANDING_DISAGREEMENT_LINE);
    expect(standingLineFor(undefined)).toBe(STANDING_DISAGREEMENT_LINE);
    expect(STANDING_DISAGREEMENT_LINE).toBe(
      "Nothing does — this is a standing value disagreement; the map holds both horns.",
    );
  });

  it("names the fork for definitional and who-decides cruxes", () => {
    expect(standingLineFor("definitional-choice")).toBe(
      "Nothing does — this turns on a choice of definition; the map holds both readings.",
    );
    expect(standingLineFor("authority-allocation")).toBe(
      "Nothing does — this turns on who should decide; the map holds both answers.",
    );
  });
});

describe("CruxMovementTrack as a timeline", () => {
  it("dates a standing state from the start of its run, and shows where the record starts", () => {
    const again = entry("c2", "2025-09-01", "open", "Still open after the replication.");
    render(<CruxMovementTrack movement={claimMovement([opened, again], "c2")} />);
    // Open since the first open entry, not the latest note; the start is not repeated.
    expect(screen.getByText("Open since")).toBeTruthy();
    expect(screen.getByText("May 2024").getAttribute("datetime")).toBe("2024-05-01");
    expect(screen.queryByText("Sep 2025")).toBeNull();
    cleanup();

    render(<CruxMovementTrack movement={claimMovement([opened, narrowed], "c2")} />);
    expect(screen.getByText(/May 2024/).getAttribute("datetime")).toBe("2024-05-01");
    expect(screen.getByText("Apr 2025").getAttribute("datetime")).toBe("2025-04-10");
  });
});

describe("DebateView crux entries lead with how each could close", () => {
  const base: ArgumentTopicMeta = {
    id: "ai-jobs",
    title: "Will AI cause mass unemployment?",
    tagline: "t",
    hook: "h",
    tldr: "tl;dr",
    highlights: [],
    takeaways: [],
  };
  const cruxes = identifyCruxes(graph);

  it("puts what would settle it, or the standing line, in the collapsed summary", () => {
    const { container } = render(
      <DebateView meta={base} graph={graph} cruxes={cruxes} ledger={[fork]} />,
    );
    const summaries = [
      ...container.querySelectorAll<HTMLElement>("#cruxes > ol > li > details > summary"),
    ];
    expect(summaries.length).toBe(cruxes.length);
    for (const summary of summaries) {
      expect(within(summary).getByText(/What (would settle|settled) it/)).toBeTruthy();
    }
    expect(container.querySelector('[data-settle="standing"]')?.textContent).toContain(
      standingLineFor("definitional-choice"),
    );
  });

  it("sorts the list in one sentence by how each question could close", () => {
    render(<DebateView meta={base} graph={graph} cruxes={cruxes} ledger={[fork]} />);
    const intro = screen.getByText(/Settle one and whole positions move\./);
    // The fixture's fork plus claims with no written condition.
    expect(intro.textContent).toMatch(/One cannot be settled by evidence, and \w+ ha(s|ve) no stated test yet\.$/);
    expect(intro.textContent).not.toMatch(/%|winner/i);
  });

  it("links to the living AI page from the two AI maps only", () => {
    render(<DebateView meta={{ ...base, id: "ai-mass-unemployment" }} graph={graph} cruxes={cruxes} />);
    const link = screen.getByRole("link", { name: "What has moved across the AI maps →" });
    expect(link.getAttribute("href")).toBe("/ai");
    expect(link.className).toContain("min-h-11");
    expect(link.className).not.toMatch(/rust|C4613C/i);
    cleanup();

    render(<DebateView meta={{ ...base, id: "us-israel-support" }} graph={graph} cruxes={cruxes} />);
    expect(screen.queryByRole("link", { name: /What has moved across the AI maps/ })).toBeNull();
  });
});
