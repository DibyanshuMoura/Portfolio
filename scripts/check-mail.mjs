/**
 * Checks the SMTP credential by itself: `npm run mail:check`.
 *
 * The endpoint tells a visitor "the mail server refused the message", which is
 * the right thing for them to see and useless for working out why. This prints
 * what the mail server actually said. It reads the same `.env` the dev server
 * does, so the value it tests is the value the form uses. `.env.local` is read
 * first if it exists, matching Next.js' own precedence.
 */
import { readFileSync } from "node:fs";
import nodemailer from "nodemailer";

for (const name of [".env.local", ".env"]) {
  let file;
  try {
    file = readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
  } catch {
    continue;
  }
  for (const line of file.split("\n")) {
    const match = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}

const port = Number(process.env.SMTP_PORT ?? 465);
const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

const missing = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"].filter(
  (key) => !process.env[key],
);
if (missing.length > 0) {
  console.log(
    `Missing ${missing.join(", ")} — copy .env.example to .env and fill them in.`,
  );
  process.exit(1);
}

console.log(
  `host ${SMTP_HOST}:${port}  user ${SMTP_USER}  password ${SMTP_PASS.replace(/\s+/g, "").length} characters (spaces ignored)`,
);

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: port === 465,
  requireTLS: port !== 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS.replace(/\s+/g, "") },
  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 15000,
});

try {
  await transport.verify();
  console.log("\naccepted — the credential works and the form can send.");
} catch (error) {
  console.log(`\nrefused: ${error.response ?? error.message}`);
  console.log(`code: ${error.code ?? "unknown"}`);
  if (error.code === "EAUTH") {
    console.log(
      "\nThat is the login being rejected, before any message is sent. The app\n" +
        "password has to be created while signed in as SMTP_USER, and 2-step\n" +
        "verification has to be on for that account — turning it off deletes the\n" +
        "account's app passwords, which looks exactly like this.",
    );
  }
} finally {
  transport.close();
}
