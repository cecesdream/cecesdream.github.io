import { expect, test, type Page } from "@playwright/test";
import posts from "../src/data/posts.json" with { type: "json" };

const PAGES = ["/", "/about", "/blog", "/donate", "/contact", `/blog/${posts[0].slug}`];

// Zeffy's Cloudflare blocks headless browsers, and the tests don't need it:
// keep third-party embeds out so results don't depend on someone else's servers.
test.beforeEach(async ({ page }) => {
  await page.route(/zeffy\.com|challenges\.cloudflare\.com|recaptcha/, (route) => route.abort());
});

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1280) < 768;

test.describe("mobile menu", () => {
  test.beforeEach(({ page }) => test.skip(!isMobile(page), "the menu button is mobile-only"));

  test("opens, and closes with its button and with Escape", async ({ page }) => {
    await page.goto("/");
    const open = page.getByRole("button", { name: "Open menu" });
    await open.click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await expect(open).toHaveAttribute("aria-expanded", "true");

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(page.locator("#mobile-menu")).toHaveCount(0);

    await open.click();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
  });

  test("closes when you pick the page you're already on", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator("#mobile-menu").getByRole("link", { name: "Our Mission" }).click();
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
  });

  test("navigates and closes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator("#mobile-menu").getByRole("link", { name: "Stories" }).click();
    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
    await expect(page).toHaveTitle("Stories | CECE's Dream");
  });

  test("buttons meet Apple's 44px minimum tap target", async ({ page }) => {
    await page.goto("/");
    const open = await page.getByRole("button", { name: "Open menu" }).boundingBox();
    expect(open!.width).toBeGreaterThanOrEqual(44);
    expect(open!.height).toBeGreaterThanOrEqual(44);
    await page.getByRole("button", { name: "Open menu" }).click();
    const close = await page.getByRole("button", { name: "Close menu" }).boundingBox();
    expect(close!.width).toBeGreaterThanOrEqual(44);
    expect(close!.height).toBeGreaterThanOrEqual(44);
  });
});

for (const path of PAGES) {
  test(`${path} renders without errors and doesn't scroll sideways`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(path);
    await expect(page.locator("h1").first()).toBeVisible();
    // Elements waiting for a slide-in sit off-screen; on iPhone that let the page pan sideways.
    const scrollX = await page.evaluate(() => {
      window.scrollTo(500, window.scrollY);
      return window.scrollX;
    });
    expect(scrollX).toBe(0);
    expect(errors).toEqual([]);
  });
}

test("an unknown address shows the not-found page", async ({ page }) => {
  await page.goto("/no-such-page");
  await expect(page.getByRole("heading", { name: "This page isn't here." })).toBeVisible();
  await expect(page).toHaveTitle("Page not found | CECE's Dream");
});

test("the globe loads and draws Liberia", async ({ page }) => {
  await page.goto("/");
  const globe = page.locator("section").nth(1);
  await globe.scrollIntoViewIfNeeded();
  // react-simple-maps fetches the world atlas from jsDelivr.
  await expect(globe.locator('path[fill="#BF0A30"]')).toHaveCount(1, { timeout: 15_000 });
});

test("Zeffy's script waits until a form is near", async ({ page }) => {
  // Home is long enough that the newsletter band starts well below the 1200px margin.
  await page.goto("/");
  await page.waitForLoadState("load");
  await expect(page.locator('script[src*="zeffy-embed"]')).toHaveCount(0);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(page.locator('script[src*="zeffy-embed"]')).toHaveCount(1);
});

test.describe("prerendered pages", () => {
  // Crawlers and link previews read the raw HTML and never run the app.
  test.beforeEach(({ page }) => test.skip(isMobile(page), "HTML checks run once"));

  test("each page carries its own title and preview tags", async ({ request }) => {
    const post = posts[0];
    for (const file of [`/blog/${post.slug}.html`, `/blog/${post.slug}/index.html`]) {
      const html = await (await request.get(file)).text();
      expect(html).toContain(`<title>${post.title} | CECE's Dream</title>`);
      expect(html).toContain(`<meta property="og:image" content="https://cecesdream.org${post.image}" />`);
      expect(html).toContain(`<link rel="canonical" href="https://cecesdream.org/blog/${post.slug}" />`);
    }
    const about = await (await request.get("/about.html")).text();
    expect(about).toContain("<title>Our Mission | CECE's Dream</title>");
  });

  test("the preview image exists", async ({ request }) => {
    const html = await (await request.get("/")).text();
    const image = html.match(/<meta property="og:image" content="https:\/\/cecesdream\.org([^"]+)"/)![1];
    const res = await request.get(image);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/");
  });

  test("404.html is not indexed and every page is in the sitemap", async ({ request }) => {
    expect(await (await request.get("/404.html")).text()).toContain('<meta name="robots" content="noindex" />');
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const path of PAGES) expect(sitemap).toContain(`<loc>https://cecesdream.org${path}</loc>`);
  });
});
