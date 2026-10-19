import { githubUser } from "@/lib/site";

export function Avatar() {
  return (
    <div
      aria-hidden
      className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-sm border border-border bg-card sm:h-32 sm:w-32 md:h-auto md:w-full md:aspect-square"
    >
      <span
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "0.5rem 0.5rem",
        }}
      />
      <span className="relative text-3xl font-bold tracking-tight text-terminal">
        DM
      </span>
      <img
        src={`https://github.com/${githubUser}.png?size=460`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
