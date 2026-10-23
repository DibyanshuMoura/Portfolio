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
- **One column.** A fixed, readable column (`max-w-[35rem]`, 560px at the 16px
  base and 896px at the desktop scale) with generous vertical rhythm.
- **Flat.** No shadows, no gradients. Depth comes only from hairline borders and
  the dithered texture on the avatar plate — panels themselves are transparent.
- **Shell framing.** Sections are announced as shell commands
  (`$ cat activity.log`); the page ends after the `hire.me` section.
- **Subtle motion.** A staggered rise on entry and color-only hovers.

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

**The theme switcher swaps the token set, not the design.** `[data-theme="light"]`
overrides the same variables: `background #fafafa`, `foreground #0a0a0a`, `card
#f0f0f0`, `muted #e5e5e5`, `border #d4d4d4`, `muted-foreground #525252` (≈7.5:1),
`terminal #000000`, `terminal-dim #6b6b6b` (≈5.3:1). The contribution levels
invert with the rest — `level-0` is the lightest surface in light mode and
`level-4` the darkest. Dark stays the `:root` default; the toggle writes `light` or
`dark` to `localStorage`, and an inline script in the layout's `<head>` applies a
stored `light` before paint so returning visitors never see a dark flash.
`<html>` carries `suppressHydrationWarning` because that script intentionally
mutates the server-rendered markup. A first visit is dark — the site's own
identity — rather than following `prefers-color-scheme`.

**Icons for tools.** The two home skill rows and every project card's stack are
`.tech-icon` tiles: brand glyphs for `working with`, dimmed glyphs for `currently
learning`, and the project's own tools in the same muted tone. Each tile carries
its name in a `title` and an `sr-only` span so the icon is never the only copy. The
`live` / `unhosted` markers are plain text, because a box reads as an affordance
and a status is not one (§7). Nothing is encoded in colour, so removing hue loses
no information.

> **Contrast is now AA-compliant.** Every text tone clears 4.5:1 on the
> background. The earlier olive palette's muted tone (`#7c6f64`, ≈3.96:1) is
> gone.

## 3. Typography

- **Mono:** `JetBrains Mono` via `next/font/google` (`--font-jetbrains-mono`) —
  everything on the page.
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
  in. That covers the hero intro, the four `why-me` paragraphs, and the
  activity fallback line. Proper nouns come
  back with them — `Node.js`, `GitHub`, `Gemini`, `AI/ML` — which the lowercase
  transform was flattening. The rule is *sentences get casing, chrome does not*:
  anything that is a label, heading, tag, control, or legend stays lowercase —
  unless it is a name.
- **Names opt out too.** A name is neither a sentence nor chrome — it is a word
  that has to match the thing it names — so it carries `normal-case`. That covers
  the heatmap handle (`@DibyanshuMoura`, taken from `site.links.github` so it
  cannot drift from the profile link beside it) and the project card's `<h3>`
  (`DevLens`, `Reclaim`). The project *tagline* and the
  stack's accessible names stay lowercase: those are chrome, and they sit in a
  page built out of chrome. Both opt-outs were added 2026-10-18, after the handle
  rendered as `@dibyanshumoura` and DevLens as `devlens`.
- **The owner's own name is the deliberate exception.** The hero `<h1>` renders
  `dibyanshu` in lowercase, matching the document title and the favicon — asked
  for explicitly on 2026-10-18, after it had briefly been given `normal-case`. The DOM
  still carries `Dibyanshu` (`site.displayName`), so the casing survives for
  screen readers and anything that reads the markup.
- **No measure cap on the main prose.** The `why-me` paragraphs fill the
  column — they carried `max-w-2xl` until 2026-10-18, which left ~250px of the
  column empty. The `hire.me` section carries no intro prose (removed on request),
  so the compose form follows the heading directly. The hero intro keeps
  `max-w-xl`, since it already sits inside its own grid column. `/builds`, `/reads`,
  `/watches`, and `/gear` carry no intro at all — those paragraphs were removed on
  request on 2026-10-20 — so the content follows the heading directly, like
  `hire.me`.
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
| Micro label | `0.625rem` | 700 | `tracking-widest`, muted |

