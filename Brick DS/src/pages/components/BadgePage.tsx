import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Badge, type BadgeProps } from '@/components/Badge';
import { buttonVariants } from '@/components/Button/Button';
import { PreviewPanel } from '@/components/layout/PreviewPanel';
import { ComponentTabs, UsageDoc, BulletList, type ChangelogEntry } from '@/components/layout/ComponentTabs';

type BadgeType = NonNullable<BadgeProps['type']>;
const TYPES: BadgeType[] = ['Primary', 'Success', 'Failure', 'Warning', 'Info'];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus-visible:outline-none cursor-pointer ${checked ? 'bg-active-blue-500' : 'bg-brick-grey-400'}`}
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
      className={`px-12 py-4 rounded-8 text-14 font-medium border transition-colors focus-visible:outline-none ${
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

const DEFAULTS = {
  type: 'Primary' as BadgeType,
  text: 'Badge',
  showLeftIcon: true,
  showRightIcon: true,
};

export function BadgePage() {
  const [type, setType] = useState<BadgeType>(DEFAULTS.type);
  const [text, setText] = useState(DEFAULTS.text);
  const [showLeftIcon, setShowLeftIcon] = useState(DEFAULTS.showLeftIcon);
  const [showRightIcon, setShowRightIcon] = useState(DEFAULTS.showRightIcon);

  const reset = () => {
    setType(DEFAULTS.type);
    setText(DEFAULTS.text);
    setShowLeftIcon(DEFAULTS.showLeftIcon);
    setShowRightIcon(DEFAULTS.showRightIcon);
  };


  const changelog: ChangelogEntry[] = [
    {
      version: 'v1.0',
      date: 'June 2026',
      changes: [
        { type: 'Added', items: ['Initial release — 5 semantic variants (Primary, Success, Failure, Warning, Info)', 'Optional left and right icon slots', 'Text is fully editable via playground'] },
      ],
    },
  ];

  const usageContent = (
    <UsageDoc sections={[
      { title: 'Usage', body: <><p className="text-16 text-brick-grey-700 leading-28 mb-8">Badges communicate status, categorisation, or counts at a glance. They are small, non-interactive labels that sit alongside content.</p><BulletList items={['Primary: general-purpose tag or category label.','Success: indicates something is active, complete, or healthy.','Failure: flags an error state or blocked item.','Warning: highlights something that requires attention.','Info: provides supplementary classification or metadata.']}/></> },
      { title: 'Accessibility', body: <BulletList items={['Badges are decorative labels — they must not be the only means of conveying critical information.','If a badge communicates state (e.g. \"Error\"), pair it with a text description elsewhere on the page.','Left and right icons should be aria-hidden since the text label carries the meaning.','Don\'t use a badge as an interactive element — it has no role=\"button\" or click handling.']}/> },
      { title: 'Best practices', body: <BulletList items={['Keep badge text to 1–3 words. Truncate at 120px max-width if the label could be longer.','Use the correct semantic variant for the state — don\'t use Primary when the state is clearly a success or failure.','Limit the number of badges visible at one time to avoid visual noise.','Pair the left icon with the status colour for immediate scannability.']}/> },
      { title: 'Content guidelines', body: <BulletList items={['Sentence case: \"In progress\", not \"IN PROGRESS\" or \"In Progress\".','Use nouns or adjectives, not verbs: \"Pending\" not \"Waiting\", \"Active\" not \"Running\".','Avoid abbreviations unless they are universally understood.']}/> },
    ]} />
  );
  return (
    <div className="flex flex-col h-full">
      <div className="px-48 pt-40 pb-32 border-b border-brick-grey-300 bg-brick-grey-white flex items-start justify-between gap-24">
        <div>
          <p className="text-12 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-8">Component · V 1.0</p>
          <h1 className="text-48 font-bold text-brick-grey-950 leading-48 mb-12">badge</h1>
          <p className="text-16 text-brick-grey-600 leading-24">
            Small inline label for status, category, or priority. Five colour variants, with optional leading and trailing icons.
          </p>
        </div>
        <a
          href="https://brick-ds-storybook.vercel.app/?path=/docs/components-badge--docs"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'Secondary', size: 'Small' }) + ' shrink-0 mt-8'}
        >
          <span className="truncate">Storybook</span>
          <ExternalLink className="size-[20px] shrink-0" />
        </a>
      </div>

      <ComponentTabs usage={usageContent} changelog={changelog} playground={<div className="flex flex-1">
        <div className="w-[600px] shrink-0 border-r border-brick-grey-300 bg-brick-grey-white p-24 flex flex-col">
          <div className="flex items-center justify-between mb-16">
            <p className="text-12 font-semibold text-brick-grey-600 uppercase tracking-[0.08em]">Playground</p>
            <button onClick={reset} className="text-12 text-brick-grey-600 hover:text-brick-grey-950 underline transition-colors">
              Reset
            </button>
          </div>

          <ControlRow label="Type">
            <div className="flex flex-wrap gap-4 justify-end">
              {TYPES.map(t => (
                <ChipButton key={t} active={type === t} onClick={() => setType(t)}>{t}</ChipButton>
              ))}
            </div>
          </ControlRow>

          <ControlRow label="Text">
            <TextInput value={text} onChange={setText} />
          </ControlRow>

          <ControlRow label="Left icon">
            <Toggle checked={showLeftIcon} onChange={setShowLeftIcon} />
          </ControlRow>

          <ControlRow label="Right icon">
            <Toggle checked={showRightIcon} onChange={setShowRightIcon} />
          </ControlRow>
        </div>

        <PreviewPanel code={[
          `import { Badge } from '@/components/Badge';`,
          ``,
          `export default function Example() {`,
          `  return (`,
          `    <Badge`,
          `      type="${type}"`,
          `      text="${text}"`,
          `      showLeftIcon={${showLeftIcon}}`,
          `      showRightIcon={${showRightIcon}}`,
          `    />`,
          `  );`,
          `}`,
        ].join('\n')}>
          <Badge type={type} text={text} showLeftIcon={showLeftIcon} showRightIcon={showRightIcon} />
        </PreviewPanel>
      </div>} />
    </div>
  );
}
