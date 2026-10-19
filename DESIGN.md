# DESIGN.md — Portfolio Design System

Authoritative visual specification for the portfolio. Describes the design
**as implemented** in `src/app/globals.css` and the components under
`src/components/`.

> **Theme & layout source.** The visual language — terminal/"rice" aesthetic,
> palette, monospace-first typography, container metrics, component shapes, and
> motion — is modelled on [heyamit.dev](https://heyamit.dev), read from its
> compiled CSS/JS plus reference screenshots.
>
> The implementation, copy, images, and assets in this repository are original
> and belong to this portfolio. **No text, images, or code were copied from the
> reference site.**
>
> History: this replaces an earlier auto-generated "Nemaas" document. See
> `PROGRESS.md` for the change record.

## 1. Principles

- **Terminal aesthetic.** Monospace throughout, hairline borders, compact type.
- **One column.** A fixed, readable column (`max-w-4xl`, 56rem — 1434px at the
  current scale) with generous vertical rhythm.
- **Flat.** No shadows, no gradients. Depth comes only from hairline borders and
  the dithered texture on the avatar plate and empty preview bands — panels
  themselves are transparent.
- **Shell framing.** Sections are announced as shell commands
  (`$ cat activity.log`); the page ends after the `hire.me` section.
- **Subtle motion.** A single `fade-in` on entry and color-only hovers.

## 2. Palette — monochrome

Black and white. There is **no hue anywhere** in the interface; depth comes from
surface steps and hairline greys alone.

| Token | Value | On `background` | Role |
| --- | --- | --- | --- |
| `background` | `#0a0a0a` | — | Page background |
| `card` | `#121212` | — | Monogram plate, behind the avatar photo |
| `muted` | `#1a1a1a` | — | Reserved hover surface |
| `border` | `#262626` | — | Hairline borders |
| `foreground` | `#fafafa` | ≈19:1 | Primary text |
| `muted-foreground` | `#a3a3a3` | ≈7.8:1 | Secondary/body text, tags |
| `terminal` | `#ffffff` | ≈19.8:1 | Accent — prompts, links, active nav |
| `terminal-dim` | `#8a8a8a` | ≈5.7:1 | Taglines, rules, de-emphasised text |

Borders are often drawn at reduced opacity: `border-border/30`,
`border-border/50`, `border-terminal-dim/40`.

**Badges come in two tones, and no more.** `.badge` draws its border with
`currentColor`, so text and border always agree: `muted-foreground` for tools in use
(the home `working with` row) and `terminal-dim` for the rest (the home `currently
learning` row, the project stack tags). Nothing is encoded in colour, so removing
hue loses no information. As of 2026-10-18 the badge set is **tags only**: the
`live` / `unhosted` markers are plain text, because a box reads as an affordance and
a status is not one (§7).

> **Contrast is now AA-compliant.** Every text tone clears 4.5:1 on the
> background. The earlier olive palette's muted tone (`#7c6f64`, ≈3.96:1) is
> gone.

## 3. Typography

- **Mono:** `JetBrains Mono` via `next/font/google` (`--font-jetbrains-mono`) —
  everything except one element.
- **Wordmark only:** `Iosevka Nerd Font`, via the `.wordmark` class in the top
  bar. A locally installed copy wins; otherwise the self-hosted subset at
  `src/app/fonts/iosevka-nerd-bold.woff2` (28 KB) is used. The upstream TTF is
  ~14 MB of Nerd Fonts glyphs, so the subset carries the lowercase alphabet and
  nothing else — the wordmark is always lowercased, so that is all it can need.
  It loads with `preload: false`, since visitors who have the font installed
  never request the file. To regenerate the subset (needs `subset-font`):

  ```
  npm i subset-font
  node --input-type=module -e '
    import fs from "node:fs";
    import subsetFont from "subset-font";
    const woff2 = await subsetFont(
      fs.readFileSync("/usr/share/fonts/TTF/IosevkaNerdFont-Bold.ttf"),
      "abcdefghijklmnopqrstuvwxyz",
      { targetFormat: "woff2" },
    );
    fs.writeFileSync("src/app/fonts/iosevka-nerd-bold.woff2", woff2);
  '
  ```
- Base: `0.875rem`, line-height `1.6`.
- **Chrome renders lowercase, prose renders as written.** `body` carries
  `text-transform: lowercase`, so casing in the source never reaches the screen
  for the shells the UI is built from — headings, labels, tags, nav, buttons.
  It is a display transform only: the DOM text keeps its real casing, so screen
  readers, `title` attributes, and metadata stay correct. Form controls opt out
  via `text-transform: none`, so a visitor sees their own typing as they typed
  it.
- **Reading prose opts back out.** Sentences carry the `.prose` class
  (`text-transform: none`), so they render in the sentence case they are written
  in. That covers the hero intro, the four `why-hire.me` paragraphs, and the
  `/work` + `/gear` intros. Proper nouns come
  back with them — `Node.js`, `GitHub`, `Gemini`, `AI/ML` — which the lowercase
  transform was flattening. The rule is *sentences get casing, chrome does not*:
  anything that is a label, heading, tag, control, or legend stays lowercase —
  unless it is a name.
- **Names opt out too.** A name is neither a sentence nor chrome — it is a word
  that has to match the thing it names — so it carries `normal-case`. That covers
  the heatmap handle (`@DibyanshuMoura`, taken from `site.links.github` so it
  cannot drift from the profile link beside it) and the project card's `<h3>`
  (`DevLens`, `Lost & Found Management System`). The project *tagline* and the
  stack tags under it stay lowercase: those are chrome, and they sit in a page
  built out of chrome. Both opt-outs were added 2026-10-18, after the handle
  rendered as `@dibyanshumoura` and DevLens as `devlens`.
- **The owner's own name is the deliberate exception.** The hero `<h1>` renders
  `dibyanshu` in lowercase, the way the wordmark above it does — asked for
  explicitly on 2026-10-18, after it had briefly been given `normal-case`. The DOM
  still carries `Dibyanshu` (`site.displayName`), so the casing survives for
  screen readers and anything that reads the markup.
- **No measure cap on the main prose.** The `why-hire.me` paragraphs fill the
  column — they carried `max-w-2xl` until 2026-10-18, which left ~250px of the
  column empty. The `hire.me` section carries no intro prose (removed on request),
  so the compose form follows the heading directly. The hero intro keeps
  `max-w-xl`, since it already sits inside its own grid column.
  The `/work` and `/gear` intros still carry `max-w-2xl`.
- **Scale knob:** `html { font-size: … }`, stepped on Tailwind's own breakpoints so
  the type scale and the layout utilities change together. The sizes below are
  declared against a 16px base; spacing, the container width, and every rem-based
  size scale from this one number.

  | Viewport | `html` font-size | Base |
  | --- | --- | --- |
  | `< 640px` — phone | `110%` | 17.6px |
  | `≥ 640px` | `130%` | 20.8px |
  | `≥ 768px` | `140%` | 22.4px |
  | `≥ 1024px` — the reviewed desktop | `160%` | 25.6px |

  The phone step is set by the smallest text on the site: at `100%` the `0.625rem`
  micro-labels would land at 10px, and `110%` puts them at 11px. The middle steps
  close most of the remaining gap rather than jumping straight to the desktop
  value. Pixel values were converted to `rem` precisely so this works — nothing in
  the layout is px-locked except 1px hairlines, the `2px` radius, and the 44px
  touch floor (§8).

| Role | Size | Weight | Notes |
| --- | --- | --- | --- |
| Name (hero) | `1.5rem` → `1.875rem` (md) | 700 | `tracking-tight`, `leading-none` |
| Section command | `0.875rem` | 400 | `$` accent, `cat` muted, file foreground |
| Card title | `1rem` | 700 | `tracking-tight` |
| Body | `0.8125rem` | 400 | `text-muted-foreground` |
| Role line | `0.75rem` | 500 | accent, `tracking-widest` |
| Micro label | `0.625rem` | 700 | `tracking-widest`, muted |
| Tag | `0.6875rem` | 400 | `tracking-widest` |

## 4. Spacing & Layout

- Container: `max-width: 56rem` — 896px at the 16px base, 1434px at the desktop
  scale; `px-5` (`sm:px-8`), centered.
- The hero sits in the same box (`max-w-4xl` with the gutters *inside* it), so
  the avatar lines up with the section headings below. Gutters outside the cap
  instead of inside it shift the hero sideways by one gutter — 51px at the
  desktop scale.
- Top bar: sticky (`top-0`, `z-40`), translucent blurred, `border-border/30`.
- Hero: `pt-16 pb-14`; one column on mobile,
  `md:grid-cols-[minmax(0,1fr)_2fr]` (`gap-10` / `md:gap-14`) — avatar plate +
  text, the plate taking the first third.
- Section stack: `flex flex-col gap-14`.
- Section command followed by a `mt-6` stack.
- Project grid: one column, `sm:grid-cols-2`, `gap-4`.
- `main` carries `pt-16` above and `pb-6` as the closing gutter at **every**
  width, matched by the back-to-top control's own `pb-6` (§7, §8).

## 5. Shape

- `rounded-sm` = `2px` (panels, tags, badges, controls, carousel images).
- `rounded-md` = `4px` (available; unused).
- Tag padding is `0.25rem 0.75rem` — generous next to the `0.6875rem` label
  inside it. Raised from `0.125rem 0.5rem` on 2026-10-18, when the tech tags read
  as too tight. One `.badge` class covers every call site — both home skill rows
  and the project stack tags — so they all move together.
- `rounded-full` = pill; nothing uses it since the `currently learning` timeline
  list became a chip row on 2026-10-18.
- No shadows.

## 6. Motion

- Duration `150ms`; easing `cubic-bezier(0, 0, 0.2, 1)`.
- Hovers change **color/border-color only**.
- `fade-in`: `opacity 0→1`, `translateY(4px)→0`, `300ms ease-out` on the hero.
- **The wordmark spins up on load.** The top bar's handle cycles the alphabet and
  settles into `dibyanshu`, left to right — `abcdefghi`, `bcdefghij`, … ,
  `dibyanshu` — in 31 frames of `42ms` (≈1.3 s). Every frame is a **string of real
  text**, not a canvas or an image, so the glyphs stay selectable and the markup
  stays inspectable; the visible letters are `aria-hidden` behind an `sr-only`
  twin, so the link is announced as `dibyanshu` whether or not the spin is
  mid-flight. It cannot shift the bar: the wordmark's face is monospaced across
  `a`–`z` (every glyph is 500/1000 em in the shipped subset), so no frame is a
  different width from any other. It is **opt-in per page**: only the landing page
  sets it (`<TopBar animateWordmark />`), because the flourish belongs where the
  name is introduced; `/work` and `/gear` render the handle statically.
- `prefers-reduced-motion` disables transitions and animations. The spin is
  JavaScript, which that rule cannot reach, so the component asks `matchMedia`
  itself and never starts; `src/components/wordmark.tsx` carries the explanation.

## 7. Components

### Top bar

Handle at `muted-foreground` on the left, set in `.wordmark` (Iosevka Nerd Font) at
`text-base` and `font-bold`, brightening to `terminal` on hover — the same
muted-to-white pair the nav links use, so the bar has one hover rule and not two.
It rested at `terminal` with a `foreground` hover until 2026-10-18, which made the
brightest mark in the bar the one that barely moved when hovered. Nav (`home`,
`work`, `gear`) at `text-sm` in `muted-foreground`, hovering to `terminal`;
the row's gaps tighten on phones so the bar stays on one line at a 320px viewport,
and the links carry invisible touch padding (§8).
`home` is the landing page itself; `work` and `gear` are routes. `hire.me` is
not in the bar — the section is reached by scrolling. The handle is `site.handle`,
the same string as the hero `<h1>` (`§3`) and the document title (`§9`). It is the
only thing in the chrome that animates, and only on this page — see `§6`.

### Favicon

`src/app/icon.png` — a white lowercase `d` in Iosevka Nerd Font Bold, the
wordmark's own face, on the background colour. It replaced the stock Next.js icon
that shipped with the scaffold on 2026-10-18: the framework's logo was sitting in
the browser tab of a personal site. The lowercase `d` matches the wordmark and the
hero (§3); the avatar plate's `DM` monogram stays as it is, because that plate is a
fallback image, not the identity mark.

It is generated rather than hand-drawn, so it can be regenerated at any size:

```
ffmpeg -f lavfi -i color=c=0x0a0a0a:s=256x256 \
  -vf "drawtext=fontfile=<IosevkaNerdFont-Bold.ttf>:text='d':fontcolor=0xffffff:fontsize=256:x=(w-text_w)/2:y=(h-text_h)/2" \
  -frames:v 1 src/app/icon.png
```

Next picks the file up from the `icon.png` convention and emits the
`<link rel="icon">` itself; there is no `favicon.ico` any more.

### Hero

`[minmax(0,1fr)_2fr]` grid — the plate takes the first third, the text the rest.
Left: the **avatar** (`Avatar`) and nothing else. Right: `~ whoami`
label, name, accent role line, intro, tech tags, and social links. (A
`▸ building <project>` status line sat between the intro and the tags until
2026-10-18; the data is still in `site.status` if it comes back.)

**The avatar is the GitHub profile picture, with the plate as its fallback.** Until
2026-10-18 it was only the plate: a `bg-card` square with a faint grid and a `DM`
monogram, standing in for a photo. The photo now sits on top of that plate, which
stays underneath so a slow or failed load degrades to the monogram instead of a
broken image. It comes from
GitHub's own `/<user>.png` endpoint at `size=460`, with the handle read from
`site.links.github` so the picture can never come from a different account than the
one the site links to. `alt=""`: the name beside it already says who it is, so the
image is decoration.

**Its size comes from its own column, and that column is a third of the row.**
At `md` and up the plate is `w-full aspect-square`: it fills the first grid track
and takes its height from its width, so it is always square and the text column
always gets the other two thirds, however the copy grows. Below `md` the hero
stacks, and it falls back to a fixed `7rem` / `8rem` square.

Until 2026-10-19 it was `h-full w-auto aspect-square` in an `[auto_1fr]` grid —
"as tall as the text beside it". That reads well in a screenshot and is circular
in the layout: the track size came from the plate, the plate's width came from
its height, and its height came from the row, which the text sets. Between 768px
and 1023px the browser resolved that by making the plate **867px wide in a 756px
viewport**, which overflowed the page and squeezed the text column to nothing —
invisible at the two widths that had been reviewed, and found on 2026-10-19 by
measuring every width from 320px to 1500px. At 1500px the plate was 459px wide; a
third of the row gives 414px there, and 196px at 768px where it used to be 867px.

**The trade: 460px is all GitHub serves.** At 414px the square wants ~828 device
pixels on a 2× display and gets 460, so the photo is soft on
high-DPI screens — sharp at 1×. Enlarging the hero photo further cannot fix that;
only a re-hosted, higher-resolution copy could, which would then go stale. Accept
the softness or cap the plate at `~14rem` to stay pixel-exact at 2×.

**The name is the short one, and it stays lowercase.** The `<h1>` renders
`site.displayName` — `Dibyanshu` in the markup — and the display transform shows it
as `dibyanshu`, matching the wordmark in the bar above it and the document title
(§9). The full name stays in `site.name` for the metadata description and prose
(`layout.tsx`, the `/work` description). It is the one name on the site that is
deliberately left lowercase (§3).

It is also the **only external request the page makes at load** — everything else
is prerendered or served from this origin. Worth knowing, not worth avoiding:
GitHub is where the picture lives, and re-hosting a copy would only make it stale.

**The plate carries no controls.** Bordered `resume` and `email` buttons sat under
it until 2026-10-18 and were removed for good. They only restated links already in
the hero's own social row, in the largest and boxiest elements on the screen — the
left column holds the avatar and stops. `site.resume` and `public/resume.pdf` stay:
the social row still uses them.

**The row is `github · linkedin · resume`.** `email` was the third link until
2026-10-18 and was removed on request. A bare address is the one link that leads
nowhere a visitor can look around in, and contact already has a better door:
`hire.me` states the address in its `to:` row and sends from there. So the hero
offers no `mailto:` — the landing page has **no static email link at all**; the
address appears once, in that form's `to:` row (§7).

### Section heading

`SectionHeading` renders `$ cat <file>` (accent prompt) with a trailing rule.
`RuleHeading` renders an uppercase accent label with a trailing rule.

### Project card

`panel` (`border-border`, **transparent** fill) with hover to
`border-terminal-dim/40`:

- Preview band. The band takes the screenshot's **own aspect ratio** — the image is
  never cropped or stretched — and `project.image` is imported from
  `Assets/Screenshots/`, the same pipeline as the setup carousel (§7), so the
  bundler hashes it and the `width` / `height` come from the file. Before
  2026-10-18 the band was a fixed `16/9`, which is right for a 16:9 capture and a
  crop for anything else: the DevLens shot is a 1890×455 crop of the dashboard
  header, and `16/9` would have upscaled it 2.3× and cut the profile score off the
  right edge.
- Cards with no screenshot show a slim `h-28` grid-textured "preview pending" plate
  instead — never a broken image. The placeholder is band-height on purpose: a
  full-height `16/9` empty plate made each card ~200px taller than its content and
  dominated the page. Lost & Found has no screenshot yet, so it keeps the plate.
- Padding `p-5`.
- **The name is a name.** The `<h3>` carries `normal-case`, so the card reads
  `DevLens` and `Lost & Found Management System` the way the projects are written,
  not `devlens` (§3). Everything under it — tagline, stack tags, the `live` /
  `unhosted` marker — stays lowercase.
- **Title-row marker — the only difference is the hover.** Both states are plain
  `text-xs` `muted-foreground`: no badge, no border, no chip, for a live URL
  (`live`) or for none (`unhosted`). `live` is an anchor and brightens to
  `terminal` on hover, exactly like the nav; `unhosted` is a `span` and stays put,
  so **the hover marks the clickable thing and nothing else**. The marker is
  silent about its own state, which is the point: the card either takes you
  somewhere or it does not, and only one of those can be hovered. `live` was a
  bordered `foreground` chip, then a white `.link`, until 2026-10-18; `unhosted`
  was a `terminal-dim` badge until the same day.
- Tagline, summary, stack tags, and a bottom row of repo links — or the
  `pendingNote` when no verified links exist. **Overview length, not a case
  study:** one short summary paragraph (~2 sentences) and a stack, nothing
  enumerated. A feature-bullet list sat here until 2026-10-18 and made each card
  ~1000px tall. The detail lives in the project's own `readme.md` and `PROFILE.md`
  §4; the card links to `source` and stops there — a separate `readme.md` link was
  added on 2026-10-18 and removed the same day, because `source` lands on the page
  where the README already is.
- Cards in a row share a height (grid default), so the shorter card carries the
  difference as space above its link row, which is pushed down with `mt-auto`.

### Skills rows (`skills.md`)

Two `TechBadges` rows, one per group, in different tones: **`working with`** at
`muted-foreground`, **`currently learning`** at `terminal-dim`. The tone is the
whole difference — same box, same padding, same hover — which is what keeps the
claim honest: tools in use and topics in progress are the same *kind* of label, and
the dimmer row says the second set is not yet something to lean on. The group
labels carry the semantics; the tone only sets the confidence.

Both rows are chips because both are sets of short labels, and because every other
label set on the site is a chip row (home skills, project stack tags). **Currently
learning used to be a vertical list** — `border-l border-border/50` and a `9px`
accent dot per item — until 2026-10-18. It was the only list of that kind on the
site, its rule was invisible at `border-border/50` on the background, its dots were
full-white, and eight one-line entries spent ~410px of column height and read as
unfinished next to the chip row above. Replaced with the second row, which is
`~90px`.

### Contact form (in `hire.me`)

`panel` styled like a mail compose window, header rows first, then the body:

| Row | Control |
| --- | --- |
| `to` | the recipient as static text — `site.links.email` |
| `name` | text input, placeholder `your name` |
| `from` | email input, placeholder `you@ex.com` |
| `subject` | text input, placeholder `what is the mail about?` |
| body | full-width textarea, placeholder `your message`, no label column |

`to` is deliberately **not** an input: everything the form sends — by the endpoint
or by the fallback link — addresses `site.links.email`
(`work.dibyanshumoura@gmail.com`, the only address in the codebase), so an
editable field would be a control that could not do anything.
It is also not a hover group, unlike the editable rows (`name`, `from`, `subject`):
those brighten their label with the field, and a static row must not answer a
pointer (§1).

`name` is what the mail is signed with: the endpoint writes it and the address as
`Reply-To: name <address>`, which is what a mail client shows in its reply header,
so hitting reply in the delivered message addresses the visitor by the name they
typed. The fallback link credits the same way.

**Rows stack on phones** (`flex-col items-start`, back to `sm:flex-row`), which
came out of measuring rather than taste: at a 390px viewport the row has 290px of
content while the label column (70px) plus the 29-character address (249px) needs
332px, so the address fell to a line of its own and the `subject` placeholder was
clipped by the shortened field. Stacking gives every field the full width. From
`sm` up every row is **one line** — label column, then its value on the same line,
exactly as the `to:` row has always been. The fields needed `sm:flex-1` for that:
until 2026-10-19 they kept the phone's `w-full`, so `from` and `subject` measured
100% of the row *after* the label column and dropped their value onto a second
line, while the `to:` row, whose value is content-sized, stayed on one. Measured
across the breakpoint, all three rows sit on the label's line from 640px up (value
offset −1.2 to −1.5px, against −2.1 to −2.6px for `to:`) and all three still stack
below it at 600px and under (offset 23.8px). The address also carries a `<wbr>` after its local part: at 320px the panel's inner
line is 218px against a 249px address, and without a break opportunity it breaks
mid-word. `min-w-0 break-words` remains the fallback below that.