## 4. Spacing & Layout

- Container: `max-width: 35rem` — 560px at the 16px base, 896px at the desktop
  scale; `px-5` (`sm:px-8`), centered. The content measures 794px at the desktop
  scale: a reading column, not a dashboard.
- The hero uses the same `Container` (gutters inside the cap), so the avatar
  lines up with the section headings below.
- Top bar: sticky (`top-0`, `z-40`), translucent blurred, `border-border/30`.
- Hero: `pb-14` (the shell `main` supplies the top gap); one column on mobile,
  `md:grid-cols-[minmax(0,1fr)_2fr]` (`gap-10` / `md:gap-14`) — avatar plate and
  social row + text, the plate sitting in the first third.
- Section stack: `flex flex-col gap-14`.
- Section command followed by its content: `mt-6` on home sections, `mt-8` on
  `/builds`, `mt-10` on `/reads`, `mt-6` from the watch heading to the filter row,
  and `mt-8` from the filter row to the grid.
- Project grid: one column on phones, two from `md`, `gap-4`; cards carry an
  optional preview image.
- `main` carries `pt-8` above and `pb-6` as the closing gutter at **every**
  width, matched by the back-to-top control's own `pb-6` (§7, §8). The gap from
  the top bar to the first element was halved from `pt-16` on 2026-10-20 on
  request: the shell heading now starts 51.2px below the 100.2px bar at the
  desktop scale (35.2px below the 89.9px two-line phone bar), instead of
  102.4px.

## 5. Shape

- `rounded-sm` = `2px` (panels, cover plates, controls, carousel images).
- `rounded-md` = `4px` (available; unused).
- Tech icons are `1.875rem` square tiles with a `1px currentColor` border, a
  `1rem` glyph, and the tile's `0.85` resting opacity; hover lifts both colour
  and opacity. One `.tech-icon` class covers the home rows and project stacks.
- `rounded-full` = pill; nothing uses it since the `currently learning` timeline
  list became a chip row on 2026-10-18.
- No shadows.

## 6. Motion

- Duration `150ms`; easing `cubic-bezier(0, 0, 0.2, 1)`.
- Hovers change **color/border-color only**.
- `rise`: `opacity 0→1`, `translateY(0.75rem)→0`, `450ms var(--ease-out)`,
  `animation-fill-mode: both`. Blocks arrive bottom-to-top in sequence. The home
  page starts at `activity.log` — the hero is static — with section delays of
  `0/90/180/270ms`; `/builds` runs the heading at `0` and the cards at `90/180ms`;
  `/reads` runs the heading at `0` and the covers in `70ms` steps; `/watches` runs
  the heading at `0`, the `all/movies/series` filter at `80ms`, and the covers
  from `150ms` in `70ms` steps; `/gear` runs the heading at `0`, setup at `80ms`,
  the carousel at `160ms`, and the two groups at `240/320ms`.
- **The avatar's photo develops in when it arrives.** The `<img>` is held at
  `opacity: 0`, `blur(0.5rem)`, and `scale(1.06)` and released with a `300ms`
  `--ease-out` transition once its `load` event fires — or on hydration if the
  browser already had it (`complete`), which is the common case behind GitHub's
  five-minute cache. The `300ms` matches the avatar's own settle: the plate and
  the photo arrive as one gesture, not two.
- `prefers-reduced-motion` disables transitions and animations. The only
  JavaScript-driven motion is the hero name's alphabet spin — the top-bar
  wordmark's spin, moved to the name on 2026-10-20. It resolves left to right
  once after mount and then stops; reduced motion skips it entirely.

## 7. Components

### Top bar

