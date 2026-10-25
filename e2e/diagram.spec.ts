import { expect, test, waitForHydration } from "./fixtures";

test("the desktop diagram announces loading while its canvas downloads", async ({ page, isMobile }) => {
  test.skip(isMobile, "phones render the outline without the canvas");
  let releaseCanvas!: () => void;
  const canvasReady = new Promise<void>((resolve) => { releaseCanvas = resolve; });
  let canvasRequested = false;
  await page.route("**/_next/static/chunks/*.js", async (route) => {
    const response = await route.fetch();
    // Match the lazy dependency by its stable CSS hook, not a build-specific
    // chunk hash. All other route code can hydrate while this download waits.
    if ((await response.text()).includes("react-flow__node")) {
      canvasRequested = true;
      await canvasReady;
    }
    await route.fulfill({ response });
  });

  try {
    await page.goto("/topics/climate-change/map", { waitUntil: "domcontentloaded" });
    const diagram = page.getByTestId("topic-diagram");
    const loading = diagram.getByRole("status").filter({ hasText: "Loading diagram…" });
    await expect.poll(() => canvasRequested).toBe(true);
    await waitForHydration(page.getByRole("link", { name: "Back to the map page" }));
    await expect(loading).toHaveText("Loading diagram…");
    await expect(loading).toBeVisible();
    await expect(diagram.locator(".react-flow__node")).toHaveCount(0);
    await test.info().attach("diagram-loading", { body: await page.screenshot(), contentType: "image/png" });

    releaseCanvas();

    await expect(diagram.locator(".react-flow__node").first()).toBeVisible();
    await expect(loading).toHaveCount(0);
  } finally {
    releaseCanvas();
    await page.unrouteAll({ behavior: "wait" });
  }
});

test.describe("before diagram hydration", () => {
  test.use({ javaScriptEnabled: false });

  test("shows a desktop loading status or the phone outline before JavaScript runs", async ({ page, isMobile }) => {
    await page.goto("/topics/climate-change/map");
    const diagram = page.getByTestId("topic-diagram");
    if (isMobile) {
      await expect(diagram.locator("button[aria-expanded]").first()).toBeVisible();
      await expect(diagram.getByRole("status")).toHaveCount(0);
    } else {
      await expect(diagram.getByRole("status")).toHaveText("Loading diagram…");
      await expect(diagram.getByRole("status")).toBeVisible();
    }
  });
});

/**
 * /topics/[id]/map draws React Flow on desktop and the pillar outline on
 * phones. The phone view was blank until 2026-09-29 (the topic module loaded
 * after the outline read it; docs/reviews/2026-09-29-fixups-1.md, item 1).
 */
test("the diagram renders for this screen", async ({ page, isMobile }) => {
  const response = await page.goto("/topics/climate-change/map");
  expect(response?.status()).toBe(200);
  const diagram = page.getByTestId("topic-diagram");

  if (isMobile) {
    const pillars = diagram.locator("button[aria-expanded]");
    await expect(pillars.first()).toBeVisible();
    await expect(diagram.locator(".react-flow__node")).toHaveCount(0);

    await pillars.first().click();
    await expect(pillars.first()).toHaveAttribute("aria-expanded", "true");
  } else {
    const nodes = diagram.locator(".react-flow__node");
    await expect(nodes.first()).toBeVisible();
    expect(await nodes.count()).toBeGreaterThan(1);
  }
});

/**
 * The whole tree is framed on load, with no box on top of another, no
 * photos and no scores (docs/reviews/2026-09-29-r2-diagram.md). The layout
 * itself is checked for all 156 maps in lib/diagram/layout.test.ts; this
 * checks what the browser actually drew, on the widest common shape.
 */
test("the desktop diagram shows the whole tree, nothing overlapping", async ({ page, isMobile }) => {
  test.skip(isMobile, "phones get the outline");
  await page.goto("/topics/universal-basic-income/map");
  const nodes = page.getByTestId("topic-diagram").locator(".react-flow__node");
  await expect(nodes.first()).toBeVisible();
  // fitView runs once React Flow has measured the boxes.
  await expect
    .poll(() =>
      page.evaluate(() => {
        const pane = document.querySelector(".react-flow")!.getBoundingClientRect();
        return [...document.querySelectorAll(".react-flow__node")].every((el) => {
          const r = el.getBoundingClientRect();
          return r.left >= pane.left && r.right <= pane.right && r.top >= pane.top && r.bottom <= pane.bottom;
        });
      }),
    )
    .toBe(true);

  const overlaps = await page.evaluate(() => {
    const boxes = [...document.querySelectorAll(".react-flow__node")].map((el) => el.getBoundingClientRect());
    let hits = 0;
    for (let i = 0; i < boxes.length; i++)
      for (let j = i + 1; j < boxes.length; j++) {
        const [a, b] = [boxes[i], boxes[j]];
        if (a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom) hits++;
      }
    return hits;
  });
  expect(overlaps).toBe(0);

  const canvas = page.locator(".react-flow");
  await expect(canvas.locator("img")).toHaveCount(0);
  await expect(canvas).not.toContainText(/\/40|Leaf node|Skeptic Thesis|Proponent Thesis/);
});

test("the keyboard walks the boxes, Enter opens one and Escape closes it", async ({ page, isMobile }) => {
  test.skip(isMobile, "phones get the outline");
  await page.goto("/topics/nuclear-energy-safety/map");
  const nodes = page.getByTestId("topic-diagram").locator(".react-flow__node");
  await expect(nodes.first()).toBeVisible();

  // Reading order: the question, then the first crux.
  await nodes.first().focus();
  await expect(nodes.first()).toHaveAttribute("aria-label", /^The question: /);
  await page.keyboard.press("Tab");
  const crux = nodes.nth(1);
  await expect(crux).toBeFocused();
  await expect(crux).toHaveAttribute("aria-label", /^Crux 1 of /);

  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("What would settle it");

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(crux).toBeFocused();
});
