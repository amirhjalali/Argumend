import "@/test/setup-dom";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { loadTopicById } from "@/data/topicLoader";
import { buildDiagram, type DiagramModel } from "@/lib/diagram/model";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));
vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: "light" }) }));

// React Flow observes its container and nodes; happy-dom has no ResizeObserver.
class NoopResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= NoopResizeObserver as unknown as typeof ResizeObserver;

import DesktopCanvas from "./DesktopCanvas";

let diagram: DiagramModel;

beforeAll(async () => {
  diagram = buildDiagram((await loadTopicById("moon-landing"))!);
});

const flowNodes = () => Array.from(document.querySelectorAll<HTMLElement>(".react-flow__node"));

describe("DesktopCanvas", () => {
  afterEach(cleanup);

  it("draws one box per model node, in the model's reading order", () => {
    render(<DesktopCanvas diagram={diagram} />);
    expect(flowNodes().map((n) => n.dataset.id)).toEqual(diagram.nodes.map((n) => n.id));
  });

  it("makes every box a focusable, named button", () => {
    render(<DesktopCanvas diagram={diagram} />);
    for (const node of flowNodes()) {
      expect(node.tabIndex).toBe(0);
      expect(node.getAttribute("role")).toBe("button");
      expect(node.getAttribute("aria-label")).toBeTruthy();
      expect(node.getAttribute("aria-haspopup")).toBe("dialog");
      expect(node.className).toContain("focus-visible:ring-focus");
    }
    const [question, crux] = flowNodes();
    expect(question.getAttribute("aria-label")).toBe(`The question: ${diagram.nodes[0].label}`);
    expect(crux.getAttribute("aria-label")).toMatch(/^Crux 1 of \d+/);
  });

  it("opens a box's detail on Enter and closes it on Escape", async () => {
    render(<DesktopCanvas diagram={diagram} />);
    const crux = flowNodes().find((n) => n.dataset.id === diagram.nodes[1].id)!;
    crux.focus();
    fireEvent.keyDown(crux, { key: "Enter" });
    const dialog = await screen.findByRole("dialog");
    expect(dialog.textContent).toContain(diagram.nodes[1].label);

    await act(async () => {
      fireEvent.keyDown(document, { key: "Escape" });
    });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("opens a box's detail on click", async () => {
    render(<DesktopCanvas diagram={diagram} />);
    const evidence = diagram.nodes.find((n) => n.kind === "evidence")!;
    fireEvent.click(flowNodes().find((n) => n.dataset.id === evidence.id)!);
    expect((await screen.findByRole("dialog")).textContent).toContain(evidence.label);
  });
});
