import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/Badge';

export type NavLeaf  = { label: string; to: string; badge?: string };
export type NavGroup = { label: string; children: NavLeaf[]; badge?: string };
export type NavItem  = NavLeaf | NavGroup;
export type NavSection = { title?: string; items: NavItem[] };

function isGroup(item: NavItem): item is NavGroup {
  return 'children' in item;
}

const itemBase =
  'w-full flex items-center justify-between py-[6px] pr-16 text-14 leading-20 transition-colors border-l-2 cursor-pointer select-none';

function Leaf({ item, depth = 0 }: { item: NavLeaf; depth?: number }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(
          itemBase,
          depth === 0 ? 'pl-16' : 'pl-32',
          isActive
            ? 'border-brick-blue-500 bg-brick-blue-50 text-brick-blue-600 font-semibold'
            : 'border-transparent text-brick-grey-700 hover:bg-brick-grey-100 hover:text-brick-grey-950 font-normal',
        )
      }
    >
      {item.label}
      {item.badge && (
        <Badge type="Warning" text={item.badge} showLeftIcon={false} showRightIcon={false} className="shrink-0" />
      )}
    </NavLink>
  );
}

function Group({ group }: { group: NavGroup }) {
  const location = useLocation();
  const anyChildActive = group.children.some(
    c => location.pathname === c.to || location.pathname.startsWith(c.to + '/'),
  );
  const [open, setOpen] = useState(anyChildActive);

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          itemBase,
          'pl-16',
          anyChildActive
            ? 'border-brick-blue-500 text-brick-blue-600 bg-brick-blue-50 font-semibold'
            : 'border-transparent text-brick-grey-800 hover:bg-brick-grey-100 font-normal',
        )}
      >
        <span className="flex items-center gap-6">
          {open
            ? <ChevronDown  className="size-[13px] shrink-0 text-brick-grey-600" />
            : <ChevronRight className="size-[13px] shrink-0 text-brick-grey-600" />}
          {group.label}
        </span>
        {group.badge && (
          <Badge type="Warning" text={group.badge} showLeftIcon={false} showRightIcon={false} className="shrink-0" />
        )}
      </button>

      {open && (
        <div className="flex flex-col">
          {group.children.map(child => (
            <Leaf key={child.to} item={child} depth={1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SideNav({ sections, backTo }: { sections: NavSection[]; backTo?: string }) {
  return (
    <aside className="w-[220px] shrink-0 h-[calc(100vh-56px)] sticky top-[56px] overflow-y-auto border-r border-brick-grey-300 bg-brick-grey-white pt-12 pb-24 flex flex-col">
      {backTo && (
        <Link
          to={backTo}
          className="flex items-center gap-8 px-16 py-8 mb-4 text-13 text-brick-grey-600 hover:text-brick-grey-950 transition-colors group"
        >
          <ArrowLeft className="size-[14px] transition-transform group-hover:-translate-x-1" />
          Back
        </Link>
      )}
      {sections.map((section, si) => (
        <div key={si} className={si > 0 ? 'mt-16' : ''}>
          {section.title && (
            <p className="text-11 font-semibold text-brick-grey-600 px-16 pt-4 pb-4 tracking-[0.04em] uppercase">
              {section.title}
            </p>
          )}
          <div className="flex flex-col">
            {section.items.map((item, ii) =>
              isGroup(item)
                ? <Group key={ii} group={item} />
                : <Leaf  key={(item as NavLeaf).to} item={item as NavLeaf} />
            )}
          </div>
        </div>
      ))}
    </aside>
  );
}
