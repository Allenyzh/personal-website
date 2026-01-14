import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate between all pages", async ({ page, isMobile }) => {
    // Skip on mobile - nav is hidden behind hamburger menu
    test.skip(isMobile, "Navigation is hidden on mobile");

    // Start at home
    await page.goto("/");

    const nav = page.locator("nav");

    // Navigate to Projects
    await nav.getByRole("link", { name: "Projects", exact: true }).click();
    await expect(page).toHaveURL("/projects");

    // Navigate to Experience
    await nav.getByRole("link", { name: "Experience", exact: true }).click();
    await expect(page).toHaveURL("/experience");

    // Navigate to Blogs
    await nav.getByRole("link", { name: "Blogs", exact: true }).click();
    await expect(page).toHaveURL("/blog");

    // Navigate back to Home via logo
    await page.getByRole("link", { name: "Zhenhao Yang's portfolio" }).click();
    await expect(page).toHaveURL("/");
  });

  test("should maintain navigation across pages", async ({
    page,
    isMobile,
  }) => {
    // Skip on mobile - nav is hidden behind hamburger menu
    test.skip(isMobile, "Navigation is hidden on mobile");

    const pages = ["/", "/projects", "/blog", "/experience"];

    for (const url of pages) {
      await page.goto(url);

      const nav = page.locator("nav");

      // Check that navigation is present on all pages
      await expect(
        nav.getByRole("link", { name: "About", exact: true })
      ).toBeVisible();
      await expect(
        nav.getByRole("link", { name: "Projects", exact: true })
      ).toBeVisible();
      await expect(
        nav.getByRole("link", { name: "Experience", exact: true })
      ).toBeVisible();
      await expect(
        nav.getByRole("link", { name: "Blogs", exact: true })
      ).toBeVisible();
    }
  });
});

test.describe("Footer", () => {
  test("should display footer on all pages", async ({ page }) => {
    const pages = ["/", "/projects", "/blog", "/experience"];

    for (const url of pages) {
      await page.goto(url);

      const footer = page.locator("footer");

      // Check footer content
      await expect(footer.getByText("© 2026")).toBeVisible();
      await expect(footer.getByText("Zhenhao Yang")).toBeVisible();
    }
  });

  test("should have working social links in footer", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/Allenyzh"
    );
    await expect(
      footer.getByRole("link", { name: "LinkedIn" })
    ).toHaveAttribute("href", "https://www.linkedin.com/in/allenyzh/");
    await expect(footer.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:work@mail.allenyzh.com"
    );
  });
});
