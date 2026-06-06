"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { getFeaturedProjects } from "@/data/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";

const numbers = ["01", "02", "03"];

export default function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="bg-neutral-950 px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16">
            <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">
              Featured
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Best work
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {featured.map((project, i) => (
            <FeaturedCard key={project.slug} project={project} index={i} number={numbers[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  project,
  index,
  number,
}: {
  project: ReturnType<typeof getFeaturedProjects>[0];
  index: number;
  number: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <ScrollReveal delay={index * 0.1}>
      <Link href={`/work/${project.slug}`} className="group block">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-900 p-8 transition-all duration-500 hover:border-white/10 md:p-12"
        >
          {/* Background accent */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
            style={{ backgroundColor: project.accentColor }}
          />

          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-4">
                <span className="text-5xl font-bold text-white/10">{number}</span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
                {project.title}
              </h3>
              <p className="max-w-lg text-neutral-400">{project.description}</p>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View case study{" "}
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>

            {/* Animated visual panel */}
            <motion.div
              style={{ y }}
              className="h-48 w-full shrink-0 overflow-hidden rounded-xl md:h-56 md:w-72"
            >
              <div
                className="h-full w-full rounded-xl transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${project.accentColor}33 0%, #111 100%)`,
                }}
              />
            </motion.div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}
