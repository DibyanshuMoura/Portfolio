import { Glyph, type GlyphName } from "@/components/glyph";

const ICONS: Record<string, GlyphName> = {
  React: "react",
  "React.js": "react",
  "Node.js": "node",
  "Express.js": "express",
  MongoDB: "mongodb",
  "MongoDB Atlas": "mongodb",
  JavaScript: "javascript",
  "C++": "cpp",
  SQL: "sql",
  Git: "git",
  Linux: "linux",
  "GitHub REST API": "github",
  "GitHub OAuth": "github",
  "Groq LLM": "sparkles",
  Multer: "upload",
  "Gemini AI": "sparkles",
  Nodemailer: "mail",
  "AI/ML integration": "sparkles",
  "Machine learning foundations": "layers",
  "Data analysis with Python": "python",
  TypeScript: "typescript",
  "Next.js": "nextjs",
  Docker: "docker",
  "System design": "grid",
  "Advanced SQL": "sql",
};

export function TechIcons({
  items,
  className = "",
  tone = "solid",
}: {
  items: readonly string[];
  className?: string;
  tone?: "solid" | "dim";
}) {
  const toneClass =
    tone === "dim" ? "text-terminal-dim" : "text-muted-foreground";

  return (
    <ul className={`flex flex-wrap gap-1 ${className}`}>
      {items.map((item) => {
        const icon = ICONS[item];
        if (!icon) return null;

        return (
          <li key={item} title={item} className={`tech-icon ${toneClass}`}>
            <Glyph name={icon} />
            <span className="sr-only">{item}</span>
          </li>
        );
      })}
    </ul>
  );
}
