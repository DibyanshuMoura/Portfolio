# PROGRESS.md — Portfolio Development Status

## 1. Project Overview

**Objective:** Build a distinctive personal developer portfolio that showcases my identity, projects, technical interests, and engineering approach.

**Important:** This is a personal portfolio, not a resume converted into a website.

**Primary design reference:** `DESIGN.md`

**Development instructions:** `AGENT.md`

**Personal and project information:** `PROFILE.md`

## 2. Current Status

- Overall status: IN PROGRESS
- Existing implementation: VERIFIED (all three routes built, restyled, and checked
  in a real browser as well as by build/lint; the contact endpoint checked by
  request, every form state driven in a real browser, and one message delivered
  through the form and read back out of the mailbox)
- Framework: Next.js 16.4.2 (App Router), React 19.3.0, TypeScript 5
- Styling: Tailwind CSS v4, tokens declared in `src/app/globals.css`
- Backend: one POST route handler, `/api/contact`, which sends the contact form's
  mail with Nodemailer over SMTP. No database, no auth, no third party. Every page
  is still statically prerendered; this handler is the only route that runs per
  request. Sending is verified locally end to end (§5); the deployed site still
  needs the `SMTP_*` variables (§7).
- Routes: `/` (hero, activity, skills, why hire me, hire.me), `/work`,
  `/gear`, `POST /api/contact`, plus Next's stock `/_not-found`
- Content sources: `PROFILE.md` (facts) and the `src/lib/*` modules that render it
- Assets: `Assets/Screenshots/` (WebP, imported by the app), `public/resume.pdf`
- Environment: `.env` (mode 600, git-ignored) holds `SMTP_HOST`, `SMTP_PORT`,
  `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, and `MAIL_TO`; `.env.example` documents
  the same names with the password left blank.
- Version control: Git initialized on `main`; nothing committed yet.
- Build status: PASSING (`npm run build`; `/`, `/work`, `/gear` prerendered as
  static content)
- Lint status: PASSING (`npm run lint`, no findings)
- Test suite: none configured (see §7)

## 3. Known Project Information

### DevLens

- Repository: https://github.com/DibyanshuMoura/DevLens
- Live demo: https://devlensai.vercel.app
- Purpose: GitHub profile analytics.
- Known analysis areas: Coding activity, repository quality signals, language distribution, and contribution consistency.
- Technology areas (exactly the list in `PROFILE.md` §4): HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB Atlas, GitHub REST API, GitHub OAuth, and the Groq LLM API. The project card shows a curated subset; see §7.

### Lost & Found Management System

- Purpose: Connect people who have lost items with people who have found them.
- Technology areas: MongoDB, Express.js, React.js, Node.js, Multer, Gemini AI, and Nodemailer.
- Known workflows: Lost-item reporting, found-item image processing, AI-assisted property extraction, matching, and email notifications.
- Repository URL: NOT YET PROVIDED OR VERIFIED.
- Live demo: NOT YET PROVIDED OR VERIFIED.

## 4. Implementation Notes

- **Fonts.** The site is **monospace-first**: `JetBrains Mono` (via
  `next/font/google`, so Next self-hosts it) sets body, headings, and UI. One
  exception: the top bar's wordmark uses `Iosevka Nerd Font` through the
  `.wordmark` class, with a locally installed copy preferred and a self-hosted
  28 KB lowercase-subset (`.woff2`) as the fallback — the upstream Nerd Font TTF
  is ~14 MB. The original `DESIGN.md` specified "Iosevka Nerd", which is not
  available as a webfont; an intermediate pass used `Geist` + `JetBrains Mono`.
- **Theme.** Monochrome black and white, `#0a0a0a` on `#fafafa`, with depth from
  surface steps and hairline greys only — **no hue anywhere**. One knob sets the
  scale — `html { font-size: … }`, stepped `110%` / `130%` / `140%` / `160%` on
  Tailwind's 640 / 768 / 1024 breakpoints — with every size in `rem`. The palette,
  typography, radii, and motion follow https://heyamit.dev's structure; the
  colour scheme is this site's own (`DESIGN.md` §2–§6, §8). The earlier warm
  "void"/olive theme is gone.
- **Casing.** `body` carries `text-transform: lowercase`, so chrome renders
  lowercase whatever the source says; sentences opt back out with `.prose`, names
  with `normal-case`. The hero `<h1>` is the deliberate exception (`DESIGN.md` §3).
- **Dev indicator.** Disabled via `devIndicators: false` in `next.config.ts`.
- **Screenshots are imports, not `public/` files.** Setup and project shots live in
  `Assets/Screenshots/` and are statically imported, so the bundler hashes them and
  the `width` / `height` come from the file (`DESIGN.md` §7).
- **GitHub activity is build-time.** `src/lib/github.ts` fetches and parses the
  contribution calendar behind `"use cache"` + `cacheLife("hours")`; any failure
  returns `null` and the section says so rather than inventing numbers. The handle
  comes from `site.links.github`.
- **The contact form sends through one route handler.** `POST /api/contact`
  validates the request and hands it to Nodemailer over the SMTP account in the
  environment (`src/lib/mail.ts`); the visitor's address becomes `Reply-To`
  (`DESIGN.md` §7). With no account configured it answers `503` and the form offers
  the visitor's mail client instead, built from what they typed, so the control is
  never dead.
- **Project entries are not links.** Each project exposes more than one action
  (live demo + source), so entries render as text with individual links rather
  than as a single clickable element.
- **Lost & Found link.** The project has no verified repository or demo, so it
  renders a note rather than a placeholder link (per `AGENT.md` §7).
- **Deployment.** `next.config.ts` keeps the default build. `/`, `/work`, and
  `/gear` are prerendered and deploy as static output; `POST /api/contact` deploys
  beside them as a Function and needs the `SMTP_*` variables set in Vercel's
  environment (§7). No separately managed backend service is involved.

## 5. Completed Work

### DONE — 2026-10-19 — `.env` as the single env file, and Git initialized

- **Request:** "make .env and add the necessary vars into them and then initialize
  a git repo if not already".
- **One env file, not two.** The four live values that were in `.env.local` —
  `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — are now in `.env`, with
  `MAIL_FROM` and `MAIL_TO` set to the same mailbox so the file is the whole config
  rather than the minimum. It is mode `600` and matched by `.env*` in `.gitignore`,
  and `git check-ignore` confirms it. `.env.local` is gone: Next.js gives it
  priority over `.env`, so keeping both would have made edits to `.env` silently
  ineffective.
- **The helper follows Next's order.** `scripts/check-mail.mjs` reads `.env.local`
  first if it exists, then `.env`, so it always tests the value the dev server
  would load; its "missing" message now points at `.env`.
- **Git initialized** on `main` with `git init -b main`, no commit made —
  `AGENT.md` §3 says not to commit unless asked. `.gitignore` needed no new
  patterns: it already excluded `node_modules/`, `.next/`, `.env*` (with
  `!.env.example`), `next-env.d.ts`, `*.tsbuildinfo`, logs, and `.vercel`.
  `git status --ignored` shows exactly five ignored paths (`.env`, `.next`,
  `node_modules`, `tsconfig.tsbuildinfo`, `next-env.d.ts`) and seventeen
  untracked source entries, all of which belong in the first commit.
- **Docs updated:** README's setup step and `.env.example` now say `.env`, and §2
  and §7 here record the env file and the repository state.
- **Re-verified after the change:** `npm run mail:check` accepted the credential,
  the dev server reports `Environments: .env` and serves `/`, `/work`, and `/gear`,
  and `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass.

### DONE — 2026-10-19 — Hover tick: added on request, then removed entirely

- **Request:** "add a tick sound on hovering over hoverable items", then "increase
  the sound abit"; the `sound` switch that briefly followed was dropped the same
  day; and finally "remove the sound entirely".
- **What it was, for the record:** a synthesised 22ms noise burst on entering a
  link, button, `.badge`, or the project card — no audio file, one `AudioContext`
  per visit, `(hover: hover)` and mouse-pointer guards only.
- **Removed without trace.** `src/lib/hover-tick.ts` and
  `src/components/hover-tick.tsx` are deleted, `<HoverTick />` is out of the root
  layout, the project card no longer carries `data-tick`, and the tick's section in
  `DESIGN.md`, its mentions in §7/§8 below, and its two lines in `README.md`'s tree
  are gone. Nothing is commented out and no preference key remains.

### DONE — 2026-10-19 — `projects` renamed to `work`

- **Request:** "change projects to work". The bar reads `home work gear`; the route
  moved from `/projects` to `/work` (the route name follows the label, as `/gear`
  does), the page title is `Work — dibyanshu`, and its heading is `$ cat work.md`.
- **Code:** `src/app/projects/page.tsx` → `src/app/work/page.tsx` (`ProjectsPage` →
  `WorkPage`), the `PageKey` union and `NAV` entry in `top-bar.tsx`, and nothing else
  — the data layer keeps its name, since a work page still lists *projects*
  (`src/lib/projects.ts`, `ProjectCard`).
- **Docs:** `DESIGN.md` §7's route table and every `/projects` reference, plus
  `README.md`'s tree, now say `/work`.

### DONE — 2026-10-19 — Comments stripped from the source

- **Request:** "clean up everything no comments". Every comment in `src/` is gone —
  TypeScript, TSX, and CSS alike — with the code untouched. The check that proved it
  parses each file before and after and prints it with `removeComments: true`, so the
  two trees are compared with comments stripped from both sides: the only difference
  left was the now-empty `{ }` JSX containers that had held JSX comments, which were
  removed too. (A first pass used a hand-rolled scanner that silently skipped the
  rest of any file after a template literal containing `${…}`; thirteen comments
  survived it and were removed by hand, and the printer comparison is why the final
  state is trustworthy.)
- **The one comment that was load-bearing** was `eslint-disable-next-line
  @next/next/no-img-element` in three components. The deliberate `<img>` use is now
  expressed in `eslint.config.mjs`, which turns that rule off for exactly those three
  files, so `npm run lint` still reports nothing.
- **Also cleared:** the scaffolding comments in `next.config.ts` and
  `eslint.config.mjs`.

### DONE — 2026-10-19 — `why-hire-me.md` copy replaced with Dibyanshu's own

- **Request:** the panel's text, supplied verbatim in the conversation alongside
  "this for the why-hire-me.md".
- **Replaced, not rewritten.** The three paragraphs went in character-for-character,
  including the contractions the site's earlier copy avoided. Apostrophes are
  written `&apos;` because `react/no-unescaped-entities` rejects a bare one in JSX
  text; they render as typed. Nothing was added, softened, or invented — the panel
  stays subject-neutral, with no technology names, no project references, and no
  metrics.
- **One paragraph was dropped in the swap**, and that is recorded rather than
  quietly lost: the old copy closed on looking for work "where the result is judged
  by whether it genuinely helps someone", which the new text does not repeat. Its
  arc is instead approach → what is brought to a team → growth and contribution.
- **Verified:** lint and `tsc` clean, and the rendered page carries all three
  sentences with their casing intact — `.prose` opts out of the global lowercase
  transform, which is what keeps "I'm" capitalised and the section's shell labels
  lowercase.
- **Docs:** `DESIGN.md` §7 now describes the section as three paragraphs, gives the
  new arc, and records where the copy came from. Its heading also named the file
  `why-hire.me`; the panel actually renders `why-hire-me.md`, so that was corrected
  in the same edit.

### DONE — 2026-10-19 — Compose panel: a `name` row, and a body that fills its width

- **Request:** "in the mail section the writing section is small is width fix it and
  add on more the name filed."
- **The small writing area was a leftover from the previous fix.** The body shared
  its class with the label-row fields, and that class had gained `sm:w-auto` to put
  a field on its label's line. In a block that utility is inert only where the
  element's width is otherwise definite; a `<textarea>` has an intrinsic width of
  about twenty columns, so from `sm` up the body collapsed to **304px inside an
  844px row**. It now takes `w-full` at every width through its own class
  (`fieldClass`), which is what its full-width row always meant. Measured at
  390/600/640/768/1024/1500px, the body matches its row's inner width at all six
  (within half a pixel of sub-pixel rounding), and the panel does not overflow.
- **The `name` row is back**, first among the editable rows, so the panel reads
  `to` → `name` → `from` → `subject` → body. It is required like the others and
  capped at 100 characters by the endpoint. It is what the message is signed with:
  `Reply-To: name <address>`, the form a mail client shows in its reply header, and
  the fallback `mailto:` credits the visitor the same way.
- **Verified end to end, which is now possible because the credential works.** The
  real control was clicked with the fields filled through React's own change path;
  the client sent `{"name":"ada lovelace","from":"visitor@example.com",…}` and the
  endpoint answered `ok`. The delivered message was then read back out of the
  mailbox over IMAP: `Reply-To: ada lovelace <visitor@example.com>`. A second
  message posted straight to the endpoint by `curl` arrived as
  `Reply-To: form check <form-check@example.com>`. Both are test messages in the
  inbox, not real correspondence.
