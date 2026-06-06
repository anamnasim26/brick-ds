"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/types";

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at 40% 40%, ${project.accentColor}66, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-transparent to-neutral-950" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-4 text-4xl font-semibold text-white md:text-6xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-lg text-neutral-300">{project.tagline}</p>

          <div className="mt-10 flex flex-wrap gap-8 border-t border-white/5 pt-8 text-sm">
            {[
              { label: "Role", value: project.role },
              { label: "Duration", value: project.duration },
              { label: "Year", value: project.year },
              { label: "Tools", value: project.tools.join(", ") },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="mb-1 text-xs uppercase tracking-widest text-neutral-500">
                  {label}
                </p>
                <p className="text-white">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
