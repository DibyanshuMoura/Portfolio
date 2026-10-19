"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Field = "name" | "from" | "subject" | "message";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed"; reason: string };

const ROWS: {
  key: Field;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  {
    key: "name",
    label: "name",
    type: "text",
    placeholder: "your name",
  },
  {
    key: "from",
    label: "from",
    type: "email",
    placeholder: "you@ex.com",
  },
  {
    key: "subject",
    label: "subject",
    type: "text",
    placeholder: "what is the mail about?",
  },
];

const ROW_LAYOUT =
  "flex flex-col items-start gap-y-1 px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3";

const ROW_CLASS = `group ${ROW_LAYOUT}`;

const LABEL_CLASS =
  "shrink-0 text-[0.6875rem] tracking-widest text-terminal-dim transition-colors duration-150 group-hover:text-terminal sm:w-20";

const [emailUser, emailHost] = site.links.email.split("@");

const HINT: Record<"idle" | "sending" | "sent", string> = {
  idle: "sends from this site",
  sending: "sending…",
  sent: "sent — thanks.",
};

function mailtoHref(values: Record<Field, string>) {
  const sender = [values.name, values.from && `<${values.from}>`]
    .filter(Boolean)
    .join(" ");

  const body = [values.message, "", sender ? `Reply to: ${sender}` : ""]
    .filter(Boolean)
    .join("\n");

  return `mailto:${site.links.email}?subject=${encodeURIComponent(
    values.subject || `Hello ${site.name}`,
  )}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    from: "",
    subject: "",
    message: "",
  });
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "sending") return;
    setStatus({ kind: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, trap }),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (response.ok && result?.ok) {
        setValues({ name: "", from: "", subject: "", message: "" });
        setStatus({ kind: "sent" });
        return;
      }

      setStatus({
        kind: "failed",
        reason: result?.error ?? `the site answered ${response.status}`,
      });
    } catch {
      setStatus({ kind: "failed", reason: "the message did not get through" });
    }
  }

  function update(key: Field) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [key]: value }));
      setStatus((prev) => (prev.kind === "idle" ? prev : { kind: "idle" }));
    };
  }

  const fieldClass =
    "min-w-0 w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none sm:text-[0.8125rem]";

  const inputClass = `${fieldClass} sm:w-auto sm:flex-1`;

  return (
    <form onSubmit={handleSubmit} className="panel divide-y divide-border">
      <div className={ROW_LAYOUT}>
        <span className={LABEL_CLASS}>to:</span>
        <span className="min-w-0 break-words text-[0.8125rem] text-foreground">
          {emailUser}
          <wbr />@{emailHost}
        </span>
      </div>

      {ROWS.map((row) => (
        <div key={row.key} className={ROW_CLASS}>
          <label htmlFor={`contact-${row.key}`} className={LABEL_CLASS}>
            {row.label}:
          </label>
          <input
            id={`contact-${row.key}`}
            type={row.type}
            required
            placeholder={row.placeholder}
            value={values[row.key]}
            onChange={update(row.key)}
            className={inputClass}
          />
        </div>
      ))}

      <div className="px-5 py-4">
        <textarea
          id="contact-message"
          aria-label="message body"
          required
          rows={4}
          placeholder="your message"
          value={values.message}
          onChange={update("message")}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div className="hidden" aria-hidden>
        <label htmlFor="contact-trap">company</label>
        <input
          id="contact-trap"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(event) => setTrap(event.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-4">
        <p role="status" className="text-[0.6875rem] text-muted-foreground">
          {status.kind === "failed"
            ? `couldn't send — ${status.reason}`
            : HINT[status.kind]}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {status.kind === "failed" && (
            <a
              href={mailtoHref(values)}
              className="text-[0.6875rem] text-terminal underline decoration-border underline-offset-4 transition-colors duration-150 hover:decoration-terminal"
            >
              send it from your mail client
            </a>
          )}
          <button
            type="submit"
            disabled={status.kind === "sending"}
            className="control disabled:opacity-40"
          >
            send
          </button>
        </div>
      </div>
    </form>
  );
}
