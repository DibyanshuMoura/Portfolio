"use client";

function apply(light: boolean) {
  document.documentElement.dataset.theme = light ? "light" : "dark";

  try {
    localStorage.setItem("theme", light ? "light" : "dark");
  } catch {}

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", light ? "#fafafa" : "#0a0a0a");
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={() => apply(document.documentElement.dataset.theme !== "light")}
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
