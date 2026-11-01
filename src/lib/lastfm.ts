export type Scrobble = {
  track: string;
  artist: string;
  album: string;
  url: string;
  artwork: string;
  nowPlaying: boolean;
  scrobbledAt: number | null;
};

export type NowPlaying = {
  user: string;
  latest: Scrobble | null;
  error?: boolean;
};

type RecentImage = { "#text"?: string; size?: string };

type RecentTrack = {
  name?: string;
  url?: string;
  artist?: { "#text"?: string };
  album?: { "#text"?: string };
  image?: RecentImage[];
  date?: { uts?: string };
  "@attr"?: { nowplaying?: string };
};

export async function getLatestScrobble(): Promise<NowPlaying> {
  const key = process.env.LASTFM_API_KEY ?? "";
  const user = process.env.LASTFM_USER ?? "";
  if (!key || !user) return { user: "", latest: null };

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(user)}&api_key=${encodeURIComponent(key)}&format=json&limit=1`,
      { cache: "no-store" },
    );
    if (!response.ok) return { user, latest: null, error: true };

    const payload = (await response.json()) as {
      recenttracks?: { track?: RecentTrack[] | RecentTrack };
    };
    const tracks = payload.recenttracks?.track;
    const first = Array.isArray(tracks) ? tracks[0] : tracks;
    if (!first?.name || !first.artist?.["#text"]) return { user, latest: null };

    const uts = first.date?.uts;
    const artwork =
      (first.image ?? [])
        .map((image) => image["#text"] ?? "")
        .filter(Boolean)
        .pop() ?? "";

    return {
      user,
      latest: {
        track: first.name,
        artist: first.artist["#text"],
        album: first.album?.["#text"] ?? "",
        url: first.url ?? "",
        artwork,
        nowPlaying: first["@attr"]?.nowplaying === "true",
        scrobbledAt: uts ? Number(uts) * 1000 : null,
      },
    };
  } catch {
    return { user, latest: null, error: true };
  }
}
