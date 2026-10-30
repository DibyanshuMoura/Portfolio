import type { StaticImageData } from "next/image";
import devlensShot from "../../Assets/Projects/devlens.webp";
import reclaimShot from "../../Assets/Projects/reclaim.webp";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  stack: readonly string[];
  links: readonly ProjectLink[];
  image?: StaticImageData;
  imageAlt?: string;
};

export const projects: readonly Project[] = [
  {
    slug: "devlens",
    name: "DevLens",
    tagline: "how your GitHub reads to a hiring manager",
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
    slug: "reclaim",
    name: "Reclaim",
    tagline: "get back what's yours — no accounts",
    stack: [
      "JavaScript",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Gemini AI",
      "Nodemailer",
    ],
    links: [
      { label: "Live demo", href: "https://reclaim-items.vercel.app" },
      { label: "Source", href: "https://github.com/DibyanshuMoura/Reclaim" },
    ],
    image: reclaimShot,
    imageAlt: "Reclaim landing page",
  },
] as const;
