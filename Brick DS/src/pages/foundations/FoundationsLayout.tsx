import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { SideNav } from '@/components/layout/SideNav';

const SECTIONS = [
  {
    title: 'Foundations',
    items: [
      { label: 'Colours',    to: '/foundations/colours'    },
      { label: 'Typography', to: '/foundations/typography' },
      { label: 'Spacing',    to: '/foundations/spacing'    },
      { label: 'Radius',     to: '/foundations/radius'     },
    ],
  },
];

export function FoundationsLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-1 min-h-[calc(100vh-56px)]">
      <SideNav
        sections={SECTIONS}
        backTo="/"
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Mobile nav bar */}
        <div className="md:hidden sticky top-0 z-30 flex items-center gap-12 px-16 py-10 bg-brick-grey-white border-b border-brick-grey-300">
          <button
            onClick={() => setMobileOpen(true)}
            className="size-[36px] flex items-center justify-center rounded-8 border border-brick-grey-300 text-brick-grey-700 hover:bg-brick-grey-100 transition-colors"
            aria-label="Open navigation"
          >
            <Menu className="size-[16px]" />
          </button>
          <span className="text-14 font-medium text-brick-grey-700">Foundations</span>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export function FoundationsIndex() {
  return <Navigate to="/foundations/colours" replace />;
}
