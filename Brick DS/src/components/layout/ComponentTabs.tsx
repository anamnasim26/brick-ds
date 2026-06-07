import { useState } from 'react';

// ─── Tab bar ───────────────────────────────────────────────────────────────────

type Tab = 'playground' | 'usage' | 'changelog';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: { type: 'Added' | 'Changed' | 'Fixed' | 'Removed'; items: string[] }[];
}

interface ComponentTabsProps {
  playground: React.ReactNode;
  usage: React.ReactNode;
  changelog?: ChangelogEntry[];
}

const TAB_LABELS: Record<Tab, string> = {
  playground: 'Playground',
  usage: 'Usage',
  changelog: 'Changelog',
};

export function ComponentTabs({ playground, usage, changelog }: ComponentTabsProps) {
  const [tab, setTab] = useState<Tab>('playground');

  const tabs: Tab[] = ['playground', 'usage', 'changelog'];

  return (
    <>
      {/* Tab bar */}
      <div className="flex items-end gap-0 border-b border-brick-grey-300 bg-brick-grey-white px-48">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative py-12 mr-24 text-14 font-medium transition-colors focus:outline-none ${
              tab === t
                ? 'text-brick-blue-500'
                : 'text-brick-grey-600 hover:text-brick-grey-950'
            }`}
          >
            {TAB_LABELS[t]}
            {tab === t && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brick-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {tab === 'playground' && playground}
      {tab === 'usage' && usage}
      {tab === 'changelog' && <ChangelogPanel entries={changelog} />}
    </>
  );
}

// ─── Changelog panel ───────────────────────────────────────────────────────────

// Matches Badge component: rounded-4 border px-8 py-4 text-12 font-normal leading-16
const CHANGE_TYPE_STYLES: Record<string, string> = {
  Added:   'bg-success-green-50 border-success-green-500 text-success-green-500',
  Changed: 'bg-active-blue-50 border-active-blue-700 text-active-blue-700',
  Fixed:   'bg-warning-yellow-50 border-warning-yellow-700 text-warning-yellow-700',
  Removed: 'bg-error-red-50 border-error-red-500 text-error-red-500',
};

function ChangelogPanel({ entries }: { entries?: ChangelogEntry[] }) {
  if (!entries || entries.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-16 text-brick-grey-500">No changelog entries yet.</p>
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[760px] px-48 py-40 flex flex-col gap-40">
        {entries.map(entry => (
          <section key={entry.version}>
            <div className="flex items-baseline gap-16 mb-16">
              <h2 className="text-24 font-bold text-brick-grey-950">{entry.version}</h2>
              <span className="text-16 text-brick-grey-500">{entry.date}</span>
            </div>
            <div className="flex flex-col gap-16">
              {entry.changes.map(group => (
                <div key={group.type} className="flex gap-16">
                  <span className={`shrink-0 mt-[2px] inline-flex items-center px-8 py-4 rounded-4 border text-12 font-normal leading-16 ${CHANGE_TYPE_STYLES[group.type] ?? ''}`}>
                    {group.type}
                  </span>
                  <ul className="flex flex-col gap-6">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex gap-10 text-16 text-brick-grey-700 leading-24">
                        <span className="mt-[9px] w-[5px] h-[5px] rounded-full bg-brick-grey-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

// Also export the type so pages can type their changelog arrays
export type { ChangelogEntry };

// ─── Usage doc primitives ──────────────────────────────────────────────────────

export interface UsageSection {
  title: string;
  body: React.ReactNode;
}

interface UsageDocProps {
  sections: UsageSection[];
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-6 mt-8">
      {items.map((item, i) => (
        <li key={i} className="flex gap-10 text-16 text-brick-grey-700 leading-24">
          <span className="mt-[9px] w-[5px] h-[5px] rounded-full bg-brick-grey-500 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function UsageDoc({ sections }: UsageDocProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[760px] px-48 py-40 flex flex-col gap-40">
        {sections.map(({ title, body }) => (
          <section key={title}>
            <h2 className="text-24 font-bold text-brick-grey-950 mb-12">{title}</h2>
            {typeof body === 'string'
              ? <p className="text-16 text-brick-grey-700 leading-28">{body}</p>
              : body
            }
          </section>
        ))}
      </div>
    </div>
  );
}

// Convenience export so pages can build bullet lists
export { BulletList };
