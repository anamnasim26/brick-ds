import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, ArrowLeft, X } from 'lucide-react';
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

function Leaf({ item, depth = 0, onClick }: { item: NavLeaf; depth?: number; onClick?: () => void }) {
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
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

function Group({ group, onLinkClick }: { group: NavGroup; onLinkClick?: () => void }) {
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
            <Leaf key={child.to} item={child} depth={1} onClick={onLinkClick} />
          ))}
        </div>
      )}
    </div>
  );
}

function NavBody({ sections, backTo, onLinkClick }: { sections: NavSection[]; backTo?: string; onLinkClick?: () => void }) {
  return (
    <>
      {backTo && (
        <Link
          to={backTo}
          onClick={onLinkClick}
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
            {sections[si].items.map((item, ii) =>
              isGroup(item)
                ? <Group key={ii} group={item} onLinkClick={onLinkClick} />
                : <Leaf  key={(item as NavLeaf).to} item={item as NavLeaf} onClick={onLinkClick} />
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export function SideNav({
  sections,
  backTo,
  mobileOpen,
  onMobileClose,
}: {
  sections:       NavSection[];
  backTo?:        string;
  mobileOpen?:    boolean;
  onMobileClose?: () => void;
}) {
  const location = useLocation();
  // Close drawer on route change
  useEffect(() => { onMobileClose?.(); }, [location.pathname]);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex w-[280px] lg:w-[320px] shrink-0 h-[calc(100vh-56px)] sticky top-[56px] overflow-y-auto border-r border-brick-grey-300 bg-brick-grey-white pt-12 pb-24 flex-col">
        <NavBody sections={sections} backTo={backTo} />
      </aside>

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-brick-grey-black/40 backdrop-blur-[2px]"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={cn(
          'md:hidden fixed inset-y-0 left-0 z-50 w-[280px] bg-brick-grey-white border-r border-brick-grey-300 pt-12 pb-24 flex flex-col overflow-y-auto transition-transform duration-200',
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-16 mb-8">
          <span className="text-12 font-semibold text-brick-grey-500 uppercase tracking-[0.08em]">Menu</span>
          <button
            onClick={onMobileClose}
            className="size-[28px] flex items-center justify-center rounded-6 text-brick-grey-500 hover:bg-brick-grey-100 hover:text-brick-grey-900 transition-colors"
            aria-label="Close menu"
          >
            <X className="size-[14px]" />
          </button>
        </div>
        <NavBody sections={sections} backTo={backTo} onLinkClick={onMobileClose} />
      </aside>
    </>
  );
}
