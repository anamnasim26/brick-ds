import { experiments } from "@/data/experiments";
import ExperimentCard from "@/components/ai-experiments/ExperimentCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MarqueeText from "@/components/ui/MarqueeText";

const marqueeItems = [
  "Prompt Design",
  "Generative UI",
  "AI Research",
  "Multimodal",
  "Automation",
  "LLM UX",
  "Human-AI Interaction",
];

export default function AIExperimentsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-36">
        {/* Neon gradient */}
        <div className="pointer-events-none absolute -right-20 top-10 h-[500px] w-[500px] rounded-full bg-violet-700/15 blur-[120px]" />
        <div className="pointer-events-none absolute left-1/4 top-40 h-96 w-96 rounded-full bg-fuchsia-700/10 blur-[100px]" />

        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-violet-400">
              AI Lab
            </p>
            <h1 className="mb-6 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
              Experiments at the edge of design and AI.
            </h1>
            <p className="max-w-xl text-lg text-neutral-400">
              A living collection of prototypes, proofs of concept, and thought
              experiments exploring what happens when UX design meets artificial
              intelligence.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-white/5 py-4">
        <MarqueeText speed={30} className="text-sm text-neutral-600">
          <div className="flex items-center">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="mx-6 flex items-center gap-6">
                {item}
                <span className="h-1 w-1 rounded-full bg-violet-500" />
              </span>
            ))}
          </div>
        </MarqueeText>
      </div>

      {/* Experiment grid */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center justify-between">
            <ScrollReveal>
              <div className="flex gap-4 text-sm text-neutral-500">
                <span>
                  <span className="text-white">{experiments.filter((e) => e.status === "live").length}</span> Live
                </span>
                <span>
                  <span className="text-white">{experiments.filter((e) => e.status === "prototype").length}</span> Prototypes
                </span>
                <span>
                  <span className="text-white">{experiments.filter((e) => e.status === "concept").length}</span> Concepts
                </span>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {experiments.map((experiment, i) => (
              <ExperimentCard key={experiment.id} experiment={experiment} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-950 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-10 text-center">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-violet-400">
                Collaborate
              </p>
              <h2 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
                Building something at the intersection of AI and design?
              </h2>
              <p className="mb-8 text-neutral-400">
                I&apos;m always interested in AI UX challenges. Let&apos;s talk.
              </p>
              <a
                href="mailto:anamnasim1@gmail.com"
                className="inline-flex rounded-full bg-violet-600 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-500"
              >
                Get in touch
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
