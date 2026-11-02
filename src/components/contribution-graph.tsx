import type { Contributions } from "@/lib/github";
import { githubUser } from "@/lib/site";

const LEVEL_BG = [
  "bg-level-0",
  "bg-level-1",
  "bg-level-2",
  "bg-level-3",
  "bg-level-4",
] as const;

const CELL =
  "h-[var(--heatmap-cell)] w-[var(--heatmap-cell)] rounded-[18%]";
const GRID =
  "grid grid-flow-col grid-rows-[repeat(7,var(--heatmap-cell))] gap-[var(--heatmap-gap)]";
const SKELETON_WEEKS = 27;
const SKELETON_SWATCHES = LEVEL_BG.map(() => "bg-terminal-dim/10");

type Month = Contributions["months"][number];

const TIGHT = 3;

function ruler(months: Month[], start: number, end: number) {
  const labels: { label: string; at: number; tight: boolean }[] = [];

  for (const month of months) {
    if (month.week < start || month.week >= end) continue;

    const at = month.week - start;
    const previous = labels[labels.length - 1];
    labels.push({
      label: month.label,
      at,
      tight: previous !== undefined && at - previous.at < TIGHT,
    });
  }

  return labels;
}

function Legend({ swatches }: { swatches: readonly string[] }) {
  return (
    <div className="mt-3 flex items-center justify-end gap-1.5 text-[0.625rem] text-muted-foreground">
      <span>less</span>
      {swatches.map((swatch, index) => (
        <span key={index} aria-hidden className={`${CELL} ${swatch}`} />
      ))}
      <span>more</span>
    </div>
  );
}

export function ContributionGraph({ data }: { data: Contributions }) {
  const block = Math.ceil(data.weeks.length / 2);
  const blocks = [data.weeks.slice(0, block), data.weeks.slice(block)];

  return (
    <div className="heatmap panel p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[0.8125rem] text-foreground">
          {data.total.toLocaleString("en-US")} contributions in the last year
        </p>
        <p className="text-[0.6875rem] text-muted-foreground normal-case">
          @{githubUser}
        </p>
      </div>

      <div className="scroll-x mt-4 pb-1">
        <div
          role="img"
          aria-label={`GitHub contribution activity: ${data.total} contributions between ${data.from} and ${data.to}`}
          className="heatmap-blocks flex w-max items-start gap-x-[var(--heatmap-gap)] gap-y-3"
        >
          {blocks.map((weeks, index) => {
            const start = index * block;

            return (
              <div key={start} className="w-max">
                <div className="relative mb-1 h-3">
                  {ruler(data.months, start, start + weeks.length).map(
                    (month) => (
                      <span
                        key={`${month.label}-${month.at}`}
                        className={`absolute top-0 text-[0.625rem] text-muted-foreground${
                          month.tight ? " heatmap-tight" : ""
                        }`}
                        style={{
                          left: `calc(${month.at} * (var(--heatmap-cell) + var(--heatmap-gap)))`,
                        }}
                      >
                        {month.label}
                      </span>
                    ),
                  )}
                </div>

                <div className={GRID}>
                  {weeks.flatMap((week, weekIndex) =>
                    week.map((day, dayIndex) => (
                      <span
                        key={`${weekIndex}-${dayIndex}`}
                        title={
                          day.date ? `${day.date} · level ${day.level}` : undefined
                        }
                        className={`${CELL} ${LEVEL_BG[day.level]}`}
                      />
                    )),
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Legend swatches={LEVEL_BG} />
    </div>
  );
}

export function ContributionGraphSkeleton() {
  return (
    <div className="heatmap panel p-6" aria-hidden>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="h-[1.3rem] w-56 animate-pulse rounded-sm bg-terminal-dim/10" />
        <span className="h-[1.1rem] w-20 animate-pulse rounded-sm bg-terminal-dim/10" />
      </div>

      <div className="scroll-x mt-4 pb-1">
        <div className="heatmap-blocks flex w-max items-start gap-x-[var(--heatmap-gap)] gap-y-3">
          {[0, 1].map((block) => (
            <div key={block} className="w-max animate-pulse">
              <div className="mb-1 h-3" />
              <div className={GRID}>
                {Array.from({ length: SKELETON_WEEKS * 7 }, (_, cell) => (
                  <span key={cell} className={`${CELL} bg-terminal-dim/10`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Legend swatches={SKELETON_SWATCHES} />
    </div>
  );
}
