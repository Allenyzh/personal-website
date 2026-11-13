import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projectCategory = z.enum(["ai", "full-stack", "frontend", "open-source"]);

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      reviseDate: z.coerce.date().nullish(),
      author: z.string(),
      isFeatured: z.boolean().default(false),
      showOnHomePage: z.boolean().default(false),
      order: z.number().default(0),
      tech: z.array(z.string()).default([]),
      github: z.string().optional(),
      live: z.string().optional(),
      githubDisable: z.boolean().default(false),
      liveDisable: z.boolean().default(false),
      slug: z.string().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      reviseDate: z.coerce.date().nullish(),
      author: z.string(),
      // Cover screenshot, relative to the MDX file. Omit it for a typographic cover.
      heroImg: image().optional(),
      // One measurable result, shown on cards. Must come from real numbers.
      outcome: z.string().optional(),
      projectCategories: z.array(projectCategory).default([]),
      showOnHomePage: z.boolean().default(false),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      tech: z.array(z.string()).default([]),
      github: z.string().optional(),
      live: z.string().optional(),
      githubDisable: z.boolean().default(false),
      liveDisable: z.boolean().default(false),
      slug: z.string().optional(),
    }),
});

// "2026-01" or "2021". Quoted in frontmatter so YAML keeps them as strings.
const yearMonth = z.coerce.string().regex(/^\d{4}(-\d{2})?$/);

// One file per role or event. The body holds the bullet points.
const experience = defineCollection({
  loader: glob({ base: "./src/content/experience", pattern: "**/*.md" }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    companyUrl: z.string().url().optional(),
    start: yearMonth,
    // Leave `end` out for the current role: it feeds the home hero.
    end: yearMonth.optional(),
    type: z.string().optional(),
    mode: z.string().optional(),
    location: z.string().optional(),
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
  }),
});

export const collections = { blog, projects, experience };
