"use client";

import { testimonials } from "@/data/testimonials";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MarqueeText from "@/components/ui/MarqueeText";

function TestimonialChip({ quote, name, role, company }: { quote: string; name: string; role: string; company: string }) {
  return (
    <div className="mx-3 w-80 flex-shrink-0 rounded-2xl border border-white/5 bg-neutral-900 p-6">
      <p className="mb-5 text-sm leading-relaxed text-neutral-300">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700 text-xs font-medium text-white">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-neutral-500">
            {role} · {company}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const firstHalf = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondHalf = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section className="overflow-hidden py-28">
      <div className="mx-auto mb-16 max-w-7xl px-6">
        <ScrollReveal>
          <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">
            Kind Words
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            What people say
          </h2>
        </ScrollReveal>
      </div>

      <div className="space-y-4">
        <MarqueeText speed={55} className="py-2">
          <div className="flex">
            {[...firstHalf, ...firstHalf].map((t, i) => (
              <TestimonialChip key={`${t.id}-${i}`} {...t} />
            ))}
          </div>
        </MarqueeText>

        <MarqueeText speed={45} reverse className="py-2">
          <div className="flex">
            {[...secondHalf, ...secondHalf].map((t, i) => (
              <TestimonialChip key={`${t.id}-${i}`} {...t} />
            ))}
          </div>
        </MarqueeText>
      </div>
    </section>
  );
}
