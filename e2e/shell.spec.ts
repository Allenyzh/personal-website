import { test, expect } from "@playwright/test";

test.describe("Command palette", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("opens from the prompt bar and jumps to a project", async ({ page }) => {
    await page
      .getByRole("button", { name: /Search projects, posts, actions/ })
      .click();

    const search = page.getByRole("combobox");
    await expect(search).toBeFocused();

    await search.fill("mcp");
    const options = page.getByRole("option");
    await expect(options.first()).toHaveText(/CLI MCP/);
    await expect(options.first()).toHaveAttribute("aria-selected", "true");

    await search.press("Enter");
    await expect(page).toHaveURL(/\/projects\/cli-mcp/);
  });

  test("opens with the keyboard and closes with Escape", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Keyboard shortcuts need a hardware keyboard");

    const dialog = page.getByRole("dialog", { name: "Command palette" });

    await page.keyboard.press("ControlOrMeta+k");
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await page.keyboard.press("/");
    await expect(dialog).toBeVisible();
  });

  test("can be driven with the arrow keys", async ({ page, isMobile }) => {
    test.skip(isMobile, "Keyboard shortcuts need a hardware keyboard");

    await page.keyboard.press("ControlOrMeta+k");
    const search = page.getByRole("combobox");
    const options = page.getByRole("option");

    await expect(options.nth(0)).toHaveAttribute("aria-selected", "true");
    await search.press("ArrowDown");
    await expect(options.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(search).toHaveAttribute(
      "aria-activedescendant",
      (await options.nth(1).getAttribute("id")) ?? ""
    );

    await search.press("Enter");
    await expect(page).toHaveURL("/projects");
  });

  test("says so when nothing matches", async ({ page }) => {
    await page
      .getByRole("button", { name: /Search projects, posts, actions/ })
      .click();
    await page.getByRole("combobox").fill("zzzzzz");

    await expect(page.getByRole("option")).toHaveCount(0);
    await expect(page.getByText("Nothing matches that.")).toBeVisible();
  });
});

test.describe("Theme", () => {
  test("is dark by default and remembers a switch to light", async ({
    page,
  }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);

    await page.getByRole("button", { name: "Toggle colour theme" }).click();
    await expect(html).not.toHaveClass(/dark/);

    await page.goto("/projects");
    await expect(html).not.toHaveClass(/dark/);
  });
});

test.describe("Mobile menu", () => {
  test("opens, moves focus in, and navigates", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "The menu button only exists on small screens");

    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();

    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu.getByRole("link", { name: "About" })).toBeFocused();

    await menu.getByRole("link", { name: "Experience" }).click();
    await expect(page).toHaveURL("/experience");
  });
});

test.describe("Agent-readable layer", () => {
  test("serves llms.txt linking to Markdown pages", async ({ request }) => {
    const response = await request.get("/llms.txt");
    expect(response.ok()).toBe(true);

    const body = await response.text();
    expect(body).toMatch(/^# Zhenhao Yang/);
    expect(body).toContain("/projects/cli-mcp.md");
    expect(body).toContain("/blog/css-tricks-flexbox.md");
    expect(body).toContain("/experience.md");
  });

  test("serves a Markdown version of a project and a post", async ({
    request,
  }) => {
    const project = await request.get("/projects/personal-website.md");
    expect(project.ok()).toBe(true);
    const projectBody = await project.text();
    expect(projectBody).toMatch(/^# Personal Website/);
    expect(projectBody).not.toContain("import ");

    const post = await request.get("/blog/css-tricks-flexbox.md");
    expect(post.ok()).toBe(true);
    const postBody = await post.text();
    expect(postBody).toContain("```css");
    expect(postBody).not.toContain("<CodeBlockWithCopy");
  });

  test("describes the owner with JSON-LD on the home page", async ({
    page,
  }) => {
    await page.goto("/");
    const raw = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const data = JSON.parse(raw ?? "{}");

    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Zhenhao Yang");
    expect(data.sameAs).toContain("https://github.com/Allenyzh");
  });

  test("links to posts by slug in the RSS feed", async ({ request }) => {
    const response = await request.get("/rss.xml");
    expect(await response.text()).toContain("/blog/css-tricks-flexbox/");
  });
});
