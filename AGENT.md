# AGENT.md — Portfolio Development Rules

## Architecture: Frontend Portfolio

This project is a personal portfolio website whose pages are all prerendered. It
has **one** server-side part, added on request on 2026-10-19: `POST /api/contact`,
which sends the contact form's mail with Nodemailer (`src/lib/mail.ts`, set up in
`.env.example`).

### Requirements

- Use the existing frontend framework and architecture.
- Do not create a backend server, database, authentication system, or custom API for the portfolio. **Sole exception: the contact form's mail endpoint.** The request was to send the message "from the site itself" instead of handing it to the visitor's mail client, and that cannot be done without a server, so it is introduced here rather than quietly. It holds no state, touches no database, and every page remains statically prerendered and deployable to Vercel on its own.
- Do not introduce Express.js, MongoDB, or other backend infrastructure solely for the portfolio.
- Use client-side functionality and browser APIs where appropriate.
- Use external links to showcase projects, source repositories, and live deployments.
- Keep the project compatible with static frontend deployment on Vercel.
- Use environment variables only when genuinely required, and never expose private secrets in client-side code.
- If a future feature genuinely requires server-side functionality, explain why before introducing it.

### Project Showcase

DevLens and other projects are independent applications. The portfolio should present them through descriptions, screenshots, live-demo links, and source-code links rather than reimplementing their backend functionality.

### Deployment

The website should be deployable as a frontend application without requiring a separately managed backend service.

Verify the existing build configuration before changing deployment settings.

## 1. Mission

Develop and maintain a distinctive, polished personal developer portfolio.

This website is not a resume converted into a webpage. It should communicate my identity through my projects, technical interests, approach to building software, and the experience of exploring the site.

Work as a careful engineer. Understand the existing implementation, respect the design specification, preserve working functionality, and verify changes before declaring them complete.

## 2. Mandatory Documentation

Before starting work, read:

1. `AGENT.md` — development instructions.
2. `DESIGN.md` — authoritative visual and interaction specification.
3. `PROFILE.md` — personal and project information.
4. `PROGRESS.md` — current state, known issues, and next steps.
5. `README.md` — setup instructions and project overview, if present.

Also inspect any applicable nested `AGENTS.md` instructions.

Do not assume these documents accurately represent the current implementation. Inspect the source code, project configuration, dependencies, and Git status.

### Sources of truth

- `DESIGN.md`: visual design and user experience.
- `PROFILE.md`: verified personal and professional information.
- `AGENT.md`: implementation and working rules.
- `PROGRESS.md`: persistent development state.
- Existing source code: actual implementation and established conventions.

If instructions conflict, identify the conflict and resolve it conservatively rather than silently discarding established decisions.

## 3. Core Working Principles

### Inspect before editing

1. Understand the request and acceptance criteria.
2. Inspect relevant files and existing behavior.
3. Identify the cause of the problem or the requirements of the feature.
4. Choose the smallest appropriate implementation.
5. Implement the change.
6. Run relevant checks and inspect the final diff.

Do not rewrite working components or reorganize the project without a clear reason.

### Preserve existing work

- Preserve existing functionality unless a change requires otherwise.
- Do not overwrite unrelated user changes.
- Inspect Git status before editing.
- Avoid unrelated refactoring and formatting changes.
- Reuse established patterns where appropriate.
- Do not commit or push changes unless requested.

## 4. Portfolio Content Principles

The portfolio must feel personal, not like a conventional resume.

### Prioritize

- A distinctive introduction.
- Project exploration and demonstrations.
- Technical decisions and interesting implementation details.
- Personal interests in software and technology.
- Authentic writing and a coherent identity.
- Easy access to source code and live demonstrations.

### Avoid

- Copying the resume's structure into the website.
- Making education and skills the primary focus.
- Long lists of technologies without context.
- Generic professional slogans.
- Invented personal stories, opinions, achievements, or experience.
- Fake statistics, testimonials, or project metrics.

Use `PROFILE.md` for facts, but write content specifically for the portfolio experience.

## 5. Design and User Experience

