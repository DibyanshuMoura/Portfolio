import type { Watch } from "@/lib/watches";

export function WatchGrid({
  watches,
  delay,
}: {
  watches: readonly Watch[];
  delay: number;
}) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3">
      {watches.map((watch, index) => (
        <li
          key={watch.title}
          className="watch animate-rise"
          style={{ animationDelay: `${delay + index * 70}ms` }}
        >
          <div className="watch-cover relative aspect-[2/3] overflow-hidden rounded-sm border border-border bg-card">
            <img
              src={watch.cover.src}
              alt={`Poster for ${watch.title}`}
              width={watch.cover.width}
              height={watch.cover.height}
              className="h-full w-full object-cover"
            />
          </div>
          <h3 className="mt-3 text-[0.8125rem] font-bold leading-snug text-foreground normal-case">
            {watch.title}
          </h3>
          <p className="mt-0.5 text-[0.75rem] leading-snug text-muted-foreground normal-case">
            {watch.year}
          </p>
        </li>
      ))}
    </ul>
  );
}
