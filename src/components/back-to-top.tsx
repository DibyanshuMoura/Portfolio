import { Container } from "@/components/container";

export function BackToTop() {
  return (
    <Container className="flex justify-center pb-6">
      <a
        href="#top"
        className="inline-flex items-center gap-2 px-2 py-3 text-sm text-muted-foreground transition-colors duration-150 hover:text-terminal"
      >
        <span className="sr-only">back to </span>top
        <span aria-hidden>↑</span>
      </a>
    </Container>
  );
}
