import type { SkillCategory } from "@/types/skills.type.ts";
import { Globe, Server, Database, Code, Wrench, Palette } from "lucide-react";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Globe,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Javascript",
      "Tailwind CSS",
      "Vue.js",
      "Astro",
      "JSF",
    ],
    description: "Modern UI frameworks and libraries",
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express", "REST APIs", "Java"],
    description: "Server-side technologies and APIs",
  },
  {
    title: "DevOps & Tools",
    icon: Code,
    skills: ["Vercel", "Git"],
    description: "Development and deployment tools",
  },
  {
    title: "Design & UX",
    icon: Palette,
    skills: ["Figma", "Adobe Suites"],
    description: "Design and user experience",
  },
];
