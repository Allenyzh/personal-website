import type { SkillCategory } from "@/types/skills.type.ts";
import { Globe, Server, Code, Brain, Palette } from "lucide-react";

export const skillCategories: SkillCategory[] = [
  {
    title: "AI",
    icon: Brain,
    code: "A00",
    slug: "ai",
    level: 80,
    skills: [
      {
        name: "Harnessing",
      },
      {
        name: "AI Agent",
      },
      {
        name: "Skills",
      },
    ],
    description:
      "Exploring the AI landscape — from foundational models to practical applications. Always learning, always experimenting.",
  },
  {
    title: "Frontend",
    icon: Globe,
    code: "F01",
    slug: "frontend",
    level: 92,
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
    description:
      "Modern UI frameworks and libraries — the layer I reach for most.",
  },
  {
    title: "Backend & APIs",
    icon: Server,
    code: "B02",
    slug: "backend",
    level: 78,
    skills: [
      {
        name: "Node.js",
        link: "https://nodejs.org/",
      },
      { name: "Express", link: "https://expressjs.com/" },
      { name: "Python", link: "https://www.python.org/" },
      {
        name: "REST APIs",
        link: "https://restfulapi.net/",
      },
      { name: "Java", link: "https://www.java.com/" },
    ],
    description:
      "Server-side technologies — REST APIs, typed contracts, reliable services.",
  },
  {
    title: "DevOps & Tools",
    icon: Code,
    code: "D03",
    slug: "devops",
    level: 85,
    skills: [
      { name: "Cloudflare", link: "https://www.cloudflare.com/" },
      { name: "Vercel", link: "https://vercel.com/" },
      { name: "Git", link: "https://git-scm.com/" },
    ],
    description: "Development and deployment — edge-first, small and fast.",
  },
  {
    title: "Design & UX",
    icon: Palette,
    code: "X04",
    slug: "design",
    level: 80,
    skills: [
      { name: "Figma", link: "https://figma.com" },
      { name: "Adobe Suites", link: "https://www.adobe.com/" },
    ],
    description:
      "From wireframes to high-fidelity prototypes — visual craft matters.",
  },
];
