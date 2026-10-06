import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import type { ComponentProps } from "react";
import type { DiagramNode as DiagramNodeModel } from "@/lib/diagram/model";
import { NODE_SIZE } from "@/lib/diagram/layout";

vi.mock("@xyflow/react", () => ({
  Handle: (props: { id?: string }) => <span data-testid={`handle-${props.id}`} />,
  Position: { Top: "top", Right: "right", Bottom: "bottom", Left: "left" },
}));

import { ActiveDiagramNode, DiagramNode } from "./DiagramNode";

const NODES: DiagramNodeModel[] = [
  {
    kind: "question",
    id: "question",
    label: "Should nuclear power be expanded to fight climate change?",
    agreementHeading: "What both sides already agree on",
    agreement: [],
  },
  {
    kind: "crux",
    id: "crux-safety",
    parentId: "question",
    number: 1,
    label: "Do nuclear's tail risks outweigh the deaths it prevents?",
    kicker: "Safety Record",
    settle: { mode: "evidence", resolved: false, condition: "A full accounting." },
    runIns: [],
    test: { title: "Deaths per TWh", methodology: "Aggregate." },
    pageHref: "/topics/nuclear-energy-safety#crux-safety",
  },
  {
    kind: "side",
    id: "crux-safety--skeptics",
    parentId: "crux-safety",
    side: "skeptics",
    heading: "Skeptics",
    label: "Average death rates understate low-probability risk.",
    lead: "Safety Record",
    text: "Average death rates understate low-probability risk. More text.",
  },
  {
    kind: "evidence",
    id: "crux-safety--supporters--deaths",
    parentId: "crux-safety--supporters",
    side: "for",
    label: "Deaths per TWh comparison",
    description: "Nuclear causes 0.03 deaths per TWh.",
  },
];

type Props = ComponentProps<typeof DiagramNode>;
const props = (node: DiagramNodeModel) => ({ id: node.id, data: { node } }) as unknown as Props;

describe("DiagramNode", () => {
  afterEach(cleanup);

  it.each(NODES)("draws the $kind box at its layout size, with its label and nothing else", (node) => {
    const view = render(<DiagramNode {...props(node)} />);
    const box = view.container.firstElementChild as HTMLElement;
    expect(box.style.width).toBe(`${NODE_SIZE[node.kind].width}px`);
    expect(box.style.height).toBe(`${NODE_SIZE[node.kind].height}px`);
    expect(view.container.textContent).toContain(node.label);
    expect(view.container.querySelector("img, button, a")).toBeNull();
    expect(view.container.textContent).not.toMatch(/\/40|\d+%|Leaf|Thesis|Meta Claim/);
  });

  it("keeps crimson for the crux alone", () => {
    for (const node of NODES) {
      const view = render(<DiagramNode {...props(node)} />);
      const crimson = /\b(?:border-l-crux|text-crux-text)\b/.test(view.container.innerHTML);
      expect(crimson, node.kind).toBe(node.kind === "crux");
      view.unmount();
    }
  });

  it("outlines the box whose detail is open", () => {
    const [question] = NODES;
    const idle = render(<DiagramNode {...props(question)} />);
    expect(idle.container.innerHTML).not.toContain("border-deep/60");
    idle.unmount();
    const open = render(
      <ActiveDiagramNode.Provider value={question.id}>
        <DiagramNode {...props(question)} />
      </ActiveDiagramNode.Provider>,
    );
    expect(open.container.innerHTML).toContain("border-deep/60");
  });
});
