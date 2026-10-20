import { TechIcons } from "@/components/tech-icons";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const live = project.links.find((link) =>
    link.label.toLowerCase().includes("live"),
  );
  const repoLinks = project.links.filter((link) => link !== live);

  return (
    <article
      className="panel animate-rise flex flex-col overflow-hidden transition-colors duration-150 hover:border-terminal-dim/40"
      style={{ animationDelay: `${(index + 1) * 90}ms` }}
    >
      {project.image ? (
        <div className="border-b border-border bg-card">
          <img
            src={project.image.src}
            alt={project.imageAlt ?? ""}
            width={project.image.width}
            height={project.image.height}
            className="aspect-video w-full object-cover"
          />
        </div>
      ) : (
        <div
          aria-hidden
          className="aspect-video w-full border-b border-border bg-card"
        />
      )}

      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-base font-bold leading-tight text-foreground normal-case">
            {project.name}
          </h3>
          {live ? (
            <a
              href={live.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors duration-150 hover:text-terminal"
            >
              live
            </a>
          ) : (
            <span className="text-xs text-muted-foreground">unhosted</span>
          )}
        </div>

        <p className="text-xs leading-relaxed tracking-widest text-terminal-dim">
          {project.tagline}
        </p>

        <p className="prose text-[0.8125rem] leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <TechIcons items={project.stack} className="mt-1" />

        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
          {repoLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {link.label}
            </a>
          ))}
          {project.links.length === 0 && project.pendingNote ? (
            <span className="text-[0.6875rem] text-terminal-dim">
              {project.pendingNote}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