- **The endpoint's guards for the new field, by request:** no `name` → `400 all four
  fields are required`; a 101-character name → `400 keep the name under 100
  characters`; the honeypot still answers `{"ok":true}` without sending; a
  `text/plain` body is still `415`; `GET` is still `405`.
- **Docs:** `DESIGN.md` §7's row table gained `name`, its hover note now names the
  editable rows, and a new paragraph records the textarea's intrinsic width and the
  measurement.

### DONE — 2026-10-19 — Mail panel: `from` and `subject` share the label's line

- **Request:** "in bigger screens the from: and subject: should be same as the to:
  one like same line enter not next line in bigger devices."
- **Cause:** the two fields still carried the phone's `w-full`. From `sm` up the row
  is horizontal, so a field measuring 100% of the row *after* the 5rem label column
  had no room left beside the label and wrapped to a second line. The `to:` row
  never did, because its value is content-sized rather than full-width — which is
  what made the inconsistency visible on the page.
- **Fix:** `sm:w-auto sm:flex-1` on the field class, so a zero flex-basis lets the
  field take exactly what the label leaves, on the label's line. One utility on one
  class; the phone layout is untouched, because the row is still `flex-col` under
  `sm`, where `w-full` remains the right width.
- **Measured**, with the real form rendered at six widths: `to`, `from`, and
  `subject` all report the same line from 640px up (value offset −1.2/−1.5px against
  its label, against −2.1/−2.6px for `to:`), and all three still stack below the
  breakpoint at 600px and 390px (offset 23.8px). Field width grows with the panel —
  383px at 640, 491.5 at 768, 696.5 at 1024, 1117.7 at 1500 — and nothing crosses the
  panel's right edge at any of the six.
- **Docs:** `DESIGN.md` §7's row paragraph now states the one-line rule and the
  measurement behind it.

### DONE — 2026-10-19 — Contact form sends from the site (Nodemailer)

- **Request:** "for the mailing use nodemailer from the site itself." The form had
  been building a `mailto:` URL and handing the message to the visitor's mail
  client.
- **A POST handler and one small mail module.** `POST /api/contact` validates the
  request, throttles it, and hands the message to Nodemailer over the SMTP account
  in the environment (`src/lib/mail.ts`). The visitor's address becomes `Reply-To`;
  `From` must stay the authenticated mailbox, since Gmail rewrites anything else.
  Every page is still statically prerendered — the build lists `/api/contact` as the
  only dynamic route, and the pages still as `○ Static`.
- **Credentials stay out of the repository.** `SMTP_HOST`, `SMTP_PORT`,
  `SMTP_USER`, `SMTP_PASS` (plus optional `MAIL_FROM`, `MAIL_TO`) are documented in
  the new `.env.example`, read per call in `mail.ts`, and supplied locally by the
  git-ignored `.env`. Vercel needs the same names in Project → Settings.
- **No dead control on a deployment without them.** With nothing set the endpoint
  answers `503`, and the footer replaces the send button's neighbour with `send it
  from your mail client` — a `mailto:` built from the current field values — so the
  form still has a working path, and a failed send never costs the visitor what
  they typed.
- **The endpoint trusts the request, not the form.** Measured by request: `415` on
  a wrong content type, `413` past 16 KB, `400` on malformed JSON or a missing,
  malformed, or oversized field, `405` on any other verb, and `429` on the sixth
  message from one address in ten minutes. A hidden `trap` field answers `ok`
  without sending, so a script that fills every input it finds learns nothing.
- **Every client state driven in a real browser**, at 390, 1172, and 1500px:
  `sending…` with the button disabled, `sent — thanks.` with the fields cleared,
  and the three failure texts (no sending account, field rejected, dropped network)
  each showing the mail-client link, with zero horizontal overflow and the footer
  row wrapping to two lines only at the phone width. The live endpoint was also
  hit from the browser, which is how the credential blocker in §7 surfaced.
- **Docs:** `AGENT.md` §Architecture records the one deliberate exception (its own
  rule 16 asks for the reason first), `README.md` gains a contact-form setup
  section, and `DESIGN.md` §7/§9 describe the endpoint, the states, and the
  fallback.

### DONE — 2026-10-19 — `about.md` removed; the activity graph opens the page

- **Request:** "move activity.md and remove about.md."
- **Removing `about.md` is what does the moving.** `about.md` and `activity.log` are
  labels on landing-page `<Section>`s, not files — the page's order was hero →
  `about.md` → `activity.log` → `skills.md` → `why-hire.me` → `hire.me`. With the
  bio section gone, the contribution graph is the first section under the hero, so
  no second edit was needed. Confirmed by reading the rendered page back: the first
  `<Section>` heading is now `$ cat activity.log`, the last is `$ cat hire.me`.
- **The bio's two paragraphs are gone, not hidden.** One was inline JSX, the other
  was `site.direction`. That field was the sentence's only rendering, so it was
  deleted from `src/lib/site.ts` rather than left as dead content — it paraphrased
  `PROFILE.md` §2, which still carries the position, and the `why-hire.me` panel
  below keeps the "how I work" prose. Nothing linked to `/#about`, so no anchor was
  left dangling; the `hire.me` section keeps its own `id` and `scroll-mt`.
- **Docs swept in the same pass.** `DESIGN.md`: the shell-framing example, the
  `.prose` list, the measure-cap note, the whole "About" subsection (now a
  "Removed" note), and §9's route table and nav paragraph. `PROGRESS.md` §2.
  Lint, `tsc --noEmit`, and the production build are clean; the docs and the page
  agree on the new order.

### DONE — 2026-10-19 — Activity graph: two half-year rows on phones; tighter closing gutter

- **The phone graph was readable but too small, and the fix spent height instead of
  hiding the year.** The one row that fitted every width left 3.1px cells at 320px
  and 4.13px at 390px, so the year read as texture. The weeks are now drawn as two
  blocks (27 + 26): **side by side from `sm` up**, where they are one continuous
  strip and the desktop is unchanged to the pixel — measured 17.6px cells,
  `600 + 4.8 + 577.6 = 1182.4px` and `scrollWidth == clientWidth` at 1500px — and
  **stacked below it**, with `--heatmap-cell: min(0.6875rem, 2.933cqw)` and
  `--heatmap-gap: min(0.1875rem, 0.8cqw)`. Same 100/27 arithmetic, so the rows fill
  the panel exactly: **measured 6.13px cells at 320px and 8.18px at 390px, double
  the old ones, whole year still on screen, nothing to scroll.** Cells stay capped
  at the design's own `0.6875rem`, so a 540–639px panel gets that size and a right
  gap rather than oversized cells — the same way the desktop caps at 1462px.
- **The ruler drops a label the next one would run into.** The year opens on a
  partial month, so its label can sit two columns from the next one: 44.8px at the
  desktop step, which clears a three-character `0.625rem` label, but 20.8px at a
  phone's, which does not (the first attempt read `octnov` and `apray`). Below a
  768px *container* the tight label is hidden. 768px is where two columns stop being
  a label's width at every scale in use — 620px at the phone scale, 668px at `md`,
  763px at the desktop one — so every wider ruler is exactly as it was, and the
  640–767px row layout, which overlapped there before, is fixed with it.
- **The closing gutter is `pb-6` on every screen now.** The `top ↑` control sat
  between two `pb-16`s plus its own invisible `py-3`: ~190px of a 390px phone's
  height and ~243px of a desktop's spent on nothing after the last panel. Both side
  gutters are `pb-6` at every width, so the space above and below the label is
  symmetric and steps with the type scale: measured 26.38/25.97 at 320px,
  31.22/31.28 at 640px, 33.62/33.18 at 768px and 38.38/38.38 at 1500px, against
  102.38/102.38 there before. The control's 48–70px box — the ≥ 44px target — is
  untouched. (Asked for on a phone first; "in every screen" came the same day.)
- **Re-measured after the change:** all three routes at 16 widths from 320px to
  1500px — `scrollWidth == clientWidth` on the page and on the scroller, no element
  crossing the right edge, **zero adjacent-label overlap anywhere**, and the closing
  gutter logged per width. The throwaway `/probe` route was deleted again.

### DONE — 2026-10-19 — Phone view: scale ladder, avatar overflow, touch targets

- **The scale knob became a ladder, because one value cannot serve both a phone
  and a 1500px window.** `html { font-size: 160% }` applied at every width, so on
  a 390px phone the body text was 20.8px and the prose ran 26 characters to the
  line — four words, with the top bar wrapping to two lines. The ladder is `110%`
  below 640px, then `130%` / `140%` / `160%` at Tailwind's 640 / 768 / 1024
  breakpoints, so the type scale and the layout utilities step together, and
  `≥ 1024px` — the reviewed desktop — is unchanged. The phone floor of `110%` is
  set by the `0.625rem` micro-labels: at `100%` they would be 10px.
- **The avatar overflowed the page between 768px and 1023px — a pre-existing bug
  the phone pass found.** In the old `[auto_1fr]` hero grid, `h-full w-auto
  aspect-square` was circular: the track took its size from the plate, the plate's
  width from its height, its height from the row, and the row from the text. At
  768px the browser resolved it to an **867px-wide plate in a 756px viewport**,
  which scrolled the page sideways and squeezed the text column to nothing. The
  grid is now `[minmax(0,1fr)_2fr]` with the plate `w-full aspect-square`: a third
  of the row, definite, always square. At 1500px that is 414px against the old
  459px, and at 768px it is 196px against 867px.
- **Touch targets are ≥ 44px at every scale now, and `.control` carries the only
  px value in the layout** (`min-height: 44px`): its rem-based padding is 44.8px at
  the desktop scale but 30.8px at the phone scale, and a touch target is a physical
  size. The nav links (44px) and the hero's social links (48px) get there through
  invisible padding plus a cancelling negative margin, so neither row changes
  visually. Back to top already did this (51px).
- **The contact form was the only thing that clipped.** At 390px the row had 290px
  of content while its label column (70px) plus the 29-character address (249px)
  needed 332px, so the address fell to a line of its own and the `subject`
  placeholder was cut off. Rows now stack on phones (`flex-col items-start`, back to
  `sm:flex-row`), which gives every field the full width, and the address carries a
  `<wbr>` after its local part so the 320px case (a 218px line against a 249px
  address) breaks at the `@` instead of mid-word. Fields are `1rem` on phones
  (`sm:text-[0.8125rem]`), because iOS zooms the page when a focused field is under
  16px and the body size is 14.3px at that scale.
- **The heatmap no longer scrolls: all 53 weeks fit a phone.** The cell was a fixed
  `0.6875rem` while the page scale fell to 110%, so the year measured 812px inside a
  209px panel with 74% of it off-screen behind a hidden scrollbar. The cell is now
  `min(0.6875rem, 1.48214cqw)` against a `container-type: inline-size` panel: the
  design's own size wherever it fits (from ~1462px up, so the desktop is unchanged
  to the pixel — measured 17.6px cells and `scrollWidth == clientWidth` at 1500px),
  and a share of the panel's width below that — 3.1px at 320px, 4.1px at 390px. The
  month ruler drops every other tick below a 380px container, the current month's
  included, since it starts less than its own width from the right edge.
  *(Superseded the same day: the cells proved too small to read, so the phone now
  draws two stacked half-year rows — see the entry above. The container-query
  sizing survives; the 380px tick rule does not.)*
- **Measured, not eyeballed.** A throwaway `/probe` route iframed all three routes
  at 13 widths from 320px to 1500px and reported the root font-size, every element
  crossing the right edge, and the box sizes of the bar, nav, controls, avatar,
  heatmap cells and scroller, and the form's rows. All 39 combinations came back
  with `scrollWidth == clientWidth`. The probe was deleted after the pass.

### DONE — 2026-10-18 — Top bar: title, spinning wordmark, `home` link, quieter wordmark

- **The document title is `dibyanshu`, not the full name.** `layout.tsx` reads
  `site.handle` for both the default title and the `%s — …` template, so the tab
  shows `dibyanshu` on `/` and `Projects — dibyanshu` / `Gear — dibyanshu` on the
  other two routes. It is the same string as the wordmark and the hero `<h1>`, so
  the tab, the bar, and the hero can no longer drift apart. `site.name` still
  carries the full name for the metadata description and prose.
- **The wordmark animates on load — on the landing page only.** `src/components/wordmark.tsx`
  (new, client): the handle's letters cycle the alphabet — `abcdefghi`,
  `bcdefghij`, … — and lock left to right into `dibyanshu` over 31 frames of
  `42ms`. `top-bar.tsx` renders `<Wordmark />` in place of the raw string and no
  longer imports `site`. The flourish is opt-in (`animateWordmark`, off by
  default) and only `src/app/page.tsx` asks for it: `/projects` and `/gear` render
  the handle statically, since the name has already been introduced by then.
- **The wordmark rests muted.** It sat at `terminal` (white) with a `foreground`
  hover, which made the brightest mark in the bar the only one whose hover was
  nearly invisible (`#fafafa` → `#ffffff`, 1.1:1). It now rests at
  `muted-foreground` and brightens to `terminal`, the same pair the nav links use —
  one hover rule for the bar instead of two.
- **`about` left the nav; `home` took its place.** The bar read `about` /
  `projects` / `gear`, with `about` an in-page jump to `/#about`. It is now
  `home` / `projects` / `gear`, pointing at the landing page — which also gives
  `/projects` and `/gear` a second way back besides the wordmark. All three items
  mark themselves with `aria-current="page"`, so exactly one is highlighted on
  every route; previously `/` highlighted nothing, since `about` was not a route.
  The about section kept its `id` and `scroll-mt` for deep links until the section
  itself was removed on 2026-10-19 (§6).
- Every frame is **real text**, so the glyphs stay selectable and the link is
  announced as `dibyanshu` at every tick: the visible letters are `aria-hidden`
  behind an `sr-only` twin. It cannot shift the top bar — the wordmark's face is
  monospaced across `a`–`z`, measured in the shipped subset at 500/1000 em per
  glyph, so no frame has a different width.
