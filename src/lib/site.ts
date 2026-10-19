export const site = {
  name: "Dibyanshu Moura",
  displayName: "Dibyanshu",
  handle: "dibyanshu",
  role: "Student and aspiring data scientist",
  location: "India",
  intro:
    "I build practical software applications while working toward AI and machine learning — mostly full-stack, with APIs, databases, and AI-assisted features.",
  status: {
    project: "DevLens",
    note: "developer analytics for GitHub profiles",
  },
  resume: "/resume.pdf",
  links: {
    email: "work.dibyanshumoura@gmail.com",
    github: "https://github.com/DibyanshuMoura",
    linkedin: "https://www.linkedin.com/in/dibyanshu-moura-213170325",
  },
} as const;

export const githubUser = new URL(site.links.github).pathname.slice(1);

export const workingWith = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "cpp",
  "SQL",
  "Git",
  "Linux",
] as const;

export const currentlyLearning = [
  "AI/ML integration",
  "Machine learning foundations",
  "Data analysis with Python",
  "TypeScript",
  "Next.js",
  "Docker",
  "System design",
  "Advanced SQL",
] as const;
