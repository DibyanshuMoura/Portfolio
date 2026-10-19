import nodemailer from "nodemailer";
import { site } from "@/lib/site";

type ContactMail = {
  name: string;
  from: string;
  subject: string;
  message: string;
};

export function isMailConfigured() {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
}

export async function sendContactMail({ name, from, subject, message }: ContactMail) {
  const user = process.env.SMTP_USER ?? "";
  const port = Number(process.env.SMTP_PORT ?? 465);

  const pass = (process.env.SMTP_PASS ?? "").replace(/\s+/g, "");

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 15000,
  });

  try {
    await transport.sendMail({
      from: process.env.MAIL_FROM ?? user,
      to: process.env.MAIL_TO ?? site.links.email,
      replyTo: { name, address: from },
      subject,
      text: `${message}\n\nReply to: ${name} <${from}>`,
    });
  } finally {
    transport.close();
  }
}