**Fields are `1rem` on phones and the body size from `sm` up.** iOS zooms the
whole page in when a focused field's text is under 16px, and the body size is
14.3px at the phone scale. The trade is that field text sits a step larger than
the prose around it on a phone — the usual price for not having the page jump when
the visitor taps a field.

**The body is full width at every size, on its own class.** It is the one field
not in the label-row class, and the reason is a `<textarea>`'s intrinsic width:
`sm:w-auto` is inert in a block only where the element's width is otherwise
definite, and a textarea's is about twenty columns. From `sm` up the writing area
therefore measured 304px against a row of 844px — reported as too small on
2026-10-19 — until it was given `w-full` at every width, which is what its
full-width row always meant. Measured after the fix, the body matches its row's
inner width at 390/600/640/768/1024/1500px, within half a pixel of sub-pixel
rounding.

Every input carries a placeholder so the empty panel still explains itself,
rendered dim (`placeholder:text-muted-foreground/60`). The body row has no
visible label, so it carries `aria-label="message body"`.

**Submitting sends the message from the site**, through `POST /api/contact`,
which hands it to Nodemailer on the server (`src/lib/mail.ts`; `README.md` has the
setup). That one handler is the only part of the site which is not prerendered —
every page is still static, and on Vercel it is a Function. The visitor's address
becomes the message's `Reply-To`, which is what makes replying to it work, and
`From` stays the authenticated mailbox because Gmail rewrites anything else.

