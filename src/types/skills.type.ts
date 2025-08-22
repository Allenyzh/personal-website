interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
  description?: string;
}

interface SkillsProps {
  className?: string;
}

export type { SkillCategory, SkillsProps };
