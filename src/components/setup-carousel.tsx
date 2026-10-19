"use client";

import { useState } from "react";
import { configRepo, type SetupShot } from "@/lib/gear";

export function SetupCarousel({ shots }: { shots: readonly SetupShot[] }) {
  const [index, setIndex] = useState(0);
  const shot = shots[index];

  const step = (delta: number) =>
    setIndex((current) => (current + delta + shots.length) % shots.length);

  return (
    <div className="panel flex flex-col gap-3 p-3">
      <img
        src={shot.image.src}
        alt={shot.alt}
        width={shot.image.width}
        height={shot.image.height}
        className="block w-full rounded-sm border border-border"
      />

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => step(-1)} className="control">
          prev
        </button>
        <button type="button" onClick={() => step(1)} className="control">
          next
        </button>

        <p
          aria-live="polite"
          className="text-[0.6875rem] tracking-widest text-muted-foreground"
        >
          {index + 1} / {shots.length}
        </p>

        <a
          href={configRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="link ml-auto inline-flex items-center gap-1 text-xs"
        >
          config
          <span aria-hidden className="text-terminal-dim">
            ↗
          </span>
        </a>
      </div>
    </div>
  );
}
