# PROFILE.md — Dibyanshu Moura

## 1. Identity

- Name: Dibyanshu Moura
- Current role: Student and aspiring data scientist (primary interest: AI/ML)
- Location: India
- GitHub: https://github.com/DibyanshuMoura
- LinkedIn: https://www.linkedin.com/in/dibyanshu-moura-213170325
- Email: work.dibyanshumoura@gmail.com

Use this information as the initial profile. Verify contact details before publishing them.

## 2. Professional Positioning

I am a student and developer who builds practical software applications while improving my programming fundamentals and engineering skills.

My main interest is AI and machine learning, and my goal is to work as a data scientist. The portfolio should lead with that direction while staying honest about it: my applied AI work so far is LLM and Gemini integration inside web applications, not research, modelling, or data-science work at scale.

My work includes full-stack web development, API integration, database-backed applications, and AI-assisted application features.

I do not currently have professional industry experience. Present my abilities through real projects, technical knowledge, and demonstrated implementation rather than employment history or exaggerated claims.

My portfolio should communicate curiosity, practical problem-solving, and an interest in understanding how software works.

## 3. Technical Skills

### Programming Languages

- C
- C++
- JavaScript (ES6+)
- SQL

### Frontend

- HTML5
- CSS3
- React.js
- Responsive Web Design
- DOM Manipulation
- REST API Integration

### Backend

- Node.js
- Express.js
- RESTful API Design
- MongoDB

### APIs and AI Integration

- GitHub REST API
- LLM integration
- Gemini AI integration

### Tools and Platforms

- Git
- GitHub
- Linux
- Postman

### Computer Science Fundamentals

- Object-Oriented Programming
- Data Structures and Algorithms
- Operating Systems
- Database Management Systems
- Problem Solving

### Currently Learning

- AI/ML integration
- Machine learning foundations
- Data analysis with Python
- System Design
- TypeScript
- Next.js
- Docker
- Advanced SQL

Do not present every listed technology as an advanced skill. Keep learning goals distinct from demonstrated capabilities.

## 4. Selected Projects

### DevLens — GitHub Profile Analyzer

Repository: https://github.com/DibyanshuMoura/DevLens

Live demo: https://devlensai.vercel.app

DevLens measures a public GitHub profile and produces a report that separates what was measured from what the AI wrote. Commit activity and repository hygiene are computed in code and handed to the model as verified signals, so the written analysis cites real numbers instead of guessing. Sign-in is the analysis: there is no separate "analyze" step, and the result is saved and reused on later visits.

