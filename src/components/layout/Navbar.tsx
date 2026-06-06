"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/ai-experiments", label: "AI Lab" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.header className="fixed top-0 z-50 w-full">
      <motion.div
        className="absolute inset-0 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md"
        style={{ opacity: bgOpacity }}
      />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="group flex items-center gap-2">
          <motion.span
            className="text-sm font-semibold tracking-tight text-white"
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            Anam Nasim
          </motion.span>
          <span className="text-xs text-neutral-500">/ UX Designer</span>
        </Link>

        <ul className="flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "group relative text-sm transition-colors duration-200",
                  pathname === href || pathname.startsWith(href + "/")
                    ? "text-white"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-white transition-transform duration-300",
                    pathname === href || pathname.startsWith(href + "/")
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            </li>
          ))}
          <li>
            <a
              href="mailto:anamnasim1@gmail.com"
              className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white transition-all duration-200 hover:border-white/50 hover:bg-white/5"
            >
              Let&apos;s talk
            </a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
