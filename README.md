# Portfolio

Personal developer portfolio for **Dibyanshu Moura** — a Next.js site that
presents selected projects, technical interests, and contact details. Every page
is prerendered; the only thing that runs on a server is the contact form's mail.

This is not a resume in website form. Read [`PROFILE.md`](./PROFILE.md) for the
source facts and [`DESIGN.md`](./DESIGN.md) for the visual specification.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** (design tokens declared in `src/app/globals.css`)
- **Nodemailer** — the one server dependency: `POST /api/contact` sends the
  contact form's message over SMTP. No database, no auth, no third party.
- All three pages are prerendered and deploy to Vercel as a frontend
  application; only the contact route runs per request.

## Getting started

Requires Node.js 20+ (developed against Node 24).

```bash
npm install
npm run dev      # http://localhost:3000
```

### Contact form

The form posts to `/api/contact`, which sends the message with Nodemailer
through the SMTP account in the environment. Copy [`.env.example`](./.env.example)
and fill in the app password:

```bash
cp .env.example .env
```

On Vercel, set the same names in Project → Settings → Environment Variables.
Gmail needs an app password rather than the account's password (the example file
says where to make one). **Without the variables the site still works**: the
endpoint replies that it has no sending account, and the form shows the reason
with "send it from your mail client" beside it — a `mailto:` built from whatever
the visitor has already typed.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run mail:check` | Verify the SMTP credential, without sending a message |

## Project structure

```
src/
  app/
    layout.tsx             Root layout: fonts, metadata, back-to-top
    page.tsx               Home: hero, activity, skills, why hire me, hire.me
    work/page.tsx          Every project, at overview length
    gear/page.tsx          The desktop, then hardware, software, config files
    api/contact/route.ts   POST: validates and sends the form's mail
    globals.css            Tailwind import + design tokens + component classes
    icon.png               Favicon (Iosevka `d`, generated with ffmpeg)
    fonts/                 Iosevka Nerd Font subset, used by the wordmark only
  components/
    avatar.tsx             GitHub profile picture over the monogram plate
    back-to-top.tsx        Closing `top ↑` control, rendered by the root layout
    contact.tsx            Compose-window form: posts to `/api/contact`
    container.tsx          Max-width, centred page container
    contribution-graph.tsx GitHub commit heatmap
    project-card.tsx       Overview card: name, tagline, summary, stack, links
    section-heading.tsx    `SectionHeading` (`$ cat <file>`) and `RuleHeading`
    setup-carousel.tsx     Desktop screenshots, one at a time
    social-links.tsx       github · linkedin · resume
    tech-badges.tsx        Tag rows, in `solid` or `dim`
    top-bar.tsx            Sticky bar: wordmark + nav
    wordmark.tsx           Landing-page handle that spins into `dibyanshu` on load
  lib/
    gear.ts                Hardware, software, config repo, setup screenshots
    github.ts              Build-time contribution fetch and parse
    mail.ts                Nodemailer transport, read from `SMTP_*` env vars
    projects.ts            Selected projects: stack, verified links, preview
    site.ts                Identity, contact links, technology lists
Assets/
  Screenshots/             Setup and project screenshots (WebP), imported by the app
public/
  resume.pdf               Served at /resume.pdf
scripts/
  check-mail.mjs           `npm run mail:check`: verifies the SMTP credential
```

Screenshots live in `Assets/Screenshots/` and are **imported**, not copied into
`public/` — the bundler emits them under `/_next/static/media/` with a content
hash, and the dimensions come from the file itself.

## Content rules

Content is sourced from `PROFILE.md` and must stay factual:

- Only verified links are rendered. Projects without a confirmed repository or
  demo render a note instead of a placeholder link.
- Learning goals are kept visually separate from demonstrated experience.
- No invented metrics, testimonials, employment, or achievements.

## Documentation

- [`AGENT.md`](./AGENT.md) — development rules
- [`DESIGN.md`](./DESIGN.md) — visual and interaction specification
- [`PROFILE.md`](./PROFILE.md) — verified personal and project facts
- [`PROGRESS.md`](./PROGRESS.md) — current development state
- [`AGENTS.md`](./AGENTS.md) — Next.js agent rules, re-added automatically by
  `next dev`. The hand-written rules are in `AGENT.md`; do not edit this one.
