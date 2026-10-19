import { Avatar } from "@/components/avatar";
import { Contact } from "@/components/contact";
import { Container } from "@/components/container";
import { ContributionGraph } from "@/components/contribution-graph";
import { SectionHeading } from "@/components/section-heading";
import { SocialLinks } from "@/components/social-links";
import { TechBadges } from "@/components/tech-badges";
import { TopBar } from "@/components/top-bar";
import { getContributions } from "@/lib/github";
import { currentlyLearning, site, workingWith } from "@/lib/site";

function Section({
  id,
  file,
  children,
}: {
  id: string;
  file: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16">
      <SectionHeading file={file} />
      <div className="mt-6 flex flex-col gap-4">{children}</div>
    </section>
  );
}

export default async function Home() {
  const contributions = await getContributions();

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar animateWordmark active="home" />

      <main className="flex-1 pt-16 pb-6">
        <section className="pb-14">
          <div className="mx-auto grid w-full max-w-4xl animate-fade-in grid-cols-1 items-start gap-10 px-5 sm:px-8 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-14">
            <Avatar />

            <div className="flex flex-col gap-4">
              <p className="text-xs tracking-widest text-muted-foreground">
                <span className="prompt" aria-hidden>
                  ~{" "}
                </span>
                whoami
              </p>

              <h1 className="text-2xl font-bold leading-none tracking-tight text-foreground md:text-3xl">
                {site.displayName}
              </h1>

              <p className="text-xs font-medium tracking-widest text-terminal">
                {site.role}
              </p>

              <p className="prose max-w-xl text-[0.8125rem] leading-relaxed text-muted-foreground">
                {site.intro}
              </p>

              <TechBadges items={workingWith} className="mt-1" />
              <SocialLinks className="mt-1" />
            </div>
          </div>
        </section>

        <Container>
          <div className="flex flex-col gap-14">
            <Section id="activity" file="activity.log">
              {contributions ? (
                <ContributionGraph data={contributions} />
              ) : (
                <p className="prose text-[0.8125rem] text-muted-foreground">
                  Activity is unavailable right now.
                </p>
              )}
            </Section>

            <Section id="skills" file="skills.md">
              <div className="flex flex-col gap-3">
                <p className="label">working with</p>
                <TechBadges items={workingWith} />
              </div>

              <div className="mt-2 flex flex-col gap-3">
                <p className="label">currently learning</p>
                <TechBadges items={currentlyLearning} tone="dim" />
              </div>
            </Section>

            <Section id="why" file="why-hire-me.md">
              <div className="panel flex flex-col gap-4 p-6 sm:p-8">
                <p className="prose text-[0.8125rem] leading-relaxed text-muted-foreground">
                  I&apos;m curious, persistent, and always willing to learn. I
                  enjoy breaking down problems, figuring out how things work, and
                  finding better ways to do them.
                </p>
                <p className="prose text-[0.8125rem] leading-relaxed text-muted-foreground">
                  I can bring a fresh perspective, a willingness to take
                  ownership, and the patience to work through problems instead of
                  giving up at the first error. I&apos;m comfortable learning new
                  things, taking feedback, and admitting when I don&apos;t know
                  something.
                </p>
                <p className="prose text-[0.8125rem] leading-relaxed text-muted-foreground">
                  I&apos;m still growing as a developer, but I can contribute
                  through thoughtful problem-solving, writing code, collaborating
                  with others, and being someone the team can rely on to keep
                  learning and getting things done.
                </p>
              </div>
            </Section>

            <Section id="hire-me" file="hire.me">
              <Contact />
            </Section>
          </div>
        </Container>
      </main>
    </div>
  );
}
