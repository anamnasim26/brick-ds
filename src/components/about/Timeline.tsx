import ScrollReveal from "@/components/ui/ScrollReveal";

const milestones = [
  {
    year: "2026",
    title: "Freelance UX & AI Design",
    description:
      "Working with startups and scale-ups on AI-native product experiences and design systems.",
  },
  {
    year: "2025",
    title: "Lead Designer · Health Startup",
    description:
      "Led UX for a chronic illness management app from 0 to 10,000 users. Built the design system from scratch.",
  },
  {
    year: "2024",
    title: "Senior UX Designer · Fintech",
    description:
      "Owned end-to-end design for core product flows. Reduced onboarding drop-off by 60%.",
  },
  {
    year: "2023",
    title: "UX Designer · SaaS",
    description:
      "Designed B2B dashboard products. First role shipping features used by 50k+ users daily.",
  },
  {
    year: "2022",
    title: "Bachelor's in Design",
    description:
      "Graduated with a focus on interaction design and human-computer interaction.",
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[11px] top-2 h-[calc(100%-24px)] w-px bg-white/10 md:left-1/2" />

      <div className="space-y-12">
        {milestones.map((item, i) => (
          <ScrollReveal key={item.year} delay={i * 0.08}>
            <div className="relative flex gap-6 md:gap-0">
              {/* Dot */}
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 bg-neutral-950 md:absolute md:left-1/2 md:-translate-x-1/2">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>

              {/* Content */}
              <div className="flex-1 md:grid md:grid-cols-2 md:gap-8">
                <div className="text-right hidden md:block">
                  {i % 2 === 0 && (
                    <div className="pr-8">
                      <span className="text-sm font-medium text-neutral-400">
                        {item.year}
                      </span>
                      <h3 className="mt-1 font-medium text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
                <div className="md:pl-8">
                  {(i % 2 !== 0 || true) && (
                    <div className="md:hidden">
                      <span className="text-sm font-medium text-neutral-400">
                        {item.year}
                      </span>
                      <h3 className="mt-1 font-medium text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        {item.description}
                      </p>
                    </div>
                  )}
                  {i % 2 !== 0 && (
                    <div className="hidden md:block">
                      <span className="text-sm font-medium text-neutral-400">
                        {item.year}
                      </span>
                      <h3 className="mt-1 font-medium text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
