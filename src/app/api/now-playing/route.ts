import { getLatestScrobble } from "@/lib/lastfm";

export async function GET() {
  const data = await getLatestScrobble();
  return Response.json(data, {
    headers: {
      "cache-control": "no-store, no-cache, must-revalidate",
    },
  });
}
