import type { Metadata } from "next";
import { Container } from "@/components/container";

import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { TopBar } from "@/components/top-bar";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Builds",
  description:
    "Builds by Dibyanshu Moura — a GitHub analytics platform and an accountless lost-and-found engine where AI reads found-item photos and both sides confirm matches.",
};

export default function BuildsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar active="builds" />

      <main className="flex-1 pt-8 pb-6">
        <Container>
          <div className="animate-rise">
            <SectionHeading file="builds.md" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}
