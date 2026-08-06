import { EmptyState } from '@/components/EmptyState';
import { ComponentTabs, type ChangelogEntry } from '@/components/layout/ComponentTabs';

const Placeholder = () => (
  <div className="flex flex-1 items-center justify-center p-48">
    <EmptyState
      illustrationType="No Data"
      showIllustration={true}
      headingText="Blank component page"
      helperText="This page is a starter template for a new component. Add examples, usage guidance, and changelog details here."
      showActionButtons={false}
    />
  </div>
);

export function BlankComponentPage() {
  const changelog: ChangelogEntry[] = [];

  return (
    <div className="flex flex-col h-full">
      <div className="px-48 pt-40 pb-32 border-b border-brick-grey-300 bg-brick-grey-white">
        <p className="text-12 font-semibold text-brick-grey-500 uppercase tracking-[0.08em] mb-8">Component · Placeholder</p>
        <h1 className="text-48 font-bold text-brick-grey-950 leading-48 mb-12">Blank Component</h1>
        <p className="text-16 text-brick-grey-600 leading-24">
          A blank component page to use as a template when adding new components to the design system.
        </p>
      </div>

      <ComponentTabs
        usage={<Placeholder />}
        changelog={changelog}
        playground={<Placeholder />}
      />
    </div>
  );
}
