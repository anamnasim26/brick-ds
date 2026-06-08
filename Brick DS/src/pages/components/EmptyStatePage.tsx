import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { PreviewPanel } from '@/components/layout/PreviewPanel';
import { buttonVariants } from '@/components/Button/Button';
import { ComponentTabs, UsageDoc, BulletList, type ChangelogEntry } from '@/components/layout/ComponentTabs';
import { EmptyState, type EmptyStateProps, type IllustrationType } from '@/components/EmptyState';

type ESType = NonNullable<EmptyStateProps['type']>;

const TYPES: ESType[]             = ['Default', 'Outlined'];
const ILLUS: IllustrationType[]   = ['No Data', 'No Results', 'Error_404'];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors cursor-pointer ${checked ? 'bg-active-blue-500' : 'bg-brick-grey-400'}`}
    >
      <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

function ControlRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-16 py-12 border-b border-brick-grey-300 last:border-none">
      <span className="text-14 font-semibold text-brick-grey-800 shrink-0">{label}</span>
      <div className="flex flex-wrap items-center gap-4 justify-end">{children}</div>
    </div>
  );
}

function ChipButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-12 py-4 rounded-8 text-14 font-medium border transition-colors ${
        active
          ? 'bg-active-blue-50 border-active-blue-700 text-active-blue-700'
          : 'bg-brick-grey-white border-brick-grey-400 text-brick-grey-700 hover:border-brick-grey-600'
      }`}
    >
      {children}
    </button>
  );
}

function TextInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-[200px] text-14 text-brick-grey-900 border border-brick-grey-400 rounded-8 px-8 py-4 focus:outline-none focus:border-active-blue-500 bg-brick-grey-white"
    />
  );
}

function TextArea({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      rows={3}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-[200px] text-14 text-brick-grey-900 border border-brick-grey-400 rounded-8 px-8 py-4 focus:outline-none focus:border-active-blue-500 bg-brick-grey-white resize-none"
    />
  );
}

const DEFAULTS = {
  type:              'Default'  as ESType,
  illustrationType:  'No Data'  as IllustrationType,
  showIllustration:  true,
  showHeading:       true,
  headingText:       'Welcome to the page',
  showHelperText:    true,
  helperText:        'This page provides a place in your application to lay out information of your project, show the current status, and document things better, together.',
  showActionButtons: true,
  primaryLabel:      'Create the first page',
  secondaryLabel:    'Learn more',
};

