import { site } from "@/lib/site";

export function SocialLinks({ className = "" }: { className?: string }) {
  const { links } = site;

  return (
    <ul
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs ${className}`}
    >
      <li>
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link inline-block -my-3.5 py-3.5"
        >
          github
        </a>
      </li>
      <li>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link inline-block -my-3.5 py-3.5"
        >
          linkedin
        </a>
      </li>
      <li>
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="link inline-block -my-3.5 py-3.5"
        >
          resume
        </a>
      </li>
    </ul>
  );
}