- **Verified in a browser, not just in the code.** Headless captures caught the
  spin mid-flight on `/` (`ghijklmno`, `bcdefghij`) while `/projects` and `/gear`
  held `dibyanshu` under the same cold-start timing, four captures per route; and
  with `ui.prefersReducedMotion` forced on the wordmark never leaves `dibyanshu`.
  The component checks `matchMedia` itself, because the `prefers-reduced-motion`
  block in `globals.css` only neutralises CSS animations and cannot reach a JS
  interval.
- The first render is the settled word, so the animation never runs for a visitor
  without JavaScript — the same rule the rest of the site follows. The one-write
  path also satisfies `react-hooks/set-state-in-effect`: the tick is advanced
  inside the interval callback rather than set once from the effect body.

### DONE — 2026-10-18 — Consistency pass: docs, comments, and the favicon

- **The favicon is no longer Next.js' logo.** `src/app/favicon.ico` (the framework
  icon the scaffold shipped with) was deleted and replaced with `src/app/icon.png`:
  a white lowercase `d` in Iosevka Nerd Font Bold — the wordmark's own face — on the
  background colour. Next emits the `<link rel="icon">` from the file convention;
  legibility was checked downscaled to 16px. Regeneration command in `DESIGN.md` §7.
- **`README.md`'s structure section was rewritten.** It still described the first
  scaffold: `site-header.tsx`, `site-footer.tsx`, and `project-row.tsx` (all
  deleted), a layout with a "header, footer", and a home page with a "work"
  section. It now lists the files that actually exist, the three routes, the
  `Assets/Screenshots/` import pipeline, and the difference between `AGENT.md`
  (hand-written rules) and `AGENTS.md` (Next's generated file).
- **`src/lib/github.ts` no longer hardcodes the username.** The contribution URL is
  built from `site.links.github`, so the fetch, the graph's `@handle`, and the
  avatar all follow one source.
- **Stale comments corrected:** `globals.css` (the cursor note named `send` as the
  only `<button>`; the `.prose` note listed a "contribution note" that was removed),
  `avatar.tsx` (it claimed the project previews share the plate-under-photo
  fallback, which they do not), and `contact.tsx` (a redundant `hover:text-terminal`
  beside `.control`, which already hovers to `terminal`).
- **`DESIGN.md` corrected** where it still described removed work: "dots" in the
  `terminal` row, the `rounded-full` pill bullet (unused since the timeline list
  became a chip row), the project-preview fallback claim, and the hover note that
  said `.control` draws its border with `currentColor`. The favicon subsection is
  new, and §3 now carries the command that produces the wordmark's font subset —
  both recipes existed only in a scratch directory before.
- **`PROGRESS.md` brought up to date:** §2 status (three routes, assets, build), §3
  DevLens stack aligned with `PROFILE.md` §4, §4 implementation notes (fonts, the
  monochrome theme and the 160% scale knob, the screenshot-import pipeline, the
  build-time GitHub fetch, the `mailto:` form), and §7, where two claims were
  simply false: the "contrast caveat" (it named the superseded `#7c6f64` palette and
  a WCAG failure that no longer exists) and "no browser/screenshot verification"
  (every route has been checked visually since).
- **`PROFILE.md` §9 records the link check** — result and the one link that could
  not be machine-verified — so the next pass does not have to guess whether it was
  ever done.
- **Left alone on purpose:** `AGENTS.md` is rewritten by `next dev` on every start,
  so it is not edited; deliberately-kept-but-unrendered values (`site.status`, the
  `muted` token, `rounded-md`) stay as they are and are documented where they live.

### DONE — 2026-10-18 — Project scaffold and first home page

- Scaffolded Next.js 16 (App Router, TypeScript, Tailwind v4) into the repository.
- Built the root layout with metadata, header, and footer.
- Built the home page: hero, selected work, about, and contact sections.
- Added `src/lib/site.ts` and `src/lib/projects.ts` as the factual content source.
- Removed the unused `create-next-app` template SVGs from `public/`.
- Replaced the boilerplate `README.md` with project documentation.

> The first visual implementation (cards, pills, `Nemaas` tokens) was **superseded**
> by the minimal redesign on the same day — see §6.

### DONE — 2026-10-18 — DevLens card gets a real preview; the band takes the shot's ratio

- The DevLens card had shown the "preview pending" plate since the cards were
  built. It now carries a real screenshot of the dashboard: the top bar, the profile
  row with its score, and the stats strip.
- **The preview band no longer forces `16/9`.** It takes the image's own ratio (an
  inline `aspect-ratio` from the imported file's dimensions), so nothing is cropped
  or stretched. `16/9` was right for a 16:9 capture and wrong for anything else:
  this shot is 1890×455, so `16/9` would have upscaled it 2.3× and cut the profile
  score off the right edge. Same principle as the setup carousel — the frame serves
  the shot, not the reverse.
- **`project.image` is now a `StaticImageData` import from `Assets/Screenshots/`**,
  not a `/public` path, so project previews and setup screenshots use one asset
  pipeline (bundler-hashed, dimensions from the file). `public/` now holds only
  `resume.pdf`.
- **The screenshot arrived on the clipboard, not as a file.** The owner said a new
  screenshot was added; `~/Pictures/Screenshots/` was empty and nothing on disk had
  changed, but `wl-paste -l` reported an `image/png` — captured with `wl-paste
  --type image/png > clip.png` (1890×455), then re-encoded to WebP (76 KB → 34 KB).
  When a shot "has been added" and no file appears, check the clipboard.
- Lost & Found keeps the "preview pending" plate — there is still no screenshot for
  it, and the repo has none either.
- The card's `live` link was confirmed against `https://devlensai.vercel.app`
  returning 200, closing an earlier open question about whether the deployment was
  still up.
- DESIGN.md §7 (project card preview band) updated.

### DONE — 2026-10-18 — `/gear` opens with the desktop itself (setup carousel)

- The gear page listed the machine but never showed it: `## setup` was the
  hardware/software rows alone. It now leads with three screenshots of the running
  desktop — the wallpaper on its own, the app launcher over it, and fastfetch in
  `foot` beside the LazyVim start screen — one at a time, `prev` / `next` wrapping,
  with a `1 / 3` counter and the config repository linked from the same row.
- **Order is the order the desktop is met**, not file order: background → launcher →
  work. The launcher shot was added by the owner mid-session, after `## setup` had
  already been built.
- **Wrapping, not disabling.** With three shots a disabled end button is inert a
  third of the time, and the counter already reports position.
- **The counter is the live region** (`aria-live="polite"`), not the image: it is the
  only thing that changes on click, and re-announcing a 1920×1200 screenshot every
  step would be noise.
- **Frames are uncropped at the native 8:5.** The project cards now follow the same
  rule (their bands take the shot's own ratio); here the bar and the window edges
  are the content, so a crop would cut the thing being shown.
- **Assets moved to `Assets/Screenshots/` and imported**, on the owner's
  instruction, replacing `public/setup/`. The bundler emits them under
  `/_next/static/media/` with a content hash, so a replaced shot gets a new URL for
  free; static imports also supply the `<img>` `width`/`height`, so there is no
  number to keep in sync and no layout shift. Served files are the WebP encodes
  (392 KB for all three) rather than the sources (3.6 MB of 1920×1200 PNG), which
  stay in `~/Pictures/Screenshots`; the `ffmpeg` line to regenerate them is recorded
  in `src/lib/gear.ts`.
- **Verified by clicking, not by reading the code.** A throwaway probe route rendered
  the real carousel, waited for React to hydrate the buttons, then clicked: `next`
  gave `2 / 3` (launcher), `prev` from the first slide wrapped to `3 / 3`
  (fastfetch). A hidden image on a deliberately slow local endpoint held the load
  event open long enough for the click to land before Firefox's headless capture —
  without it the screenshot fires ~60 ms in, before hydration. Probe route deleted.
- `.control` gained its second call site (`prev`, `next`); label casing is unaffected
  — the alt text describes the screenshots and is not chrome.
- DESIGN.md §7 (new `Setup carousel` subsection, gear page intro), §9 updated.

### DONE — 2026-10-18 — `currently learning` rebuilt as a chip row

- The eight learning topics were a vertical list: `border-l border-border/50`, a
  `9px` full-white dot with a `border-background` ring per item, `space-y-3`
  between them. It spent ~410px of column height and read unfinished next to the
  chip row above it.
- Replaced with a second `TechBadges` row at `terminal-dim`. The section is now two
  chip rows of the same construction, ~90px total, and the tone is the only
  difference: `muted-foreground` for tools in use, `terminal-dim` for topics in
  progress.
- Why chips and not a fixed list: both groups are sets of short labels, and every
  other label set on the site is a chip row. The old list was the only one of its
  kind, its rule was invisible at `border-border/50` against the background, and
  its dots out-weighed the text they marked.
- `TechBadges` gained a `tone` prop (`"solid"` default, `"dim"`), so the chip markup
  lives in one place instead of being duplicated for the second row. Both tones
  keep the same hover — the brighter row is meaning, not interaction.
- The honesty split is unchanged and now reads as weight rather than structure:
  group labels still say which is which, and the dimmer row says the second set is
  not yet something to lean on.
- DESIGN.md §2 (tones), §5 (call sites), §7 (`Timeline list` → `Skills rows`)
  updated.

### DONE — 2026-10-18 — Hero name back to lowercase

- Reversed the casing from the entry below within the same session: the hero
  `<h1>` renders `dibyanshu`, not `Dibyanshu`. It should read the way the wordmark
  above it does — the site's own name for itself is chrome, and chrome is lowercase.
- The `normal-case` class is gone from the heading; `site.displayName` still holds
  `Dibyanshu`, so the DOM keeps the real casing for screen readers and crawlers.
  Only the display changes.
- This makes the owner's name the **one deliberate exception** to the "names opt
  out" rule: handles (`@DibyanshuMoura`) and project names (`DevLens`) are written
  as they are, the hero name is not. DESIGN.md §3 records the exception next to the
  rule so the two are not confused for an oversight.
- The "three names flattened by the lowercase transform" claim in the entry below
  was wrong in the direction it mattered — two names opt out, one does not.

### DONE — 2026-10-18 — Hero avatar sized from the right column

- The avatar was a fixed `8rem` square at every width, which read as a chip sitting
  against a text column roughly five times its height. At `md` and up it is now
  `h-full w-auto aspect-square`: it takes the height of the text beside it and
  derives its width from that, so the two columns start and end on the same lines
  and stay aligned as copy changes.
- Below `md` the hero stacks, so it keeps the fixed `7rem` / `8rem` square — a
  `h-full` square in a single-column grid would resolve against its own height.
- **The sharpness ceiling is GitHub's, not the layout's.** Probed every size that
  might be larger: `?size=460`, `?size=1000`, and the avatars CDN directly at
  `?s=920` and `?s=1024` all return the same `460×460` JPEG (23,385 bytes). So a
  `~29rem` square — ~930 device pixels on a 2× display — is upscaled and soft on
  high-DPI screens, sharp at 1×. A crisper hero photo would need a re-hosted,
  higher-resolution copy, which would then go stale whenever the profile picture
  changes. Left as asked, with the trade recorded in DESIGN.md §7.
- The tag row now wraps `7 + 1` (`linux` alone) because the photo takes width from
  the text column. Noted, not fixed: it is the grid doing its job.

### DONE — 2026-10-18 — Hero shows the short name

- The hero `<h1>` reads `Dibyanshu`, not `Dibyanshu Moura`. It renders
  `site.displayName`, a new field; `site.name` keeps the full name and is still
  what `layout.tsx` metadata and the `/projects` description use, so nothing
  formal got shortened by accident.
- Wordmark, monogram and metadata untouched: the top bar keeps `dibyanshu`
  (`site.handle`, lowercase by design) and the plate keeps its `DM` initials.

### DONE — 2026-10-18 — Avatar is the GitHub profile picture

- The hero avatar is now the real photo, served by GitHub at
  `https://github.com/DibyanshuMoura.png?size=460`. Checked before wiring it: the
  URL 302s to `avatars.githubusercontent.com/u/178694871?v=4` and returns a
  `256×256` JPEG at `size=256` and a `460×460` JPEG (23 KB) at `size=460`. Dropped
  `size=460` for the `8rem` plate, which needs ~448 device pixels at 2×.
- **Not re-hosted.** GitHub is where the picture lives; copying it into `public/`
  would go stale the moment the profile picture changes. The trade is one external
  request at page load, the only one the page makes.
- The diamond plate is still there, underneath the photo, so a slow or failed load
  degrades to the monogram instead of a broken image — the same rule the project
  previews follow. No JS, no `onError`: the `<img>` simply covers the plate.
- `alt=""` and `aria-hidden` on the wrapper: the `<h1>` right beside it already
  names the person, so the image is decoration.
- The handle is no longer derived inside two components. `site.ts` exports
  `githubUser` (the profile URL's path), and both the avatar URL and the heatmap's
  `@handle` read from it.
- DESIGN.md §2 (`card` token), §7 (Hero) updated.

### DONE — 2026-10-18 — DevLens card: `readme.md` link removed

- The card's link row is `source` again. The `README.md` → `#readme` link added
  earlier the same day is gone.
- Reason it was redundant: `source` opens the repository, and the README is the
  first thing on that page. The extra link saved one scroll and cost a whole
  column of the row.
- No other change: `live` still marks the title row, stack tags and summary
  untouched, and `PROFILE.md` §4 remains the place the removed detail lives.

### DONE — 2026-10-18 — Project names keep their real casing

- The project card `<h3>` now carries `normal-case`, so the cards read `DevLens`
  and `Lost & Found Management System`. They had been rendering as `devlens` and
  `lost & found management system` — the global lowercase transform flattening
  product names into description.
- Applies to the whole name element, so both cards are fixed by one rule rather
  than a flag on one project. Everything below the name stays lowercase: tagline,
  stack tags, `live` / `unhosted`.
- Same class as the GitHub handle two entries up, so DESIGN.md §3 now states the
  rule once — **sentences get casing, names get casing, chrome does not** — with
  the handle and the project name as the two named opt-outs.

### DONE — 2026-10-18 — `github activity` rule heading removed

- Dropped `<RuleHeading label="github activity" />` from the `activity.log`
  section. The section now runs `$ cat activity.log` straight into the heatmap
  panel.
- It was the second "what this section is" label stacked on the same spot: the
  shell heading above it already says the section is the activity file.
- `RuleHeading` stays — `/projects` still uses it for `all`, so nothing became
  dead. The import in `page.tsx` was trimmed back to `SectionHeading`.

### DONE — 2026-10-18 — Hero social row: the email link is removed

- The hero's link row is now `github · linkedin · resume`. The `email` `mailto:`
  was the third entry and is gone.
- Contact keeps a single door: the `hire.me` compose form, whose `to:` row states
  the address and whose submit builds the `mailto:`. That is the only mailto the
  landing page produces now — there is **no static email link left anywhere on
  it**.
- `site.links.email` stays in place: the form still uses it as the recipient and
  to label the `to:` row.
- Same reasoning as the entry above — the address was offered twice on one screen,
  and the form is the one of the two that can do something with it.
- DESIGN.md §7 (Hero) records the row as three links, and the rule that the hero
  offers no `mailto:`.

### DONE — 2026-10-18 — Hero: the resume / email buttons are gone for good

- Deleted the two bordered `.control` buttons under the avatar. The hero's left
  grid column is now the monogram plate and nothing else; the wrapper `div` that
  held the pair went with them.
- Both destinations are untouched: `email` and `resume` are links #3 and #4 of the
  hero's own social row (`github · linkedin · email · resume`), and the `hire.me`
  form is the other way to start a message. The buttons were restating links
  sitting inches away, in the boxiest elements on the screen.
- `.control` now has exactly one call site, the contact form's `send`. The class,
  `site.resume`, and `public/resume.pdf` all stay — the social row needs the last
  two.
- Removed rather than hidden: no commented-out JSX, no flag. DESIGN.md §7 (Hero)
  records the decision so it does not get re-added.

### DONE — 2026-10-18 — Activity section: caption dropped, handle cased correctly

- The `activity.log` caption is gone — "Public contribution counts read from my
  GitHub profile. Levels are GitHub's own buckets, not a measure of commits." The
  panel now ends at the `less → more` legend. The grid's `aria-label` and the
  per-cell `title`s still say what the numbers are, so nothing became unexplained
  for a screen reader.
- The heatmap header was rendering `@dibyanshumoura`: the global lowercase
  transform was flattening the handle. It now carries `normal-case` and reads
  `@DibyanshuMoura`.
- The string is no longer hardcoded in the component. It is derived from
  `site.links.github` (`@` + the URL's path), so the handle and the profile link
  it sits next to cannot disagree.
- **A handle is not chrome.** The casing rule was "sentences get real casing,
  chrome does not"; an identifier is the third case — a name that must match the
  thing it names. DESIGN.md §3 now records it next to `.prose`.
- Left alone, and worth a decision: the hero `<h1>` still renders `dibyanshu
  moura` under the same global rule. The wordmark (`site.handle`) is lowercase by
  design and stays that way.

### DONE — 2026-10-18 — Project status markers: text only, and hover marks the link

- `unhosted` — was a `terminal-dim` `.badge`; now a plain `<span>` at `text-xs
  text-muted-foreground`. No box, no border, no chip.
- `live` — was a white `.link` (white at rest, underline on hover); now rests at
  `muted-foreground` and brightens to `terminal` on hover, the same pattern as the
  top-bar nav. It is the same kind of thing as a nav item: a quiet label that turns
  out to be clickable.
- Both markers now share a resting tone, so the card no longer says "live vs
  unhosted" in colour. The only difference between them is that one can be
  hovered, which is exactly the signal that should mark what is clickable.
- The `.badge` class is now **tags only** — two call sites, the home tech tags
  (`muted-foreground`) and the project stack tags (`terminal-dim`).
- Link row unchanged: `source` stays a white `.link` with an underline on hover.
- **README link.** The DevLens card gained a third link, `README.md` →
  `https://github.com/DibyanshuMoura/DevLens#readme`, so the detail cut from the card
  in the entry above is one click away. Lost & Found keeps its `pendingNote` — there
  is no repository to point at.
- DESIGN.md §2 (badges), §5 (tag padding), §7 (Project card marker, Hover states)
  updated to the new rule: **the hover marks the clickable thing and nothing else.**

### DONE — 2026-10-18 — Project cards cut back to an overview

- Removed the feature-bullet list from project cards: dropped the `showHighlights`
  prop and its rendering block, the `highlights` field from the `Project` type, and
  the bullet content for both projects. With bullets and long summaries the cards
  ran ~1070px each and read as a wall of text.
- Summaries cut to 2 sentences / ~165 characters each — 4 lines at card width, down
  from 6–7. DevLens no longer enumerates role matching, the resume cross-check,
  snapshot history or the rate-limit fallback; Lost & Found no longer walks the two
  workflows step by step.
- The detail is **not lost**: `PROFILE.md` §4 holds both feature lists plus the
  engineering decisions, and each project's own README is the detailed source. The
  site is the overview and the signpost; depth belongs one click away.
- `/projects` intro reworded to match — it promised "the moving parts", which the
  card no longer lists in prose. It now says "covers what it does, the stack behind
  it, and the code or demo where there is one".
- Card height ~1070px → ~610px, so both cards land within roughly one screen at a
  1500px window.
- DESIGN.md §7 (Project card, Projects page) now states the rule as **overview, not
  a case study**, and the §9 routes table carries the shorter description.

### DONE — 2026-10-18 — DevLens description rewritten from the project README

- The owner supplied the DevLens `README.md` as the authority on what the project
  actually does. `projects.ts` was rewritten to match it: tagline, summary,
  highlights and stack.
- **Tagline:** `GitHub profile analytics` → `how your GitHub reads to a hiring
  manager` (the README's own framing).
- **Summary:** now leads with the core design decision the README states — measures
  before it writes, deterministic numbers handed to the model as verified signals
  — and drops the vaguer "repository metadata and API insights".
- **Highlights** replaced with five real capabilities from the README instead of
  the four abstracted analysis areas: commit heatmap with streaks, six hygiene
  checks, 20-role fit scoring, resume PDF cross-check, snapshot history.
- **Stack** now reads JavaScript, React, Node.js, MongoDB Atlas, GitHub REST API,
  GitHub OAuth, Groq LLM. Dropped HTML/CSS (implied, low signal) and Express.js
  (never named in the README); added React, MongoDB Atlas, OAuth and Groq, which
  the README names or shows in its own file tree. `LLM integration` became the
  concrete `Groq LLM`.
- `PROFILE.md` §4 was synced in the same pass so the fact store does not drift
  from the site: real feature list, coverage limits the UI states (8 repositories,
  3 pages each, private repos invisible), the technologies, and three engineering
  decisions worth describing later (commits API over the Events API, abort-not-retry
  on rate limits, three-state auth check). PROFILE.md keeps the fuller technology
  list; the card shows a selection.
- Card balance checked: the DevLens card grew by ~5 lines and the two cards in the
  row are now within a few pixels of each other, down from the earlier ~190px of
  empty space in the shorter card. No `items-start` needed.

### DONE — 2026-10-18 — Project cards: clickable is white, static is dim

- The `live` control in a project card's title row is no longer a `.badge`. It is
  a plain white `.link` (`text-xs`) — no border, no chip, no fill, underline on
  hover — matching the repo links further down the same card. Chosen from four
  options.
- `unhosted` stays a `.badge` in `terminal-dim` with no hover: it is a **status**,
  not an action. The rule now recorded in DESIGN.md is that the box marks status
  and never an action, so anything clickable on this card is drawn as a link.
- The visible word is unchanged: still `live`, not the data's `Live demo` label —
  the request was about treatment, so no copy was touched. Rendering
  `{live.label}` instead is a one-line change if wanted.
- No `↗` marker added: the repo links in the same card do not carry one, and
  adding it to only one of two outbound links would read as an inconsistency.
- Rules written into DESIGN.md in three places: §2 (badge tone list — `live` is no
  longer a badge), §7 Project card (the clickability rule, stated as the rule
  rather than as a description of the markup), and §7 Hover states (the `link`
  bullet now says why a clickable thing is never drawn as a box).

### DONE — 2026-10-18 — `about.md` no longer names any project

- Rewrote `site.direction` (the second `about.md` paragraph) to drop the sentence
  enumerating the two projects. It read: *"Both projects below already touch it:
  one pairs deterministic GitHub analysis with an LLM layer, the other uses
  Gemini to read item properties out of uploaded photos."* The two sentences
  around it are unchanged, and nothing new was invented — no fact was added to
  replace the deleted one.
- That sentence had also gone **stale**: it said "below", but the landing page has
  no project section — the projects live on `/projects` — so it was pointing at
  nothing. Removing it fixes the reference as well as the request.
- Second paragraph is now: *"I am steering toward AI and machine learning, with
  data science as the goal. Keeping the deterministic parts deterministic, and
  reaching for a model only where it earns its place, is how I like to build."*
  The closing line is a working philosophy, not a project reference, so it stayed.
- `PROFILE.md` and `site.status.project` ("DevLens") untouched; the latter is
  still deliberately unrendered.

### DONE — 2026-10-18 — Tag padding increased

- `.badge` padding `0.125rem 0.5rem` → **`0.25rem 0.75rem`** — 3.2px / 12.8px to
  6.4px / 19.2px at the current scale, so tag height goes 35px → 41px.
- One class, four call sites, so the tech tags in the hero and `skills.md` grew
  together with the project stack tags and the `live` / `unhosted` markers on
  `/projects`. They are the same component in the same visual family; growing
  only the tech tags would have left badges side by side looking like a mistake.
- Verified by capture: the hero's eight tags still fit one row inside the hero
  column, and both project titles still sit on one line with their badges.

### DONE — 2026-10-18 — Pointer cursor on buttons

- One base rule in `globals.css`: `button:not(:disabled) { cursor: pointer }`.
- Tailwind v4's preflight **removed** the `cursor: pointer` that v3 applied to
  buttons, so they fall back to the browser default arrow. The compose form's
  `send` is the only `<button>` on the site, which made it the single clickable
  thing without a pointer — every other control is an `<a>`.
- A base rule rather than a `cursor-pointer` class on the one element, so any
  button added later inherits the behaviour instead of needing to remember it.
- Confirmed in the compiled CSS: the only rule touching button cursors is
  `button:not(:disabled){cursor:pointer}`; the v4 preflight emits no cursor
  declaration for buttons at all.

### DONE — 2026-10-18 — Back-to-top is text, not a box

- `top ↑` no longer uses `.control`: dropped the border, radius, and padding that
  made it read as a box. It is now a plain text link — `text-sm`,
  `text-muted-foreground`, `hover:text-terminal`, `gap-2` between label and
  arrow — matching the top-bar nav links.
- Kept `px-2 py-3` as **invisible hit area only** so the target still clears the
  44px touch minimum in §8. Nothing is drawn.
- `.control` itself is untouched and still used by the hero resume/email
  controls.
- Verified on a throwaway `/scratch-tt` route (the control sits below the fold in
  a top-anchored headless capture), then deleted; the `href="#top"` class list in
  the served HTML confirms `.control` is gone.

### DONE — 2026-10-18 — `working with` tags trimmed

- Three entries changed in `site.ts` → `workingWith`, the single list behind both
  tag rows: dropped `JavaScript`, dropped `REST APIs`, and `Git & GitHub` →
  `Git`. Ten tags → eight: React.js, Node.js, Express.js, MongoDB, cpp, SQL, Git,
  Linux.
- Both call sites read the same array, so the hero and the `skills.md` section
  changed together with no component edits.
- `PROFILE.md` is untouched. It is the factual record and still lists JavaScript,
  REST API integration, and the GitHub REST API; the site list is now a **curated
  subset** of it rather than a mirror — the verifiable claims stay in PROFILE.md,
  and what gets displayed is a presentation choice.
- Still carrying the old wording, left alone because they were not named: the
  site metadata description in `layout.tsx` ("…with JavaScript, Node.js, REST
  APIs…" — visible to search engines and link previews, not to visitors) and the
  DevLens stack on `/projects` (`JavaScript`, `GitHub REST API`).

### DONE — 2026-10-18 — Reading prose renders in real sentence case

- Added a `.prose` class to `globals.css` (`text-transform: none`) and applied it
  to every sentence on the site: the hero intro, both `about.md` paragraphs, the
  contribution note and its fallback, the four `why-hire.me` paragraphs, and the
  `/projects` + `/gear` intros — 11 paragraphs.
- The global `body { text-transform: lowercase }` remains for **chrome**:
  headings, labels, nav, tags, badges, form labels, the heatmap legend, the skill
  and "currently learning" lists. The rule is now *sentences get casing, chrome
  does not*.
- A named class rather than Tailwind's `normal-case` utility because it is one
  decision in one place — if the casing rule changes again, it changes there, not
  at eleven call sites.
- Side effect worth having: proper nouns are legible again — `Node.js`, `GitHub`,
  `Gemini`, `AI/ML`, `LLM`, `SQL`, `TypeScript`. Lowercasing had been flattening
  them.
- Source text was already written in correct sentence case, so this is purely a
  rendering change; the DOM, metadata, and screen-reader output are unchanged.

### DONE — 2026-10-18 — Back-to-top control at the foot of every page

- New `src/components/back-to-top.tsx`, rendered once by the root layout after
  `{children}`, so `/`, `/projects`, `/gear`, and the 404 page all get it.
  Centred `.control` reading `top ↑`, so it inherits the border and the
  hover-to-white treatment already defined for controls.
- It is an anchor to `#top`, not a `window.scrollTo` handler: works before
  hydration, needs no JavaScript, and gets its smooth scroll from the
  `scroll-behavior` already in `globals.css` (instant under
  `prefers-reduced-motion`).
- `id="top"` moved onto `<body>` in the root layout — one target for every route.
  The home page's `<main id="top">` carried the same id from the initial build
  and nothing referenced it, so it was removed rather than left as a duplicate.
- Accessibility: the arrow is `aria-hidden` and an `sr-only` "back to " prefix
  gives the link the accessible name "back to top" instead of a bare "top".
- Verified with a throwaway `/scratch-tt` route (since the control sits below the
  fold in a top-anchored headless capture — the page wrapper is `min-h-screen`),
  then deleted; routes are back to three and the build is clean.

### DONE — 2026-10-18 — `hire.me` intro prose removed

- Deleted the one-paragraph intro under `$ cat hire.me`. The section is now the
  heading and the compose form, nothing else — which is what the panel already
  says on its own (`to:` / `from:` / `subject:` / body, footer
  `opens your mail client` + `send`), so the removed sentence was restating the
  UI instead of adding to it.
- The paragraph was the last place `site.location` ("India") was rendered. The
  field stays in `site.ts` alongside the deliberately-unrendered `site.status`;
  no longer referenced by any component, so nothing breaks and nothing else had
  to change (no import to prune — `site` is still used for the about prose and
  the hero identity).

### DONE — 2026-10-18 — Prose fills the column; `contact.md` → `hire.me`

- Dropped `max-w-2xl` from the `about.md` paragraphs (previous request), then
  from the four `why-hire-me.md` paragraphs and the intro in the contact section.
  They now run the full column width instead of stopping ~250px short of it.
  Hero intro keeps `max-w-xl` (it already sits in its own grid column); the
  `/projects` and `/gear` intros still carry the cap.
- Renamed the contact section to **`hire.me`**: the shell heading now reads
  `$ cat hire.me` and the section `id` went `contact` → `hire-me`. Nothing
  referenced the old id, since the nav link was removed earlier, so no anchors
  broke. The `Contact` component and the form's internal `contact-*` input ids
  keep their names — they are implementation detail, not visible labels.

### DONE — 2026-10-18 — Scale set to 160%

- `html { font-size: 170% }` → **`160%`** (16px → 25.6px), named explicitly on
  request. One line; every rem-based size and all padding followed.
- Rendered at this scale: container 1434px, body copy 20.8px, section commands
  22.4px, card titles 25.6px, tags 17.6px, micro labels 16px, hero name 38.4px →
  48px (md), wordmark 25.6px, nav links 22.4px, card padding 32px, why panel
  38.4/51.2px, preview band 179.2px.
- Heatmap has plenty of room now: 53 columns × 22.4px = 1187px against 1398px of
  available width at a 1500px window — 211px of slack, the widest margin since
  the scale-ups began.
- **Scale history, for the record:** 125 → 150 → 175 → 160 → 170 → 180 → 170 →
  **160**. The 160–180 band is where this has settled; anything outside it has
  drawn a correction in the next message.

### DONE — 2026-10-18 — Scale eased back to 170%

- `html { font-size: 180% }` → **`170%`** (16px → 27.2px) on request. One line;
  every rem-based size and all padding followed.
- This is the size that was live two steps ago. Worth recording, because the
  requests have bracketed the range from both sides: 160% was called "a bit
  small", 180% prompted "decrease the overall size". 170% is the one size in
  between that was asked for by name, so it is the best-known-good point until
  told otherwise.
- Rendered at this scale: container 1523px, body copy 22.1px, section commands
  23.8px, card titles 27.2px, tags 18.7px, micro labels 17px, hero name 40.8px →
  51px (md), wordmark 27.2px, nav links 23.8px, card padding 34px, why panel
  40.8/54.4px, preview band 190.4px.
- Heatmap comfortable again: 53 columns × 23.8px = 1261px against 1385px of
  available width at a 1500px window — 124px of slack, versus the ~50px it had
  at 180%.

### DONE — 2026-10-18 — Scale raised to 180%

- `html { font-size: 180% }` (16px → 28.8px), up from 170% on request. One line;
  every rem-based size and all padding followed.
- Rendered at this scale: container 1613px, body copy 23.4px, section commands
  25.2px, card titles 28.8px, tags 19.8px, micro labels 18px, hero name 43.2px →
  54px (md), wordmark 28.8px, nav links 25.2px, card padding 36px, why panel
  43.2/57.6px, preview band 201.6px.
- **Watch item — the heatmap.** 53 columns × 25.2px = 1336px. It fits the
  1498px content box at ≥1560px viewports; between roughly 1450px and 1560px it
  quietly falls back to its `scroll-x` scroller. That is the intended fallback,
  not a break, but it is the first element running out of room at this scale, and
  it is the thing to check before going bigger again.

### DONE — 2026-10-18 — Panels are now transparent

- `.panel` dropped its `#121212` fill for `transparent`, so every outlined block
  — the `why-hire-me` prose panel, the contact compose form, the contribution
  graph, and the project cards — now sits directly on the page background with
  only the hairline border separating it. One line in `globals.css`; the four
  call sites inherit it.
- The border, radius, hover-to-`border-terminal-dim/40`, and the row dividers are
  unchanged, so the blocks still read as distinct. Contrast of the body text on
  the page background is unaffected, since no text sat on the old fill.
- `--color-card` is now used by exactly one thing: the `Avatar` monogram plate,
  which keeps its fill because a profile plate is meant to be a surface. Easy to
  make transparent too if you want the whole page uniform.
- Also corrected a stale number in `DESIGN.md` §1, which still said the container
  was 1120px (true at the 125% scale, three scale steps ago).

### DONE — 2026-10-18 — Card bulk cut, `about` link back, hero status line out

- **Project cards were too big.** The cause was the empty `16/9` "preview
  pending" plate: 685 × 385px of nothing per card at this scale. It is now a
  `h-28` band (190px), and the padding went `p-6` → `p-5`. Real screenshots still
  get the full `16/9` frame when `project.image` is set. Each card is roughly
  200px shorter; nothing about the content changed.
- **`about` restored to the top bar**, so the nav is `about` / `projects` /
  `gear`. `about` is the in-page jump `/#about`. `contact` is still not in the
  bar — say the word and it comes back the same way.
- **Removed the hero's `▸ building DevLens — developer analytics for GitHub
  profiles` status line.** `site.status` is kept in `site.ts`, marked as
  deliberately unrendered, so restoring it is one line.
- Also folded in the nav change that was still unverified from the previous
  request: confirmed in the built HTML that `about` and `contact` had left the
  bar and that `contact` no longer appears as a nav target.

### DONE — 2026-10-18 — Scale raised to 170%

- `html { font-size: 170% }` (16px → 27.2px), up from 160% — "a bit small" on
  request. Still one line; every rem-based size and all padding followed.
- Rendered at this scale: container 1523px, body copy 22.1px, section commands
  23.8px, card titles 27.2px, tags 18.7px, micro labels 17px, hero name 40.8px →
  51px (md), wordmark 27.2px, nav links 23.8px, card padding 40.8px, why panel
  40.8/54.4px.
- Heatmap check: 53 columns × 23.8px = 1261px against 1414px of content width, so
  it still fits on a wide desktop rather than falling back to `scroll-x`.
- Top-bar wrap threshold moves from roughly 640px to roughly 700px, per the
  arithmetic above; `DESIGN.md` §8 updated to match.

### DONE — 2026-10-18 — Contact panel rebuilt as a real compose window

- Fields rewritten to read like a mail client: `to` → `from` → `subject`, then
  the body as a full-width block underneath, on request.
- **`to` is static text, not an input.** The `mailto:` always addresses
  `site.links.email`, so an editable `to` would be a control that could not do
  anything — the one thing the project rules forbid. It shows the address in
  `text-foreground` so the destination is checkable at a glance.
- `from` is now an email input (placeholder `you@ex.com`) replacing the old
  name/`reply-to` pair; the visitor's address is appended to the body as a
  `Reply to:` line, so the reply path survives the change.
- Placeholders: `you@ex.com`, `what is the mail about?`, `your message`. All
  three fields are required, as `subject` always was.
- The body row dropped its `message:` label column and now runs the full panel
  width, so it gained `aria-label="message body"` to stay labelled for assistive
  tech. The address was removed from the footer note, since the `to` row states
  it now.

### DONE — 2026-10-18 — Contact form placeholders + visible recipient

- Added placeholders to all four contact fields (`your name`, `you@example.com`,
  `what this is about`, `your message`), so the empty compose panel explains
  itself instead of sitting blank. They render dim
  (`placeholder:text-muted-foreground/60`) and are written lowercase in the
  source, since the global lowercase transform does not reach placeholders.
- Confirmed the recipient: every `mailto:` on the site is built from
  `site.links.email` = `work.dibyanshumoura@gmail.com`, and the built HTML
  contains exactly one mailto target. The address is now also printed beside the
  send button (`opens your mail client · work.dibyanshumoura@gmail.com`) so the
  destination is checkable at a glance, and that row wraps rather than
  overflowing on narrow screens.

### DONE — 2026-10-18 — Scale eased back, bigger top bar, Iosevka wordmark

- Scale `html { font-size: 175% }` → **`160%`** (16px → 25.6px) on request.
  Container 1434px, body copy 20.8px, tags 17.6px, hero name 38.4px → 48px (md).
- **Top bar type increased** so it does not shrink with the page: nav links
  `text-xs` → `text-sm` (19.2px → 22.4px) and the wordmark `text-sm` →
  `text-base` (22.4px → 25.6px). Both are now larger than they were at 175%.
- **Wordmark is now Iosevka Nerd Font.** The upstream TTF is ~14 MB (the whole
  Nerd Fonts glyph set) and the Fontsource builds are ~1 MB, so the subset in
  `src/app/fonts/` was cut from the installed `IosevkaNerdFont-Bold.ttf` down to
  the lowercase alphabet — 28 KB, and all the wordmark can ever need since it
  renders lowercase. Loaded through `next/font/local` as
  `--font-iosevka-nerd` with `preload: false`; `.wordmark` lists the locally
  installed `"Iosevka Nerd Font"` family first, so a visitor who has it installed
  gets it and never downloads the subset.
- **Fixed the hero's horizontal alignment.** The hero applied its gutters
  *outside* the `max-w-4xl` cap while `Container` applies them inside, so the
  avatar sat one gutter (51px at this scale) left of every section heading. The
  hero now uses the same inside-gutter box.
- **Removed the duplicate link row under the contact form.** The github /
  linkedin / email / resume row appeared twice: once in the hero and again as the
  last thing on the page. The bottom copy is gone; the hero keeps it. (There is
  no `<footer>` element in the codebase — that trailing row was the only thing
  that read as one.)
- **Fixed top-bar clipping on narrow screens.** At the new nav size the wordmark
  plus four links overflowed a phone viewport, cutting `gear` and `contact` off
  the right edge (this was already happening at 175%, just less obviously).
  The bar and the nav list now `flex-wrap`, so the nav drops to its own line
  instead of running off the screen.

### DONE — 2026-10-18 — Scale raised to 175%

- `html { font-size: 175% }` (16px → 28px), up from 150%. Still a one-line
  change; all padding and spacing followed automatically.
- Rendered at this scale: container 1568px, body copy 22.75px, section commands
  24.5px, card titles 28px, tags 19.25px, micro labels 17.5px, hero name 42px →
  52.5px (md), control padding 14/28px, card padding 42px, why panel 42/56px,
  contact rows 28px vertical.
- The heatmap is now 53 × 24.5px = 1298px, so it fills the content box on a wide
  desktop and falls back to its `scroll-x` scroller below roughly a 1450px
  viewport. That fallback is by design, but it is the first element to run out of
  room at this scale.

### DONE — 2026-10-18 — Scale raised to 150%

- `html { font-size: 150% }` (16px → 24px), up from 125%. Padding utilities are
  rem-based, so the box padding grew with it — no per-component edits needed.
- Rendered at this scale: container 1344px, body copy 19.5px, section commands
  21px, card titles 24px, tags 16.5px, micro labels 15px, hero name 36px → 45px
  (md), control padding 12/24px, card padding 36px, why panel 36/48px.
- Checked the widest fixed-width element, the 53-column heatmap: 53 × 21px =
  1113px, so it still fits the container rather than needing its scroll fallback
  on desktop.

### DONE — 2026-10-18 — `cpp` tag, more padding, larger scale again

- `workingWith` tag `"C / C++"` → `"cpp"` on request. `PROFILE.md` still records
  C and C++ as the actual languages; only the tag label changed.
- **Scale raised again:** `html { font-size: 125% }` (16px → 20px), up from
  112.5%. Container is now 1120px, body text 16.25px.
- **More padding inside the boxes** on request: `.control` `0.5rem 1rem`,
  `.badge` `0.125rem 0.5rem`, project card and heatmap `p-6`, the
  why-hire-me panel `p-6 sm:p-8`, contact rows and the top bar `py-4`, the
  gear rows `py-4`, and the container `px-5 sm:px-8`.
- Fixed an inconsistency: the contact-row `group` hover was documented but the
  first row was never given `group`, and no label had `group-hover`. All three
  rows and labels now match what `DESIGN.md` describes.

### DONE — 2026-10-18 — Everything lowercase, then scaled up overall

- **Lowercase everywhere** on request. Removed the `uppercase` transforms from
  `.label`, `.label-accent`, the hero role line, the card tagline, and the
  "preview pending" plate, then put `text-transform: lowercase` on `body`.
  Rendered text is lowercase while the DOM keeps its real casing, so screen
  readers, `title` attributes, and metadata are unaffected. Form controls opt
  out with `text-transform: none`.
- **Scaled the whole layout up**, on request, with a single knob:
  `html { font-size: 112.5% }` (16px → 18px). Spacing, container width, and every
  rem-based size now follow it.
- Converted every pixel-sized value that would otherwise have stayed fixed:
  the arbitrary text sizes (`13px`/`11px`/`10px` → `0.8125rem`/`0.6875rem`/
  `0.625rem`), the `.control` and `.badge` padding, the `link` underline offset,
  the heatmap cells and column maths (now `rem`, including the month-label
  offset), the pill dot in the learning list, and both grid textures in the
  avatar and card placeholders. Only 1px hairlines and the 2px radius stay px.

### DONE — 2026-10-18 — why-hire-me rewritten to be about working style

- Rewrote the landing page `why-hire-me.md` panel on request so it no longer
  focuses on a particular subject. It is now four short, subject-neutral
  paragraphs: how work gets approached, how learning happens, what is brought to
  a team, and what the work is for.
- Stripped every technology and project reference out of that section (AI/ML,
  GitHub, Gemini, the LLM layer, the two applications). That ground is already
  covered by `about.md`, `activity.log`, and `/projects`.
- Still no invented metrics, employers, or testimonials.

### DONE — 2026-10-18 — `stack` → `gear`, config repo row, hover states

- **`/stack` renamed to `/gear`** on request: `src/app/stack/page.tsx` →
  `src/app/gear/page.tsx`, `src/lib/stack.ts` → `src/lib/gear.ts` (types renamed
  to `Gear*`, export `gear`), page heading `$ cat stack.yml` → `$ cat gear.yml`,
  and the top-bar nav entry plus its `PageKey` union updated. No references to
  `/stack` remain.
- **Config repository added** under `software`: `config` → "Hyprland / Sway
  configs" linking to `https://github.com/DibyanshuMoura/config`. The link was
  checked for a 200 response, and the label text was taken from the repository's
  own description rather than guessed.
- **Hover states** unified so text goes to pure white on hover: tag `badge`s now
  carry `hover:text-terminal hover:opacity-100` (they previously had no hover at
  all), and the contact rows use a `group` wrapper so the row label brightens.
  The static `unhosted` badge is deliberately left without hover — it is not a
  link, and the effect should mark what is actually clickable.

### DONE — 2026-10-18 — Statusline out, landing work section out, why-hire-me in

- **Statusline removed** on request: `src/components/status-bar.tsx` deleted,
  plus its import and render in all three routes. The page-wrapper `pb-8` that
  existed only to clear the fixed bar was dropped; `main` keeps `pb-16` as the
  closing gutter.
- **Projects removed from the landing page** — the `work.md` section and its
  "all projects →" link are gone. Projects remain at `/projects` and in the top
  nav, so nothing is orphaned.
- **`$ cat why-hire-me.md`** added to the landing page as a `panel` of three
  short paragraphs, written only from facts already in `PROFILE.md` — no
  invented metrics, employers, or testimonials. (Later rewritten to four
  subject-neutral paragraphs about working style — see the entry above.)
- The statusline was the only place that rendered the location, so "based in
  India" moved into the contact copy via `site.location`. The fact itself is
  unchanged.
- Fixed the Next warning about `scroll-behavior: smooth` by adding
  `data-scroll-behavior="smooth"` to `<html>`; it no longer appears.
- Landing page is now: hero → `about.md` → `activity.log` → `skills.md` →
  `why-hire-me.md` → `contact.md`.

### DONE — 2026-10-18 — Multi-page build: projects, activity, stack

- Added `/projects` (all projects with feature bullets and links) and `/stack`
  (hardware and software) as static routes; both share the top bar.
- Added a **GitHub activity** section to the landing page, backed by the real
  public contribution calendar fetched at build time (64 contributions).
- Removed the footer; added the AI/ML + data-science positioning.
- New files: `src/app/projects/page.tsx`, `src/app/stack/page.tsx`,
  `src/lib/stack.ts`, `src/lib/github.ts`,
  `src/components/contribution-graph.tsx`.
- Removed: `src/components/site-footer.tsx`.

### DONE — 2026-10-18 — Monochrome palette + browser-verified fixes

- Switched the palette to **black and white**: `background #0a0a0a`,
  `foreground #fafafa`, `muted-foreground #a3a3a3`, `border #262626`,
  `card #121212`, accent `#ffffff`, dim `#8a8a8a`. The coloured terminal
  variants and the tech-badge colour hash were removed; badges are now one tone.
- Screenshotted the build with **Zen Browser** (headless, throwaway profile).
  That caught three things static HTML checks could not:
  - the **fixed statusline buried the footer** — fixed with `pb-8` on the page
    wrapper so the footer clears the bar;
  - the hero avatar plate floated mid-column — grid changed to `items-start`;
  - the statusline clock showed `--:--` on first paint — now seeded with a
    `requestAnimationFrame` tick (and still lint-clean, since the state update is
    not synchronous in the effect body).
- Re-verified via a delayed Zen capture that the clock hydrates
  (`Sun 18 Oct 16:02`) and the footer is visible.

### DONE — 2026-10-18 — Full terminal layout from reference screenshots

- Rebuilt the page against reference screenshots: top bar, `~ whoami` hero with
  a monogram plate and `resume` / `email` controls, `▸ building …` status line,
  coloured tech tags, social links, `$ cat <file>` section commands
  (`about.md`, `work.md`, `skills.md`, `contact.md`), a two-up project grid with
  preview plates and `live` / `unhosted` badges, a `border-l` learning timeline,
  an email-compose contact form (real `mailto:` submit), a footer, and a
  **fixed bottom statusline** with a live clock.
- Added `public/resume.pdf` (copied from the source résumé) so the `resume`
  control points at a real file.
- **Assets:** the reference's avatar and project screenshots are that author's
  work and were **not** copied. The hero uses a dithered `DM` monogram plate and
  project cards fall back to a "preview pending" plate until real screenshots are
  added (`project.image`).
- New components: `top-bar`, `status-bar`, `section-heading`, `tech-badges`,
  `avatar`, `social-links`, `contact`, `project-card`; removed `site-header`.
- Verified: `npm run lint` clean, `npm run build` static, dev server HTTP 200
  with `/resume.pdf` served as `application/pdf`.

### DONE — 2026-10-18 — Layout modelled on heyamit.dev

- Reproduced the reference layout system in original code: 896px single column,
  sticky blurred header, full-height avatar+text hero, border-only project cards,
  accent uppercase labels, timeline list, `fade-in`.
- Adopted the reference palette and monospace-only typography.
- Added `src/components/project-card.tsx`; removed `project-row.tsx`.

### DONE — 2026-10-18 — Theme adapted from heyamit.dev

- Re-based the palette, typography, radii, and motion on `heyamit.dev`.
- Switched to monospace-first typography (JetBrains Mono only).
- Disabled the Next.js dev indicator (`devIndicators: false`).

### DONE — 2026-10-18 — Minimal redesign

- Replaced `DESIGN.md` with a new minimal, typography-first specification.
- Reimplemented the design tokens and component classes in `src/app/globals.css`
  (`.link`, `.btn`, `.label`; no cards, chips, or shadows).
- Switched fonts to `Geist` + `JetBrains Mono`.
- Rebuilt the page as a single readable column with hairline-divided sections.

## 6. Development Log

### 2026-10-19 — React batches, so a script filling a form must yield before submitting

- **Objective:** verify the new `name` row the way a visitor would — fill the fields
  and press send — rather than only posting to the endpoint with `curl`.
- **The first attempt reported "all four fields are required"** with every field
  visibly filled. The cause was the probe, not the form: React 19 batches the state
  updates from synthetic `input` events and commits them at the end of the task, so
  the submit handler — created in the previous render — still closed over empty
  values although the DOM already showed the text. Yielding one task before
  submitting fixed it, and the outgoing payload (captured by wrapping
  `window.fetch`) became part of the evidence rather than an assumption.
- **Two more delegation traps in the same probe.** `form.requestSubmit()` did not
  deliver a submit event the delegated listener saw, so the probe clicks the real
  `type="submit"` button; and the failure state has to be read after a delay, since
  the fetch is the only thing that produces it.
- **What the run proved:** the endpoint sends, the values a visitor typed survive a
  failed send, and the fallback link credits them — then IMAP read the delivered
  message back with `Reply-To: ada lovelace <visitor@example.com>` on it.
- **One thing worth keeping from the blocked period:** a rejected credential and a
  mistyped address are the same `535` in the log, and an app password's displayed
  spaces are cosmetic but fatal if passed on unreduced (`mail.ts` and the check
  script both strip them).

### 2026-10-19 — A full-width field cannot share a line with its label

- **Objective:** the `from:` and `subject:` values should sit on their labels' lines
  on bigger screens, the way the `to:` row's address does.
- **The bug was a leftover phone rule.** `w-full` is right for the stacked phone
  layout and stayed in effect after the row turned horizontal at `sm`: the label
  column took its 5rem, the field asked for 100% of the row on top of that, and the
  value dropped to the next line. The `to:` row is the control case — its value is
  content-sized, so it never wrapped — and that contrast is what made the cause
  obvious rather than a matter of guessing at flex properties.
- **Fix, then proof by measurement.** `sm:w-auto sm:flex-1` on the field class, and
  the real form rendered at 390/600/640/768/1024/1500px: same line for all three
  rows above the breakpoint, stacked for all three below it, and no overflow at any
  width. A wrapped field and a shared one differ by about 25px of vertical offset,
  which is the number the probe reports — so this is a change that was verified
  rather than eyeballed, then confirmed in a screenshot at 1024px.

### 2026-10-19 — Nodemailer: one function behind an otherwise static site

- **Objective:** "for the mailing use nodemailer from the site itself."
- **The rule was the first thing to settle, not the code.** `AGENT.md`
  §Architecture forbids a custom API and asks, in its rule 16, for an explanation
  before any server-side feature is introduced. The request overrides the rule, so
  the exception is recorded there with its reason instead of left as a contradiction
  between the docs and the repository. Everything else the rule protects still
  holds: no database, no auth, no Express/Mongo, no separately managed service,
  secrets only in env vars, every page still prerendered.
- **`cacheComponents` decided how the handler is written.** With cache components
  enabled the route segment `runtime` export is *forbidden* — the docs say to remove
  it, `runtime = 'nodejs'` included — so the handler relies on Node being the
  default, which is what Nodemailer needs regardless. POST handlers are never
  cached, so the route is dynamic while the pages stay static, and the build output
  shows exactly that split.
- **The measurement that mattered was the client's.** The first probe reported each
  state against the wrong case. The cause was React StrictMode double-invoking
  effects in development: two sequences driving one form at once. Holding each
  response open until the case that owned it released it — and guarding the probe
  with a module-level flag — made every label match its outcome at every width.
- **A stubbed `fetch` was the other probe bug.** Reporting through the same global a
  case had just replaced meant the reports were swallowed by the stub, which looked
  like missing data rather than a bug in the tool. The probe now binds the real
  fetch before overriding anything.
- **The credential was the unresolved half, and it is resolved now.** The first app
  password read correctly (16 characters, with the spaces Google displays stripped),
  but Gmail answered `535-5.7.8 Username and Password not accepted`, so no mail had
  been delivered and a visitor would have seen the fallback. One request did prove
  the rest of the path — DNS, TLS on 465 and the SMTP conversation all worked, and
  Gmail's server answered, refusing only the login — which is what kept the
  diagnosis on the credential rather than the code. A replacement password written
  into `.env.local` at 15:53 on 2026-10-19 sent a real message, read back out of the
  mailbox over IMAP.

### 2026-10-19 — Deleting `about.md` is what "move activity.md" meant

- **Objective:** "move activity.md and remove about.md."
- **Neither name is a file.** They are the `file=` labels on the landing page's
  `<Section>`s, so the request was about section order. Deleting the bio section
  already puts `activity.log` first — the graph now sits directly under the hero —
  so the move required no code beyond the deletion, which is why the alternative
  readings (activity before skills, or before the contact panel) were worth asking
  about first rather than guessing.
- **The removal had one non-obvious consequence.** The bio's second paragraph was
  `site.direction`, and the only place it rendered was that section. It was deleted
  from `site.ts` instead of being left as an unused field, on the same reasoning the
  project applies to dead UI: the position it paraphrased is still in `PROFILE.md`
  §2, so it is recoverable from the source of truth rather than from dead code.
- **Cheap to verify, so verified.** Lint, `tsc --noEmit`, and a production build
  after the change, plus a read of the rendered home page to confirm the section
  order and that no `about` heading, id, or `/#about` link remains anywhere.

### 2026-10-19 — Two rows beat tiny cells, and the `top ↑` gutter

- **Objective:** "the commit activity one is looking too small on the phone" (and,
  in the same message, "the top text at the bottom … takes too much space like top
  and bottom reduce it.").
- **The previous fix had traded legibility for fit.** Making the one row fit put
  every cell at 3–4px on a phone, which is a texture, not a calendar. Asked to
  choose, the answer was **two half-year rows**: the whole year, no scrolling, each
  row with its own ruler. That doubles the cell (6.13px at 320px, 8.18px at 390px)
  for ~100px of height, and the blocks only stack below `sm`, so the desktop stays
  one strip to the pixel.
- **The interesting part was the ruler, not the cells.** Stacking exposes a label
  that the single row never had to show twice: the year's first month is partial, so
  its label can land two columns from the next one. At the desktop step that is
  44.8px and harmless; at a phone's it is 20.8px and the first attempt rendered
  `octnov` and `apray`. A `tight` flag plus one container-query rule hides it below
  a 768px container — the point where two columns stop being a label's width at
  every scale in the ladder.
- **The gutter was the same species of problem as the graph.** `pb-16` on both
  `main` and the control is right at the desktop scale and absurd at 110%: the gap
  after the last panel came to ~190px of a 390px screen. It is `pb-6` at every width
  now (the same request arrived twice: first for the phone, then "in every screen"),
  which keeps the two sides symmetric — 26.38px on a phone, 38.38px on the desktop,
  against 102.38px there before — and still steps with the type scale, since it is
  rem-based. The anchor's own `py-3` supplies the visible offset, so nothing moved
  except the page's own tail.
- **A screenshot trap worth remembering.** Headless Firefox paints only the window
  viewport and pads anything past ~3600px with black, so a tall shot of a 3690px
  page shows the footer slot as empty and looks like a missing element. It is not:
  the control measures 63 × 48px with `color: rgb(163,163,163)` and `visibility:
  visible`. To photograph the end of a long page, render it shifted up
  (`translateY(calc(100vh - 100%))` inside an `overflow: hidden` box) instead of
  making the window taller.
- **The probe grew an overlap metric.** Rect math on adjacent labels
  (`previous.right - next.left`, worst case across blocks) is what caught the
  collision a screenshot only showed as `octnov`; it now reports 0 at all 48
  route/width combinations.

### 2026-10-19 — The graph fits a phone; the form stacks

- **Objective:** "in mobile view make the whole commit one smaller so that whole
  section is visible in the phone."
- **Read as: make the strip fit, not make it one step smaller.** Stepping the cells
  down would still have left the year wider than any phone — 53 weeks at 6px is
  320px of graph in a 209px panel — so the size had to come from the panel instead
  of from a number. `cqw` does that with no JavaScript, and `min()` against the
  design's own `0.6875rem` keeps the desktop exactly as reviewed: measured 17.6px
  cells and a 1182px strip at 1500px, the same as before the change.
- **The measurement caught what eyeballing would not.** The graph fitted, but the
  current month's label started 8px from the right edge with a 20px label behind
  it, so the strip still scrolled those 8px — and the label would have shown as
  `oc`. Two container-query rules now drop every other month, and the last one with
  them, below a 380px container.
- **The form was the same shape of problem.** A 290px row against 332px of content:
  the address moved to its own line and the `subject` placeholder was clipped.
  Stacking the label above its field on phones gives every field the full width, and
  a `<wbr>` after the address's local part keeps the 320px break at the `@`.
- **Both came out of the same probe**, extended with cell-size, ruler-count and
  row-rect metrics rather than a new tool.

### 2026-10-19 — Phone view made comfortable, and the avatar bug it uncovered

- **Objective:** "make all the elements size smaller for other devices like phone
  etc cause its too big in the phone view and fix all the other things for phone
  view."
- **The scale knob was the whole complaint.** At 160% a 390px phone showed 20.8px
  body text and 26 characters per line. Rather than patch individual sizes, the
  knob became a four-step ladder keyed to Tailwind's breakpoints (§3 of
  `DESIGN.md`), which keeps `≥ 1024px` pixel-identical to what had already been
  reviewed. The floor came from the smallest text on the site, not from taste: at
  `100%` the `0.625rem` micro-labels are 10px.
- **How the phone view was measured.** Hand-capturing three pages at 390px would
  only have shown the obvious. A throwaway `/probe` route iframed all three routes
  at 13 widths (320 → 1500px) and posted measurements to the dev server's log —
  root font-size, page `scrollWidth` vs `clientWidth`, every element crossing the
  right edge, and the boxes for the bar, nav, controls, avatar, form and heatmap.
  That is what caught the avatar, which no capture at 390px or 1500px ever would
  have: it only breaks between 768px and 1023px.
- **The 768px case is the reason to measure the middle.** The hero's first grid
  column was sized by its own content (`auto`) while the plate inside it was sized
  by the row's height — a circle the browser broke by letting the plate overflow.
  Fixing it changed the desktop too (459px → 414px at 1500px), which is worth
  noting: the fix was not "free" at the widths that already worked, it was a
  smaller plate in exchange for a layout that holds at every width.
- **Touch targets.** Found by measurement that `.control` is 44.8px at 160% but
  30.8px at 110%, so the site's own "≥ 44px" claim only held on desktop. Chose a px
  floor over a rem one: a rem floor big enough at 110% would have made the buttons
  ~70px tall at 160%.
- **Kept out, then asked for:** the heatmap still scrolled horizontally and started
  at the oldest week, showing about a quarter of the year at a time on a phone. It
  was recorded in `DESIGN.md` §8 as an open question rather than decided here — and
  the owner asked for it directly the same day, so it was rebuilt to fit instead
  (see the entry above).

### 2026-10-18 — Title set to the handle; wordmark spin and tone; `about` → `home`

- **Objective:** Owner asked for the tab title to read `dibyanshu`, for the top
  bar's handle to animate on load, for the bar's `about` entry to become `home`,
  and for the handle to rest at a normal colour and go white on hover.
- **Wordmark tone:** it rested at `terminal` and hovered to `foreground`, so the
  brightest thing in the bar was also the only element whose hover did nothing
  visible. Swapped to `text-muted-foreground hover:text-terminal` — the nav links'
  pair, making one hover rule for the whole bar.
- **Nav:** `about` jumped to `/#about`, which read like a section index rather
  than a destination. `home` points at the landing page and marks itself active
  there, so the bar now shows where you are on all three routes instead of only
  two.
- **Title:** pointed both the default and the `%s — …` template at `site.handle`
  instead of the literal full name, which also removes the one place the short form
  and the full name could drift apart without anyone noticing.
- **Wordmark:** built as a client component rather than CSS. The letters are a
  string per frame, so the text stays real and the link's accessible name stays
  `dibyanshu` while the spin runs. Before writing it, measured the `a`–`z` advances
  in the shipped subset with `fontkit` (500/1000 em, all of them) to confirm
  cycling letters cannot change the bar's width.
- **Lint:** the first draft called `setTick(0)` from the effect body and tripped
  `react-hooks/set-state-in-effect`; the tick is now advanced inside the interval
  callback, at the cost of one `42ms` frame before `abcdefghi` appears.
- **Verification:** headless captures caught the spin mid-flight on `/`
  (`ghijklmno`, `bcdefghij`) while `/projects` and `/gear` stayed on `dibyanshu`
  under the same cold-start timing, four captures per route; with
  `ui.prefersReducedMotion=1` in the browser profile, three captures in a row read
  `dibyanshu` with no spin. Titles confirmed from the rendered HTML: `dibyanshu`,
  `Projects — dibyanshu`, `Gear — dibyanshu`. Nav checked per route: `home`,
  `projects`, `gear`, with `aria-current="page"` moving to the matching item on
  each route and no `/#about` link left anywhere. Lint clean, `tsc --noEmit`
  clean, production build static.

### 2026-10-18 — Consistency pass across the repo

- **Objective:** Owner asked to "clean every mess up" and to make sure every file,
  including the Markdown, was correct.
- Audited the tree properly — code, CSS call sites, exported symbols, and all five
  documents — instead of trusting memory. What it turned up: `README.md` still
  documented deleted files (`site-header.tsx`, `site-footer.tsx`, `project-row.tsx`);
  `PROGRESS.md` §7 warned about a `#7c6f64` contrast failure from a palette that no
  longer exists and claimed the layout had never been checked in a browser;
  `DESIGN.md` still described timeline dots and a `.control` hover rule that was
  never written that way; four source comments described removed or imagined
  behaviour; `github.ts` hardcoded a username every other module derives; and the
  browser tab still wore the Next.js logo.
- Replaced the stock `favicon.ico` with a generated `src/app/icon.png` and deleted
  the old file. Everything else was a correction to prose or a one-line
  single-sourcing fix — none of it changes how the site looks.
- **Verification:** lint clean; `tsc --noEmit` clean; production build static with
  all three routes prerendered; every route 200 and captured at desktop and narrow
  widths; `<link rel="icon">` present in the rendered head.

### 2026-10-18 — `gear` rename, config row, hover pass

- **Objective:** Owner asked to rename `stack` to `gear`, add their config
  repository to the software list, and add hover effects that take text to white.
- Renamed the route, the data module, the exported types, the page heading, and
  the nav entry; verified nothing still points at `/stack`.
- Checked `https://github.com/DibyanshuMoura/config` returns 200 and read its
  description through the GitHub API before labelling the row — it is a real
  repository of Hyprland/Sway config files, so no wording was invented.
- Added hover-to-white to the tag badges. The hover colour is applied with
  utilities rather than in `@layer components`: Tailwind emits `components`
  before `utilities`, so a `.badge:hover` rule there loses to
  `.text-muted-foreground`. Only the base `transition` lives in the component
  class. The `unhosted` badge is left static on purpose.

### 2026-10-18 — Projects route, GitHub activity, stack page

- **Objective:** Owner asked for AI/ML + data-science positioning, footer
  removal, a `/projects` route, a GitHub activity section on the landing page,
  and a `/stack` route listing PC hardware and software.
- **Footer** removed (`site-footer.tsx` deleted); `main` carries `pb-16` as the
  closing gutter. (The statusline was removed in the following change — see the
  entry above.)
- **Positioning** moved to AI/ML with data science as the goal, in `site.ts`
  (role, intro, new `direction`) and `PROFILE.md` §1, §2, §3, §8.
- **`/projects`** reuses the project cards with a new `showHighlights` prop.
- **Activity section:** GitHub exposes the contribution calendar only on the
  profile page, so `src/lib/github.ts` fetches and parses it at build time. The
  parse was validated against the live response before being wired in: 365 day
  cells, 0 weekday mismatches, 64 contributions, 2025-10-19 → 2026-10-18.
  `'use cache'` + `cacheLife("hours")` per the cache-components guide; `null` on
  failure so nothing is fabricated.
- **`/stack`:** hardware read off the machine (`lscpu`, `nvidia-smi`, `lsblk`,
  DMI) and software detected on it. Every external link was checked for a 200
  response before being added. Hardware rows are unlinked. **The owner confirmed
  the detected specs as correct on 2026-10-18**, and also confirmed keeping
  "Machine learning foundations" and "Data analysis with Python" in the
  currently-learning list.
- **Verification:** lint clean; build static (`/`, `/projects`, `/stack`, home
  `Revalidate 1h`); Zen captures of all three routes reviewed.

### 2026-10-18 — Monochrome palette and Zen Browser verification

- **Objective:** Owner asked for black-and-white colours, then to use
  Zen Browser. Zen provided the visual feedback the earlier HTML-only checks
  could not.
- **Method:** `zen-browser` (Mozilla Zen 1.23.2b) run headless with
  `--headless --no-remote --new-instance --profile /tmp/opencode/zenprof
  --window-size=W,H --screenshot out.png URL`. A **throwaway profile** was used
  so the owner's own Zen session was untouched.
- **Screenshots first** showed the fixed statusline covering the footer; a
  later capture still showed `--:--` in the clock. Because `--screenshot`
  fires on the document `load` event — which can precede React hydration — the
  clock was re-checked through a local wrapper page that delays its own `load`
  by a few seconds via a slow image; the clock then read a real time, proving
  hydration is fine.
- **Fixes:** `pb-8` on the page wrapper; hero grid `items-center` →
  `items-start`; `requestAnimationFrame` first clock tick.
- **Files:** `src/app/globals.css`, `src/app/page.tsx`, `src/app/layout.tsx`,
  `src/components/tech-badges.tsx`, `src/components/project-card.tsx`,
  `src/components/status-bar.tsx`, `DESIGN.md`, `PROGRESS.md`.
- **Verification:** lint clean; build static; desktop/tablet/mobile captures
  reviewed.

### 2026-10-18 — Rebuilt from reference screenshots

- **Objective:** Owner supplied screenshots of heyamit.dev and asked for the
  design to be rebuilt properly. Scope unchanged: reproduce the **layout and
  visual system** in original code using this project's own content; copy no
  text, images, or code from the reference.
- **Method:** Screenshots in `~/Pictures/Screenshots` were read directly to
  capture structure (top bar, hero, cards, timeline, contact form, statusline)
  that the compiled bundle only hinted at.
- **Decisions:** no browser/screenshot tooling exists in this environment, so
  verification is HTML-level (element/class/token checks) rather than visual.
  The reference's avatar/thumbnails are third-party assets and are omitted; the
  hero shows a `DM` monogram plate and cards show a "preview pending" plate.
  The contact form uses a real `mailto:` submit so it is not a dead control
  (`AGENT.md` §7).
- **Files:** all of `src/components/`, `src/app/page.tsx`,
  `src/app/globals.css`, `src/app/layout.tsx`, `src/lib/site.ts`,
  `src/lib/projects.ts`, `public/resume.pdf`; `DESIGN.md` rewritten.
- **Verification:** lint clean; build static; dev server HTTP 200; CSS carries
  the palette; `/resume.pdf` returns `application/pdf`.

### 2026-10-18 — Layout re-modelled on heyamit.dev

- **Objective:** Owner asked for the heyamit.dev design. Agreed scope: reproduce
  the **visual design and layout system** in original code, using this project's
  own content. No text, images, or code were copied from the reference site.
- **Method:** The reference is a JS-rendered SPA, so its structure and visual
  system were read from its compiled CSS/JS (class strings reveal the layout
  metrics and component shapes).
- **Adopted:** `max-w-4xl` (896px) single column, `px-4 sm:px-6`; sticky blurred
  header with `border-border/30`; full-height hero (`min-h-[100dvh]`) using a
  `md:grid-cols-[auto_1fr]` avatar+text grid; sections in `gap-12`; border-only
  project cards (`border-terminal-dim/20`, accent-bordered tech tags); accent
  uppercase section labels; a `border-l` timeline list; `fade-in` animation.
- **Palette:** `background #0d0e0f`, `foreground #d4be98`,
  `muted-foreground #7c6f64`, `border #252729`, `terminal #b8c572`,
  `terminal-dim #7a736a`, plus the terminal red/orange/yellow/aqua/blue/purple
  set (status only).
- **Files changed:** `src/app/globals.css`, `src/app/page.tsx`,
  `src/components/container.tsx`, `src/components/site-header.tsx`,
  `src/components/site-footer.tsx`, `src/components/project-card.tsx` (new),
  `DESIGN.md` (rewritten), `PROGRESS.md`.
- **Files removed:** `src/components/project-row.tsx`.
- **Verification:** `npm run lint` and `npm run build` pass; `/` static; dev
  server serves HTTP 200 with the new palette and clean log.
- **Known deviation:** the reference's `muted-foreground` is ≈3.96:1 on the
  background and fails AA for body text. It was kept **exactly** as requested;
  `DESIGN.md` §2 notes the fix (`≈#a8998a`) if strict AA is wanted.
- **Not replicated (yet):** the reference's multi-theme switcher and its
  terminal command bar. Both need real behavior to satisfy `AGENT.md` §7, so they
  are proposals rather than placeholders.

### 2026-10-18 — Theme re-based on heyamit.dev; dev indicator disabled

- **Objective:** Remove the Next.js dev indicator and take the design theme from
  https://heyamit.dev.
- **Method:** The reference site is a JS-rendered SPA, so its theme was read from
  its compiled stylesheet (`/assets/index-*.css`), which exposes the palette as
  CSS custom properties.
- **Theme adopted:** `canvas #0d0e0f`, `ink #d4be98`, `muted #a8998a`,
  `faint #8a7d6e`, `accent #b8c572`, `line #252729`; monospace-first
  typography (JetBrains Mono only, 14px base); `4px` control radius;
  `150ms` / `cubic-bezier(0,0,.2,1)` motion.
  Note: the reference `muted-foreground` (`#7c6f64`) measures ≈3.96:1 on the
  canvas and fails AA for body text, so it was lightened to `#a8998a` (≈7:1)
  to keep the site accessible; `faint` was chosen at ≈4.8:1.
- **Files changed:** `next.config.ts` (`devIndicators: false`),
  `src/app/globals.css` (new palette + mono typography), `src/app/layout.tsx`
  (JetBrains Mono only; added `viewport.themeColor`), `DESIGN.md` (rewritten),
  `PROGRESS.md`.
- **Verification:** `npm run lint` and `npm run build` pass; `/` still static.
  Confirmed the built CSS contains the new palette and no trace of the previous
  theme.
- **Gotcha encountered:** after the changes, the dev server kept serving **stale
  CSS** containing the original `Ioseka Nerd` tokens. The cause was a cached
  Turbopack chunk in `.next/dev`. Deleting `.next` and rebuilding resolved it;
  production CSS was always correct. If CSS looks stale after a theme change,
  clear `.next`.

### 2026-10-18 — Design rebuilt from scratch (minimal)

- **Objective:** The owner reviewed the first build and asked for a design built
  from scratch, then clarified it "should be minimal". The old `DESIGN.md` (a
  "Nemaas" spec capping every text size at 14px) was replaced entirely.
- **Decision:** Minimal, typography-first design — no cards, pills, gradients,
  shadows, or hover movement. Single readable column, hairline dividers, one
  accent (`#3ddc97`), Geist + JetBrains Mono.
- **Files changed:** `DESIGN.md` (rewritten as the new spec), `src/app/globals.css`
  (new tokens + `.link`/`.btn`/`.label`), `src/app/layout.tsx` (Geist + JetBrains
  Mono), `src/app/page.tsx` (rewritten), `src/components/site-header.tsx`,
  `src/components/site-footer.tsx`, `src/components/container.tsx` (new),
  `src/components/project-row.tsx` (new).
- **Files removed:** `src/components/project-card.tsx`.
- **Verification:** `npm run lint` and `npm run build` both pass; `/` still
  statically prerendered. Dev server restarted and confirmed serving HTTP 200
  with zero errors in the log.
- **Note:** a transient "module not found" error appeared in the *first* dev
  server's log while files were being swapped mid-HMR. The restarted server has a
  clean log and the production build resolves all imports.

### 2026-10-18 — Resume cross-check; corrected DevLens demo URL

- **Objective:** Verify Lost & Found hosting/links from the resume in `~/Downloads`,
  since the project is not hosted.
- **Source used:** `~/Downloads/dibyanshumoura.pdf` (text + embedded link annotations).
- **Findings:**
  - Lost & Found has **no dedicated repository and no live demo**. The resume's
    "Code" link for the project points to `https://github.com/DibyanshuMoura`
    (the profile), not a project repository.
  - `PROFILE.md` listed the DevLens demo as `https://devlenai.vercel.app`, which
    returns **HTTP 404**. The resume's `https://devlensai.vercel.app` returns
    **HTTP 200** and its `<title>` is "DevLens".
- **Files changed:** `src/lib/projects.ts` (DevLens demo URL corrected; Lost &
  Found workflow copy aligned to the resume), `PROFILE.md` (DevLens demo URL
  corrected; Lost & Found repository/demo status recorded as unverified/absent).
- **Decision:** Lost & Found continues to render a note instead of a link; the
  resume's "Code" link is not reproduced because linking a profile page as if it
  were the project's source would be misleading (`AGENT.md` §7).
- **Verification:** `curl` status checks on all four URLs; the corrected URL was
  confirmed to serve DevLens.

### 2026-10-18 — Initial build session

- **Objective:** Establish a working Next.js + Tailwind foundation matching `DESIGN.md`.
- **Files added:** `src/app/layout.tsx` (rewritten), `src/app/page.tsx` (rewritten),
  `src/app/globals.css` (rewritten), `src/components/site-header.tsx`,
  `src/components/site-footer.tsx`, `src/components/project-card.tsx`,
  `src/lib/site.ts`, `src/lib/projects.ts`, `README.md`.
- **Files removed:** `public/{next,vercel,file,globe,window}.svg`.
- **Files changed:** `package.json` (`name` → `portfolio`).
- **Toolchain note:** No JavaScript runtime was installed on this machine.
  Node.js 24.22.0 LTS was installed user-locally at `~/.local/node` and added to
  `PATH` via `~/.bashrc`. No root access was required.
- **Verification performed:**
  - `npm run lint` → clean.
  - `npm run build` → success; `/` statically prerendered; TypeScript passed.
  - `next start` + `curl` → HTTP 200; verified that profile name, both projects,
    the DevLens demo/source links, the contact links, and the Lost & Found
    "not yet published" note all render; confirmed no `href="#"` placeholder links.

## 7. Known Issues and Blockers

- **Lost & Found is confirmed unhosted** with no dedicated repository. Nothing to
  link; it renders a note. Revisit only if a repository is published.
- **No screenshot for Lost & Found**, so its card keeps the "preview pending"
  plate. DevLens has one (`Assets/Screenshots/devlens-dashboard.webp`).
- **The DevLens card shows a curated subset of the stack.** `PROFILE.md` §4 also
  lists HTML, CSS, and Express.js; the card omits them deliberately — markup is not
  a headline tag, and Express.js is never named in the project's own README.
  Confirm against the backend before adding it back.
- **Resume/PROFILE.md discrepancies:** the resume lists `linkedin.com/in/DibyanshuMoura`
  as display text but its actual hyperlink matches `PROFILE.md`; the resume also
  lists a mobile number that `PROFILE.md` does not. Publishing a phone number on a
  public site is a privacy decision and has **not** been added.
- **No automated tests.** No test runner is configured; verification is currently
  lint + type check + production build + rendered-HTML inspection.
- **Stale dev CSS gotcha.** A Turbopack chunk cached in `.next/dev` can keep
  serving an old stylesheet after theme changes. Delete `.next` if CSS looks
  stale. Documented in the §6 log entry.
- **On a phone the heatmap is two half-year rows, and it came down to a judgement
  call.** The cells are now 6.13px at 320px and 8.18px at 390px — double what the
  single fitted row gave — with the whole year still on screen and no ruler tick
  dropped except the year's second label, which would otherwise collide. Anything
  past that (a scrollable strip, fewer weeks, taller-than-wide cells) is a different
  trade, not a bigger version of this one; see `DESIGN.md` §7.
- **The top bar is three items wide and fits a 320px viewport.** Measured: one line
  (62.58px of header) at 320px and 390px, wrapping only at 300px (91.62px). A
  hover-capable window and a phone read the same bar, so there is no narrow-width
  case that only a mouse sees.
- **Link check, 2026-10-18:** the GitHub profile, both DevLens URLs, the config
  repository, and the reference site all return 200. The LinkedIn URL returns 999 —
  LinkedIn's standard block for automated requests — so it comes from `PROFILE.md`
  and has **not** been machine-verified.
- **Next.js' stock 404 is still in place.** `/_not-found` renders the framework's
  default page (light background) rather than something in this site's shell.
- **Git is initialized, with nothing committed.** The branch is `main`; no commit
  has been made, because `AGENT.md` §3 says not to commit unless asked.
  `.gitignore` already excludes everything that must stay out: `node_modules/`,
  `.next/`, `.env*` (with `!.env.example`), `next-env.d.ts`, `*.tsbuildinfo`,
  logs, and `.vercel`.
- **The contact form needs environment variables to send.** `SMTP_HOST`,
  `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` must be present — locally in the
  git-ignored `.env`, on Vercel in Project → Settings → Environment
  Variables. With none of them the endpoint answers `503` and the form offers the
  visitor's mail client, which is a working page rather than a working form.
  Locally they are set and verified: on 2026-10-19 a message went through the
  endpoint and was read back out of the mailbox over IMAP. **The deployed site
  still needs the same four names before its form can send.**
- **A rejected Gmail password looks exactly like a wrong address.** Both come back
  as `535-5.7.8 Username and Password not accepted`, which is why confirming the
  address shown at <https://myaccount.google.com/> had to come before issuing
  another password. Google also renders an app password as four groups of four
  whose spaces are cosmetic: handed to SMTP verbatim they fail the same way, so
  `mail.ts` and `scripts/check-mail.mjs` strip whitespace before use. The working
  credential written at 15:53 on 2026-10-19 now lives in `.env`.
- **`npm run mail:check` tests the credential in about two seconds** without the
  site, printing what the mail server actually said (`scripts/check-mail.mjs`). It
  reads the same `.env` the dev server does (falling back to `.env.local` first if
  that exists, matching Next.js' precedence), so it tests the value the form uses,
  and it and `mail.ts` both strip the cosmetic spaces Google puts in an app
  password.
- **The endpoint's rate limit is per instance.** Five messages per address per ten
  minutes, counted in memory, so on Vercel each warm function keeps its own counts:
  it blunts a burst from one place rather than enforcing a global quota. A real
  quota needs shared state the site deliberately does not have; the honeypot is
  what filters scripts.
- **Browser verification is manual, not automated.** Layout, responsive widths, and
  the carousel's prev/next have been checked with headless screenshots of every
  route plus a scripted click probe, so a future change needs the same manual pass.

## 8. Next Steps

1. **Set the same `SMTP_*` names in Vercel's environment variables** so the deployed
   form can send. The credential is confirmed working locally — a message went
   through the endpoint on 2026-10-19 and was read back out of the mailbox — so
   local sending is verified and deployment is the last step of the feature.
2. A screenshot for Lost & Found when one exists — drop the file into
   `Assets/Screenshots/`, import it in `src/lib/projects.ts`, and confirm or drop
   the `Express.js` tag while there.
3. Decide whether the resume's mobile number belongs anywhere on the site
   (privacy decision — currently omitted).
4. A social preview image for link unfurls (`openGraph.images`). The favicon was
   replaced on 2026-10-18, but there is still no OG image, and it needs a designed
   1200×630 asset rather than a generated one.
5. Restyle `/_not-found` as a `$ cat 404.md` page in the site's own shell, if wanted.
6. Judge the phone activity panel in the hand: the year is two stacked rows at
   6–8px a cell now. If the cells want to be larger still, the moves are a
   scrollable row, fewer weeks, or taller-than-wide cells — not another scale
   change, since the panel width is fully spent.

**Rule:** Never mark a feature as complete solely because code was written. Record completion only when the relevant behavior has been verified.
