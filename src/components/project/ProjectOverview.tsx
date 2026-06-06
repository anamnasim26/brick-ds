import { Project } from "@/lib/types";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectOverviewProps {
  project: Project;
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-2">
          <ScrollReveal>
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">
                Overview
              </p>
              <p className="text-lg leading-relaxed text-neutral-300">
                {project.overview}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">
                The Challenge
              </p>
              <p className="text-lg leading-relaxed text-neutral-300">
                {project.challenge}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
