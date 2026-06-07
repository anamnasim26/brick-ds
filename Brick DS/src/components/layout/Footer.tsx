import { Mail } from 'lucide-react';

const VERSION      = '0.1.0';
const LAST_UPDATED = 'June 2026';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-brick-grey-white border-t border-brick-grey-300 py-48">
      <div className="flex flex-col items-center px-48">

        {/* ── Contact icon buttons ── */}
        <div className="mb-32 flex gap-12">

          <a
            href="mailto:anamnasim1@gmail.com"
            aria-label="Email"
            className="w-[40px] h-[40px] rounded-full border border-brick-grey-300 flex items-center justify-center text-brick-grey-700 hover:bg-brick-grey-100 hover:text-brick-grey-950 transition-colors"
          >
            <Mail className="size-5" />
          </a>

          <a
            href="https://linkedin.com/in/anamnasim26"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-[40px] h-[40px] rounded-full border border-brick-grey-300 flex items-center justify-center text-brick-grey-700 hover:bg-brick-grey-100 hover:text-brick-grey-950 transition-colors"
          >
            <LinkedInIcon className="size-5" />
          </a>

        </div>

        {/* ── Version + last updated ── */}
        <p className="text-12 text-brick-grey-500 mb-8">
          v{VERSION} · Last updated {LAST_UPDATED}
        </p>

        {/* ── Copyright ── */}
        <p className="text-12 text-brick-grey-500">
          © {new Date().getFullYear()} Brick Design System
        </p>

      </div>
    </footer>
  );
}
