import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";
import { skillCategories } from "@/data/skills";

export default function Skills({ className }: { className?: string }) {
  // Define color schemes for each category
  const getIconStyles = (index: number) => {
    const colorSchemes = [
      {
        // Frontend - Blue theme
        bg: "bg-blue-100 group-hover:bg-blue-200",
        icon: "text-blue-600",
      },
      {
        // Backend - Green theme
        bg: "bg-green-100 group-hover:bg-green-200",
        icon: "text-green-600",
      },
      {
        // DevOps & Tools - Orange theme
        bg: "bg-orange-100 group-hover:bg-orange-200",
        icon: "text-orange-600",
      },
      {
        // Design & UX - Purple theme
        bg: "bg-purple-100 group-hover:bg-purple-200",
        icon: "text-purple-600",
      },
    ];
    return colorSchemes[index % colorSchemes.length];
  };

  return (
    <section
      id="skills"
      className={`container px-4 py-12 md:py-24 bg-muted/50 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Skills & Technologies
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Technologies I work with to bring ideas to life
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 ">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            const iconStyles = getIconStyles(index);
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-colors ${iconStyles.bg}`}
                    >
                      <IconComponent className={`h-5 w-5 ${iconStyles.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {category.title}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-muted-foreground font-normal mt-1">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => {
                      const badgeColors = [
                        "hover:bg-blue-500 hover:text-white border-blue-200 hover:border-blue-500", // Frontend
                        "hover:bg-green-500 hover:text-white border-green-200 hover:border-green-500", // Backend
                        "hover:bg-orange-500 hover:text-white border-orange-200 hover:border-orange-500", // DevOps
                        "hover:bg-purple-500 hover:text-white border-purple-200 hover:border-purple-500", // Design
                      ];
                      return (
                        <a href={skill.link} key={skillIndex} target="_blank">
                          <Badge
                            variant="secondary"
                            className={`transition-all duration-200 border ${
                              badgeColors[index % badgeColors.length]
                            }`}
                          >
                            {skill.name}
                          </Badge>
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Skills Summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 mb-4 shadow-sm">
            <Code className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {skillCategories.reduce(
                (total, category) => total + category.skills.length,
                0
              )}
              + Technologies Mastered
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
