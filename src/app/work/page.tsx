import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { RuleHeading, SectionHeading } from "@/components/section-heading";
import { TopBar } from "@/components/top-bar";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Work by Dibyanshu Moura — a GitHub analytics platform and a full-stack lost-and-found system with AI-assisted matching.",
};

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar active="work" />

      <main className="flex-1 pt-16 pb-6">
        <Container>
          <SectionHeading file="work.md" />

          <p className="prose mt-6 max-w-2xl text-[0.8125rem] leading-relaxed text-muted-foreground">
            Everything I have built and can show. Each entry covers what it does,
            the stack behind it, and the code or demo where there is one.
          </p>

          <div className="mt-10">
            <RuleHeading label="all" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}
