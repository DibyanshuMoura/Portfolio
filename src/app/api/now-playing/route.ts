import { getLatestScrobble } from "@/lib/lastfm";

export async function GET() {
  const data = await getLatestScrobble();
  return Response.json(data);
}
