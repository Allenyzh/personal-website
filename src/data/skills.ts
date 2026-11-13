import type { SkillCategory } from "@/types/skills.type.ts";

export const skillCategories: SkillCategory[] = [
  {
    // Only tools that appear in the projects collection.
    title: "AI Engineering",
    highlight: true,
    skills: [
      { name: "MCP", link: "https://modelcontextprotocol.io/" },
      { name: "Gemini API", link: "https://ai.google.dev/" },
      { name: "Playwright agents", link: "https://playwright.dev/" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", link: "https://react.dev/" },
      { name: "Next.js", link: "https://nextjs.org/" },
      { name: "TypeScript", link: "https://www.typescriptlang.org/" },
      {
        name: "JavaScript",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      { name: "Tailwind CSS", link: "https://tailwindcss.com/" },
      { name: "Vue.js", link: "https://vuejs.org/" },
      { name: "Astro", link: "https://astro.build/" },
      { name: "JSF", link: "https://jakarta.ee/specifications/faces/" },
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "Node.js", link: "https://nodejs.org/" },
      { name: "Express", link: "https://expressjs.com/" },
      { name: "REST APIs", link: "https://restfulapi.net/" },
      { name: "Java", link: "https://www.java.com/" },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Cloudflare", link: "https://www.cloudflare.com/" },
      { name: "Vercel", link: "https://vercel.com/" },
      { name: "Git", link: "https://git-scm.com/" },
    ],
  },
  {
    title: "Design & UX",
    skills: [
      { name: "Figma", link: "https://figma.com" },
      { name: "Adobe Suites", link: "https://www.adobe.com/" },
    ],
  },
];
