import type { APIRoute } from "astro";
import { getSortedExperience } from "@/lib/content";
import { formatPeriod } from "@/lib/date";
import { markdownResponse, toMarkdownDoc } from "@/lib/markdown";

export const prerender = true;

export const GET: APIRoute = async ({ site, url }) => {
  const entries = await getSortedExperience();

  const body = entries
    .map(({ data, body }) => {
      const where = [data.company, data.type, data.mode, data.location]
        .filter(Boolean)
        .join(" · ");
      const links = data.links
        .map((link) => `[${link.label}](${link.url})`)
        .join(" · ");
      return [
        `## ${data.role}`,
        [
          `${formatPeriod(data.start, data.end)} — ${where}`,
          data.companyUrl,
          links,
        ]
          .filter(Boolean)
          .join("  \n"),
        body?.trim(),
      ]
        .filter(Boolean)
        .join("\n\n");
    })
    .join("\n\n");

  return markdownResponse(
    toMarkdownDoc(
      {
        title: "Working Experience",
        description:
          "Summary of my professional roles, responsibilities, and impact.",
        url: new URL("/experience/", site ?? url).href,
      },
      body,
    ),
  );
};
