"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { NowPlaying, Scrobble } from "@/lib/lastfm";

const subscribe = () => () => {};

function ago(ms: number) {
  const minutes = Math.max(1, Math.round((Date.now() - ms) / 60000));
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export function NowPlaying({ initial }: { initial: NowPlaying }) {
  const [state, setState] = useState(initial);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  useEffect(() => {
    let stopped = false;
    const read = async () => {
      try {
        const response = await fetch("/api/now-playing", { cache: "no-store" });
        if (response.ok) {
          const data: NowPlaying = await response.json();
          if (!stopped) setState(data);
        }
      } catch {}
    };
    const poll = setInterval(read, 30_000);
    void read();
    return () => {
      stopped = true;
      clearInterval(poll);
    };
  }, []);

  const latest: Scrobble | null = state.latest;

  const link =
    latest?.url ||
    (state.user ? `https://www.last.fm/user/${state.user}` : "https://www.last.fm");
  const detail = latest
    ? latest.nowPlaying
      ? "playing"
      : mounted && latest.scrobbledAt
        ? ago(latest.scrobbledAt)
        : "on last.fm"
    : "";

  return (
    <div className="panel animate-rise flex items-center gap-4 px-4 py-1.5 sm:px-5 sm:py-2">
      {latest?.artwork ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="shrink-0">
          <img
            src={latest.artwork}
            alt=""
            width={48}
            height={48}
            className="size-12 rounded-sm border border-terminal-dim/20 object-cover"
          />
        </a>
      ) : null}

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="min-w-0 flex-1 flex flex-col gap-1"
      >
        {latest ? (
          <>
            <span className="normal-case truncate text-[0.8125rem] text-foreground">
              {latest.track}
            </span>
            <span className="normal-case truncate text-xs text-muted-foreground">
              {latest.artist}
              {latest.album ? ` — ${latest.album}` : ""}
            </span>
          </>
        ) : (
          <span className="prose text-[0.8125rem] text-muted-foreground">
            {state.user
              ? "Nothing scrobbled yet."
              : "Listening is unavailable right now."}
          </span>
        )}
      </a>

      {latest ? (
        <span className="flex items-center gap-1.5 leading-none whitespace-nowrap text-[0.6875rem] text-terminal-dim">
          {latest.nowPlaying ? (
            <span className="mt-px size-1.5 rounded-full bg-terminal animate-pulse" aria-hidden />
          ) : null}
          {detail}
        </span>
      ) : null}
    </div>
  );
}