Nav first: `~/`, `builds`, `reads`, `watches`, `gear` sit at the left edge at
`text-sm` in `muted-foreground`, hovering to `terminal`; the row's gaps tighten on
phones, and the links carry invisible touch padding (§8). The handle that used to
lead the bar was removed on 2026-10-20 and its alphabet spin moved to the hero
name — the bar now starts where the navigation does. `~/` is the landing page
itself, labelled `home` for assistive tech; `builds`, `reads`, `watches`, and
`gear` are routes. `hire.me` is not in the bar — the section is reached by
scrolling.

The right edge holds the **theme toggle**: a borderless `1.875rem` target sharing
`.tech-icon`'s hover and size but not its `0.85` resting opacity — it sits in the
same muted tone as the nav text, at full opacity. It shows a sun in the dark theme
and a moon in the light one. It is the only control in the chrome; clicking it flips `data-theme` on
`<html>`, stores the choice, and updates the browser's `theme-color`. The switch is the standard
**circular reveal** recipe: the theme actually switches *inside* the expanding
circle — no colour-covering blanket. Every click runs through
`applyTransitionedTheme`: when the View Transition API exists and motion is
allowed, it writes `--theme-reveal-x` / `--theme-reveal-y` — the toggle
button's own rect centre, always, not the pointer position — plus
`--theme-reveal-max` (the farthest-viewport-corner distance, ceil + 2px) onto
`<html>`, then calls `document.startViewTransition()` with the token flip as
its update. CSS neutralises the default cross-fade (`animation: none` and
`mix-blend-mode: normal` on both root snapshots) and plays `theme-reveal` on
the new snapshot — `clip-path: circle(0px → var(--theme-reveal-max) at
var(--theme-reveal-x) var(--theme-reveal-y))` over 380ms
`cubic-bezier(0.55, 0.06, 0.35, 0.95)` — so the re-themed page iris-wipes open
from the toggle. The variables persist between switches and are overwritten on
each click. Without the API, or under `prefers-reduced-motion`, the flip is
instant; the `body` still carries a `background-color / color` transition at
240ms ease so no-API flips settle visually (the global reduced-motion rule
collapses that duration for users who ask for less motion). In the instant
path the two stacked icons run their spin-and-fade swap (`opacity` +
`transform` — the leaving icon spins out past 90° and shrinks to `0.4`, the
entering one spins in the other way); inside a view transition the icon change
is part of the snapshot the circle reveals. Clicks also play a short,
smooth mechanical-keyboard click sound — `public/sfx/theme-click.mp3`, the
same 52ms micro-tick MP3 the ashutoshx7.me theme toggle plays (extracted
verbatim from that bundle, 684 bytes, played at full volume to match) —
started straight
from the click handler via a shared lazy `Audio` element at half volume; the
sound plays before the reveal begins, autoplay-policy rejections are
swallowed, and dropping any file over `public/sfx/theme-click.mp3` is enough
to swap it.

### Favicon

`src/app/icon.png` — a white lowercase `d` in Iosevka Nerd Font Bold on the
background colour. It replaced the stock Next.js icon that shipped with the
scaffold on 2026-10-18: the framework's logo was sitting in the browser tab of a
personal site. The lowercase `d` matches the first letter of the hero name; the
avatar plate no longer carries a glyph, so the tab is the only place the mark
appears.

It is generated rather than hand-drawn, so it can be regenerated at any size:

```
ffmpeg -f lavfi -i color=c=0x0a0a0a:s=256x256 \
  -vf "drawtext=fontfile=<IosevkaNerdFont-Bold.ttf>:text='d':fontcolor=0xffffff:fontsize=256:x=(w-text_w)/2:y=(h-text_h)/2" \
  -frames:v 1 src/app/icon.png
```

Next picks the file up from the `icon.png` convention and emits the
`<link rel="icon">` itself; there is no `favicon.ico` any more.

### Hero

`[minmax(0,1fr)_2fr]` grid — the plate sits in the first third, the text takes
the rest.
Left: the **avatar** (`Avatar`) and, at the foot of the column, the social icon
links. Right: `~ whoami` label, name, intro, and tech icons. (A
`▸ building <project>` status line sat between the intro and the tags until
2026-10-18; the data is still in `site.status` if it comes back.)

