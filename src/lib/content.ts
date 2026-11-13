import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;
export type Post = CollectionEntry<"blog">;
export type Experience = CollectionEntry<"experience">;

export const PROJECT_CATEGORIES = [
  { value: "ai", label: "AI" },
  { value: "full-stack", label: "Full-stack" },
  { value: "frontend", label: "Frontend" },
  { value: "open-source", label: "Open-source" },
] as const;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const projectSlug = (project: Project) =>
  project.data.slug || slugify(project.data.title);

export const postSlug = (post: Post) => post.data.slug || post.id;

export const isAiProject = (project: Project) =>
  project.data.projectCategories.includes("ai");

/** Newest first; `order` breaks ties. The listing page and prev/next share this. */
export async function getSortedProjects(): Promise<Project[]> {
  return (await getCollection("projects")).sort(
    (a, b) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf() ||
      b.data.order - a.data.order,
  );
}

export async function getSortedPosts(): Promise<Post[]> {
  return (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/** Newest first. Open-ended roles sort above closed ones that started the same month. */
export async function getSortedExperience(): Promise<Experience[]> {
  return (await getCollection("experience")).sort(
    (a, b) =>
      b.data.start.localeCompare(a.data.start) ||
      Number(!b.data.end) - Number(!a.data.end),
  );
}

/** The role with no end date feeds the hero, the status pill and JSON-LD. */
export async function getCurrentExperience(): Promise<Experience | undefined> {
  return (await getSortedExperience()).find((entry) => !entry.data.end);
}

/** Neighbours in a sorted list, wrapping around. Undefined when there is nothing to link to. */
export function getNeighbours<T>(items: T[], index: number) {
  if (items.length < 2) return undefined;
  return {
    prev: items[(index - 1 + items.length) % items.length],
    next: items[(index + 1) % items.length],
  };
}