The footer line is a `role="status"` region, because it is the form's only
feedback: `sends from this site` → `sending…` with the button disabled → `sent —
thanks.` with the fields cleared. A failure replaces it with the reason the
endpoint gave and puts a `send it from your mail client` link beside the button,
built from what the visitor typed. **Nothing here is ever a dead control:** with no
sending account configured the endpoint says so and the same link appears. The
SMTP error itself never reaches the page — a `502` reads "the mail server refused
the message" — so a visitor cannot read a host name or an account detail out of a
failure.

The endpoint trusts the request and not the form: it re-checks that every field is
present and within length limits, caps the body, counts messages per address, and
answers a hidden `trap` field as though it had sent — so a script filling every
input it finds gets no error to learn from.

### Hover states

Every hover says one thing: **text goes to pure white** (`terminal`). `.badge`
draws its border with `currentColor`, so its border follows the text for free;
`.control` names the colour twice, border and text.

- `link` — already white; hover only adds an underline. Used for the card's repo
  link (`source`). A **project status marker is never a `link`**: `live` rests muted
  and brightens on hover like the nav, so a clickable status is drawn neither as a
  box nor as preemptively-white text.
- `control` (the form's `send`, and the setup carousel's `prev` / `next`) — border
  and text to white. The hero's `resume` / `email` controls used this too until
  2026-10-18, which is why the `.control` class is older than its remaining
  call sites. The carousel is what made it plural again: two of the three
  `<button>`s on the site are now its arrows.
