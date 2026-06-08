import { EmptyState } from '@/components/EmptyState';
import { ComponentTabs, type ChangelogEntry } from '@/components/layout/ComponentTabs';

const ComingSoon = () => (
  <div className="flex flex-1 items-center justify-center p-48">
    <EmptyState
      illustrationType="No Data"
      showIllustration={true}
      headingText="Component in progress"
      helperText="The Tabs component is currently being designed and built. Check back soon — it will support horizontal navigation with active states, disabled tabs, and optional badge counts."
      showActionButtons={false}
    />
  </div>
);

export function TabsPage() {
  const changelog: ChangelogEntry[] = [];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-48 pt-40 pb-32 border-b border-brick-grey-300 bg-brick-grey-white">
        <p className="text-12 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-8">Component · Coming soon</p>
        <h1 className="text-48 font-bold text-brick-grey-950 leading-48 mb-12">tabs</h1>
        <p className="text-16 text-brick-grey-600 leading-24">
          Organises related content into sections without leaving the page. Works best when each tab holds a distinct view — avoid using tabs just to reduce scroll.
        </p>
      </div>

      <ComponentTabs
        usage={<ComingSoon />}
        changelog={changelog}
        playground={<ComingSoon />}
      />
    </div>
  );
}
