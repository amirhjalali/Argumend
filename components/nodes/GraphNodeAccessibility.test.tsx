import "@/test/setup-dom";
import type { ComponentProps } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";

const graph = vi.hoisted(() => ({
  expandedNodes: {} as Record<string, boolean>,
  evidenceLoadedNodes: {} as Record<string, boolean>,
  expandNode: vi.fn(),
  collapseNode: vi.fn(),
  openCrux: vi.fn(),
  loadEvidence: vi.fn(),
}));

vi.mock("@/hooks/useLogicGraph", () => ({
  useLogicGraph: (selector: (state: typeof graph) => unknown) => selector(graph),
}));
vi.mock("@xyflow/react", () => ({
  Handle: (props: { id?: string; "aria-hidden"?: boolean | "true" | "false"; tabIndex?: number }) => (
    <span
      data-testid={`handle-${props.id}`}
      aria-hidden={props["aria-hidden"]}
      tabIndex={props.tabIndex}
    />
  ),
  Position: { Top: "top", Right: "right", Bottom: "bottom", Left: "left" },
}));
vi.mock("next/image", () => ({ default: () => null }));
vi.mock("@/components/InteractiveContent", () => ({ InteractiveContent: () => null }));
vi.mock("@/components/CitationCard", () => ({ CitationCard: () => null }));
vi.mock("@/components/ConfidenceGauge", () => ({ ConfidenceGauge: () => null }));

import { MetaNode } from "./MetaNode";
import { RichNode } from "./RichNode";
import { EvidenceNode } from "./EvidenceNode";

describe("graph node controls", () => {
  beforeEach(() => {
    graph.expandedNodes = {};
    graph.evidenceLoadedNodes = {};
    graph.expandNode.mockReset();
    graph.collapseNode.mockReset();
    graph.openCrux.mockReset();
    graph.loadEvidence.mockReset();
  });

  afterEach(cleanup);

  it("gives expansion actions node-specific state and hides connection handles", () => {
    const props = {
      id: "root",
      data: { variant: "meta", title: "Root claim", hasChildren: true },
    } as unknown as ComponentProps<typeof MetaNode>;
    const view = render(<MetaNode {...props} />);
    const expand = view.getByRole("button", { name: "Expand Root claim" });

    expect(expand.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(expand);
    expect(graph.expandNode).toHaveBeenCalledWith("root");
    for (const handle of view.getAllByTestId(/handle-/)) {
      expect(handle.getAttribute("aria-hidden")).toBe("true");
      expect(handle.getAttribute("tabindex")).toBe("-1");
    }

    graph.expandedNodes.root = true;
    view.rerender(
      <MetaNode
        {...({
          id: "root",
          data: { variant: "meta", title: "Root claim", hasChildren: true },
        } as unknown as ComponentProps<typeof MetaNode>)}
      />
    );
    fireEvent.click(view.getByRole("button", { name: "Collapse Root claim" }));
    expect(graph.collapseNode).toHaveBeenCalledWith("root");
  });

  it("keeps load-evidence state focusable and labels crux actions as dialogs", () => {
    const pillarProps = {
      id: "pillar-1",
      data: {
        variant: "pillar",
        title: "Behavioral evidence",
        hasChildren: true,
        hasEvidence: true,
      },
    } as unknown as ComponentProps<typeof RichNode>;
    const view = render(<RichNode {...pillarProps} />);
    const load = view.getByRole("button", { name: "Load evidence for Behavioral evidence" });

    expect(load.getAttribute("aria-disabled")).toBe("false");
    fireEvent.click(load);
    expect(graph.loadEvidence).toHaveBeenCalledWith("pillar-1");

    graph.evidenceLoadedNodes["pillar-1"] = true;
    view.rerender(
      <RichNode
        {...({
          id: "pillar-1",
          data: {
            variant: "pillar",
            title: "Behavioral evidence",
            hasChildren: true,
            hasEvidence: true,
          },
        } as unknown as ComponentProps<typeof RichNode>)}
      />
    );
    const loaded = view.getByRole("button", { name: "Evidence loaded for Behavioral evidence" });
    loaded.focus();
    expect(document.activeElement).toBe(loaded);
    expect(loaded.getAttribute("aria-disabled")).toBe("true");
    fireEvent.click(loaded);
    expect(graph.loadEvidence).toHaveBeenCalledTimes(1);

    const cruxProps = {
      id: "crux-1",
      data: {
        variant: "crux",
        title: "The decisive test",
        detail: {
          description: "What would decide it?",
          methodology: "Run the test",
          status: "theoretical",
          cost: "$1M",
        },
      },
    } as unknown as ComponentProps<typeof RichNode>;
    view.rerender(<RichNode {...cruxProps} />);
    const open = view.getByRole("button", { name: "Open crux details for The decisive test" });
    expect(open.getAttribute("aria-haspopup")).toBe("dialog");
    fireEvent.click(open);
    expect(graph.openCrux).toHaveBeenCalledWith("crux-1");
  });

  it("keeps evidence sources actionable while silencing decorative handles", () => {
    const view = render(
      <EvidenceNode
        {...({
          id: "evidence-1",
          data: {
            variant: "evidence",
            title: "Replicated result",
            description: "A replicated finding.",
            side: "for",
            score: 32,
            source: "Example study",
            sourceUrl: "https://example.com/study",
          },
        } as unknown as ComponentProps<typeof EvidenceNode>)}
      />
    );

    const source = view.getByRole("link", { name: "Example study (opens in a new tab)" });
    expect(source.getAttribute("target")).toBe("_blank");
    expect(view.getAllByTestId(/handle-/)).toHaveLength(4);
    expect(view.getAllByTestId(/handle-/).every((handle) => handle.getAttribute("aria-hidden") === "true")).toBe(true);
  });
});
