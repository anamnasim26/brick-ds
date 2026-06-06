"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

const words = ["experiences", "interfaces", "systems", "moments"];

export default function Hero() {
  const rotatingRef = useRef<HTMLSpanElement>(null);
  const wordIndex = useRef(0);

  useEffect(() => {
    const el = rotatingRef.current;
    if (!el) return;

    const cycle = () => {
      wordIndex.current = (wordIndex.current + 1) % words.length;
      gsap.to(el, {
        yPercent: -10,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          el.textContent = words[wordIndex.current];
          gsap.fromTo(
            el,
            { yPercent: 10, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
          );
        },
      });
    };

    const interval = setInterval(cycle, 2500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -bottom-20 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/5 blur-[80px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs text-neutral-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Available for new projects · Based in Pakistan
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="mb-6 text-5xl font-semibold leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          Designing{" "}
          <span className="relative inline-block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]">
            <span
              ref={rotatingRef}
              className="absolute left-0 top-0 w-full bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent"
            >
              {words[0]}
            </span>
            <span className="invisible">{words[0]}</span>
          </span>
          <br />
          that matter.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-xl text-base text-neutral-400 md:text-lg"
        >
          I&apos;m Anam — a UX designer who turns messy, complex problems into
          clear, human experiences. Currently obsessed with AI-native product
          design.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <MagneticButton>
            <Link
              href="/work"
              className="group flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-neutral-950 transition-all duration-200 hover:bg-neutral-100"
            >
              View my work
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/about"
              className="rounded-full border border-white/20 px-7 py-3 text-sm text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5"
            >
              About me
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.div
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="h-1.5 w-1 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
