import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function TopNav() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-brick-grey-white border-b border-brick-grey-300 px-32 h-[56px] flex items-center justify-between">
      <Link to="/" className="flex items-center gap-12 group">
        <div className="w-8 h-8 rounded-4 bg-brick-blue-500 group-hover:bg-brick-blue-400 transition-colors" />
        <span className="font-bold text-16 text-brick-grey-950 tracking-tight">Brick DS</span>
      </Link>

      <nav className="flex items-center gap-4">
        {[
          { label: 'Foundations', to: '/foundations' },
          { label: 'Components', to: '/components' },
        ].map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              'px-16 py-8 rounded-8 text-14 font-medium transition-colors',
              pathname.startsWith(to)
                ? 'bg-brick-blue-50 text-brick-blue-500'
                : 'text-brick-grey-700 hover:text-brick-grey-950 hover:bg-brick-grey-200',
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