**The avatar is a local profile picture, with the plate as its fallback.** Until
2026-10-18 it was only the plate: a `bg-card` square with a faint grid and a `DM`
monogram, standing in for a photo. The photo now sits on top of that plate,
which stays underneath so a slow or failed load degrades to the empty grid instead
of a broken image. The plate shows no glyph: the lowercase `d` that briefly stood there
on 2026-10-20 was removed the same day on request, so the loading state is just
the grid. The picture is `Assets/profile.png`, imported and served from this origin;
it replaced GitHub's `/<user>.png` endpoint on 2026-10-20 so the site no longer
depends on a remote avatar. `alt=""`: the name beside it already says who it is,
so the image is decoration.

**It arrives rather than snaps.** The photo is held over the plate at `opacity: 0`,
`blur(0.5rem)`, `scale(1.06)` and settles to rest in `300ms` (§6), so what a
visitor sees while the image is still loading is the plate it was always designed
to fall back to. The reveal is keyed to the image's `load` — or to `complete` when
the browser had it before React hydrated — never to a timer, so it cannot finish
before the photo exists. If the script never runs, an inline `<noscript>` rule
shows the photo at rest instead of leaving the plate; if the image never arrives,
the plate is the fallback. The states live in `globals.css` as `.avatar-photo` and
`.avatar-photo[data-ready]`; the component only owns the flag.

**The plate is sized to the social row, not to its column.** It is `8.625rem`
square at every width — `4 × 1.875rem` tiles plus `3 × 0.375rem` gaps — so the
four icon links underneath span exactly the same width. At `md` and up the first
grid track is still the row's third (~234px at the desktop scale), but the plate
stops short of it (221px); the text column keeps its two thirds. At `md` and up
the plate carries `mt-3`, so its top edge sits just below the `~ whoami` eyebrow
rather than level with it or down at the name.

Until 2026-10-19 it was `h-full w-auto aspect-square` in an `[auto_1fr]` grid —
"as tall as the text beside it". That reads well in a screenshot and is circular
in the layout: the track size came from the plate, the plate's width came from
its height, and its height came from the row, which the text sets. Between 768px
and 1023px the browser resolved that by making the plate **867px wide in a 756px
viewport**, which overflowed the page and squeezed the text column to nothing —
invisible at the two widths that had been reviewed, and found on 2026-10-19 by
measuring every width from 320px to 1500px. At 1500px the plate was 459px wide; a
third of the row gives 414px there. The plate is now fixed at `8.625rem`, so the
track no longer sets its size at all.

**600px is enough for the plate.** The square asks ~442 device pixels on a 2×
display at the desktop scale, so the supplied 1254×1254 PNG was pressed to 600×600
and written to `Assets/profile.png` (403 KB). The earlier 460px remote source was
sharp enough too; the local file keeps that sharpness and removes the request.

**The name is the short one, and it stays lowercase.** The `<h1>` renders
`AnimatedName`, whose accessible text is `site.displayName` — `Dibyanshu` in the
markup — while the visible span shows `site.handle`, `dibyanshu`, matching the
document title (§9) and the favicon. On the first load the letters spin through the
alphabet and resolve left to right, reusing the top-bar wordmark's old motion
(§6); it is a `"use client"` island because it owns a timer, and it leaves the
heading static when `prefers-reduced-motion` is set. The full name stays in
`site.name` for the metadata description and prose (`layout.tsx`, the `/builds`
description). It is the one name on the site that is deliberately left lowercase
(§3).

**The plate carries no controls.** Bordered `resume` and `email` buttons sat under
it until 2026-10-18 and were removed for good. They only restated links already in
the hero's own social row, in the largest and boxiest elements on the screen — the
left column holds the avatar and the icon row, and nothing else. `site.resume` and
`public/resume.pdf` stay: the social row still uses them.