- Top-bar nav and wordmark — muted to white; the active route stays white. The
  wordmark follows the links rather than leading them: it sat at `terminal` with a
  `foreground` hover until 2026-10-18, which made the bar's brightest mark the one
  that barely changed when hovered.
- Project `live` marker — muted to white. Same treatment as the nav, because it is
  the same kind of thing: a quiet label that turns out to be clickable.
- Back to top — a text link, not a `.control`; muted to white, like the nav.
- `badge` — rests at `0.85` opacity; hover restores full opacity and takes the
  colour to white. Applied as utilities (`hover:text-terminal`,
  `hover:opacity-100`) rather than in the component layer, because Tailwind's
  `utilities` layer loads *after* `components` and would otherwise win the
  cascade.
- Contact rows — a `group` wrapper, so hovering anywhere on the row brightens
  its label to white.

The `unhosted` marker deliberately has **no** hover: it is not a link, and the
effect should mark what is actually clickable. Transitions use `--duration-fast`
(150ms) with `--ease-out`, and are neutralised under `prefers-reduced-motion`.

### Cursor

`pointer` on every button via one base rule, `button:not(:disabled)`. Tailwind
v4's preflight stopped forcing it (v3 did), so the compose form's `send` — then the
only `<button>` on the site — was the one clickable thing showing the browser's
default arrow. Everything else interactive is an `<a>`, which the browser
already handles. The `:not(:disabled)` guard is there for the general case: no
control is disabled today (the carousel's arrows wrap instead, §7), and a disabled
one should not advertise itself when one appears.

### Back to top

Every route closes with a centred **text** control reading `top ↑` — an anchor to
`#top`. It is deliberately not a `.control`: no border, no background, no box,
just the text and the arrow, sized and coloured like a top-bar nav link
(`text-sm`, muted → white on hover). The `px-2 py-3` is invisible hit area only,
so the target still clears the 44px touch minimum (§8) without drawing anything.
It was a bordered `.control` for part of 2026-10-18 and was changed on request.

`<body>` carries `id="top"` (set in the root layout), so one fragment covers all
three routes and the 404 page instead of each page owning a target; the home
page's `main` carried that id until 2026-10-18 but nothing referenced it.

It is a plain anchor, not a `window.scrollTo` handler: it works before
hydration, needs no JavaScript, and the animation comes from
`scroll-behavior: smooth` (§6), which the `prefers-reduced-motion` block turns
back into an instant jump. One consequence of living at the end of the layout
is that it sits below the fold on a short page, since the page wrapper is
`min-h-screen`.

The arrow is `aria-hidden` and the accessible name reads "back to top" via an
`sr-only` prefix — the visible label alone would be announced as just "top".

### Footer & statusline

Both were **removed** on request. Pages now end after their last section:
`main` carries the closing gutter, and because nothing is fixed over the content
there is no extra bottom clearance to reserve. The only element after the last
section is the back-to-top control above.

**The closing gutter is `pb-6` at every width**, on `main` and on the control
alike, since 2026-10-19 — asked for on a phone first, then "in every screen". The
older pair of `pb-16`s plus the anchor's own invisible `py-3` came to ~190px of a
390px phone's height and ~243px of a desktop's spent on nothing between the last
panel and the page end. Because the value is rem-based it still steps with the type
scale rather than pinning to px: measured above/below the label at **26.38/25.97px
at 320px**, 26.38/26.42 at 390px, 31.22/31.28 at 640px, 33.62/33.18 at 768px and
**38.38/38.38 at 1500px** (against 102.38/102.38 before). Symmetric at every width,
and the control's 48–70px box — the ≥ 44px touch target (§8) — is untouched.

### Contribution heatmap

`panel` containing a header row (total contributions + handle), month labels over
a column-flow grid, and a `less → more` legend. Cells are five-step **monochrome**
squares (`level-0` … `level-4`). It is `role="img"` with a summary `aria-label`,
and each cell carries a date/level `title`.

**The graph is sized from its panel, not from the page**, so all 53 weeks are
always visible. The year is drawn as **two blocks of weeks** (27 + 26) a single gap
apart; `.heatmap` is a `container-type: inline-size` container and the cell is
`min(0.6875rem, 1.48214cqw)` — the design's own `0.6875rem` cell, which wins
wherever the panel is wide enough to hold it (from about a 1462px viewport up), and
otherwise a share of the panel's inner width. 53 cells plus 52 gaps make 99.6% of
the container either way, so side by side the blocks read as one continuous year.

**On phones the two blocks stack** (`max-width: 639px`), so the widest row is 27
columns instead of 53 and the vars become `min(0.6875rem, 2.933cqw)` /
`min(0.1875rem, 0.8cqw)` — the same 100/27 arithmetic, about twice the cell: 3.1px
→ 6.13px at a 320px viewport, 4.13px → 8.18px at 390px, whole year on screen either
way (measured 2026-10-19). That request was the reverse of the previous day's,
which had asked for the one row to shrink until it fitted: at 4px a cell the year
read as texture rather than as days. The one row had itself replaced a fixed
`0.6875rem` cell, which at the 110% phone scale measured 812px inside a 209px
panel — four times its width, 74% of it off-screen behind a hidden scrollbar. The
scroller wrapper stays (`overflow-x: auto`, scrollbar hidden) as a guard against
sub-pixel rounding, not as the phone story.

**The ruler drops a label that would collide.** Month labels are `0.625rem`, and
the year opens on a partial month, so its label can land under three columns from
the next one. Two columns only clear a three-character label while the panel is
wide enough for them to *be* that wide — about 620px at the phone scale, 668px at
`md`, 763px at the desktop one — so below a 768px container the tight label drops
(`heatmap-tight`, a container query rather than a media one, which also covers the
stacked layout: its widest panel is 528px). Above 768px every ruler is exactly as
it was, tightest desktop step included (1024px, 2.6px of clearance). A 390px phone
reads `oct dec jan feb mar apr` over `may jun jul aug sep oct`: enough of an axis
for two rows, and no label clipped at either edge.

The header's handle renders `@DibyanshuMoura` with its real casing (`normal-case`,
§3) — a lowercased `@dibyanshumoura` names nobody. A caption explaining that the
levels are GitHub's own buckets, not commit counts, sat under the graph until
2026-10-18; the panel now ends at the legend, and the `aria-label` plus the
per-cell `title`s carry the same information to anyone who needs it. The
`github activity` rule heading above the panel went the same day: `$ cat
activity.log` already says what the section is, and the two labels stacked.