`DESIGN.md` is the authoritative visual specification.

Read it before making visual changes. Preserve its typography, colors, spacing, layouts, borders, motion, and interaction decisions.

General principles:

- Maintain a coherent visual hierarchy.
- Prefer purposeful simplicity over unnecessary decoration.
- Use existing design tokens and components.
- Keep typography readable and consistent.
- Avoid unnecessary gradients, shadows, animations, and cards.
- Ensure mobile layouts work properly.
- Make interactions accessible and predictable.
- Do not invent a new visual direction without justification.

Do not duplicate detailed design specifications in this file. Refer to `DESIGN.md`.

## 6. Technical Implementation

Inspect the actual repository before assuming its framework or architecture.

- Follow existing language and framework conventions.
- Keep components focused and maintainable.
- Reuse existing utilities where appropriate.
- Avoid premature abstractions and unnecessary dependencies.
- Separate responsibilities when supported by the existing architecture.
- Use semantic HTML and accessible interaction patterns.
- Avoid unnecessary JavaScript when native browser features suffice.

For React projects:

- Follow existing component and hooks conventions.
- Use stable keys for rendered collections.
- Avoid unnecessary state and effects.
- Handle relevant loading, empty, and error states.
- Avoid performance optimizations without a meaningful reason.

For styling:

- Follow the existing CSS or styling framework.
- Reuse shared tokens and styles.
- Avoid global selectors that unintentionally affect other components.
- Avoid repeated overrides and unnecessary specificity.

## 7. Functional Requirements

Interactive elements must work as intended.

Verify relevant functionality, including:

- Navigation and routes.
- Buttons and links.
- Project demonstrations and repository links.
- Forms and validation.
- Responsive navigation.
- Theme switching, if implemented.
- Animations and keyboard interactions.
- Loading and error states.

Do not introduce fake controls, placeholder links, or buttons without meaningful behavior.

## 8. Security and Performance

- Never expose secrets or private tokens in frontend code.
- Use environment variables for sensitive configuration.
- Validate untrusted input where applicable.
- Avoid unsafe HTML injection.
- Handle failed requests gracefully.
- Avoid unnecessary dependencies and oversized assets.
- Optimize images when appropriate.
- Avoid unnecessary network requests and layout shifts.

Do not sacrifice correctness or accessibility for marginal performance improvements.

## 9. Verification

Inspect the available project scripts before running commands.

Run relevant checks where available:

1. Linting.
2. Type checking.
3. Unit or integration tests.
4. Production build.
5. Browser verification for meaningful interface changes.

For visual changes, verify layout, responsiveness, accessibility, and relevant interactions.

For bug fixes, reproduce the original failure condition where practical.

Never invent successful test results. If a check cannot be run, explain why.

## 10. Progress Tracking

Maintain `PROGRESS.md` as the persistent record of project state.

Read it before starting work and update it after meaningful changes.

Record:

- Current project status.
- Completed work.
- Important implementation decisions.
- Files changed.
- Checks performed and their actual results.
- Known issues and blockers.
- Next concrete tasks.

Use `DONE`, `IN PROGRESS`, `BLOCKED`, and `TODO` where useful.

Do not fabricate development history. If the current state is unknown, inspect the repository before documenting it.

## 11. Task Workflow

For each task:

1. Understand the request.
2. Read relevant documentation.
3. Inspect the existing implementation and Git status.
4. Plan a focused change.
5. Implement the change.
6. Verify the result.
7. Inspect the final diff.
8. Update `PROGRESS.md`.
9. Report what changed and what remains unresolved.

Ask for clarification when a decision could significantly change the design direction, architecture, security model, or project scope. Make minor implementation decisions using existing conventions.

## 12. Definition of Done

A task is complete when:

- The requested change is implemented.
- Required existing behavior is preserved.
- The design follows `DESIGN.md`.
- Relevant checks have been run where possible.
- The final changes have been inspected.
- `PROGRESS.md` reflects the verified state.
- Remaining limitations are documented.

Final rule: inspect first, implement deliberately, verify honestly, and preserve enough context for future development sessions.

