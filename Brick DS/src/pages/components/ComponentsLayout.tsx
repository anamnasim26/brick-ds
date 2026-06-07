import { Outlet, Navigate } from 'react-router-dom';
import { SideNav, type NavSection } from '@/components/layout/SideNav';

const SECTIONS: NavSection[] = [
  {
    items: [
      { label: 'Alert', to: '/components/alert' },
      { label: 'Avatar', to: '/components/avatar' },
      { label: 'Badge',       to: '/components/badge' },
      { label: 'Empty State', to: '/components/empty-state' },
    ],
  },
  {
    title: 'Forms and input',
    items: [
      { label: 'Button', to: '/components/button' },
      { label: 'Checkbox', to: '/components/checkbox' },
      { label: 'Input', to: '/components/input' },
      { label: 'Radio', to: '/components/radio' },
      { label: 'Switch', to: '/components/switch' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { label: 'Tabs', to: '/components/tabs', badge: 'Soon' },
    ],
  },
  {
    title: 'Overlays',
    items: [
      { label: 'Tooltip', to: '/components/tooltip' },
    ],
  },
];

export function ComponentsLayout() {
  return (
    <div className="flex flex-1 min-h-[calc(100vh-56px)]">
      <SideNav sections={SECTIONS} backTo="/" />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export function ComponentsIndex() {
  return <Navigate to="/components/alert" replace />;
}
