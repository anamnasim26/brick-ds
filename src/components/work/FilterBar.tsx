"use client";

import { ProjectCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type FilterOption = "All" | ProjectCategory;

const options: FilterOption[] = [
  "All",
  "Product Design",
  "UX Research",
  "AI",
  "Interaction Design",
];

interface FilterBarProps {
  active: FilterOption;
  onChange: (value: FilterOption) => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm transition-all duration-200",
            active === opt
              ? "bg-white text-neutral-950"
              : "border border-white/10 text-neutral-400 hover:border-white/30 hover:text-white"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
