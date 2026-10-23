"use client";

import type { MouseEvent } from "react";

let clickSound: HTMLAudioElement | null = null;

function playClick() {
  if (!clickSound) {
    clickSound = new Audio("/sfx/theme-click.mp3");
    clickSound.preload = "auto";
    clickSound.volume = 1;
  }
  clickSound.currentTime = 0;
  void clickSound.play().catch(() => {});
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;

  try {
    localStorage.setItem("theme", theme);
  } catch {}

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#fafafa" : "#0a0a0a");
}

function applyTransitionedTheme(
  theme: "light" | "dark",
  origin: { x: number; y: number },
) {
  const supportsViewTransition = typeof document.startViewTransition === "function";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!supportsViewTransition || reducedMotion) {
    applyTheme(theme);
    return;
  }

  const { x, y } = origin;
  const maxRadius = Math.ceil(
    Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    ),
  );
  document.documentElement.style.setProperty("--theme-reveal-x", `${Math.round(x)}px`);
  document.documentElement.style.setProperty("--theme-reveal-y", `${Math.round(y)}px`);
  document.documentElement.style.setProperty("--theme-reveal-max", `${maxRadius + 2}px`);

  document.startViewTransition(() => applyTheme(theme));
}

export function ThemeToggle() {
  function toggle(event: MouseEvent<HTMLButtonElement>) {
    playClick();
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    const box = event.currentTarget.getBoundingClientRect();
    applyTransitionedTheme(next, {
      x: box.left + box.width / 2,
      y: box.top + box.height / 2,
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="toggle theme"
      title="toggle theme"
      className="theme-toggle tech-icon cursor-pointer text-muted-foreground"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="icon-sun size-4"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-moon size-4"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
