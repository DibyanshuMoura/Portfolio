import Link from "next/link";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";

type PageKey = "home" | "builds" | "reads" | "watches" | "gear";

type NavItem = {
  href: string;
  label: string;
  page?: PageKey;
  ariaLabel?: string;
};

const NAV: readonly NavItem[] = [
  { href: "/", label: "~/", page: "home", ariaLabel: "home" },
  { href: "/builds", label: "builds", page: "builds" },
  { href: "/reads", label: "reads", page: "reads" },
  { href: "/watches", label: "watches", page: "watches" },
  { href: "/gear", label: "gear", page: "gear" },
];

export function TopBar({ active }: { active?: PageKey } = {}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-sm">
      <Container className="flex flex-wrap items-center justify-between gap-x-2.5 gap-y-1 py-4 sm:gap-x-3">
        <nav
          aria-label="Primary"
          className="flex min-w-0 flex-1 items-center gap-x-2.5 gap-y-1 sm:gap-x-4"
        >
          <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-1 sm:gap-x-4">
            {NAV.map((item) => {
              const isActive = item.page === active;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-label={item.ariaLabel}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-block -my-2.5 py-2.5 text-sm transition-colors duration-150 hover:text-terminal ${
                      isActive ? "text-terminal" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <ThemeToggle />
      </Container>
    </header>
  );
}
