"use client";

import { useState } from "react";
import { WatchGrid } from "@/components/watch-grid";
import type { Watch } from "@/lib/watches";

const FILTERS = [
  { value: "all", label: "all" },
  { value: "movies", label: "movies" },
  { value: "series", label: "series" },
] as const;

type Filter = (typeof FILTERS)[number]["value"];

export function WatchList({
  movies,
  series,
}: {
  movies: readonly Watch[];
  series: readonly Watch[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible =
    filter === "movies"
      ? movies
      : filter === "series"
        ? series
        : [...movies, ...series];

  return (
    <>
      <div
        role="group"
        aria-label="Filter watches"
        className="animate-rise mt-6 flex items-center text-xs tracking-widest"
        style={{ animationDelay: "80ms" }}
      >
        {FILTERS.map((option, index) => (
          <span key={option.value} className="flex items-center">
            {index > 0 ? (
              <span aria-hidden className="text-terminal-dim">
                /
              </span>
            ) : null}
            <button
              type="button"
              aria-pressed={filter === option.value}
              onClick={() => setFilter(option.value)}
              className={`-my-3.5 inline-block py-3.5 transition-colors duration-150 ${
                filter === option.value
                  ? "text-terminal"
                  : "text-muted-foreground hover:text-terminal"
              }`}
            >
              {option.label}
            </button>
          </span>
        ))}
      </div>

      <div key={filter} className="mt-8">
        <WatchGrid watches={visible} delay={150} />
      </div>
    </>
  );
}
