import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const socials = [
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "Read.cv", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-neutral-950 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">
                Currently available for work
              </p>
              <a
                href="mailto:anamnasim1@gmail.com"
                className="group text-3xl font-semibold text-white transition-opacity hover:opacity-70 md:text-4xl"
              >
                anamnasim1@gmail.com
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
            <ul className="flex gap-6">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <div className="flex items-center justify-between border-t border-white/5 pt-8 text-xs text-neutral-600">
          <span>© {new Date().getFullYear()} Anam Nasim</span>
          <Link href="/" className="hover:text-neutral-400">
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
