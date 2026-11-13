import type { APIRoute, GetStaticPaths } from "astro";
import { getSortedProjects, projectSlug, type Project } from "@/lib/content";
import { formatDate } from "@/lib/date";
import {
  markdownResponse,
  mdxToMarkdown,
  toMarkdownDoc,
} from "@/lib/markdown";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () =>
  (await getSortedProjects()).map((project) => ({
    params: { slug: projectSlug(project) },
    props: { project },
  }));

export const GET: APIRoute<{ project: Project }> = ({ props, site, url }) => {
  const { project } = props;
  const { data } = project;

  return markdownResponse(
    toMarkdownDoc(
      {
        title: data.title,
        description: data.description,
        url: new URL(`/projects/${projectSlug(project)}/`, site ?? url).href,
        facts: [
          ["Date", formatDate(data.pubDate, "month")],
          ["Tech", data.tech.join(", ")],
          ["Categories", data.projectCategories.join(", ")],
          ["Outcome", data.outcome],
          ["Source", data.githubDisable ? undefined : data.github],
          ["Live", data.liveDisable ? undefined : data.live],
        ],
      },
      mdxToMarkdown(project.body ?? ""),
    ),
  );
};
