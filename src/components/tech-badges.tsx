export function TechBadges({
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
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`badge ${toneClass} hover:text-terminal hover:opacity-100`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
