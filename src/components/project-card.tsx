import type { Project } from "@/lib/projects";

function Preview({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image.src}
        alt={`Preview of ${project.name}`}
        width={project.image.width}
        height={project.image.height}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-full items-center justify-center">
      <span
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "1rem 1rem",
        }}
      />
      <span className="relative text-[0.625rem] tracking-widest text-terminal-dim">
        preview pending
      </span>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const live = project.links.find((link) =>
    link.label.toLowerCase().includes("live"),
  );
  const repoLinks = project.links.filter((link) => link !== live);
  const preview = project.image;

  return (
    <article
      className="panel flex flex-col overflow-hidden transition-colors duration-150 hover:border-terminal-dim/40"
    >
      <div
        className={`relative overflow-hidden border-b border-border bg-background ${
          preview ? "" : "h-28"
        }`}
        style={
          preview
            ? { aspectRatio: `${preview.width} / ${preview.height}` }
            : undefined
        }
      >
        <Preview project={project} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-bold leading-none tracking-tight text-foreground normal-case">
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

        <p className="text-xs tracking-widest text-terminal-dim">
          {project.tagline}
        </p>

        <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li
              key={item}
              className="badge text-terminal-dim hover:text-terminal hover:opacity-100"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 text-xs">
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
