import ScrollReveal from "@/components/ui/ScrollReveal";
import Timeline from "@/components/about/Timeline";
import MagneticButton from "@/components/ui/MagneticButton";

const skills = [
  "User Research",
  "Interaction Design",
  "Design Systems",
  "Prototyping",
  "UX Strategy",
  "Usability Testing",
  "Information Architecture",
  "AI Product Design",
  "Accessibility",
  "Figma",
  "Framer",
  "GSAP",
];

const values = [
  {
    title: "Research first",
    description:
      "I don't guess. Every design decision starts with understanding — the user, the business, the context.",
  },
  {
    title: "Clear over clever",
    description:
      "The best interfaces are invisible. I design for comprehension, not applause.",
  },
  {
    title: "Systems thinking",
    description:
      "I design components, not screens. Everything I build is meant to scale.",
  },
  {
    title: "Obsessively iterative",
    description:
      "First drafts are hypotheses. I test, learn, and refine until the work is right.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36">
        <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 text-xs uppercase tracking-widest text-neutral-500">
              About me
            </p>
            <h1 className="mb-8 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
              I design for the person on the other side of the screen.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="grid gap-8 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-neutral-400">
                I&apos;m Anam — a UX designer with a focus on AI-native
                products, research-led design, and scalable design systems. I
                believe the most powerful design happens when deep empathy meets
                rigorous systems thinking.
              </p>
              <p className="text-lg leading-relaxed text-neutral-400">
                Currently freelancing with startups and scale-ups. Previously
                worked across fintech, health tech, and SaaS — always on teams
                where design has a seat at the table.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mt-8 flex gap-4">
            <MagneticButton>
              <a
                href="/Anam-Nasim-CV.pdf"
                download
                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-80"
              >
                Download CV
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="mailto:anamnasim1@gmail.com"
                className="rounded-full border border-white/20 px-6 py-2.5 text-sm text-white transition-all hover:border-white/40"
              >
                Say hello
              </a>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-neutral-950 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-10 text-xs uppercase tracking-widest text-neutral-500">
              How I work
            </p>
          </ScrollReveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/5 bg-neutral-900 p-6">
                  <h3 className="mb-2 font-medium text-white">{v.title}</h3>
                  <p className="text-sm text-neutral-400">{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-10 text-xs uppercase tracking-widest text-neutral-500">
              Skills & tools
            </p>
          </ScrollReveal>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <ScrollReveal key={skill} delay={i * 0.04}>
                <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-300 transition-colors hover:border-white/30 hover:text-white">
                  {skill}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-neutral-950 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-16 text-xs uppercase tracking-widest text-neutral-500">
              Journey
            </p>
          </ScrollReveal>
          <Timeline />
        </div>
      </section>
    </div>
  );
}
