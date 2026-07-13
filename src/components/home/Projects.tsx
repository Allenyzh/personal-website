import type { CollectionEntry } from "astro:content";

export default function Projects({
  projects,
}: {
  projects: CollectionEntry<"projects">[];
}) {
  return (
    <div className="flex flex-col border-t border-[#d9d8d3]">
      {projects.map((project, index) => (
        <a
          key={project.data.slug || project.data.title || index}
          href={`/projects/${project.data.slug || project.id}`}
          aria-label={`Read more about ${project.data.title}`}
          className="group relative grid cursor-pointer grid-cols-[40px_minmax(0,1fr)] items-baseline gap-2 border-b border-[#d9d8d3] px-2 py-6 transition-colors duration-150 hover:bg-[#f0efec] md:grid-cols-[60px_minmax(0,1fr)_minmax(0,1.7fr)_160px_80px] md:gap-6"
        >
          <div className="font-mono text-xs text-[#6b6b66]">
            /{String(index + 1).padStart(3, "0")}
          </div>

          <h3 className="m-0 text-lg font-semibold tracking-[-0.01em] text-[#0a0a0a]">
            {project.data.title}
            {project.data.featured && (
              <span className="ml-2 align-[2px] font-mono text-[10px] font-normal text-[oklch(0.62_0.14_150)]">
                ★ featured
              </span>
            )}
          </h3>

          <p className="col-start-2 m-0 text-sm text-[#3a3a38] [text-wrap:pretty] md:col-auto">
            {project.data.description}
          </p>

          <div className="col-start-2 flex flex-wrap gap-1 font-mono text-[11px] text-[#6b6b66] md:col-auto">
            {project.data.tech.map((tech: string) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <time
            dateTime={project.data.pubDate.toISOString()}
            className="col-start-2 text-right font-mono text-xs text-[#6b6b66] md:col-auto"
          >
            {project.data.pubDate.getFullYear()}
          </time>
        </a>
      ))}
    </div>
  );
}