**The row is four icon links under the plate: GitHub, LinkedIn, X, and
`resume`.** At `md` and up the left column stretches to the text column's height
and the row sits at its foot (`mt-auto`); the tech icons close the right column at
the same foot (`md:mt-auto`), so the two rows share a bottom edge at every width
instead of depending on which column happens to be taller. On phones the social
row follows the plate directly. Each is a `.tech-icon` tile
matching the skill rows, with the name in `aria-label` and a `title`; a `p-2`
wrapper around the visible tile gives the anchor a 44px touch target without
enlarging the border. X points at `https://x.com/DibyanshuMoura` through
`site.links.x`. `resume` is the one generic mark — a document glyph — because the
file it opens is a PDF. `email` was the third link until 2026-10-18 and was
removed on request. A bare address is the one link that leads nowhere a visitor
can look around in, and contact already has a better door: `hire.me` states the
address in its `to:` row and sends from there. So the hero offers no `mailto:` —
the landing page has **no static email link at all**; the address appears once, in
that form's `to:` row (§7).

### Section heading

`SectionHeading` renders `$ cat <file>` (accent prompt) with a trailing rule.

### Project card

`panel` (`border-border`, **transparent** fill) with hover to
`border-terminal-dim/40`, `overflow-hidden`, and a `p-5` content column with
`gap-3`:

- **Preview when there is one.** Both cards carry one now. DevLens keeps the
  supplied landing-page mockup (`Assets/Projects/devlens.webp`); Reclaim
  carries its own screenshot — the `~/Downloads` PNG (1536×1024) converted to
  `Assets/Projects/reclaim.webp` (50KB) — at the top of the card, `16/9` and
  `object-cover`, separated from the content by a hairline, so both cards
  start their text on the same line with no broken image and no "pending"
  copy. The old empty panel reserved for a future shot is gone; the old
  1890×455 dashboard-header strip was removed on 2026-10-20 because its text
  was unreadable at card width.
- **The stack uses the home page's icon tiles.** `TechIcons` renders
  `project.stack` at the same `1.875rem` size, border, glyph, and hover as the
  skill rows, so a tool looks the same everywhere on the site. It replaced the
  text `.badge` chips on 2026-10-20 on request. Each icon names its tool in
  `title` and `sr-only`; icons exist for JavaScript, React, Node, Express, MongoDB,
  the GitHub API/OAuth, the LLM/AI tools, Multer, and Nodemailer.
- **The name is a name.** The `<h3>` carries `normal-case`, so the card reads
  `DevLens` and `Reclaim` the way the projects are written,
  not `devlens` (§3). Everything under it — tagline, stack labels, the `live` /
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
- Tagline, summary, stack icons, and a bottom row of repo links — or the
  `pendingNote` when no verified links exist. **Overview length, not a case
  study:** one short summary paragraph (~2 sentences) and a stack, nothing
  enumerated. The summary carries `.prose`, so `GitHub`, `Commit`, `LLM`, and
  `Gemini AI` keep their casing; the tagline, stack labels, and marker stay
  lowercase chrome. A feature-bullet list sat here until 2026-10-18 and made each
  card ~1000px tall. The detail lives in the project's own `readme.md` and
  `PROFILE.md` §4; the card links to `source` and stops there — a separate
  `readme.md` link was added on 2026-10-18 and removed the same day, because
  `source` lands on the repository page where that readme already is.
- **Two cards share a row.** The grid is `grid-cols-1` on phones and two columns
  from `md`; at the desktop scale each card measures 383.9px wide. The cards
  stretch to the taller one, so the pair shares a top and bottom edge even though
  only DevLens has a preview.

### Skills rows (`skills.md`)

Two `TechIcons` rows, one per group, in different tones: **`working with`** at
`muted-foreground`, **`currently learning`** at `terminal-dim`. Each entry is a
`1.875rem` tile holding a glyph; the name is carried by the element's `title` and
an `sr-only` span, so hover and assistive tech still read every tile even though
the chip is gone. The tone is the whole difference — same box, same size, same
hover — which keeps the claim honest: tools in use and topics in progress are the
same *kind* of mark, and the dimmer row says the second set is not yet something
to lean on. The group labels carry the semantics; the tone only sets the
confidence.

