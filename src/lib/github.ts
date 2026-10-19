import { cacheLife } from "next/cache";
import { githubUser } from "@/lib/site";

const CONTRIBUTIONS_URL = `https://github.com/users/${githubUser}/contributions`;

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  level: ContributionLevel;
};

export type Contributions = {
  weeks: ContributionDay[][];
  total: number;
  from: string;
  to: string;
  months: { label: string; week: number }[];
};

const CELL = /<td\b[^>]*>/g;
const CELL_ID = /id="contribution-day-component-(\d+)-(\d+)"/;
const CELL_DATE = /data-date="(\d{4}-\d{2}-\d{2})"/;
const CELL_LEVEL = /data-level="([0-4])"/;
const TOOLTIP = /<tool-tip[^>]*>([\s\S]*?)<\/tool-tip>/g;

function parse(html: string): Contributions | null {
  const weeks: (ContributionDay | undefined)[][] = [];

  for (const tag of html.match(CELL) ?? []) {
    const id = tag.match(CELL_ID);
    const date = tag.match(CELL_DATE);
    const level = tag.match(CELL_LEVEL);
    if (!id || !date || !level) continue;

    const weekday = Number(id[1]);
    const week = Number(id[2]);
    if (weekday > 6) continue;

    while (weeks.length <= week) weeks.push([]);
    weeks[week][weekday] = {
      date: date[1],
      level: Number(level[1]) as ContributionLevel,
    };
  }

  if (weeks.length === 0) return null;

  let total = 0;
  for (const match of html.matchAll(TOOLTIP)) {
    const count = match[1].match(/(\d+)\s+contribution/);
    if (count) total += Number(count[1]);
  }

  const grid: ContributionDay[][] = weeks.map((days) =>
    days.map((day) => day ?? { date: "", level: 0 }),
  );

  const days = grid.flat().filter((day) => day.date);
  if (days.length === 0) return null;

  const months: { label: string; week: number }[] = [];
  let previousMonth = -1;

  grid.forEach((week, index) => {
    const first = week.find((day) => day.date);
    if (!first) return;

    const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
    if (month !== previousMonth) {
      months.push({ label: MONTH_LABELS[month], week: index });
      previousMonth = month;
    }
  });

  const sorted = days.map((day) => day.date).sort();

  return {
    weeks: grid,
    total,
    from: sorted[0],
    to: sorted[sorted.length - 1],
    months,
  };
}

export async function getContributions(): Promise<Contributions | null> {
  "use cache";
  cacheLife("hours");

  try {
    const response = await fetch(CONTRIBUTIONS_URL, {
      headers: {
        "User-Agent": "dibyanshu-portfolio",
        Accept: "text/html",
      },
    });

    if (!response.ok) return null;

    return parse(await response.text());
  } catch {
    return null;
  }
}