### Removed: `$ cat about.md`

The two-paragraph bio was **removed on request** on 2026-10-19, which leaves the
landing page's section list as `activity.log` → `skills.md` → `why-hire.me` →
`hire.me`: the contribution graph now opens the page under the hero. It was the only
rendering of `site.direction`, so that field went with it — the position it
paraphrased (`PROFILE.md` §2) is unchanged there, and the `why-hire.me` panel below
still carries the "how I work" prose. Nothing linked to `/#about`, so no anchor was
left dangling.

### Why hire me (`$ cat why-hire-me.md`)

A `panel` of three short paragraphs, deliberately **subject-neutral**: it is about
how the work gets done rather than what the work is about. No technology names, no
project references, and no invented metrics. The text is Dibyanshu's own, supplied
on 2026-10-19, and its arc is how the work gets approached → what is brought to a
team → growth and what it contributes. It replaced four paragraphs written for the
site on 2026-10-18, whose closing beat — the work being judged by whether it helps
someone — was the only part of that copy the new text does not repeat.

### Work page (`/work`)

Same shell heading and nav, `RuleHeading "all"`, then the project grid. Each card
is an **overview, not a case study**: name, tagline, one short summary paragraph,
stack tags, and the links. It carried a feature-bullet list behind a
`showHighlights` prop until 2026-10-18 — the cards ran ~1000px each, which read as
a wall of text. The full feature lists live in `PROFILE.md`, and the project's own
README is the place for detail.

