"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCategory } from "@/lib/types";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const categories: ("All" | ProjectCategory)[] = [
  "All",
  "Product Design",
  "UX Research",
  "AI",
  "Interaction Design",
];

export default function WorkShowcase() {
  const [active, setActive] = useState<"All" | ProjectCategory>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">
                Selected Work
              </p>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                Projects
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm transition-all duration-200",
                    active === cat
                      ? "bg-white text-neutral-950"
                      : "border border-white/10 text-neutral-400 hover:border-white/30 hover:text-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link href={`/work/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-900 aspect-[4/3]">
                    {/* Placeholder image with gradient */}
                    <div
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${project.accentColor}22 0%, #0a0a0a 60%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${project.accentColor}44, transparent 70%)`,
                      }}
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-sm text-neutral-300">View Case Study →</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-white group-hover:opacity-70 transition-opacity">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        {project.category} · {project.year}
                      </p>
                    </div>
                    <span
                      className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <ScrollReveal className="mt-12 text-center">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
          >
            See all projects
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
