import type { SkillCategory } from "@/types/skills.type.ts";
import { Globe, Server, Database, Code, Wrench, Palette } from "lucide-react";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Globe,
    skills: [
      {
        name: "React",
        link: "https://react.dev/",
      },
      {
        name: "Next.js",
        link: "https://nextjs.org/",
      },
      { name: "TypeScript", link: "https://www.typescriptlang.org/" },
      {
        name: "JavaScript",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "Tailwind CSS",
        link: "https://tailwindcss.com/",
      },
      {
        name: "Vue.js",
        link: "https://vuejs.org/",
      },
      {
        name: "Astro",
        link: "https://astro.build/",
      },
      {
        name: "JSF",
        link: "https://jakarta.ee/specifications/faces/",
      },
    ],
    description: "Modern UI frameworks and libraries",
  },
  {
    title: "Backend & Databases",
    icon: Server,
    skills: [
      {
        name: "Node.js",
        link: "https://nodejs.org/",
      },
      { name: "Express", link: "https://expressjs.com/" },
      {
        name: "REST APIs",
        link: "https://restfulapi.net/",
      },
      { name: "Java", link: "https://www.java.com/" },
    ],
    description: "Server-side technologies and APIs",
  },
  {
    title: "DevOps & Tools",
    icon: Code,
    skills: [
      { name: "Cloudflare", link: "https://www.cloudflare.com/" },
      { name: "Vercel", link: "https://vercel.com/" },
      { name: "Git", link: "https://git-scm.com/" },
    ],
    description: "Development and deployment tools",
  },
  {
    title: "Design & UX",
    icon: Palette,
    skills: [
      { name: "Figma", link: "https://figma.com" },
      { name: "Adobe Suites", link: "https://www.adobe.com/" },
    ],
    description: "Design and user experience",
  },
];
