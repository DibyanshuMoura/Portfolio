import Link from "next/link";
import { Container } from "@/components/container";
import { Wordmark } from "@/components/wordmark";

type PageKey = "home" | "work" | "gear";

type NavItem = {
  href: string;
  label: string;
  page?: PageKey;
};

const NAV: readonly NavItem[] = [
  { href: "/", label: "home", page: "home" },
  { href: "/work", label: "work", page: "work" },
  { href: "/gear", label: "gear", page: "gear" },
];

export function TopBar({
  active,
  animateWordmark = false,
}: {
  active?: PageKey;
  animateWordmark?: boolean;
} = {}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-sm">
      <Container className="flex flex-wrap items-center justify-between gap-x-2.5 gap-y-1 py-4 sm:gap-x-3">
        <Link
          href="/"
          className="wordmark text-base font-bold text-muted-foreground transition-colors duration-150 hover:text-terminal"
        >
          <Wordmark animate={animateWordmark} />
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-x-2.5 gap-y-1 sm:gap-x-4"
        >
          <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-1 sm:gap-x-4">
            {NAV.map((item) => {
              const isActive = item.page === active;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
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
      </Container>
    </header>
  );
}
