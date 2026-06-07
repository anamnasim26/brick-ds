import { Outlet, Navigate } from 'react-router-dom';
import { SideNav } from '@/components/layout/SideNav';

const SECTIONS = [
  {
    title: 'Foundations',
    items: [
      { label: 'Colours', to: '/foundations/colours' },
      { label: 'Typography', to: '/foundations/typography' },
      { label: 'Spacing', to: '/foundations/spacing' },
      { label: 'Radius', to: '/foundations/radius' },
    ],
  },
];

export function FoundationsLayout() {
  return (
    <div className="flex flex-1 min-h-[calc(100vh-56px)]">
      <SideNav sections={SECTIONS} backTo="/" />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export function FoundationsIndex() {
  return <Navigate to="/foundations/colours" replace />;
}