What it does (verified against the project's own README, 2026-10-18):

- Measured: a commit heatmap across the most recently pushed repositories, with current and longest streak, active days and peak day.
- Measured: six deterministic repository-hygiene checks (description, topics, license, freshness, demo link, tests) scored per repository, plus profile-wide coverage.
- Role matching: 20 target roles, each with a fit score, strengths, gaps and a six-step roadmap.
- Resume: an optional PDF whose text is cross-checked against the profile, surfacing public work the resume never claims. Nothing is stored on disk.
- History: each analysis appends a snapshot so score, commits and repository quality can be compared over time.
- Reliability: when GitHub's hourly rate limit is exhausted, the last saved analysis is served with a cached notice rather than an error.

Coverage limits, stated in the UI rather than hidden:

- Only the 8 most recently pushed owned repositories are scanned, at most 3 pages each.
- Private repositories are invisible to GitHub's API, so totals understate real work.

Engineering decisions worth describing on the portfolio:

- Commit counts come from `/repos/{owner}/{repo}/commits`, not the Events API, because GitHub removed `payload.size` and `payload.commits` from `PushEvent` — an Events-based count silently returns nothing.
- On rate-limit exhaustion the scan aborts and returns partial data flagged as truncated, rather than firing doomed requests at the remaining repositories.
- The auth check distinguishes unauthorized (401/403) from request failure, so a cold server start cannot silently sign a returning visitor out.

Technologies:

- HTML
- CSS
- JavaScript
- React.js
- Node.js
- Express.js
- MongoDB Atlas
- GitHub REST API
- GitHub OAuth (7-day JWT sessions)
- Groq LLM (defaults to `openai/gpt-oss-120b`)

Portfolio guidance:

- Make the live demo and source repository easy to find.
- Explain the problem the project addresses.
- Show actual interface screenshots or demonstrations where available.
- Describe the architecture and data flow using the real implementation.
- Highlight interesting engineering decisions and challenges.
- Explain AI functionality separately from deterministic analysis.
- Do not invent user counts, performance metrics, or claims about production usage.

### Lost & Found Management System

Repository: No dedicated repository. (Verified 2026-10-18: the resume's "Code"
link for this project points to the GitHub profile, not a project repository.)

Live demo: None. The project is not hosted.

A full-stack application designed to connect people who have lost items with people who have found them through AI-assisted item matching and automated email notifications.

The system has two main workflows.

Lost item workflow:
- Accepts a textual description.
- Stores the report.
- Sends an email confirmation.

Found item workflow:
- Accepts an image upload.
- Uses Multer for file handling.
- Uses Gemini AI to extract relevant item properties.
- Matches extracted properties against lost-item records.
- Sends emails to relevant contacts when a match is identified.

Technologies:

- MongoDB
- Express.js
- React.js
- Node.js
- Multer
- Gemini AI
- Nodemailer

Portfolio guidance:

- Explain the complete reporting and matching workflow.
- Show how the frontend, backend, database, AI service, and email system interact.
- Describe the actual matching mechanism based on the source code.
- Do not claim guaranteed matching accuracy or successful real-world recovery without evidence.
- Link to a live demo only if one exists and has been verified.

## 5. Education

Graphic Era Hill University
- Program: Bachelor of Computer Applications
- Location: Haldwani, Uttarakhand, India
- Duration: August 2024 – May 2027

Saraswati Academy
- Senior Secondary: 75%
- Secondary: 90%
- Years: 2021–2023

Education is optional portfolio content. Do not automatically turn it into a prominent resume-style section.

## 6. Personal Developer Identity

The portfolio should communicate that I enjoy building applications, exploring technologies, and understanding how software systems work.

Emphasize:

- Practical software development.
- Programming and problem-solving fundamentals.
- Full-stack application development.
- APIs and databases.
- Experimentation with AI-assisted features.
- Continuous technical growth.

Keep the writing authentic, thoughtful, and technically grounded.

Do not invent hobbies, personal stories, opinions, or achievements.

## 7. Portfolio Content Direction

The portfolio is a personal website, not an online resume.

Use my resume as a source of facts, not as a template.

Prioritize:

1. A distinctive personal introduction.
2. Selected projects that visitors can explore.
3. Real demonstrations and source code.
4. Interesting technical decisions and lessons learned.
5. My developer interests and approach to building software.
6. Contact information.

Avoid:

- Resume sections copied directly into the website.
- Long lists of skills without context.
- Arbitrary skill percentages.
- Generic professional slogans.
- Excessive focus on education and qualifications.
- Invented experience, achievements, or project metrics.

### Project storytelling

For each project, explain:

- The problem or motivation.
- What the application actually does.
- Interesting implementation decisions.
- Technical challenges and solutions.
- What makes the project useful or interesting.

Use concise, engaging copy rather than a series of resume bullet points.

## 8. Career Direction

My primary interest is AI and machine learning, and my goal is to become a data scientist. I also enjoy full-stack development, backend engineering, and software engineering fundamentals, and I want that work to keep pointing toward data and ML.

Present me as an early-career developer with project-building experience, not as an experienced industry professional.

Demonstrate transferable skills through real work. Do not invent employment, internships, clients, certifications, or commercial deployments.

## 9. Contact Links

- Email: work.dibyanshumoura@gmail.com
- GitHub: https://github.com/DibyanshuMoura
- LinkedIn: https://www.linkedin.com/in/dibyanshu-moura-213170325
- DevLens repository: https://github.com/DibyanshuMoura/DevLens
- DevLens demo: https://devlensai.vercel.app

Verify contact information and links before publication.

**Checked 2026-10-18:** every link above returns HTTP 200 except the LinkedIn
profile, which answers 999 — LinkedIn's standard block for automated requests — so
that one is carried over from the resume and has not been machine-verified. The
email address is the same one the contact form composes to; it is the only mail
target on the site.

## 10. Accuracy Rules

Before generating or changing portfolio content:

1. Read this file.
2. Inspect the actual project and its documentation.
3. Verify the relevant features and links.
4. Preserve the distinction between skills, learning goals, and completed work.
5. Ask when important information is missing.

Never invent employment history, proficiency levels, awards, metrics, project features, or personal achievements.

Update this document when I provide lasting changes to my skills, projects, or professional profile.

## 11. Instructions for the Coding Agent

Use this file as a factual reference for personal and professional content.

Write specifically for the portfolio experience rather than copying resume language.

Use DESIGN.md for visual decisions and AGENT.md for implementation rules.

The goal is to present a credible, technically curious developer whose work demonstrates their abilities.

## 12. Stack and Setup (verified 2026-10-18)

Facts about the machine and the tools I actually use. Every external link listed
here was checked for a successful response before being added, and the hardware
values were read from the machine rather than assumed. **The owner confirmed
this list as the PC to present on 2026-10-18.**

### Hardware

- Laptop: Acer Predator PHN16-71
- CPU: 13th Gen Intel Core i7-13700HX (16 cores / 24 threads)
- GPU: NVIDIA GeForce RTX 4050 Laptop GPU, 6 GB
- Integrated graphics: Intel UHD Graphics 770
- Memory: 16 GB
- Storage: 1 TB NVMe (Micron 3400)

### Software

- OS: Arch Linux
- Compositor: Hyprland (Wayland)
- Terminal: foot
- Shell: bash
- Editors: Neovim, VS Code
- Browser: Zen Browser
- Containers: Docker
- Version control: Git
- Runtime: Node.js
- Language: Python 3
- Config files: `github.com/DibyanshuMoura/config` — a repository of Hyprland and
  Sway configuration files (the description comes from the repository itself)

Do not add anything to this list without verifying it on the machine first.
Python 3 is listed as installed tooling, not as a demonstrated skill.