The row is icon-first because a stack is recognised by its marks. `React.js`,
`Node.js`, `Express.js`, `MongoDB`, `C++`, `SQL`, `Git`, and `Linux` use brand or
database glyphs; the learning row uses the `Python`, `TypeScript`, `Next.js`, and
`Docker` marks and four generic glyphs for the topics (`sparkles` for AI/ML,
`layers` for foundations, `grid` for system design, `database` for advanced SQL).
`src/components/glyph.tsx` holds the paths; `tech-icons.tsx` maps labels to them.

**Currently learning used to be a vertical list** — `border-l border-border/50`
and a `9px` accent dot per item — until 2026-10-18. It was the only list of that
kind on the site, its rule was invisible at `border-border/50` on the background,
its dots were full-white, and eight one-line entries spent ~410px of column height
and read as unfinished next to the chip row above. Replaced with the second row,
which is `~90px`.

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
which hands it to Nodemailer on the server (`src/lib/mail.ts`; `.env.example`
documents the variables and `PROGRESS.md` §7 the setup). That one handler is the
only part of the site which is not prerendered —
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

Every hover says one thing: **text goes to `terminal`** — white in the dark theme,
black in the light one. `.control` names the colour twice, border and text.

- `link` — already white; hover only adds an underline. Used for the card's repo
  link (`source`). A **project status marker is never a `link`**: `live` rests muted
  and brightens on hover like the nav, so a clickable status is drawn neither as a
  box nor as preemptively-white text.
- `control` (the form's `send`, and the setup carousel's `prev` / `next`) — border
  and text to white. The hero's `resume` / `email` controls used this too until
  2026-10-18, which is why the `.control` class is older than its remaining
  call sites. The carousel is what made it plural again: two of the three
  `<button>`s on the site are now its arrows.
- Top-bar nav and the theme toggle — muted to `terminal` (white on dark, black on
  light); the active route stays at `terminal`.
- Icon tiles (skill rows, social row, theme toggle) — the same inversion, border
  and glyph together. `.tech-icon:hover` and `.icon-link:hover .tech-icon` live
  **outside** `@layer components`, because Tailwind's `utilities` layer loads
  after `components` and the `text-muted-foreground` utility would otherwise keep
  the tile muted in both themes.
- Project `live` marker — muted to white. Same treatment as the nav, because it is
  the same kind of thing: a quiet label that turns out to be clickable.
- Back to top — a text link, not a `.control`; muted to white, like the nav.
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
five routes and the 404 page instead of each page owning a target; the home
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
landing page's section list as `activity.log` → `skills.md` → `why-me` →
`hire.me`: the contribution graph now opens the page under the hero. It was the only
rendering of `site.direction`, so that field went with it — the position it
paraphrased (`PROFILE.md` §2) is unchanged there, and the `why-me` panel below
still carries the "how I work" prose. Nothing linked to `/#about`, so no anchor was
left dangling.

### Why hire me (`$ cat why-me.md`)

A `panel` of three short paragraphs, deliberately **subject-neutral**: it is about
how the work gets done rather than what the work is about. No technology names, no
project references, and no invented metrics. The text is Dibyanshu's own, supplied
on 2026-10-19, and its arc is how the work gets approached → what is brought to a
team → growth and what it contributes. It replaced four paragraphs written for the
site on 2026-10-18, whose closing beat — the work being judged by whether it helps
someone — was the only part of that copy the new text does not repeat.

### Builds page (`/builds`)

Same shell heading and nav, then two cards side by side from `md` (one column on
phones). Each card is an **overview, not a case study**: name, tagline, one short
summary paragraph, stack icons, and the links. The one-column layout made a single
card fill the page; the pair now reads as a set without putting more than two
projects on a row. It carried a feature-bullet list behind a `showHighlights`
prop until 2026-10-18 — the cards ran ~1000px each, which read as a wall of text.
The full feature lists live in `PROFILE.md`, and the project's own `readme.md` is
the place for detail. An `all` rule heading sat above the grid until 2026-10-20;
with two projects it labelled nothing and cost a band of vertical space, so it and
its `RuleHeading` component were deleted.

