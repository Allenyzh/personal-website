import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      reviseDate: z.coerce.date().optional(),
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
      reviseDate: z.coerce.date().optional(),
      author: z.string(),
      heroImg: image().optional(),
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

const experience = defineCollection({
  loader: glob({ base: "./src/content/experience", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date().optional(),
    currentJob: z.string(),
    currentCompany: z.string(),
    currentCompanyUrl: z.string().optional(),
  }),
});

export const collections = { blog, projects, experience };
