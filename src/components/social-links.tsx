import { Glyph, type GlyphName } from "@/components/glyph";
import { site } from "@/lib/site";

const LINKS: readonly { label: string; href: string; icon: GlyphName }[] = [
  { label: "GitHub", href: site.links.github, icon: "github" },
  { label: "LinkedIn", href: site.links.linkedin, icon: "linkedin" },
  { label: "X", href: site.links.x, icon: "x" },
  { label: "resume", href: site.resume, icon: "document" },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {LINKS.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            className="icon-link -m-2 inline-flex items-center justify-center p-2"
          >
            <span className="tech-icon text-muted-foreground">
              <Glyph
                name={link.icon}
                fillRule={link.icon === "document" ? "evenodd" : undefined}
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
