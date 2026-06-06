"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-900 aspect-[4/3]">
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}33 0%, #0d0d0d 70%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `radial-gradient(ellipse at 20% 20%, ${project.accentColor}33, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-sm font-medium text-white">View Case Study →</p>
          </div>
          {project.featured && (
            <span className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-white transition-opacity group-hover:opacity-60">
              {project.title}
            </h3>
            <span
              className="mt-1 h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: project.accentColor }}
            />
          </div>
          <p className="mt-1 text-sm text-neutral-500">
            {project.category} · {project.year}
          </p>
          <p className="mt-2 text-sm text-neutral-400 line-clamp-2">
            {project.tagline}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
