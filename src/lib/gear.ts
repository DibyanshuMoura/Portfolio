
import type { StaticImageData } from "next/image";

import desktopBackground from "../../Assets/Screenshots/desktop-background.webp";
import desktopLauncher from "../../Assets/Screenshots/desktop-launcher.webp";
import desktopWorkspace from "../../Assets/Screenshots/desktop-workspace.webp";

export type GearValue = {
  text: string;
  href?: string;
};

export type GearEntry = {
  label: string;
  values: readonly GearValue[];
};

export type GearGroup = {
  title: string;
  entries: readonly GearEntry[];
};

export const configRepo = "https://github.com/DibyanshuMoura/config";

export type SetupShot = {
  image: StaticImageData;
  alt: string;
};

export const setupShots: readonly SetupShot[] = [
  {
    image: desktopBackground,
    alt: "The desktop on its own: a foggy forest wallpaper, with only the status bar across the bottom.",
  },
  {
    image: desktopLauncher,
    alt: "The application launcher open over the same wallpaper, listing Files, Zen Browser, Visual Studio Code, Neovim and Foot.",
  },
  {
    image: desktopWorkspace,
    alt: "fastfetch running in foot, with the LazyVim start screen open in Neovim beside it.",
  },
];

export const gear: readonly GearGroup[] = [
  {
    title: "hardware",
    entries: [
      { label: "laptop", values: [{ text: "Acer Predator PHN16-71" }] },
      {
        label: "cpu",
        values: [{ text: "13th Gen Intel Core i7-13700HX · 16 cores / 24 threads" }],
      },
      {
        label: "gpu",
        values: [{ text: "NVIDIA GeForce RTX 4050 Laptop GPU · 6 GB" }],
      },
      { label: "graphics", values: [{ text: "Intel UHD Graphics 770" }] },
      { label: "memory", values: [{ text: "16 GB" }] },
      { label: "storage", values: [{ text: "1 TB NVMe · Micron 3400" }] },
    ],
  },
  {
    title: "software",
    entries: [
      {
        label: "os",
        values: [{ text: "Arch Linux", href: "https://archlinux.org" }],
      },
      {
        label: "compositor",
        values: [{ text: "Hyprland (Wayland)", href: "https://hyprland.org" }],
      },
      {
        label: "terminal",
        values: [{ text: "foot", href: "https://codeberg.org/dnkl/foot" }],
      },
      {
        label: "shell",
        values: [{ text: "bash", href: "https://www.gnu.org/software/bash/" }],
      },
      {
        label: "editor",
        values: [
          { text: "Neovim", href: "https://neovim.io" },
          { text: "VS Code", href: "https://code.visualstudio.com" },
        ],
      },
      {
        label: "browser",
        values: [{ text: "Zen Browser", href: "https://zen-browser.app" }],
      },
      {
        label: "containers",
        values: [{ text: "Docker", href: "https://www.docker.com" }],
      },
      {
        label: "version control",
        values: [{ text: "Git", href: "https://git-scm.com" }],
      },
      {
        label: "runtime",
        values: [{ text: "Node.js", href: "https://nodejs.org" }],
      },
      {
        label: "language",
        values: [{ text: "Python 3", href: "https://www.python.org" }],
      },
      {
        label: "config",
        values: [
          {
            text: "Hyprland / Sway configs",
            href: configRepo,
          },
        ],
      },
    ],
  },
] as const;
