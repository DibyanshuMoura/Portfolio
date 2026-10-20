import type { StaticImageData } from "next/image";
import devlensShot from "../../Assets/Projects/devlens.webp";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  stack: readonly string[];
  links: readonly ProjectLink[];
  image?: StaticImageData;
  imageAlt?: string;
  pendingNote?: string;
};

export const projects: readonly Project[] = [
  {
    slug: "devlens",
    name: "DevLens",
    tagline: "how your GitHub reads to a hiring manager",
    summary:
      "Measures a GitHub profile before writing about it. Commit activity, streaks and repository hygiene are computed in code, then handed to the LLM as verified signals.",
    stack: [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB Atlas",
      "GitHub REST API",
      "GitHub OAuth",
      "Groq LLM",
    ],
    links: [
      { label: "Live demo", href: "https://devlensai.vercel.app" },
      { label: "Source", href: "https://github.com/DibyanshuMoura/DevLens" },
    ],
    image: devlensShot,
    imageAlt: "DevLens landing page shown on a laptop",
  },
  {
    slug: "lost-and-found",
    name: "Lost & Found Management System",
    tagline: "AI-assisted item matching",
    summary:
      "Connects people who have lost items with people who have found them. Photos of found items are read with Gemini AI and matched against lost-item records, with emails sent on a match.",
    stack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Multer",
      "Gemini AI",
      "Nodemailer",
    ],
    links: [],
    pendingNote: "Source repository and live demo not yet published.",
  },
] as const;
