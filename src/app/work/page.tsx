"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCategory } from "@/lib/types";
import ProjectCard from "@/components/work/ProjectCard";
import FilterBar from "@/components/work/FilterBar";
import ScrollReveal from "@/components/ui/ScrollReveal";

type FilterOption = "All" | ProjectCategory;

export default function WorkPage() {
  const [active, setActive] = useState<FilterOption>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen px-6 pt-32 pb-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16">
          <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">
            All Work
          </p>
          <h1 className="text-4xl font-semibold text-white md:text-6xl">
            Projects
          </h1>
          <p className="mt-4 max-w-xl text-neutral-400">
            A selection of UX work across product design, research, AI
            experiences, and design systems.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mb-12">
          <FilterBar active={active} onChange={setActive} />
        </ScrollReveal>

        <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center text-neutral-500"
          >
            No projects in this category yet.
          </motion.p>
        )}
      </div>
    </div>
  );
}
