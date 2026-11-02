"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Glyph } from "@/components/glyph";
import type { NowPlaying, Scrobble } from "@/lib/lastfm";

const subscribe = () => () => {};
const ART_FRAME = "size-12 rounded-full border border-terminal-dim/20";

function ago(ms: number) {
  const minutes = Math.max(1, Math.round((Date.now() - ms) / 60000));
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function describe(latest: Scrobble, mounted: boolean) {
  if (latest.nowPlaying) return "playing";
  if (!mounted || !latest.scrobbledAt) return "on last.fm";
  return ago(latest.scrobbledAt);
}

export function NowPlaying({ initial }: { initial: NowPlaying }) {
  const [state, setState] = useState(initial);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [failedArt, setFailedArt] = useState("");

  const artwork = state.latest?.artwork ?? "";
  const artFailed = artwork !== "" && failedArt === artwork;

  useEffect(() => {
    let stopped = false;
    const read = async () => {
      try {
        const response = await fetch("/api/now-playing", { cache: "no-store" });
        if (!response.ok) return;
        const data: NowPlaying = await response.json();
        if (stopped) return;
        setState((previous) => {
          if (!data.latest && previous.latest) return previous;
          return data;
        });
      } catch {}
    };
    const poll = setInterval(read, 30_000);
    void read();
    return () => {
      stopped = true;
      clearInterval(poll);
    };
  }, []);

  const latest = state.latest;

  const link =
    latest?.url ||
    (state.user
      ? `https://www.last.fm/user/${state.user}`
      : "https://www.last.fm");
  const detail = latest ? describe(latest, mounted) : "";
  const empty = state.error || !state.user
    ? "Listening is unavailable right now."
    : "Nothing scrobbled yet.";

  return (
    <div className="panel animate-rise flex items-center gap-4 px-4 py-1.5 sm:px-5 sm:py-2">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0"
      >
        {artwork && !artFailed ? (
          <img
            src={artwork}
            alt=""
            width={48}
            height={48}
            decoding="async"
            onError={() => setFailedArt(artwork)}
            className={`${ART_FRAME} bg-terminal-dim/5 object-cover ${
              latest?.nowPlaying ? "animate-music-spin" : ""
            }`}
          />
        ) : (
          <span
            className={`${ART_FRAME} flex items-center justify-center text-terminal-dim/40`}
          >
            <Glyph
              name="music"
              className={`size-5 ${latest?.nowPlaying ? "animate-music-spin" : ""}`}
            />
          </span>
        )}
      </a>

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
            {empty}
          </span>
        )}
      </a>

      {latest ? (
        <span className="flex items-center gap-1.5 leading-none whitespace-nowrap text-[0.6875rem] text-terminal-dim">
          {latest.nowPlaying ? (
            <span
              className="mt-px size-1.5 rounded-full bg-terminal animate-pulse"
              aria-hidden
            />
          ) : null}
          {detail}
        </span>
      ) : null}
    </div>
  );
}

export function NowPlayingSkeleton() {
  return (
    <div
      className="panel animate-rise flex items-center gap-4 px-4 py-1.5 sm:px-5 sm:py-2"
      aria-hidden
    >
      <span className={`${ART_FRAME} shrink-0 bg-terminal-dim/5`} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="h-[1.3rem] w-28 animate-pulse rounded-sm bg-terminal-dim/10" />
        <span className="h-[1.2rem] w-44 animate-pulse rounded-sm bg-terminal-dim/10" />
      </div>
    </div>
  );
}
