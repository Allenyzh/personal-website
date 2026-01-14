import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have correct page title", async ({ page }) => {
    await expect(page).toHaveTitle("Zhenhao Yang's portfolio");
  });

  test("should display hero section with name and job title", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "ZHENHAO YANG" })
    ).toBeVisible();
    await expect(page.getByText("Full-Stack Engineer")).toBeVisible();
  });

  test("should have working navigation links", async ({ page, isMobile }) => {
    // Skip on mobile - nav is hidden behind hamburger menu
    test.skip(isMobile, "Navigation is hidden on mobile");

    const nav = page.locator("nav");
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
  });

  test("should navigate to Projects page", async ({ page, isMobile }) => {
    test.skip(isMobile, "Navigation is hidden on mobile");

    const nav = page.locator("nav");
    await nav.getByRole("link", { name: "Projects", exact: true }).click();
    await expect(page).toHaveURL("/projects");
    await expect(
      page.getByRole("heading", { name: "Projects", level: 1 })
    ).toBeVisible();
  });

  test("should display social links in hero section", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "GitHub" }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "LinkedIn" }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Email" }).first()
    ).toBeVisible();
  });

  test("should display skills section with categories", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Skills & Technologies" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Frontend" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Backend & Databases" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "DevOps & Tools" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Design & UX" })
    ).toBeVisible();
  });

  test("should display recent projects section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Recent Projects" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "View All Projects" })
    ).toBeVisible();
  });

  test("should display contact section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Let's Work Together" })
    ).toBeVisible();
    await expect(
      page.getByText("work@mail.allenyzh.com", { exact: true })
    ).toBeVisible();
  });

  test("View My Work button should scroll to projects", async ({ page }) => {
    await page.getByRole("link", { name: "View My Work" }).click();
    await expect(page).toHaveURL("/#projects");
  });

  test("Get In Touch button should scroll to contact", async ({ page }) => {
    await page.getByRole("link", { name: "Get In Touch" }).click();
    await expect(page).toHaveURL("/#contact");
  });
});
