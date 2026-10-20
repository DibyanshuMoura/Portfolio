import { AnimatedName } from "@/components/animated-name";
import { Avatar } from "@/components/avatar";
import { Contact } from "@/components/contact";
import { Container } from "@/components/container";
import { ContributionGraph } from "@/components/contribution-graph";
import { SectionHeading } from "@/components/section-heading";
import { SocialLinks } from "@/components/social-links";
import { TechIcons } from "@/components/tech-icons";
import { TopBar } from "@/components/top-bar";
import { getContributions } from "@/lib/github";
import { currentlyLearning, site, workingWith } from "@/lib/site";

function Section({
  id,
  file,
  delay,
  children,
}: {
  id: string;
  file: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="animate-rise scroll-mt-16"
      style={{ animationDelay: `${delay}ms` }}
    >
      <SectionHeading file={file} />
      <div className="mt-6 flex flex-col gap-4">{children}</div>
    </section>
  );
}

export default async function Home() {
  const contributions = await getContributions();

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar active="home" />

      <main className="flex-1 pt-8 pb-6">
        <section className="pb-14">
          <Container className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-14">
            <div className="flex flex-col gap-4">
              <div className="md:mt-3">
                <Avatar />
              </div>
              <SocialLinks className="mt-auto" />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs tracking-widest text-muted-foreground">
                <span className="prompt" aria-hidden>~</span> whoami
              </p>

              <h1 className="text-2xl font-bold leading-none tracking-tight text-foreground md:text-3xl">
                <AnimatedName />
              </h1>

              <p className="prose max-w-xl text-[0.8125rem] leading-relaxed text-muted-foreground">
                {site.intro}
              </p>

              <TechIcons items={workingWith} className="mt-1 md:mt-auto" />
            </div>
          </Container>
        </section>

        <Container>
          <div className="flex flex-col gap-14">
            <Section id="activity" file="activity.log" delay={0}>
              {contributions ? (
                <ContributionGraph data={contributions} />
              ) : (
                <p className="prose text-[0.8125rem] text-muted-foreground">
                  Activity is unavailable right now.
                </p>
              )}
            </Section>

            <Section id="skills" file="skills.md" delay={90}>
              <div className="flex flex-col gap-3">
                <p className="label">working with</p>
                <TechIcons items={workingWith} />
              </div>

              <div className="mt-2 flex flex-col gap-3">
                <p className="label">currently learning</p>
                <TechIcons items={currentlyLearning} tone="dim" />
              </div>
            </Section>

            <Section id="why" file="why-me.md" delay={180}>
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

            <Section id="hire-me" file="hire.me" delay={270}>
              <Contact />
            </Section>
          </div>
        </Container>
      </main>
    </div>
  );
}
