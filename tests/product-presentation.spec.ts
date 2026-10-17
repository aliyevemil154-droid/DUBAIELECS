import { test, expect } from "@playwright/test";
import { categories, products } from "../lib/catalog";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("dubai-electronics-language", "en"));
});

// Real local assets only: no replacement image responses or CDN mocks.
test("every category and finish has stable geometry, accurate selection, and honest photography", async ({ page }) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  const externalImages: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (request.resourceType() === "image" && !new URL(request.url()).hostname.match(/^(localhost|127\.0\.0\.1)$/)) externalImages.push(request.url());
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#main")).toHaveAttribute("data-store-ready", "true");
  for (const category of categories) {
    await page.getByRole("group", { name: "Product category" }).getByRole("button", { name: category, exact: true }).click();
    const inCategory = products.filter((product) => product.category === category);
    await expect(page.locator("#shop .product-card")).toHaveCount(inCategory.length);
    const heights: number[] = [];
    for (const product of inCategory) {
      const card = page.locator(`[data-product-id="${product.id}"]`);
      await card.scrollIntoViewIfNeeded();
      const initial = await card.boundingBox();
      expect(initial).not.toBeNull();
      heights.push(initial!.height);
      const frame = card.locator(".product-image");
      const originalFrame = await frame.boundingBox();
      for (const color of product.colors) {
        const swatch = card.getByRole("button", { name: `${product.name}: ${color.name}`, exact: true });
        await swatch.click();
        await expect(swatch).toHaveAttribute("aria-pressed", "true");
        await expect(card.locator(".color-swatch[aria-pressed=true]")).toHaveCount(1);
        await expect(card.locator(".color-label")).toHaveText(color.name);
        await expect(frame).toHaveAttribute("data-photo-state", color.image ? "ready" : "unavailable");
        if (color.image) {
          const image = frame.locator("img");
          await expect(image).toHaveAttribute("alt", `${product.name} in ${color.name}`);
          await expect(image).toHaveAttribute("src", new RegExp(encodeURIComponent(color.image)));
          expect(await image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
          expect(await image.evaluate((img) => {
            const style = getComputedStyle(img);
            return { fit: style.objectFit, position: style.objectPosition, filter: style.filter, blend: style.mixBlendMode };
          })).toEqual({ fit: "contain", position: "50% 50%", filter: "none", blend: "normal" });
        } else {
          await expect(frame.locator("img")).toHaveCount(0);
          await expect(frame.getByRole("img")).toHaveAttribute("aria-label", `Photo unavailable: ${product.name} in ${color.name}`);
        }
        const updated = await card.boundingBox();
        const updatedFrame = await frame.boundingBox();
        expect(Math.abs(updated!.height - initial!.height)).toBeLessThan(1);
        expect(Math.abs(updatedFrame!.height - originalFrame!.height)).toBeLessThan(1);
        expect(Math.abs(updatedFrame!.width - originalFrame!.width)).toBeLessThan(1);
        const bounds = await swatch.boundingBox();
        expect(bounds!.x).toBeGreaterThanOrEqual(updated!.x);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(updated!.x + updated!.width);
      }
      // The detail and shopping surfaces use the same exact finish resolver.
      await card.getByRole("button", { name: `View ${product.name}`, exact: true }).click();
      const dialog = page.getByRole("dialog");
      const detailFrame = dialog.locator(".product-detail-image .product-photo");
      await expect.poll(() => dialog.evaluate((element) => element.getAnimations().every((animation) => animation.playState === "finished"))).toBe(true);
      const geometry = await detailFrame.boundingBox();
      for (const color of product.colors) {
        await dialog.getByRole("button", { name: `Select ${color.name}`, exact: true }).click();
        await expect(detailFrame).toHaveAttribute("data-photo-state", color.image ? "ready" : "unavailable");
        const next = await detailFrame.boundingBox();
        expect(Math.abs(next!.height - geometry!.height)).toBeLessThan(1);
        expect(Math.abs(next!.width - geometry!.width)).toBeLessThan(1);
        if (color.image) await expect(detailFrame.locator("img")).toHaveAttribute("alt", `${product.name} in ${color.name}`);
        else await expect(detailFrame.getByRole("img")).toHaveAttribute("aria-label", `Photo unavailable: ${product.name} in ${color.name}`);
      }
      await dialog.getByRole("button", { name: "Close dialog" }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    }
    expect(Math.max(...heights) - Math.min(...heights), `${category}: consistent card heights`).toBeLessThan(2);
  }
  expect(externalImages).toEqual([]);
  expect(errors).toEqual([]);
});

test("a failed approved asset has a contained fallback and leaves shopping controls usable", async ({ page }) => {
  await page.route(/\/_next\/image\?url=%2Fimages%2Fproducts%2Fbose-qc45/, (route) => route.abort());
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#main")).toHaveAttribute("data-store-ready", "true");
  await page.getByRole("group", { name: "Product category" }).getByRole("button", { name: "Audio", exact: true }).click();
  const card = page.locator('[data-product-id="bose-qc45"]');
  await expect(card.locator(".product-photo")).toHaveAttribute("data-photo-state", "unavailable");
  await expect(card.getByRole("img", { name: "Photo unavailable: Bose QuietComfort 45 in Midnight Blue", exact: true })).toBeVisible();
  await card.getByRole("button", { name: "Save Bose QuietComfort 45 to wishlist", exact: true }).click();
  await expect(card.getByRole("button", { name: "Remove Bose QuietComfort 45 from wishlist", exact: true })).toHaveAttribute("aria-pressed", "true");
  await card.getByRole("button", { name: "Add Bose QuietComfort 45 to bag", exact: true }).click();
  await page.getByRole("button", { name: "Shopping bag, 1 item", exact: true }).click();
  await expect(page.getByRole("dialog").locator(".cart-item")).toContainText("Bose QuietComfort 45");
  await expect(page.getByRole("dialog").locator(".cart-summary")).toContainText("274.50 AZN");
});
