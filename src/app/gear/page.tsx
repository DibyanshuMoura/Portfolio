import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SetupCarousel } from "@/components/setup-carousel";
import { TopBar } from "@/components/top-bar";
import { gear, setupShots } from "@/lib/gear";

export const metadata: Metadata = {
  title: "Gear",
  description:
    "Screenshots of the running desktop and the hardware and software Dibyanshu Moura builds on — laptop, CPU, GPU, OS, terminal, editor, and config files.",
};

export default function GearPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar active="gear" />

      <main className="flex-1 pt-16 pb-6">
        <Container>
          <SectionHeading file="gear.yml" />

          <p className="prose mt-6 max-w-2xl text-[0.8125rem] leading-relaxed text-muted-foreground">
            The machine and the tools underneath everything else here. Rows link
            to official sites or the repositories behind them.
          </p>

          <p className="mt-10 text-sm">
            <span className="text-terminal-dim" aria-hidden>
              ##{" "}
            </span>
            <span className="text-foreground">setup</span>
          </p>

          <div className="mt-6">
            <SetupCarousel shots={setupShots} />
          </div>

          <div className="mt-10 flex flex-col gap-10">
            {gear.map((group) => (
              <section key={group.title}>
                <h2 className="label-accent">{group.title}</h2>

                <dl className="mt-4 divide-y divide-border/40">
                  {group.entries.map((entry) => (
                    <div
                      key={entry.label}
                      className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
                    >
                      <dt className="label pt-0.5">{entry.label}</dt>
                      <dd className="flex flex-wrap gap-x-5 gap-y-1 text-[0.8125rem] text-foreground">
                        {entry.values.map((value) =>
                          value.href ? (
                            <a
                              key={value.text}
                              href={value.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link inline-flex items-center gap-1"
                            >
                              {value.text}
                              <span aria-hidden className="text-terminal-dim">
                                ↗
                              </span>
                            </a>
                          ) : (
                            <span key={value.text}>{value.text}</span>
                          ),
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}
