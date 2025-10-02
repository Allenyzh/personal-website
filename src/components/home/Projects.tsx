import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Github } from "@/components/common/Github"; // Adjust the import path as necessary
import type { CollectionEntry } from "astro:content";

export default function Projects({
  projects,
}: {
  projects: CollectionEntry<"projects">[];
}) {
  return (
    <>
      {projects.map((project, index) => (
        <Card
          key={project.data.slug || project.data.title || index}
          className="flex-1 py-0 pb-4 overflow-hidden hover:shadow-lg hover:scale-102 transition-all shadow-sm"
        >
          <CardHeader className="flex-1 flex flex-col pt-8">
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
                <a href={`/projects/${project.data.slug}`} className="flex">
                  {" "}
                  Read More
                </a>
              </Button>
              {project.data.githubDisable ? null : (
                <Button size="sm" variant="outline" asChild>
                  <a href={project.data.github} className="">
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
