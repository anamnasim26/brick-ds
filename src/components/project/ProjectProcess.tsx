import { Project } from "@/lib/types";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectProcessProps {
  project: Project;
}

export default function ProjectProcess({ project }: ProjectProcessProps) {
  return (
    <section className="bg-neutral-950 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16">
            <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">
              Process
            </p>
            <h2 className="text-3xl font-semibold text-white">
              How I approached it
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-12">
          {project.process.map((step, i) => (
            <ScrollReveal key={step.phase} delay={i * 0.08}>
              <div className="grid gap-8 border-t border-white/5 pt-12 md:grid-cols-[200px_1fr]">
                <div>
                  <span className="text-sm font-medium text-neutral-500">
                    {step.phase}
                  </span>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-medium text-white">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Outcome */}
        <ScrollReveal className="mt-24">
          <div className="rounded-2xl border border-white/5 bg-neutral-900 p-10">
            <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">
              Outcome
            </p>
            <p className="mb-8 text-lg text-neutral-300">
              {project.outcome.summary}
            </p>
            <div className="flex flex-wrap gap-8">
              {project.outcome.metrics.map(({ label, value }) => (
                <div key={label}>
                  <p className="text-3xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-sm text-neutral-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
