import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme';

const NAV_LINKS = [
  { label: 'Foundations', to: '/foundations' },
  { label: 'Components',  to: '/components'  },
  { label: 'How to use',  to: '/setup'       },
];

export function TopNav() {
  const { pathname }          = useLocation();
  const [isOpen, setIsOpen]   = useState(false);
  const { theme, toggle }     = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-brick-grey-white border-b border-brick-grey-300">
      <nav className="relative w-full mx-auto flex md:items-center md:justify-between md:gap-12 flex-wrap md:flex-nowrap py-8 px-32">

        {/* ── Logo + mobile toggle ── */}
        <div className="flex justify-between items-center gap-8 w-full md:w-auto">
          <Link
            to="/"
            className="flex items-center gap-8 group focus:outline-none"
            aria-label="Brick Design System home"
          >
            <img src="/logo.svg" alt="" width="28" height="28" className="shrink-0 rounded-6" />
            <span className="font-bold text-16 text-brick-grey-950 tracking-tight">Brick Design System</span>
          </Link>

          {/* Hamburger — only visible on mobile */}
          <button
            type="button"
            onClick={() => setIsOpen(v => !v)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            className="md:hidden relative size-[36px] flex items-center justify-center rounded-8 border border-brick-grey-300 text-brick-grey-700 hover:bg-brick-grey-100 focus:outline-none focus:bg-brick-grey-100 transition-colors"
          >
            {isOpen
              ? <X    className="size-16" strokeWidth={2} />
              : <Menu className="size-16" strokeWidth={2} />
            }
          </button>
        </div>

        {/* ── Collapsible nav body ── */}
        <div
          role="region"
          className={cn(
            // Mobile: absolute dropdown below the bar
            'w-full md:w-auto',
            'overflow-hidden transition-all duration-200',
            'md:flex md:items-center md:gap-4',
            isOpen ? 'flex flex-col gap-4 py-12' : 'hidden md:flex',
          )}
        >
          {/* Nav links */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {NAV_LINKS.map(({ label, to }) => {
              const isActive = pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'px-12 py-8 rounded-8 text-14 font-medium flex items-center transition-colors focus:outline-none',
                    isActive
                      ? 'bg-brick-blue-50 text-brick-blue-500'
                      : 'text-brick-grey-700 hover:bg-brick-grey-100 hover:text-brick-grey-950 focus:bg-brick-grey-100',
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Vertical divider (desktop only) */}
          <div className="hidden md:block h-16 border-l border-brick-grey-300 mx-4" />

          {/* Horizontal divider (mobile only) */}
          <div className="md:hidden w-full h-px bg-brick-grey-300" />

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="relative size-[36px] flex items-center justify-center rounded-8 border border-brick-grey-300 text-brick-grey-700 hover:bg-brick-grey-200 focus:outline-none focus:bg-brick-grey-200 transition-colors"
          >
            {theme === 'dark'
              ? <Sun  className="size-16" strokeWidth={2} />
              : <Moon className="size-16" strokeWidth={2} />
            }
          </button>
        </div>

      </nav>
    </header>
  );
}
