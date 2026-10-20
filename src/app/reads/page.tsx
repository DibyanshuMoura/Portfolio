import type { Metadata } from "next";
import { BookGrid } from "@/components/book-grid";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { TopBar } from "@/components/top-bar";
import { books } from "@/lib/reads";

export const metadata: Metadata = {
  title: "Reads",
  description: "Books Dibyanshu Moura has read.",
};

export default function ReadsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar active="reads" />

      <main className="flex-1 pt-8 pb-6">
        <Container>
          <div className="animate-rise">
            <SectionHeading file="reads.md" />
          </div>

          <div className="mt-10">
            <BookGrid books={books} />
          </div>
        </Container>
      </main>
    </div>
  );
}
