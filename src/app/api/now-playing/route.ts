import { getLatestScrobble } from "@/lib/lastfm";

export async function GET() {
  const data = await getLatestScrobble();
  return Response.json(data, {
    headers: {
      "cache-control": "public, max-age=20, stale-while-revalidate=60",
    },
  });
}
