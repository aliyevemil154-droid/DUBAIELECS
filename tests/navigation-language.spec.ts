import { test, expect, type Page } from "@playwright/test";
import { categories, products } from "../lib/catalog";
import { translate, type Language } from "../lib/i18n";

const exceptions = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  exceptions.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
});
test.afterEach(async ({ page }) => {
  expect(exceptions.get(page)).toEqual([]);
});

async function openStore(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#main")).toHaveAttribute(
    "data-store-ready",
    "true",
  );
}
async function openMenu(page: Page, language: Language = "az") {
  await page
    .getByRole("button", {
      name: translate("Open menu", language),
      exact: true,
    })
    .click();
  const menu = page.getByRole("dialog");
  await expect(menu).toBeVisible();
  return menu;
}
async function selectLanguage(page: Page, language: Language) {
  const names = { az: "Azərbaycan dili", ru: "Русский", en: "English" };
  const menu = page.locator(".mobile-menu");
  if (await menu.isVisible()) {
    await menu
      .getByRole("button", { name: names[language], exact: true })
      .click();
  } else {
    const selector = page
      .locator(".language-switcher")
      .filter({ visible: true })
      .getByRole("combobox");
    if (await selector.count()) {
      await selector.click();
      await page
        .getByRole("option", { name: new RegExp(names[language]) })
        .click();
    } else {
      await page.locator(".mobile-menu-toggle").click();
      await menu
        .getByRole("button", { name: names[language], exact: true })
        .click();
      await menu
        .getByRole("button", {
          name: translate("Close dialog", language),
          exact: true,
        })
        .click();
    }
  }
  await expect(page.locator("html")).toHaveAttribute("lang", language);
}
async function fits(page: Page) {
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth + 1,
    ),
  ).toBe(true);
}

test("Azerbaijani is server-rendered by default and all three languages persist across pages", async ({
  page,
}) => {
  const html = await (await page.request.get("/")).text();
  expect(html).toContain('<html lang="az"');
  expect(html).toContain("Mükəmməl texnologiya.");
  await openStore(page);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Mükəmməl texnologiya.",
  );
  for (const language of ["ru", "en", "az"] as const) {
    await selectLanguage(page, language);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      translate("Exceptional tech.", language),
    );
    await fits(page);
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveAttribute("lang", language);
    await page.goto("/policies/privacy");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      translate("Your privacy matters.", language),
    );
    await expect(page.locator(".policy-main section").first()).toContainText(
      translate("Information you choose to share", language),
    );
    await fits(page);
    await page.goto("/checkout");
    await expect(
      page.getByRole("heading", {
        name: translate("Your next upgrade is waiting.", language),
        exact: true,
      }),
    ).toBeVisible();
    await fits(page);
    await page.goto("/order");
    await expect(page.locator(".order-status-tag")).toHaveText(
      translate("Payment status", language),
    );
    await fits(page);
    await openStore(page);
  }
});

