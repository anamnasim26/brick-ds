"use client";

import { motion } from "framer-motion";
import { Experiment } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ExperimentCardProps {
  experiment: Experiment;
  index: number;
}

const statusConfig = {
  live: { label: "Live", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  prototype: { label: "Prototype", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  concept: { label: "Concept", className: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20" },
};

export default function ExperimentCard({ experiment, index }: ExperimentCardProps) {
  const status = statusConfig[experiment.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative rounded-2xl border border-white/5 bg-neutral-900 p-7 transition-all duration-300 hover:border-white/10 hover:bg-neutral-800/50"
    >
      {/* Glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 40px rgba(139,92,246,0.05)" }}
      />

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {experiment.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5 text-xs text-violet-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-0.5 text-xs",
            status.className
          )}
        >
          {status.label}
        </span>
      </div>

      <h3 className="mb-2 font-semibold text-white">{experiment.title}</h3>
      <p className="mb-5 text-sm leading-relaxed text-neutral-400">
        {experiment.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {experiment.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-neutral-400"
          >
            {tool}
          </span>
        ))}
      </div>

      {experiment.link && (
        <a
          href={experiment.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-violet-400 transition-colors hover:text-violet-300"
        >
          Explore →
        </a>
      )}
    </motion.div>
  );
}
