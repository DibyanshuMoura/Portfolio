import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { TopBar } from "@/components/top-bar";
import { WatchList } from "@/components/watch-list";
import { watchedFilms, watchedSeries } from "@/lib/watches";

export const metadata: Metadata = {
  title: "Watches",
  description: "Movies and series Dibyanshu Moura has watched.",
};

export default function WatchesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar active="watches" />

      <main className="flex-1 pt-8 pb-6">
        <Container>
          <div className="animate-rise">
            <SectionHeading file="watches.md" />
          </div>

          <WatchList movies={watchedFilms} series={watchedSeries} />
        </Container>
      </main>
    </div>
  );
}