export function EmptyStatePage() {
  const [type,              setType]              = useState<ESType>(DEFAULTS.type);
  const [illustrationType,  setIllustrationType]  = useState<IllustrationType>(DEFAULTS.illustrationType);
  const [showIllustration,  setShowIllustration]  = useState(DEFAULTS.showIllustration);
  const [showHeading,       setShowHeading]        = useState(DEFAULTS.showHeading);
  const [headingText,       setHeadingText]        = useState(DEFAULTS.headingText);
  const [showHelperText,    setShowHelperText]     = useState(DEFAULTS.showHelperText);
  const [helperText,        setHelperText]         = useState(DEFAULTS.helperText);
  const [showActionButtons, setShowActionButtons]  = useState(DEFAULTS.showActionButtons);
  const [primaryLabel,      setPrimaryLabel]       = useState(DEFAULTS.primaryLabel);
  const [secondaryLabel,    setSecondaryLabel]     = useState(DEFAULTS.secondaryLabel);

  const reset = () => {
    setType(DEFAULTS.type); setIllustrationType(DEFAULTS.illustrationType);
    setShowIllustration(DEFAULTS.showIllustration); setShowHeading(DEFAULTS.showHeading);
    setHeadingText(DEFAULTS.headingText); setShowHelperText(DEFAULTS.showHelperText);
    setHelperText(DEFAULTS.helperText); setShowActionButtons(DEFAULTS.showActionButtons);
    setPrimaryLabel(DEFAULTS.primaryLabel); setSecondaryLabel(DEFAULTS.secondaryLabel);
  };


  const changelog: ChangelogEntry[] = [
    {
      version: 'v1.0',
      date: 'June 2026',
      changes: [
        { type: 'Added', items: ['Initial release — Default and Outlined variants', '3 illustration types: No Data, No Results, Error 404', 'Optional illustration, heading, helper text, and dual-action buttons', 'Fully customisable heading and helper copy via playground'] },
      ],
    },
  ];

  const usageContent = (
    <UsageDoc sections={[
      { title: 'Usage', body: <><p className="text-16 text-brick-grey-700 leading-28 mb-8">Empty states fill the space when there is no data to display. They set expectations, reduce confusion, and guide users toward a productive next step.</p><BulletList items={['Use when a list, table, or collection has no items yet.','Use when a search or filter returns no results.','Use after a destructive action clears all content.','Avoid empty states in loading contexts — use a skeleton loader instead.']}/></> },
      { title: 'Accessibility', body: <BulletList items={['Illustrations are decorative — give them aria-hidden=\"true\" and an empty alt=\"\".','The heading should be the first focusable element when the empty state appears.','Action buttons must have clear, descriptive labels — not just \"Get started\" without context.','Ensure sufficient colour contrast between the illustration and its background.']}/> },
      { title: 'Best practices', body: <BulletList items={['Lead with a helpful message, not just \"No data found.\" Explain why it\'s empty and what to do next.','Show a primary action only when a direct user action can resolve the empty state.','Use illustrations that relate to the content area — don\'t reuse a generic illustration across every empty state.','For filtered empty states, offer a \"Clear filters\" secondary action.']}/> },
      { title: 'Content guidelines', body: <BulletList items={['Heading: 3–6 words, friendly and direct. \"Nothing here yet\" or \"No results for \'term\'\"','Helper text: 1–2 sentences explaining what the user can do. Avoid technical language.','Primary action label: imperative verb — \"Create project\", \"Add team member\", \"Upload file\".']}/> },
    ]} />
  );
  return (
    <div className="flex flex-col h-full">
      <div className="px-48 pt-40 pb-32 border-b border-brick-grey-300 bg-brick-grey-white flex items-start justify-between gap-24">
        <div>
          <p className="text-12 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-8">Component · V 1.0</p>
          <h1 className="text-48 font-bold text-brick-grey-950 leading-48 mb-12">empty state</h1>
          <p className="text-16 text-brick-grey-600 leading-24">
            Placeholder for screens with no content yet. Includes an illustration, heading, description, and up to two action buttons.
          </p>
        </div>
        <a
          href="https://brick-ds-storybook.vercel.app/?path=/docs/components-emptystate--docs"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'Secondary', size: 'Small' }) + ' shrink-0 mt-8'}
        >
          <span className="truncate">Storybook</span>
          <ExternalLink className="size-[20px] shrink-0" />
        </a>
      </div>

      <ComponentTabs usage={usageContent} changelog={changelog} playground={<div className="flex flex-1 min-h-0">
        {/* Controls */}
        <div className="w-[600px] shrink-0 border-r border-brick-grey-300 bg-brick-grey-white p-24 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between mb-16">
            <p className="text-12 font-semibold text-brick-grey-600 uppercase tracking-[0.08em]">Playground</p>
            <button onClick={reset} className="text-12 text-brick-grey-600 hover:text-brick-grey-950 underline transition-colors">Reset</button>
          </div>

          <ControlRow label="Type">
            <div className="flex flex-wrap gap-4 justify-end">
              {TYPES.map(t => <ChipButton key={t} active={type === t} onClick={() => setType(t)}>{t}</ChipButton>)}
            </div>
          </ControlRow>

          <ControlRow label="Illustration">
            <Toggle checked={showIllustration} onChange={setShowIllustration} />
          </ControlRow>

          {showIllustration && (
            <ControlRow label="Illustration type">
              <div className="flex flex-wrap gap-4 justify-end">
                {ILLUS.map(i => <ChipButton key={i} active={illustrationType === i} onClick={() => setIllustrationType(i)}>{i}</ChipButton>)}
              </div>
            </ControlRow>
          )}

          <ControlRow label="Show Heading">
            <Toggle checked={showHeading} onChange={setShowHeading} />
          </ControlRow>

          {showHeading && (
            <ControlRow label="Heading text">
              <TextInput value={headingText} onChange={setHeadingText} />
            </ControlRow>
          )}

          <ControlRow label="Show Helper Text">
            <Toggle checked={showHelperText} onChange={setShowHelperText} />
          </ControlRow>

          {showHelperText && (
            <ControlRow label="Helper text">
              <TextArea value={helperText} onChange={setHelperText} />
            </ControlRow>
          )}

          <ControlRow label="Action Buttons">
            <Toggle checked={showActionButtons} onChange={setShowActionButtons} />
          </ControlRow>

          {showActionButtons && (
            <>
              <ControlRow label="Primary label">
                <TextInput value={primaryLabel} onChange={setPrimaryLabel} />
              </ControlRow>
              <ControlRow label="Secondary label">
                <TextInput value={secondaryLabel} onChange={setSecondaryLabel} />
              </ControlRow>
            </>
          )}
        </div>

        {/* Preview */}
        <PreviewPanel code={[
          `import { EmptyState } from '@/components/EmptyState';`,
          ``,
          `export default function Example() {`,
          `  return (`,
          `    <EmptyState`,
          `      type="${type}"`,
          `      illustrationType="${illustrationType}"`,
          `      showIllustration={${showIllustration}}`,
          `      showHeading={${showHeading}}`,
          showHeading ? `      headingText="${headingText}"` : null,
          `      showHelperText={${showHelperText}}`,
          showHelperText ? `      helperText="${helperText}"` : null,
          `      showActionButtons={${showActionButtons}}`,
          showActionButtons ? `      primaryLabel="${primaryLabel}"` : null,
          showActionButtons ? `      secondaryLabel="${secondaryLabel}"` : null,
          `    />`,
          `  );`,
          `}`,
        ].filter(l => l !== null).join('\n')}>
          <EmptyState type={type} illustrationType={illustrationType} showIllustration={showIllustration} showHeading={showHeading} headingText={headingText} showHelperText={showHelperText} helperText={helperText} showActionButtons={showActionButtons} primaryLabel={primaryLabel} secondaryLabel={secondaryLabel} />
        </PreviewPanel>
      </div>} />
    </div>
  );
}
