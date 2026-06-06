"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

interface NextProjectProps {
  slug?: string;
}

export default function NextProject({ slug }: NextProjectProps) {
  if (!slug) return null;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;

  return (
    <section className="border-t border-white/5 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs uppercase tracking-widest text-neutral-500">
          Next Project
        </p>
        <Link href={`/work/${project.slug}`} className="group block">
          <motion.div
            className="flex items-center justify-between"
            whileHover={{ x: 8 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-semibold text-white transition-opacity group-hover:opacity-60 md:text-5xl">
              {project.title}
            </h2>
            <span className="text-2xl text-neutral-500 transition-all duration-300 group-hover:translate-x-2 group-hover:text-white">
              →
            </span>
          </motion.div>
          <p className="mt-2 text-neutral-500">{project.tagline}</p>
        </Link>
      </div>
    </section>
  );
}