### Gear page (`/gear`)

`$ cat gear.yml`, a `## setup` sub-heading, then one `dt`/`dd` block per group
(`hardware`, `software`). Labels are `.label` (lowercase at render) in an `11rem`
left column; values sit right, with `↗` on linked sites or repositories. Hardware
rows are unlinked. Separated by `divide-y divide-border/40`.

The page opens with the machine itself, not the parts list: the `## setup` section
leads with the setup carousel, and the `hardware` / `software` rows follow under
the same heading. Before 2026-10-18 `## setup` was the parts list alone — the
monitor, compositor and bar listed as text, never shown.

### Setup carousel (`## setup`)

Three screenshots of the running desktop, one at a time, in the order the desktop
is actually met: the wallpaper alone, the launcher over it, then the work
(fastfetch in `foot` beside the LazyVim start screen). `SetupCarousel` is a client
component; the shots come from `setupShots` in `src/lib/gear.ts`.

- **`panel p-3` with the image `border border-border`**, so the shot reads as a
  window inside the page frame rather than as the page background bleeding through.
- **Native aspect ratio (8:5), never cropped.** The frames are real 1920×1200
  captures. The project cards follow the same rule — their bands take the shot's own
  ratio — so a screenshot is never cropped or stretched anywhere on the site.
- **Control row:** `prev` and `next` (`.control`, the only boxed buttons on the
  site besides the compose form's `send`), the `1 / 3` counter as bare
  `text-[0.6875rem]` `muted-foreground`, and `config ↗` pushed right with `ml-auto`
  as a `.link`. The counter is an `aria-live="polite"` region — the only thing that
  changes on click, so the image is not announced again each time.
- **The buttons wrap instead of disabling.** With three shots a disabled end button
  would be inert a third of the time, and the counter already says where you are.
- **No per-slide caption.** The alt text describes what is on screen for assistive
  tech; nothing is rendered under the shot, so the row stays a control strip.

**Assets live in `Assets/Screenshots/` and are imported, not copied into `public/`.**
The bundler emits them to `/_next/static/media/` with a content hash, so the
filename changes when the shot changes and no cache-busting is needed. Storing the
served files here rather than the 3.6 MB of originals keeps the repo at 392 KB;
the originals stay in `~/Pictures/Screenshots`, re-encoded at WebP quality 90:

```
ffmpeg -i <shot>.png -c:v libwebp -quality 90 -compression_level 6 <name>.webp
```

Static imports also mean the `width` / `height` on the `<img>` come from the file
itself, so there is no magic number to keep in sync — and the layout does not shift
while the image loads.

## 8. Responsive Behavior

**The scale steps on the layout's breakpoints** (§3): `110%` below 640px, then
`130%` / `140%` / `160%` at 640 / 768 / 1024. Every size in the document is `rem`,
so one number moves the whole layout — which is what makes the phone view
comfortable rather than just narrower. The `rem`-based breakpoints in the
utilities (`sm:`, `md:`) are unaffected by it: per the spec a `rem` in a media
query resolves against the *initial* font size, not `html`.

- **< 640px:** one column; `px-5`; hero stacks (plate above text); project cards
  one up.
- **≥ 640px:** `px-8`; project cards two-up.
- **≥ 768px:** hero switches to `[minmax(0,1fr)_2fr]`.
- **The top bar fits on one line down to a 320px viewport.** Measured at 320px:
  wordmark 79px + gap 11px + nav 170px in a 264px box — and a real 320px phone has
  276px of it, since desktop-class scrollbars take ~12px and phone ones take none.
  Below that the bar wraps (`flex-wrap`) instead of clipping, nav on its own line:
  measured 91.6px of sticky header at a 300px viewport against 62.6px on one line
  at 320px and up.
- **Touch targets are ≥ 44px, measured rather than assumed.** `.control` carries
  the only px value outside the hairlines and the radius — `min-height: 44px` —
  because a touch target is a physical size: the class's own rem-based padding
  lands at 44.8px at the desktop scale (where the floor is inert) and 30.8px at
  the phone scale. The nav and the hero's social links get the same floor through
  invisible padding plus a cancelling negative margin (`py-2.5 -my-2.5` →
  44px, `py-3.5 -my-3.5` → 48px at the phone scale), which changes nothing
  visibly in either row — the same trick back to top already used (51px).
- **The heatmap never scrolls.** The year is two blocks at a share of the panel's
  width (§7): side by side from `sm` up, stacked on phones, where a 320px phone
  shows the whole year as two 209 × 53px rows at 6.13px a cell instead of a quarter
  of it at 3.1px behind a hidden scrollbar. Measured `scrollWidth == clientWidth`
  at every width. The ruler drops a label that would collide with the next one
  below a 768px container — only ever the year's second label.

Measured on 2026-10-19 across all three routes at 320, 360, 390, 420, 480, 540,
600, 639, 640, 700, 767, 768, 1024, 1280, 1462 and 1500px: **no horizontal
overflow anywhere** (`scrollWidth == clientWidth`), no element crossing the right
edge, and no month label touching its neighbour.

## 9. Routes

All three pages are statically prerendered and share the top bar, container, and
shell-heading vocabulary. One route is not a page: `POST /api/contact`, the contact
form's mail endpoint (§7), which runs per request as a Vercel Function. It has no
layout, no navigation, and nothing to render — it takes JSON and answers JSON, and
any other verb on it is a `405`.

| Route | Purpose |
| --- | --- |
| `/` | Hero, GitHub activity, skills, why hire me, hire me (contact form) |
| `/work` | Every project, at overview length, with stack and links |
| `/gear` | The desktop itself (setup carousel), then hardware, software, and config files (`$ cat gear.yml`) |
| `POST /api/contact` | Sends the contact form's message with Nodemailer |

The top bar marks the current route with `aria-current="page"` and the accent
colour — all three routes do, `home` included, so exactly one item is marked
wherever you are. Navigation uses `next/link`. There is no `about` entry, and since
2026-10-19 no `about.md` section either — the landing page's first section is
`activity.log` (§7). The `hire.me` section (the contact form) keeps its `id` and
`scroll-mt` for deep links such as `/#hire-me`, though nothing in the bar points at
it. The back-to-top control is rendered once, by the root layout, so it appears on
every route — including `/_not-found`, which is otherwise still Next's stock page.

**Document titles.** The title is the short handle, not the full name: `dibyanshu`
on `/`, and `<page> — dibyanshu` on the other routes (`Work — dibyanshu`,
`Gear — dibyanshu`). It reads `site.handle`, the same string as the wordmark and
the hero `<h1>`, so the tab, the bar, and the hero cannot drift apart. The page
words keep their capitals: the lowercase rule is a display transform applied to
the page (`§3`), and a title is not part of the page.

**Data sources.** `src/lib/projects.ts`, `src/lib/site.ts`, and
`src/lib/gear.ts` are static. `src/lib/github.ts` fetches the public GitHub
contribution calendar at build time under `'use cache'` with
`cacheLife("hours")`, and returns `null` on failure so the activity section can
be omitted rather than showing invented numbers.
