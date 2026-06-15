import { Outlet, Navigate } from 'react-router-dom';

export function IconsLayout() {
  return (
    <div className="flex-1 overflow-y-auto min-w-0">
      <Outlet />
    </div>
  );
}

export function IconsIndex() {
  return <Navigate to="/icons/material" replace />;
}
