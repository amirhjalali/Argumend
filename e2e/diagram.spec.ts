import { expect, test } from "./fixtures";

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
