import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock } from "lucide-react";
import { Github } from "@/components/common/Github"; // Adjust the import path as necessary
import type { CollectionEntry } from "astro:content";

export default function Projects({
  projects,
}: {
  projects: (CollectionEntry<"projects"> & { readingTime: string })[];
}) {
  return (
    <>
      {projects.map((project, index) => (
        <Card
          key={project.data.slug || project.data.title || index}
          className="flex-1 py-0 pb-4 overflow-hidden transition-all shadow-sm"
        >
          <CardHeader className="flex-1 flex flex-col pt-8">
            <div className="w-full flex items-center justify-between mb-3">
              <Badge variant="outline" className="text-xs">
                Project
              </Badge>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <time dateTime={project.data.pubDate.toISOString()}>
                  {project.data.pubDate.toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 -translate-y-[1.25px]" />
                  <span>{project.readingTime}</span>
                </div>
              </div>
            </div>
            <CardTitle>{project.data.title}</CardTitle>
            <CardDescription>{project.data.description}</CardDescription>
          </CardHeader>
          <CardContent className=" flex flex-col justify-between">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.data.tech.map((tech: string) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-xs capitalize"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 justify-end">
              <Button size="sm" variant="default" asChild>
                <a
                  href={`/projects/${project.data.slug}`}
                  className="hover:scale-110 transition-all duration-200 flex"
                >
                  Read More
                </a>
              </Button>
              {project.data.githubDisable ? null : (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={project.data.github}
                    className="hover:scale-110 transition-all duration-200 flex"
                  >
                    <Github className="h-4 w-4 mr-2 " />
                    Code
                  </a>
                </Button>
              )}
              {project.data.liveDisable ? null : (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={project.data.live}
                    target="_blank"
                    className="hover:scale-110 transition-all duration-200 flex"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