test("language changes preserve the chosen finish, price, favorites, bag, and checkout input", async ({
  page,
}) => {
  await openStore(page);
  const card = page.locator('[data-product-id="iphone-18-pro"]');
  await card
    .getByRole("button", { name: "iPhone 18 Pro: Buzlaq", exact: true })
    .click();
  await card.locator(".favorite-button").click();
  await selectLanguage(page, "ru");
  await expect(card.locator(".color-label")).toHaveText("Ледниковый");
  await expect(card.locator(".favorite-button")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await card.locator(".product-image-button").click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("button", { name: "Выбрать Ледниковый", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await dialog.getByRole("button", { name: /512 GB/ }).click();
  await expect(dialog.locator(".detail-price")).toHaveText("1,950 AZN");
  await dialog
    .getByRole("button", { name: "Добавить в корзину", exact: true })
    .click();
  await dialog.getByRole("button", { name: "Закрыть", exact: true }).click();
  await selectLanguage(page, "en");
  await expect(
    page.getByRole("button", { name: "Shopping bag, 1 item", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Shopping bag, 1 item", exact: true })
    .click();
  await expect(dialog.locator(".cart-item")).toContainText("512 GB · Glacier");
  await expect(dialog.locator(".cart-summary")).toContainText("1,950 AZN");
  await dialog
    .getByRole("link", { name: "Continue to checkout", exact: true })
    .click();
  await page.getByLabel("Full name", { exact: true }).fill("Locale Customer");
  await selectLanguage(page, "az");
  await expect(page.getByLabel("Ad və soyad", { exact: true })).toHaveValue(
    "Locale Customer",
  );
  await expect(page.locator(".checkout-item-details")).toContainText(
    "512 GB · Buzlaq",
  );
  await expect(page.locator(".checkout-total")).toContainText("1,950 AZN");
  await expect(page.getByLabel("Şəhər", { exact: true })).toHaveValue("Bakı");
  await page
    .getByRole("link", { name: "Alış-verişə qayıt", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Səbət, 1 məhsul", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("dubai-electronics-wishlist") || "[]"),
    ),
  ).toContain("iphone-18-pro");
});

test("menu fits compact phones, landscape, and tablets with reachable settings and unclipped dropdowns", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile",
    "Viewport matrix is covered once with touch input.",
  );
  await openStore(page);
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 360, height: 640 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 820, height: 1180 },
    { width: 700, height: 390 },
    { width: 1000, height: 700 },
  ]) {
    await page.setViewportSize(viewport);
    const menu = await openMenu(page);
    await expect
      .poll(async () =>
        menu.evaluate((element) =>
          Math.abs(element.getBoundingClientRect().right - innerWidth),
        ),
      )
      .toBeLessThan(1);
    await fits(page);
    for (const language of ["ru", "en", "az"] as const) {
      await selectLanguage(page, language);
      const close = menu.getByRole("button", {
        name: translate("Close dialog", language),
        exact: true,
      });
      expect((await close.boundingBox())!.width).toBeGreaterThanOrEqual(44);
      const settings = menu.locator(".mobile-menu-settings");
      const bounds = (await settings.boundingBox())!;
      expect(bounds.y).toBeGreaterThan(0);
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(viewport.height + 1);
      const currency = menu.getByRole("combobox");
      await currency.click();
      const dropdown = menu.locator(".select-popover");
      const box = (await dropdown.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
      expect(box.y + box.height).toBeLessThanOrEqual(bounds.y + bounds.height);
      await menu.getByRole("option", { name: /USD/ }).click();
      await expect(currency).toHaveText("USD $");
      const help = menu.getByRole("button", {
        name: translate("Get in touch", language),
        exact: true,
      });
      await help.scrollIntoViewIfNeeded();
      const helpBox = (await help.boundingBox())!;
      expect(helpBox.y + helpBox.height).toBeLessThanOrEqual(bounds.y + 1);
    }
    await menu.getByRole("button", { name: "Bağla", exact: true }).click();
    await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
    await fits(page);
  }
});

test("menu traps focus, contains scrolling, handles nested Escape, and restores its trigger", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 800 });
  await openStore(page);
  const trigger = page.getByRole("button", { name: "Menyunu aç", exact: true });
  const menu = await openMenu(page);
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const close = menu.getByRole("button", { name: "Bağla", exact: true });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(menu.getByRole("combobox")).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(menu.getByRole("combobox")).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await page.keyboard.press("Escape");
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("combobox")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  const scroll = await page.evaluate(() => scrollY);
  await page.mouse.move(70, 400);
  await page.mouse.wheel(0, 700);
  expect(await page.evaluate(() => scrollY)).toBe(scroll);
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
  await openMenu(page);
  await page.locator(".dialog-overlay").click({ position: { x: 10, y: 300 } });
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("every menu category filters correctly and utility links open working dialogs", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openStore(page);
  for (const category of categories) {
    const menu = await openMenu(page);
    await menu
      .getByRole("button", { name: translate(category, "az"), exact: true })
      .click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    const expected = products.filter(
      (product) => product.category === category,
    );
    await expect(page.locator("#shop .product-card")).toHaveCount(
      expected.length,
    );
    await expect(page.locator("#shop .product-name")).toHaveText(
      expected.map((product) => product.name),
    );
  }
  let menu = await openMenu(page);
  await menu
    .getByRole("button", { name: "Kolleksiyada axtar", exact: true })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Kolleksiyada axtar", exact: true }),
  ).toBeFocused();
  await page
    .getByRole("textbox", { name: "Kolleksiyada axtar", exact: true })
    .fill("noutbuk");
  await expect(page.locator(".search-result")).toHaveCount(
    products.filter((p) => p.category === "Laptops").length,
  );
  await page.keyboard.press("Escape");
  for (const [link, heading] of [
    ["Çatdırılma", "Daha rahat çatdırılma."],
    ["Bizimlə əlaqə", "Yeni cihazınızı birlikdə tapaq."],
    ["Sevimliləriniz", "Sevimli məhsullarınız"],
  ]) {
    menu = await openMenu(page);
    await menu.getByRole("button", { name: new RegExp(`^${link}`) }).click();
    await expect(
      page
        .getByRole("dialog")
        .getByRole("heading", { name: heading, exact: true }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveCSS("overflow", "hidden");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
  }
});

test("repeated opening and desktop resizing never leave a stuck overlay or scroll lock", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await openStore(page);
  for (let i = 0; i < 6; i++) {
    await openMenu(page);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
  await openMenu(page);
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
  await expect(
    page.getByRole("navigation", { name: "Əsas naviqasiya", exact: true }),
  ).toBeVisible();
  await selectLanguage(page, "ru");
  await fits(page);
  await page.setViewportSize({ width: 390, height: 700 });
  await openMenu(page, "ru");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Закрыть", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("invalid or unavailable browser storage keeps Azerbaijani and usable language controls", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException("Storage unavailable", "SecurityError");
    };
    Storage.prototype.setItem = () => {
      throw new DOMException("Storage unavailable", "SecurityError");
    };
  });
  await openStore(page);
  await expect(page.locator("html")).toHaveAttribute("lang", "az");
  await selectLanguage(page, "ru");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Лучшие технологии.",
  );
});

test("menu animations finish cleanly and can be interrupted without freezing", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile",
    "Animation lifecycle is covered once on mobile.",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await openStore(page);
  for (let i = 0; i < 3; i++) {
    const menu = await openMenu(page);
    if (i === 1) {
      await expect
        .poll(() =>
          menu.evaluate((element) =>
            element
              .getAnimations()
              .every((animation) => animation.playState === "finished"),
          ),
        )
        .toBe(true);
      expect((await menu.boundingBox())!.x).toBe(0);
    }
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
  }
  await page.getByRole("button", { name: "Məhsul axtar", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "Kolleksiyada axtar", exact: true }),
  ).toBeFocused();
});
