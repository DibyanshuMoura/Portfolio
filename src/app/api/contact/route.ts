import { isMailConfigured, sendContactMail } from "@/lib/mail";

const LIMITS = { name: 100, from: 254, subject: 200, message: 5000 } as const;
const MAX_BODY_BYTES = 16 * 1024;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

const hits = new Map<string, number[]>();

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fail(error: string, status: number) {
  return Response.json({ ok: false, error }, { status });
}

function overRateLimit(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((at) => now - at >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_MAX;
}

export async function POST(request: Request) {
  const type = request.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) return fail("unexpected request", 415);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail("that is too long to send", 413);

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return fail("unexpected request", 400);
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return fail("unexpected request", 400);
  }

  const field = (key: string) =>
    typeof body[key] === "string" ? (body[key] as string).trim() : "";

  if (field("trap")) return Response.json({ ok: true });

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (overRateLimit(ip || "unknown")) {
    return fail("too many messages from here — try again later", 429);
  }

  const name = field("name");
  const from = field("from");
  const subject = field("subject");
  const message = field("message");

  if (!name || !from || !subject || !message) {
    return fail("all four fields are required", 400);
  }
  if (name.length > LIMITS.name) {
    return fail(`keep the name under ${LIMITS.name} characters`, 400);
  }
  if (from.length > LIMITS.from || !EMAIL.test(from)) {
    return fail("that does not look like an email address", 400);
  }
  if (subject.length > LIMITS.subject) {
    return fail(`keep the subject under ${LIMITS.subject} characters`, 400);
  }
  if (message.length > LIMITS.message) {
    return fail(`keep the message under ${LIMITS.message} characters`, 400);
  }

  if (!isMailConfigured()) {
    return fail("this site has no sending account set up", 503);
  }

  try {
    await sendContactMail({ name, from, subject, message });
    return Response.json({ ok: true });
  } catch (reason) {
    console.error("contact form: send failed", reason);
    return fail("the mail server refused the message", 502);
  }
}