### Reads page (`/reads`)

`$ cat reads.md`, no intro, then the shelf: a grid, `grid-cols-2` on phones
and `3` from `md`, with `gap-x-5 gap-y-9`. Every jacket sits in the same `2/3`
plate — `rounded-sm`, a hairline border, `bg-card` — so the boxes share one width
and height and the rows line up. The imported jacket fills the plate with
`object-cover`; the crop only trims the jackets' margins (they range from 0.66 to
0.82 width/height), keeping the cover art and title whole, and the boxes never
letterbox. The title sits in `normal-case` over the author in `muted-foreground`.
Covers are imported assets, the same pipeline as the project screenshots, so
nothing is hotlinked from an image host.

**A cover opens when you point at it.** `transform-origin: left center` with
`perspective(40rem) rotateY(-12deg)` swings the free edge toward the reader, as if
the front board had lifted off the spine, and the border brightens to
`terminal-dim` in the same `150ms`. It is CSS-only (`.book-cover` in
`globals.css`), so the grid stays a server component and the pointer needs no
script. The jackets carry no links — the grid is the whole content.

**The shelf is five books, and the jackets are files.** `src/lib/reads.ts` lists
The Cat Who Taught Zen (James Norbury), The Subtle Art of Not Giving a F*ck (Mark
Manson), The Laws of Human Nature (Robert Greene), Ikigai (Héctor García &
Francesc Miralles), and Hands-On Machine Learning with Scikit-Learn, Keras, and
TensorFlow (Aurélien Géron), in the order Dibyanshu gave them. The jackets were
pulled once from Open Library's cover service into `Assets/Covers/` and imported,
so the page ships its own images.

### Watches page (`/watches`)

`$ cat watches.md`, no intro, then one filter row and one `2/3` cover grid. The
filter reads `all / movies / series` (no slashes without spaces) and has no group
headings in the list. It is three text buttons separated by spaced `terminal-dim`
slashes: the active label is `terminal` (white by default, black in the white
theme) and the others are `muted-foreground`, so the selection inverts with the
theme. `all` is the initial state and shows movies and series together in one
grid; `movies` and `series` narrow that same grid.

The grid matches `/reads`: `grid-cols-2` on phones and `3` from `md`,
`gap-x-5 gap-y-9`, with the title in `normal-case` over the year in
`muted-foreground`. A poster fills its plate with `object-cover`; hover only
brightens the border. The data reads `watchedFilms` and `watchedSeries` from
`src/lib/watches.ts` — title, year, and imported poster — so adding a title is a
data edit, not a layout change. The list is nineteen films and four series, in the
order Dibyanshu gave them. Year ranges use an en dash for series (`2017–2020`,
`2022–`). Posters live in `Assets/Posters/` and are imported, not hotlinked.

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
  captures. The reads jackets are the one deliberate exception: they fill a
  uniform `2/3` plate with `object-cover`, so the shelf stays a grid; the crop
  only takes jacket margins.
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

- **< 640px:** one column; `px-5`; hero stacks (plate and social icons above the
  text); project cards one up.
- **≥ 640px:** `px-8`.
- **≥ 768px:** hero switches to `[minmax(0,1fr)_2fr]`.
- **Every width:** the project grid is capped at `35rem`, one column on phones
  and two from `md` (`≥ 768px`). At the desktop scale each card measures 383.9px
  wide; at `md` the summaries are narrower but still prose-width, and the pair
  shares one row rather than each project filling a screen.
- **The top bar holds one line from 390px up.** With `~/ builds reads watches
  gear` and the theme toggle, the row needs more width than a 320px or 360px
  screen gives it: the nav wraps to two lines there (a measured 89.9px of sticky
  header at the phone scale) while the toggle stays pinned to the right edge. At
  390px it returns to one line (69.2px). Wrapping is the designed fallback
  (`flex-wrap`), never clipping, and the nav takes its own second line instead of
  pushing the toggle off the edge.
