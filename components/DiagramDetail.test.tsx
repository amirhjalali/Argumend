import "@/test/setup-dom";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { loadTopicById } from "@/data/topicLoader";
import { buildDiagram, type DiagramModel } from "@/lib/diagram/model";
import { DiagramDetail } from "./DiagramDetail";

let diagram: DiagramModel;

beforeAll(async () => {
  diagram = buildDiagram((await loadTopicById("nuclear-energy-safety"))!);
});

const nodeOf = (kind: DiagramModel["nodes"][number]["kind"]) => diagram.nodes.find((n) => n.kind === kind)!;

describe("DiagramDetail", () => {
  afterEach(cleanup);

  it("renders nothing while no box is open", () => {
    const view = render(<DiagramDetail model={diagram} node={null} onClose={() => {}} />);
    expect(view.container.innerHTML).toBe("");
  });

  it("is a labelled modal that closes on Escape", async () => {
    const onClose = vi.fn();
    const crux = nodeOf("crux");
    render(<DiagramDetail model={diagram} node={crux} onClose={onClose} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(crux.label);
    await act(async () => {
      fireEvent.keyDown(document, { key: "Escape" });
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows a crux the way the page's crux sheet does", () => {
    const crux = nodeOf("crux");
    if (crux.kind !== "crux") throw new Error("not a crux");
    render(<DiagramDetail model={diagram} node={crux} onClose={() => {}} />);
    const text = screen.getByRole("dialog").textContent ?? "";
    expect(text).toContain("What would settle it");
    expect(text).toContain(crux.settle.condition!.slice(0, 40));
    expect(text).toContain("The test");
    expect(text).toContain(crux.test.title);
    if (crux.flips) {
      expect(text).toContain("What would change the mind of someone who says yes to the map’s question");
      expect(text).toContain("What would change the mind of someone who says no to the map’s question");
    }
    const link = screen.getByRole("link", { name: /Open this crux on the map page/ });
    expect(link.getAttribute("href")).toBe(crux.pageHref);
  });

  it("gives a side its full case, under the crux it answers", () => {
    const side = nodeOf("side");
    if (side.kind !== "side") throw new Error("not a side");
    render(<DiagramDetail model={diagram} node={side} onClose={() => {}} />);
    const text = screen.getByRole("dialog").textContent ?? "";
    expect(text).toContain(side.heading);
    expect(text).toContain(side.text);
    expect(text).toContain(`On: ${diagram.nodes.find((n) => n.id === side.parentId)!.label}`);
  });

  it("gives evidence its description and source, with no score", () => {
    const evidence = diagram.nodes.find((n) => n.kind === "evidence" && n.sourceUrl)!;
    if (evidence.kind !== "evidence") throw new Error("not evidence");
    render(<DiagramDetail model={diagram} node={evidence} onClose={() => {}} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.textContent).toContain(evidence.side === "for" ? "Supports the claim" : "Challenges the claim");
    expect(dialog.textContent).toContain(evidence.description);
    const source = screen.getByRole("link", { name: /opens in a new tab/ });
    expect(source.getAttribute("href")).toBe(evidence.sourceUrl);
    expect(source.getAttribute("target")).toBe("_blank");
    expect(dialog.textContent).not.toMatch(/\/40|· (?:Strong|Moderate|Weak|Minimal)/);
  });
});
