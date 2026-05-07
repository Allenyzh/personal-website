interface Skill {
  name: string;
  link?: string;
}

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: Skill[];
  description?: string;
  code?: string;
  slug?: string;
  level?: number;
}

interface SkillsProps {
  className?: string;
}
export type { Skill, SkillCategory, SkillsProps };
