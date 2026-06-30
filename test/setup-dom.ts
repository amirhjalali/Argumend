import { Window } from "happy-dom";

if (typeof globalThis.document === "undefined") {
  const happyWindow = new Window({ url: "http://localhost/" });
  const windowRecord = happyWindow as unknown as Record<string, unknown>;

  const defineGlobal = (key: string, value: unknown) => {
    Object.defineProperty(globalThis, key, {
      value,
      writable: true,
      configurable: true,
    });
  };

  defineGlobal("window", happyWindow);
  defineGlobal("self", happyWindow);
  defineGlobal("document", happyWindow.document);
  defineGlobal("navigator", happyWindow.navigator);
  defineGlobal("HTMLElement", windowRecord.HTMLElement);
  defineGlobal("HTMLInputElement", windowRecord.HTMLInputElement);
  defineGlobal("HTMLSelectElement", windowRecord.HTMLSelectElement);
  defineGlobal("HTMLTextAreaElement", windowRecord.HTMLTextAreaElement);
  defineGlobal("SVGElement", windowRecord.SVGElement);
  defineGlobal("Element", windowRecord.Element);
  defineGlobal("Node", windowRecord.Node);
  defineGlobal("Document", windowRecord.Document);
  defineGlobal("DocumentFragment", windowRecord.DocumentFragment);
  defineGlobal("Text", windowRecord.Text);
  defineGlobal("Event", windowRecord.Event);
  defineGlobal("MouseEvent", windowRecord.MouseEvent);
  defineGlobal("KeyboardEvent", windowRecord.KeyboardEvent);
  defineGlobal("CustomEvent", windowRecord.CustomEvent);
  defineGlobal("getComputedStyle", happyWindow.getComputedStyle.bind(happyWindow));
  defineGlobal("requestAnimationFrame", (callback: FrameRequestCallback) =>
    setTimeout(() => callback(Date.now()), 0)
  );
  defineGlobal("cancelAnimationFrame", (id: number) => clearTimeout(id));
}
