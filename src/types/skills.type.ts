interface Skill {
  name: string;
  link: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
  /** Rendered with the brand tone; reserved for the AI row. */
  highlight?: boolean;
}

export type { Skill, SkillCategory };