- **Touch targets are ≥ 44px, measured rather than assumed.** `.control` carries
  the only px value outside the hairlines and the radius — `min-height: 44px` —
  because a touch target is a physical size: the class's own rem-based padding
  lands at 44.8px at the desktop scale (where the floor is inert) and 30.8px at
  the phone scale. The nav gets the same floor through invisible padding and a
  cancelling negative margin (`py-2.5 -my-2.5` → 44px); the social icon links wrap
  a `1.875rem` tile in `p-2 -m-2`, which measures 50.6px at the phone scale and
  changes nothing visibly — the same trick back to top already used (51px).
- **The heatmap never scrolls.** The year is two blocks at a share of the panel's
  width (§7): side by side from `sm` up, stacked on phones, where a 320px phone
  shows the whole year as two 209 × 53px rows at 6.13px a cell instead of a quarter
  of it at 3.1px behind a hidden scrollbar. Measured `scrollWidth == clientWidth`
  at every width. The ruler drops a label that would collide with the next one
  below a 768px container — only ever the year's second label.

Measured on 2026-10-19 across the three routes then live at 320, 360, 390, 420,
480, 540, 600, 639, 640, 700, 767, 768, 1024, 1280, 1462 and 1500px: **no
horizontal overflow anywhere** (`scrollWidth == clientWidth`), no element crossing
the right edge, and no month label touching its neighbour.

## 9. Routes

All five pages are statically prerendered and share the top bar, container, and
shell-heading vocabulary. One route is not a page: `POST /api/contact`, the contact
form's mail endpoint (§7), which runs per request as a Vercel Function. It has no
layout, no navigation, and nothing to render — it takes JSON and answers JSON, and
any other verb on it is a `405`.

| Route | Purpose |
| --- | --- |
| `/` | Hero, GitHub activity, skills, why hire me, hire me (contact form) |
| `/builds` | Every project, at overview length, with stack and links |
| `/reads` | The shelf: a 3-up cover grid, each cover opening on hover (`$ cat reads.md`) |
| `/watches` | The watch log: a `2/3` cover grid with an `all/movies/series` filter (`$ cat watches.md`) |
| `/gear` | The desktop itself (setup carousel), then hardware, software, and config files (`$ cat gear.yml`) |
| `POST /api/contact` | Sends the contact form's message with Nodemailer |

The top bar marks the current route with `aria-current="page"` and the accent
colour — all five routes do, `home` included, so exactly one item is marked
wherever you are. Navigation uses `next/link`. There is no `about` entry, and since
2026-10-19 no `about.md` section either — the landing page's first section is
`activity.log` (§7). The `hire.me` section (the contact form) keeps its `id` and
`scroll-mt` for deep links such as `/#hire-me`, though nothing in the bar points at
it. The back-to-top control is rendered once, by the root layout, so it appears on
every route — including `/_not-found`, which is otherwise still Next's stock page.

**Document titles.** The title is the short handle, not the full name: `dibyanshu`
on `/`, and `<page> — dibyanshu` on the other routes (`Builds — dibyanshu`,
`Reads — dibyanshu`, `Watches — dibyanshu`, `Gear — dibyanshu`). It reads
`site.handle`, the same string as the hero `<h1>`, so the tab
and the hero cannot drift apart. The page
words keep their capitals: the lowercase rule is a display transform applied to
the page (`§3`), and a title is not part of the page.

**Data sources.** `src/lib/projects.ts`, `src/lib/site.ts`,
`src/lib/gear.ts`, `src/lib/reads.ts`, and `src/lib/watches.ts` are static.
`src/lib/github.ts` fetches the public GitHub
contribution calendar at build time under `'use cache'` with
`cacheLife("hours")`, and returns `null` on failure so the activity section can
be omitted rather than showing invented numbers.
