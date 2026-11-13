import type { APIRoute } from "astro";
import {
  MY_ABOUT,
  MY_EMAIL,
  MY_GITHUB,
  MY_LINKEDIN,
  MY_NAME,
  MY_TAGLINE,
} from "@/data/consts";
import {
  getCurrentExperience,
  getSortedPosts,
  getSortedProjects,
  isAiProject,
  postSlug,
  projectSlug,
} from "@/lib/content";

export const prerender = true;

/**
 * /llms.txt — a Markdown index of the site for language models and agents
 * (https://llmstxt.org). Every link points at the Markdown twin of a page.
 */
export const GET: APIRoute = async ({ site, url }) => {
  const [projects, posts, current] = await Promise.all([
    getSortedProjects(),
    getSortedPosts(),
    getCurrentExperience(),
  ]);
  const abs = (path: string) => new URL(path, site ?? url).href;

  const role = current
    ? ` ${current.data.role} at ${current.data.company}${
        current.data.location ? `, based in ${current.data.location}` : ""
      }.`
    : "";

  const sections = [
    `# ${MY_NAME}`,
    `> ${MY_TAGLINE}${role}`,
    MY_ABOUT.join("\n\n"),
    [
      "## Projects",
      ...projects.map(
        (project) =>
          `- [${project.data.title}](${abs(`/projects/${projectSlug(project)}.md`)}): ${
            isAiProject(project) ? "[AI] " : ""
          }${project.data.description}`,
      ),
    ].join("\n"),
    posts.length > 0 &&
      [
        "## Writing",
        ...posts.map(
          (post) =>
            `- [${post.data.title}](${abs(`/blog/${postSlug(post)}.md`)}): ${post.data.description}`,
        ),
      ].join("\n"),
    [
      "## Experience",
      `- [Working experience](${abs("/experience.md")}): roles, dates and results, newest first`,
    ].join("\n"),
    [
      "## Contact",
      `- Email: ${MY_EMAIL}`,
      `- GitHub: ${MY_GITHUB}`,
      `- LinkedIn: ${MY_LINKEDIN}`,
      `- Website: ${abs("/")}`,
    ].join("\n"),
  ];

  return new Response(sections.filter(Boolean).join("\n\n").concat("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
